import {createGlobalStyle} from "styled-components";
import {breakpointSmall} from "./constants";
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
        font-size: 20px;

        h1 {
            font-size: 30px;
            margin-bottom: 10px;
        }
    }

    p {
        margin-bottom: 50px;
    }

    @media (min-width: ${breakpointSmall}) {
        p {
            margin-bottom: 7vh;
        }
    }

    @media (min-width: ${breakpointSmall}) {
        body {
            font-size: 4vh;

            h1 {
                font-size: 8vh;
                margin-bottom: 2vh;
            }
        }
    }
`;

export default GlobalStyle