// @flow

import express from 'express';
import path from 'path';
import reload from 'reload';
import fs from 'fs';
import {SakDao} from "./sakdao";
import * as mysql from "mysql";
type Request = express$Request;
type Response = express$Response;

const public_path = path.join(__dirname, '/../../client/public');


let pool = mysql.createPool({
    connectionLimit: 5,
    host: "mysql.stud.iie.ntnu.no",
    user: "iliar",
    password: "EqeQraxo",
    database: "iliar",
    debug: false
});


let app = express();
let sakDao = new SakDao(pool);

app.use(express.static(public_path));
app.use(express.json()); // For parsing application/json

app.get('/allCases', (req: Request, res: Response) => {
    sakDao.getAllNews((status,data) => {
        res.status(status);
        res.json(data);
    });
});


app.get('/importantCases', (req: Request,res:Response) => {
   sakDao.getImportantNews((status,data) => {
      res.status(status);
      res.json(data);
   });
});

app.get('/importantCases/:overskrift', (req: Request, res: Response) => {
    sakDao.getContextForNews(req.params.overskrift, (status,data) => {
       res.status(status);
       res.json(data);
    });
});

app.get('/allCategories', (req: Request, res: Response) => {
    sakDao.getAllCategories((status,data) => {
        res.status(status);
        res.json(data);
    });
});

app.get('/category/:kategori',(req: Request, res: Response) => {
    sakDao.getCategoryNews(req.params.kategori,(status,data) => {
        res.status(status);
        res.json(data);
    });
});

app.post('/addCases', (req: Request, res: Response) => {
    sakDao.createNews(req.body, (status, data) =>{
       res.status(status);
       res.json(data);
    });
});

app.put('/editCases', (req: Request, res: Response) =>{
    sakDao.editNews(req.body,(status, data) => {
       res.status(status);
       res.json(data);
    });
});

app.put('/deleteCases', (req: Request, res: Response) => {
    sakDao.deleteNews(req.body, (status,data) => {
       res.status(status);
       res.json(data);
    });
});

app.get('/getKey', (req: Request, res: Response) => {
   sakDao.getKey((status,data) => {
      res.status(status);
      res.json(data);
   });
});

app.get('/getComments/:overskrift', (req: Request, res: Response) => {
    sakDao.getComments(req.params.overskrift,(status,data) => {
       res.status(status);
       res.json(data);
    });
});

app.post('/postComments/:id', (req: Request, res:
    Response) => {
    sakDao.postComments(req.params.id, req.body,(status,data) => {
       res.status(status);
       res.json(data);
    });
});

// Hot reload application when not in production environment
if (process.env.NODE_ENV !== 'production') {
  let reloadServer = reload(app);
  fs.watch(public_path, () => reloadServer.reload());
}

// The listen promise can be used to wait for the web server to start (for instance in your tests)
export let listen = new Promise<void>((resolve, reject) => {
  app.listen(3000, error => {
    if (error) reject(error.message);
    console.log('Server started');
    resolve();
  });
});
