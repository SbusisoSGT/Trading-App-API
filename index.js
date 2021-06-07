const express = require('express');
const dotenv = require('./src/app/config/dotenv')
const api = require('./src/app/routes/api.js');

let app = express();
app.use('/api', api);

app.listen(8001, () => {
    console.log('Server running at 127.0.0.1:8001');
});
