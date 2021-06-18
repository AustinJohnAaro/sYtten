
var db;

var request = indexedDB.open('pizza_hunt', 1); 


request.onupgradeneeded = function(event) {
     
    var db = event.target.result;
     
    db.createObjectStore('new_pizza', { autoIncrement: true });
  }; 

  
request.onsuccess = function(event) {
    
    db = event.target.result;
  
    
    if (navigator.onLine) {
      
      
    }
  };
  
  request.onerror = function(event) {
    
    console.log(event.target.errorCode);
  }; 

  
function saveRecord(record) {
     
    var transaction = db.transaction(['new_pizza'], 'readwrite');
  
    
    var pizzaObjectStore = transaction.objectStore('new_pizza');
  
    
    pizzaObjectStore.add(record);
  } 

  function uploadPizza() {
    
    var transaction = db.transaction(['new_pizza'], 'readwrite');
  
    
    var pizzaObjectStore = transaction.objectStore('new_pizza');
  
    
    var getAll = pizzaObjectStore.getAll();

    
getAll.onsuccess = function() {
  
  if (getAll.result.length > 0) {
    fetch('/api/pizzas', {
      method: 'POST',
      body: JSON.stringify(getAll.result),
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(serverResponse => {
        if (serverResponse.message) {
          throw new Error(serverResponse);
        }
        
        var transaction = db.transaction(['new_pizza'], 'readwrite');
        
        var pizzaObjectStore = transaction.objectStore('new_pizza');
        
        pizzaObjectStore.clear();

        alert('All saved pizza has been submitted!');
      })
      .catch(err => {
        console.log(err);
      });
  }
};


window.addEventListener('online', uploadPizza);

    
  } 

