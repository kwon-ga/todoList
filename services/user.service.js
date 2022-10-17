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
        if(!findUser){return { err : 'No matching nickname'}}
        
        // 비밀번호 일치 여부
        const match_password = bcrypt.compareSync(password,findUser.password);
        if(!match_password){return { err : 'No matching password'}}

        // refreshToken 조회 후 만료 여부 판단
        const verifyRefresh = await this.jwtService.validateRefreshToken(findUser.refreshToken);


        // user 정보에 refreshToken 정보가 없거나 만료 시 업데이트
        if(!findUser.refreshToken || !verifyRefresh){
            // refreshToken 생성
            const refreshToken = await this.jwtService.createRefreshToken();

            await this.usersRepository.updateRefreshToken(findUser.userId, refreshToken);
            console.log('리프레시 토큰 최신화');
        }

        // accessToken 생성
        const accessToken = await this.jwtService.createAccessToken(findUser.userId);

        return { data : accessToken }
    }
}

module.exports = UsersService;