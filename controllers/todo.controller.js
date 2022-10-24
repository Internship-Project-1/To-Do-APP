const Afterware = require("../lib/afterware");
const Task = require("../models/todo");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class TodoController {
    static async create(req, res) {
        try {
            const { task, isCompleted, userId } = req.body;
            const newTask = new Task();
            newTask.userId = userId; //ForeignKey concept
            newTask.task = task;
            newTask.isCompleted = isCompleted;

            const result = await newTask.save();
            res.status(201).json({ message: "Task Created Successfully", result });

        } catch (error) {
            return Afterware.sendResponse(req, res, 500, {
                status: "error",
                message: "Internal Server Error",
            });
        }
    }
}