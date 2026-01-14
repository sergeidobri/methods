class Character {
  static TYPES = {
    Bowerman: "Bowerman",
    Swordsman: "Swordsman",
    Magician: "Magician",
    Daemon: "Daemon",
    Undead: "Undead",
    Zombie: "Zombie",
  };

  constructor(name, type) {
    if (typeof name != "string" || name.length < 2 || name.length > 10) {
      throw new Error("Invalid name");
    }

    let attack = null;
    let defence = null;
    switch (type) {
      case "Bowerman":
        [attack, defence] = [25, 25];
        break;
      case "Swordsman":
        [attack, defence] = [40, 10];
        break;
      case "Magician":
        [attack, defence] = [10, 40];
        break;
      case "Daemon":
        [attack, defence] = [10, 40];
        break;
      case "Undead":
        [attack, defence] = [25, 25];
        break;
      case "Zombie":
        [attack, defence] = [40, 10];
        break;
    }

    this.name = name;
    this.type = type;
    this.health = 100;
    this.level = 1;
    if (attack) this.attack = attack;
    if (defence) this.defence = defence;
  }

  getDamage(points) {
    const newHealth = this.health - points * (1 - this.defence / 100);
    this.health = newHealth >= 0 ? newHealth : 0;
  }

  levelUp() {
    if (this.health == 0)
      throw new Error("It is imposible to level up while being dead");
    this.level += 1;
    this.attack += 0.2 * this.attack;
    this.defence += 0.2 * this.defence;
    this.health = 100;
  }
}

export class Bowerman extends Character {
  constructor(name) {
    super(name, Character.TYPES.Bowerman);
  }
}

export class Swordsman extends Character {
  constructor(name) {
    super(name, Character.TYPES.Swordsman);
  }
}

export class Magician extends Character {
  constructor(name) {
    super(name, Character.TYPES.Magician);
  }
}

export class Daemon extends Character {
  constructor(name) {
    super(name, Character.TYPES.Daemon);
  }
}

export class Undead extends Character {
  constructor(name) {
    super(name, Character.TYPES.Undead);
  }
}

export class Zombie extends Character {
  constructor(name) {
    super(name, Character.TYPES.Zombie);
  }
}
