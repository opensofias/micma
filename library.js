m = {}
m.list =
{
	GF2: ["+01,10","*00,01"],
	GF3: ["+012,120,201","*000,012,021"],
	GF4:
	[
		"+0123,1032,2301,3210",
		"*0000,0123,0231,0321"
	],
	MinMax4:
	[
		"↓0000,0111,0122,0123",
		"↑0123,1123,2223,3333"
	],
	Bitwise4:
	[
		"&0000,0101,0022,0123",
		"|0123,1133,2323,3333"
	],
	Mod4:
	[
		"+0123,1230,2301,3012",
		"*0000,0123,0202,0321"
	],
	RockPaperScizzors:
	[
		"W010,112,022",
		"L002,011,212"
	],
	Imply: ["→10,11","←11,01"],
	Inhibit: ["<01,00",">00,10"],
	NandNor: ["⊼11,10","⊽10,00"],
	EqNeq: ["~10,01","≁01,10"]
}

m.lib = function (name)
{
	magma = new Magma ()
	for (var opString of m.list[name])
	{
		magma.opFromString
		(
			opString[0],
			opString.substring(1),
			[",",""]
		)
	}
	return magma
}

q = {}
q.list =
{
	idemElement:"aE:aa*a",
	leftNeutalElement:"aEbA:ab*b",
	rightNeutalElement:"bEaA:ab*a",
	idempotent:"aA:aa*a",
	commutative:"aAbA:ab*ba*",
	diagonistic:"aAbA:aa*bb*",
	associative:"aAbAcA:abc**ab*c*",
	leftLatin:"aAcAbA:ab*c",
	rightLatin:"bAcAaE:ab*c",
	leftDistributes:"aAbAcA:ab+c*ac*bc*+"
}
q.lib = function (name)
{

}