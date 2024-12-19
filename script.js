const shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];

function renderList() {
  const listContainer = document.getElementById('shopping-list');
  listContainer.innerHTML = '';

  shoppingList.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = item.bought ? 'bought' : '';

    li.innerHTML = `
      <span>${item.name} (${item.quantity})</span>
      <button class="mark-bought" onclick="markAsBought(${index})">Mark as Bought</button>
      <button class="remove-item" onclick="removeItem(${index})">Remove</button>
    `;

    listContainer.appendChild(li);
  });
}

function addItem() {
  const itemName = document.getElementById('item-name').value;
  const itemQuantity = document.getElementById('item-quantity').value;

  if (!itemName || !itemQuantity) {
    alert('Please provide both item name and quantity.');
    return;
  }

  shoppingList.push({ name: itemName, quantity: parseInt(itemQuantity), bought: false });
  localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
  renderList();

  document.getElementById('item-name').value = '';
  document.getElementById('item-quantity').value = '';
}

function removeItem(index) {
  shoppingList.splice(index, 1);
  localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
  renderList();
}

function markAsBought(index) {
  shoppingList[index].bought = true;
  localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
  renderList();
}

function clearList() {
  shoppingList.length = 0;
  localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
  renderList();
}

// Initial render
renderList();
