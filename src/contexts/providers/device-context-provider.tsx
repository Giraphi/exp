import React, {useCallback, useEffect, useState} from "react";
import DeviceContext, {Device} from "../device-context";

export interface DeviceContextProviderProps {
    children: React.ReactNode;
}

export default function DeviceContextProvider(props: DeviceContextProviderProps) {
    const getActiveDevice = useCallback(() => {
        if (window.innerWidth > 768) {
            return "large";
        }
        return "small";
    }, []);

    const [device, setDevice] = useState<Device>(getActiveDevice());

    useEffect(() => {
        function handleResize() {
            setDevice(getActiveDevice());
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [getActiveDevice]);

    return (
        <DeviceContext.Provider value={{device}}>
            {props.children}
        </DeviceContext.Provider>
    );
}