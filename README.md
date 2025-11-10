# CRUD API

Simple CRUD API with in-memory database implementing horizontal scaling using Node.js Cluster API.

## Technical Requirements

- Language: TypeScript
- Node.js: version 24.x.x or higher
- Allowed dependencies: `nodemon`, `dotenv`, `cross-env`, `typescript`, `ts-node`, `ts-node-dev`, `eslint`, `prettier`, `webpack`, `uuid`, `@types/*`

## Installation and Running

### Install dependencies:
```npm install```

### Running Modes:

### Development:
```npm run start:dev```

### Production:
```npm run start:prod```

### Horizontal Scaling:
```npm run start:multi```

### Testing:
```npm test```

### Linting and Formatting:
```
npm run lint
npm run lint:fix
npm run format
```

## Configuration

Create `.env` file based on `.env.example`:
```
PORT=4000
BASE_ENDPOINT='/api/users'
```

## API Endpoints

Get all users:
- GET `/api/users`
- Response: `200` OK with users list

Get user by ID:
- GET `/api/users/{userId}`
- Response: `200` OK - user found
- Response: `400` Bad Request - invalid UUID
- Response: `404` Not Found - user not found

Create user:
- POST `/api/users`
- Body: JSON object with username, age, hobbies fields
- Response: `201` Created - user created
- Response: `400` Bad Request - missing required fields

Update user:
- PUT `/api/users/{userId}`
- Response: `200` OK - user updated
- Response: `400` Bad Request - invalid UUID
- Response: `404` Not Found - user not found

Delete user:
- DELETE `/api/users/{userId}`
- Response: `204` No Content - user deleted
- Response: `400` Bad Request - invalid UUID
- Response: `404` Not Found - user not found

## User Structure

```
{
  id: string,           // UUID (generated on server)
  username: string,     // required
  age: number,          // required
  hobbies: string[]     // array of strings (can be empty)
}
```

## Horizontal Scaling

Project supports horizontal scaling via Node.js Cluster API:

- Load balancer listens on port `4000`
- Workers run on ports `4001`, `4002`, `4003`, etc.
- Distribution algorithm: Round-robin
- _Limitation:_ Each worker has its own memory, data is not synchronized between workers

## Testing

Included test scenarios:
1. Get all users
2. Create new user
3. Get user by ID
4. Update user
5. Delete user

## Error Handling

- `404` Not Found - for non-existing endpoints
- `500` Internal Server Error - for server internal errors
