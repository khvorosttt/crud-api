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

export { getUserById };
