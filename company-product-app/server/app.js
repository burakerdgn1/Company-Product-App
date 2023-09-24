const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const companyRoutes = require('./routes/companyRoutes');
const productRoutes = require('./routes/productRoutes');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');

const corsOptions = {
    origin: 'http://localhost:3001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  };

//middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());


mongoose.connect('mongodb+srv://burakerdogan749:aslancimbom1905@cluster0.duyedw4.mongodb.net/company_product?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.get('/', (req, res) => {
    res.send('Welcome to your Express application!');
});

app.use('/api', companyRoutes);
app.use('/api', productRoutes);
app.use('/api/users', userRouter);
app.use('/api', authRouter);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  });


const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
