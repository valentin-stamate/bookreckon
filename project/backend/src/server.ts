import express = require("express");
import {config} from "dotenv";
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import {Middleware} from "./middleware/middleware";

config();
const env = process.env;

const app = express();
const port = env.PORT || 8080;
const host = `http://localhost:${port}`

/************************************************************************************
 *                              Basic Express Middlewares
 ***********************************************************************************/

app.set('json spaces', 4);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Handle logs in console during development
app.use(morgan('dev'));
app.use(cors({origin: '*'}));

// Handle security and origin in production
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

/************************************************************************************
 *                               Register all REST routes
 ***********************************************************************************/

app.get('/', (req, res) => {
    res.end('Hello word!')
});

/************************************************************************************
 *                               Express Error Handling
 ***********************************************************************************/
app.use(Middleware.errorHandler);

app.listen(port, () => {
    console.log(`Server started at ${host}`);
});