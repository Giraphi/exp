<h2>Links</h2>

-   https://github.com/pmndrs/react-three-fiber
-   https://github.com/pmndrs/react-three-fiber/blob/master/markdown/api.md
-   https://threejs.org/docs/

<h2>Insights</h2>

Beispiel zu `attach`:

-   Sagen wir, ich verwende ein `<meshBasicMaterial>`
-   Laut <a href="https://threejs.org/docs/?q=meshbasi#api/en/materials/MeshBasicMaterial">three.js doc</a> hat MeshBasicMaterial ein "property" `map` (verlangt eine `Texture`)
-   Um in r3f an dieses `map` eine `texture` zu reichen, benutzen wir `attach`

```jsx
<meshBasicMaterial>
    <texture attach="map" />
</meshBasicMaterial>
```

-   Besonderheit: Alle "Material" und "Geometry" components haben direkt `attach="material"` bzw. `attach="geometry"` gesetzt! D.h. ich kann schreiben:

```jsx
<mesh>
    <meshBasicMaterial />
    <boxGeometry />
</mesh>
```
