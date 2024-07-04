/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Dodgy Day
@author: Neelesh Chevuri
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const vBomb = "b"
const hBomb = "h"

setLegend(
  [ player, bitmap`
......0000......
.....000000.....
.....000000.....
.....000000.....
.....000000.....
......0000......
.......00.......
.....000000.....
....0.0000.0....
....0.0000.0....
......0000......
......0000......
......0..0......
......0..0......
......0..0......
......0..0......` ],
  [vBomb, bitmap`
................
................
.....333333.....
...3333333333...
...3333333333...
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
...3333333333...
...3333333333...
.....333333.....
................
................`],
  [hBomb, bitmap`
................
................
.....HHHHHH.....
...HHHHHHHHHH...
...HHHHHHHHHH...
..HHHHHHHHHHHH..
..HHHHHHHHHHHH..
..HHHHHHHHHHHH..
..HHHHHHHHHHHH..
..HHHHHHHHHHHH..
..HHHHHHHHHHHH..
...HHHHHHHHHH...
...HHHHHHHHHH...
.....HHHHHH.....
................
................`]
)

setSolids([])

let level = 0

var timeSecs = 0

const levels = [
  map`
...............
..........b....
.h.............
...............
......b........
...............
...............
h..............
...............
...............
.............p.
...............`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

// Movement Input
onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

afterInput(() => {
  
})

// Random Number Gen
function getRndInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// player died
function PlayerOver() {
  playerObj.remove();
  addText("GAME OVER\nScore: " + timeSecs, {
    x: 5,
    y: 12, 
    color: color`5`
  });
  // gameOver = true;
  clearInterval(gameInterval);
  clearInterval(bombInterval);
  clearInterval(timeInterval);
}

// Spawn bomb
function SpawnBomb(type) {
  if (type === vBomb) {
    addSprite(getRndInt(0,width()-1),0,type);
  } else if (type === hBomb) {
    addSprite(0,getRndInt(0,height()-1),type);
  }
}

// Bomb Checks
function BombLogic() {
  var vBombSprites = getAll(vBomb)
  var hBombSprites = getAll(hBomb);

  // vertical bombs
  vBombSprites.forEach(vBSprite => {
    if (vBSprite.y == height()-1) {
      // Spawn New Bomb
      SpawnBomb(vBomb);
      vBSprite.remove()
    }
    vBSprite.y += 1;
  });

  // Horizontal bombs
  hBombSprites.forEach(hBSprite => {
    if (hBSprite.x == width()-1) {
      // Spawn New Bomb
      SpawnBomb(hBomb);
      hBSprite.remove();
    }
    hBSprite.x += 1
  });
}
  

// Main Game Loop
const playerObj = getFirst(player);
function GameLoop() {
  var playerTile = getTile(playerObj.x, playerObj.y);
  // loop through the sprites at the tile
  playerTile.forEach(sprite => {
    if (sprite.type === vBomb || sprite.type === hBomb) {
      PlayerOver();
    }
  });
}

// Time increase, used for difficulty later
function UpdateTime() {
  timeSecs++;
}

// Run the logic loops periodically

const gameInterval = setInterval(GameLoop, 100);

const bombInterval = setInterval(BombLogic, 1000);

const timeInterval = setInterval(UpdateTime, 1000);

