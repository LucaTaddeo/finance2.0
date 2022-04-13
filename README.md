# Finance 2.0
Node Application for management and tracking of personal finances

## Startup
The application can be started using `yarn build && yarn start` from the root directory! This starts Express.js,
which serves both the api and the static assets from the web/build folder. (Ensure to have the build ready!)

### Startup Scripts
The package.json file defines many different scripts. The most useful ones are following ones: 
- `yarn server`: starts the server using nodemon, with hot reload
- `yarn web`: starts the web client with hot reload
- `yarn dev`: starts the whole application in dev mode, with hot reload (note: client will start on different port)
- `yarn build` and `yarn heroku-postbuild`: builds the React application
- `yarn start`: starts the Express server, serving both api and static React build