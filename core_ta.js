"use strict"

// this is a somewhat more elegant (and maybe faster?) rewrite of main.js. it's not finished yet.

class Struc // as in: algebraic structure. a set of operations defined on a set of operands
{
	constructor	(opArray = [])  { this.a = opArray }

	opFromNum (opNum, width, depth)
	{
		switch (arguments.length)
		{
			case 3: this.depth = depth
			case 2: this.width = width
		}

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

	lookup (path) // todo
	{
		let position = 0
		path.forEach
		((num, idx) => position += num * Math.pow(this.width, idx))

	}
}

class Magma4 extends Struc // optimized for 4-element and one binary operator
{
	lookup ([x, y]) // todo
	{
		let position = x + y >> 2
		
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
		let progress = 0; let stack = []
		while (progress < this.a.length)
			stack = this.step (struc, stack, progress ++)
		return stack
	}

	isEqual (struc)
	{
		let stack = this.evaluate(struc)
		let result = true
		for (let element of stack)
			result = result && stack[0] == element
		return result
	}
}

class Property // algebraic property, defined by quanatified equalities
{
	constructor (propertyArray, quantors, depth = 2)
	{ this.a = propertyArray; this.quantors = quantors; this.depth = depth }

	static fromString (propString, depth = 2)
	{
		// lower case for existance claims, upper case for universal claims. variables are evaluated in alphabeitical order
		const lower = "abcdefghijklmnopqrstuvwxyz"
		const upper = lower.toUpperCase()
		const opSymbols = "*+/-&|%$"
		
		let quantCount = 0; let quantors = []
		
		do
		{
			if (propString.includes (lower[quantCount]))
				quantors.push (false)
			else if (propString.includes (upper[quantCount]))
				quantors.push (true)
			else break
		}
		while (quantCount ++ < lower.length)

		let propArray = propString.split("")

		let opCount = 0; let index
		while (propString.includes (opSymbols[opCount]))
		{
			index = propArray.indexOf(opSymbols[opCount])
			if (index > 0) propArray [index] = -1 - opCount
			else opCount ++
		}

		return new Property (propArray, quantors, depth)
	}
}