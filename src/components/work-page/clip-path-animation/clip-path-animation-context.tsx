import React from "react";

export interface ClipPathAnimationContextType {
    numClicksOdd: boolean;
    onClick: () => void;
}

export const ClipPathAnimationContext = React.createContext<ClipPathAnimationContextType>({
    numClicksOdd: true,
    onClick: () => undefined,
});
