const { Router } = require("express");
const {
    register,
    login,
    logout,
    verifyToken,
    getClients,
    createClients,
    updateClients,
    updateClientsStatus,
} = require("../Controllers/authController");
const { validateSchema } = require("../Middlewares/validateSchema");
const { registerSchema, loginSchema } = require("../Schemas/authSchema");
const authrequired = require("../Middlewares/authrequired");
const  clientsSchema  = require("../Schemas/userSchema");
const router = Router();

router.post('/login', validateSchema(loginSchema), login);
router.post('/register', validateSchema(registerSchema), register);
router.post('/logout', logout);

router.get('/verify', verifyToken);

router.get('/clients',authrequired, getClients);
router.post('/clients', authrequired,validateSchema(clientsSchema) , createClients);
router.put('/clients/:id', authrequired, updateClients);
router.put('/clients/status/:id', authrequired, updateClientsStatus);

module.exports = router
