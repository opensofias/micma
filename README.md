# micma

abstract algebra playground. has a little ui for generating binary operators/magmas.

## property notation

i've come up with a nice notation for writing algebraic properties. variables are quantified by their case (uppercase for univeral, lowercase for existence) in order of the alphabet. 

## implemented features

* define operations
* evaluate terms
* match algebraic expressions using equalities and quantors
* generate all possible operators on a given number of elements
* filter operators using properties as defined in my property notation
* little ui for generating magmas

## roadmap

### probably

1. rewrite: see core.js
2. optimization: typed arrays and web workers

### maybe

1. relations: defining properties by more than equalities
2. discover possible properties by itself
3. find implications between properties
4. TypeScript

## history

this is a successor of the magmas.js project. i plan to renaming it back to magmas.js when core.js is done.

the reason for the fork was a focus on lookup-tables. i suspected this to have a bigger impact then it had so far.

