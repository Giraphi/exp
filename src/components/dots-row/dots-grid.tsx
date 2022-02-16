import React from "react";
import AnimatedDot from "./animated-dot";
import styled from "styled-components";

const StyledRoot = styled.div`
    display: flex;
    flex-direction: column;
`

const StyledRow = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 10;
    margin-bottom: 50px;
`


export interface DotsGridProps {
    numDots: number;
    numDotsHeight: number;
}

export default function DotsGrid(props: DotsGridProps) {
    return (
        <StyledRoot>
            {
                Array.from(Array(props.numDotsHeight).keys()).map(index =>
                    <StyledRow
                        key={index}
                    >
                        {
                            Array.from(Array(props.numDots).keys()).map(index =>
                                <AnimatedDot
                                    key={index}
                                />
                            )
                        }
                    </StyledRow>
                )
            }
        </StyledRoot>
    );
}
