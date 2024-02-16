import express from "express";
import { db, connectToDB } from "./db.js";

const app = express();
app.use(express.json());

// app.post("/hello", (req, res) => {
//   console.log(req.body);
//   res.send(`Hello ${req.body.name}!`);
// });
// app.get("/hello/:name", (req, res) => {
//   const name = req.params.name;
//   res.send(`Hello ${name}!`);
// });
app.get("/api/articles/:name", async (req, res) => {
  const { name } = req.params;

  const article = await db.collection("articles").findOne({ name });
  if (article) {
    res.json(article);
  } else {
    res.sendStatus(404);
  }
});

app.put("/api/articles/:name/upvote", async (req, res) => {
  const { name } = req.params;

  await db.collection("articles").updateOne(
    { name },
    {
      $inc: { upvotes: 1 },
    }
  );

  const article = await db.collection("articles").findOne({ name });

  if (article) {
    res.json(article);
  } else {
    res.send("The article doesn't exist");
  }
});
app.post("/api/articles/:name/comments", async (req, res) => {
  const { name } = req.params;
  const { postedBy, text } = req.body;

  await db
    .collection("articles")
    .updateOne({ name }, { $push: { comments: { postedBy, text } } });
  const article = await db.collection("articles").findOne({ name });
  if (article) {
    res.json(article);
  } else {
    res.send("The article doesn't exist");
  }
});
connectToDB(() => {
  console.log("Successfully connected to database");
  app.listen(8000, () => {
    console.log("Server is listening on port 8000");
  });
});
