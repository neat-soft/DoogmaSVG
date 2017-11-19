var canv = document.createElement('canvas');    
canv.setAttributeNS(null,'id','arctext');
canv.setAttributeNS(null,'width',500);
canv.setAttributeNS(null,'height',400);
var ctx = canv.getContext('2d'),
    font = '64px impact',
    strokFont = '64px impact',
    w = canv.width,
    h = canv.height,
    offsetY,
    curve,
    textHeight,
    bottom=200,
    angleSteps = 180 / w,
    i = w,
    y,
    os = document.createElement('canvas'),
    octx = os.getContext('2d');

function createText(data){
    // w = data['width'];
    // h = data['height'];
    os.width = w;
    os.height = h;
    font = data['font-size'] + 'px' +' ' + data['font-family']
    octx.font = font;
    octx.textBaseline = data['baseline'];
    octx.strokeStyle = data['stroke'];
    octx.fillStyle = data['fill'];
    octx.textAlign = 'center';
    document.getElementById("text_svg").appendChild(canv); 
    renderText(data);
}
function renderText(data) {
        console.log(data);
        curve = parseInt(data['curve'],10);
        // bottom = parseInt(data['bottom'],10);
        textHeight = parseInt(data['font-size'],10);
        vCurve.innerHTML = curve;
        // vBottom.innerHTML = bottom;
        // w = data['width'];
        // h = data['height'];
        octx.clearRect(0, 0, w, h);
        ctx.clearRect(0, 0, w, h);
        if (data['baseline'] == 'top') {
            offsetY = 15;
        }
        else{
            offsetY = 64;
        }
        font = data['font-size'] + 'px' +' ' + data['font-family']
        octx.font = font;
        octx.strokeStyle = data['stroke'];
        octx.fillStyle = data['fill'];
        octx.fillText(data['text'].toUpperCase(), w * 0.5, 0);
        // strokeFont = parseInt(data['font-size'],10) + parseInt(data['stroke-width'],10) + 'px' +' ' + data['font-family']
        // octx.font = strokeFont;
        // console.log(strokeFont);
        octx.stroke();
        // octx.strokeText(data['text'].toUpperCase(),w * 0.5, 0);
        /// slide and dice
        i = w;
        y = 0;
        while (i--) {
            y = bottom - curve * Math.sin(i * angleSteps * Math.PI / 180);
            console.log(y);
            ctx.drawImage(os, i, 0, 1, textHeight,i, h * 0.5 - offsetY / textHeight * y, 1, y);
        }
        // ctx.drawImage(os, 0, 0, w,h);
 } 
 
