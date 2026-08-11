const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
const {User, Basket} = require('../models/models')


class userController {
    async register(req,res,next) {
        try {
            const {email, username, password} = req.body;
            if (!email || !username || !password){
                return res
                .status(400)
                .json({success: false, error: "Введены не все данные"})
            }
            
            const existingUser = await User.findOne({
                where: {
                    [Op.or]: [
                        { email },
                        { username }
                    ]
                }
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
                where: { email }
            })

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
                    id: existingUser.id,
                    email:existingUser.email,
                },
                    process.env.JWT_SECRET,
                {
                    expiresIn: "30d", 
                }
            );

            res.cookie("ApiReact", token,{
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000,
                secure: true,
                sameSite: "None",
            })

            if(existingUser.role === 'ADMIN'){
                return res
                .status(200)
                .json({success:true, message: "Вы успешно вошли как администратор"})
            }
            
            return res
            .status(200)
            .json({success: true, message: "Вы успешно вошли"})
        
        } catch (error) {
            return res
            .status(500)
            .json({success:false, error:"Ошибка Сервера"})
        }
    }

    async check(req,res){
        const {id} = req.query
        if(!id){
            return res
                .status(400)
                .json({ success: false, message: 'Не задан ID' })
        }
        if(id){
            return res
                .status(200)
                .json({ success: true, message: 'Задан ID' })
        }
        res.json(id)
    }

    // save cookie
    async checkCookie(req,res){
        try {
            const token = req.cookies.ApiReact;
            if (token) {
                return res.status(200).json({message:true});
            }
            return res.status(200).json({message: false});
        
        } catch (error) {
            return res.status(500).json({error: "Ошибка Сервера"})
        }
    }

    // logout
    async logout(req,res){
        res.clearCookie("ApiReact",{
            httpOnly: true,
            secure: true,
            sameSite: "None",
            path: "/",
        });

    res.json({ message: "Вы успешно вышли"})
    }
}

module.exports = new userController()
