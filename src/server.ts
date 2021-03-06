import express, { Request, Response, Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes/index";

const app: Application = express();
const port = process.env.Port || 4000;

app.use(bodyParser.json());
app.use(cors());
app.use(routes);

app.get("/", (req: Request, res: Response) => { 
  res.send('Hello, users!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}, Address: http://localhost:${port}`);
});

export default app;

// http://localhost:4000/api/Malak?width=2000&height=2000&r=0&b=150&g=150&greyScale=true