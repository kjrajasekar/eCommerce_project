require('dotenv').config()
const app = require('./app/app')
const port=process.env.API_PORT;

app.listen(port, () => {
    console.log('Server running '+port);
});

