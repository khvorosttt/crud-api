import { IUser } from './types/types';

// export const users: IUser[] = [
//     {
//         id: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
//         username: 'Tatsiana',
//         age: 24,
//         hobbies: ['programming', 'reading', 'singing'],
//     },
// ];

export const users: IUser[] = [];

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
    return users[findedUserIndex];
};

const deleteUserById = (id: string) => {
    const deletedUserIndex = users.findIndex((item) => item.id === id);
    if (deletedUserIndex === -1) {
        return false;
    }
    users.splice(deletedUserIndex, 1);
    return true;
};

const clearUsers = () => {
    users.length = 0;
};

export { getUserById, addUser, updateUser, deleteUserById, clearUsers };
