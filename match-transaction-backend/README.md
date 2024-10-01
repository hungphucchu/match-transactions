### match-transaction-backend

This backend application is developed with Node.js and NestJS and will be accessible at  [http://localhost:3002](http://localhost:3002).

## API Contract
1. An swagger API contains all the apis

```
GET http://localhost:3002/api

```

## Running Instructions
```bash
Follow these steps to run the backend:

Install all required node modules:
npm install

Generate the Prisma Client:
npm run prisma:generate

Create a migration file:
npm run prisma:migrate

Deploy changes to the database:
npm run prisma:migrate:create

Start the backend:
npm run start:backend
```

## Code Formatting
```bash
To format the code, run:
npm run format
```
