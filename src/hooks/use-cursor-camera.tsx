import {useFrame, useThree} from "@react-three/fiber";
import useDevice from "./use-device";
import {RefObject, useContext} from "react";
import MousePositionContext from "../contexts/mouse-position-context";
import {Object3D} from "three/src/core/Object3D";

export default function useCursorCamera(cameraRef: RefObject<Object3D>, enabled: boolean, switchYZAxis?: boolean) {
    const device = useDevice();
    const mousePositionRef = useContext(MousePositionContext).mousePositionRef;
    const canvasSize = useThree().size;

    useFrame(() => {
        if (!enabled || device === "small" || !mousePositionRef || !mousePositionRef.current || !cameraRef.current) {
            return;
        }

        if (switchYZAxis) {
            cameraRef.current.rotation.x = -0.00005 * (mousePositionRef.current.clientY - canvasSize.height / 2)
            cameraRef.current.rotation.z = 0.00005 * (mousePositionRef.current.clientX - canvasSize.width / 2);
            return;
        }

        cameraRef.current.rotation.x = -0.00005 * (mousePositionRef.current.clientY - canvasSize.height / 2)
        cameraRef.current.rotation.y = -0.00005 * (mousePositionRef.current.clientX - canvasSize.width / 2);
    });
}
