import { RequestHandler } from "express";

// Fc para exibir todas as principais informaçoes que forem passadas nas rotas.
export const requestIntercepter: RequestHandler = (req, res, next) => {
    console.log(`➡ ${req.statusCode} ${req.method} ${req.originalUrl} ${JSON.stringify(req.body)} /`)
    next();
}