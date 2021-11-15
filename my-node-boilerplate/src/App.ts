import express, { Router} from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import session from "express-session";
import os from "os";
import cluster from "cluster";
import { Controller } from "./common/interfaces/controller";
import {csrf, verifyJsonWebToken, errMiddleware} from './middleware/index';

type appType = {
  controllers: Controller[];
  port: number;
  dev: "dev" | "build";
}

class App {
  private readonly app: express.Application;
  private readonly port: number;
  private readonly dev: "dev" | "build";
  private readonly cpuNum: number;
    
  constructor({controllers, port, dev} : appType) {
    this.app = express();
    this.port = port;
    this.dev = dev;
    this.cpuNum = os.cpus().length;

    this.initMiddleware();
    this.initContoller(controllers);
    this.initErrorHandling();
  };

  getServer(){
    return this.app;
  };

  initMiddleware(){
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser("leedonggyu"));
    this.app.use(session({
      saveUninitialized: true,
      resave: false,
      secret: "leedonggyu",
    }));
    this.app.use(csrf());
    this.app.use(verifyJsonWebToken());
  };

  initErrorHandling = () => {
   this.app.use(errMiddleware)
  };

  initContoller(controllers : Controller[]){
    const router = Router();
    router.get('/', (req, res) => res.send("hello world"));

    controllers.forEach(function(controller : Controller){
      router.use(controller.router);
    });
    
    this.app.use('/api', router);
  };
  
  // cluster mode
  async listen(){
    try {
      if (this.dev === "build" && cluster.isMaster) {
        for (let i = 0; i < this.cpuNum; i++){
          cluster.fork();
        }
      } else {
        this.app.listen(this.port, function(){
          console.log(`pid : ${process.pid}\nmode: ${this.dev}\n${this.port} is connected`);
        }).on("error", err => {
          process.exit(1);
        });
  
        cluster.on('exit', function(worker, code, signal){
          cluster.fork();
        });
      }
    } catch (e) {
      console.error(e);
    }    
  };

};

export default App;