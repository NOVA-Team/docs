# Blocks
Blocks are the basic building ingredient and its existence is impertive in any voxel game. To create a block, you must register it with the BlockManager in your mod's preInit() stage.

```java
blockStateless = blockManager.register(BlockStateless.class);
```

The code above registers a block class called "BlockStateless". "BlockStateless" extends Block. The following is BlockStateless's code.

```java
public class BlockStateless extends Block implements Syncable {

	public BlockStateless() {
		add(new StaticBlockRenderer(this)).setTexture((dir) -> Optional.of(NovaBlock.steelTexture));

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

## Component System
As seen above, every single Block must implement the method getID(), which returns a unique identifier for the block type. BlockStateless also calls a couple of methods "add" in its constructor. This is an example of the component system used in NOVA. All Blocks, Entities and Items use the component system. It allows modularity in implementing features and prefabs. The example block above adds the component "StaticBlockRenderer", which defines how it is rendered in the world. The block also has the component "Collider", which defines its collision bounds.

## Event Handling
NOVA also comes with events. The example block above implements the RightClickEvent, which is called when the block is right clicked. As a feature of Java 8, onRightClick has been set to bind with the event bus through method reference. This means that when the event is called, onRightClick will be called.

## Special Interfaces
### Syncable
You may have noticed that BlockStateless implements Syncable. This interface allows the block to handle packets easily. By implementing Syncable, the block is capable of reading and writing packets between server and client. You can override the default methods `read(Packet packet)` and `write(Packet packet)` as shown in the example to read and write custom packets. Any variable annotated by `@Sync` will be synced between server and client. 

### Stateful
By default, blocks will be stateless. This means that blocks will be unable to retain their variables and state. Stateless blocks are more efficient and are appropriate for blocks that are abundant and have no internal logic (e.g: Decoration blocks, ores and resources). However, more complex blocks will need to implement `Stateful` interface, which allows it to store its state in the world.

### Storable
Storable allows a block to store its variables when a game saves. By implementing `Storable`, the block will be able to override `save` and `load` methods. Any variable that is annotated by `@Store` will have their values be automatically stored. However, not all variables can be properly stored.
