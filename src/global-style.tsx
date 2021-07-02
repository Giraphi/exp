import {createGlobalStyle} from "styled-components";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import AuvantGothicBold from "./fonts/OPTIAuvantGothic-Bold.woff";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import AuvantGothicMedium from "./fonts/OPTIAuvantGothic-Medium.woff";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import SourceCodePro from "./fonts/source-code-pro-regular.woff";

const GlobalStyle = createGlobalStyle`
    html,
    body,
    #root {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
    }

    html {
      box-sizing: border-box;
    }
    *, *:before, *:after {
      box-sizing: inherit;
    }
    
    @font-face {
        font-family: "AuvantGothicBold";
        src: url(${AuvantGothicBold}) format("woff");
    }

    @font-face {
        font-family: "AuvantGothicMedium";
        src: url(${AuvantGothicMedium}) format("woff");
    }
    
    h1 {
        font-family: "AuvantGothicBold";
    }

    @font-face {
        font-family: "SourceCodePro";
        src: url(${SourceCodePro}) format("woff");
    }
`;

export default GlobalStyle