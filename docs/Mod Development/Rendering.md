So far, we've learned to create Blocks and Items, however they are currently invisible to the player. Therefore, we are going to learn how to render them and make them visible to the player.
Rendering in NOVA is handled using `Renderer`s and pipelines. To create a rendering pipeline, you must first choose a renderer and supply a pipeline to it in the `onRender` method.

```java
components.add(new StaticRenderer().onRender(new BlockRenderPipeline(this).withTexture(YourMod.blockTexture).build());
```

The code above adds a `StaticRenderer` to this object, then creates a `BlockRenderPipeline` for this object with the texture `blockTexture` provided by `YourMod`. After this is done, the `build()` method is called to finish the creation of the rendering pipeline and return a function for rendering the block.

## Renderers
A renderer is a component that determines how an object will appear ingame and how often the object will be redrawn. The following are all the renderers you can use in nova.

### `StaticRenderer`
This is used for rendering providers that only redraw the renderer when either the provider notifies the renderer to do so, or in case of blocks, the world notifies the renderer. To notify the block's `StaticRenderer` to redraw the model, you would call the following code:

```java
world().markStaticRender(position());
```

### `DynamicRenderer`
This is used for rendering providers that redraw the renderer every frame. This renderer should only be reserved for providers which truly need it.

## Render pipelines
A renderer needs to be supplied a rendering pipeline, which contains information on how to actually render the object. You can either create your own, or use any of the pre-built ones. To finish rendering with a pre-built pipeline, you have to call the `build()` method on the instance.

```java
components.add(new StaticRenderer().onRender(new RenderPipeline(this).build());
```

Where `RenderPipeline` is an implementation of the `RenderPipeline` abstract class. The following are implementations of the `RenderPipeline` class that come with NOVA which can be used on any provider type.

### `BlockRenderPipeline`
This is used for rendering simple cubes.

### `ItemRenderPipeline`
This is used for rendering flat one voxel thick squares.

## Models
NOVA also allows using of models to render renderable component providers. To load a model, you do the following:

```java
providedModel = renderManager.registerModel(new ModelProvider(MOD_ID, "grinder"));
```

Where `ModelProvieder` is an implementation of the `ModelProvider` abstract class. The following are implementations of the `ModelProvider` class that come with NOVA.

To render the model, you have to provide your own rendering pipeline. The following is a simple way to render the model shown above.

```java
components.add(new StaticRenderer().onRender(model -> {
	Model providedModel = YourMod.providedModel.getModel();

	if (providedModel instanceof MeshModel)
		((MeshModel)providedModel).bindAll(YourMod.providedModelTexture);

	model.children.add(grinderModel);
}
```

### `WavefrontObjectModelProvider`
Loads wavefront `.obj` models for use by your mod. Wavefront models are some of the most common model formats in use on the Internet.

### `TechneModelProvider`
Loads Techne `.tcn` models for use by your mod. Techne was created to easily make entity models for Minecraft, but it has seen application of it's model format in other places as well, such as rendering blocks and items.

### Advanced model usage

It is also possible to do some more advanced things when rendering models. The following is the code of `BlockStateful`'s rendering pipeline from NOVA Blocks Example.

```java
components.add(new StaticRenderer().onRender(model -> {
	Model grinderModel = NovaBlock.grinderModel.getModel();

	grinderModel
		.combineChildren("crank", "crank1", "crank2", "crank3")
		.matrix.rotate(new Rotation(RotationUtil.DEFAULT_ORDER, 0, 0, angle));

	if (grinderModel instanceof MeshModel)
		((MeshModel)grinderModel).bindAll(NovaBlock.grinderTexture);

	model.children.add(grinderModel);
}));
```
