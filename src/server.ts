import express, { Request, Response, Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import test from "./services/Mandala";

const app: Application = express();
const port = 4000;

app.use(bodyParser.json());
app.use(cors());

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello Developer!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

test();

export default app;
