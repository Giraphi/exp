import React, {useContext, useEffect, useRef} from "react";
import styled from "styled-components";
import {motion, useSpring} from "framer-motion";
import MousePositionContext from "../../contexts/mouse-position-context";
import {MousePosition} from "../../contexts/providers/mouse-position-context-provider";
import {getDistanceVector, getVectorLength, round} from "../../utility-functions";

const StyledDot = styled.div`
    width: 4px;
    height: 4px;
    border-radius: 4px;
    background-color: black;
`;


// https://popmotion.io/api/spring/#spring-props
const springConfig = {
    stiffness: 350,
    damping: 13,
    restDelta: 2,
    restSpeed: 2,
}

export default function AnimatedDot() {
    const mousePosition = useContext(MousePositionContext).mousePositionMotionValue;
    const originalPositionRef = useRef<HTMLDivElement>(null);
    const translateX = useSpring(0, springConfig);
    const translateY = useSpring(0, springConfig);
    const isReset = useRef(false);

    function getModulator(distance: number) {
        const distanceAbs = distance >= 0 ? distance : -distance;
        return (50 / (distanceAbs + 50))
    }

    useEffect(() => {
        function reset() {
            // This check makes sure (0,0) is not set again, while the dot is already moving to that target.
            // (If we'd keep setting (0,0) while the dot is moving, the dot is accelerated again, ultimately causing
            // the dot to oscillate around (0,0)
            if (isReset.current) {
                return;
            }
            isReset.current = true;
            translateX.set(0);
            translateY.set(0);
        }

        if (!mousePosition) {
            reset();
            return;
        }

        // Update the motion values translateX and translateY every time props.mousePosition
        // changes, but NOT trigger a react rerender cycle.
        const unsubscribe = mousePosition.onChange((latestMousePosition: MousePosition | undefined) => {
            if (!originalPositionRef.current) {
                return;
            }

            if (!latestMousePosition) {
                reset();
                return;
            }

            const dotOriginalPosition: [number, number] = [
                originalPositionRef.current.getBoundingClientRect().left + window.scrollX,
                originalPositionRef.current.getBoundingClientRect().top + window.scrollY
            ]

            const distanceVector = getDistanceVector([latestMousePosition.x, latestMousePosition.y], dotOriginalPosition);
            const distance = getVectorLength(distanceVector);

            if (distance > 100) {
                reset();
                return;
            }

            const modulator = getModulator(distance);

            const translateVector = [modulator * distanceVector[0], modulator * distanceVector[1]];
            isReset.current = false;
            translateX.set(round(translateVector[0]));
            translateY.set(round(translateVector[1]));
        });

        return () => unsubscribe();
    }, [mousePosition, translateX, translateY]);

    return (
        <div
            ref={originalPositionRef}
        >
            <motion.div
                style={{
                    x: translateX,
                    y: translateY,
                }}
            >
                <StyledDot/>
            </motion.div>
        </div>
    );
}
