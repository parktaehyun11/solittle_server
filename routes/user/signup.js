var express = require('express');
var router = express.Router();
const crypto = require('crypto-promise');
const util = require('../../module/utils');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
const db = require('../../module/pool');
const jwtUtils = require('../../module/jwt');

//email, password, name , salt
//회원가입
router.post('/', async (req, res) => {
    const selectUserQuery = 'SELECT * FROM user WHERE email = ?';
    const selectUserResult = await db.queryParam_Parse(selectUserQuery, [req.body.email]);
    const signupQuery = 'INSERT INTO user (email, password, salt, name) VALUES (?, ?, ?, ?)';
    console.log(selectUserResult);
    if(selectUserResult.length == 0) {  //email 중복 없음(회원 가입 성공)
        const buf= await crypto.randomBytes(64);
        const salt = buf.toString('base64');
        const hashedPw = await crypto.pbkdf2(req.body.password.toString(), salt, 1000, 32, 'SHA512');
        //const signupResult = await db.queryParam_Parse(signupQuery, [req.body.name, hashedPw.toString('base64'), salt, req.body.email, 1]);
        const signupResult = await db.queryParam_Parse(signupQuery, [req.body.email, hashedPw.toString('base64'), salt, req.body.name]);
        if (signupResult.length == 0) {
            res.status(200).send(util.successFalse(statusCode.DB_ERROR, resMessage.USER_INSERT_FAIL));
        } else {  
            res.status(200).send(util.successTrue(statusCode.OK, resMessage.SIGNUP_SUCCESS));
        }
    } else {
        console.log("중복된 email이 있습니다.");
        res.status(200).send(util.successFalse(statusCode.OK, resMessage.SIGNUP_FAIL));
    }
});
//id값이 null인 곳을 다 select해서 그 중에 중복된 email이 없으면 회원가입 성공/아니면 실패
module.exports = router;