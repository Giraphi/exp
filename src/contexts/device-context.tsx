import React from "react";

export type Device = "small" | "large"

export interface DeviceContextType {
    device: Device;
}

export const DeviceContext = React.createContext<DeviceContextType>({
    device: "large",
});

export default DeviceContext;
