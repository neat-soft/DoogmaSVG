var svg;
var svgData;
var sX = 200;
var sY = 400
function createSVG(data){
    svgData = data;
     d3.select("#text_svg")
    .append("svg")
    .attr("id","doogmaTextSVG")
    // .attr("style", "outline: thin solid red;")   //This will do the job
    .attr("width", data['width'])
    .attr("height", data['height']);

    // var s = arc_position(sX, sY, svgData["radius"], Math.PI/2);
    // var e = arc_position(sX, sY, svgData["radius"], (Math.PI * 3)/2);

    svg = d3.select("#doogmaTextSVG");
    var text = svg.append("text");
    if (data["style"] == "curved"){
        var textPath = svg.append("defs").append("path")
        .attr("id", "textPath")
        .attr("d", describe_arc(sX,sY,svgData["radius"],(Math.PI * 3)/2, (Math.PI * 1)/2));        
        text = text.append("textPath")
	    .attr("xlink:href", "#textPath");
    }
    
    text.text(data["text"])
        .attr("font-family", data["font-family"])
        .attr("font-weight", "bold")
        .attr("font-size", data["font-size"])
        .attr("x", sX)
        .attr("y", sY)
        .attr("stroke", data["stroke"])
        .attr("stroke-width", data["stroke-width"])
        .attr("stroke-linecap", "butt")
        .attr("stroke-linejoin", "round")
        .attr("vector-effect","non-scaling-stroke")
        .attr("fill", data["fill"])
        .attr("paint-order","stroke")
        .attr("transform", "translate(200,200)");
}

function renderSVG(data){
    svgData = data;
    console.log(data);
    svg = d3.select("#doogmaTextSVG");
    svg.attr("width",data["width"])
        .attr("height",data["height"]);
    d3.select("text").remove();
    var text = svg.append("text");
    if (data["style"] == "curved"){
        var textPath = d3.select("path");
        console.log(textPath);
        if (textPath == null)
            {
                textPath = svg.append("defs").append("path").attr("id","textPath");
            }
        textPath.attr("id","textPath")
        .attr("d", describe_arc(sX,sY,200,(Math.PI * 3)/2, (Math.PI * 3)/1));        
        text = text.append("textPath")
	    .attr("xlink:href", "#textPath");
    }
    
    text.text(data["text"]); 
    for (var property in data) {
        text.attr(property,data[property]);
    }
    text.attr("paint-order","stroke")
        .attr("stroke-linecap", "butt")
        .attr("stroke-linejoin", "round")
        .attr("vector-effect","non-scaling-stroke")
        .attr("x", sX)
        .attr("y", sY)
        .attr("transform", "translate(200,200)");
        
}
console.log("get path");
function getPathData() {
    // adjust the radius a little so our text's baseline isn't sitting directly on the circle

    /*var r = svgData["radius"] * 0.8;
    var startX = svgData["width"]/4;
    var height = 200;
    // return 'm' + startX + ',' + (height/2) + ' ' +
    //   'a' + r + ',' + r + ' 0 0 0 ' + (2*r) + ',0';
    return 'M ' + startX + ' ' + (height/2) + ' ' +
    'q ' + (startX+r) + ' ' + (-r) + ' ' + (startX+2*r) + ' ' + (height*2);*/


  }

  function arc_position(x, y, radius, angle) {
    return {
      x: x + (radius * Math.cos(angle)),
      y: y + (radius * Math.sin(angle))
    };
  }

  function describe_arc(x, y, radius, startAngle, endAngle) {
    
          var s = arc_position(x, y, radius, startAngle);
          var e = arc_position(x, y, radius, endAngle);
    
          var sweep = e - s <= 180 ? '0' : '1';
    
          var d = [
            'M', s.x, s.y,
            'A', radius, radius, 0, 1, 1, e.x, e.y
          ].join(' ');
          return 'M 100,300 A 200,200 0 0,1 400,300';
          //return d;
}
