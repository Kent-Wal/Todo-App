import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prismaClient.js'

const router = express.Router();

// Register a new user endpoint(/auth/register)
router.post('/register', async (req, res) => {
    const {username, password} = req.body;

    //encrypt the password
    const hashedPassword = bcrypt.hashSync(password, 8);
    
    //save the new user and hashedpassword
    try{
        //specifies that we want to insert info into the users table and also what values we want to insert (username, password) and then after we give it the actual values
        const user = await prisma.user.create({
            data: {
                username, 
                password: hashedPassword
            }
        });

        //adds a todo for the user when they first sign up
        const defaultTodo = 'Hello! Add your first todo!';
        await prisma.todo.create({
            data: {
                task: defaultTodo,
                userId: user.id
            }
        });

        //create token/key for the specific user
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, { expiresIn: '24h' });

        //return a created status with the token payload
        return res.status(201).json({ token });
    }
    catch(err){
        console.log(err.message);
        return res.status(503).json({ error: 'Service unavailable' });
    }
});

router.post('/login', async (req, res) => {
    //the password the user enters when loggin in will not be the same as the one stored in the database as the one in the database has been encrypted 
    //so we must encrypt the password entered and check if it is now the same as the one that was stored originally

    const {username, password} = req.body;

    try{
        const user =  await prisma.user.findUnique({
            where: {
                username: username
            }
        });

        //user does not have a account
        if(!user){return res.status(404).send({message: 'User not found!'});}

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if(!passwordIsValid){return res.status(401).send({message: 'Invalid Password'});}


        console.log(user);
        //by this point we would have a successful user sign in (user exists and the password is correct)
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '24h'});
        return res.status(200).json({token});
    }
    catch(err){
        console.log(err.message);
        return res.status(503).json({error: 'Service unavailable'});
    }
});

export default router;