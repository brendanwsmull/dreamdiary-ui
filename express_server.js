import express, { json } from 'express';
import { usersReadOne, usersCreate, usersDelete, usersLogin, usersSignup } from './src/api/data_controller.js';
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
app.get('/api/:userid', usersReadOne);
app.post('/api/:userid/:nightid', usersCreate);
app.delete('/api/:userid/:nightid', usersDelete);
app.get('api/account', usersLogin);
app.post('api/account', usersSignup);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});