import React, {useLayoutEffect, useRef, useState} from "react";
import styled, {css} from "styled-components";
import useDevice from "../hooks/use-device";

const StyledRoot = styled.div<{isMobileTop: boolean}>`
    ${props => props.isMobileTop && css`
        user-select: none;
    `}
`

export interface DisableUserSelectMobileProps {
    children: React.ReactNode;
}

export default function DisableUserSelectMobile(props: DisableUserSelectMobileProps) {
    const device = useDevice();
    const timeout = useRef<NodeJS.Timeout>();
    const [isMobileTop, setIsMobileTop] = useState(true);

    useLayoutEffect(() => {
        if (device !== "small") {
            setIsMobileTop(false);
            return;
        }
        onScroll();

        function onScroll() {
            if (timeout.current) {
                clearTimeout(timeout.current)
            }

            timeout.current = setTimeout(() => {
                window.scrollY < 50 ? setIsMobileTop(true) : setIsMobileTop(false);
            }, 20);
        }

        document.addEventListener("scroll", onScroll)
        return () => document.removeEventListener("scroll", onScroll);
    }, [device]);

    return (
        <StyledRoot isMobileTop={isMobileTop}>
            {props.children}
        </StyledRoot>
    );
}