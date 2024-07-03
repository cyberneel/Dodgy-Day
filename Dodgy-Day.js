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
  GameLoop();

})

// Random Number Gen
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


// Main Game Loop
const playerObj = getFirst(player);
function GameLoop() {
  var playerTile = getTile(playerObj.x, playerObj.y);
  // loop through the sprites at the tile
  playerTile.forEach(sprite => {
    if (sprite.type === bomb) {
      playerObj.remove()
      addText("GAME OVER", {
        x: 5,
        y: 12,
        color: color`5`
      })
    }
  });
}