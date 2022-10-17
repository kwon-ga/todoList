const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();


const jwtService = require("./jwt.service");
const UsersRepository = require('../repositories/user.repository');

class UsersService {
    usersRepository = new UsersRepository();
    jwtService = new jwtService();

    // createUser
    createUser = async (nickname, password) => {
        
        // 중복유저 검색
        const findUser = await this.usersRepository.findUser(nickname);

        // 닉네임 중복이면 false 반환
        if(findUser.length){ return { err : 'nicknameOverlap'} }


        // 비밀번호 암호화
        const encrpytedPassword = bcrypt.hashSync(password,10);
        
        // 유저 등록
        const signup = await this.usersRepository.signup(nickname,encrpytedPassword);
        

        return signup;
    }

    // loginUser
    loginUser = async (nickname, password) => {
        
        // 로그인 유효성 검증을 위해 유저 검색
        const [findUser] = await this.usersRepository.findUser(nickname);
        
        // 유저 정보 없는 경우
        if(!findUser){ throw new Error('No matching nickname') }
        
        // 비밀번호 일치 여부
        const match_password = bcrypt.compareSync(password,findUser.password);
        if(!match_password){ throw new Error('No matching password') }
        
        // Token 생성
        const accessToken = await this.jwtService.createAccessToken(findUser.userId);
        const refreshToken = await this.jwtService.createRefreshToken();

        // refreshToken 암호화
        const hash_refreshToken = bcrypt.hashSync(refreshToken,5);
        

        // refreshToken db 저장
        await this.usersRepository.updateRefreshToken(findUser.userId, hash_refreshToken); 

        return {AccessToken:accessToken,RefreshToken:hash_refreshToken} 
    }
}

module.exports = UsersService;