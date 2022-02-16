<h2>Links</h2>

-   https://github.com/pmndrs/react-three-fiber
-   https://github.com/pmndrs/react-three-fiber/blob/master/markdown/api.md
-   https://threejs.org/docs/

<h2>Insights</h2>

<h3>Attach</h3>

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

<h3>dispose</h3>

In plain three.js muss man jede resource, die man zur scene geaddet hat <a href="https://threejs.org/docs/#manual/en/introduction/How-to-dispose-of-objects">manuell wieder entfernen</a>, wenn man sie nicht mehr braucht. Dazu ruft man `dispose()` auf.

In r3f wird `dispose()` für uns <a href="https://docs.pmnd.rs/react-three-fiber/api/objects#disposal">automatisch gecalled</a>, wenn das entsprechende component unmounted wird!
Für den Fall, dass man eine resource trotzdem behalten will, egal was mit dem react tree passiert, kann man

```
dispose={null}
```

setzen. Das heißt dann einfach, dass beim unmounten kein `dispose()` gecalled wird und die ressource weiter verfügbar bleibt und wir selbst zu gegebener zeit `dispose()` callen können.

