
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const port = process.env.PORT || 4000;

mongoose.connect('mongodb://127.0.0.1/mongo-fetch-example')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/"));

require('./rutas')(app);

app.listen(port, () => {
  console.log('\n App en puerto =>> ', port, ' conectar calendar-app-frontend-main \n');
});


