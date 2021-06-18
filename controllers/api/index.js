var router = require('express').Router();

var userRoutes = require('./user-routes');
var postRoutes = require('./post-routes');
let commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router; 
