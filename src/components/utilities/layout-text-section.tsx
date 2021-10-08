import styled from "styled-components";
import { breakpointSmall, spacings } from "../../style/constants";

export const LayoutTextSection = styled.div`
    margin-bottom: ${spacings.mediumSm};

    @media (min-width: ${breakpointSmall}) {
        margin-bottom: ${spacings.mediumMd};
    }
`;
