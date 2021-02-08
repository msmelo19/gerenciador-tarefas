import Sequelize from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class Users extends Sequelize.Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Nome precisa ter entre 3 e 255 caracteres',
          },
        },
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: '',
        unique: {
          msg: 'E-mail já existe',
        },
        validate: {
          isEmail: {
            msg: 'E-mail inválido',
          },
        },
      },
      password_hash: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.DataTypes.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 25],
            msg: 'Senha deve ter entre 6 e 25 caracteres',
          },
        },
      },

    }, { sequelize });

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.hasMany(models.Tasks, { foreignKey: 'user_id' });
  }

  isPasswordValid(pass) {
    return bcryptjs.compare(pass, this.password_hash);
  }
}
