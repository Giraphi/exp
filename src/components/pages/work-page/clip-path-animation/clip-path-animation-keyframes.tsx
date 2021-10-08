import { keyframes } from "styled-components";

export const backgroundAnimationFreezePercentage = 0.2;
const percentagePause = `${50 - (backgroundAnimationFreezePercentage * 100) / 2}%`;
const percentageContinue = `${50 + (backgroundAnimationFreezePercentage * 100) / 2}%`;
const scaleFactor = 1.3;

export const imageKeyframesShow = keyframes`
    0% {
        transform: scale(1);
    }
    ${percentagePause} {
        transform: scale(${scaleFactor});
    }
    
    ${percentageContinue} {
        transform: scale(${scaleFactor});
    }    
    100% {
        transform: scale(1);
    }
`;

export const imageKeyframesHide = keyframes`
    0% {
        transform: scale(1);
    }
    ${percentagePause} {
        transform: scale(${scaleFactor});
    }

    ${percentageContinue} {
        transform: scale(${scaleFactor});
    }
    100% {
        transform: scale(1.001);
    }
`;

export const hideKeyframes = (unit: number) => keyframes`
    0% {
        clip-path: polygon(${4 * unit}px 0%,
        ${7 * unit}px 0%,
        ${10 * unit}px 0%,
        100% 0%,
        100% 75%,
        100% 100%,
        ${7 * unit}px 100%,
        ${4 * unit}px 100%,
        0% 100%,
        0% 75%,
        0% 0%,
        ${unit}px 0%);
    }
    ${percentagePause} {
        clip-path: polygon(${5 * unit}px ${2 * unit}px,
        ${6 * unit}px ${2 * unit}px,
        ${6 * unit}px ${3 * unit}px,
        ${7 * unit}px ${3 * unit}px,
        ${7 * unit}px ${4 * unit}px,
        ${6 * unit}px ${4 * unit}px,
        ${6 * unit}px ${7 * unit}px,
        ${5 * unit}px ${7 * unit}px,
        ${5 * unit}px ${4 * unit}px,
        ${4 * unit}px ${4 * unit}px,
        ${4 * unit}px ${3 * unit}px,
        ${5 * unit}px ${3 * unit}px);
    }
    ${percentageContinue} {
        clip-path: polygon(${5 * unit}px ${2 * unit}px,
        ${6 * unit}px ${2 * unit}px,
        ${6 * unit}px ${3 * unit}px,
        ${7 * unit}px ${3 * unit}px,
        ${7 * unit}px ${4 * unit}px,
        ${6 * unit}px ${4 * unit}px,
        ${6 * unit}px ${7 * unit}px,
        ${5 * unit}px ${7 * unit}px,
        ${5 * unit}px ${4 * unit}px,
        ${4 * unit}px ${4 * unit}px,
        ${4 * unit}px ${3 * unit}px,
        ${5 * unit}px ${3 * unit}px);
    }
    100% {
        clip-path: polygon(${5.5 * unit}px ${3.5 * unit}px,
        ${5.5 * unit}px ${3.5 * unit}px,
        ${5.5 * unit}px ${3.5 * unit}px,
        ${5.5 * unit}px ${3.5 * unit}px,
        ${5.5 * unit}px ${3.5 * unit}px,
        ${5.5 * unit}px ${3.5 * unit}px,
        ${5.5 * unit}px ${3.5 * unit}px,
        ${5.5 * unit}px ${3.5 * unit}px,
        ${5.5 * unit}px ${3.5 * unit}px,
        ${5.5 * unit}px ${3.5 * unit}px,
        ${5.5 * unit}px ${3.5 * unit}px,
        ${5.5 * unit}px ${3.5 * unit}px);
    }
`;

