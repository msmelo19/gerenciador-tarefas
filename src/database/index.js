import Sequelize from 'sequelize';
import databaseconfig from '../config/database';

import Users from '../models/UsersModel';

const models = [Users];
const connection = new Sequelize(databaseconfig);

models.forEach((model) => model.init(connection));
