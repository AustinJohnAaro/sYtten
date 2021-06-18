async function editFormHandler(event) {
    event.preventDefault();
  
    var title = document.querySelector('input[name="post-title"]').value.trim();
    var content = document.querySelector('input[name="content"]').value.trim();
  
    var id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    var response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        post_id: id,
        title,
        content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  
  }
  
  document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler); 
  