import express from 'express';
import path, {dirname} from 'path';
import {fileURLToPath} from 'url';
import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import authMiddleware from './middleware/authMiddleware.js';

const app = express();
const PORT =  process.env.PORT || 5000;      //5000 is a backup if the PORT variable from the .env file does not exist

//get the file path from the URL of the current module
const __fileName = fileURLToPath(import.meta.url)
//get the directory from the file path
const __dirName = dirname(__fileName);


//MIDDLEWARE
app.use(express.json());        //tells the server that exprcted input will be JSON data (database user info)
//serves the HTML from the /public directory
//  tells express to serve all file from the public folder as static assets / files
//  any requests for the css files will be resolved to the public diurecoty
app.use(express.static(path.join(__dirName, '../public')));

//serving up the HTML file from the /public directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirName, 'public', 'index.html'));
});

//routes
app.use('/auth', authRoutes);
app.use('/todos', authMiddleware, todoRoutes);

app.listen(PORT, () => {
    console.log(`Server has started on port: ${PORT}`);
});