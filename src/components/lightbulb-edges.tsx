import React, {useMemo} from "react";
import {BoxBufferGeometry} from "three";


export default function LightbulbEdges() {
    const geom = useMemo(() => new BoxBufferGeometry(1, 1, 1), []);

    return (
        <>
            <lineSegments>
                <edgesGeometry
                    attach="geometry"
                    args={[geom]}
                />
                <lineBasicMaterial
                    color={"black"}
                    linewidth={1}
                />
            </lineSegments>
        </>
    );
}