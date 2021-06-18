async function loginFormHandler(event) {
    event.preventDefault();
  
    var username = document.querySelector('#username-login').value.trim();
    var password = document.querySelector('#password-login').value.trim();
    console.log(username, password);
    if (username && password) {
      var response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          username,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  }
  
  
  document.querySelector('#login-form').addEventListener('submit', loginFormHandler); 

  