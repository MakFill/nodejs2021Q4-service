# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm run start:dev
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

### Launch with Docker

Application starts on localhost:4000

For launch Docker container - enter to terminal:

```
docker-compose build
docker-compose up
```

If you've made changes into Docker image - enter to terminal

```
docker-compose down
docker-compose build
docker-compose up
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

### Load testing report

# Express

| Test duration | 20 sec |
| Users created | 10 |
| Users completed | 25 |
| http.requests | 72 |
| http.responses | 87 |
| failed | 0 |
| http.response_time (min/max/count/median/p90/p99) | 3/1493/62/273.2/1085.9/1436.8 ms |

# Fastify

| Test duration | 20 sec |
| Users created | 100 |
| Users completed | 100 |
| http.requests | 500 |
| http.responses | 500 |
| failed | 0 |
| http.response_time (min/max/count/median/p90/p99) | 14/1519/295/333.7/1176.4/1380.5 ms |
