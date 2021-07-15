import React, {Suspense, useMemo} from "react";
import useWindowWidth from "../../hooks/use-window-width";
import Lightbulb from "../shared/lightbulb";
import {Vector3} from "three/src/math/Vector3";
import ManModel from "./man-model";


export default function SkillsPageWorld() {
    const windowWidth = useWindowWidth();

    const lightbulbPosition = useMemo(() => {
       return new Vector3(-windowWidth / 5, 200, 0) ;
    }, [windowWidth]);

    return (
        <>
            {/*<ambientLight color="white" intensity={0.05}/>*/}
            {/*<group*/}w
            {/*    position={[-windowWidth / 5, 200, 0]}*/}
            {/*>*/}
            {/*    <pointLight*/}
            {/*        color={"#ffffff"}*/}
            {/*        intensity={3}*/}
            {/*        distance={1000}*/}
            {/*        decay={10}*/}
            {/*        position={[40, 20, 40]}*/}
            {/*        castShadow={true}*/}
            {/*    >*/}
            {/*    </pointLight>*/}
            {/*    */}


            <Lightbulb
                position={lightbulbPosition}
                text={"Back Home"}
                height={95}
                onClick={() => undefined}
                path={"/home"}
                horizontal={true}
            />
                <Suspense fallback={null}>
                    <ManModel/>

                </Suspense>
            {/*</group>*/}
        </>
    );
}
                        // repeats={20}
                        // modelUrl={"models/skull.obj"}
                        // position={[0, -150, 0]}
                        // scale={[5, 5, 5]}
                        // rotation={[-1.5,0,0.1]}
