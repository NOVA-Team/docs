# Mod Loading
A mod class is the main loading class of a mod. It is annotated with @NovaMod annotation.

A mod class may implement the interface Loadable. Once implemented, it can override the default methods "preInit", "init" and "postInit" which will be called at that sequence when the game is initialized. Most content in NOVA must be registered during the preInit phase.

```java
@NovaMod(id = NovaBlock.id, name = "Nova Example Block", version = "0.0.1", novaVersion = "0.0.1")
public class NovaBlock implements Loadable {

    public static final String id = "novablock";

    public static BlockFactory blockStateful;
    public static BlockFactory blockStateless;
    
    public final BlockManager blockManager;
    
    public NovaBlock(BlockManager blockManager) {
        this.blockManager = blockManager;
    }

    @Override
    public void preInit() {
        blockStateful = blockManager.register(BlockStateful.class);
        blockStateless = blockManager.register(BlockStateless.class);
    }
}
```

All NOVA mods will need to use dependency injection. It is a clean way to inject different managers that you need into your mod class. The example above shows BlockManager being injected to the main mod class through the constructor. By specifying the "BlockManager" parameter in the constructor, NOVA will automatically resolve your dependencies and supply your mod with an instance of BlockManager upon construction.