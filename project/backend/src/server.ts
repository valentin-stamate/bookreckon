import express = require("express");
import {config} from "dotenv";
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import {Middleware} from "./middleware/middleware";
import { UserController } from "./controller/user.controller";
import { BookController } from "./controller/book.controller";
import {populateDatabase} from "./service/dataset.service";
import {RecommendationController} from "./controller/recommendation.controller";

config();
const env = process.env;

const app = express();
const port = env.PORT || 8090;
const host = `http://localhost:${port}`

// populateDatabase()
//     .then(() => {
//         console.log("Database populated successfully");
//     })
//     .catch((err) => {
//         console.log("Error populating database");
//         console.log(err);
//     });

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

app.post('/api/user/login', Middleware.visitorMiddleware, UserController.loginUser);
app.post('/api/user/signup', Middleware.visitorMiddleware, UserController.signupUser);
app.put('/api/user/edit-preference', Middleware.userMiddleware, UserController.editUserPreference);
app.get('/api/user/recommendations', Middleware.userMiddleware, RecommendationController.getRecommendations);
app.post('/api/user/base-recommendations', RecommendationController.getBaseRecommendation);
app.post('/api/user/book-recommendations', Middleware.userMiddleware, RecommendationController.getBooksRecommendationBasedOnBook);
app.get(`/api/user/info`, Middleware.userMiddleware, UserController.getUserInfo);
app.get('/api/book/:bookId', Middleware.userMiddleware, BookController.getBook);

/************************************************************************************
 *                               Express Error Handling
 ***********************************************************************************/
app.use(Middleware.errorHandler);

app.listen(port, () => {
    console.log(`Server started at ${host}`);
});