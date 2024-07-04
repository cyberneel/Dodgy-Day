/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Dodgy Day
@author: Neelesh Chevuri
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const bomb = "b"

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
  [bomb, bitmap`
....33333333....
...3333333333...
..333333333333..
.33333333333333.
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
.33333333333333.
..333333333333..
...3333333333...
....33333333....`]
)

setSolids([])

let level = 0
const levels = [
  map`
...............
...............
...............
...............
......b........
...............
...............
...............
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

// player Checks
function PlayerLogic() {
  playerObj.remove();
  addText("GAME OVER", {
    x: 5,
    y: 12, 
    color: color`5`
  });
  // gameOver = true;
  clearInterval(gameInterval);
  clearInterval(bombInterval);
}

// Spawn bomb
function SpawnBomb() {
  addSprite(getRndInt(0,width()-1),0,bomb);
}

// Bomb Checks
function BombLogic() {
  var bombSprites = getAll(bomb);

  bombSprites.forEach(BSprite => {
    if (BSprite.y == height()-1) {
      // Spawn New Bomb
      SpawnBomb();
      BSprite.remove()
    }
    BSprite.y += 1;
  });

}
  

// Main Game Loop
const playerObj = getFirst(player);
function GameLoop() {
  var playerTile = getTile(playerObj.x, playerObj.y);
  // loop through the sprites at the tile
  playerTile.forEach(sprite => {
    if (sprite.type === bomb) {
      PlayerLogic();
    }
  });
}


const gameInterval = setInterval(GameLoop, 100);

const bombInterval = setInterval(BombLogic, 1000);

