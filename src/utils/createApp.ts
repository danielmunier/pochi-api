import express, { Express } from "express";
import routes from "../routes";
import cors from 'cors';
import session from "express-session";
import passport from "passport";
import '../database';
import store from 'connect-mongo';
import '../strategies/discord'; 
import {config} from "dotenv"
config()

export function createApp(): Express {
    const app = express();

    // CORS
    // app.use(cors({
    //     origin: ["http://localhost:1500, http://localhost:3000"],
    //     credentials: true
    // }));
    app.use(cors({
        origin: "https://pochi-dashboard.vercel.app/menu",
        credentials: true
    }))

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // SESSION
    app.use(session({
        secret: process.env.SESSION_SECRET || "",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            secure: true,
            httpOnly: true,
            sameSite: 'none', 
            domain: 'pochi-dashboard.vercel.app',
        },
        store: store.create({
            mongoUrl: process.env.MONGO_URI
        })
    }));
    // app.use((req, res, next) => setTimeout(() => next(), 1000))
    
    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/api', routes);

    return app;
}
