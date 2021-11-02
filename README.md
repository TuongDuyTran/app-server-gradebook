## Table of contents

- [Setup](#setup)
- [Migration](#migration)

## Setup

To run this project, install it locally using npm:

```
$ npm install
$ npm run dev
```

## Migration

#### Code Examples

Create model: `npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string` <br />
Running migration: `npx sequelize-cli db:migrate` <br />
Create seed: `npx sequelize-cli seed:generate --name demo-user` <br />
Config first seed:

```
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'example@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) =>
    return queryInterface.bulkDelete('Users', null, {});
  }
};
```

Running seed: `npx sequelize-cli db:seed:all`

#### Note

Change extension in migrations folder from .js to .cjs
