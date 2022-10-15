const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UsersRepository = require('../repositories/user.repository');

class UsersService {
    usersRepository = new UsersRepository();

    // createUser
    // loginUser
}

module.exports = UsersService;