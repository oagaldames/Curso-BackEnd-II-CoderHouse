import express from "express";
import routes from "./routes/index.js";
import __dirname from "./dirname.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import viewsRoutes from "./routes/views.routes.js";
import { connectMongoDB } from "./config/mongoDB.config.js";
import session from "express-session";
import envs from "./config/envs.config.js";
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";
import cookieParser from "cookie-parser";

const app = express();
connectMongoDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", handlebars.engine()); 
app.set("views", __dirname + "/views"); 
app.set("view engine", "handlebars"); 
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  session({
    secret: envs.SECRET_CODE, 
    resave: true, 
    saveUninitialized: true, 
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//  Rutas 
//rutas de la Api
app.use("/api",routes);
// Rutas de las vistas
app.use("/", viewsRoutes);

// Iniciar el servidor en el puerto 8080
const PORT = envs.PORT;
const httpServer = app.listen(PORT, () => {
    console.log(`Server is running on port${PORT}`);
})

export const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("Usuario conectado");
});



