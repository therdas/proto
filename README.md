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
add|add `[op 1 (V)]` `[op2 (A)]`<br>add `[op1 (A)]`<br>add|`op1`<br>`acc`<br>`stack`| `op1` = `op1` + `op2`<br>`acc` += `op1`<br>Pop and add first two `stack` elements and push to stack
sub|sub `[op 1 (V)]` `[op2 (A)]`<br>sub `[op1 (A)]`<br>sub|`op1`<br>`acc`<br>`stack`| `op1` = `op1` - `op2`<br>`acc` -= `op1`<br>Pop and subtract first two `stack` elements and push to stack
mul|mul `[op 1 (V)]` `[op2 (A)]`<br>mul `[op1 (A)]`<br>mul|`op1`<br>`acc`<br>`stack`| `op1` = `op1` \* `op2`<br>`acc` \*= `op1`<br>Pop and add first two `stack` elements and push to stack
div|div `[op 1 (V)]` `[op2 (A)]`<br>div `[op1 (A)]`<br>div|`op1`<br>`acc`<br>`stack`| `op1` = `op1` \/ `op2`<br>`acc` \/= `op1`<br>Pop and divide first two `stack` elements and push to stack
and|and `[op 1 (V)]` `[op2 (A)]`<br>and `[op1 (A)]`<br>and|`op1`<br>`acc`<br>`stack`| `op1` = `op1` AND `op2`<br>`acc` = `acc` AND `op1`<br>Pop and Logical AND first two `stack` elements and push to stack


†See Logical Operations section for reference
‡This will be changed later to a separate flag

### One Address Instructions
Most one address instructions are the same as two address instructions, however, the second operand(`op2`) is replaced by the accumulator. For example,

```add 10```

This adds 10 to accumulator
The following operations are the same as Two Address instructions, however, they take either a number or a variable for the first operand and do not take an second operand

`setz def del ist prn bun bsa add sub mul div mod push pop prntop and or xor`
