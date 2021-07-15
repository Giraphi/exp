import React from "react";
import styled from "styled-components";
import ThreeBaseline from "../shared/three-baseline/three-baseline";
import CameraControlButtons from "../shared/camera-control-buttons";
import SkillsPageWorld from "./skills-page-world";
import PageContentLayout from "../shared/page-content-layout";
import {motion} from "framer-motion";
import {colorSkills} from "../../style/constants";

const StyledRoot = styled(motion.div)`
    min-height: 100vh;
    position: relative;
    color: ${colorSkills};
    background-color: black;
    overflow: auto;
`

const StyledBanner = styled.div`
    height: 75vh;

    @media(min-width: 768px) {
        height: 80vh;
    }
`

const StyledText = styled.div`
    text-align: center;
    font-family: "AuvantGothicBold", sans-serif;
    margin-bottom: 75px;
    user-select: none;
    -webkit-touch-callout: none;
    
    @media(min-width: 768px) {
        margin-top: 10px;
    }
`;

export default function SkillsPage() {
    return (
        <StyledRoot
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 1.0}}
        >
            <StyledBanner>
                <ThreeBaseline
                    controlButtons={<CameraControlButtons minimal={true}/>}
                >
                    <SkillsPageWorld/>
                </ThreeBaseline>
            </StyledBanner>

            <PageContentLayout>
                <StyledText>
                    <h1>Kohntarkosz Kreuhn</h1>
                    <p>
                        Hur. Deh antzik Kohntarkosz Kreuhn Kohrmahn Stoht wurdah melekaahm
                        Stoht wurdah melekaahm Uz, deh orkbahnn Kreuhn Kohrmahn Zëbëhn strain de Geustaah wortsis, da reus Stoah
                    </p>
                    <p>
                        Wuhr di heul zortsung
                        Uts fur Kalain, himeuhn zëbëhn deh Resutiihn;
                        Ewehn deuh Lantsin slakehndo
                    </p>
                    <p>
                        Hur. Deh antzik Kohntarkosz Kreuhn Kohrmahn Stoht wurdah melekaahm
                        Stoht wurdah melekaahm Uz, deh orkbahnn Kreuhn Kohrmahn Zëbëhn strain de Geustaah wortsis, da reus Stoah
                    </p>
                    <p>
                        Elëh wëhsö ëlëh wëhsö ëlëh wëhsö wëh löwï sündi
                        Elëh wëhsö ëlëh wëhsö ëlëh wëhsö wëh löwï sündi
                    </p>
                    <p>
                        Wuhr di heul zortsung
                        Uts fur Kalain, himeuhn zëbëhn deh Resutiihn;
                        Ewehn deuh Lantsin slakehndo
                    </p>
                    <p>
                        Hur. Deh antzik Kohntarkosz Kreuhn Kohrmahn Stoht wurdah melekaahm
                        Stoht wurdah melekaahm Uz, deh orkbahnn Kreuhn Kohrmahn Zëbëhn strain de Geustaah wortsis, da reus Stoah
                    </p>
                    <p>
                        Wuhr di heul zortsung
                        Uts fur Kalain, himeuhn zëbëhn deh Resutiihn;
                        Ewehn deuh Lantsin slakehndo
                    </p>
                    <p>
                        Hur. Deh antzik Kohntarkosz Kreuhn Kohrmahn Stoht wurdah melekaahm
                        Stoht wurdah melekaahm Uz, deh orkbahnn Kreuhn Kohrmahn Zëbëhn strain de Geustaah wortsis, da reus Stoah
                    </p>
                    <p>
                        Elëh wëhsö ëlëh wëhsö ëlëh wëhsö wëh löwï sündi
                        Elëh wëhsö ëlëh wëhsö ëlëh wëhsö wëh löwï sündi
                    </p>
                    <p>
                        Wuhr di heul zortsung
                        Uts fur Kalain, himeuhn zëbëhn deh Resutiihn;
                        Ewehn deuh Lantsin slakehndo
                    </p>
                    <p>
                        Hur. Deh antzik Kohntarkosz Kreuhn Kohrmahn Stoht wurdah melekaahm
                        Stoht wurdah melekaahm Uz, deh orkbahnn Kreuhn Kohrmahn Zëbëhn strain de Geustaah wortsis, da reus Stoah
                    </p>
                    <p>
                        Wuhr di heul zortsung
                        Uts fur Kalain, himeuhn zëbëhn deh Resutiihn;
                        Ewehn deuh Lantsin slakehndo
                    </p>
                    <p>
                        Hur. Deh antzik Kohntarkosz Kreuhn Kohrmahn Stoht wurdah melekaahm
                        Stoht wurdah melekaahm Uz, deh orkbahnn Kreuhn Kohrmahn Zëbëhn strain de Geustaah wortsis, da reus Stoah
                    </p>
                    <p>
                        Elëh wëhsö ëlëh wëhsö ëlëh wëhsö wëh löwï sündi
                        Elëh wëhsö ëlëh wëhsö ëlëh wëhsö wëh löwï sündi
                    </p>


                </StyledText>
            </PageContentLayout>
        </StyledRoot>
    );
}