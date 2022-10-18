const joi = require('joi');

const UsersService = require('../services/user.service');


const re_nickname = /^[a-zA-Z0-9]{3,10}$/;
const re_password = /^[a-zA-Z0-9]{4,30}$/;

const userSchema = joi.object({
  nickname: joi.string().pattern(re_nickname).required(),
  password: joi.string().pattern(re_password).required(),
  confirmPassword: joi.string(),
});


class UsersController {
    usersService = new UsersService();

    // userSignup
    userSignup = async (req,res,next) => {
        const { nickname, password, confirmPassword } = await userSchema.validateAsync(req.body).catch(e => {
            res.status(400).json({ "ErrorMassge": "입력 정보를 확인해주세요." });    
        });

        // 비밀번호 유효성 검증
        if(password !== confirmPassword){
            res.status(400).json({ "ErrorMassge": "비밀번호가 일치하지 않습니다." });    
        }

        // 회원가입 서비스 로직 호출
        const result = await this.usersService.createUser(nickname, password);
        
        // 중복 닉네임
        if(result.err){ res.status(400).json({ data: "이미 존재하는 닉네임입니다." }); }

        // 정상처리
        res.status(201).json({ data: "회원가입 성공!" });
    }


    // userLogin
    userLogin = async (req,res,next) => {

        const { nickname, password } = await userSchema.validateAsync(req.body).catch(e => {
            res.status(400).json({ "ErrorMassge": "입력 정보를 확인해주세요." });    
        });

        // 로그인 서비스 로직 호출
        const result = await this.usersService.loginUser(nickname, password);
        console.log(result);
        if(result.err){ res.status(400).json({ "ErrorMassge": "닉네임 혹은 비밀번호를 확인해주세요." }) }


        // accessToken 쿠키 생성 
        res.cookie('AccessToken', `Bearer ${result.data}`, {
            expires: new Date(Date.now() + 10800000), // 3시간
        });

        res.status(201).json({ data: result.data });
        // res.status(201).json({ data: "로그인 성공!" });
    }
}

module.exports = UsersController; 