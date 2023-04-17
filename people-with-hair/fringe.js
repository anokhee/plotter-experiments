function createWavyFringe(hairlineArr, hairline, hairVals) {
  if (hairVals.fringe.length != 0) {
    beginShape();
    curveVertex(hairline.start.x, hairline.start.y);
    for (let i = 0; i < hairlineArr.length; i++) {
      if (i % 2 === 0) {
        curveVertex(hairlineArr[i].x, hairlineArr[i].y);
      } else {
        curveVertex(
          hairlineArr[i].x,
          hairlineArr[i].y + hairVals.fringe.waveAmplitude
        );
      }
    }
    curveVertex(hairline.end.x, hairline.end.y);
    endShape();
  }
}

function createLineFringe(headArr, hairlineArr, hairline, hairVals) {
  if (hairVals.fringe.length != 0) {
    for (let i = 0; i < hairlineArr.length; i++) {
      if (i < hairlineArr.length / 2 - 1) {
        bezier(
          headArr[0].x,
          headArr[0].y,
          headArr[0].x - hairVals.fringe.curve.x1,
          headArr[0].y - hairVals.fringe.curve.y1,
          hairlineArr[i].x - hairVals.fringe.curve.x2,
          hairlineArr[i].y + hairVals.fringe.curve.y1,
          hairlineArr[i].x,
          hairlineArr[i].y
        );
      } else if (i > hairlineArr.length / 2 - 1) {
        bezier(
          headArr[0].x,
          headArr[0].y,
          headArr[0].x + hairVals.fringe.curve.x1,
          headArr[0].y - hairVals.fringe.curve.y1,
          hairlineArr[i].x + hairVals.fringe.curve.x2,
          hairlineArr[i].y + hairVals.fringe.curve.y1,
          hairlineArr[i].x,
          hairlineArr[i].y
        );
      } else {
        // calculate midpoint
      }
    }
  }
}
