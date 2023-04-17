let gui = new dat.GUI();
let faceArr = [];
let face;

console.log(seedArr);

function setup() {
  let guiFolderCount = 0;
  createCanvas(windowWidth, windowHeight, SVG);
  for (let i = 0; i < rows; i++) {
    for (let j = cols; j > 0; j--) {
      guiFolderCount++;
      let f = new Face(
        spacing * 0.5 + spacing * i,
        spacing * 0.75 * j,
        28,
        seedRadius,
        seedArr[i * j]
      );
      faceArr.push(f);
      createGUI(f, guiFolderCount);
    }
  }

  for (let i = 0; i < faceArr.length; i++) {
    faceArr[i].randomizeVals();
  }
  draw();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  for (let i = 0; i < faceArr.length; i++) {
    faceArr[i].draw();
  }
  // noLoop();
}

class Face {
  constructor(x, y, sides, radius, seed) {
    this.x = x;
    this.y = y;

    this.hairTypeArr = ["buns", "lines"];
    this.sides = sides;
    this.radius = radius;
    this.seed = seed;
    this.seedVal = seed.base;

    this.hairType =
      this.hairTypeArr[Math.floor(Math.random() * this.hairTypeArr.length)];

    let hairTopPoint;
    let hairBottomPoint;

    if (this.hairType === "lines") {
      hairTopPoint = 0;
      hairBottomPoint = Math.floor(random(this.sides * 0.4, this.sides * 0.9));
    } else if (this.hairType === "buns") {
      hairTopPoint = Math.floor(random(0, this.sides * 0.25));
      hairBottomPoint = Math.floor(random(1, this.sides * 0.45 - hairTopPoint));
    }

    this.hairVals = {
      density: 10,
      shape: {
        x1: -164,
        y1: -120,
        x2: -33,
        y2: 123,
      },
      position: {
        top: hairTopPoint,
        bottom: hairTopPoint + hairBottomPoint,
      },
      fringe: {
        length: 4,
        waveFrequency: 0.08,
        waveAmplitude: 5,
        curve: { x1: this.radius * 0.5, y1: 10, x2: this.radius * 0.25, y2: 0 },
      },
      texture: {
        amount: 20,
      },
      buns: {
        radius: 2,
      },
    };

    this.faceVals = {
      eyeShape: {},
    };

    this.headArr = [];
    this.hairLineArr = [];
  }

  randomizeVals() {
    let seedVal = this.seedVal;
    this.sides = seedVal;
    this.hairVals.density = random(10, 20);

    if (this.hairType === "lines") {
      this.hairVals.position.top = 0;
      this.hairVals.position.bottom = Math.floor(
        random(Math.floor(this.sides * 0.2), Math.floor(this.sides * 0.8))
      );

      this.hairVals.fringe.length = Math.floor(random(3, this.sides * 0.3));

      let shapex1 = random(-spacing * 0.8, 0);
      this.hairVals.shape.x1 = shapex1;
      this.hairVals.shape.y1 = random(-shapex1, shapex1);
      this.hairVals.shape.x1 = random(shapex1, shapex1);
      this.hairVals.shape.y2 = random(-shapex1, shapex1);
      this.hairVals.texture.amount = random(
        -this.sides * 0.15,
        this.sides * 0.15
      );

      let fringex1 = random(0, this.radius);
      this.hairVals.fringe.curve.x1 = fringex1;
      this.hairVals.fringe.curve.y1 = random(-fringex1, fringex1);
      this.hairVals.fringe.curve.x2 = random(0, fringex1);
      this.hairVals.fringe.curve.y2 = random(-fringex1, fringex1);

      this.hairVals.texture.amount = random(-100, 100);
    }

    if (this.hairType === "buns") {
      this.hairVals.texture.amount = Math.floor(random(4, this.sides * 0.75));
      this.hairVals.fringe.length = Math.floor(random(2, this.sides * 0.3));
    }
  }

  clearArrays() {
    this.headArr = [];
    this.hairLineArr = [];
  }

  headShape() {
    makePolygon(this.x, this.y, this.sides, this.radius, this.headArr, true);
    this.head100p = percentMarker(this.headArr, 100);
    this.head75p = percentMarker(this.headArr, 75);
    this.head50p = percentMarker(this.headArr, 50);
    this.head25p = percentMarker(this.headArr, 25);
  }

  hair() {
    let hairline = {
      start: {
        x: this.headArr[this.hairVals.fringe.length].x,
        y: this.headArr[this.hairVals.fringe.length].y,
      },
      end: {
        x: this.headArr[this.head100p - this.hairVals.fringe.length - 1].x,
        y: this.headArr[this.head100p - this.hairVals.fringe.length - 1].y,
      },
    };

    let v1 = createVector(hairline.start.x, hairline.start.y);
    let v2 = createVector(hairline.end.x, hairline.end.y);

    for (let i = 0; i < 1; i += this.hairVals.fringe.waveFrequency) {
      this.hairLineArr.push({
        x: p5.Vector.lerp(v1, v2, i).x,
        y: p5.Vector.lerp(v1, v2, i).y,
      });
    }
    this.hairLineArr.push({ x: hairline.end.x, y: hairline.end.y });
    if (this.hairType === "buns") {
      if (this.hairVals.fringe.length != 0) {
        createWavyFringe(this.hairLineArr, hairline, this.hairVals);
      }
      createHairBuns(
        this,
        this.headArr,
        this.hairLineArr,
        this.hairVals,
        hairline
      );
    }
    if (this.hairType === "lines") {
      if (this.hairVals.fringe.length != 0) {
        createLineFringe(
          this.headArr,
          this.hairLineArr,
          hairline,
          this.hairVals
        );
      }
      createLineHair(this, this.headArr, this.hairlineArr, hairline);
    }
  }

  draw() {
    this.clearArrays();
    this.headShape();
    this.hair();
    noFill();
  }
}

function makePolygon(xStart, yStart, numSides, r, arr, show) {
  let angle, step;
  angle = 0;
  step = TWO_PI / numSides;
  beginShape();
  for (let i = 0; i <= numSides; i++) {
    let x = r * sin(angle);
    let y = r * cos(angle);

    if (show === null || show === true) {
      vertex(xStart - x, yStart - y);
    }
    angle = angle + step;

    if (arr != null) {
      arr.push({ x: xStart - x, y: yStart - y });
    }
  }
  endShape();
}

function keyPressed() {
  if (key === "s") {
    save("faces.svg");
  }
}

function percentMarker(arr, percent) {
  percent *= 0.01;

  if (percent != 100) {
    return Math.floor(arr.length * percent);
  } else if (percent === 100) {
    return Math.floor(arr.length - 1 * percent);
  }
}
