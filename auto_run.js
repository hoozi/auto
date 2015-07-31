/**
 * @authors : hoozi
 * @webSite : https://github.com/hoozi 
 * @email   : 287036406@qq.com
 * @date    : 2015-07-31 10:44:03
 * @version : 0.0.1
 */
(function(root, factory){
	if(typeof define === "function" && (define.amd || define.cmd)) {
		define("autoRun", factory);
	} else {
		root.autoRun = factory();
	}
})(typeof window !== "undefined" ? window : this, function(){
	var autoRun = function(fn){
		var gt = fn();
		if(!typeof gt.next === "function") return;

		function next(data){
			var ret = gt.next(data);
			if(ret.done) return;
			ret.value(next);
		}
		next();
	}
	return autoRun;
});