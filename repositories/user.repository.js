const { Users } = require('../models');

class UsersRepository{
    // findOneById
    findOneById = async (userId) => {
        return await Users.findOne({where : {userId: userId}});
    }
    
    // createUser
    signup = async(nickname, encrpytedPassword) => {
        await Users.create({
            nickname,
            encrpytedPassword
        });
        return {msg: "new User created"};
    }
}

module.exports = UsersRepository;