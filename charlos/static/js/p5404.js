// ================
//     grid.js
// ================

let formation = [ // 404
  0,0,1, 0, 0,1,1,0, 0, 0,0,1,
  0,1,1, 0, 1,0,0,1, 0, 0,1,1,
  1,0,1, 0, 1,0,0,1, 0, 1,0,1,
  1,1,1, 0, 1,0,0,1, 0, 1,1,1,
  0,0,1, 0, 0,1,1,0, 0, 0,0,1
]
, three = [
  1,0,1, 0, 0,1,1,1,0, 0, 1,0,1,
  1,0,1, 0, 0,0,0,1,0, 0, 1,0,1,
  1,1,1, 0, 0,0,1,0,0, 0, 1,1,1,
  0,0,1, 0, 0,0,0,1,0, 0, 0,0,1,
  0,0,1, 0, 0,1,1,1,0, 0, 0,0,1
]
, two = [
  1,0,1, 0, 0,1,1,1,0, 0, 1,0,1,
  1,0,1, 0, 0,0,0,1,0, 0, 1,0,1,
  1,1,1, 0, 0,0,1,0,0, 0, 1,1,1,
  0,0,1, 0, 0,1,0,0,0, 0, 0,0,1,
  0,0,1, 0, 0,1,1,1,0, 0, 0,0,1
]
, one = [
  1,0,1, 0, 0,1,1,0,0, 0, 1,0,1,
  1,0,1, 0, 0,0,1,0,0, 0, 1,0,1,
  1,1,1, 0, 0,0,1,0,0, 0, 1,1,1,
  0,0,1, 0, 0,0,1,0,0, 0, 0,0,1,
  0,0,1, 0, 0,1,1,1,0, 0, 0,0,1
]
, text_old = [ // 404
  0,0,0,1,0, 0, 0,1,1,1,0, 0, 0,0,0,1,0,
  0,0,1,1,0, 0, 1,0,0,0,1, 0, 0,0,1,1,0,
  0,1,0,1,0, 0, 1,0,1,0,1, 0, 0,1,0,1,0,
  1,1,1,1,1, 0, 1,0,1,0,1, 0, 1,1,1,1,1,
  0,0,0,1,0, 0, 1,0,0,0,1, 0, 0,0,0,1,0,
  0,0,0,1,0, 0, 0,1,1,1,0, 0, 0,0,0,1,0
]
, grids = {
    easy: {
      cols: 12,
      seq: [
        [
          0,0,0,0,1,1,1,1,0,0,0,0,
          0,1,1,1,1,1,1,1,1,1,1,0,
          1,1,1,1,1,1,1,1,1,1,1,1,
          1,1,1,0,0,1,1,0,0,1,1,1,
          1,1,1,1,1,1,1,1,1,1,1,1,
          0,0,0,1,1,0,0,1,1,0,0,0,
          0,0,1,1,0,1,1,0,1,1,0,0,
          1,1,0,0,0,0,0,0,0,0,1,1
        ],
        [
          0,0,0,0,1,1,1,1,0,0,0,0,
          0,1,1,1,1,1,1,1,1,1,1,0,
          1,1,1,1,1,1,1,1,1,1,1,1,
          1,1,1,0,0,1,1,0,0,1,1,1,
          1,1,1,1,1,1,1,1,1,1,1,1,
          0,0,1,1,1,0,0,1,1,1,0,0,
          0,1,1,0,0,1,1,0,0,1,1,0,
          0,0,1,1,0,0,0,0,1,1,0,0
        ]
      ]
    },
    medium: {
      cols: 11,
      seq: [
        [
          0,0,1,0,0,0,0,0,1,0,0,
          0,0,0,1,0,0,0,1,0,0,0,
          0,0,1,1,1,1,1,1,1,0,0,
          0,1,1,0,1,1,1,0,1,1,0,
          1,1,1,1,1,1,1,1,1,1,1,
          1,0,1,1,1,1,1,1,1,0,1,
          1,0,1,0,0,0,0,0,1,0,1,
          0,0,0,1,1,0,1,1,0,0,0
        ],
        [
          0,0,1,0,0,0,0,0,1,0,0,
          1,0,0,1,0,0,0,1,0,0,1,
          1,0,1,1,1,1,1,1,1,0,1,
          1,1,1,0,1,1,1,0,1,1,1,
          1,1,1,1,1,1,1,1,1,1,1,
          0,1,1,1,1,1,1,1,1,1,0,
          0,0,1,0,0,0,0,0,1,0,0,
          0,1,0,0,0,0,0,0,0,1,0
        ]
      ]
    },
    hard: {
      cols: 8,
      seq: [
        [
          0,0,0,1,1,0,0,0,
          0,0,1,1,1,1,0,0,
          0,1,1,1,1,1,1,0,
          1,1,0,1,1,0,1,1,
          1,1,1,1,1,1,1,1,
          0,0,1,0,0,1,0,0,
          0,1,0,1,1,0,1,0,
          1,0,1,0,0,1,0,1
        ],
        [
          0,0,0,1,1,0,0,0,
          0,0,1,1,1,1,0,0,
          0,1,1,1,1,1,1,0,
          1,1,0,1,1,0,1,1,
          1,1,1,1,1,1,1,1,
          0,1,0,1,1,0,1,0,
          1,0,0,0,0,0,0,1,
          0,1,0,0,0,0,1,0
        ]
      ]
    },
    ship: {
      cols: 15,
      seq: [
        [
          0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,
          0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
          0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
          0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
          1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
          1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
          1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
          1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
        ]
      ]
    }
};



