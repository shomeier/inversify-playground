
import container, { Warrior } from "./entities";
import TYPES from "./types";

console.log("Test")
var ninja = container.get<Warrior>(TYPES.Warrior);

console.log(ninja.fight())
console.log(ninja.sneak())