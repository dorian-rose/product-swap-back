# product-swap-back

## Run project:

- clone this repository from github
- in terminal, navigate to local repository folder
- run "npm install" to install all dependencies (see note below)
- configure environment variables: environment variables used in this project can be found in .env.template file
- to run project in development, use command "npm run dev"
- or: to start, use command "npm start"

Using different versions of dependencies may cause conflicts. Versions used here are:

- "axios": "^1.4.0",
- "cors": "^2.8.5",
- "dotenv": "^16.0.3",
- "express": "^4.18.2",
- "express-validator": "^7.0.1",
- "jsdoc": "^4.0.2",
- "multer": "^1.4.5-lts.1",
- "nodemailer": "^6.9.1",
- "path": "^0.12.7",
- "pg": "^8.10.0"

## API

Endpoints and documentation for APIs created in this project can be found here: https://documenter.getpostman.com/view/26092520/2s93eYTXQi

## Database

- The database for this project has been created with Postgres Elephant. Tables in use and associated commands can be found in >models >queries.sql

The following diagram also demonstrates the SQL tables used in this project and the reationship between each:

<img src="src/assets/relation-diagram.png" alt="relational diagram for sql database" style="display: block; margin: 0 auto"/>

## Code documentation

- Code has been documented using JS Docs. Documentation can be found at: https://dorian-rose.github.io/product-swap-back/index.html

## Other

- Open source code for front end can be found at: https://github.com/dorian-rose/product-swap-front
- Deployed project can be found at: https://645913add10ca200b745a042--sprightly-liger-93a8e3.netlify.app/api/user
