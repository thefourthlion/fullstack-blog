// ------------------------------------------------ require modules ------------------------------------
require("dotenv").config({ path: "./.env" });
const cors = require("cors");
const express = require("express");
const postModel = require("./models/Posts");
const app = express();
const PORT = process.env.PORT || 3001;
const connectBD = require("./config/mongodb");

// ------------------------------------------------ require routes ------------------------------------
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const imageUploadRoute = require("./routes/imageUpload");

// ------------------------------------------------ setup server ------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
connectBD();
app.get("/", async function (req, res) {
  res.json({ api: "Running" });
});

// ------------------------------------------------ call routes ------------------------------------
app.use("/api/auth", authRoute);

app.use("/api/users", userRoute);

app.use("/api/posts", postRoute);

app.use("/api/categories", categoryRoute);

app.use("/api/imageUpload", imageUploadRoute);

app.listen(PORT, () => {
  console.log("👂 on 📶 " + PORT);
});

// app.post("/post", async (req, res) => {
//   let title = req.body.title;
//   let postBody = req.body.postBody;
//   let videoLink = req.body.videoLink;
//   let imageURL = req.body.imageURL;
//   let post = new postModel({
//     title: title,
//     postBody: postBody,
//     videoLink: videoLink,
//     imageURL: imageURL,
//   });

//   try {
//     await post.save();
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.get("/readPost", async function (req, res) {
//   postModel.find({}, (err, result) => {
//     if (err) {
//       res.json({ app: err });
//     }
//     res.send(result);
//   });
// });

// app.delete("/delete/:id", async (req, res) => {
//   const id = req.params.id;
//   await postModel.findByIdAndRemove(id).exec();
// });
