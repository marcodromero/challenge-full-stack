const express = require("express");
const app = express();

app.post("/test", (req, res) => {
    console.log("Connected to React");
    res.redirect("/");
});

const PORT = process.eventNames.PORT || 8080;

app.listen(PORT , console.log(`Server started on port ${PORT}`));
