import express = require("express");
import {config} from "dotenv";
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import {Middleware} from "./middleware/middleware";
import {initModels} from "./database/models";
import {DemoController} from "./controller/demo.controller";
import { UserController } from "./controller/user.controller";
import { BookController } from "./controller/book.controller";

config();
const env = process.env;

const app = express();
const port = env.PORT || 8080;
const host = `http://localhost:${port}`

initModels()
    .then(() => {
        console.log('Database connection successfully initialized');
    })
    .catch(err => {
        console.log(err);
    });

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

app.get('/', DemoController.demoControllerMethod);
app.get('/user/:userId', UserController.getUser);
app.post('/user', UserController.addUser);
app.patch('/user/:userId', UserController.editUser)
app.delete('/user/:userId', UserController.deleteUser)

app.get('/book/:bookId', BookController.getBook);
app.post('/book', BookController.addBook);
app.patch('/book/:bookId', BookController.editBook)
app.delete('/book/:bookId', BookController.deleteBook)

/************************************************************************************
 *                               Express Error Handling
 ***********************************************************************************/
app.use(Middleware.errorHandler);

app.listen(port, () => {
    console.log(`Server started at ${host}`);
});