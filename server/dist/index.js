import express from 'express';
import "dotenv/config";
import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { job } from "./config/cron.js"; // Import cron job
const app = express();
const PORT = process.env.PORT || 7000;
import Routes from "./routes/index.js";
import { limiter } from './config/rateLimits.js';
// *middleware
job.start();
// Enable trust proxy to correctly parse X-Forwarded-For header
app.set('trust proxy', false);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(limiter);
app.use(Routes);
// * Set View engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));
app.get('/', (req, res) => {
    res.json({ msg: "Email send succefully" });
});
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
