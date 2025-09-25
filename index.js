require('dotenv').config();

const path = require('path');

const flash = require('express-flash');
const methodOverride = require('method-override');


const express = require('express');


const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');


const app = express();

app.use(methodOverride('X-HTTP-Method-Override'))
const database = require("./config/database");

database.connect();



const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");

const systemconfig = require("./config/system");

const port = process.env.PORT;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))


app.use(cookieParser('vgedrfgrdgvr'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

app.use(express.static(`${__dirname}/public`));

// tinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// end tinyMCE


// App local variable
app.locals.prefixAdmin = systemconfig.prefixAdmin;

//Route
route(app);
routeAdmin(app); 



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