// =========================
//     asset-factory.js
// =========================

// Asset factory will create a bitmap-like image from a grid
let assetFactory = function(grid, index = 0, c = 55) {
//  will return a PImage
let scale = 2;
  let seq = grid.seq[index];
  let img = createImage(
    grid.cols * scale,
    (seq.length/grid.cols) * scale
  );
  img.loadPixels();

  for (let i = 0; i < seq.length; i++) {
    let x = i % grid.cols;
    let y = i < grid.length ? 0 : floor(i/grid.cols);
    let c1 = seq[i] ? color(c) : color('rgba(0,0,0,0)');
    let xoff = x * scale;
    let yoff = y * scale;

    for (let j = 0; j < scale; j++) {
      for (let k = 0; k < scale; k++) {
        img.set(
          xoff + j,
          yoff + k,
          c1
        );
      }
    }
  }
  img.updatePixels();

  // NOTE cannot do it this way as the resize antialiases
  // for (let j = 0; j < img.height; j++) {
  //   for (let i = 0; i < img.width; i++) {
  //     let index = (i + (grid.cols * j));
  //     img.set(
  //       i,
  //       j,
  //       grid.seq[index] ? color(c) : color('rgba(0,0,0,0)')
  //     );
  //   }
  // }
  // img.resize(img.width*3, 0);

  return img;
};



// ================
//     enemy.js
// ================

