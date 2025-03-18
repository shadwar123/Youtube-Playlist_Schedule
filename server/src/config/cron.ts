import { CronJob } from "cron";
import axios from "axios";

const PING_URL = "https://youtube-playlist-schedule-backend.onrender.com";

export const job = new CronJob(
  "*/14 * * * *", // Runs every 14 minutes
  async function () {
    try {
      const response = await axios.get(PING_URL);
      console.log(`✅ Server Pinged at ${new Date().toLocaleTimeString()}`);
    } catch (error:any) {
      console.error(`❌ Failed to ping server:`, error.message);
    }
  },
  null, // onComplete
  false, // Do not start immediately
  "UTC" // Change if you need a different time zone
);
