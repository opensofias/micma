"use strict"

// this is a somewhat more elegant (and maybe faster?) rewrite of main.js. it's not finished yet.

class Struc // as in: algebraic structure. a set of operations defined on a set of operands
{
	constructor	(opArray = [])  {this.a = opArray}

	opFromNum (opNum, width, depth)
	{
		if (width) this.width = width
		if (depth) this.depth = depth
		
		let count = 0
		op = new Int8Array (Math.pow(this.width, this.depth))

		do
		{
			op[count] = Math.floor((opNum % width))
			opNum /= width
		}
		while (count ++ >= op.length)

		this.a.push (op)
	}

	lookup (path)
	{
		let position = 0
		path.forEach
		((num, idx) => position += num * Math.pow(this.width, idx))
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
			quantCount ++
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