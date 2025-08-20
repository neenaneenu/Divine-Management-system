import { userCollection } from "../models/user.models.mjs";
import env from 'dotenv'
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'

env.config()

 const signup = async (req, res) => {
    try {
        const { body } = req
        console.log(body)
        body.password = await bcrypt.hash(body.password, 10);
        const response = await userCollection.create(body)
        if (!response?._id) {
            return res.status(400).send({
                message: "Bad Request"
            })
        }
        response.password = null
        const token = jwt.sign({sub: response}, process.env.JWT_KEY, {expiresIn: "7d"})
        return res.status(201).send({
            message: "user created",
            user: response,
            token
        })
    } catch (err) {
        console.log(err.message)
        return res.status(500).send({
            message: err.message || "Internal server error"
        })
    }
}


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;   // ✅ comes from frontend body

    const user = await userCollection.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};


export default { signup, login };
