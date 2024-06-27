import express, {
  Application,
  ErrorRequestHandler,
  Request,
  Response,
} from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";
import artistRoutes from "./routes/artistRoutes";
import trackRoutes from "./routes/trackRoutes";
import albumRoutes from "./routes/albumRoutes";
import favoriteRoutes from "./routes/favoriteRoutes";

const app: Application = express();

app.use(bodyParser.json());

app.use("/user", userRoutes);
app.use("/artist", artistRoutes);
app.use("/track", trackRoutes);
app.use("/album", albumRoutes);
app.use("/favs", favoriteRoutes);

app.use("/", (req: Request, res: Response) => {
  res.send("Home Library service is runnning");
});

// Error handling middleware
app.use((err: ErrorRequestHandler, req: Request, res: Response) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

export default app;
