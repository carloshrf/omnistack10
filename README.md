# Enviroment preparation
For the correct execution, it will be necessary to install some packages and dependencies, **are they**:
`"Obs.: Node.js must be installed.
version used in development: 12.14.1 LTS"`  

**With the terminal on the backend**
- [Yarn](https://yarnpkg.com/pt-BR/docs/install#windows-stable)
- [Express](https://expressjs.com/pt-br/starter/installing.html)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [Mongoose](https://www.npmjs.com/package/mongoose)
- [Axios](https://www.npmjs.com/package/axios)
- [Socket.io](https://www.npmjs.com/package/socket.io)
- Socket.io-client "yarn add socket.io-client"

**Frontend**
- [Axios](https://www.npmjs.com/package/axios)
- [React-dom](https://www.npmjs.com/package/react-dom)

**Mobile**
- [Axios](https://www.npmjs.com/package/axios)
- expo-cli "npm install -g expo-cli"
- [React-navigation](https://reactnavigation.org/docs/en/getting-started.html)
- Some expo packages with "expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context"
- "yarn add react-navigation-stack"
- "expo install react-native-webview"
- "expo install expo-location"
- "yarn add react-native-maps"

*Run bakend with: yarn dev

*Run web with: yarn start

*Run mobile with: yarn start

*Install expo on your mobile and scan the QR code that will appear on the navigator when the mobile server when to start. 

*change the api address to your server address in the api.js

*change the mongo connect address in index.js (" mongoose.connect('mongodb+sr...
