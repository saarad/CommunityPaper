// @flow

import express from 'express';
import path from 'path';
import reload from 'reload';
import fs from 'fs';

const public_path = path.join(__dirname, '/../../client/public');

let app = express();

app.use(express.static(public_path));
app.use(express.json()); // Parses json, multi-part (file), url-encoded

// Only use in development:
if (!process.env.NODE_ENV || process.env.NODE_ENV == 'development') {
  let reloadServer = reload(app);
  fs.watch(public_path, () => reloadServer.reload());
}

app.listen(3000, () => console.log('Server started'));
