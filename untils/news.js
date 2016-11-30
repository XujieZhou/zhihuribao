var t={
	format:function(src){
	  return 'http://images.weserv.nl?url='+src.slice(7)
	},
	formatarr:function (arr){
		var t=[];
		for(var i=0;i<arr.length;i++){
				var v=arr[i];
				if(v.image) {
						v.image=this.format(v.image);
				}else if(v.images){
						v.image=this.format(v.images[0]);
				}else if(v.avatar){
                    v.image=this.format(v.avatar)
                }else{
						v.image='/imgs/1.png'
				}
				t.push(v);
		}
		return t;
	},
	formatDate:function(date){
       
        var y=date.getFullYear();
        var m=date.getMonth()+1;
        var d=date.getDate();
        m=(m<10)?('0'+m):m;
        d=(d<10)?('0'+d):d;
        return ''+y+m+d;
    },
    before:function(date){
        return new Date(
            date.getFullYear(),
            date.getMonth()+1,
            date.getDate()
        )
    }
}

module.exports=t;