const express = require("express");
const app = express();

// PORT
const PORT = 5000;

// enable json parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

startServer = async () => {
    app.listen(PORT, () => {
        console.log(`Server is live on http://localhost:${PORT}`);
    });
};

startServer();