export const hideKeyframesOdd = (unit: number) => keyframes`
    0% {
        clip-path: polygon(${8 * unit}px 0%,
        ${11 * unit}px 0%,
        100% 0%,
        100% ${4 * unit}px,
        100% 100%,
        ${13 * unit}px 100%,
        ${11 * unit}px 100%,
        ${8 * unit}px 100%,
        ${6 * unit}px 100%,
        0% 100%,
        0% ${6 * unit}px,
        0% 0%);
    }
    ${percentagePause} {
        clip-path: polygon(${9 * unit}px ${unit}px,
        ${10 * unit}px ${unit}px,
        ${10 * unit}px ${5 * unit}px,
        ${11 * unit}px ${5 * unit}px,
        ${11 * unit}px ${6 * unit}px,
        ${10 * unit}px ${6 * unit}px,
        ${10 * unit}px ${7 * unit}px,
        ${9 * unit}px ${7 * unit}px,
        ${9 * unit}px ${6 * unit}px,
        ${8 * unit}px ${6 * unit}px,
        ${8 * unit}px ${5 * unit}px,
        ${9 * unit}px ${5 * unit}px);
    }
    ${percentageContinue} {
        clip-path: polygon(${9 * unit}px ${unit}px,
        ${10 * unit}px ${unit}px,
        ${10 * unit}px ${5 * unit}px,
        ${11 * unit}px ${5 * unit}px,
        ${11 * unit}px ${6 * unit}px,
        ${10 * unit}px ${6 * unit}px,
        ${10 * unit}px ${7 * unit}px,
        ${9 * unit}px ${7 * unit}px,
        ${9 * unit}px ${6 * unit}px,
        ${8 * unit}px ${6 * unit}px,
        ${8 * unit}px ${5 * unit}px,
        ${9 * unit}px ${5 * unit}px);
    }
    100% {
        clip-path: polygon(${9.5 * unit}px ${5.5 * unit}px,
        ${9.5 * unit}px ${5.5 * unit}px,
        ${9.5 * unit}px ${5.5 * unit}px,
        ${9.5 * unit}px ${5.5 * unit}px,
        ${9.5 * unit}px ${5.5 * unit}px,
        ${9.5 * unit}px ${5.5 * unit}px,
        ${9.5 * unit}px ${5.5 * unit}px,
        ${9.5 * unit}px ${5.5 * unit}px,
        ${9.5 * unit}px ${5.5 * unit}px,
        ${9.5 * unit}px ${5.5 * unit}px,
        ${9.5 * unit}px ${5.5 * unit}px,
        ${9.5 * unit}px ${5.5 * unit}px);
    }
`;

export const showKeyframes = (unit: number) => keyframes`
    0% {
        clip-path: polygon(${9.5 * unit}px ${5.5 * unit}px,
        ${9.5 * unit}px ${5.5 * unit}px,
        ${9.5 * unit}px ${5.5 * unit}px,
        ${9.5 * unit}px ${5.5 * unit}px,
        ${9.5 * unit}px ${5.5 * unit}px,
        ${9.5 * unit}px ${5.5 * unit}px,
        ${9.5 * unit}px ${5.5 * unit}px,
        ${9.5 * unit}px ${5.5 * unit}px,
        ${9.5 * unit}px ${5.5 * unit}px,
        ${9.5 * unit}px ${5.5 * unit}px,
        ${9.5 * unit}px ${5.5 * unit}px,
        ${9.5 * unit}px ${5.5 * unit}px);
    }
    ${percentagePause} {
        clip-path: polygon(${9 * unit}px ${unit}px,
        ${10 * unit}px ${unit}px,
        ${10 * unit}px ${5 * unit}px,
        ${11 * unit}px ${5 * unit}px,
        ${11 * unit}px ${6 * unit}px,
        ${10 * unit}px ${6 * unit}px,
        ${10 * unit}px ${7 * unit}px,
        ${9 * unit}px ${7 * unit}px,
        ${9 * unit}px ${6 * unit}px,
        ${8 * unit}px ${6 * unit}px,
        ${8 * unit}px ${5 * unit}px,
        ${9 * unit}px ${5 * unit}px);
    }
    ${percentageContinue} {
        clip-path: polygon(${9 * unit}px ${unit}px,
        ${10 * unit}px ${unit}px,
        ${10 * unit}px ${5 * unit}px,
        ${11 * unit}px ${5 * unit}px,
        ${11 * unit}px ${6 * unit}px,
        ${10 * unit}px ${6 * unit}px,
        ${10 * unit}px ${7 * unit}px,
        ${9 * unit}px ${7 * unit}px,
        ${9 * unit}px ${6 * unit}px,
        ${8 * unit}px ${6 * unit}px,
        ${8 * unit}px ${5 * unit}px,
        ${9 * unit}px ${5 * unit}px);
    }
    100% {
        clip-path: polygon(${8 * unit}px 0%,
        ${11 * unit}px 0%,
        100% 0%,
        100% ${4 * unit}px,
        100% 100%,
        ${13 * unit}px 100%,
        ${11 * unit}px 100%,
        ${8 * unit}px 100%,
        ${6 * unit}px 100%,
        0% 100%,
        0% ${6 * unit}px,
        0% 0%);
    }
`;

