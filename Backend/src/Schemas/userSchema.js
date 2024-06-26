const zod = require("zod");

const clientSchema = zod.object({
    name: zod.string().min(2),
    email: zod.string().email(),
    password: zod.string().min(6),
    fechaRegistro: zod.date(),
    estado: zod.boolean(),
});

module.exports = clientSchema;