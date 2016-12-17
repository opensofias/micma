// todo: new test-routine

function showAll (properties = [], elements = 3)
{
	magmas = Magma.filter (Magma.allBinaryOps (elements), properties.slice())
	container = document.createElement("section")
	container.className = "magma"
	var header = document.createElement("h2")
	header.innerHTML =
	properties.join () + " with " + elements + " elements (" + magmas.length + ")"
	container.appendChild(header)
	
	document.getElementsByTagName("body")[0].appendChild(container)
	for (var magma of magmas)
		container.appendChild(magma.opToHTMLTable())
}

function benchmark (propList, limit = 3)
{	var time = new Date ()
	var amount = Magma.filteredBinaryOps (propList, limit).length
	time = new Date () - time
	var resultstring = "filter@generation: "  + time + "ms, " + amount + "items\n"
 
	time = new Date ()
	amount = Magma.filter(Magma.allBinaryOps (limit), propList).length
	time = new Date () - time
	resultstring += "filter after generation: "  + time + "ms, " + amount + "items\n"

	return resultstring
}