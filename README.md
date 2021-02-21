
## Prerequisites

Before you begin, ensure you have met the following requirements:
* You have installed `Node`
* You have a database `Mysql`

## Starting the app

Provide the following to `variables.env`

>DB_DATABASE='database_name'
>DB_USERNAME='root'
>DB_HOST='localhost'
>DB_PASSWORD='password'
>DB_PORT=3306


To start `backend`
* First cd to /backend directory and run the commands below
```
npm run migrate
```
```
npm run db:seed
```

```
npm run start
```

To start `frontend`
* First cd to /frontend directory and run the command below
```
npm start
```

App should be running on `http://localhost:3000`


## Test password reset
* First request for a reset from the frontend
* Grab the resetToken from the database
* Replace `${resetToken}` with the token from your database `http://localhost:3000/reset?resetToken=${resetToken}`
* PS: I wanted to use mailtrap but i won't be able to share my access tokens

# Thanks

