let seedMin = 50;
let seedMax = 50;
let seedRadius = 100;
let spacing = seedRadius * 3;

let seedArr = [];
let rows = 1;
let cols = 1;

function interpolateArc(
  centerX,
  centerY,
  radius,
  startAngle,
  endAngle,
  numPoints,
  side
) {
  let arcPoints = [];
  for (let i = 0; i < numPoints; i++) {
    let angle = map(i, 0, numPoints - 1, startAngle, endAngle);
    let x = centerX + radius * Math.cos(angle);
    let y = centerY + radius * Math.sin(angle);
    let reflectedX = centerX - (x - centerX);
    let reflectedY = centerY - (y - centerY);
    if (side === "left") {
      arcPoints.push(createVector(reflectedX, reflectedY));
    } else if (side === "right") {
      arcPoints.push(createVector(x, y));
    }
  }
  return arcPoints;
}

function lerpBezier(points, t) {
  if (points.length == 1) {
    return points[0];
  }

  let newPoints = [];

  for (let i = 0; i < points.length - 1; i++) {
    let x = lerp(points[i].x, points[i + 1].x, t);
    let y = lerp(points[i].y, points[i + 1].y, t);
    newPoints.push({ x: x, y: y });
  }

  return lerpBezier(newPoints, t);
}

function populateSeeds() {
  seedArr = [];
  let seed = Math.random() * (seedMax - seedMin) + seedMin;
  for (let i = 0; i < rows * cols; i++) {
    seedArr.push({
      base: Math.floor(seed),
      hair: {
        fringe: {
          length: Math.floor(Math.random() * seed * 0.1),
        },
      },
    });
  }
  console.log(seed);
}

populateSeeds();

function star(x, y, radius1, radius2, npoints) {
  var angle = TWO_PI / npoints;
  var halfAngle = angle / 2.0;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
