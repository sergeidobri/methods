import {
  Bowerman,
  Daemon,
  Magician,
  Swordsman,
  Undead,
  Zombie,
  Character,
} from "../characters";

test("Bowerman object has proper general fields", () => {
  const bower = new Bowerman("Legolas");

  expect(bower.name).toBe("Legolas");
  expect(bower.type).toBe("Bowerman");
  expect(bower.health).toBe(100);
  expect(bower.level).toBe(1);
  expect(bower.attack).toBe(25);
  expect(bower.defence).toBe(25);
});

test.each(
  [
    [Bowerman, 25, 25],
    [Swordsman, 40, 10],
    [Magician, 10, 40],
    [Daemon, 10, 40],
    [Undead, 25, 25],
    [Zombie, 40, 10],
  ].map((i) => [i[0].name, ...i])
)("%s has proper unique fields", (name, clsFunc, attack, defence) => {
  const object = new clsFunc("Superman");

  expect(object.attack).toBe(attack);
  expect(object.defence).toBe(defence);
});

test.each([
  ["short name (1 symb)", "1"],
  ["long name (11 symb)", "12345678901"],
  ["not a string name", 1],
])("%s", (testName, objName) => {
  expect(() => new Bowerman(objName)).toThrow(Error);
});

test("bad type character", () => {
  expect(() => new Character("Superman", "dsaddsa")).toThrow(Error);
});

test("level up", () => {
  const obj = new Bowerman("Legolas");
  obj.getDamage(1);
  const attackInit = obj.attack;
  const defenceInit = obj.defence;

  expect(obj.health).not.toBe(100);
  expect(obj.health).not.toBe(0);

  obj.levelUp();

  expect(obj.health).toBe(100);
  expect(obj.attack).toBeCloseTo(attackInit * 1.2);
  expect(obj.defence).toBeCloseTo(defenceInit * 1.2);
});

test("bad character tries to level up", () => {
  const badBowerman = new Character("Legolas", Character.TYPES.Bowerman);
  expect(badBowerman.level).toBe(1);
  badBowerman.levelUp();
  expect(badBowerman.level).toBe(1);
});

describe("damage tests", () => {
  test("get normal damage", () => {
    const obj = new Bowerman("Legolas");

    expect(obj.health).toBe(100);
    expect(obj.defence).toBe(25);

    obj.getDamage(60);
    expect(obj.health).toBe(100 - 60 * (1 - 25 / 100));
  });

  test("get massive damage", () => {
    const obj = new Bowerman("Legolas");

    obj.getDamage(10000);

    expect(obj.health).toBe(0);
  });

  test("get level upped while being dead", () => {
    const obj = new Bowerman("Legolas");

    obj.getDamage(10000);

    expect(obj.health).toBe(0);
    expect(() => obj.levelUp()).toThrow(Error);
  });

  test("bad character gets damage", () => {
    const badBowerman = new Character("Legolas", Character.TYPES.Bowerman);
    expect(badBowerman.health).toBe(100);
    badBowerman.getDamage(10);
    expect(badBowerman.health).toBe(100);
  });
});
