var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "1234",
  database: "bamazon_db"
});


connection.connect(function (err) {
  if (err) throw err;
  //start the show
  showItems();
});

function showItems() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(" ");
      console.log("ID: " + res[i].id + "     " + "Product Name: " + res[i].product_name + "     " + "Price: " + res[i].price);
      console.log("________________________________________________________");
    }
 
  inquirer.prompt([{

    name: "ID",
    type: "input",
    message: "\nWhat is the ID number of the product you would like to buy?",
  },
  {
    name: "quantity",
    type: "input",
    message: "Please enter the quantity you wish to purchase.",

  }]).then(function (transaction) {

    // connect to bamazon_db to check quantity - prompt if qty is too low for transaction - or perform transaction

    connection.query("SELECT * FROM products WHERE id=?", transaction.ID, function (err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {

        if (transaction.quantity > res[i].stock_quantity) {
          console.log("\n*****  !  *****")
          console.log("Inventory quantity is too low to fufill your order. Please try again");
          showItems();

        } else {

          console.log("Item: " + res[i].product_name);
          console.log("Department: " + res[i].department_name);
          console.log("Price: " + res[i].price);
          console.log("Quantity: " + transaction.quantity);
          console.log("----------------");
          console.log("Total: " + res[i].price * transaction.quantity);
connection.end();

      
        }
      }
    });
  });
});
}


