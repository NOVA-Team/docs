# Event Handling
One of NOVA's core features is the large variety of events you can use. With Java 8, you can bind functions to events like so:

```java
events.on(RightClickEvent.class).bind(this::onRightClick);
```

To bind a function that function needs to have the class you bind with as parm, for example:

```java
public void onRightClick(RightClickEvent evt) {
	System.out.println("Sending Packet: 1234");
	NovaBlock.networkManager.sync(this);
}
```

## Available Events
### `Block` Events
- NeighborChangeEvent
- PlaceEvent
- RemoveEvent
- RightClickEvent
- LeftClickEvent
- DropEvent

### `Item` Events
- TooltipEvent
- UseEvent
- RightClickEvent