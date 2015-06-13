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
You may have noticed that BlockStateless implements Syncable. This interface allows the block to handle packets easily. By implementing Syncable, the block can synchronize between server and client. You can override the default methods `read(Packet packet)` and `write(Packet packet)` as shown in the example to read and write custom packets upon synchronization. Any variable annotated by `@Sync` will be synced between server and client, as long as you either leave the default methods alone or call "Syncable.super.read(packet);" and "Syncable.super.write(packet);".

### Stateful
By default, blocks will be stateless. This means that blocks will be unable to retain their variables and state. Stateless blocks are more efficient and are appropriate for blocks that are abundant and have no internal logic (e.g: Decoration blocks, ores and resources). However, more complex blocks will need to implement `Stateful` interface, which allows it to store its state in the world.

### Storable
Storable allows a block to store its variables when a game saves. By implementing `Storable`, the block will be able to use the @Store annotation on variables you want to store. Note that not all variables can be properly stored via @Store, so you may need to override `save` and `load` to store the variables in whatever way fits them. If you want to use both the annotations and read/write your own custom data, call "Storable.super.read(packet);" and "Storable.super.write(packet);" in your overridden methods.

##Rendering
For rendering you can use the StaticBlockRenderer shown above, make your own or use these

###RotatedRenderer
This is for use in combination with the Orientation component, it rotates the rendering of the block to match the rotation stored in the Orientation object. If you use this you should also use a function to give multiple textures as there is no point in rotated rendering if the block has the same texture on all sides

##Advanced Example
This is an example of a block that combines most of the things listed above, it has a collider, is rotatable (and rendered as such) and print it's orientation to the console when rightclicked

```java
public class BasicDuster extends Block implements Stateful, Storable, Syncable {

	/*
	 * Orientation component.
	 * "hookBasedOnHitSide" sets up events so the orientation is set based upon, well, hit side.
	 * This needs to be synced to client, and stored, so @Sync and @Store are used.
	 */
	@Sync
	@Store
	private Component orientation = new Orientation(this).hookBasedOnHitSide();

	/**
	 * Constructor for this block. Adds components, and binds events.
	 */
	public BasicDuster() {
		add(new Collider()); // Collider (so the player doesn't walk through the block.)
		add(orientation); // Orientation (see above)
		add(new RotatedRenderer(this).setTexture(this::getTexture)); // Version of StaticBlockRenderer that honors Orientation.
		add(new ItemRenderer(this)); // Make the item render like the block.
		add(new Category("buildingBlocks")); // Put this in the "Building Blocks" Creative category (in MC, anyway)
		events.on(RightClickEvent.class).bind(this::click); // Make sure "click" is called when a player right-clicks this block
		orientation.events.on(Block.PlaceEvent.class).bind((e) -> YourMod.networkManager.sync(this)); // Make sure we sync when the orientation is initially set
	}

	/**
	 * Gets the texture for a given side.
	 * Note that this is referred to by the code above(see "add(new RotatedRenderer")),
	 * and does not have to be specifically called "getTexture". It's just convention.
	 * @param dir The direction the side is on.
	 * @return A texture. Or empty. (TODO: What does empty do here?)
	 */
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

	/**
	 * Implements Syncable.read.
	 * This is called when a sync packet is received, to update the block's state.
	 * @param packet The sync packet.
	 */
	@Override
	public void read(Packet packet) {
		Syncable.super.read(packet); // Make sure @Sync annotations are processed.
		world().markStaticRender(position()); // Mark for static render.
	}

	/**
	 * This is referenced above(see "events.on(RightClickEvent.class)"),
	 * and handles a right click on this block.
	 * @param event Details of the right-click event.
	 */
	public void click(RightClickEvent event) {
		if (Game.network().isServer()) {
			// If we're on the server, then write the orientation to the console for debugging.
			System.out.println(get(Orientation.class).orientation());
		}
	}

	/**
	 * Gets the block ID.
	 * @return The block's ID.
	 */
	@Override
	public String getID() {
		return "basicDuster";
	}
}
```
