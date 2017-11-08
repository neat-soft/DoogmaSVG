var svg;
var svgData;
function createSVG(data){
    svgData = data;
     d3.select("#text_svg")
    .append("svg")
    .attr("id","doogmaTextSVG")
    // .attr("style", "outline: thin solid red;")   //This will do the job
    .attr("width", data['width'])
    .attr("height", data['height']);


    svg = d3.select("#doogmaTextSVG");
   
    var textPath = svg.append("defs").append("path")
        .attr("id", "textPath")
        .attr("d", getPathData);
    svg.append("text").append("textPath")
	    .attr("xlink:href", "#textPath")
        .text(data["text"])
        .attr("font-family", data["font-family"])
        .attr("font-weight", "bold")
        .attr("font-size", data["font-size"])
        .attr("x", 0)
        .attr("y", 0)
        .attr("fill", data["fill"])
        .attr("stroke", data["stroke"])
        .attr("stroke-width", data["stroke-width"]);

}
function renderSVG(data){
    svgData = data;
    console.log(data);
    svg = d3.select("#doogmaTextSVG");
    svg.attr("width",data["width"])
        .attr("height",data["height"])
    var textPath = d3.select("#textPath");
    textPath.attr("d",getPathData);
    var text = d3.select("textPath");
    text.text(data["text"]);
    for (var property in data) {
        text.attr(property,data[property]);
    }
        
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