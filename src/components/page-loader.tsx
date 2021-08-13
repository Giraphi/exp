import React, {useEffect, useState} from "react";
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

const StyledChildren = styled.div``

export interface PageLoaderProps {
    children: React.ReactNode;
    isLoadFinished: boolean;
}

export default function PageLoader(props: PageLoaderProps) {
    // const [isOverlayActive, setIsOverlayActive] = useState();
    // const [showOverlay, setShowOverlay] = useState(!props.isLoadFinished);
    //
    // useEffect(() => {
    //     setTimeout(() => {
    //         setShowOverlay(!props.isLoadFinished);
    //     }, 10);
    // }, [props.isLoadFinished])

    return (
            <StyledRoot
                isLoading={!props.isLoadFinished}
            >
                {!props.isLoadFinished &&
                    <StyledOverlay>
                        LOADING
                    </StyledOverlay>
                }

                <StyledChildren>
                    {props.children}
                </StyledChildren>
            </StyledRoot>
    );
}