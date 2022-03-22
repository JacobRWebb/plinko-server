import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import { json, Router, urlencoded } from "express";
import helmet from "helmet";

export const applyDefaultMiddleware = (app: Router) => {
  corsMiddleware(app);
  helmetMiddleware(app);
  cookieMiddleware(app);
  bodyMiddleware(app);
  compressionMiddleware(app);
};

const corsMiddleware = (app: Router) => {
  app.use(
    cors({
      credentials: true,
      methods: ["GET", "POST"],
      origin: "http://localhost:3000",
      allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    })
  );
};

const cookieMiddleware = (app: Router) => app.use(cookieParser());

const bodyMiddleware = (app: Router) => {
  app.use(json());
  app.use(urlencoded({ extended: true }));
};

const compressionMiddleware = (app: Router) => app.use(compression());

const helmetMiddleware = (app: Router) => app.use(helmet());
