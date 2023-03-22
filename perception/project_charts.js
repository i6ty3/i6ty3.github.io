async function lolipop() {
    // set the dimensions and margins of the graph
    const margin = { top: 10, right: 30, bottom: 30, left: 200 },
        width = 500 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#first-fig")
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Parse the Data
    var data = await d3.csv("lolipop.csv");

    // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
    // var myGroups = d3.map(data, function (d) { return d.factors; }).keys()
    // var myVars = d3.map(data, function (d) { return d.likely; }).keys()

    // Add X axis
    const x = d3.scaleLinear()
        .domain([1, 5])
        .range([0, width])
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).ticks(5))
        .selectAll("text")
        .style("fill", "#555555")


    // Y axis
    const y = d3.scaleBand()
        .range([0, height])
        .domain(data.map(function (d) { return d.factors; }))
        .padding(1);
    svg.append("g")
        .call(d3.axisLeft(y))
        .selectAll("text")
        .style("fill", "#555555")

    svg.selectAll(".domain")
        .style("stroke", "#555555")

    // create a tooltip
    var Tooltip = d3.select("#first-fig")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")

    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function (d) {
        Tooltip
            .style("opacity", 1)
        d3.select(this)
            .style("stroke", "black")
            .style("opacity", 1)
    }
    var mousemove = function (m, d) {
        Tooltip
            .html(d3.select(this).attr("data-value"))
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY + 10) + "px")
    }
    var mouseleave = function (d) {
        Tooltip
            .style("opacity", 0)
        d3.select(this)
            .style("stroke", "none")
            .style("opacity", 1)
    }


    // Lines
    svg.selectAll("myline")
        .data(data)
        .join("line")
        .attr("class", "first")
        .attr("x1", function (d) { return x(d.unlikely); })
        .attr("x2", function (d) { return x(d.likely); })
        .attr("y1", function (d) { return y(d.factors); })
        .attr("y2", function (d) { return y(d.factors); })
        .attr("stroke", "grey")
        .attr("stroke-width", "2px")

    // Circles of variable 1
    svg.selectAll("mycircle")
        .data(data)
        .join("circle")
        .attr("class", "first")
        .attr("cx", function (d) { return x(d.unlikely); })
        .attr("cy", function (d) { return y(d.factors); })
        .attr("r", "6")
        .style("fill", "violet")
        .attr("data-value", function (d) { return "Unlikely:" + d.unlikely })
        .attr("data-category", "unlikely")
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)

    // Circles of variable 2
    svg.selectAll("mycircle")
        .data(data)
        .join("circle")
        .attr("class", "first")
        .attr("cx", function (d) { return x(d.likely); })
        .attr("cy", function (d) { return y(d.factors); })
        .attr("r", "6")
        .style("fill", "cornflowerblue")
        .attr("data-value", function (d) { return "Likely:" + d.likely })
        .attr("data-category", "likely")
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)


    // svg.selectAll("myLabel")
    //     .data(data)
    //     .join("text")
    //     .attr("x", function (d) { return x(d.likely) + 10; })
    //     .attr("y", function (d) { return y(d.factors) + 3; })
    //     .text(function (d) { return d.likely })
    //     .style("font-size", "12px")
    //     .attr("alignment-baseline", "middle")
    //     .style("fill", "cornflowerblue")

    // svg.selectAll("myLabel")
    //     .data(data)
    //     .join("text")
    //     .attr("x", function (d) { return x(d.unlikely) - 30; })
    //     .attr("y", function (d) { return y(d.factors) + 3; })
    //     .text(function (d) { return d.unlikely })
    //     .style("font-size", "12px")
    //     .style("fill", "violet")
    d3.selectAll(".lolipop")
        .on("mouseover", function () {
            bgcolor = d3.select(this).style("color")
            d3.select(this).transition().duration(500).style("background-color", bgcolor).style("color", "white").style("padding", "5px").style("border-radius", "15px")
            const category = d3.select(this).attr("classtype");
            d3.selectAll("circle.first").transition().duration(500).filter(`:not([data-category = "${category}"])`)
                .style("opacity", .3);
            d3.selectAll("line.first").transition().duration(500).filter(`:not([data-category = "${category}"])`)
                .style("opacity", 0);

        })
        .on("mouseout", function () {
            d3.select(this).interrupt().transition().duration(300).style("background-color", "transparent").style("color", bgcolor).style("padding", "0")
            d3.selectAll("circle.first").transition().duration(500).style("opacity", 1);
            d3.selectAll("line.first").transition().duration(500).style("opacity", 1);
        })
};
lolipop()
async function bubble() {
    // set the dimensions and margins of the graph
    const margin = { top: 10, right: 20, bottom: 30, left: 50 },
        width = 300 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#second-fig")
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    //Read the data
    var data = await d3.csv("bubble.csv")

    // Add X axis
    const x = d3.scaleLinear()
        .domain([0, 6])
        .range([0, width]);
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).ticks(6))
        .selectAll("text")
        .style("fill", "#555555");

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, 6])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y).ticks(6))
        .selectAll("text")
        .style("fill", "#555555");

    svg.selectAll(".domain")
        .style("stroke", "#555555")

    // Add a scale for bubble size
    const z = d3.scaleLinear()
        .domain([1, 5])
        .range([5, 10]);

    // Add a scale for bubble color
    const myColor = d3.scaleLinear()
        .domain([1, 25])
        .range(d3.schemePaired);

    // -1- Create a tooltip div that is hidden by default:
    const tooltip = d3.select("#second-fig")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "black")
        .style("border-radius", "5px")
        .style("padding", "10px")
        .style("color", "white")

    // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
    const showTooltip = function (event, d) {
        tooltip
            .transition()
            .duration(200);
        tooltip
            .style("opacity", 1)
            .html("Frequency: " + d.frequency);

        d3.select(this)
            .style("stroke", "black")
            .style("stroke-width", "2px");
    }
    const moveTooltip = function (event, d) {
        tooltip
            .style("left", (event.x) + "px")
            .style("top", (event.pageY) + 30 + "px")
    }
    const hideTooltip = function (event, d) {
        tooltip
            .transition()
            .duration(200)
            .style("opacity", 0);

        d3.select(this)
            .style("stroke", "none");
    }

    // Add dots
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("class", "bubbles")
        .attr("cx", d => x(d.likeliness))
        .attr("cy", d => y(d.security))
        .attr("r", d => z(d.frequency))
        .style("fill", "cornflowerblue")
        .style("fill", d => myColor(d.likeliness * d.security))
        // -3- Trigger the functions
        .on("mouseover", showTooltip)
        .on("mousemove", moveTooltip)
        .on("mouseleave", hideTooltip)

    const regLine = function () {
        svg.append('line')
            .attr("class", "reg")
            .attr("x1", x(0))
            .attr("y1", y(1.182344428))
            .attr("x2", x(6))
            .attr("y2", y(4.119392185))
            .transition().duration(1000)
            .style("stroke", "cornflowerblue")
            .style("stroke-width", "3")
            .style("stroke-linecap", "round")
            .style("stroke-dasharray", "10,10")
            .style("opacity", 1)
    }
    d3.selectAll(".bubbl")
        .on("mouseover", function () {
            bgcolor = d3.select(this).style("color")
            d3.select(this).transition().duration(500).style("background-color", bgcolor).style("color", "white").style("padding", "5px").style("border-radius", "15px")
            const category = d3.select(this).attr("classtype");
            d3.selectAll("circle.bubbles")
                .style("stroke", "white")
                .transition().duration(700)
                .style("opacity", .3)
                .style("stroke", "red")
                .style("stroke-width", "3")
            regLine()

        })
        .on("mouseout", function () {
            d3.select(this).interrupt().transition().duration(300).style("background-color", "transparent").style("color", bgcolor).style("padding", "0")
            d3.selectAll("circle.bubbles").interrupt().transition().duration(700).style("opacity", 1).style("stroke", "None");
            d3.selectAll("line.reg").remove()

        })

};
bubble()
async function doughnut() {

    // set the dimensions and margins of the graph
    const width = 400,
        height = 400,
        margin = 40;

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    const radius = Math.min(width, height) / 2 - margin

    // append the svg object to the div called 'my_dataviz'
    const svg = d3.select("#third-fig")
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

    // Create dummy data
    var data = await d3.csv('doughnut.csv')

    // set the color scale
    const color = d3.scaleOrdinal()
        .range(["#FF0000", "#FF7700", "#777777", "#00FF00", "#007700"])

    // Compute the position of each group on the pie:
    const pie = d3.pie()
        .value(d => d.frequency)
        .sort(null)

    const data_ready = pie(data)

    // The arc generator
    const arc = d3.arc()
        .innerRadius(radius * 0.5)         // This is the size of the donut hole
        .outerRadius(radius * 0.8)

    // Another arc that won't be drawn. Just for labels positioning
    const outerArc = d3.arc()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.9)

    // create a tooltip
    var Tooltip = d3.select("#third-fig")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")

    // highlights
    const mouseover = function (event, d) {
        d3.selectAll("path")
            .transition().duration(300)
            .style("opacity", .2)
        d3.selectAll("polyline")
            .transition().duration(300)
            .style("display", "None")
        d3.selectAll("text")
            .transition().duration(300)
            .style("opacity", 0)
        d3.select(this)
            .transition().duration(300)
            .style("opacity", 1)
        Tooltip
            .transition().duration(300)
            .style("opacity", 1)
    }

    var mousemove = function (m, d) {
        Tooltip
            .html(`${d.data.security}:${d.data.percentages}`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY + 10) + "px")
    }
    const mouseleave = function (event, d) {
        d3.selectAll("path")
            .interrupt()
            .transition().duration(300)
            .style("opacity", .7)
        Tooltip
            .interrupt()
            .transition().duration(300)
            .style("opacity", 0)
        d3.selectAll("polyline")
            .interrupt()
            .transition().duration(300)
            .style("display", "unset")
        d3.selectAll("text")
            .interrupt()
            .transition().duration(300)
            .style("opacity", 1)
    }

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
        .selectAll('myDough')
        .data(data_ready)
        .join('path')
        .attr('d', arc)
        .attr('fill', d => color(d))
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", .7)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)

    const poly = function (d) {
        const posA = arc.centroid(d) // line insertion in the slice
        const posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
        const posC = outerArc.centroid(d); // Label position = almost the same as posB
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
        posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
        return [posA, posB, posC]
    }

    svg
        .selectAll('allPolylines')
        .data(data_ready)
        .join('polyline')
        .attr("stroke", "black")
        .style("fill", "none")
        .attr("stroke-width", 1)
        .attr('points', poly)

    // Add the polylines between chart and labels:
    const labelposition = function (d) {
        const pos = outerArc.centroid(d);
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        return `translate(${pos})`;
    }
    svg
        .selectAll('allLabels')
        .data(data_ready)
        .join('text')
        .text(d => d.data.percentages)
        .attr("fill", "black")
        .attr('transform', labelposition)
        .style('text-anchor', function (d) {
            const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
            return (midangle < Math.PI ? 'start' : 'end')
        })

    
}
doughnut()