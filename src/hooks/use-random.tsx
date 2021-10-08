import { useCallback, useRef } from "react";

export default function useRandomGenerator(sequenceSeed: number) {
    const seed = useRef(sequenceSeed);

    return useCallback(
        (min = 0, max = 0.999) => {
            function sinusRandom() {
                const x = Math.sin(seed.current) * 10000;
                seed.current++;
                return x - Math.floor(x);
            }

            const random = sinusRandom();
            return Math.round((random * (max - min) + min) * 100) / 100;
        },
        [seed]
    );
}
