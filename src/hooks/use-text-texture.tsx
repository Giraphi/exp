import {useMemo, useState} from "react";
import {CanvasTexture, LinearFilter} from "three";
import useIsFontLoaded from "./use-is-font-loaded";

export interface TextConfig {
    color: string;
    scale: number;
    font: string;
}

export default function useTextTexture(text: string, textConfig: TextConfig) {
    const isFontLoaded = useIsFontLoaded();
    const [textCanvasWidth, setTextCanvasWidth] = useState(0);
    const [textCanvasHeight, setTextCanvasHeight] = useState(0);

    const texture = useMemo(() => {
        if (!isFontLoaded) {
            return;
        }

        const borderSize = 2;
        const ctx = document.createElement('canvas').getContext('2d');

        if (!ctx) {
            throw new Error(`Could not create ctx`);
        }

        const size=100;

        const font = `${size}px ${textConfig.font}, monospace`;
        ctx.font = font;
        // measure how long the name will be
        const doubleBorderSize = borderSize * 2;
        const width = ctx.measureText(text).width + doubleBorderSize;
        const height = size + doubleBorderSize;
        ctx.canvas.width = width;
        ctx.canvas.height = height;

        // need to set font again after resizing canvas
        ctx.font = font;
        ctx.textBaseline = 'top';
        ctx.fillStyle = textConfig.color;
        ctx.fillText(text, borderSize, borderSize);

        setTextCanvasWidth(ctx.canvas.width);
        setTextCanvasHeight(ctx.canvas.height);

        const texture = new CanvasTexture(ctx.canvas);

        // In combination with gl.setPixelRatio(window.devicePixelRatio) <- see canvas-content.tsx
        // this makes the text sharper.
        texture.minFilter = LinearFilter;

        return texture
    }, [isFontLoaded, textConfig.font, textConfig.color, text]);

    return {texture, textCanvasWidth, textCanvasHeight};
}