const DbConnect = require("./src/dbConfig");
const app = require("./src/server");
const PORT = process.env.PORT || 3000;

DbConnect();
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
