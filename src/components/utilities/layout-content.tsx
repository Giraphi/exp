import React, {ReactNode} from "react";
import styled from "styled-components";
import {breakpointSmall} from "../../style/constants";

const StyledRoot = styled.div`
    display: flex;
    justify-content: center;
`

const StyledContent = styled.div`
    margin-left: 25px;
    margin-right: 25px;
    max-width: 900px;
    
    @media(min-width: ${breakpointSmall}) {
        margin-left: 80px;
        margin-right: 80px;
    }
`

export interface PageContentLayoutProps {
    children: ReactNode;
    onClick?: (e: React.MouseEvent) => void;
}

export default function LayoutContent(props: PageContentLayoutProps) {
    return (
        <StyledRoot>
            <StyledContent>
                {props.children}
            </StyledContent>
        </StyledRoot>
    );
}