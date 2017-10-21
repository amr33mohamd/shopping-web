exports.login = function(email,password,callback){
    sql.tselect('users','email',email,'password',password,'work','1',function(data){
    	if(data.length != 0){
    		callback(true);
    	}
    	else{
    		callback(false);
    	}
    }) 
};