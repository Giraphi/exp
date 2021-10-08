import React, { useContext, useMemo, useState } from "react";
import { Vector3 } from "three/src/math/Vector3";
import useDevice from "../hooks/use-device";
import { HistoryContext } from "../contexts/history-context";
import Lightbulb from "./lightbulb/lightbulb";

export interface PageMenuProps {
    onClick: () => void;
    negative?: boolean;
}

interface ItemDescription {
    text: string;
    path: string;
    position: Vector3;
}

export default function PageMenu(props: PageMenuProps) {
    const device = useDevice();
    const location = useContext(HistoryContext).history.location;
    const initialPathname = useState(location.pathname)[0];

    const itemDescriptions: ItemDescription[] = useMemo(() => {
        const position = device !== "small" ? new Vector3(-220, 230, 50) : new Vector3(-60, 220, 100);

        const delta = device !== "small" ? new Vector3(0, 40, 0) : new Vector3(0, 50, 0);
        const positionCounter = position.clone();

        const items: ItemDescription[] = [
            {
                text: "Back Home",
                path: "/",
                position: position,
            },
        ];

        positionCounter.sub(delta);
        items.push({
            text: "Skills",
            path: "/skills",
            position: positionCounter.clone(),
        });

        positionCounter.sub(delta);
        items.push({
            text: "Work",
            path: "/work",
            position: positionCounter.clone(),
        });

        positionCounter.sub(delta);
        items.push({
            text: "About Me",
            path: "/about",
            position: positionCounter.clone(),
        });

        return items;
    }, [device]);

    return (
        <>
            {itemDescriptions.map((itemDescription) => (
                <Lightbulb
                    isActive={initialPathname === itemDescription.path}
                    key={itemDescription.path}
                    position={itemDescription.position}
                    text={itemDescription.text}
                    height={95}
                    path={itemDescription.path}
                    horizontal={true}
                    onClick={props.onClick}
                    negative={props.negative}
                    lightParams={{
                        inner: {
                            decay: 1.5,
                            distance: 650,
                            intensity: 0.3,
                        },
                        outer: {
                            intensity: 0.1,
                        },
                    }}
                />
            ))}
        </>
    );
}
