import express, { json } from 'express';
//const { iotsReadOne, ioTCreate } = require('./src/app/api/data_controller');
const app = express();

//TODO: Find out what port these should be
const port = 4000;
const frontport = 5173;

//Make CORS not an issue
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", 
               `http://localhost:${frontport}`);
    res.header("Access-Control-Allow-Headers", 
               "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Handle Requests forwarded from Angular
app.use(json());
//Sanity check
app.get('/api/', (req, res) => {
    res.json({message: 
        "Base API works"
    })
});

//Get the routes taken care of
//app.get('/api/:iotid/info', iotsReadOne);
//app.post('/api/new', ioTCreate);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});