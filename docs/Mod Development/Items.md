Items are the second basic ingredient of any voxel game, and their existence is almost as essential as the existence of blocks. To create an item, you must register it with the ItemManager in your mod's preInit() stage.

```java
ItemFactory itemScrewdriver = itemManager.register(MOD_ID + ":testscrewdriver", ItemScrewdriver::new);
```

The code above registers an item class called `ItemScrewdriver`. `ItemScrewdriver` extends `Item`. The following is `ItemScrewdriver`'s code.

```java
public class ItemScrewdriver extends Item {

	public ItemScrewdriver() {
		components.add(new Category("tools"));
		components.add(new ItemRenderer()).setTexture(NovaItem.screwTexture); // TODO: Deprecated

		events.on(UseEvent.class).bind(event -> event.action = true);
	}
}
```

See [here](https://github.com/NOVA-Team/NOVA-Example/blob/master/item/src/main/java/nova/sample/item/NovaItem.java) for the most up-to-date example.

## Components
There are some components you will probably always want to implement in your blocks. However, none of them are required and can be left out or replaced with your own versions of it.

### `Category`
This is the category (equivalent to a creative tab in Minecraft) that this item belongs to.

### `ItemRenderer`
This handles the rendering of the item in your inventory and hand.

## Special Interfaces
### `Syncable`
Syncable allows an item to handle packets easily. By implementing Syncable, the item can synchronize between server and client. You can override the default methods `read(Packet packet)` and `write(Packet packet)` as shown in the example to read and write custom packets upon synchronization. Any variable annotated by `@Sync` will be synchronized between server and client, as long as you either leave the default methods alone or call `Syncable.super.read(packet);` and `Syncable.super.write(packet);` from your read and write methods respectively.

### `Storable`
Storable allows an item to store its variables when a game saves. By implementing `Storable`, the item will be able to use the `@Store` annotation on variables you want to store. Note that not all variables can be properly stored via `@Store`, so you may need to override `save` and `load` to store the variables in whatever way fits them. If you want to use both the annotations and read/write your own custom data, call `Storable.super.read(packet);` and `Storable.super.write(packet);` in your overridden read/write methods.  
Examples include: Electric charge of batteries, amount of fuel in a canister, etc.

## Rendering
To render your item you have several options:

- Use the `ItemRenderer` (Deprecated)
- Use any of the other built-in NOVA renderers
- Create your own item renderer

### `ItemRenderer`
This is used for rendering simple items with a single texture.
