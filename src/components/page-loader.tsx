import React, {useEffect, useState} from "react";
import styled, {css} from "styled-components";
import {useProgress} from "@react-three/drei";

const StyledOverlay = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: white;
    position: absolute;
    top: 0;
    z-index: 99;
    
`
const StyledRoot = styled.div<{isLoading: boolean}>`
    ${props => props.isLoading && css`    
        position: relative;
        height: 100vh;
        overflow: hidden;
    `}
`


export interface PageLoaderProps {
    children: React.ReactNode;
}

export default function PageLoader(props: PageLoaderProps) {
    const [isLoading, setIsLoading] = useState(true);
    // const progress = useProgress().progress;
    const state = useProgress()

    useEffect(() => {
        const isLoadingUpdate = state.progress !== 100
        setIsLoading(isLoadingUpdate);
    }, [state.progress])

    return (
        <StyledRoot
            isLoading={isLoading}
        >
            {isLoading &&
                <StyledOverlay>
                    LOADING
                </StyledOverlay>
            }
            {props.children}
        </StyledRoot>
    );
}