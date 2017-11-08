'use strict';

window.doogmatextlogo = {
    _internal:{
        base: window.hasOwnProperty('doogma')? doogma.rootUrlRes+'/text-logo/':'',
        artCreator:{},
        emptySvg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>'
    }
};

(function() {
    window.doogmatextlogo.create = create;

    var lib = window.doogmatextlogo._internal;

    var font = {};
    var requestQ = {};
    
    // Initialization
    
    // Get Designer Base URL
    lib.fontBase = 'e2im.doogma.com/smartmobile-v2/fonts-renamed';
    lib.fontBase64Service = 'e2im.doogma.com/smartmobile-v2/create-base64-font.php';
    if(/(\?|&)nocdn(=|&|$)/.test(window.location.search)) {
        lib.fontBase = 'cdn'+lib.fontBase;
    }
    lib.fontBase = '//'+lib.fontBase;
    lib.fontBase64Service = '//'+lib.fontBase64Service;
    // End: Initialization
    
    function create(option, callback) {
        var fontFamily = option['font-family'] = option['font-family'].replace(/[\W_]/g,'').trim().toLowerCase();
        var text = option['text'] = option['text'].replace(/ /g,'&#160;');  // Preserve whitespace.
        if(fontFamily && /\S/.test(text)) {
        	return lib.getArt(option, callback);
        }
        callback(lib.emptySvg);
    }
})();

/**
 * Checks if a url can be downloaded
 * @param url {String} Url to check
 * @param callback {Function}
 * 				function(result){}. result is Boolean, if true then url can be downloaded.
 * @returns {Function} Abort function.
 */
window.doogmatextlogo._internal.checkUrlOk = function checkUrlOk(url,callback){
	var abortFn;
	var http = new XMLHttpRequest();
    http.open('HEAD', url);
    http.onreadystatechange = handleState;
    abortFn = abort;
    http.send();
    return function(){
    	abortFn();
    };
    
    function handleState(){
    	if(http.readyState==4) {
    		var ok = http.status==200;
    		abortFn = new Function;
    		http.onreadystatechange = null;
    		http = null;
    		callback(ok);
    	}
    }
    
    function abort(){
    	abortFn = new Function;
    	http.onreadystatechange = null;
    	http.abort();
    	http = null;
    }
};
/**
 * Loads and Executes a script. This functions guarantees that script executes before success callback call.
 * @param {object} option
 *      option.url          URL of the script to load.
 *      option.headers      request headers in a plain object with "property" as "header-name" and "value" as "header-value"
 *      option.jqueryVar    jquery variable name, if present then the code will be wrapped in an IIFE with "$" and "jQuery" local variables holding the passed jquery variable reference.
 *      option.sourceURL    if present then code will be appended by "//# sourceURL=sourceURL".
 *                          otherwise, script url will be used as sourceURL.
 *      option.modifier     a function that can modify the script code, arguments: code {String}, returns modified code
 *      option.success      success callback, it will be called only after the script has finished executing or script encountered an error while executing.
 *      option.error        load error callback
 *      option.complete     load complete callback
 * @returns {Function} abort function
 */
