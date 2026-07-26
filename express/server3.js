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
        "name": "Anchal",
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

app.get('/users/', (req, res) => {
    const id = req.query.id;

    if(id){
        const user = users.find(user => user.id == id);
        if(user){
            res.send(user);
        }else{
            res.send('User not found!');
        }
    }
    else{
        res.send(users);
    }

    // if(id){
    //     const user = users.find(user => user.id == id);
    //     if(user)
    //         return res.send(user);
    //     return res.send("User not found!");
    // }
    // return res.send(users);
});



