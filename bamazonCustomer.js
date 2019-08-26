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
  //start the show!
  showItems();
});

function showItems() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(" ");
      console.log("ID: " + res[i].id + "     " + "Product Name: " + res[i].product_name + "     " + "Unit Price: " + res[i].price.toFixed(2));
      console.log("______________________________________________________________________");

    }

    inquirer.prompt([{

      name: "ID",
      type: "input",
      message: "\nWhat is the ID number of the product you would like to buy?",
      validate: function (value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    },
    {
      name: "quantity",
      type: "input",
      message: "\nPlease enter the quantity you wish to purchase",
      validate: function (value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }

    }]).then(function (transaction) {

      // connect to bamazon_db to check quantity - prompt if qty is too low for transaction - or perform transaction

      connection.query("SELECT * FROM products WHERE id=?", transaction.ID, function (err, res) {
        if (err) throw err;
        if (res.length === 0) {
          console.log("\n*****  !  *****")
          console.log("You have entered an invalid product. Please try again");
          showItems();
        } else {
          for (var i = 0; i < res.length; i++) {

            if (transaction.quantity > res[i].stock_quantity) {
              console.log("\n*****  !  *****")
              console.log("Inventory quantity is too low to fufill your order. Please try again");
              showItems();
            }
            else if (transaction.quantity <= res[i].stock_quantity) {
              console.log("\n----------------");
              console.log("Item: " + res[i].product_name);
              console.log("Department: " + res[i].department_name);
              console.log("Price: $" + res[i].price.toFixed(2));
              console.log("Quantity: " + transaction.quantity);
              console.log("----------------");
              console.log("You owe: $" + parseFloat(res[i].price * transaction.quantity).toFixed(2))



              var updateQuantity = res[i].stock_quantity - transaction.quantity;
              var product = res[i].product_name;

              connection.query("UPDATE products SET stock_quantity=? WHERE id=?", [updateQuantity, transaction.ID], function (err) {
                if (err) throw err;
                console.log("There are: " + updateQuantity + " " + product + " left in inventory")
                connection.end();
              });
            }
          }
        }
      });

    });
  });

}




