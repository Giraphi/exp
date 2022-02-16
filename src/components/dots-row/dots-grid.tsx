import React, {useContext} from "react";
import AnimatedDot from "./animated-dot";
import styled from "styled-components";
import MousePositionContext from "../../contexts/mouse-position-context";

const StyledRoot = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    justify-content: center;
    width: 100%;
`

const StyledRow = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 10;
    margin-bottom: 50px;
    width: 100%;
`


export interface DotsGridProps {
    numDots: number;
    numDotsHeight: number;
}

export default function DotsGrid(props: DotsGridProps) {
    const mousePosition = useContext(MousePositionContext).mousePositionMotionValue;

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
                                    mousePosition={mousePosition}
                                />
                            )
                        }
                    </StyledRow>
                )
            }
        </StyledRoot>
    );
}
