import {createGlobalStyle} from "styled-components";
import {breakpointSmall, fontSizes, lineHeights, spacings} from "./constants";
// import AuvantGothic from "../fonts/OPTIAuvantGothic-Bold.woff";

const GlobalStyle = createGlobalStyle`
    html,
    body,
    #root {
        margin: 0;
        padding: 0;
    }

    html {
        box-sizing: border-box;
        font-family: "AuvantGothicBold", sans-serif;
    }

    *, *:before, *:after {
        box-sizing: inherit;
    }

    h1 {
        margin-top: 0;
    }

    body.is-start-page {
        overflow: hidden;
    }

    body {
        font-size: ${fontSizes.bodySm};
        line-height: ${lineHeights.bodySm};

        h1 {
            font-size: ${fontSizes.h1Sm};
            margin-bottom: ${spacings.h1Sm};
            line-height: ${lineHeights.h1Sm};
        }
    }
    
    @media (min-width: ${breakpointSmall}) {
        body {
            font-size: ${fontSizes.bodyMd};
            line-height: ${lineHeights.bodyMd};

            h1 {
                font-size: ${fontSizes.h1Md};
                margin-bottom: ${spacings.h1Md};
                line-height: ${lineHeights.h1Md};
            }
        }
    }
`;

export default GlobalStyle