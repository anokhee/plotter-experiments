function createHairBuns(obj, headArr, hairlineArr, hairVals, hairline) {
  head100p = percentMarker(headArr, 100);
  head75p = percentMarker(headArr, 75);
  head50p = percentMarker(headArr, 50);
  head25p = percentMarker(headArr, 25);
  let leftSide = {
    top: {
      x: headArr[hairVals.position.top].x,
      y: headArr[hairVals.position.top].y,
    },
    bottom: {
      x: headArr[hairVals.position.bottom].x,
      y: headArr[hairVals.position.bottom].y,
    },
  };

  let rightSide = {
    top: {
      x: headArr[head100p - hairVals.position.top - 1].x,
      y: headArr[head100p - hairVals.position.top - 1].y,
    },
    bottom: {
      x: headArr[head100p - hairVals.position.bottom - 1].x,
      y: headArr[head100p - hairVals.position.bottom - 1].y,
    },
  };

  function createBun(topX, topY, bottomX, bottomY, lerpVal, radiusOff, side) {
    let radius = dist(topX, topY, bottomX, bottomY);
    let centerX = (topX + bottomX) / 2;
    let centerY = (topY + bottomY) / 2;
    let startAngle = atan2(bottomY - centerY, bottomX - centerX);
    let endAngle = atan2(topY - centerY, topX - centerX);

    let arcPoints = interpolateArc(
      centerX,
      centerY,
      radius / radiusOff,
      startAngle,
      endAngle,
      lerpVal,
      side
    );

    function renderArcPoints(arcPoints, centerX, centerY) {
      for (let i = 0; i < arcPoints.length; i++) {
        let offset = hairVals.texture.amount * 0.085;
        if (i % 2 == 0) {
          offset = -offset;
        }
        let x =
          arcPoints[i].x +
          ((centerX - arcPoints[i].x) * offset) /
            dist(centerX, centerY, arcPoints[i].x, arcPoints[i].y);
        let y =
          arcPoints[i].y +
          ((centerY - arcPoints[i].y) * offset) /
            dist(centerX, centerY, arcPoints[i].x, arcPoints[i].y);
        vertex(x, y);
      }
    }

    beginShape();
    renderArcPoints(arcPoints, centerX, centerY);
    endShape();
  }

  createBun(
    leftSide.top.x,
    leftSide.top.y,
    leftSide.bottom.x,
    leftSide.bottom.y,
    hairVals.texture.amount,
    hairVals.buns.radius,
    "left"
  );

  createBun(
    rightSide.top.x,
    rightSide.top.y,
    rightSide.bottom.x,
    rightSide.bottom.y,
    hairVals.texture.amount,
    hairVals.buns.radius,
    "right"
  );
}
