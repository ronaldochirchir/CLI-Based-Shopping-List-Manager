const fs = require('fs');
const readline = require('readline');

// Initialize the CLI interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const shoppingListFile = 'shoppingList.json';

// Load the shopping list from the file
function loadShoppingList() {
  try {
    const data = fs.readFileSync(shoppingListFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];  // Return an empty array if the file does not exist
  }
}

// Save the shopping list to the file
function saveShoppingList(list) {
  fs.writeFileSync(shoppingListFile, JSON.stringify(list, null, 2));
}

// Add a new item to the shopping list
function addItem(name, quantity) {
  const shoppingList = loadShoppingList();
  shoppingList.push({ name, quantity, bought: false });
  saveShoppingList(shoppingList);
  console.log(`Item "${name}" added with quantity ${quantity}.`);
}

// Remove an item from the shopping list by name
function removeItem(name) {
  let shoppingList = loadShoppingList();
  shoppingList = shoppingList.filter(item => item.name.toLowerCase() !== name.toLowerCase());
  saveShoppingList(shoppingList);
  console.log(`Item "${name}" removed.`);
}

// View the current shopping list
function viewList() {
  const shoppingList = loadShoppingList();
  if (shoppingList.length === 0) {
    console.log('The shopping list is empty.');
  } else {
    console.log('Shopping List:');
    shoppingList.forEach((item, index) => {
      const status = item.bought ? 'bought' : 'not bought';
      console.log(`${index + 1}. ${item.name} (${item.quantity}) - ${status}`);
    });
  }
}

// Mark an item as bought
function markAsBought(name) {
  const shoppingList = loadShoppingList();
  const item = shoppingList.find(item => item.name.toLowerCase() === name.toLowerCase());
  if (item) {
    item.bought = true;
    saveShoppingList(shoppingList);
    console.log(`"${name}" marked as bought.`);
  } else {
    console.log(`Item "${name}" not found.`);
  }
}

// Clear the shopping list
function clearList() {
  saveShoppingList([]);
  console.log('The shopping list has been cleared.');
}

// Show the CLI menu
function showMenu() {
  console.log(`
    Commands:
    1. add <item> <quantity> - Add item to the list
    2. remove <item> - Remove item from the list
    3. list - View all items
    4. mark <item> as bought - Mark an item as bought
    5. clear - Clear the list
  `);

  rl.question('Enter a command: ', (input) => {
    const commandParts = input.split(' ');
    const command = commandParts[0].toLowerCase();
    const itemName = commandParts.slice(1).join(' ');

    switch (command) {
      case 'add':
        const [name, quantity] = itemName.split(' ');
        addItem(name, parseInt(quantity));
        break;
      case 'remove':
        removeItem(itemName);
        break;
      case 'list':
        viewList();
        break;
      case 'mark':
        markAsBought(itemName);
        break;
      case 'clear':
        clearList();
        break;
      default:
        console.log('Invalid command.');
    }

    showMenu();  // Show menu again after the command
  });
}

// Start the CLI application
console.log('Welcome to the Shopping List Manager!');
showMenu();
