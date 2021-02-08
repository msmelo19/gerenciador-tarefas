import Users from '../models/UsersModel';

class UserController {
  async create(req, res) {
    try {
      const newUser = await Users.create(req.body);
      const { id, name, email } = newUser;
      return res.json({
        id,
        name,
        email,
      });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((error) => error.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Missing id'],
        });
      }

      const user = await Users.findByPk(id);
      if (!user) {
        return res.status(400).json({
          errors: ['User not found'],
        });
      }

      const { name, email } = await user.update(req.body);

      return res.json({ name, email });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((error) => error.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Missing id'],
        });
      }

      const user = await Users.findByPk(id);

      if (!user) {
        return res.status(400).json({
          errors: ['User not found'],
        });
      }

      const { name, email } = await user.destroy();

      return res.json({
        name,
        email,
        deleted: true,
      });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((error) => error.message),
      });
    }
  }
}

export default new UserController();
