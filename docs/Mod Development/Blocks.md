# Blocks
Blocks are the basic building ingredient and its existence is impertive in any voxel game. To create a block, you must register it with the BlockManager in your mod's preInit() stage.

```java
blockStateless = blockManager.register(BlockStateless.class);
```

The code above registers a block class called "BlockStateless". "BlockStateless" extends Block. The following is BlockStateless's code.

```java
public class BlockStateless extends Block implements Syncable {

	public BlockStateless() {
		add(new StaticBlockRenderer(this)).setTexture(NovaBlock.steelTexture);

		add(new Collider());

		add(new ItemRenderer(this));

		add(new Category("buildingBlocks"));
		events.on(RightClickEvent.class).bind(this::onRightClick);
	}

	public void onRightClick(RightClickEvent evt) {
		System.out.println("Sending Packet: 1234");
		NovaBlock.networkManager.sync(this);
	}

	@Override
	public String getID() {
		return "simple";
	}
}
```

See [here](https://github.com/NOVA-Team/NOVA-Example/blob/master/block/src/main/java/nova/sample/block/NovaBlock.java) for a live example.

##Components
There are some components you will probably always want to implement in your blocks, none of them are required and can be left out or replaced with your own versions of it.

###Collider
This component determines a few properties of your block, namely if it is a cube, opaque, what it's bounding and selection boxes are. It also has an eventbus for collision events

###Category
This is the category(creative tab in minecraft) where this block belongs to

###ItemRenderer
This handles the rendering of the block in your inventory and hand

###Blockrenderer
In this case the StaticBlockRenderer is used but there a few others you can use as well, this is responsible for rendering the block in the world. You should bind a function to get provide textures as shown in the example above or pass it a function to if different sides use different textures (shown in the advanced example below)

The StaticBlockRenderer only renders when the block receives an update.

## Special Components
NOVA is ment to be modular and allows you to make your own components to add but it's also "Batteries included". Here are some interfaces that NOVA provides you might find usefull

###Orientation
Orientation allows your block to be rotated and face towards a specific side, this way it can have a front, back and sides.

If you just add this component to the components not much will heapen. The best thing to do is save this in a variable and annotate it with the @Sync and @Store annotations. The @Sync will sync between client and server (for that you should also have the block sync when it is placed down, see networking on how to do that)
The @Store will save and load the orientation so the data is not lost when the world is reloaded


## Special Interfaces
### Syncable
You may have noticed that BlockStateless implements Syncable. This interface allows the block to handle packets easily. By implementing Syncable, the block is capable of reading and writing packets between server and client. You can override the default methods `read(Packet packet)` and `write(Packet packet)` as shown in the example to read and write custom packets. Any variable annotated by `@Sync` will be synced between server and client. 

### Stateful
By default, blocks will be stateless. This means that blocks will be unable to retain their variables and state. Stateless blocks are more efficient and are appropriate for blocks that are abundant and have no internal logic (e.g: Decoration blocks, ores and resources). However, more complex blocks will need to implement `Stateful` interface, which allows it to store its state in the world.

### Storable
Storable allows a block to store its variables when a game saves. By implementing `Storable`, the block will be able to override `save` and `load` methods. Any variable that is annotated by `@Store` will have their values be automatically stored. However, not all variables can be properly stored.


##Rendering
For rendering you can use the StaticBlockRenderer shown above, make your own or use these

###RotatedRenderer
This is for use in combination with the Orientation component, it rotates the rendering of the block to match the rotation stored in the Orientation object. If you use this you should also use a function to give multiple textures as there is no point in rotated rendering if the block has the same texture on all sides

##Advanced Example
This is an example of a block that combines most of the things listed above, it has a collider, is rotatable (and rendered as such) and print it's orientation to the console when rightclicked

```java
public class BasicDuster extends Block implements Stateful, Storable, Syncable {
	@Sync
	@Store
	private Component orientation = new Orientation(this).hookBasedOnHitSide();

	public BasicDuster() {
		add(new Collider());
		add(orientation);
		add(new RotatedRenderer(this).setTexture(this::getTexture));
		add(new ItemRenderer(this));
		add(new Category("buildingBlocks"));
		events.on(RightClickEvent.class).bind(this::click);
		orientation.events.on(Block.PlaceEvent.class).bind((e) -> YourMod.networkManager.sync(this));
	}

	public Optional<Texture> getTexture(Direction dir) {
		Optional<Texture> texture = Optional.empty();
		switch (dir) {
			case NORTH: texture = Optional.of(Textures.dusterFront); break;
			case EAST:
			case WEST: texture = Optional.of(Textures.dusterSides); break;
			case SOUTH: texture = Optional.of(Textures.dusterBack); break;
			case UP: texture = Optional.of(Textures.dusterTop); break;
			case DOWN: texture = Optional.of(Textures.dusterBottom); break;
		}
		return texture;
	}

	@Override
	public void read(Packet packet) {
		Syncable.super.read(packet);
		world().markStaticRender(position());
	}

	public void click(RightClickEvent event) {
		if (Game.network().isServer()) {
			System.out.println(get(Orientation.class).orientation());
		}
	}

	@Override
	public String getID() {
		return "basicDuster";
	}
}
```
