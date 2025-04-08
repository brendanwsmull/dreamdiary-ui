import mongoose from 'mongoose';
import users from './users.js';
import connect from './db.js';

connect();

//Helper to grab the user before each night operation. 
//Put relevant error checking here too.
const grabUser = (req) => {
    return users.findById(new mongoose.Types.ObjectId(req.params.userid));
}

export const usersReadOne = (req, res) => {
    console.log(`usersReadOne Called with ${req.params.userid}`);
    grabUser(req)
    .then((user) => {
        //return the object that is the user
        if (!user) {console.log("user is null");}
        return res.status(200).json({"listOfDreams" : user.nights});
    });
};

export const nightsCreate = (req, res) => {
    //Updates the user, adding the new night
    console.log("nightsCreateOne Called");
    grabUser(req)
    .then((user) => {
        let newNight = {
            _id : new mongoose.Types.ObjectId(req.body.nightId),
            dreamEntry : req.body.dreamEntry,
            sleepAmount : req.body.sleepAmount,
            date : req.body.date
        }
        console.log(req.body);
        user.nights.push(newNight);
        user.save();
        return res.json({"message": "Updated user successfully"}).status(200);
    })
};
export const nightsDeleteOne = (req, res) => {
    console.log("usersDeleteOne Called");
    grabUser(req)
    .then((user) => {
        //Find the item and remove it from the list
        //This assumes nights is an array
        user.nights = user.nights.filter((user) => {
            user.nightId != req.params.nightid;
        })
        user.save();
        return res.status(200).json({"message": "Updated user successfully"});
    })
};
export const nightsUpdateOne = (req, res) => {
    console.log("usersUpdateOne Called");
    grabUser(req)
    .then((user) => {
        //Grab the correct night and change it
        correctNight = user.nights.find((night) => {
            night.nightId == req.params.nightid;
        })
        //This may be a pass by reference issue
        correctNight = Object.assign(correctNight, req.body);
        user.save();
        return res.status(200).json({"message": "Updated user successfully"});
    })
};
export const usersLogin = (req, res) => {
    console.log("usersLogin Called");
};
export const usersSignup = (req, res) => {
    console.log("usersSignup Called");
};
