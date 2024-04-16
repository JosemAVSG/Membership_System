const jwt = require("jsonwebtoken");
const TOKEN_SECRET = process.env.TOKEN_SECRET;


const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters" });
  }

  try {
    const user = await db("users").where({ email }).first();
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }
    const newUser = {
      name,
      email,
      password,

    };

    const insertedUser = await db("users").insert(newUser, "*");
    const token = jwt.sign({ id: insertedUser[0].id }, TOKEN_SECRET, {
      expiresIn: "24h",
    });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
