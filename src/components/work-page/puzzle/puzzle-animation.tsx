import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import PuzzleAnimationBackground from "./puzzle-animation-background";

export const puzzleAnimationDurationMs = 800;

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

const PuzzleAnimation = (props: PuzzleAnimationProps) =>{

    const clipId = useMemo(() => {
        const random = Math.random()
        return `DvHomeBackground-svgClip-${random}-${props.index}`;
    }, [props.index]);

    const [isOnTop, setIsOnTop] = useState(props.isActive);
    const dimensionsRef = useRef<HTMLDivElement>(null);

    const animationConfig = useMemo(() => {
        if (props.index % 2 === 0) {
            return {
                rect1Scale: 0.3,
                rect1Width: 1.2,
                rect1Height: 1,
                rect1OriginX: 0.15 ,
                rect1OriginY: 0,

                rect2Scale: 0.15,
                rect2Width: 0.8,
                rect2Height: 2,
                rect2OriginX: 0.58,
                rect2OriginY: 0.3,

                rect3Scale: 0.15,
                rect3Width: 2.2,
                rect3Height: 1.1,
                rect3OriginX: 0.7,
                rect3OriginY: 0.77,
            }
        }

        return {
            rect1Scale: 0.2,
            rect1Width: 1.7,
            rect1Height: 1,
            rect1OriginX: 0.4,
            rect1OriginY: 0,

            rect2Scale: 0.25,
            rect2Width: 1.3,
            rect2Height: 1.4,
            rect2OriginX: 0.4,
            rect2OriginY: 0.5,

            rect3Scale: 0.10,
            rect3Width: 1.5,
            rect3Height: 1.6,
            rect3OriginX: 0.73,
            rect3OriginY: 0.4,
        }
    }, [props.index]);

    const [isFirstRender, setIsFirstRender] = useState(true);
    useEffect(() => {
        setIsFirstRender(false);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOnTop(isOnTop => {
                if (isOnTop === props.isActive) {
                    return isOnTop;
                }

                return props.isActive;
            });
        }, puzzleAnimationDurationMs);

        return () => clearTimeout(timer);
    }, [props.isActive]);

    return (
        <PuzzleAnimationBackground
            triggerHide={!isFirstRender && !props.isActive}
            triggerShow={!isFirstRender && props.isActive}
            isOnTop={isOnTop}
            dimensions={props.dimensions ? props.dimensions : {width: dimensionsRef.current?.clientWidth, height: dimensionsRef.current?.clientHeight} as Dimensions}
            clipId={clipId}
            animationDurationMs={puzzleAnimationDurationMs}
            clipPathConfig={animationConfig}
        >
            {props.children}
            <div ref={dimensionsRef} style={{position: "absolute", zIndex: -1, width: "100%", height: "100%"}} />
        </PuzzleAnimationBackground>
    );
}

export default PuzzleAnimation;