export const showKeyframesOdd = (unit: number) => keyframes`
    0% {
        clip-path: polygon(${5.5 * unit}px ${3.5 * unit}px,
        ${5.5 * unit}px ${3.5 * unit}px,
        ${5.5 * unit}px ${3.5 * unit}px,
        ${5.5 * unit}px ${3.5 * unit}px,
        ${5.5 * unit}px ${3.5 * unit}px,
        ${5.5 * unit}px ${3.5 * unit}px,
        ${5.5 * unit}px ${3.5 * unit}px,
        ${5.5 * unit}px ${3.5 * unit}px,
        ${5.5 * unit}px ${3.5 * unit}px,
        ${5.5 * unit}px ${3.5 * unit}px,
        ${5.5 * unit}px ${3.5 * unit}px,
        ${5.5 * unit}px ${3.5 * unit}px);
    }
    ${percentagePause} {
        clip-path: polygon(${5 * unit}px ${2 * unit}px,
        ${6 * unit}px ${2 * unit}px,
        ${6 * unit}px ${3 * unit}px,
        ${7 * unit}px ${3 * unit}px,
        ${7 * unit}px ${4 * unit}px,
        ${6 * unit}px ${4 * unit}px,
        ${6 * unit}px ${7 * unit}px,
        ${5 * unit}px ${7 * unit}px,
        ${5 * unit}px ${4 * unit}px,
        ${4 * unit}px ${4 * unit}px,
        ${4 * unit}px ${3 * unit}px,
        ${5 * unit}px ${3 * unit}px);
    }
    ${percentageContinue} {
        clip-path: polygon(${5 * unit}px ${2 * unit}px,
        ${6 * unit}px ${2 * unit}px,
        ${6 * unit}px ${3 * unit}px,
        ${7 * unit}px ${3 * unit}px,
        ${7 * unit}px ${4 * unit}px,
        ${6 * unit}px ${4 * unit}px,
        ${6 * unit}px ${7 * unit}px,
        ${5 * unit}px ${7 * unit}px,
        ${5 * unit}px ${4 * unit}px,
        ${4 * unit}px ${4 * unit}px,
        ${4 * unit}px ${3 * unit}px,
        ${5 * unit}px ${3 * unit}px);
    }
    100% {
        clip-path: polygon(${4 * unit}px 0%,
        ${7 * unit}px 0%,
        ${10 * unit}px 0%,
        100% 0%,
        100% 75%,
        100% 100%,
        ${7 * unit}px 100%,
        ${4 * unit}px 100%,
        0% 100%,
        0% 75%,
        0% 0%,
        ${unit}px 0%);
    }
`;
