//bring in express
const express = require('express');

//bring in connectdb
const connectDB = require('./config/db');
//initialize app viable with express
const app = express();
//connect db
connectDB();

//initialize middleware for body parser- included with express now
//allows us to get the data is req.body
app.use(express.json({ extended: false }));

//create single enpoint to test out
//take get request to /, callback is req, res, sends data to browser
app.get('/', (req, res) => res.send('API running'));

//define routes, put in endpoint
//can make request to all the endpoints
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
// app.use('/api/profile', require('./routes/api/profile'));
// app.use('/api/posts', require('./routes/api/posts'));

//listen on port via the variable PORT
//for heroku, OR default port locally
const PORT = process.env.PORT || 6060;
//pass in PORT and call back message that server is working
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
