It is suggested to keep NOVA development in it's own folder, an example file structure would be something like this:

```
NOVA
|-- NovaCore
`-- NovaExample
```

**Important:**
NOVA uses Gradle for building. To help with using Gradle, NOVA uses the Gradle wrapper system so that the developer does not have to install Gradle. For that reason, if you do not have Gradle installed, instead of typing `gradle` type:

- `gradlew` on Windows,
- `./gradlew` on Linux or OS X.

## NOVA Core
Setting up a NOVA Core development workspace is easy, although most contributers will need a wrapper workspace setup too.

1. Clone [NOVA-Core] and cd to that directory
2. Import the project as a Gradle project in IDEA or run `gradle eclipse`, depending on what IDE you use.

## Minecraft Wrapper
The NOVA Wrapper for Minecraft can be built in much the same way as NOVA Core, but, if you plan on modifying the source, you must create an extra file.

1. Clone [NOVA-Core] and [NOVA-Core] (If you have not cloned NOVA-Core already).
2. Go back to where you cloned NOVA-Wrapper-MC and run `gradle setupDecompWorkspace idea genIntellijRuns` if you use IntelliJ IDEA or `gradle setupDecompWorkspace eclipse` if you use Eclipse.
3. Append `-Dfml.coreMods.load=nova.core.wrapper.mc18.NovaMinecraftCore` for MC v1.8 or `-Dfml.coreMods.load=nova.core.wrapper.mc17.NovaMinecraftCore` for MC v1.7 to the VM arguments of your run configurations.

[NOVA-Core]: https://github.com/NOVA-Team/NOVA-Corew
