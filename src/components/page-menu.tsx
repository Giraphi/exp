import React, {useContext, useMemo, useState} from "react";
import Lightbulb from "./lightbulb";
import {Vector3} from "three/src/math/Vector3";
import useDevice from "../hooks/use-device";
import useWindowWidth from "../hooks/use-window-width";
import {HistoryContext} from "../contexts/history-context";

export interface PageMenuProps {
    onClick: () => void;
    negative?: boolean;
}

interface ItemDescription {
    text: string,
    path: string,
    position: Vector3,
}

export default function PageMenu(props: PageMenuProps) {
    const device = useDevice();
    const windowWidth = useWindowWidth();
    const location = useContext(HistoryContext).history.location;
    const initialPathname = useState(location.pathname)[0];

    const itemDescriptions: ItemDescription[] = useMemo(() => {
        const position =  device !== "small"
            ? new Vector3(-windowWidth / 6, 180, 0)
            : new Vector3(-120, 180, 100);

        const delta = device !== "small"
            ? new Vector3(0,40,0)
            : new Vector3(0,50,0)
        const positionCounter = position.clone();

        const items: ItemDescription[] = [
            {
                text: "Back Home",
                path: "/home",
                position: position,
            }
        ];

        if (initialPathname !== "/skills") {
            positionCounter.sub(delta);
            items.push({
                text: "Skills",
                path: "/skills",
                position: positionCounter.clone(),
            });
        }

        if (initialPathname !== "/work") {
            positionCounter.sub(delta);
            items.push({
                text: "Work",
                path: "/work",
                position: positionCounter.clone(),
            });
        }

        if (initialPathname !== "/about") {
            positionCounter.sub(delta);
            items.push({
                text: "About Me",
                path: "/about",
                position: positionCounter.clone(),
            });
        }

        return items

    }, [device, initialPathname, windowWidth]);

    return (
        <>
            {itemDescriptions.map(itemDescription =>
                <Lightbulb
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
                            intensity: 0.3
                        },
                        outer: {
                            intensity: 0.1
                        }
                    }}
                />
            )}
        </>
    );
}