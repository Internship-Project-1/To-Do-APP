# To-Do-APP
University of Windsor- COMP 8967-Internship/Project I - Assignment 2

The back-end for Todo-App. Providing endpoints for Add, Update, and Delete Task.

## Installation

The package can be installed via [npm](https://github.com/npm/cli):

```
npm install
```

## Local Development

The `branch-dev` branch contains the latest version of the NodeJs Rest APIs.

To begin local development:

1. `npm install`
2. `npm start`
3. If `npm start` if not working, use `node app.js` 

The last step starts the server on http://localhost:3000.

## API Documentation
### I can add a new task
```
curl --location --request POST 'http://localhost:3000/api/todo/create' \
--header 'Content-Type: application/json' \
--data-raw '{
    "task": "task 1",
    "isCompleted": false,
    "userId": "userId"
}'
```
### view all todos for a user
```
curl --location --request GET 'http://localhost:3000/api/todo/view/:userId' \
--header 'Authorization: Bearer AuthToken' \
--header 'Content-Type: application/json' \
```
### I can complete a task(update a todo with a specific id)
```
curl --location --request PUT 'http://localhost:3000/api/todo/update/:taskId' \
--header 'Authorization: Bearer AuthToken' \
--header 'Content-Type: application/json' \
--data-raw '{
    "isCompleted": true,
}'
```

### I can remove all tasks under the Completed tab
```
curl --location --request DELETE 'http://localhost:3000/api/todo/delete/:userId' \
--header 'Authorization: Bearer AuthToken' \
--header 'Content-Type: application/json' \
```
### I can remove one task under the Completed tab
```
curl --location --request DELETE 'http://localhost:3000/api/todo/deleteTask/:taskId' \
--header 'Authorization: Bearer AuthToken' \
--header 'Content-Type: application/json' \
```


### user related curls(Assignment 1)
```
curl --location --request POST 'http://localhost:3000/api/user/create' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "Akshaya",
    "lastName": "Muthuraman",
    "email": "akshayaram004@gmail.com",
    "phone": "4168930925",
    "password": "Akshaya520",
    "signInType: "google",
    "imageUrl": "url"
}'
```


```
curl --location --request POST 'http://localhost:3000/api/user/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "jiten@uwindsor.ca",
    "password": "123456"
}'
```

```
curl --location --request GET 'http://localhost:3000/api/user/' \
--header 'Authorization: Bearer AuthToken' \
--header 'Content-Type: application/json' \
```

```
curl --location --request GET 'http://localhost:3000/api/user/view/:email' \
--header 'Authorization: Bearer AuthToken' \
--header 'Content-Type: application/json' \
```

```
curl --location --request PUT 'http://localhost:3000/api/user/update/:email' \
--header 'Authorization: Bearer AuthToken' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "Jiten",
    "lastName": "Dhimmar",
    "email": "jiten@uwindsor.ca",
    "phone": "4168930925",
    "signInType: "google",
    "imageUrl": "url"
}'
```

```
curl --location --request DELETE 'http://localhost:3000/api/user/update/:email' \
--header 'Authorization: Bearer AuthToken' \
--header 'Content-Type: application/json' \
```
