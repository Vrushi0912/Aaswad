### Aaswad ### -Food ordering website

### Overview ###

This is a Node.js application that allows you to manage a food menu, with a backend running on Express and MongoDB to store the menu data. It provides an interface for adding food items to the database, using a .csv file for easy updates.

### Prerequisites ###

Before you begin, ensure you have the following installed:

  - Node.js – JavaScript runtime
  - Git – Version control
  - MongoDB – NoSQL database
  - Installation

Follow these steps to get the project up and running locally:

Clone the repository:

```
git clone <repository_url>
```

Navigate to the project directory:

```
cd <project_directory>
```

Install the dependencies:

```
npm install
```

## Configuration ##
  - Setting up Environment Variables
  - Create a .env file in the root directory with the following content:

  - makefile

```
PORT=8080
MONGO_URI="YourMongoDBuri"
TOKEN_SECRET="JwtSecret"
```

Replace the values of MONGO_URI and TOKEN_SECRET with your MongoDB URI and your secret JWT key, respectively.

Running Locally

Start the server with the following command:

```
npm start
```

- The application will run locally on http://localhost:8080.

Adding Food Items to the Database (Menu)
To add food items to the menu in the MongoDB collection:

Run the following command:

```
npm run menu
```
Update the menu items:


- Edit the items.csv file located in the assets/csv directory to add or modify the food items.
- Built With

  - Node.js – JavaScript runtime environment
  - Express – Web application framework for Node.js
  - MongoDB – NoSQL database
  - Mongoose – Object Data Modeling (ODM) library for MongoDB
  - EJS – Templating engine for rendering HTML


Author
Vrushket Mulye
https://github.com/Vrushi0912/Aaswad
