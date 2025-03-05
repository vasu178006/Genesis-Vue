import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Resolve directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5174;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
