let gui = new dat.GUI();
let faceArr = [];
let face;

function setup() {
  let guiFolderCount = 0;
  createCanvas(windowWidth, windowHeight, SVG);
  for (let i = 0; i < cols; i++) {
    for (let j = rows; j > 0; j--) {
      guiFolderCount++;
      let f = new Face(
        spacing + spacing * i,
        spacing * j,
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

    this.hairTypeArr = ["buns", "buns", "lines", "lines", "lines"];
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
      hairBottomPoint = Math.floor(random(this.sides * 0.1, this.sides * 0.65));
    } else if (this.hairType === "buns") {
      hairTopPoint = Math.floor(random(0, this.sides * 0.25));
      hairBottomPoint = Math.floor(random(1, this.sides * 0.7 - hairTopPoint));
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
        length: 0,
        waveFrequency: 0.08,
        waveAmplitude: 5,
        curve: { x1: this.radius * 0.5, y1: 1, x2: this.radius * 0.5, y2: 2 },
      },
      texture: {
        amount: 20,
      },
      buns: {
        radius: 2,
      },
    };

    this.headArr = [];
    this.hairLineArr = [];

    this.faceVals = {
      eyes: {
        xPos: this.radius / 2,
        yPos: 10,
        width: this.radius * 0.4,
        height: this.radius * 0.4,
        pupilRadius: 5,
        canthalTilt: -2,
        innerCornerTilt: 1,
        lidTop: -5,
        waterline: 0,
      },
      cheeks: {
        xPos: this.radius * 0.1,
        yPos: this.radius * 0.2,
        inner: Math.floor(this.radius * 0.17),
        outer: Math.floor(this.radius * 0.14),
        sides: 8,
      },
      nose: {
        xPos: 6,
        yPos: 2,
        xOff: 4,
        yOff: 5,
      },
      mouth: {
        xPos: 6,
        yPos: 2,
        yOff: 5,
      },
    };
  }

  randomizeVals() {
    let seedVal = this.seedVal;
    this.sides = seedVal;
    this.hairVals.density = random(15, 20);

    if (this.hairType === "lines") {
      this.hairVals.position.top = 0;
      this.hairVals.position.bottom = Math.floor(
        random(Math.floor(this.sides * 0.1), Math.floor(this.sides * 0.6))
      );

      this.hairVals.fringe.length = Math.floor(
        random(this.sides * 0.1, this.sides * 0.2)
      );
      this.hairVals.fringe.waveAmplitude = random(-5, 5);

      let shapex1 = random(-spacing * 0.5, 0);
      this.hairVals.shape.x1 = shapex1;
      this.hairVals.shape.y1 = random(-shapex1 * 2, shapex1 * 2);
      this.hairVals.shape.x1 = random(shapex1 * 0.5, shapex1 * 2);
      this.hairVals.shape.y2 = random(-shapex1 * 2, shapex1 * 2);
      this.hairVals.texture.amount = random(
        -this.sides * 0.15,
        this.sides * 0.15
      );

      let fringex1 = random(0, this.radius * 0.25);
      this.hairVals.fringe.curve.x1 = fringex1;
      this.hairVals.fringe.curve.y1 = random(-fringex1, fringex1);
      this.hairVals.fringe.curve.x2 = random(0, fringex1 * 1.25);
      this.hairVals.fringe.curve.y2 = random(-fringex1, fringex1);

      this.hairVals.texture.amount = random(-120, 0);
    }

    if (this.hairType === "buns") {
      this.hairVals.texture.amount = Math.floor(random(4, this.sides * 0.75));
      this.hairVals.fringe.length = Math.floor(random(2, this.sides * 0.3));
    }

    this.faceVals.eyes.width = random(this.radius * 0.3, this.radius * 0.5);
    this.faceVals.eyes.height = random(this.radius * 0.05, this.radius * 0.3);

    this.faceVals.eyes.xPos = random(
      this.radius - this.faceVals.eyes.width,
      this.radius * 0.3
    );
    this.faceVals.eyes.yPos = random(this.radius * 0.2, this.radius * 0.5);
    this.faceVals.eyes.pupilRadius = random(
      this.faceVals.eyes.height * 0.1,
      this.faceVals.eyes.height * 0.6
    );
    this.faceVals.eyes.canthalTilt = random(
      -this.faceVals.eyes.height * 0.5,
      this.faceVals.eyes.height * 0.5
    );
    this.faceVals.eyes.innerCornerTilt = random(
      -this.faceVals.eyes.height * 0.5,
      this.faceVals.eyes.height * 0.5
    );

    let cheekSize = random(this.radius * 0.1, this.radius * 0.2);

    this.faceVals.cheeks.yPos = random(
      this.faceVals.eyes.height + cheekSize * 0.5,
      this.faceVals.eyes.height + cheekSize
    );

    this.faceVals.cheeks.inner = random(cheekSize * 0.5, cheekSize);
    this.faceVals.cheeks.outer = random(this.faceVals.cheeks.inner, cheekSize);

    this.faceVals.cheeks.xPos = random(
      this.radius * 0.5,
      this.radius - cheekSize
    );
    this.faceVals.cheeks.sides = Math.floor(random(3, 10));

    this.faceVals.nose.yPos = Math.floor(random(3, 10));
    this.faceVals.nose.xOff = Math.floor(random(-5, 5));
    this.faceVals.nose.yOff = Math.floor(random(0, 8));

    this.faceVals.mouth.xPos = Math.floor(random(3, 5));
    this.faceVals.mouth.yPos = Math.floor(random(0, 4));
    this.faceVals.mouth.yOff = Math.floor(random(-2, 2));

    console.log(this.radius, this.faceVals.eyes.yPos);
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
          this.hairVals,
          this.headArr,
          this.hairLineArr,
          hairline
        );
      }
      createLineHair(this, this.headArr, this.hairlineArr, hairline);
    }
  }

  face() {
    let flip = 1;
    let eyeVals = this.faceVals.eyes;
    let cheekVals = this.faceVals.cheeks;
    let mouthVals = this.faceVals.mouth;
    let noseVals = this.faceVals.nose;
    let yPosTop;

    if (this.hairVals.fringe.length != 0) {
      yPosTop = this.headArr[this.hairVals.fringe.length].y + eyeVals.yPos;
    } else {
      yPosTop = this.y + this.radius * 0.25;
    }

    for (let i = 0; i <= 1; i++) {
      if (i === 1) {
        flip *= -1;
      }

      // Eyes

      fill(0);
      ellipse(
        this.x - eyeVals.xPos * flip,
        yPosTop,
        eyeVals.pupilRadius,
        eyeVals.pupilRadius
      );
      noFill();
      bezier(
        this.x + eyeVals.xPos * flip - eyeVals.width * 0.5 * flip,
        yPosTop + eyeVals.innerCornerTilt,
        this.x + eyeVals.xPos * flip - eyeVals.width * 0.5 * flip,
        yPosTop + eyeVals.lidTop,
        this.x + eyeVals.xPos * flip + eyeVals.width * 0.5 * flip,
        yPosTop + eyeVals.lidTop,
        this.x + eyeVals.xPos * flip + eyeVals.width * 0.5 * flip,
        yPosTop + eyeVals.canthalTilt
      );

      bezier(
        this.x + eyeVals.xPos * flip - eyeVals.width * 0.5 * flip,
        yPosTop + eyeVals.innerCornerTilt,
        this.x + eyeVals.xPos * flip - eyeVals.width * 0.5 * flip,
        yPosTop + eyeVals.height + eyeVals.waterline,
        this.x + eyeVals.xPos * flip + eyeVals.width * 0.5 * flip,
        yPosTop + eyeVals.height + eyeVals.waterline,
        this.x + eyeVals.xPos * flip + eyeVals.width * 0.5 * flip,
        yPosTop + eyeVals.canthalTilt
      );

      // Cheeks
      star(
        this.x - cheekVals.xPos * flip,
        yPosTop + eyeVals.waterline + cheekVals.yPos,
        cheekVals.inner,
        cheekVals.outer,
        cheekVals.sides
      );
    }

    // Nose
    bezier(
      this.x,
      yPosTop + noseVals.yPos,
      this.x + noseVals.xOff,
      yPosTop + noseVals.yPos,
      this.x + noseVals.xOff,
      yPosTop + noseVals.yPos + noseVals.yOff,
      this.x,
      yPosTop + noseVals.yPos + noseVals.yOff
    );

    // Mouth
    bezier(
      this.x - mouthVals.xPos,
      yPosTop + eyeVals.yPos + noseVals.yPos + noseVals.yOff + mouthVals.yPos,
      this.x - mouthVals.xPos,
      yPosTop +
        eyeVals.yPos +
        noseVals.yPos +
        noseVals.yOff +
        mouthVals.yPos +
        mouthVals.yOff,
      this.x + mouthVals.xPos,
      yPosTop +
        eyeVals.yPos +
        noseVals.yPos +
        noseVals.yOff +
        mouthVals.yPos +
        mouthVals.yOff,
      this.x + mouthVals.xPos,
      yPosTop + eyeVals.yPos + noseVals.yPos + noseVals.yOff + mouthVals.yPos
    );
  }

  draw() {
    this.clearArrays();
    this.headShape();
    this.hair();
    this.face();
    noFill();
  }
}

function makePolygon(xStart, yStart, numSides, r, arr, show) {
  let angle, step;
  angle = 0;
  step = (TWO_PI * 1) / numSides;
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
