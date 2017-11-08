(function doogmaTextLogoDemo() {
    
    (function initialize() {
        var options = document.querySelector('form').elements;
        for(var i=0; i<options.length; i++) {
            var _option = options[i];
            _option.addEventListener('change',onInput);
        }
        onInput();
    })();
    
    function onInput() {
        render(getOptions());
    }
    
    function getOptions() {
        var data = {scale:1};
        var options = document.querySelector('form').elements;
        for(var i=0; i<options.length; i++) {
            var _option = options[i];
            data[_option.name] = _option.value || _option.placeholder || _option.value;
        }
        return data;
    }
    
    function render(data) {
        renderSVG(data);
    }
})();

$(document).ready(function() {
    var data = {scale:1};
    var options = document.querySelector('form').elements;
    for(var i=0; i<options.length; i++) {
        var _option = options[i];
        data[_option.name] = _option.value || _option.placeholder || _option.value;
    }
    createSVG(data);
});
