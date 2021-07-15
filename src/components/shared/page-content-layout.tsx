import React, {ReactNode, useEffect, useRef} from "react";
import styled from "styled-components";

const StyledRoot = styled.div`
    height: 100vh;
    position: absolute;
    top: 0;
    overflow: auto;    
    //pointer-events: none;
`;

const StyledSpacer = styled.div`
    height: 40vh;
    pointer-events: none;
`

const StyledContent = styled.div`
    pointer-events: auto;
    margin-left: 20px;
    margin-right: 20px;    
`

export interface PageContentLayoutProps {
    children: ReactNode;
}

export default function PageContentLayout(props: PageContentLayoutProps) {

    return (
        <StyledRoot
            // onScroll={}
        >
            <StyledSpacer/>
            <StyledContent>
                {props.children}
            </StyledContent>
        </StyledRoot>
    );
}