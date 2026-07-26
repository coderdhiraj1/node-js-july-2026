import express from 'express';

const app = express();
const PORT = 4001;


// middleware to handle body
app.use(express.json()); // raw data handling
app.use(express.urlencoded()); // handle post body

app.listen(PORT, function(){
    console.log(`Server started at http://localhost:${PORT}`);
});

// app.get('/', function(req, res){
//     res.send("Welcome from Express.js 👋");
// });

app.get('/', (req, res) => {
    res.send(`
        <h4>Welcome from Express.js 👋</h4>
        <a href='about'>About</a> |    
        <a href='form'>Form</a>    
    `);
});

app.get('/about', (req, res) => {
    res.send(`<h4>About Us</h4>`);
});

app.get('/form', (req, res) => {
    res.send(`
        <form action="form/submit" method="post">    
            <input type="text" name="name" placeholder="Name" id="">
            <input type="text" name="city" placeholder="City" id="">
            <button type="submit">Submit</button>
        </form>    
    `);
});

app.post('/form/submit', (req, res) => {
    console.log(req.body+'---------');

    const { name, city } = req.body;

    res.status(200).send(`Welcome ${name} from ${city}!`);
})

// app.get('/form/submit', (req, res) => {

//     const { name, city } = req.query;

//     res.status(200).send(`Welcome ${name} from ${city}!`);
// })