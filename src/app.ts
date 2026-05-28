import { envs } from "./config/envs";
import { AppRoutes } from "./presetentation/routes";
import { Server } from "./presetentation/server";



(async() => {
    main();
})();


function main() {
    
    envs; //cargar variables de entorno

    const server = new Server(
        { 
            port: envs.PORT, 
            public_path: envs.PUBLIC_PATH ,
            routes: AppRoutes.routes
        });
    server.start();
}
