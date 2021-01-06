DATABASE


{
  emitter: {
	balls: {
		0: {position:  {y: 0, x: 0}}
		1: {position:  {y: 0, x: 0}}
		2: {position:  {y: 0, x: 0}}
	}
  }
  player1: {windowWidth: 1000, position: {y: 0, x: 0}}
  player2: {windowWidth: 1300, position:  {y: 0, x: 0}}
}


JS CLASS


class Emitter
	creer/supprimer/deplacer balls
	detecter collision
	win/fail

class Player
	envoyer id (player-1 ou player-2)
	envoyer position xy

canvas		
player1	  player2
view	  view
[  .     ][  ..   ]   translate
0	 	100