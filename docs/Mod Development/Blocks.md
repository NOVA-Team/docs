Blocks are the basic ingredient of any voxel game, and their existence is essential. To create a block, you must register it with the BlockManager in your mod's preInit() stage.

```java
BlockFactory blockStateless = blockManager.register(MOD_ID + ":simple", BlockStateless::new);
```

The code above registers a block class called `BlockStateless`. `BlockStateless` extends `Block`. The following is `BlockStateless`'s code.

```java
public class BlockStateless extends Block implements Syncable {

	public BlockStateless() {
		components.add(new StaticRenderer().onRender(new BlockRenderPipeline(this).withTexture(NovaBlock.steelTexture).build()));
		components.add(new Collider());
		components.add(new ItemRenderer(this)); // TODO: Deprecated
		components.add(Category.BUILDING_BLOCKS);

		events.on(RightClickEvent.class).bind(this::onRightClick);
	}

	public void onRightClick(RightClickEvent evt) {
		System.out.println("Sending Packet: 1234");
		NovaBlock.networkManager.sync(this);
	}

	@Override
	public void read(Packet packet) {
		System.out.println("Received packet: " + packet.readInt());
	}

	@Override
	public void write(Packet packet) {
		packet.writeInt(1234);
	}
}
```

See [here](https://github.com/NOVA-Team/NOVA-Example/blob/master/block/src/main/java/nova/sample/block/NovaBlock.java) for the most up-to-date example.

## Components
There are some components you will probably always want to implement in your blocks. However, none of them are required and can be left out or replaced with your own versions of it.

### `Collider`
This component determines a few properties of your block, namely if it is a cube, opaque, what its bounding and selection boxes are. It also has an event bus for collision events. The default collider is a 1x1x1 cube.

### `Category`
This is the category (equivalent to a creative tab in Minecraft) that this block belongs to.

### `Renderer`
This is responsible for rendering the block in the world. In the example above, `StaticRenderer` is used but there are a few others you can use as well. 

## Special Components
NOVA is meant to be modular and allows you to make your own components to add but it's also "Batteries included." Here are some components that NOVA provides you might find useful.

### `Orientation`
Orientation allows your block to be rotated and face towards a specific side. Using this, your block can have a front, back and specific sides.

If you just add this component to the components not much will happen. The best thing to do is save this in a variable and annotate it with the `@Sync` and `@Store` annotations. The `@Sync` will sync between client and server (for that you should also have the block sync when it is placed down, see networking on how to do that)
The `@Store` will save and load the orientation so the data is not lost when the world is reloaded

## Special Interfaces
### `Syncable`
You may have noticed that BlockStateless implements Syncable. This interface allows the block to handle packets easily. By implementing Syncable, the block can synchronize between server and client. You can override the default methods `read(Packet packet)` and `write(Packet packet)` as shown in the example to read and write custom packets upon synchronization. Any variable annotated by `@Sync` will be synchronized between server and client, as long as you either leave the default methods alone or call `Syncable.super.read(packet);` and `Syncable.super.write(packet);` from your read and write methods respectively.

### `Stateful`
By default, blocks will be stateless. This means that blocks will be unable to retain their variables and state. Stateless blocks are more efficient and are appropriate for blocks that are abundant and have no internal logic (e.g: Decoration blocks, ores and resources). However, more complex blocks will need to implement `Stateful` interface, which allows it to store its state in the world.

### `Storable`
Storable allows a block to store its variables when a game saves. By implementing `Storable`, the block will be able to use the `@Store` annotation on variables you want to store. Note that not all variables can be properly stored via `@Store`, so you may need to override `save` and `load` to store the variables in whatever way fits them. If you want to use both the annotations and read/write your own custom data, call `Storable.super.read(packet);` and `Storable.super.write(packet);` in your overridden read/write methods.

## Rendering
To render your block you have several options:

- Use the `StaticRenderer` and the `BlockRenderPipeline`.
- Use any of the other built-in NOVA renderers
- Create your own block renderer

More information can be found on the [Rendering](Rendering.md) page.

### `BlockRenderPipeline`
This is used for rendering simple cubes.

### `OrientationRenderPipeline`
This is for use in combination with the `Orientation` component, it rotates the rendering of the block to match the rotation stored in the `Orientation` object. If you use this you should also use a function to give multiple textures as there is no point in rotated rendering if the block has the same texture on all sides.

### `ConnectedTextureRenderPipeline`
This is used for rendering blocks with textures that merge when two such blocks are adjacent to each other.

## Advanced Example
This is an example of a block that combines most of the things listed above, it has a collider, is rotatable (and rendered as such) and print it's orientation to the console when right-clicked.

```java
BlockFactory blockStateless = blockManager.register(MOD_ID + ":basic_duster", BasicDuster::new);
```

```java
public class BasicDuster extends Block implements Stateful, Storable, Syncable {

	/*
	 * Orientation component.
	 * "hookBasedOnHitSide" sets up events so the orientation is set based upon, well, hit side.
	 * This needs to be synced to client, and stored, so @Sync and @Store are used.
	 */
	@Sync
	@Store
	private Orientation orientation = new Orientation(this).hookBasedOnHitSide();

	/**
	 * Constructor for this block. Adds components, and binds events.
	 */
	public BasicDuster() {
		components.add(new Collider(this)); // Collider (so the player doesn't walk through the block.)
		components.add(orientation); // Orientation (see above)
		components.add(new StaticRenderer().onRender(new BlockRenderPipeline(this).withTexture(this::getTexture)
				.apply(new OrientationRenderPipeline(orientation)).build())); // Version of RenderPipeline that honors Orientation.
		components.add(new ItemRenderer(this)); // Make the item render like the block. // TODO: Deprecated
		components.add(new Category("buildingBlocks")); // Put this in the "Building Blocks" Creative category (in MC, anyway)
		events.on(RightClickEvent.class).bind(this::click); // Make sure "click" is called when a player right-clicks this block
		events.on(Block.PlaceEvent.class).bind((e) -> YourMod.networkManager.sync(this)); // Make sure we sync when the orientation is initially set
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
}
```
