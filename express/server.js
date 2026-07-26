import express from 'express';

const PORT = 3000;
const app = express();

const users = [
    {
        "id": 1,
        "name": "Dhiraj",
        "email": "dhiraj@gmail.com",
        "city": "Lucknow"
    },
    {
        "id": 2,
        "name": "Kushnaseeb",
        "email": "kushnaseeb@gmail.com",
        "city": "Lucknow"
    },
    {
        "id": 3,
        "name": "Anchal 1",
        "email": "anchal@gmail.com",
        "city": "Noida"
    }
];

// server started
app.listen(PORT, () => {
    console.log("Server started at http://localhost:"+PORT);
})


app.get('/', (req, res) => {
    res.send(`<h4>Welcome to UMS!</h4>`);
})

// optional parameters
app.get('/users{/:id}', (req, res) => {
    const id = req.params.id;
    
    if(id){
        const user = users.find(user => user.id == id);
        if(user)
            return res.status(200).send(user);
        return res.status(400).send("User not found!");
    }
    return res.status(200).send(users);
})