const jwt = require("jsonwebtoken");
const {User} = require("../models/models");

  
class authMiddlewares {
	async verifyToken (req,res, next){
		const token = req.cookies.ApiReact;

		if(!token){
		return res.status(401).json({message: "Неверный Токен"});
		}
	
		try{
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			const user = await User.findByPk(decoded.id);
			if(!user) {
				return res.status(404).json({message:"Пользователь не найден"})
		}
		req.user = user;
		next();
		
		}catch(error){
			res.status(400).json({message:"Ошибка Токена"})
		}
	}
	
    authorizeAdmin(req, res, next) {
        if (req.user.role !== "ADMIN") {
            return res.status(403).json({ message: "Доступ Запрещён" });
        }
        next();
    }

};

module.exports = new authMiddlewares();