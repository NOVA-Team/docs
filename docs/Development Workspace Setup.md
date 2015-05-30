It is suggested to keep NOVA development in it's own folder such, an example file structure would be something like this:

```
NOVA
|-- NovaCore
|-- NovaWrapper-MC
`-- NovaExample
```

**Important:**
NOVA uses Gradle for building. To help with using Gradle, NOVA uses the Gradle wrapper system so that the developer does not have to install Gradle. For that reason, if you do not have Gradle installed, instead of typing `gradle` type:

- `gradlew` on Windows,
- `./gradlew` on Linux or OS X.

## NOVA-Core
Setting up a NOVA-Core development workspace is easy, although most contributers will need a wrapper workspace setup too.

1. Clone NOVA-Core and cd to that directory
2. Import the project as a Gradle project in IDEA or run `gradle eclipse`, depending on what IDE you use.

## Minecraft Wrapper
The NOVA-Wrapper for Minecraft can be built in much the same way as NOVA-Core, but if you plan on modifying the source you must create an extra file.

1. Clone NOVA-Wrapper and NOVA-Core (If you have not cloned NOVA-Core already).
2. Open your Gradle user home directory (`~/.gradle/` on Linux/OSX or `C:/Users/.gradle/` on Windows). This will not exist if you have not run Gradle before: create it.
3. In your Gradle user home directory create (or edit) a file called `gradle.properties`.
4. In `gradle.properties` place the line `nova.core.location = /path/to/NovaCore/`. Make sure the path is fully qualified (i.e. starts with `C:\\` or `/`) and points to where you cloned NovaCore.

    **PLEASE NOTE:** You must escape backslashes in paths. Example: `C:\\projects\\NOVA\\NovaWrapper-MC`. 

5. Go back to where you cloned NOVA-Wrapper-MC and run `gradle setupDecompWorkspace idea genIntellijRuns` if you use IntelliJ IDEA or `gradle setupDecompWorkspace eclipse` if you use Eclipse.
6. Append `-Dfml.coreMods.load=nova.wrapper.mc1710.NovaMinecraftCore` to the VM arguments of your run configurations.
