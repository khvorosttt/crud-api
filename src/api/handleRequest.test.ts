import http, { request } from 'node:http';
import { startServer } from '../server/server';
import { AddressInfo } from 'node:net';
import { IUser, methods, StatusCodes } from '../types/types';
import { addUser, clearUsers, users } from '../users';
import { v4, validate } from 'uuid';

jest.mock('uuid', () => ({
    ...jest.requireActual('uuid'),
    v4: jest.fn(() => 'testId'),
    validate: jest.fn(),
}));

const mockV4 = v4 as jest.MockedFunction<typeof v4>;
const mockValidate = validate as jest.MockedFunction<typeof validate>;

describe('test correct http request', () => {
    let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
    let baseUrl: string;

    beforeAll((done) => {
        server = startServer('3000');
        server.on('listening', () => {
            const port = (server.address() as AddressInfo).port;
            baseUrl = `http://localhost:${port}/api/users`;
            done();
        });
    });

    afterAll((done) => {
        server.close(done);
    });

    beforeEach(() => {
        mockV4.mockClear();
        mockValidate.mockClear();
        clearUsers();
    });

    test('test GET api/users request (an empty array is expected)', async () => {
        const res = await fetch(baseUrl);
        expect(res.status).toBe(StatusCodes.OK);
        const body = await res.json();
        expect(body).toEqual([]);
    });

    test('test POST api/users request (a response containing newly created record is expected)', async () => {
        const testUser: Omit<IUser, 'id'> = {
            username: 'test',
            age: 1,
            hobbies: [],
        };
        const res = await fetch(baseUrl, {
            method: methods.POST,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testUser),
        });
        expect(res.status).toBe(StatusCodes.CREATED);
        const user: IUser = await res.json();
        expect(user.username).toEqual(testUser.username);
        expect(user.age).toEqual(testUser.age);
        expect(user.hobbies).toEqual(testUser.hobbies);
        expect(user.id).toBeDefined();
    });

    test('test GET api/users/{userId} request try to get the created record by its id (the created record is expected)', async () => {
        const testUser: IUser = {
            id: 'testId',
            username: 'test',
            age: 1,
            hobbies: [],
        };
        addUser(testUser);
        mockValidate.mockReturnValue(true);
        const res = await fetch(`${baseUrl}/${testUser.id}`);
        expect(res.status).toBe(StatusCodes.OK);
        const body = await res.json();
        expect(body).toEqual(testUser);
    });

    test('test PUT api/users/{userId} request try to update the created record (a response is expected containing an updated object with the same id)', async () => {
        const testUser: IUser = {
            id: 'testId',
            username: 'test',
            age: 1,
            hobbies: [],
        };
        addUser(testUser);
        const newBody = {
            username: 'test2',
            age: 22,
            hobbies: ['swimming'],
        };
        mockValidate.mockReturnValue(true);
        const res = await fetch(`${baseUrl}/${testUser.id}`, {
            method: methods.PUT,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBody),
        });
        expect(res.status).toBe(StatusCodes.OK);
        const body = await res.json();
        expect(body).toEqual({ id: testUser.id, ...newBody });
    });

    test('test DELETE api/users/{userId} request, try to delete the created object by id (confirmation of successful deletion is expected)', async () => {
        const testUser: IUser = {
            id: 'testId',
            username: 'test',
            age: 1,
            hobbies: [],
        };
        addUser(testUser);
        console.log(users);
        expect(users.length).toEqual(1);
        mockValidate.mockReturnValue(true);
        const res = await fetch(`${baseUrl}/${testUser.id}`, {
            method: methods.DELETE,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(res);
        expect(res.status).toBe(StatusCodes.NO_CONTENT);
        console.log(users);
        expect(users.length).toEqual(0);
    });

    test('test GET api/users/{userId} request, try to get a deleted object by id (expected answer is that there is no such object)', async () => {
        const testId = 'testId';
        mockValidate.mockReturnValue(true);
        const res = await fetch(`${baseUrl}/${testId}`);
        expect(res.status).toBe(StatusCodes.NOT_FOUND);
        const body = await res.json();
        expect(body.message).toEqual(`User with ${testId} not found`);
    });
});
