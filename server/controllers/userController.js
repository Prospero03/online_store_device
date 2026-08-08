const ApiError = require("../error/ApiError")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')


class userController {
    async registration(req,res,next) {
        try {
            const {email, username, password} = req.body;
            if (!email || !username || !password){
                return res
                .status(400)
                .json({success: false, error: "Введены не все данные"})
            }
            
            const existingUser = await User.findOne({
                $or: [{email}, {username}]
            });
                
            if(existingUser){
                return res
                .status(400)
                .json({success: false, error: "Пользователь уже существует"})
            }

            const hashedPass = await bcrypt.hash(password, 10);
            const newUser = new User({ email, username, password:hashedPass});
            await newUser.save();
                return res
                .status(200)
                .json({success: true, message: "Вы успешно зарегистрировались"})
        } catch (error) {
            return res
            .status(500)
            .json({success:false, error:"Ошибка Сервера"})
        }
	
    }

    async login(req,res){
        try {
            const {email, password} = req.body;
            if (!email || !password){
                return res
                .status(400)
                .json({success: false, error: "Введены не все данные"})
            }
            
            const existingUser = await User.findOne({
                $or: [{email}]
            });

            if(!existingUser){
                return res
                .status(400)
                .json({success: false, message: "Неверные данные"})
            }
            
            const checkPass = await bcrypt.compare(password, existingUser.password);
            if(!checkPass){
                return res
                .status(400)
                .json({success: false, message: "Неверные данные"})
            }

            const token = jwt.sign(
                {
                    id: existingUser._id,
                    email:existingUser.email,
                },
                    process.env.JWT_SECRET,
                {
                    expiresIn: "30d", 
                }
            );
            
            return res
            .status(200)
            .json({success: true, message: "Вы успешно вошли"})
        
        } catch (error) {
            return res
            .status(500)
            .json({success:false, error:"Ошибка Сервера"})
        }
    }

    async check(req,res,next){
        const {id} = req.query
        if(!id){
            return next(ApiError.badRequest('Не задан ID'))
        }
        res.json(id)
    }
}

module.exports = new userController()