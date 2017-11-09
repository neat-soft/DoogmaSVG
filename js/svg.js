var svg;
var svgData;
var sX = 200;
var sY = 200
function createSVG(data){
    svgData = data;
     d3.select("#text_svg")
    .append("svg")
    .attr("id","doogmaTextSVG")
    // .attr("style", "outline: thin solid red;")   //This will do the job
    .attr("width", data['width'])
    .attr("height", data['height']);


    svg = d3.select("#doogmaTextSVG");
    var text = svg.append("text");
    if (data["style"] == "curved"){
        var textPath = svg.append("defs").append("path")
        .attr("id", "textPath")
        .attr("d", getPathData);
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
        .attr("fill", data["fill"])
        .attr("paint-order","stroke");

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
                .attr("d", getPathData);
        text = text.append("textPath")
	    .attr("xlink:href", "#textPath");
    }
    
    text.text(data["text"]); 
    for (var property in data) {
        text.attr(property,data[property]);
    }
    text.attr("paint-order","stroke")
        .attr("x", sX)
        .attr("y", sY)
        
}

function getPathData() {
    // adjust the radius a little so our text's baseline isn't sitting directly on the circle

    var r = svgData["radius"] * 0.8;
    var startX = svgData["width"]/4;
    var height = 200;
    // return 'm' + startX + ',' + (height/2) + ' ' +
    //   'a' + r + ',' + r + ' 0 0 0 ' + (2*r) + ',0';
    return 'M ' + startX + ' ' + (height/2) + ' ' +
    'q ' + (startX+r) + ' ' + (-r) + ' ' + (startX+2*r) + ' ' + (height*2);
  }