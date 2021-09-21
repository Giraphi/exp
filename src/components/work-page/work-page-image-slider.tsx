import React, {useEffect, useState} from "react";
import Puzzle from "./puzzle/puzzle";
import PuzzleAnimation from "./puzzle/puzzle-animation";
import styled, {css} from "styled-components";
import arrow from "../../images/arrow-pink.svg"
import arrowFilled from "../../images/arrow-pink-filled.svg"

const StyledRoot = styled.div`
    position: relative;
    flex-basis: 66%;
    flex-grow: 1;
    height: 500px;
`;

const StyledOverlay = styled.div`
    position: absolute;
    top:0;
    width: 100%;
    height: 100%;
    display: flex;
    cursor: pointer;
    z-index: 30;
`

const ClickableAreaMixin = css`
    flex-basis: 50%;
    display: flex;
    align-items: center;

    ::before {
        content: "";
        background-image: url(${arrow});
        background-repeat: no-repeat;
        background-size: contain;
        width: 50px;
        height: 50px;
        display: flex;
    }
    
    :hover {
        ::before {
            background-image: url(${arrowFilled})
        }
    }
`

const StyledClickLeft = styled.div`
    ${ClickableAreaMixin}
    ::before {
        transform: rotate(-90deg);
        margin-left: 5px;
    }
`

const StyledClickRight = styled.div`
    ${ClickableAreaMixin}
    justify-content: flex-end;
    ::before {
        transform: rotate(90deg);
        margin-right: 5px;
    }
`

export interface WorkPageImageSliderProps {
    images: string[];
}

export default function WorkPageImageSlider(props: WorkPageImageSliderProps) {
    const [activeSlide, setActiveSlide] = useState(0);
    const [isClicked, setIsClicked] = useState(false);

    function onLeftClick() {
        setActiveSlide(activeSlide => Math.abs((activeSlide - 1) % (props.images.length)));
        setIsClicked(true);
    }

    function onRightClick() {
        setActiveSlide(activeSlide => (activeSlide + 1) % props.images.length);
        setIsClicked(true);
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

    return (
        <StyledRoot>
            <Puzzle>
                {props.images.map((image, index) =>
                    <PuzzleAnimation
                        key={index}
                        isActive={activeSlide === index}
                        index={index}
                    >
                        <img src={image} alt={""} width={"100%"}/>
                    </PuzzleAnimation>
                )}
            </Puzzle>

            <StyledOverlay>
                <StyledClickLeft onClick={onLeftClick}/>
                <StyledClickRight onClick={onRightClick}/>
            </StyledOverlay>
        </StyledRoot>
    );
}