import React, {useContext, useMemo} from "react";
import Lightbulb from "./lightbulb";
import {Vector3} from "three/src/math/Vector3";
import useDevice from "../../hooks/use-device";
import useWindowWidth from "../../hooks/use-window-width";
import {HistoryContext} from "../../contexts/history-context";

export interface PageMenuProps {
    onClick: () => void;
    // currentPage: ""
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
    //
    // console.log(history);

    // const lightbulbPositions = useMemo(() => {
    //     if (device !== "small") {
    //         return [
    //             new Vector3(-windowWidth / 6, 180, 0),
    //             new Vector3(-windowWidth / 6, 140, 0),
    //             new Vector3(-windowWidth / 6, 100, 0),
    //             new Vector3(-windowWidth / 6, 60, 0),
    //         ]
    //     }
    //
    //     return [
    //         new Vector3(-windowWidth / 4, 180, 100),
    //         new Vector3(-windowWidth / 4, 140, 100),
    //         new Vector3(-windowWidth / 4, 100, 100),
    //         new Vector3(-windowWidth / 4, 60, 100),
    //     ]
    //
    // }, [device, windowWidth]);

    const itemDescriptions: ItemDescription[] = useMemo(() => {
        const position =  device !== "small"
            ? new Vector3(-windowWidth / 6, 180, 0)
            : new Vector3(-windowWidth / 4, 180, 170);

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

        if (location.pathname !== "/skills") {
            positionCounter.sub(delta);
            items.push({
                text: "Skills",
                path: "/skills",
                position: positionCounter.clone(),
            });
        }

        if (location.pathname !== "/work") {
            positionCounter.sub(delta);
            items.push({
                text: "Work",
                path: "/work",
                position: positionCounter.clone(),
            });
        }

        if (location.pathname !== "/about") {
            positionCounter.sub(delta);
            items.push({
                text: "About Me",
                path: "/about",
                position: positionCounter.clone(),
            });
        }

        return items

    }, [device, location.pathname, windowWidth]);

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