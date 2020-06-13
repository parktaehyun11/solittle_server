var express = require('express');
var router = express.Router();
const util = require('../../module/utils');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
const db = require('../../module/pool');
const authUtil = require("../../module/authUtils");

//메인
router.get('/:category/:level',authUtil.isLoggedin, async(req, res)=>{
    //const getCategoryQuery = 'SELECT level_idx FROM category';
    //const getCategoryResult = await db.queryParam_Parse(getCategoryQuery);
    const category = req.params.category;
    const level = req.params.level;
    const getQuizQuery = 'SELECT * FROM voca WHERE category_name = ? AND level_idx = ?';
    const getQuizResult = await db.queryParam_Arr(getQuizQuery,[category,level]);

    if(getQuizResult.length == 0){
        res.status(200).send(util.successFalse(statusCode.DB_ERROR,resMessage.GET_QUIZ_FAIL));
    }
    else{
        res.status(200).send(util.successTrue(statusCode.OK, resMessage.GET_QUIZ_SUCCESS,getQuizResult));
        for(i = 0;  i<getQuizResult.length;  i++){
            console.log(getQuizResult[i]);
        }
        
    }


});

module.exports = router;
