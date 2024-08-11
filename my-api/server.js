const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3001;

// CORS ve body-parser middleware'lerini ekleyin
app.use(cors());
app.use(bodyParser.json());

// Geçici kullanıcı verileri
let users = []; // Başlangıçta boş

// Kayıt endpoint'i
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // Kullanıcı zaten var mı kontrol et
  const existingUser = users.find(user => user.email === email);

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Yeni kullanıcıyı ekle
  users.push({ username, email, password });
  res.status(201).json({ message: 'Registration successful' });
});

// Giriş endpoint'i
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Kullanıcıyı kontrol et
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
