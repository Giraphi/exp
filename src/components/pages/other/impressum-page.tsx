import React from "react";
import LayoutContent from "../../utilities/layout-content";
import styled from "styled-components";
import { Spacer } from "../../utilities/spacer";

const StyledRoot = styled.div`
    a {
        color: black !important;
    }
`;

export default function ImpressumPage() {
    return (
        <StyledRoot>
            <LayoutContent>
                <Spacer size={"medium"} />
                <h1>Owner</h1>
                <div>Raphael Höps</div>
                <div>E-mail: hoeps.raphael [at] gmail.com</div>
                <Spacer size={"medium"} />
            </LayoutContent>
        </StyledRoot>
    );
}
