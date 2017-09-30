exports.select = function(table,what,that,callback){
  
    var sql = "SELECT * FROM `"+table+"` WHERE "+what+" = ? order by id desc";
    con.query(sql,[that],function(res,err){
    	if(err){
    		callback(err);
    	}
    	else{
    		callback(res);
    	}
    });  
};
exports.selectAll = function(table,callback){
  
    var sql = "SELECT * FROM `"+table+"";
    con.query(sql,function(res,err){
    	if(err){
    		callback(err);
    	}
    	else{
    		callback(res);
    	}
    });  
};
exports.dselect = function(table,what,that,what1,that1,callback){
  
    var sql = "SELECT * FROM `"+table+"` WHERE "+what+" = ? and "+what1+" = ? order by id desc";
    con.query(sql,[that,that1],function(res,err){
    	if(err){
    		callback(err);
    	}
    	else{
    		callback(res);
    	}
    });  
};