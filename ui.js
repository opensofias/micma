"use strict"

var body = document.getElementsByTagName("body")[0]
startup ()
magmaGenerator () // since there is no point to the main menu yet..

function startup ()
{ body.removeChild (document.getElementById("js-notice")) }

function magmaGenerator ()
{
	document.getElementById ("main-menu").style.display = "none"

	document.getElementById ("magma-generator").style.display = "block"
	
	var input = document.getElementById ("generator-input")
	input.addEventListener ("keyup", function(event)
	{ if (event.keyCode == 13) generate() })
}



function generate ()
{
	var query = document.getElementById ("generator-input").value
	var width = Number (document.getElementById ("generator-width").value)
	showAll(query.split(","), width, document.getElementById ("generator-results"))
}

function showAll (properties = [], elements = 3, element = document.getElementsByTagName("body")[0])
{
	var magmas = Magma.filter (Magma.allBinaryOps (elements), properties.slice())
	var container = document.createElement("section")
	container.className = "listing"
	var header = document.createElement("h2")
	header.innerHTML = "<strong>" + properties.join () + "</strong> with " + elements + " elements (" + magmas.length + ")"
	header.onclick = function ()
	{
		if (container.classList.contains ("collapsed"))
			container.classList.remove ("collapsed")
		else container.classList.add ("collapsed")
	}

	container.appendChild(header)
	
	element.appendChild(container)
	for (var magma of magmas)
		container.appendChild(magma.opToHTMLTable())
}