import React, {ReactNode} from "react";
import styled from "styled-components";

const StyledRoot = styled.div`
    display: flex;
    justify-content: center;
`

const StyledContent = styled.div`
    margin-left: 25px;
    margin-right: 25px;
    max-width: 1000px;
`

export interface PageContentLayoutProps {
    children: ReactNode;
    onClick?: (e: React.MouseEvent) => void;
}

export default function PageContentLayout(props: PageContentLayoutProps) {

    return (
        <StyledRoot>
            <StyledContent>
                {props.children}
            </StyledContent>
        </StyledRoot>
    );
}