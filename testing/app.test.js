//variables to help url stuff.
const baseURL = 'http://localhost:8080';
const testUsername = 'testAPI';
const testPassword = 'testAPI';
let userid = "";
let nightid = "";

const displayStart = () => {
    console.log(
        "Running database testing script.\n" +
        "This runs tests to make sure the MongoDB database\n" + 
        "is fully connected and working with the API.\n" + 
        "This requires the server to already be started\n" + 
        "with 'npm start'.\n"
    );
}

displayStart();

//Do testing here
test('Adding a user', async () => {
    const response = fetch(`${baseURL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"username": testUsername, "password": testPassword}),
      });
      expect((await response).status).toBe(200);
})

test('Logging in as a user', async () => {
    const response = fetch(`${baseURL}/users/${testUsername}/${testPassword}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      let body = await response;
      userid = await body.json();
      userid = userid.user;
      expect((await response).status).toBe(200);
})

test('Creating a night', async () => {
    nightid = "68111767ceb32cd95f82f0b5";
    const response = fetch(`${baseURL}/api/${userid}/${nightid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            _id : nightid,
            dreamEntry : "Test Dream",
            sleepAmount : 10,
            date : Date.now()
        })
      });
      expect((await response).status).toBe(200);
})