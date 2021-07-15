import {useMemo, useState} from "react";
import {CanvasTexture, LinearFilter} from "three";
import useIsFontLoaded from "./use-is-font-loaded";
import {Vector3} from "three/src/math/Vector3";

export interface TextConfig {
    color: string;
    scale: number;
    font: string;
    size: number;
}

export default function useTextTexture(text: string, textConfig: TextConfig) {
    const isFontLoaded = useIsFontLoaded();

    const {texture, scale} = useMemo(() => {
        if (!isFontLoaded) {
            return {};
        }

        const borderSize = 2;
        const ctx = document.createElement('canvas').getContext('2d');

        if (!ctx) {
            throw new Error(`Could not create ctx`);
        }


        const font = `${textConfig.size}px ${textConfig.font}, monospace`;
        ctx.font = font;
        // measure how long the name will be
        const doubleBorderSize = borderSize * 2;
        const width = ctx.measureText(text).width + doubleBorderSize;
        const height = textConfig.size + doubleBorderSize;
        ctx.canvas.width = width;
        ctx.canvas.height = height;

        // need to set font again after resizing canvas
        ctx.font = font;
        ctx.textBaseline = 'top';
        ctx.fillStyle = textConfig.color;
        ctx.fillText(text, borderSize, borderSize);

        const texture = new CanvasTexture(ctx.canvas);

        // In combination with gl.setPixelRatio(window.devicePixelRatio) <- see canvas-content.tsx
        // this makes the text sharper.
        texture.minFilter = LinearFilter;

        const scale = new Vector3(
            ctx.canvas.width * textConfig.scale,
            ctx.canvas.height * textConfig.scale,
            0
        );

        return {texture, scale}
    }, [isFontLoaded, textConfig.size, textConfig.font, textConfig.color, textConfig.scale, text]);

    return {texture, scale};
}