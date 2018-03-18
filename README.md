# Proto
Proto is basically a interpreter for the kind of made up assembly-like language used in Computer Architecture texts. This particular one is inspired by Computer System Architecture by M. Mano.
Proto supports common register, stack based and accumulator based organizations, as well as allows registering and referencing variables (but only zero, one and two addressing modes). It is still a work-in-progress. Use at your own discretion.

## Syntax
Proto supports one, two and zero addressing modes, and supports only one operation per line (with the exceptions of some functions such as `rani` or `inp`.

### Input
To take input from the user, just put the keyword `inp` in place of any operand. For example:
    add a inp
This will take input from the user (using `prompt()`) and add then replace `inp` with the given input.

### Reference table for all operators
Operator|Syntax|Operates on|Description
--------|------|-------|-----------
add|add `[op1 (V)]` `[op2 (A)]`<br>add `[op1 (A)]`<br>add|`op1`<br>`acc`<br>`stack`| `op1` = `op1` + `op2`<br>`acc` += `op1`<br>Add first two `stack` elements
sub|sub `[op1 (V)]` `[op2 (A)]`<br>sub `[op1 (A)]`<br>sub|`op1`<br>`acc`<br>`stack`| `op1` = `op1` - `op2`<br>`acc` -= `op1`<br>Subtract first two `stack` elements
mul|mul `[op1 (V)]` `[op2 (A)]`<br>mul `[op1 (A)]`<br>mul|`op1`<br>`acc`<br>`stack`| `op1` = `op1` \* `op2`<br>`acc` \*= `op1`<br>Multiply first two `stack` elements
div|div `[op1 (V)]` `[op2 (A)]`<br>div `[op1 (A)]`<br>div|`op1`<br>`acc`<br>`stack`| `op1` = `op1` \/ `op2`<br>`acc` \/= `op1`<br>Divide first two `stack` elements
mod|mod `[op1 (V)]` `[op2 (A)]`<br>mod `[op1 (A)]`<br>mod|`op1`<br>`acc`<br>`stack`| `op1` = `op1` \% `op2`<br>`acc` \%= `op1`<br>Compute modulus using first two `stack` elements
lt|lt `[op1 (V)]` `[op2 (A)]`<br>lt `[op1 (A)]`<br>lt|`cflag`| `cflag` = `op1` < `op2`<br>`cflag` = `acc` < `op1`<br>`cflag` = `stack[top-1]`<`stack[top]`
gt|gt `[op1 (V)]` `[op2 (A)]`<br>gt `[op1 (A)]`<br>gt|`cflag`| `cflag` = `op1` > `op2`<br>`cflag` = `acc` > `op1`<br>`cflag` = `stack[top-1]`>`stack[top]`
eq|eq `[op1 (V)]` `[op2 (A)]`<br>eq `[op1 (A)]`<br>eq|`cflag`| `cflag` = `op1` == `op2`<br>`cflag` = `acc` == `op1`<br>`cflag` = `stack[top-1]`==`stack[top]`
lte|lte `[op1 (V)]` `[op2 (A)]`<br>lte `[op1 (A)]`<br>lte|`cflag`| `cflag` = `op1` ≤ `op2`<br>`cflag` = `acc` ≤ `op1`<br>`cflag` = `stack[top-1]`≤`stack[top]`
gte|gte `[op1 (V)]` `[op2 (A)]`<br>gte `[op1 (A)]`<br>gte|`cflag`| `cflag` = `op1` ≥ `op2`<br>`cflag` = `acc` ≥ `op1`<br>`cflag` = `stack[top-1]`≥`stack[top]`
and|and `[op1 (V)]` `[op2 (A)]`<br>and `[op1 (A)]`<br>and|`op1`<br>`acc`<br>`stack`| `op1` = `op1` AND `op2`<br>`acc` = `acc` AND `op1`<br>Logical AND first two `stack` elements
or|or `[op1 (V)]` `[op2 (A)]`<br>or `[op1 (A)]`<br>or|`op1`<br>`acc`<br>`stack`| `op1` = `op1` OR `op2`<br>`acc` = `acc` OR `op1`<br>Logical OR first two `stack` elements
xor|xor `[op1 (V)]` `[op2 (A)]`<br>xor `[op1 (A)]`<br>xor|`op1`<br>`acc`<br>`stack`| `op1` = `op1` XOR `op2`<br>`acc` = `acc` XOR `op1`<br>Logical XOR first two `stack` elements
not†|not `[op1 (V)]`<br>not|`op1`<br>`acc` and `stack`| `op1` = NOT `op1`<br>`acc` = NOT `acc`, Logical NOT first `stack` element
def|def `[op1 (V)]` `[op2 (A)]`<br>def `[op1 (V)]`|NA| Defines variable `op1`, sets it to `op2`<br>Defines variable `op1`
set|set `[op1 (V)]` `[op2 (A)]`<br>set `[op1 (A)]`|`op1`<br>`acc`|Sets variable `op1` = `op2`<br>Sets `acc` = `op2`
setz|setz `[op1 (V)]`|`op1`|Sets variable `op1` = 0
mov|mov `[op1 (V)]` `[op2 (A)]`|`op1`|Moves value of `op2` to `op1`
del|del `[op1 (V)]`|`op1`|Deletes variable `op1`
ist|ist `[op1 (V)]`|None|Returns true if `op1` has been defined<br>For debugging use
bun|bun `[op1 (A)]`|Current line<br>being executed|Jumps to line `op1`
bsa|bsa `[op1 (A)]`|Current line<br>being executed|Jumps to line `op1`, pushes value of current line<br>to `addressStack` for return to use
return|return|Current line<br>being executed|Jumps to line `addressStack[top]`
lda|lda `[op1 (A)]`|`acc`|Loads `op1` to `acc`
cla|cla|`acc`|Clears `acc`
inca|inca|`acc`|Increments `acc`
sna|sna|Current line<br>being executed|If `acc` is -ve skip next line
spa|spa|Current line<br>being executed|If `acc` is +ve skip next line
sza|sza|Current line<br>being executed|If `acc` is 0 skip next line
push|push `[op1 (A)]`|`stack`|Pushes `op1` to stack
pop|pop `[op1 (V)]`<br>pop|`stack`|Pops stacks and stores in `op1`<br>Pops stack without storing
prntop|prntop|Output|Prints top element of `stack`
ran|rani|Itself|Replaces itself with random integer ∈ `[0,10]`
ranr|ranr|Itself|Replaces itself with random real number ∈ `[0,1)`
ranp|ranp|Itself|Replaces itself with random number ∈ `[0,100]` (percentage)
prn|prn `op1`|Output|Prints out `op1`
inp|Used as operand|Puts user input in its place

†NOT will treat 0/1 as binary and rest as decimal. This was done to prevent default behaviour, because in JS, ~0 is -1 and ~1 is -2 (Two's complement format)
