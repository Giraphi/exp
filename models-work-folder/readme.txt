--------------------------
Tips for model file sizes:
--------------------------

- glb is preferred over gltf, because it consists of a single file instead of references to images etc.
- Also so far, glb files were generally smaller than a gltf folder
- After downloading a gltf-folder, compress the texture image like so:

        convert -resize 20% Hands_Low_defaultMat1_normal.png Hands_Low_defaultMat1_normal.png

- After that, convert the gltf-folder to a glb file.

        gltf-pipeline -i scene.gltf -o hand.glb -d

  The -d flag applied additional compression to it. See https://github.com/CesiumGS/gltf-pipeline

- To display current file sizes, use
        ls -hl

