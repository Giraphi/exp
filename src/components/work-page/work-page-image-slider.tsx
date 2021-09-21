import React, {useEffect, useState} from "react";

import styled, {css} from "styled-components";
import {ArrowPinkUp, ArrowPinkUpFilled} from "../../images/svg-strings";
import {breakpointSmall} from "../../style/constants";
import ClipPathAnimation from "./clip-path-animation/clip-path-animation";
import ClipPathAnimationItem from "./clip-path-animation/clip-path-animation-item";
import {ClipPathAnimationContext} from "./clip-path-animation/clip-path-animation-context";


const StyledRoot = styled.div`
    position: relative;
    flex-basis: 100%;

    @media (min-width: ${breakpointSmall}) {
        flex-basis: 66%;
    }
`;

const StyledOverlay = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    cursor: pointer;
    z-index: 30;
`

const StyledArrow = styled.div`
    width: 100%;
    height: 100%;
    background-image: url("${ArrowPinkUp}");
`;

const ClickableAreaMixin = css`
    flex-basis: 50%;
    display: flex;
    align-items: center;

    ${StyledArrow} {
        content: "";
        background-repeat: no-repeat;
        background-size: contain;
        width: 50px;
        height: 50px;
        display: flex;
    }

    :hover {
        ${StyledArrow} {
            background-image: url("${ArrowPinkUpFilled}");
        }
    }
`

const StyledClickLeft = styled.div`
    ${ClickableAreaMixin}
    ${StyledArrow} {
        transform: rotate(-90deg);
        margin-left: 5px;
    }
`

const StyledClickRight = styled.div`
    ${ClickableAreaMixin};
    justify-content: flex-end;

    ${StyledArrow} {
        transform: rotate(90deg);
        margin-right: 5px;
    }
`

const StyledImage = styled.div`
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100%;
`

export interface WorkPageImageSliderProps {
    images: string[];
}

export default function WorkPageImageSlider(props: WorkPageImageSliderProps) {
    const [activeSlide, setActiveSlide] = useState(0);
    const [isClicked, setIsClicked] = useState(false);
    const [numClicksOdd, setNumClicksOdd] = useState(false);

    function modulo(n: number, m: number) {
        // will deal correctly with negative numbers, unlike the "%" operator
        return ((n % m) + m) % m;
    }

    function onLeftClick() {
        setActiveSlide(activeSlide => modulo((activeSlide - 1), props.images.length));
        setIsClicked(true);
        setNumClicksOdd(x => !x);
    }

    function onRightClick() {
        setActiveSlide(activeSlide => modulo((activeSlide + 1), props.images.length));
        setIsClicked(true);
        setNumClicksOdd(x => !x);
    }

    useEffect(() => {
        if (isClicked) {
            return;
        }

        const interval = setInterval(() => {
            setActiveSlide(activeSlide => (activeSlide + 1) % props.images.length);
        }, 5000);

        return () => clearInterval(interval)
    }, [isClicked, props.images.length])

    // Setting backgroundImage as inline style serves as a workaround for a "flickering background image" bug
    // https://github.com/styled-components/styled-components/issues/3315

    return (
        <StyledRoot>
            <ClipPathAnimationContext.Provider
                value={{numClicksOdd: numClicksOdd, onClick: () => setNumClicksOdd(x => !x)}}
            >
                <ClipPathAnimation>
                    {props.images.map((image, index) =>
                        <ClipPathAnimationItem
                            key={index}
                            isActive={activeSlide === index}
                        >
                            <StyledImage style={{backgroundImage: `url(${image})`}}/>
                        </ClipPathAnimationItem>
                    )}
                </ClipPathAnimation>
            </ClipPathAnimationContext.Provider>

            <StyledOverlay>
                <StyledClickLeft onClick={onLeftClick}>
                    <StyledArrow/>
                </StyledClickLeft>
                <StyledClickRight onClick={onRightClick}>
                    <StyledArrow/>
                </StyledClickRight>
            </StyledOverlay>
        </StyledRoot>
    );
}