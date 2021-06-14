// Exporting an object containing models

module.exports = {
    Workout: require('./workout'),
  }; 

  const Pizza = require('./Pizza');
  const Comment = require('./Comment');
  
  module.exports = { Pizza, Comment };
  const Pizza = require('./Pizza');

  const router = require('express').Router();
const htmlRoutes = require('./html/html-routes');

router.use('/', htmlRoutes);

router.use((req, res) => {
  res.status(404).send('<h1>😝 404 Error!</h1>');
});

module.exports = router;
 

  module.exports = { Pizza }; 
  