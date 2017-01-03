(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

"use strict";

function isInViewport() {

  function __inView(el) {
    var bounds = el.getBoundingClientRect();
    return bounds.top < window.innerHeight && bounds.bottom > 0;
  }

  var self = {
    inView: function(el, cb) {
      for (var i=0; i<el.length; i++) {
        if (__inView(el[i])) {
          return cb(el);
        }
      }
    },
    isInView: function(el) {
      for (var i=0; i<el.length; i++) {
        return __inView(el[i]);
      };

    },
  };
  return self;
}

module.exports = isInViewport();

},{}],2:[function(require,module,exports){
"use strict";

// Inspired by Daniel Shiffman
// Original code: https://youtu.be/IKB1hWWedMk
// has been modified to get around a beginShape() (slow) and TRIANGLE_STRIP (non functioning) bugs

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var name = 'ocean';
var sketch = function sketch(opt) {
  return function (p) {
    var self = this,
        cols = void 0,
        rows = void 0,
        w = void 0,
        h = void 0,
        scl = void 0,
        flying = 0,
        terrain = void 0;

    p.setup = function () {
      var cnv = p.createCanvas(opt.getWidth(), opt.getHeight(), p.WEBGL);

      $(cnv.canvas).css(opt.ocean.css);

      w = p.int(p.width * 2);
      h = p.int(p.height * 1.5);
      scl = p.width <= 1000 ? 30 : p.width <= 1600 ? 45 : 60;
      cols = p.int(w / scl);
      rows = p.int(h / scl);
      terrain = new Terrain();

      p.frameRate(60);
      // noLoop();
    };

    p.draw = function () {
      // p.background(0);
      p.fill('#3c3cab');

      // p.rotateX((-p.PI * 0.4) + (p.PI * p.map(p.mouseY / windowHeight, 0, 1, -0.1, 0.1)));
      // p.rotateZ(p.PI/15 * (p.map(p.mouseX, 0, p.width, -p.width/2, p.width/2) / p.width/2));
      // p.rotateZ(p.radians(p.int(196 + p.map(p.rotationZ, 0, 359, 149, 210))));
      p.rotateX(-p.PI * 0.4);
      p.translate(-w / 2, -h / 2);

      terrain.show();
      terrain.gen();
    };

    p.windowResized = _.debounce(function () {
      p.resizeCanvas(opt.getWidth(), opt.getHeight());
    }, 300);

    var Terrain = function () {
      function Terrain() {
        _classCallCheck(this, Terrain);

        this.zList = [];
        this.perlinOffset = 0.1;
        this.gen();
      }

      _createClass(Terrain, [{
        key: 'gen',
        value: function gen() {
          for (var x = 0; x < cols; x++) {
            this.zList[x] = [];
          }this.update();
        }
      }, {
        key: 'update',
        value: function update() {

          var yoff = flying;

          for (var y = 0; y < rows; y++) {
            var xoff = 0;
            for (var x = 0; x < cols; x++) {
              this.zList[x][y] = p.map(p.noise(xoff, yoff), 0, 1, -100, 100);
              xoff += this.perlinOffset;
            }
            yoff += this.perlinOffset;
          }
          flying -= 0.005;
        }
      }, {
        key: 'show',
        value: function show() {
          p.beginShape();
          for (var y = 0; y < rows - 1; y++) {

            if (y % 2 === 0) {
              for (var x = 0; x < cols - 1; x++) {
                // to get around the TRIANGLE_STRIP bug in p5
                // we can manually draw the Z shape needed
                p.vertex(x * scl, y * scl, this.zList[x][y]); // begin top left
                p.vertex((x + 1) * scl, y * scl, this.zList[x + 1][y]); // move right
                p.vertex(x * scl, (y + 1) * scl, this.zList[x][y + 1]); // move down & left
                p.vertex((x + 1) * scl, (y + 1) * scl, this.zList[x + 1][y + 1]); // move right
              }
            } else {
              for (var _x = cols - 2; _x > 0; _x--) {
                // here we only need move backwards drawing a V
                p.vertex(_x * scl, (y + 1) * scl, this.zList[_x][y + 1]);
                p.vertex(_x * scl, y * scl, this.zList[_x][y]);
              }
            }
          }
          p.endShape();
        }
      }]);

      return Terrain;
    }();
  };
};

module.exports = { name: name, sketch: sketch };

},{}],3:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var name = 'stars';
var sketch = function sketch(opts) {

  return function (p) {

    var maxd = 2,
        stars = void 0;

    p.setup = function () {
      var cnv = p.createCanvas(opts.getWidth(), opts.getHeight());
      $(cnv.canvas).css(opts.stars.css);
      // p.translate(centerX, centerY);
      setupStars();
      p.frameRate(20);
      p.colorMode(p.HSB);
    };

    p.draw = function () {
      p.noStroke();
      // centerY += 0.04;
      // p.blendMode(p.ADD);
      // p.translate(centerX + (p.mouseX - centerX) * .05, centerY + (p.mouseY - centerY) * .05);
      p.translate(p.width / 2, p.height / 5 /* middle of top fifth */
      );
      stars.forEach(function (star) {
        star.update().show();
      });
    };

    p.windowResized = _.debounce(function () {
      p.resizeCanvas(opts.getWidth(), opts.getHeight());
      setupStars();
    }, 300);

    var setupStars = function setupStars() {
      stars = new Array(p.int(p.width / 4));
      for (var i = 0; i < stars.length; i++) {
        stars[i] = new Star();
      }
    };

    var Star = function () {
      function Star() {
        _classCallCheck(this, Star);

        this.x = p.random(p.width / -2, p.width / 2);
        this.y = function () {
          while (true) {
            var r1 = p.random();
            var prob = r1;
            var r2 = p.random();
            if (r2 < prob) {
              return p.random(-p.height / 2, p.height / 4 + p.height / (2 / r1));
            }
          }
        }();
        this.dist = p.random(p.width / 2);
        this.zindex = this.dist < p.width / 5 ? 2 : this.dist < p.width / 4 ? 1 : 0;
        this.xoff = p.random(100000);
        this.isGlowing = p.random() < 0.5;
        this.glow = p.int(p.map(p.noise(this.xoff), 0, 1, 30, 100));
      }

      _createClass(Star, [{
        key: "update",
        value: function update() {
          if (this.isGlowing) {
            this.glow = p.int(p.map(p.noise(this.xoff), 0, 1, 0, 100));
            this.xoff += 0.05;
          }
          return this;
        }
      }, {
        key: "show",
        value: function show() {
          var d = p.map(this.dist, 0, p.width / 2, maxd, 1);

          p.fill(240, 48 * p.map(this.glow, 0, 100, 1, 0.25), this.glow);
          p.ellipse(this.x, this.y, d);
        }
      }]);

      return Star;
    }();
  };
};

