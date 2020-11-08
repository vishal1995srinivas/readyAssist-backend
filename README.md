# Ready- Assist Backend API 

## Installation
 
1. Clone the Backend
```sh
git clone https://github.com/vishal1995srinivas/readyAssist-backend.git
```
2. Install NPM packages
```sh
npm install
```
2. Install Mongo and start the Mongo server
```sh
mongod --dbpath ./mongodb --port 27018 && mongo
```
3. Start the server
```sh
nodemon server.js
```
4. Install NPM packages inside client
```sh
cd client && npm install
```
5. Start the client
```sh
npm start
```


## API Calls 
### GET - Retrieve the data
- /v1/users - Get the first 10 users data.
- /v1/users/:id - Get the specific user data of given id.
- /v1/users/?skip=n - Get the user data after skipping n number of users. Data limit is set by default to 10.
### POST - Add Data
- /v1/users/register - Add an user to the db.
Body Data
```
{
	"username": "112333vishal",
	"firstName": "vishal",
	"lastName": "srinivas"
}
```
### PUT - Update the data
- /v1/users/update - Update the user data
Body Data
```
{
"id": "5fa4fa1e6b029617052aacb4",
"firstName": "vishal1234",
"lastName": "last123"
}
```
### DELETE - Delete the data
- /v1/users/ - Delete the specific user data.(Soft Delete by marking isActive to false)
```
{
	"id": "5fa4fa1e6b029617052aacb4"
}
```

## Frontend
Link - https://github.com/vishal1995srinivas/readyAssist


