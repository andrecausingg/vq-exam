import React, { useEffect, createContext, useState, Dispatch, SetStateAction } from 'react';

// Define the type structure for a user
export type User = {
    session: string;
    role: string;
}

// Define the structure of the UserContext
export interface UserContextInterface {
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
}

// Define the default state for the UserContext
const defaultState: UserContextInterface = {
    user: {
        session: '',
        role: '',
    },
    setUser: () => {}
};

// Create the UserContext using createContext
export const UserContext = createContext(defaultState);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User>(() => {
        const storedUser = sessionStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : defaultState.user;
    });

    useEffect(() => {
        sessionStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}