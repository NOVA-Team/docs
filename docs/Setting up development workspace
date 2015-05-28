This is the temporary way to set up a NOVA workspace until Nova Gradle is complete.

### Minecraft
In Eclipse, we will refer to each repository as a project. In IntelliJ, it will be referred to as a module.

1. Do a normal Forge set up (eclipse or intellij)
2. Clone NOVAWrapper and NOvaCore
2. Import the two reponsitories as Gradle projects
3. Make NovaWrapper project/module depend Forge module
4. Make NovaWrapper depend on NovaCore (if Gradle already added the jar dependency, change it to dependend on the repository you just cloned)
5. Any NOVA mod should ONLY depend on Nova Core. The wrapper is only used to run the mod on Minecraft.
6. Add to VM arguments "-Dfml.coreMods.load=nova.wrapper.mc1710.NovaMinecraftCore"
