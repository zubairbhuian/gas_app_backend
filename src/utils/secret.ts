import dotenv from 'dotenv';
dotenv.config();


 const serverPort = process.env.PORT;
 const dbHost = process.env.DB_HOST;
 const dbUser = process.env.DB_USER;
 const dbPassword = process.env.DB_PASSWORD;
 const jwtSecretKey = process.env.JWT_SECRET_KET;
 const tokenExpiresIn = process.env.TOKEN_EXPIRES_IN;



 const dbURL = `${dbHost}${dbUser}:${dbPassword}@cluster0.2ydwmtn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

export  {serverPort,dbHost,dbUser,dbPassword,jwtSecretKey,dbURL,tokenExpiresIn}


