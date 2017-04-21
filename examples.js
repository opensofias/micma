// todo: new test-routine

function benchmark (propList, limit = 3)
{
	var time = new Date ()
	var amount = Magma.filteredBinaryOps (propList, limit).length
	time = new Date () - time
	var resultstring = "filter@generation: "  + time + "ms, " + amount + "items\n"
 
	time = new Date ()
	amount = Magma.filter(Magma.allBinaryOps (limit), propList).length
	time = new Date () - time
	resultstring += "filter after generation: "  + time + "ms, " + amount + "items\n"

	return resultstring
}