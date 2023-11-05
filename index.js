import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes.js';
import session from 'express-session';

const app = express();

// Servir arquivos estáticos na pasta public
app.use(express.static('public'));


//sessão
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
}));


//borderparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Ejs
app.set('view engine', 'ejs');
app.set('views', './pages');


//uso de rotas
app.use(routes);


//servidor
app.listen(3000, function () {
    console.log('Server listening on port 3000: http://localhost:3000');
});
