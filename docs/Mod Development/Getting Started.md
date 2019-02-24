# Workspace Setup

Workspace setup is done with the NOVA Gradle plugin, make sure you follow the setup docs [here](NOVA Gradle.md)

# Mod Loading
All mods have a main class that is annotated with `@Mod`. The `@Mod` annotation tells NOVA that this is a mod class that needs to be loaded. Furthermore, to actually load content in NOVA, a mod has to have `GlobalEvents` in the constructor and call the `globalEvents.on(Manager.Init.class).bind(evt -> this.register(evt.manager));` method to register content for that manager.

```java
@Mod(id = NovaBlock.MOD_ID, name = "Nova Example Block", version = "0.0.1", novaVersion = "0.1.0")
public class NovaBlock {

    public static final String MOD_ID = "novablock";

    public static BlockFactory blockStateful;
    public static BlockFactory blockStateless;

    public final GlobalEvents globalEvents;
    public final BlockManager blockManager;

    public NovaBlock(GlobalEvents globalEvents,
                     BlockManager blockManager) {
        this.blockManager = blockManager;
        this.globalEvents = globalEvents;

        this.globalEvents.on(BlockManager.Init.class).bind(evt -> this.registerBlocks(evt.manager));
    }

    public void registerBlocks(BlockManager blockManager) {
        blockStateful = blockManager.register(MOD_ID + ":stateful", BlockStateful::new);
        blockStateless = blockManager.register(MOD_ID + ":simple", BlockStateless::new);
    }
}
```

## Dependency Injection
All NOVA mods use dependency injection. Using dependency injection NOVA mods can automatically accept only the managers that they need. In the example above, the mod constructor only accepts a `BlockManager` and `GlobalEvents` so when the mod is constructed it will only be passed a `BlockManager` and `GlobalEvents`. If we were to change the constructor so it accepts a `BlockManager`, an `ItemManager` and `GlobalEvents`, the dependency injection system will pass it a `BlockManager`, an `ItemManager` and `GlobalEvents` when the mod is constructed. This allows the mod constructor to only accept whatever it needs and NOVA will determine what to pass it at load time.

## Working with third party mods
When writing a NOVA mod, sometimes, you might want to extend content from another mod. This can be achieved by using the `dependencies` parameter of the `Mod` annotation. The strings in the array are formatted as `other_mod_id@1.0.x`, where:

- `other_mod_id` is the id of the other mod.
- `1.0.x` is the version, where the letter `x` is used as a wildcard.
- (optional) adding `f` to the end of the string makes the mod required.
