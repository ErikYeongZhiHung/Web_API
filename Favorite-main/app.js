const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const port = 3000;
const favoriteRoutes = require('./routes/favorite');
const searchRoutes = require('./routes/search');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Use the favorite routes
app.use('/api', favoriteRoutes);
app.use('/api', searchRoutes);
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Connect to MongoDB
mongoose.connect('mongodb+srv://favorite:favorite@cluster0.gpycf.mongodb.net/favorite', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}
);
