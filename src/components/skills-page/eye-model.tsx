import React, {RefObject, useContext, useRef} from "react";
import {useFrame} from "@react-three/fiber";
import useWindowWidth from "../../hooks/use-window-width";
import MousePositionContext from "../../contexts/mouse-position-context";
import {useGLTF} from "@react-three/drei";
import {GLTF} from "three/examples/jsm/loaders/GLTFLoader";
import {Group} from "three";

export interface EyeModelProps {
    bannerRef: RefObject<HTMLDivElement>;
}

export default function EyeModel(props: EyeModelProps) {
    // const eyeObject = useObjWTexture("/exp/models/eyeball/eyeball.obj", "/exp/models/eyeball/eyeball.mtl");
    const mousePositionRef = useContext(MousePositionContext)
    const windowWidth = useWindowWidth();
    const gltf = useGLTF('/exp/models/eye/scene.gltf') as GLTF;
    const ref = useRef<Group>(null);

    // const [isFirstRender, setIsFirstRender] = useState(true);

    const cameraZ = 100;
    const eyePositionY = 100;
    const YOffset = -180;

    useFrame(() => {
        if (!props.bannerRef.current || !mousePositionRef?.current || !ref.current || !ref) {
            return;
        }

        ref.current.lookAt(
            mousePositionRef.current.x - windowWidth/2,
            -mousePositionRef.current.y + props.bannerRef.current.clientHeight/2 + eyePositionY + YOffset,
            cameraZ
        );
    });

    console.log(gltf);

    return (
        <primitive
            ref={ref}
            object={gltf.scene}
            // scale={[1, 0.5, 0.5]}
            position={[0, eyePositionY, -200]}
        />
    );
}