import React, {ReactNode, useEffect, useRef} from "react";
import styled from "styled-components";


const StyledContent = styled.div`
    pointer-events: auto;
    margin-left: 25px;
    margin-right: 25px;    
`

export interface PageContentLayoutProps {
    children: ReactNode;
    onClick?: (e: React.MouseEvent) => void;
}

export default function PageContentLayout(props: PageContentLayoutProps) {

    return (

            <StyledContent>
                {props.children}
            </StyledContent>
    );
}