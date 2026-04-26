
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
 npm install -g @nestjs/mau
 mau deploy 
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Dependencies

```

 npm i class-validator class-transformer

 npm i dotenv joi

 # Para instalar prisma
 npm i prisma --save-dev

 #Para inicializar prisma
 npx prisma init

 #Para migrar la bbdd de los cambios realizados
 npx prisma migrate dev --name init

 #Instalacion de prisma client
 npm i @prisma/client

 #genera los types de prisma (ejecutar cada vez que se cambia el shema)
 npx prisma generate

#para trabajar con sqllite
npm i @prisma/adapter-better-sqlite3


#install microservices nest
npm i --save @nestjs/microservices


```
