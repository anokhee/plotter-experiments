function createLineHair(obj, headArr, hairlineArr, hairline) {
  head100p = percentMarker(headArr, 100);
  head75p = percentMarker(headArr, 75);
  head50p = percentMarker(headArr, 50);
  head25p = percentMarker(headArr, 25);
  let hairVals = obj.hairVals;

  let numStrands = hairVals.position.bottom - hairVals.position.top;
  let leftArr2D = [];
  let rightArr2D = [];

  for (let h = 0; h < 1; h += hairVals.density * 0.01) {
    let leftArr1D = [];
    let rightArr1D = [];
    for (let i = hairVals.position.top; i < hairVals.position.bottom - 1; i++) {
      let off = i * 0.06;
      leftArr1D.push(
        lerpBezier(
          [
            {
              x: headArr[hairVals.position.top + i].x,
              y: headArr[hairVals.position.top + i].y,
            },
            {
              x: headArr[hairVals.position.top + i].x,
              y: headArr[hairVals.position.top + i].y,
            },
            {
              x: headArr[hairVals.position.top + i].x + hairVals.shape.x1 * off,
              y: headArr[hairVals.position.top + i].y - hairVals.shape.y1 * off,
            },
            {
              x: headArr[hairVals.position.top + i].x + hairVals.shape.x2 * off,
              y: headArr[hairVals.position.top + i].y - hairVals.shape.y2 * off,
            },
          ],
          h
        )
      );

      rightArr1D.push(
        lerpBezier(
          [
            {
              x: headArr[head100p - 1 - i].x,
              y: headArr[head100p - 1 - i].y,
            },
            {
              x: headArr[head100p - 1 - i].x,
              y: headArr[head100p - 1 - i].y,
            },
            {
              x: headArr[head100p - 1 - i].x - hairVals.shape.x1 * off,
              y: headArr[head100p - 1 - i].y - hairVals.shape.y1 * off,
            },
            {
              x: headArr[head100p - 1 - i].x - hairVals.shape.x2 * off,
              y: headArr[head100p - 1 - i].y - hairVals.shape.y2 * off,
            },
          ],
          h
        )
      );
    }
    for (let j = 0; j < numStrands; j++) {
      leftArr2D[j] = leftArr2D[j] || [];
      rightArr2D[j] = rightArr2D[j] || [];

      leftArr2D[j].push(
        leftArr1D.slice(j * numStrands, j * numStrands + numStrands)
      );

      rightArr2D[j].push(
        rightArr1D.slice(j * numStrands, j * numStrands + numStrands)
      );
    }
  }

  for (let i = 0; i < leftArr2D.length; i++) {
    for (let j = 0; j < leftArr2D[i].length; j++) {
      beginShape();
      for (let k = 0; k < leftArr2D[i][j].length; k++) {
        if (k === 0) {
          vertex(leftArr2D[i][j][0].x, leftArr2D[i][j][0].y) +
            hairVals.texture.amount;
        }
        if (k % 2 === 0) {
          curveVertex(
            leftArr2D[i][j][k].x + hairVals.texture.amount * 0.05,
            leftArr2D[i][j][k].y
          );
        } else {
          curveVertex(leftArr2D[i][j][k].x, leftArr2D[i][j][k].y);
        }
      }
      endShape();
      beginShape();
      for (let k = 0; k < leftArr2D[i][j].length; k++) {
        if (k === 0) {
          vertex(
            rightArr2D[i][j][0].x - hairVals.texture.amount,
            rightArr2D[i][j][0].y
          );
        }
        if (k % 2 === 0) {
          curveVertex(
            rightArr2D[i][j][k].x - hairVals.texture.amount * 0.05,
            rightArr2D[i][j][k].y
          );
        } else {
          curveVertex(rightArr2D[i][j][k].x, rightArr2D[i][j][k].y);
        }
      }
      endShape();
    }
  }
}
