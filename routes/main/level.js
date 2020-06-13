var express = require('express');
var router = express.Router();
const util = require('../../module/utils');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
const db = require('../../module/pool');
const authUtil = require("../../module/authUtils");

//메인
//퀴즈 레벨 선택
router.get('/:category',authUtil.isLoggedin, async(req, res)=>{
    //const getCategoryQuery = 'SELECT level_idx FROM category';
    //const getCategoryResult = await db.queryParam_Parse(getCategoryQuery);
    const category = req.params.category;
    const getLevelQuery = 'SELECT level_idx FROM category WHERE category_name = ?';
    const getLevelResult = await db.queryParam_Arr(getLevelQuery,[category]);
    if(getLevelResult.length==0){
        res.status(200).send(util.successFalse(statusCode.DB_ERROR,resMessage.GET_LEVEL_FAIL));
    }
    else{
        res.status(200).send(util.successTrue(statusCode.OK, resMessage.GET_LEVEL_SUCCESS,getLevelResult));
        for(i = 0;  i<getLevelResult.length;  i++){
            console.log(getLevelResult[i]);
        }
        
    }

});

module.exports = router;