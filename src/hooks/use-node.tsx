import { useCallback, useState } from "react";

export default function useNode<D>() {
    const [refNode, setRefNode] = useState<D>();

    const ref = useCallback((node) => {
        if (node === null) {
            return;
        }

        setRefNode(node);
    }, []);

    return { ref, refNode };
}
