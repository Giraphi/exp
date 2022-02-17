import React from "react";
import {LayoutTextSection} from "../../utilities/layout-text-section";
import GlitchText from "../../glitch-text/glitch-text";
import {Spacer} from "../../utilities/spacer";
import {LayoutTextItem} from "../../utilities/layout-text-item";
import LayoutContent from "../../utilities/layout-content";
import styled, {css} from "styled-components";
import {breakpointSmall, colorAbout, fontSizes, lineHeights, spacings} from "../../../style/constants";
import {GlitchTextLetterVariant} from "../../glitch-text/glitch-text-letter";

const StyledRoot = styled.div`
    font-family: "SourceCodePro", monospace;
    margin-bottom: 100px;
`

const StyledLink = styled.a`
    color: ${colorAbout};
    text-decoration: underline;

    &:hover {
        text-decoration: line-through;
    }
`;

const StyledHeadline = styled.div`
    font-family: InkedBones,sans-serif;
    text-align: center;

    font-size: ${fontSizes.headerSm};
    line-height: ${lineHeights.headerSm};
    margin-bottom: 30px;

    @media (min-width: ${breakpointSmall}) {
        margin-bottom: 75px;
        font-size: ${fontSizes.headerMd};
        line-height: ${lineHeights.headerMd};
    }
`;

const StyledRow = styled.div<{ disableSpace?: boolean }>`
    display: flex;

    ${props => !props.disableSpace && css`
        margin-bottom: ${spacings.smallMd};
    `}
    flex-direction: column;

    > *:first-child {
        min-width: 230px;
        white-space: nowrap;
        margin-bottom: ${spacings.xSmallSm}
    }

    @media (min-width: ${breakpointSmall}) {
        flex-direction: row;
    }
`

export default function AboutPageContent() {
    const glitchTextProps = {
        variant: "color" as GlitchTextLetterVariant,
        probability: 0.0003,
        duration: 300,
    }

    return (
        <StyledRoot>
            <LayoutContent>
                <LayoutTextSection>
                    <StyledHeadline>
                        About Me
                    </StyledHeadline>
                    <GlitchText
                        text={"I'm a frontend " + "developer based in Munich with a penchant for creativity and arts. "}
                        {...glitchTextProps}
                    />

                    <Spacer size={"small"}/>
                    <GlitchText
                        text={
                            "Having a strong background in Computer Science and Maths I try to combine technical precision with creative playfulness to aim for results that go beyond the current standards."
                        }
                        {...glitchTextProps}
                    />
                </LayoutTextSection>

                <h1>
                    <GlitchText text={"Personal"} {...glitchTextProps}/>
                </h1>
                <LayoutTextSection>
                    <GlitchText
                        text={
                            "Born 1990 in Bad Windsheim."
                        }
                        {...glitchTextProps}
                    />

                    <Spacer size={"xsmall"}/>

                    <GlitchText
                        text={
                            "School years in Höchstadt a.d. Aisch (close to Nuremberg)."
                        }
                        {...glitchTextProps}
                    />
                </LayoutTextSection>

                <h1>
                    <GlitchText text={"Education"} {...glitchTextProps}/>
                </h1>
                <LayoutTextSection>

                    <StyledRow>
                        <GlitchText text={"2011 - 2014"} {...glitchTextProps}/>
                        <GlitchText text={"Bachelor Computer Science at TU Dresden."} {...glitchTextProps}/>
                    </StyledRow>

                    <StyledRow disableSpace={true}>
                        <GlitchText text={"2015 - 2018"} {...glitchTextProps}/>
                        <GlitchText
                            text={"Master Computational Linguistics with Computer Science Minor at LMU Munich."}
                            {...glitchTextProps}
                        />
                    </StyledRow>

                    <StyledRow>
                        <div/>
                        <GlitchText
                            text={"Master Thesis in the field of Artificial Intelligence."}
                            {...glitchTextProps}
                        />
                    </StyledRow>

                </LayoutTextSection>

                <h1>Employments</h1>
                <LayoutTextSection>
                    <StyledRow>
                        <GlitchText
                            text={"2012 - 2018"}
                            {...glitchTextProps}
                        />

                        <GlitchText
                            text={"Different Jobs as academic tutor at TU Dresden and LMU Munich."}
                            {...glitchTextProps}
                        />
                    </StyledRow>
                    <StyledRow>
                        <GlitchText
                            text={"2016 - 2017"}
                            {...glitchTextProps}
                        />

                        <GlitchText
                            text={"Working student at Siemens in Munich."}
                            {...glitchTextProps}
                        />
                    </StyledRow>

                    <StyledRow>
                        <GlitchText
                            text={"2017"}
                            {...glitchTextProps}
                        />

                        <div>

                            <GlitchText text={"Working student at the web agency"} {...glitchTextProps}/>
                            <StyledLink target={"_blank"} rel="noopener noreferrer" href={"http://www.funct.com"}>
                                funct
                            </StyledLink>
                        </div>

                    </StyledRow>

                    <StyledRow>
                        <GlitchText text={"Since 2018"} {...glitchTextProps}/>
                        <div>

                            <GlitchText text={"Full time web developer at"} {...glitchTextProps}/>
                            <StyledLink target={"_blank"} rel="noopener noreferrer" href={"http://www.funct.com"}>
                                funct
                            </StyledLink>
                            <GlitchText text={" in Munich."} {...glitchTextProps}/>
                        </div>
                    </StyledRow>
                </LayoutTextSection>

                <h1>
                    <GlitchText text={"Interests"} {...glitchTextProps}/>
                </h1>
                <LayoutTextSection>
                    <LayoutTextItem>
                        <GlitchText text={"Art / Digital Art / Design"} {...glitchTextProps}/>
                    </LayoutTextItem>

                    <LayoutTextItem>
                        <GlitchText text={"Electronic music / Modular synthesizers"} {...glitchTextProps}/>
                    </LayoutTextItem>

                    <LayoutTextItem>
                        <GlitchText text={"Live music projects, e.g. synthesizer at my band project"} {...glitchTextProps}/>
                        <StyledLink target={"_blank"} rel="noopener noreferrer" href={"http://www.bosch-experimente.com"}>
                            Bosch
                        </StyledLink>
                    </LayoutTextItem>
                </LayoutTextSection>

                <h1>
                    <GlitchText text={"Contact"} {...glitchTextProps}/>
                </h1>
                <LayoutTextSection>
                    <LayoutTextItem>
                        <StyledLink target={"_blank"} rel="noopener noreferrer" href={"https://github.com/Giraphi"}>
                            github
                        </StyledLink>
                    </LayoutTextItem>
                    <LayoutTextItem>
                        <StyledLink
                            target={"_blank"}
                            rel="noopener noreferrer"
                            href={"https://www.linkedin.com/in/raphael-h%C3%B6ps-2740aa205/"}
                        >
                            LinkedIn
                        </StyledLink>
                    </LayoutTextItem>
                    <LayoutTextItem>
                        e-mail: hoeps.raphael [at] gmail.com
                    </LayoutTextItem>
                </LayoutTextSection>
            </LayoutContent>
        </StyledRoot>
    )
        ;
}
