var canv = document.createElement('canvas');    
canv.setAttributeNS(null,'id','arctext');
canv.setAttributeNS(null,'style','border: 1px solid');

canv.setAttributeNS(null,'width',800);
canv.setAttributeNS(null,'height',600);
var ctx = canv.getContext('2d'),
    font = '64px impact',
    strokFont = '64px impact',
    w = canv.width,
    h = canv.height,
    offsetY,
    curve,
    textHeight,
    bottom=300,
    angleSteps = 180 / (w*10),
    i = w,
    y,
    startYPos = 200,
    os = document.createElement('canvas'),
    octx = os.getContext('2d');

function createText(data){
    // w = data['width'];
    // h = data['height'];
    os.width = w;
    os.height = h;
    font = data['font-size'] + 'pt' +' ' + data['font-family']
    octx.font = font;
    octx.textBaseline = 'top'//data['baseline'];
    octx.strokeStyle = data['stroke'];
    octx.fillStyle = data['fill'];
    octx.textAlign = 'center';
    document.getElementById("text_svg").appendChild(canv); 
    renderText(data);
}
function renderText(data) {
        console.log(data);
        curve = parseInt(data['curve'],10);
        emboss = parseFloat(data['emboss']);

        textHeight = parseInt(data['font-size'],10) * 3 + 50;
        vCurve.innerHTML = curve;
        vEmboss.innerHTML = emboss;
        octx.clearRect(0, 0, w, h);
        ctx.clearRect(0, 0, w, h);
        if (data['baseline'] == 'top') {
            offsetY = 15;
        }
        else{
            offsetY = 64;
        }
        font = data['font-size'] + 'pt' +' ' + data['font-family']
      

        octx.font = font;
        octx.lineCap="round";        
        octx.lineJoin="round";        
        octx.strokeStyle = data['stroke'];
        octx.lineWidth = data['stroke-width'];
        /* Emboss */
        if (data['shadow-direction'] =="bottom"){
            emboss = -emboss;
        }
        /* /Emboss */
        octx.shadowColor = "#ffffff";
        octx.shadowOffsetX = emboss; 
        octx.shadowOffsetY = emboss; 
        octx.fillStyle = data['fill'];
        octx.fillText(data['text'], w * 0.5, 0);

        octx.shadowColor = "#000000";
        octx.shadowOffsetX = -emboss; 
        octx.shadowOffsetY = -emboss; 
        octx.fillStyle = data['fill'];
        octx.fillText(data['text'], w * 0.5, 0);
        /* /Emboss */

        /* Outline */
        octx.lineWidth = data['stroke-width'];
        octx.strokeText(data['text'],w * 0.5, 0);
        /* /Outline */
        octx.fillStyle = data['fill'];
        octx.fillText(data['text'], w * 0.5, 0);


        
        
        let otW = octx.measureText(data['text']).width + data['stroke-width'] * 2;
        angleSteps = 180 / otW;
        let offset = (w - otW) / 2;
        let start = otW + (w - otW) / 2;
        let otH = 250;
        textHeight = 200;
        /// slide and dice
        i = otW;
        y = 0;
        
        var rate1 = 0.8 - (100 - parseInt(data['font-size'], 10) * 1.0) / 72.0 * 0.125;
        var rate2 = 0.56 - (100 - parseInt(data['font-size'], 10) * 1.0) / 72.0 * 0.415 + (12 - parseInt(data['font-size'], 10) * 1.0) * 0.07 / 88;
        console.log(rate1, rate2);
        var xstep =0.1;
        ctx.fillStyle = "#333333";
        ctx.fillRect(0, 0, w, h);
        while (i>0) {

            i -=xstep;
            if (data['baseline'] == 'top'){
                y = otH - curve * Math.sin(i * angleSteps * Math.PI / 180);
                ctx.drawImage(os, i + offset, 0, xstep, textHeight,i + offset, startYPos , xstep, y);
            }
            else if (data['baseline'] == 'bottom')
            {   
                y = curve * Math.sin(i * angleSteps * Math.PI / 180) * rate1;
                cy = curve * Math.sin(i * angleSteps * Math.PI / 180) * rate2;
              
                ctx.drawImage(os, i + offset, 0, xstep, textHeight,i + offset, cy+startYPos  , xstep,200 - y);
            }
        }
 } 
 
