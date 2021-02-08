import jwt from 'jsonwebtoken';
import User from '../models/UsersModel';

class LoginController {
  async store(req, res) {
    try {
      const { email = '', password = '' } = req.body;
      if (!email || !password) return res.status(400).json({ errors: ['Missing email/password'] });

      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(400).json({ errors: ['User not found'] });
      if (!(await user.isPasswordValid(password))) {
        return res.status(400).json({ errors: ['Password invalid'] });
      }

      const { id } = user;

      const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      return res.json({ token });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((error) => error.message),
      });
    }
  }
}

export default new LoginController();
