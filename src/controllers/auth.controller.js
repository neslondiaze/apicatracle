import { User } from "../models/User.js";
import messages from "../helpers/messages.js";
import serverResponse from "../helpers/responses.js";

export const register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const user = new User({ email, password, username });
    await user.save();

    //jwt roken
    //return res.json({ ok: true });
    serverResponse.sendSuccess(res, messages.SUCCESSFUL, user);
  } catch (error) {
    console.log(error);
  }
};

export const login = (req, res) => {
  res.json({ ok: "login" });
};
