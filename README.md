# Bamazon

Baazon is a command line storefront sales app that uses a MySQL database to hold inventory information. 

## Technologies Used:

    *   Node.js
    *   MySQL
    
## How to use Bamazon

From the commad line, type 

       node bamazon.js
       
This will display items available for sale from the bamazon MySQL databse and a command line prompt asking the user
to enter the item number of the product to be purchased. Followed by a request for the number of items the user
wishes to purchase.

![products from db](/images/1.JPG)

![MySQL](/images/2.JPG)

When the user enters a valid item number and quantity, the sale is completed. Information about the sale is displayed.
The database is updated, and the transaction ends.

![sale](/images/3.JPG)

![MySQL update](/images/4.JPG)

If an item number is entered that is not in the database, a message is displayed telling the user that the choice was 
invalid, and to please try again. The inventory from the database is again displayed along with the prompt for user input.

![invalid choice](/images/5.JPG)

![invalid choice display](/images/6.JPG)

If the quantity requested is more than the quantity recorded in the database, a message alerting the user to the 
discrepancy is displayed, the products are re-displayed, and the user is provided a chance to try again.

![insufficient quantity](/images/7.JPG)



