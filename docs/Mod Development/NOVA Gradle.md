> If you feel like tl;dring this artifacle, skip to [#getting-started](#getting-started).
> I however do not reccomend this because knowing your build system will save you trouble later.
> If you know gradle well, you know what to skip already.

NOVA Gradle is the Gradle plugin which allows you to run NOVA mods on wrappers easily during testing.
Vanilla Gradle can compile and produce (non-wrapper) NOVA mods and plugins easilly but it lacks an easy way to test and debug these mods ingame.
NOVA Gradle handles IDE setup and game setup for you so you don't have to. Let's get started!

Gradle
------
Gradle is a tool some of you will have used when compiling MinecraftForge mods.
The Gradle <abbr title="Domain Specific Langauge">DSL</abbr> which Gradle uses to define configuration is written in Groovy, so you can use the awesome Groovy programming language to script your build.
Despite this, Gradle is convention based and declaritive. Compiling a NOVA provect is as simple as:
```groovy
plugins {
    id "java"
}

repositories {
    jcenter()
    maven { url "http://maven.novaapi.net/" }
}

dependencies {
    compile "nova.core:NovaCore:0.1.0-SNAPSHOT:api"
}
```
This short snippet simply defines that you are using the `java` Gradle plugin (you want to compile java),
that you want to resolve dependencies from the jcenter and NOVA repositories and
that your project's compilation depends on the NOVA api, version `0.1.0-SNAPSHOT`.

The `java` plugin defines several important tasks just as `compileJava` `jar` and `build`.
But wait you say, how do you run Gradle? Do I have to install yet **another** thing... What a pain!

### The Gradle Wrapper
The Gradle wrapper solves this problem by providing scripts that you place in your project directory which downloads Gradle automatically for you then invokes the downloaded Gradle version.
The Gradle wrapper is included in the NOVA template project.

NOVA Gradle
-----------
The previous snippet allows you to build a jar which can be loaded by NOVA wrappers, but there is no easy way to debug and run this mod every time you make a change. This is where NOVA Gradle comes in.

### Getting started
To explain to you how to use NOVA Gradle and how to set up your mod development workspace, we will use the NOVA template project from Github.
The NOVA Template project can be downloaded from [here](http://MAKE JENKINS ZIP THIS AND STUFF LAZY RX14/) and then unzipped to the place where you want to develop your mod.

You will see the following files in the template:

> If you are tl;dring, skip everything that isn't marked "Customise this" until "Setting up"

#### `build.gradle`
This file is the file which describes the Gradle build process.

Here is an annotated version of the default build.gradle
```groovy
plugins {
    id "java" //This is a java project, scala and groovy plugins also exist
    id "nova.gradle" version "0.2.0" //Use the NOVA Gradle plugin version 0.2.0
}

dependencies { //Dependencies of your project.
    compile "nova.core:NovaCore:0.1.0-SNAPSHOT:api" //Depend on the NOVA API.
}

nova { //This block is used for configuring the NOVA Gradle plugin
    wrappers { //Configures wrapper profiles
        /**
         * This profile is called "17", you can skip the quotes if it's not numbers.
         * This profile for example will generate the "run17Client" gradle task and create an IDEA
         * config of the same name.
         */
        "17" {
            //The maven identifier of the wrapper this wrapper profile will use.
            wrapper "nova.wrapper.mc1710:NovaWrapper-MC1.7.10:0.1-SNAPSHOT"
        }

        //Wrapper profile for MC 1.8
        "18" {
            wrapper "nova.wrapper.mc18:NovaWrapper-MC1.8:0.1-SNAPSHOT"
        }
    }
}
```

#### `gradle.properties` (Customise this)
This file stores properties which are made available to the build process, such as version and maven group.

The Maven group defines a unique identifier for your project, and should be the same as your Java package.
The convention is to use your domain name backwards as the start of your package, for example `net.novaapi.template` if you own the domain `novaapi.net`.
If you don't have a domain, and you are open-sourcing the mod, the common practise is to use `com.github.githubusername.githubprojectname`.
If you aren't open sourcing or publishing the mod API, nobody really cares what package name you use...

#### `settings.gradle` (Customise this)
This file is used for setting the name of the project (`rootProject.name = "project name"`) and for multi-project builds.
Multi-project builds are a complex topic that I will not cover in this introduction.

#### `gradlew` and `gradlew.bat`
These scripts are the gradle wrapper scripts mentined before for running gradle.
Use simply `gradlew` on windows and `./gradlew` on linux.

#### `.gitignore`
This file configures files and folders ignored if you use the `git` revision control system.
We've included sensible defaults for you, so you don't go publishing all the wrong things.
Remember, if you publish the wrong things you will make RX14 mildly depressed if he happens across your project.

#### The `gradle/` folder
This is just files related to the gradle wrapper, you may occationally need to update the wrapper version in this folder, but unless instructed just ignore it.

### Setting up
After customising the files in your template project, pop up a terminal and `cd` to the project directory.
When you are in your project directory use `./gradlew idea` on linux or `gradlew idea` on windows to generate IDEA project files.
Eclipse is unfortunately not supported at this time, you will have to ask in IRC.
**TODO: Add instructions for eclipse.**

After it has generated these files, open the `.ipr` IDEA Project file in IDEA.
You should see some run configurations added correcponding to the wrapper profiles in the `build.gradle`.

### IDEA Bugs (on windows)
```
The supplied javaHome seems to be invalid. I cannot find the java executable. Tried location: C:\Program Files (x86)\JetBrains\IntelliJ IDEA 14.1.4\jre\bin\java.exe`
```
You will most likely experience the above (or similar) error when trying to run or debug the client.
This is a bug in IDEA, and the workaround is to use 64-bit IDEA.
To do this, edit your IntelliJ start menu shortcut and change the path of what it is running from `"C:\Install Path\bin\idea.exe"` to `"C:\Install Path\bin\idea64.exe"` like this:

![](http://i.imgur.com/oFQsOfl.png)

If the problem persists after this please ask in IRC.
