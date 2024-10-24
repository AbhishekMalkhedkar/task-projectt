const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const path = require("path");
const convert = require("./middleware/date");

const app = express();
const PORT = 3000;
const API_URL = "http://localhost:5000";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());



app.get("/", async (req, res) => {
    try {
    const response = await axios.get(`${API_URL}/api/tasks`);
    // console.log(response);
    res.render("index.ejs", { tasks : response.data });
    } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
    }
});

app.get("/new", (req, res) => {
    res.render("modify.ejs", { heading: "New Task", submit: "Create Task" });
  });

app.post("/api/tasks", async (req, res) => {
    try {
        const dueDate = convert(req.body.dueDate)
        const obj = {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            dueDate : dueDate 
        };
        const response = await axios.post(`${API_URL}/api/tasks`, obj);
        // console.log(response.data);
        res.redirect("/");
    } catch (error) {
        console.log(req.body);
        // console.log(error);
        res.status(500).json({ message: "Error creating post" });
    }
})


app.get("/edit/:id", async (req, res) => {
    try {
        // console.log(req.params.id);
        const response = await axios.get(`${API_URL}/api/tasks/${req.params.id}`);
        
        res.render("modify.ejs", {
        heading: "Edit Task",
        submit: "Update Task",
        task: response.data,
    });
    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: "Error fetching post" });
    }
});


app.post("/api/task/:id", async (req, res) => {
    try {
        const dueDate = convert(req.body.dueDate)
        const obj = {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            dueDate : dueDate 
        };
        const response = await axios.put(`${API_URL}/api/tasks/${req.params.id}`, obj);
        // console.log(response.body);
        res.redirect("/");
    } catch (error) {
        res.status(500).json({ message: "Error updating post" });
    }
});

app.get("/delete/:id", async (req, res) => {
    try {
        await axios.delete(`${API_URL}/api/tasks/${req.params.id}`);
        res.redirect("/");
    } catch (error) {
        res.status(500).json({ message: "Error deleting post" });
    }
});


app.listen(PORT, () => {
    console.log(`Server started at port : ${PORT}`);
});