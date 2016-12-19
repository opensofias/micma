var body = document.getElementsByTagName("body")[0]
removeJsNotice ()

function removeJsNotice ()
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

	showAll(query.split(","), 3, document.getElementById ("generator-results"))
}

function showAll (properties = [], elements = 3, element = document.getElementsByTagName("body")[0])
{
	var magmas = Magma.filter (Magma.allBinaryOps (elements), properties.slice())
	container = document.createElement("section")
	container.className = "listing"
	var header = document.createElement("h2")
	header.innerHTML =
	properties.join () + " with " + elements + " elements (" + magmas.length + ")"
	container.appendChild(header)
	
	element.appendChild(container)
	for (var magma of magmas)
		container.appendChild(magma.opToHTMLTable())
}