import express from "express";
import cors from "cors";

import router  from './src/routes/index.js'
import { server } from "./src/config/db.js";

const app = express();
app.use(cors());
app.use(express.json());


server.connect((err)=>{
    if(err) return err;
    console.log('connected')
})
// Admin login API
app.use('/api',router);

// Start the server
app.listen(8081, () => {
    console.log('Server listening on port 8081...');
});
