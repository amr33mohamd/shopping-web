app.get('/',function(req,res){
	sql.select('items','type','1',function(trade){
		sql.select('items','type','2',function(pluse){
			sql.select('items','type','3',function(sale){
				res.render('index',{trade,pluse,sale,id:'no'});
			});
		});
	});
});

app.get('/filter/:id/:cat?',function(req,res){
	var id = req.params.id;
	var cat = req.params.cat;
	if(cat != null){
		sql.dselect('items','type',id,'categories_id',cat,function(data){
			sql.select('categories','1','1',function(categories){
				res.render('filter',{data,id,categories});
			});
		});
	}
	else{
		sql.select('items','type',id,function(data){
			sql.select('categories','1','1',function(categories){
				res.render('filter',{data,id,categories});
			});
		});
	}
});

app.get('/single/:id',function(req,res){
	var id = req.params.id;
	sql.select('items','id',id,function(data){
		res.render('single',{data,id:'yes'});
	});
});

app.get('/login',function(req,res){
	
				res.render('login',{id:'no'});
		
});




//--------------------------------------------- Api ---------------------------------------------------------//
app.get('/api/login',function(req,res){
	var email = req.param('email');
	var password = req.param('password');
	helper.login(email,password,function(data){
		res.send(data);
	})		
});