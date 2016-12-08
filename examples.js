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

function isLeftLatin (micma, op, limit)
{
	var term = new Term (["a","b",op,"c"])
	var query = new Query (["aA","cA","bE"], limit, term)
	return query.evaluate ()
}

function isRightLatin (micma, op, limit)
{
	var term = new Term (["a","b",op,"c"])
	var query = new Query (["bA","cA","aE"], limit, term)
	return query.evaluate ()
}

function leftDistributes (micma, op1, op2, limit)
{
	var term = new Term (["a","b",op1,"c",op2,"a","c",op2,"b","c",op2,op1])
	var query = new Query (["aA","bA","cA"], limit, term)
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
