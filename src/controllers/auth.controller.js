import { User } from "../models/User.js";
import { Imagen } from "../models/imagenes.js";
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
    const { token, expiresRe } = generateToken(user.id);
    generateRefreshToken(user.id, res);

    return res.json({ token, expiresRe });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const infoUser = async (req, res) => {
  try {
    const user = await User.findById(req.uid).lean();
    return res.json({ email: user.email, uid: user.id });
  } catch (error) {
    return res.status(500).json({ error: "error de server" });
  }
};

export const refreshToken = (req, res) => {
  try {
    const { token, expiresIn } = generateToken(req.uid);
    return res.json({ token, expiresIn });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error de server" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ ok: true });
};

//FIXME: guardar imagen PENDIETER
/* export const upload = async (req, res) => {
  try {
    const imagen = req.body;
    const imageBuffer = Buffer.from(imagen.data, "base64");
    Imagen.create({
      name: imagen.name,
      type: imagen.type,
      data: imageBuffer,
    });
    Imagen.save();
    res
      .status(201)
      .json({ success: true, message: "Image uploaded successfully" });
  } catch (error) {
    res.status(409).json({ success: false, message: "Unable to upload image" });
  }
}; */
