import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ReactThreeFiber } from "@react-three/fiber";
import { MapControls, OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";
import { FlyControls } from "three/examples/jsm/controls/FlyControls";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            mapControls: ReactThreeFiber.Object3DNode<MapControls, typeof MapControls>;
            firstPersonControls: ReactThreeFiber.Object3DNode<FirstPersonControls, typeof FirstPersonControls>;
            flyControls: ReactThreeFiber.Object3DNode<FlyControls, typeof FlyControls>;
            orbitControls: ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>;
        }
    }
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
