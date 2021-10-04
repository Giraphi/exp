import React from 'react';

export interface MenuContextType {
    isMenuOpen: boolean;
    setIsMenuOpen: (isMenuOpen: boolean) => void;

}

export const MenuContext = React.createContext<MenuContextType>({
    isMenuOpen: false,
    setIsMenuOpen: (isMenuOpen: boolean) => undefined,
});

export default MenuContext;
