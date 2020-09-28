## Instructions to setup

### Prequesites

Make sure Node and npm is working and VSCode installed

Steps involved

1. Setting up MongoDB
2. Setting up Backend (Express.js)
3. Setting up Front End (React.js)
   .

### Step 1

Please follow this Medium blog to complete your MongoDB install
[MongoDB setup](https://medium.com/@LondonAppBrewery/how-to-download-install-mongodb-on-windows-4ee4b3493514)

Once MongoDB installed, open your git bash and run below commands.

- mongod //This will initiate local DB server in your system . Keep that terminal open. In the new terminal run
- mongo //This will open mongoDB CLI
- show dbs //You will see list of all DBs in your db
- use qubitDB //It will create new DB in your local. Lets add some collections and data
- db.users.insertMany([
  {username:"admin,password:"admin",role:"admin"},
  {username:"viewer",password:"viewer",role:"view"}
  ]) //we are adding users collection to to qubitDB
- db.products.insertMany([
  { id: 1, product: "Sofa", price: 8000 },
  { id: 2, product: "Desktop", price: 15000 },
  { id: 3, product: "Watch", price: 5000 },
  { id: 4, product: "Chair", price: 7000 },
  { id: 5, product: "Laptop", price: 25000 },
  { id: 6, product: "Washing Machine", price: 18000 },
  { id: 7, product: "AC", price: 45000 },
  { id: 8, product: "Bike", price: 75000 },
  { id: 9, product: "Phone", price: 12000 },
  { id: 10, product: "Fan", price: 800 },
  { id: 11, product: "Refridgerator", price: 10000 },
  { id: 12, product: "Macbook", price: 100000 },
  ]) //We are adding products collections to qubitDB

Keep this terminal open

We are good with Step 1 now .. Let's go to step2 🚀🚀🚀🚀

### Step 2

Please clone the repo to your local
Lets say, you have cloned the repo to your folder <path>/<FolderName>
Run the below steps in your terminal

- cd <path>/<FolderName>/functions
- npm install //it will install all the dependencies
- node ./index.js //in your console, your should see "Server started on port 5000"
  // you can check by hitting this url on your browser http://localhost:5000/

Hurray!! We have completed Step 2 as well
Lets go to our final step 🏃🏃🏃🏃

### Step 3

In a new terminal, lets run the below commands

- cd <path>/<FolderName>/
- npm istall //it will install all the dependencies
- npm start // it will start your app and open the chrome tab automatically loading http://localhost://3000

That's it, try the app and please let me your feedback

Here is my short [explanation](https://www.dropbox.com/s/xuojyay6ukrdp5b/Tata%20Naidu%20Nukala%20React%20Challenge.mp4?dl=0) on the app flow

Happy Coding !!!
