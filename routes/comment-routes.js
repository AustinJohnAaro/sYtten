var router = require('express').Router();
var { addComment, removeComment } = require('../../controllers/comment-controller');

// /api/comments/<pizzaId>
router.route('/:pizzaId').post(addComment);

var {
    addComment,
    removeComment,
    addReply,
    removeReply
  } = require('../../controllers/comment-controller');
 




router
  .route('/:pizzaId/:commentId')
  .put(addReply)
  .delete(removeComment)

router.route('/:pizzaId/:commentId').delete(removeComment);

router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);

module.exports = router; 

