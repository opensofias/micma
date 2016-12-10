class Micma // i should perhaps rename this to something else
{
	constructor (lut = [], ops = [])
	{ this.lut = lut; this.ops = ops }

	opFromString (symbol, opString, separators)
	{
		function splitRecursive (splitString, depth)
		{
			var array = []

			if (depth < separators.length)
				for (var substring of splitString.split (separators [depth]))
					array.push( splitRecursive(substring, depth + 1) )
			else array.push (splitString)

			return array
		}

		this.lut[symbol] = splitRecursive (opString, 0)

		this.ops.push ()
	}

	getDepth (symbol)
	{ 
		depth = function (current)
		{
			if (Array.isArray(current))
				return depth (current [0]) + 1
			else
				return 0
		}
		return depth (this.lut[symbol])
	}

	getLimit ()
	{ return this.lut[this.ops[0]].length }
}

class Term
{
	constructor (input = [], micma = new Micma ())
	{
		this.input = input; this.lut = micma.lut; this.micma = micma
		this.progress = 0; this.stack = []
	}

	static fromString (termString = "", separator = "", micma = new Micma ())
	{ return new Term (termString.split(separator), micma) }

	lookup (currentItem = this.input [this.progress], currentLut = this.lut)
	{
		if (Array.isArray (currentLut [currentItem]))
			return this.lookup (this.stack.pop (), currentLut [currentItem])
		else if (currentItem in currentLut)
			return (currentLut [currentItem])
		else
			return (currentItem)
	}

	evaluate ()
	{
		while (this.progress < this.input.length)
		{
			this.stack.push (this.lookup())
			this.progress ++
		}
		var stack = this.stack
		this.stack = []
		return stack
	}

	isEqual ()
	{
		var stack = this.evaluate()
		var result = true
		for (var element of stack)
			result = result && stack[0] == element
		return result
	}
}

class Relation // equations probably won't cut it forever
{
	constructor ()
	{}
}

class Query // checks if properties apply
{
	constructor (quantifiers = [], limit = 0, term = new Term ())
	{
		this.quantifiers = quantifiers; this.limit = limit
		this.term = term
	}

	static fromString (quantifiersString = "", limit = 0, term = new Term ())
	{ return new Query (quantifiersString.match(/.{2}/g), limit, term) }

	{
		const lower = "abcdefghijklmnopqrstuvwxyz"
		const upper = lower.toUpperCase()
		var count = 0;

	}

	evaluate ()
	{
		if (this.quantifiers.length == 0)
			return this.term.isEqual ()
		if (this.quantifiers[0][1] == "A")
		{
			var count = 0
			const replaceThis = this.quantifiers [0][0]
			var result = true
			while (count < this.limit && result)
			{
				var newInput = this.term.input.map (function (variable)
				{ return variable == replaceThis ? count : variable; })
				var subQuery = new Query
				(
					this.quantifiers.slice (1),
					this.limit,
					new Term (newInput, this.term.micma)
				)
				result = subQuery.evaluate ()
				count ++
			}
			return result
		}
		if (this.quantifiers [0][1] == "E")
		{
			var count = 0
			const replaceThis = this.quantifiers [0][0]
			var result = false
			while (count < this.limit && !result)
			{
				var newInput = this.term.input.map (function (variable)
				{ return variable == replaceThis ? count : variable; })
				var subQuery = new Query
				(
					this.quantifiers.slice (1),
					this.limit,
					new Term (newInput, this.term.micma)
				)
				result = subQuery.evaluate ()
				count ++
			}
			return result
		}
	}
}

class Generator // generate new migma where queried properties apply
{
	constructor (queries = [], limit = 0)
	{

	}
}