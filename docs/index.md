# NOVA API
Welcome to the documentation for the NOVA project. NOVA stands for **N**eatly **O**rganized **V**oxel **A**PI" and is a project to create a total abstraction layer for creating addons to Voxel games such as [Minecraft] and [Terasology].

## More about NOVA
NOVA provides modders with the ability to write mods for any game or mod loader that has a NOVA-compatible wrapper for it - which will at first include Minecraft Forge for 1.7.10, 1.8 and 1.11, but developers are free to write wrappers for any other mod loader or minecraft-like game. The goal of NOVA is to provide modders both with an API that is easy to understand and learn while giving them confidence that their work can be used in many different environments without a painful update process.

Mods written using the NOVA library can be run on Forge, or can be run on top of any other mod loader or minecraft-like game for which a NOVA wrapper is available. This means that mods do not have to update when Minecraft updates. Also, it makes us relatively independent from Minecraft (or any of its mod loaders, for that matter), providing modders with the confidence that their mod will be usable even if major issues arise in Minecraft world.

Aside from the Modding API, we also hope to provide a peaceful modding environment that is open for everyone no matter their skills and experience.

Minecraft modding is supposed to be fun --- for everyone!

## What's an abstraction layer?
Every version of Minecraft is built slightly differently and so is every Minecraft alternative. As a result, every time Minecraft updates, every mod written for it has to be updated to keep pace with the internal changes - there is no stable API. Even different mod loaders can add their own functionality and their own APIs to its users.

Even though the code itself is different between each, the concepts are generally very similar. Every Minecraft-like game has a concept of blocks, items, entities, worlds, ... and instead of having modders depend on how exactly they are implemented in each game and version, we can instead expose classes and functions that expose the concepts shared by them using a stable and well-thought out API.

By focusing on this common API, we can make it easy to use. Additionally, by making use of Java 8 (which will be a requirement for running any NOVA wrapper) we can provide the latest language features to all modders - resulting in a cleaner API and cleaner code.

## What inspired you to create this?
Besides the difficulties with porting Minecraft mods from one version to another, we have recently also seen the disappearance of a major modding API (Bukkit). When Microsoft bought Minecraft, we were not sure what their plans are, and so far, a clear statement has been absent. Modders, however, don't like to mod not being sure if the mod can be used in future.

Although we cannot control the future of Minecraft, we can create a common API, abstract all necessary concepts with this abstraction layer, and have modders work on that. No matter what explodes in Minecraft world, we can always write a wrapper for a different modding library or any game that would contain the necessary features. The API is licensed as LGPLv3 and can be used by anyone without any legal worries, ever. And we as developers intend to communicate openly with the modding community to make sure that modders have the functionality they need.


[Minecraft]: http://minecraft.net
[Terasology]: http://terasology.org/