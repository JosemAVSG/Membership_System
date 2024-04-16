const { Router } = require("express");
const {
    register,
    login,
    logout,
    verifyToken,
    getUsers,
} = require("../Controllers/authController");
const { validateSchema } = require("../Middlewares/validateSchema");
const { registerSchema, loginSchema } = require("../Schemas/authSchema");
const authrequired = require("../Middlewares/authrequired");

const router = Router();

router.post('/login', validateSchema(loginSchema), login);
router.post('/register', validateSchema(registerSchema), register);
router.post('/logout', logout);

router.get('/verify', verifyToken);
router.get('/users', authrequired, getUsers);

module.exports = router
