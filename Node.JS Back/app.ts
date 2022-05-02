
import { logger } from './log';
import { Routes } from './src/objects/interfaces';
import errorMiddleware from './src/middleware/error.middleware'

const express = require('express');
const fs = require('fs');
const spdy = require("spdy");
const compression = require('compression');
const cors = require('cors');
import DB from './src/models/database'
import { User } from './src/models/user.model';

class App {
    public app;
    public server;
    public port: string | number;
    public isProd: boolean;
  
    constructor(routes: Routes[]) {
      this.app = express();
      this.port = process.env.PORT;
      this.isProd = process.env.PROD == "true"; // dev or prod
  
      this.connectToDatabase();
      this.initializeMiddlewares();
      this.initializeRoutes(routes);
      this.initializeErrorHandling();

    }
  
    public start() {

        if(this.isProd == false) {

            this.server = require('http').createServer(this.app).listen(this.port, err => {
                if (err) { throw new Error(err) }
            });

        } else {
            
            const credentials = {
                key: fs.readFileSync('file.pem', 'utf8'),
                cert: fs.readFileSync('filem', 'utf8'),
                ca: fs.readFileSync('fileem', 'utf8')
            };
            
            this.server = spdy.createServer(credentials, this.app).listen(this.port, err => {
                if (err) { throw new Error(err) }
            });

        }

        logger.info(`=================================`);
        logger.info(`======= ENV: ${this.isProd ? 'PRODUCTION' : 'DEV'} =======`);
        logger.info(`🚀 App listening on the port ${this.port}`);
        logger.info(`=================================`);
        
    }
  
    private connectToDatabase() {
      // DB.sequelize.sync({ force: true }); FOR RESET
      DB.sequelize.sync()
    }
  
    //TODO Change config name
    private initializeMiddlewares() {
      this.app
        .use(express.json())
        .use(compression()) 
        .use(cors())
        .use(express.urlencoded({ extended: true }));
    }
  
    private initializeRoutes(routes: Routes[]) {
      routes.forEach(route => {
        this.app.use('/api/', route.router);
      });
    }
  
    private initializeErrorHandling() {
      this.app.use(errorMiddleware);
    }
}
  
export default App;
  