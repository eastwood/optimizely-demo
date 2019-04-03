const express = require('express');
const path = require('path');
const cors = require('cors');
const rp = require('request-promise');
const optimizely = require('@optimizely/optimizely-sdk');

let optimizelyClientInstance = null;

const getDataFile = async () => {
  return rp.get('https://cdn.optimizely.com/datafiles/NcSpoEyxyL3SQqLgvwdPZM.json');
}

const app = express();

const userMiddleware = (req, res, next) => {
  let userId = req.headers['x-user-id'];
  if (!userId) {
    userId = Math.floor(Math.random() * 1000);
  }
  req.user = {
    id: userId
  }
  next();
}


const variationMiddleware = (req, res, next) => {

  const enabled = false;
  const min_price = 10;

  req.user.optimizely = {
    enabled,
    min_price
  }

  next();
}

const optimizelyMiddleware = [userMiddleware, variationMiddleware];

app.use(cors());
app.use(express.static(path.join(__dirname, '../build')));

app.get('/api/v1/hello', optimizelyMiddleware, (req, res) => {
  const userId = req.user.id;
  const experiment = req.user.optimizely;

  const attributes = {
    age: 60
  };

  const variation = optimizelyClientInstance.activate('clint-ab-test-demo', userId, attributes);
  if (variation === 'control') {
    console.log('Control');
    // execute code for control
  } else if (variation === 'experiment') {
    console.log('Experiment');
  } else {
    console.log('Something fell through');
  }
  // Evaluate a feature flag and a variable

  setTimeout(() => {
    // optimizelyClientInstance.track('purchased', userId);
    res.status(200).json({
      name: 'James',
      id: userId,
      experiment,
    });
  }, 1000)
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});


async function startServer() {
  const datafile = await getDataFile();
  optimizelyClientInstance = optimizely.createInstance({ datafile });
  app.listen(9000);
}

startServer();

