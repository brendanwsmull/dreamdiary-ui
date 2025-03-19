import mongoose from 'mongoose';
import { iotModel as iots } from './users.js';
import { connect as db_connect } from './db.js';

print(iotModel);
db_connect();

const usersCreate = (req, res) => {
    console.log("usersCreate Called");
};
const usersReadOne = (req, res) => {
    console.log("usersReadOne Called");
};
const usersUpdateOne = (req, res) => {
    console.log("usersUpdateOne Called");
};
const usersDeleteOne = (req, res) => {
    console.log("usersDeleteOne Called");
};

export default {
    usersCreate,
    usersReadOne,
    usersUpdateOne,
    usersDeleteOne
}