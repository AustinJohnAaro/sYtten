var $backBtn = document.querySelector('#back-btn');
var $pizzaName = document.querySelector('#pizza-name');
var $createdBy = document.querySelector('#created-by');
var $createdAt = document.querySelector('#created-at');
var $size = document.querySelector('#size');
var $toppingsList = document.querySelector('#toppings-list');
var $commentSection = document.querySelector('#comment-section');
var $newCommentForm = document.querySelector('#new-comment-form');

var pizzaId;

getPizza();

function getPizza() {
  
  var searchParams = new URLSearchParams(document.location.search.substring(1));
  var pizzaId = searchParams.get('id');

  
  fetch(`/api/pizzas/${pizzaId}`)
    .then(response => {
      
      if (!response.ok) {
        throw new Error({ message: 'Something went wrong!' });
      }

      return response.json();
    })
    .then(printPizza)
} 


  
  fetch(`/api/pizzas/${pizzaId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error({ message: 'Something went wrong!' });
      }

      return response.json();
    })
    .then(printPizza)
    .catch(err => {
      console.log(err);
      alert('Cannot find a pizza with this id! Taking you back.');
      window.history.back();
    });


  
  fetch(`/api/pizzas/${pizzaId}`)
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(printPizza);


function printPizza(pizzaData) {
  console.log(pizzaData);

  pizzaId = pizzaData._id;

  var { pizzaName, createdBy, createdAt, size, toppings, comments } = pizzaData;

  $pizzaName.textContent = pizzaName;
  $createdBy.textContent = createdBy;
  $createdAt.textContent = createdAt;
  $size.textContent = size;
  $toppingsList.innerHTML = toppings
    .map(topping => `<span class="col-auto m-2 text-center btn">${topping}</span>`)
    .join('');

  if (comments && comments.length) {
    comments.forEach(printComment);
  } else {
    $commentSection.innerHTML = '<h4 class="bg-dark p-3 rounded">No comments yet!</h4>';
  }
}

function printComment(comment) {
  
  var commentDiv = document.createElement('div');
  commentDiv.classList.add('my-2', 'card', 'p-2', 'w-100', 'text-dark', 'rounded');

  var commentContent = `
      <h5 class="text-dark">${comment.writtenBy} commented on ${comment.createdAt}:</h5>
      <p>${comment.commentBody}</p>
      <div class="bg-dark ml-3 p-2 rounded" >
        ${
          comment.replies && comment.replies.length
            ? `<h5>${comment.replies.length} ${
                comment.replies.length === 1 ? 'Reply' : 'Replies'
              }</h5>
        ${comment.replies.map(printReply).join('')}`
            : '<h5 class="p-1">No replies yet!</h5>'
        }
      </div>
      <form class="reply-form mt-3" data-commentid='${comment._id}'>
        <div class="mb-3">
          <label for="reply-name">Leave Your Name</label>
          <input class="form-input" name="reply-name" required />
        </div>
        <div class="mb-3">
          <label for="reply">Leave a Reply</label>
          <textarea class="form-textarea form-input"  name="reply" required></textarea>
        </div>

        <button class="mt-2 btn display-block w-100">Add Reply</button>
      </form>
  `;

  commentDiv.innerHTML = commentContent;
  $commentSection.prepend(commentDiv);
}

function printReply(reply) {
  return `
  <div class="card p-2 rounded bg-secondary">
    <p>${reply.writtenBy} replied on ${reply.createdAt}:</p>
    <p>${reply.replyBody}</p>
  </div>
`;
}

function handleNewCommentSubmit(event) {
  event.preventDefault();

  var commentBody = $newCommentForm.querySelector('#comment').value;
  var writtenBy = $newCommentForm.querySelector('#written-by').value;

  if (!commentBody || !writtenBy) {
    return false;
  }

  var formData = { commentBody, writtenBy };

  fetch(`/api/comments/${pizzaId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      response.json();
    })
    .then(commentResponse => {
      console.log(commentResponse);
      location.reload();
    })
    .catch(err => {
      console.log(err);
    });
} 
    

function handleNewReplySubmit(event) {
  event.preventDefault();

  if (!event.target.matches('.reply-form')) {
    return false;
  }

  var commentId = event.target.getAttribute('data-commentid');

  var writtenBy = event.target.querySelector('[name=reply-name]').value;
  var replyBody = event.target.querySelector('[name=reply]').value;

  if (!replyBody || !writtenBy) {
    return false;
  }

  var formData = { writtenBy, replyBody };

  fetch(`/api/comments/${pizzaId}/${commentId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      response.json();
    })
    .then(commentResponse => {
      console.log(commentResponse);
      location.reload();
    })
    .catch(err => {
      console.log(err);
    });
}

$backBtn.addEventListener('click', function() {
  window.history.back();
});


$newCommentForm.addEventListener('submit', handleNewCommentSubmit);
$commentSection.addEventListener('submit', handleNewReplySubmit);
 

