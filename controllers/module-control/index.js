import { express } from "../../global_class/application.js";
import { Router } from "express";
let routes = Router();
import { onForce, onUpdate, onSeed, onDrop } from "../../code-tools/dbo-migrate.js";

routes.get('/force', (req, res) => {
    onForce();
    res.send("successfully!");
});

routes.get('/update', (req, res) => {
    onUpdate();
    res.send("successfully!");
});

routes.get('/seed', (req, res) => {
    onSeed();
    res.send("successfully!");
});

routes.get('/drop', (req, res) => {
    onDrop();
    res.send("successfully!");
});

express.use('/module-control', routes);