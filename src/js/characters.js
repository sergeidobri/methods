export class Character {
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

    if (!(type in Character.TYPES)) {
      throw new Error("Invalid type");
    }

    this.name = name;
    this.type = type;
    this.health = 100;
    this.level = 1;
  }

  getDamage(points) {
    if (!this.defence) return;
    const newHealth = this.health - points * (1 - this.defence / 100);
    this.health = newHealth >= 0 ? newHealth : 0;
  }

  levelUp() {
    if (!this.attack || !this.defence) return;
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
    this.attack = 25;
    this.defence = 25;
  }
}

export class Swordsman extends Character {
  constructor(name) {
    super(name, Character.TYPES.Swordsman);
    this.attack = 40;
    this.defence = 10;
  }
}

export class Magician extends Character {
  constructor(name) {
    super(name, Character.TYPES.Magician);
    this.attack = 10;
    this.defence = 40;
  }
}

export class Daemon extends Character {
  constructor(name) {
    super(name, Character.TYPES.Daemon);
    this.attack = 10;
    this.defence = 40;
  }
}

export class Undead extends Character {
  constructor(name) {
    super(name, Character.TYPES.Undead);
    this.attack = 25;
    this.defence = 25;
  }
}

export class Zombie extends Character {
  constructor(name) {
    super(name, Character.TYPES.Zombie);
    this.attack = 40;
    this.defence = 10;
  }
}
