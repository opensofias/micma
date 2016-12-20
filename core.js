"use strict"

// this is somewhat more elegant (and maybe faster?) rewrite of main.js. it's not finished yet.

class Struc // as in: algebraic structure. a set of operations defined on a set of operands
{
	constructor (opArray = []) {this.a = opArray}

	static fromString (opString, separators = [","," ",""])
	{
		return new Struc (Struc.splitRecursive (opString, separators))
	}

	opFromString (opString, separators = [","," ",""])
	{
		this.a.push (Struc.splitRecursive (opString, separators))
	}

	static fromNum (opNumS, width = 3, depht = 2)
	{
		var struc = new Struc ()

		if (Array.isArray (opNumS))
			for (var opNum of opNum) struc.opFromNum (opNum, width, depht)
		else struc.opFromNum (opNumS, width, depht)

		return struc
	}

	opFromNum (opNum, width = 3, depht = 2)
	{
		const cellNum = Math.pow(width, depht)
		var op = []; var cellCount = 0

		function fillCellsRecursive ()
		{

		}
	}

	static splitRecursive (splitString, separators = [" ",""])
	{
		var content = []; var depth = 0

		if (depth < separators.length)
			for (var substring of splitString.split (separators [0]))
				content.push
				(Struc.splitRecursive (substring, separators.slice(1)))
		
		else content = splitString

		return content
	}

	depth (index = 0, current = this.a)
	{
		if (Array.isArray(current))
			return this.depth (0, current [0]) + 1
		else return 0
	}

	width (index = 0) { return this.a[index].length }

	lookup (path = [], current = this.a)
	{
		if (path.length == 0) return current
		{
			return this.lookup
			(path.slice(1), current [path [0]])
		}
	}
}

class Term // in postfix notation: operators after operand. this makes parentheses and precedence rules unnessecary.
{
	constructor (termArray = [], depth = 2)
	{ this.a = termArray; this.depth = depth }

	step (struc, stack = [], progress = 0)
	{
		if (this.a[progress] < 0) // negative numbers are operators
		{
			const op = -1 - this.a [progress]
			const path = [op].concat (stack.splice (- this.depth))
			stack.push (struc.lookup (path))
		}
		else stack.push (this.a[progress])
		
		return stack
	}

	evaluate (struc)
	{
		var progress = 0; var stack = []
		while (progress < this.a.length)
			stack = this.step (struc, stack, progress ++)
		return stack
	}

	isEqual (struc)
	{
		var stack = this.evaluate(struc)
		var result = true
		for (var element of stack)
			result = result && stack[0] == element
		return result
	}
}

class Property // algebraic property, defined by equalities and logical quantors
{
	constructor (propertyArray, quantors, depth = 2)
	{ this.a = propertyArray; this.quantors = quantors; this.depth = depth }

	static fromString (propString, depth = 2)
	{
		// lower case for existance claims, upper case for universal claims. variables are evaluated in alphabeitical order
		const lower = "abcdefghijklmnopqrstuvwxyz"
		const upper = lower.toUpperCase()
		const opSymbols = "*+/-&|%$"
		
		var quantCount = 0; var quantors = []
		while (quantCount < lower.length)
		{
			if (propString.includes (lower[quantCount]))
				quantors.push (false)
			else if (propString.includes (upper[quantCount]))
				quantors.push (true)
			else break
			quantCount++
		}

		var propArray = propString.split("")

		var opCount = 0; var index
		while (propString.includes (opSymbols[opCount]))
		{	
			index = propArray.indexOf(opSymbols[opCount])
			if (index > 0) propArray [index] = -1 - opCount
			else opCount ++
		}

		return new Property (propArray, quantors, depth)
	}
}