<h1>Let's study <a href="https://codesandbox.io/s/camera-scroll-tu24h?file=/src/App.js">
this scroll camera tracking</a></h1>

The definition of the camera movement is defined in the `.glb` file:

```jsx
const { nodes, materials, animations } = useGLTF("/model.glb")
const { actions } = useAnimations(animations, group)
```



<h3>Smooth out movements with `THREE.MathUtils.lerp`</h3>

```jsx
useFrame((state) => {
    actions["CameraAction.005"].time = THREE.MathUtils.lerp(
      actions["CameraAction.005"].time,
      actions["CameraAction.005"].getClip().duration * scroll.current,
      0.05)
  })
  ```

- `actions["CameraAction.005"].time`: value between 0 and 1 indicating the overall action progress
- `actions["CameraAction.005"].getClip().duration` overall action duration
- `actions["CameraAction.005"].getClip().duration * scroll.current` target time within the animation according to our scroll progress

On every frame sample with add a value to `actions["CameraAction.005"].time` the brings us closer to our target time.
- The value is `0` (min-value), if we already reached the target
- The value is `0.05 * totalTime` (max-value), if we are at time `0` and our target is `totalTime`. (One frame later it will already be smaller)
- The value gets bigger the further we are away from the target.
- If the target position doesn't change, the value gets smaller on every frame, resulting in a 'slowdown' effect.
