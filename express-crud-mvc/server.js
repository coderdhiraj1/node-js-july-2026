import express from "express";

import courseRoute from './routes/course.routes.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api/courses', courseRoute);

// inform browser
app.get("/", (req, res) => {
  res.send("Welcome to Courses managment system!");
})


app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);  
});