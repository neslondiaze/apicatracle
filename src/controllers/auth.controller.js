import { User } from "../models/User.js";
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";

export const register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    // Alternativa buscar por email
    let user = await User.findOne({ email });
    if (user) throw { code: 11000 };

    user = new User({ email, password, username });
    await user.save();

    //Generar el token JWT
    const { token, expiresIn } = generateToken(user._id);
    generateRefreshToken(user._id, res);

    return res.json({ token, expiresIn });
  } catch (error) {
    if (error.code === 11000) {
      // Alternattiva por defecto mongoose
      return res.status(400).json({ error: "Ya existe este usuario" });
    }
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const login = (req, res) => {
  const { email, password, username } = req.body;

  try {
    return res.json({ ok: "login" });
  } catch (error) {}
};
