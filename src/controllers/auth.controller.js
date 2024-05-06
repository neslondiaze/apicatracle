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

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) return res.status(403).json({ error: "No existe este usuario" });

    const respuestaPassword = await user.comparePassword(password);
    if (!respuestaPassword)
      return res.status(403).json({ error: "Contraseña incorrecta" });

    // Generar el token JWT
    const { token, expiresIn } = generateToken(user.id);
    generateRefreshToken(user.id, res);

    return res.json({ token, expiresIn });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const infoUser = async (req, res) => {
  res.json({ user: "correo@correo.com" });
};