window.doogmatextlogo._internal.loadScript = function loadScript(option) {
    var lib = window.doogmatextlogo._internal;
    
    if (typeof option != 'object' || !option
            || typeof option.url==='undefined' || option.url===null)
        return function () {};

    var _abort, _abortLoad;
    var head = document.getElementsByTagName("head")[0];
    var script;

    var fName = 'testExec_' + String(Math.random()).slice(2,9)+new Date().getTime();
    window[fName] = function () {
        delete window[fName];
        head.removeChild(script);
        _abort = new Function;
        if (typeof option.success == 'function') {
            option.success();
        }
    };

    _abortLoad = lib.loadUrl({
        url: option.url,
        headers:option.headers,
        success: function(code){
            _abortLoad=new Function;
            _insertScript(code);
        },
        error: _loadError,
        complete: option.complete
    });

    _abort = _abortScript;
    return function () {
        _abort();
    };

    function _insertScript(code) {
        if(typeof option.modifier == 'function') {
            code = option.modifier(code);
        }
        
        var strictMode=/^(\s||(\/\/[^\n]*\n)||(\/\*[^\*\/]*\*\/))*('use strict'||"use strict")(\s||(\/\/[^\n]*\n)||(\/\*[^\*\/]*\*\/))*;/.test(code);
        code = 'try{\n//------ Script Main Code Starts Here ------//\n\n'
                + code
                + '\n\n//------ Script Main Code Ends Here ------//\n'
                + '}catch(e){\nsetTimeout(function(){\n'
                + 'console.error(e.stack.replace("Unknown script code","' + option.url + '"));\n' // For IE (IE shows dynamic script name as "Unknown script code")
                + 'throw(e);\n'
                + '},0);\n'
                + '}\n';
        if(option.jqueryVar){
            code = '(function($,jQuery){\n'
                + code
                + '})('+option.jqueryVar+','+option.jqueryVar+');\n';
        }
        code += 'window["' + fName + '"]();';
        if(strictMode){
            code='"use strict";\n'+code;
        }
        var sourceURL = typeof option.sourceURL=='undefined'? option.url : option.sourceURL;
        code += '\n//# sourceURL=' + sourceURL;
        script = document.createElement('script');
        script.type = 'text/javascript';
        script.textContent = code;
        head.appendChild(script);
    }

    function _loadError(msg) {
        delete window[fName];
        _abort = new Function;
        if (typeof option.error == 'function') {
            option.error(msg);
        }
    }

    function _abortScript() {
        _abort = new Function;
        delete window[fName];
        _abortLoad();
    }
};

/**
 * Loads Url data
 * @param {object} option
 *		option.url		url string
 *		option.headers	request headers in a plain object with "property" as "header-name" and "value" as "header-value"
 *		option.success	success callback
 *		option.error	error callback
 *      option.complete complete callback
 * @returns {Function} Abort function
 */
window.doogmatextlogo._internal.loadUrl = function loadUrl(option) {
	if (typeof option != 'object' || !option)
		return function () {};
	var req = new XMLHttpRequest();
	req.onreadystatechange = function () {
		if (req.readyState == 4) { // DONE
			if (req.status == 200) { // SUCCESS
				if (/^\{"error": ".*"}$/.test(req.responseText)) { // Actually ERROR
					if (typeof option.error == 'function') {
						option.error(req.responseText);
					}
				} else if (typeof option.success == 'function')
					option.success(req.responseText);
			} else {
				if (typeof option.error == 'function') {
					if (req.statusText)
						option.error(req.statusText);
					else
						option.error('Error loading url ' + option.url);
				}
			}
            if(typeof option.complete == 'function') {
                option.complete();
            }
		}
	};
	try {
		req.open("GET", option.url);
		if(option.headers && typeof option.headers=='object'){
			for(var h in option.headers){
				req.setRequestHeader(h,option.headers[h]);
			}
		}
		req.send();
	} catch (e) {
		if (typeof option.error == 'function')
			option.error(e);
	}

	return function () {
		req.onreadystatechange = null;
		req.abort();
	};
};


(function() {
    var lib = window.doogmatextlogo._internal;
    
    lib.getArt = getArt;
    
    var queue = {};
    
    function getArt(option, callback) {
        var abortFn;
        
        var name = option.style;
        if(lib.artCreator.hasOwnProperty(name)) {
            return lib.artCreator[name](option, callback);
        }
        
        // Enqueue request
        abortFn = leaveQueue;
        var qitem = [qitemAccept, qitemReject];
        if(queue.hasOwnProperty(name)) {
            queue[name].push(qitem);
        } else {
            queue[name] = [qitem];
            
            // Load Art creator js
            lib.loadScript({
                url: lib.base+'arts/'+name+'/'+name+'-art-creator.js',
                success: function() {
                    // Accept queue items
                    var q = queue[name];
                    for(var i=0; i<q.length; i++) {
                        q[i][0]();
                    }
                }, error: function() {
                    // Reject queue items
                    var q = queue[name];
                    for(var i=0; i<q.length; i++) {
                        q[i][1]();
                    }
                }, complete: function() {
                    delete queue[name];
                }
            });
        }
        
        function qitemAccept() {
            abortFn = lib.artCreator[name](option, callback);
        }
        
        function qitemReject() {
            abortFn = new Function;
            callback(lib.emptySvg);
        }
        
        function leaveQueue() {
            abortFn = new Function;
            queue.splice(queue.indexOf(qitem),1);
        }

        return function() {
            abortFn();
        };
    }
})();