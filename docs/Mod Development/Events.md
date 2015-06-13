#Event Handling
NOVA also comes with events. As a feature of Java  8 you can bind functions to events as shown below.
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

#Block Events

A list of available block events:

- NeighborChangeEvent
- PlaceEvent
- RemoveEvent
- RightClickEvent
- LeftClickEvent
- DropEvent
