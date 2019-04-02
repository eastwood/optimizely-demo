This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Installing

To run the client, run:

```
λ git clone git@github.com:eastwood/optimizely-demo.git
λ cd optimizely-demo
λ npm install
```

In two separate terminals, run:

```
λ npm start
λ npm run server
```


The `src/server.js` contains the basic API, the SDK is installed in the `package.json`, though you'll need to reference it.
The rest of `src/*` contains the react application which is used to call out to the API to fetch dynamic information
