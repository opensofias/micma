"use strict"

// using numbers instead of arrays as the "heart" of structures may make them faster, let's see how well this works

var generate = (type, propString, start, stop) =>
{
	start = start || 0
	stop = stop || Math.pow(type,Math.pow(type,2)) // defaults to highest possible value for type
	let count = start
	const result = []
	const typeClass = [null, Magma1, Magma2, Magma3, Magma4] [type]
	const props =
	propString.split (" ").map (x => Property.fromString (x, type))

	do
	{
		const magma = new typeClass (count)
		
		let keep = true; let propCount = 0
		
		do keep = props [propCount]
			while (keep && propCount ++ < props.length)
		
		keep && result.push(count)
	}
	while (++ count < stop)

	return result
}

class Magma1
{
	constructor (opNum) { this.num = opNum; this.width = 1 }

	lookup () { return 0 }
}

class Magma2
{
	constructor (opNum) { this.num = opNum; this.width = 2 }

	lookup (x, y)
	{ return (this.num / (1 << (x + y * y))) & 1 }
}

class Magma3 
{
	constructor (opNum) { this.num = opNum; this.width = 3 }

	lookup (x, y)
	{ return (this.num / Math.pow(3, x + y * y * y)) | 0 % 3 }
}

class Magma4
{
	constructor (opNum) { this.num = opNum; this.width = 4 }

	lookup (x, y)
	{ return (this.num / (1 << ((x + (y << 2)) << 1))) & 3 }
}

class Term // in postfix notation: operators after operand. this makes parentheses and precedence rules unnessecary.
{
	constructor (termArray = [])
	{ this.a = termArray }

	step (struc, stack = [], progress = 0)
	{
		if (this.a[progress] < 0) // negative numbers are operators
			stack.push (struc.lookup (stack.pop, stack.pop))
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

const lower = "abcdefghijklmnopqrstuvwxyz"
const upper = lower.toUpperCase()
const opSymbols = "*+/-&|%$"

class Property // algebraic property, defined by quantified equalities
{
	constructor (propertyArray, quantors)
	{ this.a = propertyArray; this.quantors = quantors }

	static fromString (propString)
	{
		// lower case for existance claims, upper case for universal claims. variables are evaluated in alphabeitical order

		let quantCount = 0; let quantors = []
		
		do
		{
			if (propString.includes (lower[quantCount]))
				quantors.push (false)
			else if (propString.includes (upper[quantCount]))
				quantors.push (true)
			else break
		}
		while (quantCount ++ <= lower.length)

		let propArray = propString.toLowerCase().split("")

		for (let opSymbol of opSymbols)
			while (propArray.includes (opSymbol))
				propArray [propArray.indexOf(opSymbol)] = - 1 - opSymbols.indexOf(opSymbol)

		return new Property (propArray, quantors)
	}

	evaluate (struc, width)
	{
		const evaluateRecursive = (symbolList) =>
		{
			let possibility = 0; let keep = true
			do
			{
				const newSymbolList = [...symbolList, ...possibility]
				if (newSymbolList.length >= this.a.length)
				{
					const currentTerm = this.a.map
					(symbol => newSymbolList[lower.indexOf (symbol)])
					
					keep = new Term (currentTerm).isEqual(struc)
				}
				else keep = evaluateRecursive (newSymbolList)
			}
			while (keep == this.quantors [symbolList.length] && possibility ++ < struc.width)
			return keep
		}
		return evaluateRecursive([])
	}
}