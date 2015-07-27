var SBuffer=function(n,d){
	this.n=n;
	this.d=d?parseInt(n/d):0;
	this.g=0;
	this.b=new Buffer(n);
	this.p=0;
	this.a=[];
	this.m={};
	this.f=function(p){this.p=p;this.d=false;};
};
SBuffer.prototype.write=function(s,m){
	if(this.p>this.n){return null;}else{
		var l=0;
		if(Buffer.isBuffer(s)){
			l=s.length;
			if(l>0){s.copy(this.b,this.p);}
		}else if(typeof s==='string'){
			l=this.b.write(s,this.p);
		}
		if(l>0){
			var p=new this.f(this.p);
			this.a.push(p);
			p.l=l;
			p.i=this.a.length-1;
			var d=-1;
			if(typeof m==='string'){
				if(m in this.m){d=this.m[m];}
				p.m=m;this.m[m]=p.i;
			}
			this.p+=l;
			if(this.a[d]){this.delete(this.a[d],'_del_');}
			if(this.p>this.n){return null;}else{return p;}
		}else{return null;}
	}
};
SBuffer.prototype.read=function(p){
	if(typeof p==='object'){
		return 'd' in p&'i' in p&&!p.d&&this.a[p.i]?this.b.slice(p.p,p.p+p.l):undefined;
	}else if(typeof p==='string'){
		return p in this.m&&this.a[this.m[p]]&&!this.a[this.m[p]].d?this.b.slice(this.a[this.m[p]].p,this.a[this.m[p]].p+this.a[this.m[p]].l):undefined;
	}else{return undefined;}
};
SBuffer.prototype.delete=function(p,d){
	if(typeof p==='object'&&'d' in p&'i' in p&&!p.d&&this.a[p.i]){
		p.d=true;
		this.g+=p.l;
		if(d!=='_del_'&&p.m&&p.m in this.m){delete this.m[p.m];}
		if(this.g>=this.d){this.gc(0,0);}
		return true;
	}else if(typeof p==='string'&&p in this.m&&this.a[this.m[p]]&&!this.a[this.m[p]].d){
		this.a[this.m[p]].d=true;
		this.g+=this.a[this.m[p]].l;
		delete this.m[p];
		if(this.g>=this.d){this.gc(0,0);}
		return true;
	}else{return false;}
};
SBuffer.prototype.gc=function(k,x){
	for(var i=k,l=this.a.length;i<l;i++){
		if(this.a[i].d){
			x+=this.a[i].l;
			this.p-=this.a[i].l;
			this.a.splice(i,1);
			this.gc(i,x);
			break;
		}else if(x>0){
			this.b.copy(this.b,this.a[i].p-x,this.a[i].p,this.a[i].p+this.a[i].l);
			if(this.a[i].m){this.m[this.a[i].m]=i;}
			this.a[i].i=i;
			this.a[i].p-=x;
		}
	}
	this.g=0;
};
SBuffer.prototype.reset=function(){
	this.g=0;
	this.p=0;
	this.a=[];
	this.m={};
};
module.exports=SBuffer;
