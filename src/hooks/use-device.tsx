import useWindowWidth from "./use-window-width";
import {useMemo} from "react";

export default function useDevice() {
    const windowWidth = useWindowWidth();

    return  useMemo(() => {
        console.log(windowWidth);

        if (windowWidth > 1024) {
            return "large";
        }

        return "small";
    }, [windowWidth]);

    // return device;
}