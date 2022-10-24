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

    static async view(req, res) {
        try {
            const userId = req.params.userId;

            if (!userId && userId === "") {
                return Afterware.sendResponse(req, res, 400, {
                    status: "Validation Error",
                    message: "Enter Proper userId",
                });
            } else {
                const collections = await Task.find({ userId: userId });
                return Afterware.sendResponse(req, res, 200, {
                    status: "success",
                    data: collections,
                });
            }
        } catch (error) {
            console.log(error);
            return Afterware.sendResponse(req, res, 500, {
                status: "error",
                message: "Internal Server Error",
            });
        }
    }

    static async update(req, res) {
        try {
            const taskId = req.params.taskId;

            if (!taskId && taskId === "") {
                return Afterware.sendResponse(req, res, 400, {
                    status: "Validation Error",
                    message: "Enter Proper taskId",
                });
            } else {
                const updated = await Task.updateOne({ _id: taskId }, req.body);
                return Afterware.sendResponse(req, res, 200, {
                    status: "success",
                    message: `${updated.modifiedCount} Documents modified`,
                });
            }
        } catch (error) {
            console.log(error);
            return Afterware.sendResponse(req, res, 500, {
                status: "error",
                message: "Internal Server Error",
            });
        }
    }

    static async delete(req, res) {
        try {
            userId = req.params.userId;
            if (!userId && userId === "") {
                return Afterware.sendResponse(req, res, 400, {
                    status: "Validation Error",
                    message: "Enter Proper userId",
                });
            } else {
                const deleted = await Task.deleteMany({ userId: userId, isCompleted: true });
                return Afterware.sendResponse(req, res, 200, {
                    status: "success",
                    message: `${deleted.deletedCount} Documents deleted`,
                });
            }
        } catch (error) {
            console.log(error);
            return Afterware.sendResponse(req, res, 500, {
                status: "error",
                message: "Internal Server Error",
            });
        }
    }
}

module.exports = TodoController;