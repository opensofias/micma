function GF2 ()
{
	var a = new Micma ()
	a.lut["*"] = [[0,0],[0,1]]
	a.lut["+"] = [[0,1],[1,0]]
	return a
}

function MinMax4 ()
{
	var a = new Micma ()
	{
		a.lut ["&"] = [[0,0,0,0],[0,1,1,1],[0,1,2,2],[0,1,2,3]]
		a.lut ["|"] = [[0,1,2,3],[1,1,2,3],[2,2,2,3],[3,3,3,3]] 
	}
	return a
}

function RockPaperScizzors ()
{
	var a = new Micma ()
	{
		a.lut ["W"] = [[0,1,0],[1,1,2],[0,2,2]]
		a.lut ["L"] = [[0,0,2],[0,1,1],[0,2,2]]
	}
	return a
}

function Imply ()
{
	var a = new Micma ()
	{
		a.lut["<"] = [[1,0],[1,1]]
		a.lut[">"] = [[1,1],[0,1]]
	}
	return a
}

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

function isCommutative (micma, op, limit)
{
	var term = new Term (["a","b",op,"b","a",op], micma)
	var query = new Query (["aA","bA"], limit, term)
	return query.evaluate ()
}

function isAssociative (micma, op, limit)
{
	var term = new Term (["a","b","c",op,op,"a","b",op,"c",op], micma)
	var query = new Query (["aA","bA","cA"], limit, term)
	return query.evaluate ()
}

function commTest ()
{
	alert (isCommutative (MinMax4(), "&", 4)) 
	alert (isCommutative (RockPaperScizzors(), "W", 3))
	alert (isCommutative (Imply()), ">", 2)

	alert (isAssociative (MinMax4(), "&", 4)) 
	alert (isAssociative  (RockPaperScizzors(), "W", 3))
	alert (isAssociative  (Imply()), ">", 2)
}
