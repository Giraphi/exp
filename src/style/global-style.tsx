import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
    html,
    body,
    #root {
      margin: 0;
      padding: 0;
    }

    html {
      box-sizing: border-box;
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
`;

export default GlobalStyle