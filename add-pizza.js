var $addToppingBtn = document.querySelector('#add-topping');
var $pizzaForm = document.querySelector('#pizza-form');
var $customToppingsList = document.querySelector('#custom-toppings-list');

var handleAddTopping = event => {
  event.preventDefault();

  var toppingValue = document.querySelector('#new-topping').value;

  if (!toppingValue) {
    return false;
  }

  var checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.name = 'topping';
  checkbox.value = toppingValue;
  checkbox.id = toppingValue
    .toLowerCase()
    .split(' ')
    .join('-');

  var label = document.createElement('label');
  label.textContent = toppingValue;
  label.htmlFor = toppingValue
    .toLowerCase()
    .split(' ')
    .join('-');

  var divWrapper = document.createElement('div');

  divWrapper.appendChild(checkbox);
  divWrapper.appendChild(label);
  $customToppingsList.appendChild(divWrapper);

  toppingValue.value = '';
};

var handlePizzaSubmit = event => {
  event.preventDefault();

  var pizzaName = $pizzaForm.querySelector('#pizza-name').value;
  var createdBy = $pizzaForm.querySelector('#created-by').value;
  var size = $pizzaForm.querySelector('#pizza-size').value;
  var toppings = [...$pizzaForm.querySelectorAll('[name=topping]:checked')].map(topping => {
    return topping.value;
  });

  if (!pizzaName || !createdBy || !toppings.length) {
    return;
  }

  var formData = { pizzaName, createdBy, size, toppings };
};

$pizzaForm.addEventListener('submit', handlePizzaSubmit);
$addToppingBtn.addEventListener('click', handleAddTopping);
 

fetch('/api/pizzas', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(formData)
})
  .then(response => response.json())
  .then(postResponse => {
    alert('Pizza created successfully!');
    console.log(postResponse);
  })
  .catch(err => {
    console.log(err);
    saveRecord(formData);
  });
   

  