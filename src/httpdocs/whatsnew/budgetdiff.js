var diffData = [], currentData = [], pickList = [];
var currentState = "select"; // select or show
var currentLevel = 0, maxLevel = 3, baseChildCount = -1, baseSvgChildCount = -1;
var hierarchyNames = ["Fund", "Department", "Division", "Account"];
var accountToggle = false;
var valueCutOff = 0.;
var currentSelection = "";

function getSelection (prune) {
    var hTag, i;

    /*
     * Reset to full dataset or prune data to selected category
     */
    if (prune == null) { // Reset data
	currentData = diffData;
    }
    else { // Pull out rows associated with the selected item
	var tmpData = [];
	var prevLevel = currentLevel - 1;
	var j=0;
	hTag = hierarchyNames[currentLevel-1];
	for (i=0; i<currentData.length; ++i) {
	    if (currentData[i][hTag] == prune) {
		tmpData[j++] = currentData[i];
	    }
	}
	currentData = tmpData;
    }

    if (currentState == "select") {
	var ready = false;
	while (!ready) {
	    var names = {};
	    hTag = hierarchyNames[currentLevel];
	    for (i=0; i<currentData.length; ++i) {
		if (names[currentData[i][hTag]] == undefined)
		    names[currentData[i][hTag]] = 1;
		else 
		    names[currentData[i][hTag]] += 1;
	    }
	    var object = {};
	    pickList = [];
	    pickList[0] = " ----";
	    pickList[1] = "- All " + hTag + "s -";
	    i=2;
	    for (fname in names) {
		pickList[i++] = fname;
	    }

	    if (pickList.length > 3) { // No point in making the user select if there's only 1 real selection
		pickList.sort();
		ready = true;
	    }
	    else {
		++currentLevel;
		if (currentLevel == maxLevel) {
		    currentState = "show";
		    ready = true;
		}
	    }
	}
    }
}

