import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
import productsRouter from "./routes/product.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/api/products", productsRouter);
app.use('/img', express.static('uploads'));

mongoose.connect('mongodb://127.0.0.1/vintagestore', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('We are making some connections!'))
    .catch(err => console.log('Somenthing went wrong', err));


app.listen(3001, () => console.log("Server started"));
