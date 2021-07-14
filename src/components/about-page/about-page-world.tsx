import React, {Suspense} from "react";
import useWindowWidth from "../../hooks/use-window-width";
import BackHomeModel from "../shared/back-home-model";


export default function AboutPageWorld() {
    const windowWidth = useWindowWidth();

    return (
        <>
            <ambientLight color="white" intensity={0.01}/>
            <group
                position={[-windowWidth / 5, 200, 0]}
            >
                <pointLight
                    color={"#ffffff"}
                    intensity={3}
                    distance={1000}
                    decay={10}
                    position={[40, 20, 40]}
                    castShadow={true}
                >
                </pointLight>

                <Suspense fallback={null}>
                    <BackHomeModel
                        modelUrl={"models/pharaoh.obj"}
                        position={[0, -100, 0]}
                        scale={[10, 10, 10]}
                        // rotation={[Math.PI / 2,Math.PI,0]}
                        // rotation={[0,0,0]}
                    />
                </Suspense>
            </group>
        </>
    );
}