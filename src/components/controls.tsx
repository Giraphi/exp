import React, {MutableRefObject, useContext, useEffect, useRef} from 'react'
import {extend, useFrame, useThree} from 'react-three-fiber'
import {BirdControls} from "../birdControls/birdControls";
import {Object3D} from "three/src/core/Object3D";
import {BirdControlsType} from "../birdControls/birdControlsType";
import MovementContext from "../contexts/movement-context";

extend({ BirdControls });

export interface ControlsProps {
    object: MutableRefObject<Object3D | null>;
}

function Controls(props: ControlsProps) {
    const controlsRef = useRef<BirdControlsType>(null)
    const { gl } = useThree();

    const movementContext = useContext(MovementContext);

    useFrame((state, delta) => {
        if (!controlsRef || !controlsRef.current) {
            return;
        }

        controlsRef.current.update(delta);
    });

    useEffect(() => {
        if (!controlsRef || !controlsRef.current) {
            return;
        }

        controlsRef.current.setMoveForward(movementContext.isMovingForward)
    }, [movementContext.isMovingForward]);

    useEffect(() => {
        if (!controlsRef || !controlsRef.current) {
            return;
        }

        controlsRef.current.setMoveBackward(movementContext.isMovingBackward)
    }, [movementContext.isMovingBackward]);

    useEffect(() => {
        if (!controlsRef || !controlsRef.current) {
            return;
        }

        movementContext.isTurningRight ? controlsRef.current.setPanSpeed(500) : controlsRef.current.setPanSpeed(0)
    }, [movementContext.isTurningRight]);

    useEffect(() => {
        if (!controlsRef || !controlsRef.current) {
            return;
        }

        movementContext.isTurningLeft ? controlsRef.current.setPanSpeed(-500) : controlsRef.current.setPanSpeed(0)
    }, [movementContext.isTurningLeft]);


    if (!props.object || !props.object.current) {
        return <></>
    }

    return (
        <birdControls
            args={[props.object.current, gl.domElement]}
            ref={controlsRef}
            movementSpeed={500}
            lookSpeed={0.1}
        />
    )
}

export default Controls
