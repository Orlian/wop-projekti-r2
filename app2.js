'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('./utils/passwd');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const postRoute = require('./routes/postRoute');
const likeRoute = require('./routes/likeRoute');
const commentRoute = require('./routes/commentRoute');
//TODO Tänne lisää require lauseita sitä mukaan kun tarvetta tulee

const app2 = express();
const port = 3001; //Huomaa porttinumero

app2.use(cors());
app2.use(express.static('public'));
app2.use('/thumbnails', express.static('thumbnails'));
app2.use('/uploads', express.static('uploads'));

app2.use(bodyParser.urlencoded({extended: false}));
app2.use(bodyParser.json());

app2.use('/auth', authRoute);
app2.use('/user', passport.authenticate('jwt', {session: false}), userRoute);
app2.use('/post', passport.authenticate('jwt', {session: false}), postRoute);
app2.use('/comment', passport.authenticate('jwt', {session: false}), commentRoute);
app2.use('/like', passport.authenticate('jwt', {session: false}), likeRoute);
//TODO Tänne autentikointi hommat sun muut use-lauseet



app2.listen(port, () => console.log(`App listening on port ${port}...`));