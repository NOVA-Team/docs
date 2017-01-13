It is suggested to keep NOVA development in it's own folder, an example file structure would be something like this:

```
NOVA
|-- core
|-- gui
...
```

**Important:**
NOVA uses Gradle for building. To help with using Gradle, NOVA uses the Gradle wrapper system so that the developer does not have to install Gradle. For that reason, if you do not have Gradle installed, instead of typing `gradle` type:

- `gradlew` on Windows,
- `./gradlew` on Linux or OS X.

## NOVA Core
Setting up a NOVA Core development workspace is easy, here's how you do it:

1. Clone [NOVA-Core].
2. Run `gradle setupDecompWorkspace idea` if you use IntelliJ IDEA or `gradle setupDecompWorkspace eclipse` if you use Eclipse.
3. Append `-Dfml.coreMods.load=nova.core.wrapper.mc.forge.v1_11.NovaMinecraftCore` for MC v1.11, `-Dfml.coreMods.load=nova.core.wrapper.mc.forge.v18.NovaMinecraftCore` for MC v1.8 or `-Dfml.coreMods.load=nova.core.wrapper.mc.forge.v17.NovaMinecraftCore` for MC v1.7 to the VM arguments of your run configurations.

[NOVA-Core]: https://github.com/NOVA-Team/NOVA-Corew
