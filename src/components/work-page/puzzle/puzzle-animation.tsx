import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import PuzzleAnimationBackground from "./puzzle-animation-background";

export const backgroundAnimationDurationMs = 800;

export type Dimensions = {
    width: number;
    height: number
}

export interface PuzzleAnimationProps {
    dimensions?: Dimensions;
    isActive: boolean;
    isAnimationDisabled?: boolean;
    index: number;
    children: React.ReactNode;
}

const PuzzleAnimation = ({dimensions, isActive, isAnimationDisabled = false, index, children}: PuzzleAnimationProps) =>{
    const [isOnTop, setIsOnTop] = useState(isActive);
    const clipId = useMemo(() => {
        return `DvHomeBackground-svgClip-${index}`;
    }, [index]);
    const dimensionsRef = useRef<HTMLDivElement>(null);

    const random = useCallback(() => {
        function getRandom(min: number, max: number) {
            return Math.round(Math.random() * (max - min) + min);
        }
        return getRandom(0.9,1.1);
    }, [])

    // For some configurations, that "white triangle" graphic glitch is happening in chrome during the animation
    // (but only on high res screens?).
    // The glitch doesn't seem to appear in the current configuration, but be careful when changing it.
    // Previously we had "rect3Height" set to 1 instead of 1.1 in the first block which made the glitch appear
    // The reason for the glitch or how to safely avoid it is currently unknown.
    const animationConfig = useMemo(() => {
        if (index % 2 === 0) {
            return {
                rect1Scale: 0.3 * random(),
                rect1Width: 1.2 * random(),
                rect1Height: 1,
                rect1OriginX: 0.15 * random(),
                rect1OriginY: 0,

                rect2Scale: 0.15 * random(),
                rect2Width: 0.8 * random(),
                rect2Height: 2,
                rect2OriginX: 0.58 * random(),
                rect2OriginY: 0.3 * random(),

                rect3Scale: 0.15 * random(),
                rect3Width: 2.2 * random(),
                rect3Height: 1.1,
                rect3OriginX: 0.7 * random(),
                rect3OriginY: 0.77 * random(),
            }
        }

        return {
            rect1Scale: 0.2 * random(),
            rect1Width: 1.7 * random(),
            rect1Height: 1,
            rect1OriginX: 0.4 * random(),
            rect1OriginY: 0,

            rect2Scale: 0.25 * random(),
            rect2Width: 1.3 * random(),
            rect2Height: 1.4 * random(),
            rect2OriginX: 0.4 * random(),
            rect2OriginY: 0.5 * random(),

            rect3Scale: 0.10 * random(),
            rect3Width: 1.5 * random(),
            rect3Height: 1.6 * random(),
            rect3OriginX: 0.73 * random(),
            rect3OriginY: 0.4 * random(),
        }
    }, [index, random]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOnTop(isOnTop => {
                if (isOnTop === isActive) {
                    return isOnTop;
                }

                return isActive;
            });
        }, backgroundAnimationDurationMs);

        return () => clearTimeout(timer);
    }, [isActive]);

    return (
        <PuzzleAnimationBackground
            triggerHide={!isActive}
            triggerShow={isActive}
            isOnTop={isOnTop}
            dimensions={dimensions ? dimensions : {width: dimensionsRef.current?.clientWidth, height: dimensionsRef.current?.clientHeight} as Dimensions}
            clipId={clipId}
            animationDurationMs={backgroundAnimationDurationMs}
            clipPathConfig={animationConfig}
            isAnimationDisabled={isAnimationDisabled}
        >
            {children}
            <div ref={dimensionsRef} style={{position: "absolute", zIndex: -1, width: "100%", height: "100%"}} />
        </PuzzleAnimationBackground>
    );
}

export default PuzzleAnimation;
