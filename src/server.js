const express = require( "express" );
const mongoose = require( "mongoose" );
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());

const serve = require('http').Server(app);
const io = require('socket.io')(serve);

io.on('connection', socket => {
    socket.on('connectRoom', box =>{
        socket.join(box);
    })
})   
 
mongoose.connect('mongodb+srv://Nick:Nick@cluster0-zpjoo.gcp.mongodb.net/teste?retryWrites=true', 
{
    useNewUrlParser: true
    }
); 

app.use((req, res, next) =>{
    req.io = io;

    return next(); 
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes'));

server.listen(3333);   