class PixelController {
  constructor(grid, cols) {
    this.cols = cols;
    this.rows = grid.length/this.cols;
    this.score = 0;
    this.list = [];
    this.dir = 1; // go right
    let assets = {
      enemy1: {
        grid: grids.easy,
        imgs: [assetFactory(grids.easy, 0), assetFactory(grids.easy, 1)],
      },
      enemy2: {
        grid: grids.medium,
        imgs: [assetFactory(grids.medium, 0), assetFactory(grids.medium, 1)]
      },
      enemy3: {
        grid: grids.hard,
        imgs: [assetFactory(grids.hard, 0), assetFactory(grids.hard, 1)]
      }
    };
    let area = {
      width: 16,
      height: 12
    };

    // center the grid
    let gridWidth = this.cols * (area.width * 2);
    let xstart = (width - gridWidth) / 2;

    for (let i = 0; i < grid.length; i++) {
      if (grid[i]) {
        let col = i % cols; // get the current column, reset after each column limit
        let row = floor(i / cols); // find out which row we are on
        let imgs = row < 1
          ? assets.enemy3.imgs
          : row < 3 ? assets.enemy2.imgs : assets.enemy1.imgs;

        this.list.push(
          new Pixel(
            col,
            row,
            area.width,
            area.height,
            xstart,
            imgs
          )
        );
      }
    }
  }
  update() {
//  if any of the enemys are getting too close to the edge, change direction
    let isOutOfBounds = false;

    if (this.list.length === 0) {
      game.reset();
    }

    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].isOutOfBounds()) {
        isOutOfBounds = true;
        break;
      }
    }

    if (isOutOfBounds) {
      this.dir *= -1;
      this.list.forEach(e => { e.drop = true });
    }

    this.move();
    return this;
  }
  show() {
    this.list.forEach(enemy => {
      enemy.show();
    });
  }
  collision(laser) {
    if (laser.list.length > 0) {
      for (let i = laser.list.length -1; i >= 0; i--) {
        for (let j = this.list.length - 1; j >= 0; j--) {
          if (laser.list[i]) {
            if (laser.list[i].hits(this.list[j])) {
              laser.remove(i);
              this.die(j);
            }
          }
        }
      }
    }
  }
  die(i) {
    game.score += 20;
    this.list.splice(i, 1);
  }
  // detectCol(laser) {
  //   this.list.forEach(e => {  });
  // }
  move() {
    this.list.forEach(enemy => {
      enemy.update(this.dir, this.drop);
    });
  }
}

class Pixel {
  constructor(col = 0, row = 0, w = 16, h = 10, xstart, imgs) {
    this.w = w;
    this.h = h;
    this.pos = createVector(
      xstart + this.w + (this.w * 2) * col,
      (this.h * 3) + (this.h * 2 * row)
    );
    this.speed = 3;
    this.imgs = imgs;
    this.switch = false;
    this.dir;
  }
  show() {
    // fill(255, 0, 200);
    // console.log(`x:${this.pos.x}, y:${this.pos.y}`);
    // rect(this.pos.x, this.pos.y, this.w * 2, this.h * 2);
    image(
      this.imgs[this.switch ? 0 : 1],
      this.pos.x,
      this.pos.y
    );
  }
  update(dir, drop) {
    this.dir = dir;
    if (frameCount % 30 === 0) {
      if (!this.drop) {
        this.pos.x += dir * (this.w / 2);
        this.switch = !this.switch;
      }
      else {
        this.pos.y += this.h * 2;
        this.drop = !this.drop;
      }
    }
    // this.pos.x += dir * this.speed;
  }
  getLimit(side) {
    switch (side) {
      case "left": return this.pos.x - this.w;
      case "right": return this.pos.x + this.w;
    }
  }
  isOutOfBounds() {
    return (this.dir === -1)
      ? this.getLimit("left") <= 0 + this.w * 3
      : this.getLimit("right") >= width - this.w * 4;
  }
}




// ================
//     laser.js
// ================
class LaserController {
  constructor() {
    this.list = new Array();
  }
  add(laser) {
    if (this.list.length === 0) // only allow one laser at a time
      this.list.push(laser);
  }
  remove(i) {
    this.list.splice(i, 1);
  }
  update() {
    let list = this.list;

    if (list.length > 0) {
      for (let i = list.length -1; i >= 0; i--) {
        let laser = list[i];
        laser.update().show();

        if (laser.pos.y <= 0) {
          list.splice(i, 1);
        }
      }
    }

    return this;
  }
  show() {
    this.list.forEach(laser => {
      laser.show();
    })
  }
}

