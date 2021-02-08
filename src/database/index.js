import Sequelize from 'sequelize';
import databaseconfig from '../config/database';

import Users from '../models/UsersModel';
import Tasks from '../models/TasksModel';

const models = [Users, Tasks];
const connection = new Sequelize(databaseconfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
