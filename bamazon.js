//build a mqsql connection to the database

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
    table();
})

//create a "table" that will list out the products in full detail
var table = function(){ 
    connection.query("SELECT * FROM products", function(err,res){
        for (var i = 0; i<res.length; i++) {
             console.log(res[i].item_id+" || "+res[i].product_name+" || "+res[i].department_name+" || "+res[i].price+" || "+res[i].stock_quantity+"\n");
        }
        askClient(res);
    })
}

//create a function to ask client what they would like to purchase, use res as parameter
var askClient = function(res){
    //use inquire package to prompt client with questions
    inquirer.prompt([{
        type: 'input',
        name: 'choice',
        message: "What would you like to purchase today? If you would like to quit please hit Q"
        //use answer parameter to manipulate data 
    }]).then(function(answer){
        //set clients pick as variable to a boolean value that will return true only if the clients response matches the products name 
        var clientPick = false; 
        //exit out of program if client hits Q
        if(answer.choice.toUpperCase()=="Q"){
           process.exit(); 
        }
        //use a for loop that will run through the product list to see if clients response matches if it doesnt match then inform client of so (at the end of function)
        for(var i=0; i<res.length;i++){
            if(res[i].product_name==answer.choice){
                clientPick=true; 
                //set the clients pick as new vairable and it's index value as an id number
                var product=answer.choice;
                var id=i;
                //now that the clients choice matches a product use inquirer package again to see how many of the item the client would like to purchase
            inquirer.prompt({ 
                type: 'input',
                name: 'quantity',
                message: 'How many would you like to purchase?',
                //confirm that answer is a number using isNaN method
                validate: function(value){
                    if(isNaN(value)===false){
                        return true;  
                    } else {
                        return false;
                    }
                }
            //if client's response is a number suctract the users quanitity choice from actual stock quantity to show item has been bought
            }).then(function(answer){
                if((res[id].stock_quantity-answer.quantity)>0) {
                    connection.query("UPDATE products SET stock_quantity='"
                    +(res[id].stock_quantity-answer.quantity)+"' WHERE product_name = '"+product+" ' ",
                    function(err,res2){
                        console.log("Product Bought!");
                        //call table function to show new table after stock has been subtracted from
                        table();
                    })
                
                }else {
                        console.log("Insufficient Quantity!");
                        askClient(res);
                      }
                })  
             }
         }
         //Inform client that their selection does not match anything pon product list
         if(i==res.length && clientPick==false){
             console.log("We do not sell this product!");
             askClient(res);

         }

    })
}








