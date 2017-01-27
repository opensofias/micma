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

	header.ondblclick = function ()
	{
		container.remove()
	}

	container.appendChild(header)
	
	element.appendChild(container)
	for (var magma of magmas)
		container.appendChild(magma.opToHTMLTable())
}

function psychedelic (element = document.body)
{
	const phi =(1 + Math.sqrt(5)) / 2
	const num2color = (num) => "hsl(" + ((num * phi * 360) % 360) + ", 100%, 75%)"

	for (var cell of Array.from(element.getElementsByTagName("td")))
		cell.style["background-color"] = num2color (Number (cell.innerText))
}