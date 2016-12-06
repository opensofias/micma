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

function NAND ()
{
	var a = new Micma ()
	{
		a.lut["NAND"] = [[1,1],[1,0]]
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

function isIdempotent (micma, op, limit)
{
	var term = new Term (["a","a",op,"a"], micma)
	var query = new Query (["aA","bA"], limit, term)
	return query.evaluate ()
}

function idemElement (micma, op, limit)
{
	var term = new Term (["a","a",op,"a"], micma)
	var query = new Query (["aE","bE"], limit, term)
	return query.evaluate ()
}

function commTest ()
{
	return [
		isCommutative (MinMax4(), "&", 4), 
		isCommutative (RockPaperScizzors(), "W", 3),
		isCommutative (Imply(), ">", 2),
		isCommutative (NAND(), "NAND", 2),

		isAssociative (MinMax4(), "&", 4),
		isAssociative (RockPaperScizzors(), "W", 3),
		isAssociative (Imply(), ">", 2),
		isAssociative (NAND(), "NAND", 2),
		
		isIdempotent (MinMax4(), "&", 4),
		isIdempotent (RockPaperScizzors(), "W", 3),
		isIdempotent (Imply(), ">", 2),
		isIdempotent (NAND(), "NAND", 2),

		idemElement (MinMax4(), "&", 4),
		idemElement (RockPaperScizzors(), "W", 3),
		idemElement (Imply(), ">", 2),
		idemElement (NAND(), "NAND", 2),
	]
}
