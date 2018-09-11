# "bamazon" Application
##### Created an "Amazon-like storefront" with the MySQL skills we learned this week. The app takes in orders from customers and deplete stock from the store's inventory. 

## Table of Contents
* How to View
* What each JS File does
* Screenshots of running application
* Technologies used and Built with
* Prerequisites
* Author


## How to View
* Clone Repo
* Run the following command in Terminal or Gitbash 'npm install' to install dependencies
* Run the following command depending which file you would like to view
  * Customer -  'npm run bamazon'
  * Manager - 'npm run bamzonManager'
  * Some modes exit automatically, for those that do not please run 'ctrl + c' to exit
 
 ## What Each JS File does
 1. bamazon.js:
    * Prints the products currently availabe
    * Prompts the client which item they would like to purchase
    * Asks for the quanitity of the product
      * Based on the quanitity, if stock is avaialbe, the purchase will be completed
      * If the stock is not available, it will inform the client and prompt them to enter a new product of choice
 2. bamazonManager.js:
    * Views Products for Sale
    * Views Products that have an inventory size of less then 100
    * Adds to inventory
    * Adds New Product
      *Based on what the Manager selects when prompted with the avove listed options, it will output the action
    
 ## ScreenShots
 ![Screenshot of bamazon.js](https://github.com/kanzbra/bamazon/tree/master/images/bamazon.png)
 ![Screenshot of bamazonManager.js](https://github.com/kanzbra/bamazon/tree/master/images/bamazon.png)
 
 ## VideoDemo
 (https://drive.google.com/file/d/1f9ChnHy8pd7EfpG0DqAKWm-oniIskz3n/view)
    
 ## Techonologies used & Built With
 * Node.js
 * Inquire NPM Package (https://www.npmjs.com/package/inquirer)
 * MYSQL NPM Package (https://www.npmjs.com/package/mysql)
 * Visual Studio Code
 * MySQLWorkbench
 * Terminal/Gitbash

## Authors
 * Kanzbra Rasshid