function setUpState() {
    var pane = document.getElementById("mainFlow");
    if (pane != undefined) {
	if (baseChildCount < 0) baseChildCount = pane.childNodes.length; // Initialize the first time here.

	// Destroy all the dynamically created elements on this pane
	while (pane.lastChild != null && pane.childNodes.length > baseChildCount) {
	    pane.removeChild(pane.lastChild);
	}

	// Now construct the new pane
	if (currentState == "select") { // User is selecting which data to look at
	    var element = document.createElement("EM");
	    element.setAttribute("class", "tt");
	    element.appendChild(document.createTextNode("Select " + hierarchyNames[currentLevel] + ":  "));
	    pane.appendChild(element);

	    var selector = document.createElement("SELECT");
	    selector.setAttribute("id", "pick")
	    selector.setAttribute("class", "tt");
	    selector.setAttribute("onchange", "buttonClick(\"next\")");
	    for (var j=0; j<pickList.length; ++j) {
		var defSelected = false;
		if (j==0) defSelected = true;
		selector.add(new Option(pickList[j], pickList[j], defSelected, defSelected));
	    }
	    pane.appendChild(selector);
	    // Reset button
	    if (currentLevel > 0) {
		var button = document.createElement("INPUT");
		button.setAttribute("class", "tt");
		button.setAttribute("type", "button");
		button.setAttribute("value", "Start Over");
		button.setAttribute("onClick", "buttonClick(\"reset\")");
		pane.appendChild(button);
	    }
	}
	else if (currentState == "show") {
	    // Construct an array of objects with the values to be graphed
	    var mapTag = null;
	    if (currentLevel == maxLevel || accountToggle) {
		mapTag="Account";
	    }
	    else {
		mapTag = hierarchyNames[currentLevel];
	    }

	    var names = {};
	    //alert("Pulling out by " + mapTag + " from data set of length " + currentData.length);
	    for (var i=0; i<currentData.length; ++i) { // Pull out and aggregate
		var object = {}
		if (names[currentData[i][mapTag]] == undefined) {
		    object.name = currentData[i][mapTag];
		    object.Amount = 0.00;
		    names[currentData[i][mapTag]] = object;
		}
		else {
		    object = names[currentData[i][mapTag]];
		}
		object.Amount += currentData[i].Amount;
	    }
	    // Now pull out into an array
	    var dataArray = [];
	    var j = 0;
	    for (var nm in names) {
		var obj = names[nm];
		if (Math.abs(obj.Amount) > valueCutOff) dataArray[j++] = obj;
	    }

	    if (dataArray.length > 1) dataArray.sort(reverseAbsCompare);

	    j = 0;
	    var minValue = 1.e7, maxValue = -1.e7;
	    for (var i=0; i<dataArray.length && i < 10; ++i) {
		dataArray[j++] = dataArray[i];
		minValue = Math.min (minValue, dataArray[i].Amount);
		maxValue = Math.max (maxValue, dataArray[i].Amount);
	    }
	    if (minValue > 0.0) minValue = 0.0;

	    // Compute offset and scale factor to map to screen coordinates
	    var svgChart = document.getElementById("chart");
	    var width = svgChart.getAttribute("width");
	    var height = svgChart.getAttribute("height");
	    var xborder = 95;
	    var yborder = 5;

	    var offset = -minValue;
	    var scale  = (width - 2*xborder)/(maxValue - minValue); 

	    if (dataArray.length > 10) dataArray = dataArray.slice(0,10);
	    for (var i=0; i<dataArray.length; ++i) {
		dataArray[i].x = Math.round(scale * (dataArray[i].Amount + offset)) + xborder;
		if (dataArray[i].Amount < 0) {
		    dataArray[i].x1 = Math.round(scale * (dataArray[i].Amount + offset)) + xborder;
		    dataArray[i].x2 = Math.round(scale * (0 + offset)) + xborder;
		}
		else {
		    dataArray[i].x1 = Math.round(scale * (0 + offset)) + xborder;
		    dataArray[i].x2 = Math.round(scale * (dataArray[i].Amount + offset)) + xborder;
		}
		dataArray[i].y = yborder + i * 40 + 10;
		dataArray[i].width = dataArray[i].x2 - dataArray[i].x1;
	    }

	    if (baseSvgChildCount < 0) baseSvgChildCount = svgChart.childNodes.length; // Initialize count the first time here.
	    while (svgChart.lastChild != null && svgChart.childNodes.length > baseSvgChildCount) {
		svgChart.removeChild(svgChart.lastChild);
	    }
	    if (dataArray.length > 0) {
		var screenZero = Math.round(scale * offset) + xborder;
		var yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
		yAxis.setAttribute("x1", screenZero);
		yAxis.setAttribute("y1", yborder - 2);
		yAxis.setAttribute("x2", screenZero);
		yAxis.setAttribute("y2", height - (yborder + 20));

		yAxis.setAttribute("style", "stroke:rgb(255,0,0)");
		yAxis.setAttribute("stroke-width", 2);	    
		svgChart.appendChild(yAxis);

		for (i=0; i<dataArray.length; ++i) {
		    var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
		    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		    var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
		    text.textContent = dataArray[i].name;
		    text.setAttribute("x", 5);
		    text.setAttribute("y", "-3");

		    var dollars = document.createElementNS("http://www.w3.org/2000/svg", "text");
		    dollars.setAttribute("x", 5);
		    dollars.setAttribute("y", "12");

		    g.setAttribute("transform", "translate("+dataArray[i].x1+"," + dataArray[i].y + ")");
		    if (dataArray[i].Amount < 0.) {
			dollars.textContent = "-$" + numberWithCommas(Math.abs(Math.round(dataArray[i].Amount)));
			text.setAttribute("x", dataArray[i].width-5);
			text.setAttribute("class", "minus");
			dollars.setAttribute("x", dataArray[i].width-5);
			dollars.setAttribute("class", "minus");
			rect.setAttribute("class", "minus");
		    }
		    else {
			dollars.textContent = "$" + numberWithCommas(Math.round(dataArray[i].Amount));
			//text.setAttribute("x", dataArray[i].width);
			rect.setAttribute("class", "plus");
			text.setAttribute("class", "plus");
			dollars.setAttribute("class", "plus");
		    }
		    rect.setAttribute("height", "19");
		    rect.setAttribute("width", dataArray[i].width);

		    g.appendChild(rect);
		    g.appendChild(text);
		    g.appendChild(dollars);
		    svgChart.appendChild(g);
		    if (dataArray.length < 10) {
			var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
			text.textContent = "There are only "+dataArray.length + " non-zero budget differences here";
			text.setAttribute("x", xborder);
			text.setAttribute("y", dataArray[dataArray.length-1].y + 50);

			svgChart.appendChild(text);
		    }
		}
		if (currentLevel < maxLevel) {
		    var button = document.createElement("INPUT");
		    button.setAttribute("class", "tt");
		    button.setAttribute("type", "button");
		    var txt = "View by " + (accountToggle?hierarchyNames[currentLevel]:"Account");
		    button.setAttribute("value", txt);
		    button.setAttribute("onClick", "buttonClick(\"account\")");
		    pane.appendChild(button);
		}
	    }
	    else { // No data
		var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
		text.textContent = "There are no non-zero budget differences here";
		text.setAttribute("x", xborder);
		text.setAttribute("y", yborder + height/3);
		svgChart.appendChild(text);
	    }
		
	    var button  = document.createElement("INPUT");
	    button.setAttribute("class", "tt");
	    button.setAttribute("type", "button");
	    button.setAttribute("value", "Start Over");
	    button.setAttribute("onClick", "buttonClick(\"reset\")");
	    pane.appendChild(button);
	}
	var label = document.createElement("p");
	//label.textContent = "HELLOW THERE! " + currentSelection;
	pane.appendChild(label);
    }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function reverseAbsCompare (a, b) { // reverse sort
    var amt1 = Math.abs(a.Amount);
    var amt2 = Math.abs(b.Amount);
    if (amt1 < amt2)
	return 1;
    if (amt1 > amt2)
	return -1;
    return 0;
}

function buttonClick(instruction) {
    var selector = document.getElementById("pick");
    if (instruction == "reset") {
	currentState = "select";
	currentLevel = 0;
	accountToggle = false;
	getSelection(null);
	currentSelection = "";
    }
    else if (instruction == "next") {
	var realIndex = selector.selectedIndex - 1;
	if (selector.selectedIndex == 1) { // "All" option
	    currentState = "show";
	}
	else if (currentLevel == maxLevel-1) {
	    ++currentLevel;
	    currentState = "show";
	    getSelection(selector.options[selector.selectedIndex].value)
	}
	else {
	    ++currentLevel;
	    currentSelection += " : " +  selector.options[selector.selectedIndex].value;
	    getSelection(selector.options[selector.selectedIndex].value)
	}
    }
    else if (instruction == "account") {
	accountToggle = !accountToggle;
    }
    setUpState();
}


function forceAmountType(d) {
    d.Amount = +d.Amount; // coerce to number
    return d;
}

function afterRead (error, data) {
    diffData = data;
    currentState = "select";
    currentLevel = 0;

    getSelection(null);
    setUpState();
}
