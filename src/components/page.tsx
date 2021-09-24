import React, {useLayoutEffect, useRef, useState} from "react";
import styled, {css} from "styled-components";
import useDevice from "../hooks/use-device";
import TopBar from "./top-bar/top-bar";

const StyledRoot = styled.div<{isMobileTop: boolean}>`
    ${props => props.isMobileTop && css`
        user-select: none;
    `}
`

export interface PageProps {
    children: React.ReactNode;
}

export default function Page(props: PageProps) {
    const device = useDevice();
    const timeout = useRef<NodeJS.Timeout>();
    const [isTop, setIsTop] = useState(true);

    useLayoutEffect(() => {
        onScroll();

        function onScroll() {
            if (timeout.current) {
                clearTimeout(timeout.current)
            }

            timeout.current = setTimeout(() => {
                window.scrollY < 80 ? setIsTop(true) : setIsTop(false);
            }, 20);
        }

        document.addEventListener("scroll", onScroll)
        return () => document.removeEventListener("scroll", onScroll);
    }, [device]);

    return (
        <StyledRoot isMobileTop={isTop && device === "small"}>
            <TopBar isScrolledToTop={isTop}/>
            {props.children}
        </StyledRoot>
    );
}