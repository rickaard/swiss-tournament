import { useState } from 'react';

export const useModal = (initialState) => {
    const [ isOpen, setIsOpen ] = useState(initialState);

    return {
        isOpen,
        close: () => setIsOpen(false),
        open: () => setIsOpen(true),
    };
}


