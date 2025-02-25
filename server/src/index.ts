import express , { Request, Response, Application } from 'express';
import "dotenv/config"
import * as path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import { sendMail } from './config/mail.js';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app: Application = express();
const PORT = process.env.PORT || 7000

import Routes from "./routes/index.js"
import { limiter } from './config/rateLimits.js';
// *middleware

// Enable trust proxy to correctly parse X-Forwarded-For header
app.set('trust proxy', false);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(limiter)
app.use(Routes);
// * Set View engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));


// app.get('/', async (req:Request, res:Response) => {
//     const html = await ejs.renderFile( __dirname + `/views/emails/welcome.ejs`, {
//         name : "shadwar Nayyar"
//     })
//     await sendMail("shadwarnayyar875@gmail.com", "Testing SMTP", html)
//     return res.json({msg : "Email send succefully"})
// });

app.listen(PORT , () => console.log(`Server is running on PORT ${PORT}`))