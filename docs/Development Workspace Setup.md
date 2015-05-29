I would suggest keeping NOVA development in it's own folder such as:
```
NOVA
|-- NovaCore
|-- NovaWrapper-MC
`-- NovaExample
```

## NovaCore
Setting up a NovaCore development workspace is easy, although most contributers will need a wrapper workspace setup too.

### Steps
1. Clone NovaCore and cd to that directory
2. Import the project as a gradle project in IDEA or run `gradle eclipse` depending on what IDE you use.

## Minecraft Wrapper
The MinecraftWrapper can be built in much the same way as NovaCore, but if you plan on modifying the source you must create an extra file.

### Steps
1. Clone NovaWrapper and NovaCore (If you have not cloned NovaCore already)
2. Open your gradle user home directory (`~/.gradle/` on linux or `C:/Users/.gradle/` on windows). This will not exist if you have not run gradle before: create it.
3. In your gradle user home create (or edit) a file called `gradle.properties`
4. In `gradle.properties` place the line `nova.core.location = /path/to/NovaCore/`. Make sure the path is fully qualified (i.e. starts with `C:/` or `/`) and points to where you cloned NovaCore.
5. Import the NovaWrapper-MC project as a gradle project in IDEA or run `gradle eclipse` (in the NovaWrapper-MC directory) depending on what IDE you use.
6. If you are using idea, run `gradle genIntellijRuns` to generate run configurations for the client and server.
6. Append to the VM arguments of your run configurations "-Dfml.coreMods.load=nova.wrapper.mc1710.NovaMinecraftCore"
