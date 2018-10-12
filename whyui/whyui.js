;(function(window,undefined){
	document.onselectstart=function(){return false;};

	//radio 初始化
	var radios = document.getElementsByClassName("why-radio");
	for(var k1 = 0;k1 < radios.length;k1++){
		var radiospan = document.createElement("span");
		var radioname = radios[k1].getAttribute("name");
		var radiolabel = radios[k1].getAttribute("label");
		var radioparent = radios[k1].parentNode;
		radiospan.classList.add("why-radio-s");
		radiospan.setAttribute("name",radioname);
		var radiochild1 = document.createElement("span");
		radiochild1.classList.add("why-radio-1");
		var radiochild2 = document.createElement("span");
		radiochild2.classList.add("why-radio-2");
		radiochild2.innerHTML = radiolabel;

		radiospan.appendChild(radiochild1);
		radiospan.appendChild(radiochild2);
		radiospan.appendChild(radios[k1]);

		radioparent.appendChild(radiospan);
	}

	var newradios = document.getElementsByClassName("why-radio-s");
	for(var k2 = 0;k2 < newradios.length;k2++){
		newradios[k2].onclick = function(i){
			var activeradio = document.getElementsByClassName("radio-selected");
			return function(){
				for(var m = 0;m < activeradio.length;m++){
					if(newradios[i].getAttribute("name") === activeradio[m].getAttribute("name")){
						activeradio[m].children[2].checked = false;
						activeradio[m].classList.remove("radio-selected");
					}
				}
				newradios[i].classList.add("radio-selected");
				newradios[i].children[2].checked = true;
			}
		}(k2)
	}

	//checkbox 初始化
	var checks = document.getElementsByClassName("why-checkbox");
	for(var k3 = 0;k3 < checks.length;k3++){
		var checkspan = document.createElement("span");
		var checkname = checks[k3].getAttribute("name");
		var checklabel = checks[k3].getAttribute("label");

		var checkparent = checks[k3].parentNode;
		checkspan.classList.add("why-checkbox-s");
		checkspan.setAttribute("name",checkname);
		var checkchild1 = document.createElement("span");
		checkchild1.classList.add("why-checkbox-1");
		var checkchild2 = document.createElement("span");
		checkchild2.classList.add("why-checkbox-2");
		checkchild2.innerHTML = checklabel;

		checkspan.appendChild(checkchild1);
		checkspan.appendChild(checkchild2);
		checkspan.appendChild(checks[k3]);

		checkparent.appendChild(checkspan);
	}

	var newchecks = document.getElementsByClassName("why-checkbox-s");
	for(var k4 = 0;k4 < newchecks.length;k4++){
		newchecks[k4].onclick = function(i){
			return function(){
				if(newchecks[i].className.indexOf("checkbox-checked") > -1){
					newchecks[i].children[2].checked = false;
					newchecks[i].classList.remove("checkbox-checked");
				} else {
					newchecks[i].children[2].checked = true;
					newchecks[i].classList.add("checkbox-checked");
				}
			}
		}(k4)
	}

	//radio-group 初始化
	var newradiobtns = document.getElementsByClassName("why-radio-btn");
	for(var k5 = 0;k5 < newradiobtns.length;k5++){
		newradiobtns[k5].onclick = function(i){
			return function(){
				var newradiobtn_parent = newradiobtns[i].parentNode;
				var newradiobtn_group = newradiobtn_parent.children;
				for(var k6 = 0;k6 < newradiobtn_group.length;k6++){
					if(newradiobtn_group[k6].className.indexOf("rb-selected") > -1){
						newradiobtn_group[k6].classList.remove("rb-selected");
						break;
					}
				}
				newradiobtns[i].classList.add("rb-selected");
			}
		}(k5)
	}

	//message 弹框
	var WhyMessage = function(){
		this._initial();
	};
	WhyMessage.prototype = {
		constructor: this,
		_initial: function(){
			var _this = this;
			this.whyshadow = document.createElement("div");
			this.whyshadow.classList.add("why-shadow");

			this.whymsg = document.createElement("div");
			this.whymsg.classList.add("why-msg");

			this.whytitle = document.createElement("div");
			this.whytitle.classList.add("why-shadow-title");
			
			this.whyclose = document.createElement("span");
			this.whyclose.classList.add("why-shadow-close");

			this.whyclose.onclick = function(){
				_this._hide();
			}

			this.whycontent = document.createElement("div");
			this.whycontent.classList.add("why-shadow-content");
			
			this.whybtns = document.createElement("div");
			this.whybtns.classList.add("why-shadow-btns");
		},
		_show: function(){
			document.body.appendChild(this.whyshadow);
			this.whyshadow.style.animation = "whyshadow_ani_in 0.5s forwards";
			this.whymsg.style.animation = "whymsg_ani_in 0.5s forwards";
			this.whyshadow.style.display = "block";
		},
		_hide: function(){
			var _this = this;
			this.whyshadow.style.animation = "whyshadow_ani_out 0.5s forwards";
			this.whymsg.style.animation = "whymsg_ani_out 0.5s forwards";
			setTimeout(function(){
				_this.whyshadow.style.display = "none";
				document.body.removeChild(_this.whyshadow);
			}, 500);
		},
		alert: function(content,title,opt){
			var _this = this;
			var def = {
				confirmText: "确定",
				confirm: function(){},
			}
			def = extend(def,opt,true);

			this.whytitle.innerHTML = title;
			this.whytitle.appendChild(this.whyclose);
			this.whymsg.appendChild(this.whytitle);
			this.whycontent.innerHTML = content;
			this.whymsg.appendChild(this.whycontent);

			this.whybtns.innerHTML = "";
			var confirmbtn = document.createElement("button");
			confirmbtn.className = "why-btn why-btn-small why-btn-success";
			confirmbtn.innerHTML = def.confirmText;
			confirmbtn.onclick = function(){
				def.confirm();
				_this._hide();
			};
			this.whybtns.appendChild(confirmbtn);

			this.whymsg.appendChild(this.whybtns);

			this.whyshadow.appendChild(this.whymsg);
			this._show();
		},
		confirm: function(content,title,opt){
			var _this = this;
			var def = {
				confirmText: "确定",
				cancelText: "取消",
				confirm: function(){},
				cancel: function(){}
			}
			def = extend(def,opt,true);

			this.whytitle.innerHTML = title;
			this.whytitle.appendChild(this.whyclose);
			this.whymsg.appendChild(this.whytitle);
			this.whycontent.innerHTML = content;
			this.whymsg.appendChild(this.whycontent);

			this.whybtns.innerHTML = "";

			var cancelbtn = document.createElement("button");
			cancelbtn.className = "why-btn why-btn-small why-btn-info";
			cancelbtn.innerHTML = def.cancelText;
			cancelbtn.onclick = function(){
				def.cancel();
				_this._hide();
			}
			this.whybtns.appendChild(cancelbtn);

			var confirmbtn = document.createElement("button");
			confirmbtn.className = "why-btn why-btn-small why-btn-success";
			confirmbtn.innerHTML = def.confirmText;
			confirmbtn.onclick = function(){
				def.confirm();
				_this._hide();
			};
			this.whybtns.appendChild(confirmbtn);

			this.whymsg.appendChild(this.whybtns);

			this.whyshadow.appendChild(this.whymsg);
			this._show();
		}
	}

	function extend(o,n,override){
		for(var key in n){
	        if(n.hasOwnProperty(key) && (!o.hasOwnProperty(key) || override)){
	            o[key]=n[key];
	        }
	    }
	    return o;
	}

	window.why = new WhyMessage();
}(window));