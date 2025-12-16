import express from 'express';
import prisma from '../prismaClient.js';

const router = express.Router();

//get all todos for a logged in user
router.get('/', async (req, res) => {
    const todos = await prisma.todo.findMany({
        where: {
            userId : req.userId
        }
    });

    res.json({todos});
});

//create a new todo
router.post('/', async (req, res) => {
    const {task} = req.body;
    
    const todo = await prisma.todo.create({
        data: {             //uploads data
            task,
            userId: req.userId
        }
    });

    res.json({todo});
});

//update a todo
router.put('/:id', async (req, res) => {
    const {completed} = req.body;
    const {id} = req.params;

    const updatedTodo = await prisma.todo.update({
        where: {                //checks to see if these things are equal then sets the variables
            id: parseInt(id),
            userId: req.userId
        },
        data: {                     //updates completed value
            completed: !!completed  //converts to a boolean
        }
    });

    res.json(updatedTodo);
});

//delete a todo
router.delete('/:id', async (req, res) => {
    const {id} = req.params
    const userId = req.userId
    
    await prisma.todo.delete({
        where: {
            id: parseInt(id),
            userId
        }
    })

    res.json({message: "Todo deleted"});
});

export default router;
