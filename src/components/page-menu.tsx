import React, { useContext, useMemo, useState } from "react";
import { Vector3 } from "three/src/math/Vector3";
import useDevice from "../hooks/use-device";
import { HistoryContext } from "../contexts/history-context";
import Lightbulb from "./lightbulb/lightbulb";

export interface PageMenuProps {
    onClick: () => void;
    negative?: boolean;
    position?: Vector3;
    disableWhiteLight?: boolean;
    hoverColor?: string;
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
        const position = props.position || (device !== "small" ? new Vector3(-220, 230, 50) : new Vector3(-60, 220, 100))
        const delta = device !== "small" ? new Vector3(0, 40, 0) : new Vector3(0, 50, 0);

        const positionCounter = position.clone();

        const items: ItemDescription[] = [
            {
                text: device !== "small" ? "Back Home" : "Home",
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
            text: device !== "small" ? "About Me" : "About",
            path: "/about",
            position: positionCounter.clone(),
        });

        return items;
    }, [device, props.position]);

    const lightPosition = useMemo(() => {
        if (props.position) {
            return props.position
        }
        return new Vector3(-500, 500, 90);
    }, [props.position]);

    return (
        <>
            {!props.disableWhiteLight &&
                <pointLight color={"white"} intensity={1.2} distance={2000} decay={1} position={lightPosition} />
            }

            {itemDescriptions.map((itemDescription) => (
                <Lightbulb
                    isActive={initialPathname === itemDescription.path}
                    key={itemDescription.path}
                    position={itemDescription.position}
                    text={itemDescription.text}
                    height={device !== "small" ? 95 : 60}
                    path={itemDescription.path}
                    horizontal={true}
                    onClick={props.onClick}
                    negative={props.negative}
                    lightParams={{
                        inner: {
                            decay: 1.5,
                            distance: 650,
                            intensity: 0.5,
                        },
                        outer: {
                            intensity: 0.1,
                        },
                    }}
                    hoverColor={props.hoverColor}
                />
            ))}
        </>
    );
}
