/* 

Author: Niv Weiss
Main: Chuck Grimmet

Having Fun w/ D3!

*/

function gridData() {
	var data = new Array();
	var xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
	var ypos = 1;
	var width = 10;
	var height = 10;
	var click = 0;	

	
	// iterate for rows	
	for (var row = 0; row < 50; row++) {
		data.push( new Array() );
		
		// iterate for cells/columns inside rows
		for (var column = 0; column < 50; column++) {
			click = Math.round(Math.random() * 100);
			data[row].push({
				x: xpos,
				y: ypos,
				width: width,
				height: height,
				click: click
			})
			// increment the x position. I.e. move it over by 50 (width variable)
			xpos += width;
		}
		// reset the x position after a row is complete
		xpos = 1;
		// increment the y position for the next row. Move it down 50 (height variable)
		ypos += height;	
	}
	return data;
}

var gridData = gridData();	
// I like to log the data to the console for quick debugging
console.log(gridData);

var grid = d3.select("#grid")
	.append("svg")
	.attr("width","502px")
	.attr("height","502px");
	
var row = grid.selectAll(".row")
	.data(gridData)
	.enter().append("g")
	.attr("class", "row");
	
var column = row.selectAll(".square")
	.style("fill", function(d) {
		if ((d.click)%4 == 0 ) { return "#fff"; }
		if ((d.click)%4 == 1 ) { return "#026055"; }
		if ((d.click)%4 == 2 ) { return "#ff2b16"; }
		if ((d.click)%4 == 3 ) { return "#e0c87e"; }
	})
	.data(function(d) { return d; })
	.enter().append("rect")
	.attr("class","square")
	.attr("x", function(d) { return d.x; })
	.attr("y", function(d) { return d.y; })
	.attr("width", function(d) { return d.width; })
	.attr("height", function(d) { return d.height; })
	.style("fill", "#fff")
	.style("stroke", "#222")
	.on('mouseover', function(d) {
       d.click ++;
       if ((d.click)%4 == 0 ) { d3.select(this).style("fill","#fff"); }
	   if ((d.click)%4 == 1 ) { d3.select(this).style("fill","#026055"); }
	   if ((d.click)%4 == 2 ) { d3.select(this).style("fill","#ff2b16"); }
	   if ((d.click)%4 == 3 ) { d3.select(this).style("fill","#e0c87e"); }
    });
