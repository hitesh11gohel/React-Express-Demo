const chalk = require('chalk');
const mongoose = require('mongoose');

mongoose.connect(" mongodb://127.0.0.1:27017/OwnApp23March", {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(chalk.white.inverse('Database Connected '));
}).catch(() => {
    console.log(chalk.red.inverse('No Connection'));
});