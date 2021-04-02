const express = require('express');
const bodyParser = require('body-parser');

const HttpError =require('./models/http-error');
const groupRoutes = require('./routes/group-routes');
const userRoutes = require('./routes/user-routes')

const port = 5000;
const app = express();

app.use(bodyParser.json());

app.use('/api/groups', groupRoutes);

app.use('/api/user', userRoutes);

app.use((req, res, next)=>{
    const error = new HttpError('Could not find this route', 404);
    throw error;
});

app.use((error,req, res, next) => {
    console.log("eror" + error);
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || "An unknown error occured"});
});

app.listen(port, () => {
    console.log("Server is listening on port 5000!");
});