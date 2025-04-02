import mongoose from 'mongoose';
import iotModel from './users.js';
import connect from './db.js';

connect();

export const usersReadOne = (req, res) => {
    console.log("usersReadOne Called");
};
export const usersCreate = (req, res) => {
    console.log("usersCreate Called");
};
export const usersDeleteOne = (req, res) => {
    console.log("usersDeleteOne Called");
};
export const usersUpdateOne = (req, res) => {
    console.log("usersUpdateOne Called");
};
export const usersLogin = (req, res) => {
    console.log("usersLogin Called");
};
export const usersSignup = (req, res) => {
    console.log("usersSignup Called");
};
