import React from "react";
import styled, {css} from "styled-components";
import PageLoaderLoader from "./page-loader-loader";
import {zIndexes} from "../../style/constants";

const StyledOverlay = styled.div`
    width: 100%;
    height: 100%;
    background-color: white;
    position: absolute;
    top: 0;
    z-index: ${zIndexes.pageLoader};
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-y: scroll;
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
                    <PageLoaderLoader/>
                </StyledOverlay>
            }

                {props.children}
        </StyledRoot>
    );
}