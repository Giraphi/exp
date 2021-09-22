import {Object3D} from "three/src/core/Object3D";

export class BirdControlsType {
    constructor(object: Object3D, domElement?: HTMLElement);

    object: Object3D;
    domElement: HTMLElement | HTMLDocument;

    movementSpeed: number;
    lookSpeed: number;

    handleResize(): void;
    update(delta: number): this;
    dispose(): void;
    setMoveForward(isMovingForward: boolean): void;
    setMoveBackward(isMovingBackward: boolean): void;
    setPanSpeed(panSpeed: number): void;
}