class Laser {
  constructor(pos) {
    this.pos = pos.copy();
    this.w = 2;
    this.h = 4;
    this.speed = 4;
  }
  hits(enemy) {
    return this.pos.dist(enemy.pos) < this.w + enemy.w / 2;
  }
  update() {
    this.pos.y -= this.speed;
    return this;
  }
  show() {
    noStroke();
    // fill(50, 0, 200);
    rect(this.pos.x, this.pos.y, this.w, this.h);
  }
}


// ===============
//     ship.js
// ===============
class Ship {
  constructor(baseRotationZ) {
    this.size = 20;
    this.pos = createVector(width/2, height - this.size);
    this.speed = 3;
    this.dir = 0;
    this.img = assetFactory(grids.ship)
  }
  update() {
    this.move();
    return this;
  }
  show() {
    // fill(255);
    // rect(this.pos.x, this.pos.y, this.size, this.size)
    image(this.img, this.pos.x, this.pos.y);
  }
  move() {
    if (this.pos.x <= width && this.pos.x >= 0) {
      this.pos.x += this.dir * this.speed;
    }
    else {
      if (this.pos.x > width)
        this.pos.x = width;

      if (this.pos.x < 0)
        this.pos.x = 0;
    }
  }
  hits(enemies) {
    let last = enemies.list[enemies.list.length - 1];
    return this.pos.y <= last.pos.y + last.h;
  }
}



// ==================
//     sketch.js
// ==================

let Invaders = function(opt = {}) {

	let SPACE = 32
		, defaults = {
			bgColor: 'grey',
			enemyColor: 55
		}
		, settings = Object.assign(defaults, opt)
	  , ship
		, laser
	  , enemies
		, isMobile = false
		, mobileLoop = function() {}; // empty until we know user is on mobile

	this.score = 0;


	window.setup = function() {
	  let canvas = createCanvas(600, 400);
        canvas.parent('canvas-container');
    // set smart sizing for mobile devices
    $('#' +canvas.id()).css({maxWidth: "600px", width: "100%"});

	  rectMode(CENTER);
	  ellipseMode(CENTER);
		imageMode(CENTER);
		textAlign(CENTER);
		textSize(18);
		textFont('Courier New');
		textStyle(BOLD);
	  // frameRate(20);
	  fill(settings.enemyColor);
		noStroke();
	  ship = new Ship();
	  enemies = new PixelController(formation, 12);
		laser = new LaserController();
	  // noLoop();
	}

	window.draw = function() {
	  background(settings.bgColor);
	  ship.update().show();
		laser.update().show();
		enemies.collision(laser);
		enemies.update().show();

		text(game.score, 20, 20);

		if (ship.hits(enemies)) {
			game.reset();
		}

		mobileLoop();
	}

	// deviceMoved is only fired once
	// so we can use it to attach mobile only events when needed
	window.deviceMoved = function() {
		if (!isMobile) {
			window.touchStarted = function(e) {
				e.preventDefault();
				laser.add(new Laser(ship.pos));
			}

			mobileLoop = function() {
				if (rotationZ > 95) {
					ship.dir = -1
				}
				else if (rotationZ < 85) {
					ship.dir = 1
				}
			}
		}
		isMobile = !isMobile;
	}

	window.keyPressed = function(event) {
	  switch (keyCode) {

	    case SPACE:
        console.log(event);
        event.preventDefault();
        laser.add(new Laser(ship.pos));
        break;

	    case RIGHT_ARROW: ship.dir = 1; break;
	    case LEFT_ARROW: ship.dir = -1; break;
			case ESCAPE: reset(); 					break;
	  }
	}

	window.keyReleased = function() {
	  switch (keyCode) {
	    case SPACE:
	      break;
	    case RIGHT_ARROW:
	    case LEFT_ARROW:
	      ship.dir = 0;
	      break;
	  }
	}

	this.reset = function() {
		ship = new Ship();
	  enemies = new PixelController(formation, 12);
		laser = new LaserController();
		game.score = 0;
	}

}


let game = new Invaders({
  bgColor: 'rgba(245,247,250,0.5)'
});
