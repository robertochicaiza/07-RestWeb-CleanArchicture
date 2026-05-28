
import express, { Router } from 'express';
import path from 'node:path';


interface Options{
    port: number;
    public_path?: string;
    routes: Router

}


export class Server {

    private app = express();
    private readonly port: number;
    private readonly public_Path: string;
    private readonly routes: Router;

   constructor(options: Options ){
       const {port, public_path = 'public', routes} = options;
         this.port = port;
         this.public_Path = public_path;
         this.routes = routes;
        
   }

    async start() {
      
        ///* Middleware para parsear JSON en las solicitudes entrantes (application/json)
        this.app.use(express.json());   
         //* Middleware para parsear datos de formularios (x-www-form-urlencoded    )
        this.app.use(express.urlencoded({ extended: true }));
        //* Middleware para servir archivos estáticos desde la carpeta "public"
        this.app.use(express.static(this.public_Path));
        
        
        //Routes
        this.app.use(this.routes);

        // this.app.get(/.*/, (req, res) => {
        //     console.log('Received request:', req.method, req.url);
        //     res.send('Hello, World!');
        // });

        // Ruta comodín para manejar todas las solicitudes no coincidentes
        // this.app.get("/*splat", (req, res) => {
        //     console.log('Received request:', req.method, req.url);
        //     res.send('Hello, World!');
        // });

        

        this.app.get("/*splat", (req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.public_Path}/index.html`);
            console.log('Received request:', req.method, req.url);
            res.sendFile(indexPath);
            return;
        });




        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${3000}`);
        });


    }


}