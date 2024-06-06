import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const searchSchema = new mongoose.Schema({
  city: String,
  country: String,
  temperature: Number,
  condition: String,
  conditionText: String,
  icon: String,
  date: { type: Date, default: Date.now }
});

const Search = mongoose.model('Search', searchSchema);

// Route to save search
app.post('/api/search', async (req, res) => {
  try {
    const newSearch = new Search(req.body);
    await newSearch.save();
    res.status(201).json(newSearch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get search history
app.get('/api/history', async (req, res) => {
  try {
    const searches = await Search.find().sort({ date: -1 });
    res.status(200).json(searches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
