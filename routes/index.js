

var router = require('express').Router();
var pizzaRoutes = require('./pizza-routes');


router.use('/pizzas', pizzaRoutes);

module.exports = router;

var router = require('express').Router();

var apiRoutes = require('./api');
var htmlRoutes = require('./html/html-routes');


router.use('/api', apiRoutes);
router.use('/', htmlRoutes);

router.use((req, res) => {
  res.status(404).send('<h1>404 Error</h1>');
});

var commentRoutes = require('./comment-routes');
var pizzaRoutes = require('./pizza-routes');

router.use('/comments', commentRoutes);
router.use('/pizzas', pizzaRoutes); 

module.exports = router;




