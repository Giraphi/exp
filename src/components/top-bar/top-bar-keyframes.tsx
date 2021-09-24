import {keyframes} from "styled-components";

export const blackToWhiteBackgroundKeyframes = keyframes`
    0% {
        background-color: black;
    }
    50% {
        background-color: white;
    }
    100% {
        background-color: black;
    }
`

export const whiteToBlackBackgroundKeyframes = keyframes`
    0% {
        background-color: white;
    }
    50% {
        background-color: black;
    }
    100% {
        background-color: white;
    }
`


export const showMenuKeyframes = keyframes`
    0% {
        visibility: visible;
        clip-path: circle(5% at 100% 0);
    }
    99% {
        visibility: visible;
    }
    100% {
        visibility: visible;
        clip-path: circle(150% at 100% 0);
    }
`


export const hideMenuKeyframes = keyframes`
    0% {
        clip-path: circle(150% at 100% 0);
        visibility: visible;
    }
    99% {
        visibility: visible;
    }
    100% {
        visibility: hidden;
        clip-path: circle(0% at 100% 0);
    }
`