module.exports = { name: name, sketch: sketch };

},{}],4:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isInViewport = require('isInViewport');

/**
 * Controls the display and management of p5 sketches.
 * @constructor
 * @param {Object} options - Optional configurations
 */

var P5Controller = function () {
  function P5Controller() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, P5Controller);

    var self = this;
    var defaults = {
      container: '.p5container', // container query for canvas
      $container: $('.p5container'),
      getWidth: function getWidth() {
        return this.width ? this.width : this.widthPercentage ? this.$container.outerWidth() * this.widthPercentage : this.$container.outerWidth();
      },
      getHeight: function getHeight() {
        return this.height ? this.height : this.heightPercentage ? this.$container.outerHeight() * this.heightPercentage : this.$container.outerHeight();
      },
      ocean: { css: { zIndex: 2 } },
      stars: { css: { zIndex: 1 } }
    };

    this.settings = $.extend({}, defaults, options);
    this.sketches = {};

    this._attachEvents();
  }

  _createClass(P5Controller, [{
    key: '_attachEvents',
    value: function _attachEvents() {
      // pause/play based on viewport visability
      $(window).on('scroll', _.debounce(this.onScroll, 300));
    }
  }, {
    key: 'add',
    value: function add(obj) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var settings = $.extend({}, this.settings, options);
      var name = settings.name || obj.name;
      this.sketches[name] = new p5(obj.sketch(settings), settings.$container[0]);
    }
  }, {
    key: 'onScroll',
    value: function onScroll() {
      if (_.size(this.sketches) === 0) return;

      _.each(this.sketches, function (s) {
        if (isInViewport.isInView([s.canvas])) {
          // plugin requires an array : https://github.com/Josh-Miller/isInViewport/blob/master/isInViewport.js
          s.loop();
        } else {
          s.noLoop();
        }
      });
    }
  }]);

  return P5Controller;
}();

module.exports = P5Controller;

},{"isInViewport":1}],5:[function(require,module,exports){
"use strict";

var _p5controller = require('./p5controller');

var _p5controller2 = _interopRequireDefault(_p5controller);

var _ocean = require('./creative/p5/ocean');

var _ocean2 = _interopRequireDefault(_ocean);

var _stars = require('./creative/p5/stars');

var _stars2 = _interopRequireDefault(_stars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(function () {

  var p5controller = new _p5controller2.default();

  p5controller.add(_ocean2.default);
  p5controller.add(_stars2.default, { heightPercentage: 0.3 });

  p5controller.add(_stars2.default, {
    $container: $('#promo-wrapper > .p5container'),
    name: 'stars-promo'
  });
  p5controller.add(_stars2.default, {
    $container: $('#cta > .p5container'),
    name: 'stars-cta'
  });

  window.p5cont = p5controller;
});

},{"./creative/p5/ocean":2,"./creative/p5/stars":3,"./p5controller":4}]},{},[5])


//# sourceMappingURL=p5homepage.js.map
