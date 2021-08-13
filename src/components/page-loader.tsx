import React from "react";
import styled, {css} from "styled-components";

const StyledOverlay = styled.div`
    width: 100%;
    height: 100%;
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
    isLoadFinished: boolean;
}

export default function PageLoader(props: PageLoaderProps) {
    return (
        <StyledRoot
            isLoading={!props.isLoadFinished}
        >
            {!props.isLoadFinished &&
                <StyledOverlay>
                    LOADING
                </StyledOverlay>
            }

                {props.children}
        </StyledRoot>
    );
}