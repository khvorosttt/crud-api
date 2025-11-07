import { IUser } from './types/types';

export const users: IUser[] = [
    {
        id: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
        username: 'Tatsiana',
        age: 24,
        hobbies: ['programming', 'reading', 'singing'],
    },
];

const getUserById = (id: string) => {
    const user = users.find((item) => item.id === id);
    return user;
};

const addUser = (user: IUser) => {
    users.push(user);
};

const updateUser = (id: string, user: Omit<IUser, 'id'>) => {
    const findedUserIndex = users.findIndex((item) => item.id === id);
    if (findedUserIndex === -1) {
        return null;
    }
    users[findedUserIndex] = {
        id: users[findedUserIndex].id,
        ...user,
    };
    return user;
};

export { getUserById, addUser, updateUser };
