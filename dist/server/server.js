"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
require("dotenv").config();
let PORT;
switch (process.env.NODE_ENV) {
    case "dev":
        PORT = Number(process.env.DEV_PORT);
        console.log("Running in Development Mode...");
        break;
    case "prod":
        PORT = Number(process.env.PROD_PORT);
        console.log("Running in Production Mode...");
        break;
}
class App {
    constructor(PORT) {
        this.PORT = PORT;
        const app = express_1.default();
        app.use(express_1.default.static(path_1.default.join(__dirname, '../client')));
        //serve three.js modules
        app.use('/build/three.module.js', express_1.default.static(path_1.default.join(__dirname, '../../node_modules/three/build/three.module.js')));
        app.use('/jsm/controls/OrbitControls', express_1.default.static(path_1.default.join(__dirname, '../../node_modules/three/examples/jsm/controls/OrbitControls.js')));
        app.use('/jsm/libs/stats.module', express_1.default.static(path_1.default.join(__dirname, '../../node_modules/three/examples/jsm/libs/stats.module.js')));
        app.use('/jsm/loaders/GLTFLoader', express_1.default.static(path_1.default.join(__dirname, '../../node_modules/three/examples/jsm/loaders/GLTFLoader.js')));
        this.server = new http_1.default.Server(app);
    }
    Start() {
        this.server.listen(this.PORT, () => {
            console.log(`Server listening on PORT ${this.PORT}.`);
        });
    }
}
new App(PORT).Start();
//# sourceMappingURL=server.js.map