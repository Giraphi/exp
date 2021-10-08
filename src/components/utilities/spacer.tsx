import styled, { css } from "styled-components";
import { breakpointSmall, spacings } from "../../style/constants";

export const Spacer = styled.div<{
    size: "xsmall" | "small" | "medium" | "large";
}>`
    ${(props) =>
        props.size === "xsmall" &&
        css`
            margin-bottom: ${spacings.xSmallSm};

            @media (min-width: ${breakpointSmall}) {
                margin-bottom: ${spacings.xSmallMd};
            }
        `}

    ${(props) =>
        props.size === "small" &&
        css`
            margin-bottom: ${spacings.smallSm};

            @media (min-width: ${breakpointSmall}) {
                margin-bottom: ${spacings.smallMd};
            }
        `}

    ${(props) =>
        props.size === "medium" &&
        css`
            margin-bottom: ${spacings.mediumSm};

            @media (min-width: ${breakpointSmall}) {
                margin-bottom: ${spacings.mediumMd};
            }
        `}
`;
