function GF2 ()
{
	var a = new Micma ()
	a.lut["*"] = [[0,0],[0,1]]
	a.lut["+"] = [[0,1],[1,0]]
	return a
}

function gf2test ()
{
	var gf2 = GF2 ()
	var preterm = [1,1,"+",1,1,"*"]
	var term = new Term (preterm,gf2)
	term.evaluate()
	return term.stack
}

function underflowTest ()  //does strange things, not sure if i care
{
	var gf2 = GF2 ()
	var preterm = [1,"+"]
	var term = new Term (preterm,gf2)
	term.evaluate()
	return term.stack
}

function isCommutative (micma, op)
{
	var term = new Term
}