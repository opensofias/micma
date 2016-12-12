function gf2test ()
{
	var gf2 = GF2 ()
	var preterm = [1,1,"+",1, 1,"*"]
	var term = new Term (preterm,gf2)
	return term.evaluate()
}

function underflowTest ()  //does strange things, not sure if i care
{
	var gf2 = GF2 ()
	var preterm = [1,"+"]
	var term = new Term (preterm,gf2)
	return term.evaluate ()
}


// todo: new test-routine