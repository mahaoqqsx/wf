import express from "express";
import path from "path";

const webuiRouter = express.Router();
const rootDir = path.join(__dirname, "../..");

// Redirect / to /webui/
webuiRouter.get("/", (_req, res) => {
    res.redirect("/webui/");
});

// Redirect /webui to /webui/
webuiRouter.use("/webui", (req, res, next) => {
    if (req.originalUrl === "/") {
        return res.redirect("/webui/");
    }
    next();
});

// Serve virtual routes
webuiRouter.get("/webui/inventory", (_req, res) => {
    res.sendFile(path.join(rootDir, "static/webui/index.html"));
});

// Serve static files
webuiRouter.use("/webui", express.static(path.join(rootDir, "static/webui")));

export { webuiRouter };
