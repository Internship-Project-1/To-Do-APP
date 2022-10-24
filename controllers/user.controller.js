const Afterware = require("../lib/afterware");
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {

    static async create(req, res) {
        const { firstName, lastName, email, dob, password, signInType, imageURL } = req.body;
        try {
            const user = await User.findOne({ email });
            if (user)
                return res.status(400).json({ message: "User already exists" });
            const encryptedPass = await bcrypt.hash(signInType === 'google' ? 'google' : password, 10);
            const newUser = new User();
            newUser.firstName = firstName;
            newUser.lastName = lastName;
            newUser.email = email;
            newUser.dob = dob;
            newUser.password = encryptedPass;
            newUser.signInType = signInType;
            newUser.imageURL = imageURL;

            const result = await newUser.save();

            const token = jwt.sign({ email: res.email }, 'verySecretValue', { expiresIn: '1h' });
            res.status(201).json({ message: "User Created Successfully", result, token });
        } catch (error) {
            res.status(500).json({ message: "Something went wrong: " + error });
        }
    }

    static async login(req, res) {
        const { email, password, firstName, lastName } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                if (password === 'google') {
                    const encryptedPass = await bcrypt.hash('google', 10);
                    const newUser = new User();
                    newUser.firstName = firstName;
                    newUser.lastName = lastName;
                    newUser.email = email;
                    newUser.password = encryptedPass;
                    newUser.signInType = 'google';
                    const result = await newUser.save();
                    const token = jwt.sign({ email: res.email }, 'verySecretValue', { expiresIn: '1h' });
                    return res.status(200).json({ message: "Login successfull", result: result, token });
                }
                return res.status(400).json({ message: "User does not exists" });
            }
            const verifyPassword = await bcrypt.compare(password, user.password);
            if (!verifyPassword)
                return res.status(400).json({ message: "Password does not match" });
            const token = jwt.sign({ email: res.email }, 'verySecretValue', { expiresIn: '1h' });
            res.status(200).json({ message: "Login successfull", result: user, token });

        } catch (error) {
            res.status(500).json({ message: "Something went wrong" });
        }

    }

    static async update(req, res) {
        try {
            const email = req.params.email;
            if (!email && email === "") {
                return Afterware.sendResponse(req, res, 400, {
                    status: "Validation Error",
                    message: "Enter Proper userId",
                });
            } else {
                const updated = await User.updateOne({ email: email }, req.body);
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

    static async viewAll(req, res) {
        try {
            const collections = await User.find({});
            return Afterware.sendResponse(req, res, 200, {
                status: "success",
                data: collections,
            });
        } catch (error) {
            console.log(error);
            return Afterware.sendResponse(req, res, 500, {
                status: "error",
                message: "Internal Server Error",
            });
        }
    }

    static async view(req, res) {
        try {
            const email = req.params.email;
            if (!email && email === "") {
                return Afterware.sendResponse(req, res, 400, {
                    status: "Validation Error",
                    message: "Enter Proper userId",
                });
            } else {
                const collections = await User.find({ email: email });
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

    static async delete(req, res) {
        const email = req.params.email;
        try {
            const deleted = await User.deleteOne({ email: email });
            return Afterware.sendResponse(req, res, 200, {
                status: deleted.acknowledged == "1" ? "success" : "fail",
                message: deleted.deletedCount,
            });
        } catch (error) {
            return Afterware.sendResponse(req, res, 500, {
                status: "error",
                message: "Internal Server Error",
            });
        }
    }
}
module.exports = UserController;