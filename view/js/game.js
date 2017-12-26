function Game(){
	//自有属性
	this.boxs=$(".game-box div[class^='gr']");
	this.numArr=[]
	this.level = 4;	
	this.init();
	this.isEnd=false;
}

Game.prototype = {
	init:function(){
		this.isEnd=false;
		this.numArr=[]
		this.ModelTurnTwo()
		this.RandomPutNumber()
		this.RandomPutNumber()
		this.ShowNumber()
		this.addEvent()
		console.log(this.numArr)
	},
	ModelTurnTwo:function(){//一维数组转换为二维数组
		for (var r = 0;r<this.level;r++) {			
			var arr=[];
			for (var c = 0;c<this.level;c++) {			
				arr.push(0)				
			}
			this.numArr.push(arr)
		}
	},
	RandomPutNumber:function(){//随机放入2或4
		//1.先找见空的位置
		var tempty=[];
		for (var r = 0;r<this.level;r++) {	
			for (var c = 0;c<this.level;c++) {			
				if(this.numArr[r][c]==0){
					tempty.push({r:r,c:c})
				}
			}
		}
		//从空位置中随机找一个位置，放入2或者4
		if(tempty.length){
			var randomPosition = Math.floor(Math.random()*tempty.length);
			var randomRC=tempty[randomPosition]
			var num = Math.random()>0.5?2:4			
			this.numArr[randomRC.r][randomRC.c]=num
			
		}		
	},
	ShowNumber:function(){
		for (var r = 0;r<this.level;r++) {	
			for (var c = 0;c<this.level;c++) {			
				var num = this.numArr[r][c];
				var box = this.boxs[r*this.level+c];				
				switch(num){
					case 0:$(box).attr("data-num",num).html('');break;
					case 2:$(box).attr("data-num",num).html('2');break;
					case 4:$(box).attr("data-num",num).html('4');break;
					case 8:$(box).attr("data-num",num).html('8');break;
					case 16:$(box).attr("data-num",num).html('16');break;
					case 32:$(box).attr("data-num",num).html('32');break;
					case 64:$(box).attr("data-num",num).html('64');break;
					case 128:$(box).attr("data-num",num).html('128');break;
					case 256:$(box).attr("data-num",num).html('256');break;
					case 512:$(box).attr("data-num",num).html('512');break;
					case 1024:$(box).attr("data-num",num).html('1024');break;
					case 2048:$(box).attr("data-num",num).html('2048');break;
				}
				
			}
		}
	},
	addEvent:function(e){
		var that = this;
		document.onkeydown = function(e){
			var e = e || window.event;
			var keyCode = e.keyCode;
			switch(keyCode){
				case 38:
					that.upAction();
					break;
				case 40:
					that.downAction();
					break;
				case 37:
					that.leftAction();
					break;
				case 39:
					that.rightAction();
					break;
			}
		}
	},
	upAction:function(){
		//向上滑的时候，和列数无关，每一列操作都一样
		//依次从上到下遍历每一列，找见离当前数最近的非零数，如果当前数为0，互换位置，下次遍历依然从这个位置开始，如果当前数和最近非零数相等，当前数*=2，非零数变成0，继续向下遍历，如果不属于上面情况的话，继续向下遍历
				
		for(var c = 0;c<this.level;c++){
			for(var r = 0;r<this.level-1;r++){
				//找见最近的非零行数
				 var _r = this.GetNearNumberFromDown(r,c);
				 //如果下面都是0，说明这一列完事儿了
				 if(_r==-1){
				 	break;
				 }else{
				 	//如果当前数为0，互换位置，保留此次r值
				 	if(this.numArr[r][c]==0){
				 		this.numArr[r][c]=this.numArr[_r][c];
				 		this.numArr[_r][c]=0;
				 		r--;
				 	}else if(this.numArr[r][c]==this.numArr[_r][c]){
				 		//如果当前数和非零数相等的话，就相加....  加分
				 		this.numArr[r][c]*=2;
				 		this.numArr[_r][c]=0;
				 		
				 	}
				 	
				 }
			}
		}
		this.ActionEnd()
	},
	GetNearNumberFromDown:function(r,c){//找见每一行下面的最近非零数
		for(var _r = r+1;_r<this.level;_r++){
			if(this.numArr[_r][c]!=0){
				return _r
			}
		}
		
		return -1;
	},
	downAction:function(){//向下滑
			
		for(var c = 0;c<this.level;c++){
			for(var r = this.level-1;r>0;r--){
				 var _r = this.GetNearNumberFromUp(r,c);				 
				 if(_r==-1){
				 	break;
				 }else{				 	
				 	if(this.numArr[r][c]==0){
				 		this.numArr[r][c]=this.numArr[_r][c];
				 		this.numArr[_r][c]=0;
				 		r++;
				 	}else if(this.numArr[r][c]==this.numArr[_r][c]){				 		
				 		this.numArr[r][c]*=2;
				 		this.numArr[_r][c]=0;
				 		
				 	}
				 	
				 }
			}
		}
		this.ActionEnd()
	},
	GetNearNumberFromUp:function(r,c){
		for(var _r = r-1;_r>=0;_r--){
			if(this.numArr[_r][c]!=0){
				return _r
			}
		}		
		return -1;
	},
	rightAction:function(){//向右滑			
		for(var r = 0;r<this.level;r++){
			for(var c = this.level-1;c>0;c--){				
				 var _c = this.GetNearNumberFromLeft(r,c);				 
				 if(_c==-1){
				 	break;
				 }else{				 	
				 	if(this.numArr[r][c]==0){
				 		this.numArr[r][c]=this.numArr[r][_c];
				 		this.numArr[r][_c]=0;
				 		c++;
				 	}else if(this.numArr[r][c]==this.numArr[r][_c]){				 		
				 		this.numArr[r][c]*=2;
				 		this.numArr[r][_c]=0;				 		
				 	}				 	
				 }
			}
		}
		this.ActionEnd()
	},
	GetNearNumberFromLeft:function(r,c){
		for(var _c = c-1;_c>=0;_c--){
			if(this.numArr[r][_c]!=0){
				return _c
			}
		}		
		return -1;
	},
	leftAction:function(){//向左滑			
		for(var r = 0;r<this.level;r++){
			for(var c = 0;c<this.level-1;c++){				
				 var _c = this.GetNearNumberFromRight(r,c);				 
				 if(_c==-1){
				 	break;
				 }else{				 	
				 	if(this.numArr[r][c]==0){
				 		this.numArr[r][c]=this.numArr[r][_c];
				 		this.numArr[r][_c]=0;
				 		c--;
				 	}else if(this.numArr[r][c]==this.numArr[r][_c]){				 		
				 		this.numArr[r][c]*=2;
				 		this.numArr[r][_c]=0;				 		
				 	}				 	
				 }
			}
		}
		this.ActionEnd()
	},
	GetNearNumberFromRight:function(r,c){
		for(var _c = c+1;_c<this.level;_c++){
			if(this.numArr[r][_c]!=0){
				return _c
			}
		}		
		return -1;
	},
	iswin:function(){
		for (var r = 0;r<this.level;r++) {		
			for (var c = 0;c<this.level;c++) {
				if(this.numArr[r][c]==2048){
					return true;
				}
			}
		}
		return false
	},
	isLose:function(){
		for (var r = 0;r<this.level;r++) {		
			for (var c = 0;c<this.level;c++) {
				if(this.numArr[r][c]==0){
					return false;
				}				
				if(r<this.level-1&&this.numArr[r][c]==this.numArr[r+1][c]){					
					return false;					
				}
				if(c<this.level-1&&this.numArr[r][c]==this.numArr[r][c+1]){					
					return false;					
				}
				
			}
		}
		return true;
	},
	ActionEnd:function(){//当用户操作结束的时候
		this.RandomPutNumber()
		this.ShowNumber();
		if(this.iswin()){
			alert("you win!");
		}else if(this.isLose()){
			alert("you lose!");
		}
	}
}


var game = new Game();
