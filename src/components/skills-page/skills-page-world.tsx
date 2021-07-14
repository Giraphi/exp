import React, {Suspense} from "react";
import useWindowWidth from "../../hooks/use-window-width";
import BackHomeModel from "../shared/back-home-model";

export default function SkillsPageWorld() {
    const windowWidth = useWindowWidth();
    return (
        <>
            <ambientLight color="white" intensity={0.03}/>
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
                        repeats={20}
                        modelUrl={"models/skull.obj"}
                        position={[0, -150, 0]}
                        scale={[5, 5, 5]}
                        rotation={[-1.5,0,0.1]}
                    />
                </Suspense>
            </group>
        </>
    );
}