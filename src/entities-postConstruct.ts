import { injectable, inject, Container, postConstruct } from "inversify";
import "reflect-metadata";
import TYPES from "./types";

export interface Warrior {
    fight(): string;
    sneak(): string;
}

export interface Weapon {
    hit(): string;
}

export interface ThrowableWeapon {
    throw(): string;
}

@injectable()
class Katana implements Weapon {
    public hit() {
        return "cut!";
    }
}

@injectable()
class Shuriken implements ThrowableWeapon {
    public throw() {
        return "hit!";
    }
}

@injectable()
class Ninja implements Warrior {

    private _katana: Weapon;
    private _shuriken: ThrowableWeapon;

    public constructor(
        @inject(TYPES.Weapon) katana: Weapon,
        @inject(TYPES.ThrowableWeapon) shuriken: ThrowableWeapon
    ) {
        this._katana = katana;
        this._shuriken = shuriken;
    }

    /**
     * component is added to container AFTER synchronous postConstruct method is finished.
     * but if postConstruct method is asynchronous container does not wait for the promise to resolve before injecting it
     */
    @postConstruct()
    init() {
        let ms = 10000;
        // Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
        console.log("Waiting...")
        setTimeout(function () {
            console.log("... finished")
        }, ms);
    }

    public fight() { return this._katana.hit(); };
    public sneak() { return this._shuriken.throw(); };

}

export { Ninja, Katana, Shuriken };

var container = new Container();
container.bind<Warrior>(TYPES.Warrior).to(Ninja);
container.bind<Weapon>(TYPES.Weapon).to(Katana);
container.bind<ThrowableWeapon>(TYPES.ThrowableWeapon).to(Shuriken);

export default container;