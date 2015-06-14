# Workspace Setup

NOVA projects use Gradle for setting up workspace and building mods. NOVA-Gradle is a specific Gradle plugin designed to allow NOVA mods to be easily built and created. Below is an example of a NOVA-Gradle build file.

build.gradle:
```groovy
plugins {
	id "java"
	id "nova.gradle" version "0.1.4"
}

dependencies {
	compile "nova.core:NovaCore:0.1.0-SNAPSHOT"
}

nova {
	wrappers {
		"17" {
			wrapper = "nova.wrapper.mc1710:NovaWrapper-MC1.7.10:0.1-SNAPSHOT"
		}
		"18" {
			wrapper = "nova.wrapper.mc18:NovaWrapper-MC1.8:0.1-SNAPSHOT"
		}
	}
}
```

## Workspace Structure

Your workspace structure should include a build.gradle file, and a gradle wrapper. Once you have your build.gradle set up, proceed to generate files for your IDE.

Type in the command line: `gradlew idea` for IntelliJ.

OR

Type in the command line: `gradlew eclipse` for Eclipse.

To run the mod through a specific wrapper in Gradle, you will need to type a Gradle command. For example, if we want to run a mod on Minecraft 1.8, we will type `gradlew run18Client`.

# Mod Loading
All mods have a main class that implements `Loadable` and is annotated with `@NovaMod`. The `@NovaMod` annotation tells NOVA that this is a mod class that needs to be loaded. Any class which implements `Loadable` has three methods, `preInit()`, `init()`, and `postInit()`. These methods are automatically called during the appropriated loading phases. Most of the content in NOVA must be registered during the preInit phase.

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

## Dependency Injection
All NOVA mods use dependency injection. Using dependency injection NOVA mods can automatically accept only the managers that they need. In the example above, the mod constructor only accepts a `BlockManager` so when the mod is constructed it will only be passed a `BlockManager`. If we were to change the constructor so it accepts a `BlockManager` and an `ItemManager`, the dependency injection system will pass it a `BlockManager` and an `ItemManager` when the mod is constructed. This allows the mod constructor to only accept whatever it needs and NOVA will determine what to pass it at load time.
