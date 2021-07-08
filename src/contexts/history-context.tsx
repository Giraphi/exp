import React from "react";
import * as H from 'history';

export interface HistoryContextType {
    history: H.History;
}

export const HistoryContext = React.createContext<HistoryContextType>({
    history: {} as H.History,
});
