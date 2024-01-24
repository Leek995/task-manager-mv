const {tasks} = require('./seedData.js');
const {sequelize} = require('./db');
const { Task} = require('./models');

const seed = async () => {

  try {
    // drop and recreate tables per model definitions
    await sequelize.sync({ force: true });

    // insert data
    await Promise.all(tasks.map(task => Task.create(task)));


    console.log("db populated!");
  } catch (error) {
    console.error(error);
  }
}

seed();
