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

app.get('/students', (req: Request, res: Response) => {
      console.log('student loading');
      sakDao.getImportantNews((status,data)=>{
          res.status(status);
          res.json(data);
          console.log(data[0].overskrift);
      });
});

app.get('/importantCases', (req: Request,res:Response) => {
   console.log('Homepage loading');
   sakDao.getImportantNews((status,data) => {
      res.status(status);
      res.json(data);
      data.map(e => console.log(e));
   });
});

app.get('/importantCases/:caseTitle', (req: Request, res: Response) => {
    console.log('Case with id ' + req.params.title + ' loading');
    sakDao.getContextForNews(req.params.title, (status,data) => {
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
