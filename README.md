## Shopify Production Engineer Intern - Challenge - Summer 2022

> Additional feature chosen: `Push a button to export product data to a CSV`

## Initial Setup

1. You will need node's package manager(NPM). To install node.js and npm please refer to the npm docs [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

2. Clone this repository.
3. Install dependencies with `npm install`.
4. Setup the database by following the steps under `Creating The DB & Seeding`
5. Run the server using the `npm start` command.
6. Go to <http://localhost:3000/> in your browser and track your inventory!

## Creating The DB

You will need to create a postgres user. You can refer to the postgres docs [here](https://www.postgresql.org/docs/8.0/sql-createuser.html) on creating a user. When a user has been created, or if you already have a postgres user, add the username to your config.env file `DB_HOST=username`.

1. Use the `psql -U username`, where username is your username, command to login to the PostgreSQL server.

2. Create a database with `CREATE DATABASE inventory;`.

3. Create a file called `config.env` in the root directoy of this project. Copy the `config.env.example` file contents to `config.env`. Fill in the necessary PostgreSQL configuration. The `node-postgres` library uses these environment variables by default.

> Below is an example of what the .env file should look like:

```
DB_HOST=localhost
DB_USER=YOURUSERNAME
DB_PASS=YOURPASSWORD (PB_PASS can be removed if you did not setup a password for your postgres user)
DB_NAME=inventory
DB_PORT=5432
```

## Seeding

Note: I added a script you can run to load the schema and seed files for the database! To do so, please follow the steps below :)

1. Reset database: `npm run db:reset`

- You can check the db folder to see what gets created and seeded in the database

2. Run the server: `npm start`

- Note: I used nodemon, so you should not have to restart your server

#### IF THRER WAS AN ERROR WITH THE ABOVE STEPS:

> Run these commands only if `npm run db:reset` failed to execute

1. From the root directory of the project, login to the PostgreSQL server with `psql -U username -d inventory`

> THE COMMANDS BELOW SHOULD BE RUN FROM THE ROOT DIRECTORY OF THIS PROJECT

2. Once logged in to postgreSQL, setup the schema by running
   `\i src/db/schema/schema.sql`
3. Next, seed the data by running `\i src/db/seeds/seeds.sql`

## Run The Server

If the setup was successful, you can start the server with `npm start`

```zsh
npm start
```

## Warnings & Tips

- Use the `npm run db:reset` command each time there is a change to the database schema or seeds.
  - It runs through each of the files, in order, and executes them against the database.
  - Note: you will lose all newly created inventory items each time this is run, since the schema files will tend to `DROP` the tables and recreate them.

## Tech Stack

```
Node.js,
Express,
PostgreSQL,
EJS/CSS
```

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
