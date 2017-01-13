* Use sentence case, eg: "This is an example of sentence case."
* Use `{@code something}` for names of things (like "`true`")
* Leave a gap after the description
* Use a full stop after every sentence
* Use the tag `@implNotice` to specify implementation details for the wrapper

### Example 1
```java
/**
 * Called when the block is right clicked.
 *
 * @param entity The entity that right clicked this object. Most likely a player.
 * @param side The side it was clicked.
 * @param hit The position it was clicked.
 * @return {@code true} if the right click action does something.
 */
public boolean onRightClick(Entity entity, int side, Vector3d hit) {
    return false;
}
```

* For `{@link}` tags, use the full location.

###Example 2
```java
/**
 * Called to get the BlockFactory that refers to this Block class.
 *
 * @return The {@link nova.core.block.BlockFactory} that refers to this Block class.
 */
public final BlockFactory getFactory() {
	return (BlockFactory) components.get(FactoryProvider.class).factory;
}
```
