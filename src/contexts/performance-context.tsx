import React from "react";

export const Performances = {
    low: 0,
    medium: 1,
    high: 2,
};

export interface PerformanceContextType {
    performance: number;
}

export const PerformanceContext = React.createContext<PerformanceContextType>({
    performance: Performances.high,
});
