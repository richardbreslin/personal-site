import http from "http"
import path from "path"
import express from "express"

require("dotenv").config();

let PORT: number;

switch (process.env.NODE_ENV) {
    case "dev":
        PORT = Number(process.env.DEV_PORT);
        console.log("Running in Development Mode...")
        break;
    case "prod":
        PORT = Number(process.env.PROD_PORT);
        console.log("Running in Production Mode...")
        break;
}

class App {
    private server: http.Server
    private PORT: number

    constructor(PORT: number) {
        this.PORT = PORT
        const app = express()
        app.use(express.static(path.join(__dirname, '../client')))

        //serve three.js modules
        app.use('/build/three.module.js', express.static(path.join(__dirname, '../../node_modules/three/build/three.module.js')))
        app.use('/jsm/controls/OrbitControls', express.static(path.join(__dirname, '../../node_modules/three/examples/jsm/controls/OrbitControls.js')))
        app.use('/jsm/libs/stats.module', express.static(path.join(__dirname, '../../node_modules/three/examples/jsm/libs/stats.module.js')))
        app.use('/jsm/loaders/GLTFLoader', express.static(path.join(__dirname, '../../node_modules/three/examples/jsm/loaders/GLTFLoader.js')))


        this.server = new http.Server(app);
    }

    public Start() {
        this.server.listen(this.PORT, () => {
            console.log(`Server listening on PORT ${this.PORT}.`)
        })
    }
}
new App(PORT).Start()
