import Application from "./global_class/application.js";
Promise.all([
    Application.useController('../controllers/module-control/index.js'),
    Application.useController('../controllers/classroom/index.js')
]).then(() => Application.start());
