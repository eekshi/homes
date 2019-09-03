module.exports=(params)=> {
    var Cloudant = require('cloudant');
    require('dotenv').config();
    var cloudant = new Cloudant({ url: "https://e3ac4c51-e9db-4ca2-bd1c-496c30d68953-bluemix:a9b28932b59b6b2be1e20ae67a08592fb997fde38f5fa4f1dacc172533f447bd@e3ac4c51-e9db-4ca2-bd1c-496c30d68953-bluemix.cloudantnosqldb.appdomain.cloud", maxAttempt: 5, plugins: [ 'iamauth', { retry: { retryDelayMultiplier: 4, retryErrors: true, retryInitialDelayMsecs:1000, retryStatusCodes: [ 429 ] } } ]});
    var userDB = cloudant.db.use('user_conversation');
      return new Promise(function(resolve,reject){
        console.log(params);
        var query={
            "selector": {
               "fbId": {
                  "$eq": params.fbId
               }
            }
          }
            userDB.find(query,(err,body)=>{
              if(err){
                console.log('err getting cloudant')
                reject ({resData:'error'})
              }else{
                console.log("body",body);
                resolve({"conversation":body.docs[0]})
              }
            })
      })

//    return {values:params.phoneNumber}
  }

  //exports.main({fbId:"12345"})
