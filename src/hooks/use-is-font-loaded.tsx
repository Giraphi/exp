import {useEffect, useState} from "react";

export default function useIsFontLoaded() {
    const [isFontLoaded, setIsFontLoaded] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        document.fonts.ready.then(function () {
            setIsFontLoaded(true);
        });
    }, []);

    return isFontLoaded;
}