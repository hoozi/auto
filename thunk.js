/**
 * @authors : hoozi
 * @webSite : https://github.com/hoozi 
 * @email   : 287036406@qq.com
 * @date    : 2015-07-31 10:27:11
 * @version : 0.0.1
 */
(function(root, factory){
	if(typeof define === "function" && (define.amd || define.cmd)) {
		define("thunk", factory);
	} else {
		root.thunk = factory();
	}
})(typeof window !== "undefined" ? window : this, function(){
	var thunk = function(fn){
		var _this = this;
		return function(){
			var len = arguments.length;
			var args = new Array(len);

			for(var i = 0; i<len; i++) {
				args[i] = arguments[i];
			}

			return function(cb) {
				var runed;

				args.push(function(){

					//确保只运行一次callback
					if(runed) return;
					runed = true;	
					cb.apply(null, arguments);
				});
				try {
					fn.apply(_this, args);
				}catch(e) {
					console.log(e);
				}
			}
		}
	}
	return thunk;
});