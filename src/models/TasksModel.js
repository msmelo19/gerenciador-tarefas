import Sequelize from 'sequelize';

export default class Tasks extends Sequelize.Model {
  static init(sequelize) {
    super.init({
      title: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Titulo deve ter entre 3 e 255 caracteres',
          },
        },
      },

      description: {
        type: Sequelize.DataTypes.TEXT,
        defaultValue: '',
      },

      priority: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 0,
      },

      start_date: {
        type: Sequelize.DataTypes.DATE,
        validate: {
          notEmpty: {
            msg: 'Campo \'start_date\' nao deve ser vazio',
          },
        },
      },

      final_date: {
        type: Sequelize.DataTypes.DATE,
        validate: {
          notEmpty: {
            msg: 'Campo \'final_date\' nao deve ser vazio',
          },
        },
      },
    }, { sequelize });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Users, { foreignKey: 'user_id' });
  }
}
