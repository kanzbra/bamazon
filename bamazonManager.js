var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "1Bestmother",
    database: "bamazon"
})

//use console.log to see if connection is established 
connection.connect(function(err){
    if(err) throw err;
    console.log("yerrrr the connection is successful!");
    askManager();
})

//Need to list a menu like this but with inquirer package
//  var options = function(){
//     switch(options){
//         case 'View Products for Sale': {
//             table();
//             break;
//         }
//         case 'View Low Inventory': {
//             inventoryLow(res);
//             break;
//         }
//         case 'Add to Inventory': {
//             inventory(res.stock_quantity+newInventory);
//             break;
//         }
//         case 'Add New Product': {
//             inventory(res+newProduct);        
//             break;
//         }
//         default:
//         console.error('Unrecognized Action')
//         return;
// }
// };

var askManager = function(){
    //use inquire package to prompt manager with questions and show options
    inquirer.prompt([{
        type: 'list',
        name: 'option',
        message: 'Please make a selection from the following actions?',
        choices: ['View Products for Sale','View Low Inventory','Add to Inventory','Add New Product'],
     }]).then(function(answer) {
            switch(answer.option){
            case "View Products for Sale": inventory();
            break;
            case "View Low Inventory": lowInventory();
            break;
            case "Add to Inventory": addInventory();
            break;
            case "Add New Product": addNewProduct();
            break;
            case "End Session": console.log('Good Bye!');
            process.exit(); 
            }
        });   
    }


function inventory() {
        connection.query("SELECT * FROM products", function(err,res){
            for (var i = 0; i<res.length; i++) {
                 console.log(res[i].item_id+" || "+res[i].product_name+" || "+res[i].department_name+" || "+res[i].price+" || "+res[i].stock_quantity+"\n");
            }
            connection.end();   
        })
    }

function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 100", function(err,res){
        for (var i = 0; i<res.length; i++) {
             console.log(res[i].item_id+" || "+res[i].product_name+" || "+res[i].department_name+" || "+res[i].price+" || "+res[i].stock_quantity+"\n");
        }
        connection.end();   
    })
}


function addInventory() {

        console.log('Adding to Inventory');
      
        connection.query('SELECT * FROM products', function(err, res){
        if(err) throw err;
        var itemArray = [];
        //pushes each item into an itemArray
        for(var i=0; i<res.length; i++){
          itemArray.push(res[i].product_name);
        }
      
        inquirer.prompt([{
          type: "list",
          name: "product",
          choices: itemArray,
          message: "Which item would you like to add inventory?"
        }, {
          type: "input",
          name: "quantity",
          message: "How much would you like to add?",
          validate: function(value){
            if(isNaN(value) === false){return true;}
            else{return false;}
          }
          }]).then(function(answer){
            var currentQuantity;
            for(var i=0; i<res.length; i++){
              if(res[i].product_name === answer.product){
                currentQuantity = res[i].stock_quantity;
              }
            }
            connection.query('UPDATE products SET ? WHERE ?', [
              {stock_quantity: currentQuantity + parseInt(answer.quantity)},
              {product_name: answer.product}
              ], function(err, res){
                if(err) throw err;
                console.log('The quantity was updated.');
                
              });
            })
  
        });
       
      }
      
//allows manager to add a completely new product to store
function addNewProduct(){
    console.log('Adding New Product');
        var deptartmentNames = [];
        //grab name of departments
        connection.query('SELECT * FROM products WHERE department_name', function(err, res){
          if(err) throw err;
          for(var i = 0; i<res.length; i++){
            deptartmentNames.push(res[i].products.department_name);
          }
        })
      
        inquirer.prompt([{
          type: "input",
          name: "product",
          message: "Product: ",
          validate: function(value){
            if(value){return true;}
            else{return false;}
          }
        }, {
          type: "list",
          name: "department",
          message: "Department: ",
          choices: deptartmentNames
        }, {
          type: "input",
          name: "price",
          message: "Price: ",
          validate: function(value){
            if(isNaN(value) === false){return true;}
            else{return false;}
          }
        }, {
          type: "input",
          name: "quantity",
          message: "Quantity: ",
          validate: function(value){
            if(isNaN(value) == false){return true;}
            else{return false;}
          }
        }]).then(function(ans){
          connection.query('INSERT INTO products SET ?',{
            product_name: answer.product,
            department_name: answer.department,
            price: answer.price,
            stock_quantity: answer.quantity
          }, function(err, res){
            if(err) throw err;
            console.log('Another item was added to the store.');
          })
        connection.end(); 
    });
}
      

   
   
   
   
   
   
   
   
   















