const express = require('express');
const path = require('path');
const cors = require('cors');
const optimizely = require('@optimizely/optimizely-sdk');
const app = express();

// Instantiate an Optimizely client
// const datafile = null;
// const optimizelyClientInstance = optimizely.createInstance({ datafile: datafile });

const userMiddleware = (req, res, next) => {
  let userId = req.headers['x-user-id'];
  console.log(userId);
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
  const variation = 'control';

  // const variation = optimizelyClientInstance.activate('experiment', userId); // we pay for this call
  // Evaluate a feature flag and a variable
  // const enabled = optimizelyClientInstance.isFeatureEnabled('price_filter', userId);
  // const min_price = optimizelyClientInstance.getFeatureVariableInteger('price_filter', 'min_price', userId);

  req.user.optimizely = {
    enabled,
    min_price,
    variation
  }

  next();
}

const optimizelyMiddleware = [userMiddleware, variationMiddleware];

app.use(cors());
app.use(express.static(path.join(__dirname, '../build')));

app.get('/api/v1/hello', optimizelyMiddleware, (req, res) => {
  const userId = req.user.id;
  const experiment = req.user.optimizely;

  setTimeout(() => {
    // optimizelyClientInstance.track('purchased', userId);
    res.status(200).json({
      name: 'James',
      id: userId,
      experiment
    });
  }, 1000)
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(9000);
