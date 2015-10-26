// Enemies our player must avoid
var Enemy = function(x, y, p) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';


    this.x = x * 100;
    this.y = (y * 85) - (85 / 3);
    this.speed = p;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.


    if ((this.x + dt * this.speed) < 500) {
        this.x += dt * this.speed;
    } else {
        this.x = -100;
    }
}


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

/**
 * Player from the game.
 * @param {int} x is a int which should contain x-asis coordinate.
 * @param {int} y is a int which should contain x-asis coordinate.
 */
var Player = function(x, y) {


    this.x = x * 101;
    this.y = (y * 87) - (87 / 3);
    this.score = 0;
    this.lives = 3;

    // The image/sprite for our players
    this.sprite = 'images/char-horn-girl.png';
}

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function() {
    // check if there are any enemies
    var collision = checkCollision(this.x, this.y, allEnemies);
    if (collision) {
        restartPlayer(this);
    }
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    updateScore(this);
}

function updateScore(obj) {
    //white background, otherwise overwritten
    ctx.fillStyle= 'gray';
    ctx.fillRect(0, 0, 505, 45);
    ctx.fillStyle = 'black';
    ctx.font = "36px Arial";
    ctx.textAlign = "left";

    var gradient=ctx.createLinearGradient(0,0,505,0);
    gradient.addColorStop("0","black");
    gradient.addColorStop("0.5","blue");
    gradient.addColorStop("1.0","green");
    ctx.fillStyle=gradient;

    ctx.fillText("Score: " + player.score, 0, 40);
    ctx.textAlign = "right";
    ctx.fillText("Lives: " + player.lives, 505, 40);
    ctx.fillText("Game", 305, 40)
}

//function for keyboard controls
Player.prototype.handleInput = function(key) {

    switch (key) {
    case 'left':
        if ((this.x - 101) >= 0) {
            this.x -= 101;
        }
        break;
    case 'right':
        if ((this.x + 101) < 505) {
            this.x += 101;
        }
        break;
    case 'up':
        if ((this.y - 83) > 0) {
            this.y -= 83;
        }
        else {
            this.y = (5 * 83) - (83 / 3);
            this.score += 100;
        }
        break;
    case 'down':
        if ((this.y + 83) < (5 * 83)) {
            this.y += 83;
        }
        break;
    default:
    }
}


function checkCollision (X, Y, arrayObjs) {
    for (obj in arrayObjs) {
        var objX = (arrayObjs[obj].x / 101).toFixed(0);
        var objY = (arrayObjs[obj].y / 83).toFixed(0);
        //checking collision by checking character placement as well as enemies

        if ((objX == (X / 101).toFixed(0)) && (objY == (Y / 83).toFixed(0))) {
            //collision
            return true;

        }

    }
    return false;
}

/**
 * Function for handling end of the game.
 * @param {object} obj is an object, in this case player.
 */
function restartPlayer(obj) {
    obj.x = 2 * 101;
    obj.y = (5 * 83) - (83 / 3);
    obj.lives -= 1;

    if (obj.lives <= 0) {
        //stop game, stop engine
        obj.score = 0;
        obj.lives = 3;

    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
//var enemy = new Enemy (1, 2, 20);
var player = new Player(2, 5);
var allEnemies = [];
for (var row = 1; row < 4; row++) {
    var numberEnemies = 5 - row;
    for (var i = 1; i < numberEnemies; i++) {
        allEnemies.push(new Enemy(numberEnemies - row, row, numberEnemies * row * 12))
    }
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


