import { ZodError } from "zod";
import ejs from "ejs";
import { fileURLToPath } from "url";
import * as path from "path";
import moment from "moment";
//Formating Zod error in readable format
export const formatError = (error: ZodError): any => {
  let errors: any = {};
  error.errors?.map((issue) => {
    errors[issue.path?.[0]] = issue.message;
  });

  return errors;
};
// Rendering EJS template
export const renderEmailEjs = async (fileName: string, payload: any) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const html = await ejs.renderFile(
      __dirname + `/views/emails/${fileName}.ejs`,
      payload
    );
    return html;
  };

  export const checkDateHourDifference = (date: Date | string): number => {
    const now = moment();
    const tokenSentAt = moment(date);
    const difference = moment.duration(now.diff(tokenSentAt));
    const hoursDiff = difference.asHours();
    return hoursDiff;
  };