import mongoose from 'mongoose';
import userModel from './users.js';
const dbURL = 'mongodb://localhost:27017/Dreamdiary/';  

//Export the connect function so it actually runs
const connect = () => {
  setTimeout(() => mongoose.connect(dbURL, { useNewUrlParser: true, dbName: 'Dreamdiary' }), 1000);
}      
export default connect;

//set debugging
mongoose.set('debug', true);

mongoose.connection.on('connected', () => {              
  console.log(`Mongoose connected to ${dbURL}`);         
});                                                      
mongoose.connection.on('error', err => {                 
  console.log(`Mongoose connection error: ${err}`);      
});                                                      
mongoose.connection.on('disconnected', () => {           
  console.log('Mongoose disconnected');                  
});                                                      
const gracefulShutdown = (msg, callback) => {            
  mongoose.connection.close(
    /*
    () => {                     
    console.log(`Mongoose disconnected through ${msg}`); 
    callback();}
    */
  );                                                    
};                                                       
// For nodemon restarts                                  
process.once('SIGUSR2', () => {                          
  gracefulShutdown('nodemon restart', () => {            
    process.kill(process.pid, 'SIGUSR2');                
  });                                                    
});                                                      
// For app termination                                   
process.on('SIGINT', () => {                             
  gracefulShutdown('app termination', () => {            
    process.exit(0);                                     
  });                                                    
});                                                      
// For Heroku / Render app termination                            
process.on('SIGTERM', () => {                            
  gracefulShutdown('Heroku app shutdown', () => {        
    process.exit(0);                                     
  });                                                    
});   
