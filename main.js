"use strict"

class Magma // technically a magma has exactly one operation, i have an arbitrary number. oh, well..
{
	constructor (lut = [], ops = [])
	{ this.lut = lut; this.ops = ops }

	opFromString (symbol, opString, separators)
	{
		function splitRecursive (splitString, depth)
		{
			var content = []

			if (depth < separators.length)
				for (var substring of splitString.split (separators [depth]))
					content.push (splitRecursive (substring, depth + 1))
			else content = splitString

			return content
		}
		
		this.lut[symbol] = splitRecursive (opString, 0)

		this.ops.push (symbol)
	}

	static allBinaryOps (limit = 3)
	{
		var result = []
		
		const total = Math.pow(limit, Math.pow(limit,2))
		
		var magmaCount = 0

		while (magmaCount < total)
		{
			result.push (Magma.binaryOpFromNumber (magmaCount, limit))
			magmaCount++
		}

		return result
	}

	static filteredBinaryOps (propertyList = [], limit = 3)
	{
		var result = []
		
		const total = Math.pow(limit, Math.pow(limit,2))
		
		var magmaCount = 0

		while (magmaCount < total)
		{
			var magma = Magma.binaryOpFromNumber (magmaCount, limit)
			
			var keep = true; var filterCount = 0
			while (keep && filterCount < propertyList.length)
			{
				keep = Query.fromPropertyString
				(propertyList[filterCount], magma).evaluate ()
				filterCount++
			}

			if (keep) result.push (magma)

			magmaCount++
		}

		return result
	}

	static binaryOpFromNumber (magmaNumber, limit = 3, symbol = "!")
	{
		var op = []

		var cellCount = 0

		const cellNum = Math.pow(limit,2)

		while (cellCount < cellNum)
		{
			// num | 0 should be much faster than Math.floor()
			if (! op [(cellCount / limit) | 0]) op [(cellCount / limit) | 0] = []
				
			op [(cellCount / limit) | 0] [cellCount % limit] = 
			((magmaNumber / Math.pow (limit, cellCount)) % limit) | 0
			cellCount ++
		}

		return new Magma ({"!":op}, ["!"])
	}

	static filter (inputMagmas = [], propertyList = [])
	{
		if (propertyList.length == 0) return inputMagmas
		
		var result = []
		
		for (var magma of inputMagmas)
		{
			var query = Query.fromPropertyString(propertyList[0], magma)
			
			//query.magma = magma

			if (query.evaluate ()) result.push (magma)
		}

		return Magma.filter (result, propertyList.splice (1))
		
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

	opToTable (op = this.ops[0])
	{
		var array = []
		for (var entry of this.lut[op])
			array.push (entry.join(""))
		return array.join("\n")
	}

	opToHTMLTable (op = this.ops[0])
	{
		var table = document.createElement("table")
		for (var row of this.lut[op])
		{
			var tr = document.createElement ("tr")
			for (var cell of row)
			{
				var td = document.createElement ("td")
				td.innerHTML = cell
				tr.appendChild(td)
			}
			table.appendChild(tr)
		}
		table.className = "operator"
		return table
	}
}

class Term
{
	constructor (input = [], magma = new Magma ())
	{
		this.input = input; this.lut = magma.lut; this.magma = magma
		this.progress = 0; this.stack = []
	}

	static fromString (termString = "", magma = new Magma (), separator = "")
	{ return new Term (termString.split(separator), magma) }

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

class Relation // todo: equations probably won't cut it forever
{}

class Query // checks if properties apply
{
	constructor (quantifiers = [], limit = 0, term = new Term ())
	{
		this.quantifiers = quantifiers; this.limit = limit
		this.term = term
	}

	static fromString (quantifiersString = "", limit = 0, term = new Term ())
	{ return new Query (quantifiersString.match (/.{2}/g), limit, term) }

	static fromPropertyString (propString, magma)
	{
		const lower = "abcdefghijklmnopqrstuvwxyz"
		const upper = lower.toUpperCase()
		const opSymbols = "*+/-&|%$"
		
		var opCount = 0
		while (propString.includes (opSymbols [opCount]))
		{
			while (propString.includes (opSymbols [opCount]))
				propString = propString.replace
				(opSymbols [opCount], magma.ops[opCount])
			opCount++
		}

		var quanifierCount = 0; var quantifiers = []

		while (quanifierCount < lower.length)
		{
			if (propString.includes (lower[quanifierCount]))
				quantifiers.push (lower[quanifierCount] + "E")
			else if (propString.includes (upper[quanifierCount]))
				quantifiers.push (upper[quanifierCount] + "A")
			else break
			quanifierCount++
		}

		return new Query
		(
			quantifiers,
			magma.getLimit (),
			Term.fromString(propString, magma, "")
		)

	}

	evaluate ()
	{

		if (this.quantifiers.length == 0)
			return this.term.isEqual ()
		else
		{
			const all_not_ex = this.quantifiers[0][1] == "A"
			const replaceThis = this.quantifiers [0][0]
			var count = 0; var result = all_not_ex

			while (count < this.limit && result == all_not_ex)
			{
				var newInput = this.term.input.map (function (variable)
				{ return variable == replaceThis ? count : variable; })
				var subQuery = new Query
				(
					this.quantifiers.slice (1),
					this.limit,
					new Term (newInput, this.term.magma)
				)
				result = subQuery.evaluate ()
				count ++
			}
			return result
		}
	}
}

class MagmaGenerator //todo: generate magmas with given properties
{}

class QueryGenerator //todo: generate properties
{}