import React from 'react';

export interface Data {
    objectId: string;
    title: string;
    url: string;
};

const useLocalStorage = (key: string) => {
    const [localStateItems, setLocalStateItems] = React.useState<Data[]>(JSON.parse(localStorage.getItem(key) || '[]'));

    React.useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(localStateItems));
    }, [localStateItems, key]);

    return [localStateItems, setLocalStateItems] as const;
}

export default useLocalStorage;