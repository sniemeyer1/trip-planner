//bring in express
const express = require('express');
//initialize app viable with express
const app = express();
//create single enpoint to test out
//take get request to /, callback is req, res, sends data to browser
app.get('/', (req, res) => res.send('the API is running'));
//listen on port via the variable PORT
//for heroku, OR default port locally
const PORT = process.env.PORT || 6060;
//pass in PORT and call back message that server is working
app.listen(PORT, () => console.log(`Hooray! Server started on port ${PORT}`));
