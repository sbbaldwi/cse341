const express = require('express');
const app = express();


app.use('/', require('./routes/contacts'));

const port = 3000;

app.listen(process.env.PORT || port, () => {
    console.log('Web Server is listening at port ' + (process.env.PORT || port));
});

app.listen(process.env.PORT || port, '0.0.0.0', () => {
    console.log('Web Server is listening at port ' + (process.env.PORT || port));
});