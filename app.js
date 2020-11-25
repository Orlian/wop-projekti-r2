'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
//TODO Tänne lisää require lauseita sitä mukaan kun tarvetta tulee

const app = express();
const port = 3001; //Huomaa porttinumero

app.use(cors());
app.use(express.static('public'));

//TODO Tänne autentikointi hommat sun muut use-lauseet



app.listen(port, () => console.log(`App listening on port ${port}...`));