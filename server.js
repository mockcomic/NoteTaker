const express = require('express');
const path = require('path');
const router = require('express').Router();
const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/api',apiRoutes)
app.use('/', htmlRoutes);

// app.get('/notes',(req,res) => {
//     res.sendFile(path.join(__dirname + '/public/notes.html'));
// });

// app.get('/api/notes', (req,res) => {
//   res.sendFile(path.join(__dirname + '/db/db.json'));
// });

// app.get('*', (req,res) => {
//     res.sendFile(path.join(__dirname + '/public/index.html'));
// });

app.listen(PORT, () => {
  console.log(`API server now on port http://localhost:${PORT}/`);
});
