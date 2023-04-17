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

let seedMin = 22;
let seedMax = 22;
let seedRadius = 24;
let spacing = seedRadius * 5;

let seedArr = [];
let rows = 5;
let cols = 5;

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
