# Proto
Proto is basically a interpreter for the kind of made up assembly-like language used in Computer Architecture texts. This particular one is inspired by Computer System Architecture by M. Mano.
Proto supports common register, stack based and accumulator based organizations, as well as allows registering and referencing variables (but only zero, one and two addressing modes). It is still a work-in-progress. Use at your own discretion.

## Syntax
Proto supports one, two and zero addressing modes, and supports only one operation per line (with the exceptions of some functions such as `rani` or `inp`.

### Input
To take input from the user, just put the keyword `inp` in place of any operand. For example:
    add a inp
This will take input from the user (using `prompt()`) and add then replace `inp` with the given input.

### Two Address Instructions
An example of two address instruction is

```add a 10```

This adds 10 to a, and stores it in a.

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
not|not `[op1 (V)]`<br>not|`op1`<br>`acc` and `stack`| `op1` = NOT `op1`<br>`acc` = NOT `acc`, Logical NOT first `stack` element
def|def `[op1 (V)]` `[op2 (A)]`<br>def `[op1 (V)]`|NA| Defines variable `op1`, sets it to `op2`<br>Defines variable `op1`
set|set `[op1 (V)]` `[op2 (A)]`<br>set `[op1 (A)]`|`op1`<br>`acc`|Sets variable `op1` = `op2`<br>Sets `acc` = `op2`
setz|setz `[op1 (V)]`|`op1`|Sets variable `op1` = 0
del|del `[op1 (V)]`|`op1`|Deletes variable `op1`


†See Logical Operations section for reference
‡This will be changed later to a separate flag

### One Address Instructions
Most one address instructions are the same as two address instructions, however, the second operand(`op2`) is replaced by the accumulator. For example,

```add 10```

This adds 10 to accumulator
The following operations are the same as Two Address instructions, however, they take either a number or a variable for the first operand and do not take an second operand

`setz def del ist prn bun bsa add sub mul div mod push pop prntop and or xor`
