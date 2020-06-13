var express = require('express');
var router = express.Router();
const util = require('../../module/utils');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
const db = require('../../module/pool');
const authUtil = require("../../module/authUtils");



//myvoca 로드
router.get('/:category_name', authUtil.isLoggedin, async(req, res)=>{
    
    const category_name = req.params.category_name;
    const useridx = req.decoded.idx;

    const checkCategory_name = "SELECT category_name FROM category WHERE category_name = ?";
    const checkCategory_nameResult = await db.queryParam_Arr(checkCategory_name,[category_name]);
    //console.log(checkCategory_nameResult[0].category_name);
    //console.log(checkCategory_nameResult.category_name)
    
    const getMyVocaQuery = 'SELECT  * FROM myvoca WHERE user_idx =? and category_name =?';
    const getMyVocaResult = await db.queryParam_Arr(getMyVocaQuery , [useridx,category_name]);

    console.log(getMyVocaResult)
    if(checkCategory_nameResult.length == 0){
        res.status(200).send(util.successFalse(statusCode.BAD_REQUEST,resMessage.GET_CATEGORY_FAIL));
            console.log("잘못")
    }
    else{
        if(getMyVocaResult[0].length==0){//WORD GET 실패시
            res.status(200).send(util.successFalse(statusCode.BAD_REQUEST,resMessage.GET_MYVOCA_FAIL));
            console.log("잘못")
        }
        else{// WORD GET 성공시
            res.status(200).send(util.successTrue(statusCode.OK, resMessage.GET_MYVOCA_SUCCESS,getMyVocaResult));
            // for(i = 0;  i<getMyVocaResult.length;  i++){
            //    console.log(getMyVocaResult[i]);
            // }
            
        }
    }
});
    
module.exports = router;