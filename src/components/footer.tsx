import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { breakpointSmall, fontSizes, lineHeights, spacings } from "../style/constants";

const StyledRoot = styled.div`
    margin: 25px;

    @media (min-width: ${breakpointSmall}) {
        margin: ${spacings.mediumMd};
    }
`;

const StyledContent = styled.div<{ isInverted?: boolean }>`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    flex-direction: column;
    font-family: "SourceCodePro", monospace;
    font-size: ${fontSizes.captionSm};
    line-height: ${lineHeights.captionSm};

    padding-top: ${spacings.smallMd};


    a {
        text-decoration: none;
        color: ${(props) => (props.isInverted ? "white" : "black")};

        :hover {
            text-decoration: line-through;
        }
    }

    @media (min-width: ${breakpointSmall}) {
        flex-direction: row;
    }
`;

const StyledItem = styled.div`
    //margin-top: ${spacings.smallMd};

    @media (min-width: ${breakpointSmall}) {
        margin-left: ${spacings.smallMd};
        margin-top: 0;
    }
`;

export interface FooterProps {
    isInverted?: boolean;
}

export default function Footer(props: FooterProps) {
    return (
        <StyledRoot>
            <StyledContent isInverted={props.isInverted}>
                <StyledItem>
                    <Link to={"/credits"} target={"_blank"} rel={"noreferrer"}>
                        About & Credits
                    </Link>
                </StyledItem>
                <StyledItem>
                    <Link to={"/impressum"} target={"_blank"} rel={"noreferrer"}>
                        Impressum
                    </Link>
                </StyledItem>
                <StyledItem>
                    <a href={"/privacy-policy.html"} target={"_blank"} rel={"noreferrer"}>
                        Privacy Policy
                    </a>
                </StyledItem>
            </StyledContent>
        </StyledRoot>
    );
}
