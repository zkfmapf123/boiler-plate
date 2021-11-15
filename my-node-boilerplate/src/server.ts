import { UserController } from "./api/users/user.controller";
import { UserServiceBuilder } from "./api/users/user.service";
import App from "./App";
import config from "./config";

(async() => {
  const app = new App({
    controllers: [
      new UserController()
    ],
    port: +config.port,
    dev: config.dev as "dev" | "build"
  });

  await app.listen();
})();