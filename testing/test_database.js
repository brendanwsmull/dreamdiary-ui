//variables to help url stuff.
const baseURL = 'http://localhost:4000';

const displayStart = () => {
    console.log(
        "Running database testing script.\n" +
        "This runs tests to make sure the MongoDB database.\n" + 
        "is fully connected and working with the API.\n" + 
        "This requires the server to already be started\n" + 
        "with 'npm start'.\n"
    );
}

//Each test sends a request to the API server.
const testSignup = async () => {
    console.log("Creating a new user.");
    //"/api/account".put
    const res = await fetch(`${baseURL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: "APItest", password: "APItest"}),
      });
}

const testLogin = () => {
    console.log("Logging in.");
    //"/api/account".get
}

const testCreate = () => {
    console.log("Creating a new night.");
    //"/api/:userid/:nightid".post
}

const testRead = () => {
    console.log("Reading a night");
    //"/api/:userid".get
}

const testUpdate = () => {
    console.log("Updating a night");
    //"/api/:userid/:nightid".put
}

const testDelete = () => {
    console.log("Deleting a night");
    //"/api/:userid/:nightid".delete
}

const testComplete = () => {
    console.log("Tests complete.");
}

const getBar = (count, max_count) => {
    var string = "[";
    for (let i = 0; i < max_count-1; i++) {
        if (i < count) {
            string += "X";
        } else {
            string += "_"
        }
    }
    string += "]";
    return string;
}

const newTest = (test, count, max_count) => {
    //Order of the tests
    //Do the test
    test();
    //Update status bar
    console.log(getBar(count, max_count));
    //Increment count
    return count+1;
}

//Do the tests
displayStart();
let count = 0;
const tests = [
    testSignup,
    testLogin,
    testCreate,
    testRead,
    testUpdate,
    testDelete
];

for (let test of tests) {
    count = newTest(test, count, tests.length);
}

testComplete();