import passport from "passport";

import jwt from "passport-jwt";
import local from "passport-local";
import passportCustom from "passport-custom";
import { addCartService} from "../services/carts.service.js";
import userDao from "../dao/dbManagers/users.manager.js";
import { cookieExtractor } from "../utils/cookieExtractor.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import envs from "./envs.config.js";
import { verifyToken } from "../utils/jwt.js";

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;
const CustomStrategy = passportCustom.Strategy; 

export const initializePassport = () => {
  passport.use(
    "register", 
    new LocalStrategy({ passReqToCallback: true, usernameField: "email" }, async (req, username, password, done) => {
      try {
        const { first_name, last_name, age } = req.body;
        
        const user = await userDao.getByEmail(username);
        if (user) return done(null, false, { message: "User already exists" });
        
        const cart = await addCartService();
        const newUser = {
          first_name,
          last_name,
          password: createHash(password),
          email: username,
          age,
          cart: cart._id
        };

        const userCreate = await userDao.create(newUser);

        return done(null, userCreate);
      } catch (error) {
        return done(error);
      }
    })
  );

  passport.use(
    "login",
    new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {
      try {
        const user = await userDao.getByEmail(username);
        
        if (!user || !isValidPassword(user.password, password)) return done(null, false, {message: "User or email invalid"});
        return done(null, user);
      } catch (error) {
        done(error);
      }
    })
  );



  passport.use(
    "jwt",
    new JWTStrategy(
      {jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), secretOrKey: envs.JWT_SECRET_CODE},
      async (jwt_payload, done) => {
          try {
            
            return done(null, jwt_payload);
            
          } catch (error) {
            return done(error);
          }
      }
    )
  )

}