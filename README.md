# micma

abstract algebra playground. somewhat incomplete and so far with no ui whatsoever.

check out examples.js for what it can do.

## property notation

i've come up with a pretty cool notation for denoting algebraic properties. with algebraic properies i mean things like commutativity: "for every element A and B in the set, a\*b=b\*a" or, more formally "∀a∀b a\*b=b\*a", doesn't look that bad. but is it *good*?

for one issue 

## implemented features

* define operations
* evaluate terms
* match algebraic expressions using equalities and quantors
* generate all possible
* filter operators using properties as defined in my property notation

## todo

1. make terms and queries more independent of "magmas", parameterize
2. make the whole thing more functional, i guess

## roadmap

### probably

2. discover possible properties by itself (?)
5. code reduction, cutting all this 4 days old cruft
6. optimization


### maybe

1. relations: defining properties by more than equalities
4. find implications between properties (??)
7. rewrite? TypeScript?

## history

this is a successor of the magmas.js project. https://github.com/opensofias/magmas.js

the reason for the fork was a focus on lookup-tables. i suspected this to have a bigger impact then it had so far.

