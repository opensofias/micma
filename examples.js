// todo: new test-routine

function showAll (properties = [], elements = 3)
{
	magmas = Magma.filter (Magma.allBinaryOps (elements), properties.slice())
	container = document.createElement("section")
	container.className = "magma"
	var header = document.createElement("h2")
	header.innerHTML =
	properties.join () + " with " + elements + " elements (" + magmas.length + ")"
	container.append(header)
	
	document.getElementsByTagName("body")[0].append(container)
	for (var magma of magmas)
		container.append(magma.opToHTMLTable())
}