function createGUI(obj, i) {
  let subFolder = gui.addFolder(`obj ${i}`);
  let hairFolder = subFolder.addFolder("the hair");
  let faceFolder = subFolder.addFolder("the face");

  let hairTopSlider, hairBottomSlider;

  // let radiusSlider = createSlider(
  //   subFolder,
  //   obj,
  //   "radius",
  //   0,
  //   500,
  //   1,
  //   "radius"
  // );

  let sidesSlider = createSlider(
    subFolder,
    obj,
    "sides",
    seedMin,
    100,
    1,
    "# sides"
  );

  // Hair Folder
  if (obj.hairType === "buns") {
    hairTopSlider = createSlider(
      hairFolder,
      obj.hairVals.position,
      "top",
      0,
      sidesSlider.getValue(),
      1,
      "top point"
    );

    hairTopSlider.onChange(function () {
      updateSliderAMax();
    });
  }

  hairBottomSlider = createSlider(
    hairFolder,
    obj.hairVals.position,
    "bottom",
    0,
    sidesSlider.getValue(),
    1,
    "bottom point"
  );

  if (obj.hairType === "buns") {
    hairFolder
      .add(obj.hairVals.texture, "amount", 0, 50)
      .name("texture amt")
      .step(0.1);
  } else if (obj.hairType === "lines") {
    hairFolder
      .add(obj.hairVals.texture, "amount", -100, 100)
      .name("texture amt")
      .step(1);
  }

  if (obj.hairType === "lines") {
    hairFolder.add(obj.hairVals, "density", 1, 30).name("density").step(0.01);

    let hairLinesFolder = hairFolder.addFolder("hairstyle params");
    for (let param in obj.hairVals.shape) {
      createSlider(
        hairLinesFolder,
        obj.hairVals.shape,
        `${param}`,
        -200,
        200,
        1,
        `${param}`
      );
    }
  }

  hairBottomSlider.onChange(function () {
    updateSliderAMax();
  });

  sidesSlider.onChange(function () {
    updateSliderAMax();
  });

  // Fringe Folder
  let fringeFolder = hairFolder.addFolder("fringe");
  let fringeLengthSlider = createSlider(
    fringeFolder,
    obj.hairVals.fringe,
    "length",
    0,
    sidesSlider.getValue(),
    1,
    "fringeLength"
  );

  if (obj.hairType === "lines") {
    fringeFolder
      .add(obj.hairVals.fringe.curve, "x1", -100, 100)
      .name("curve - x1")
      .step(1);

    fringeFolder
      .add(obj.hairVals.fringe.curve, "y1", -100, 100)
      .name("curve - y1")
      .step(1);

    fringeFolder
      .add(obj.hairVals.fringe.curve, "x2", -100, 100)
      .name("curve - x2")
      .step(1);

    fringeFolder
      .add(obj.hairVals.fringe.curve, "y2", -100, 100)
      .name("curve - y2")
      .step(1);
  }

  fringeFolder
    .add(obj.hairVals.fringe, "waveFrequency", 0.01, 1)
    .name("frequency")
    .step(0.01);

  if (obj.hairType === "buns") {
    fringeFolder
      .add(obj.hairVals.fringe, "waveAmplitude", -100, 100)
      .name("amplitude")
      .step(0.01);
  }

  // Buns Folder
  if (obj.hairType === "buns") {
    let bunFolder = hairFolder.addFolder("hair buns");
    bunFolder
      .add(obj.hairVals.buns, "radius", 0, 25)
      .name("bun radius")
      .step(1);
  }

  // Face Folder
  faceFolder.addFolder("eyes");

  function createSlider(subFolder, obj, param, min, max, step, name) {
    if (!step) {
      step = 1;
    }

    return subFolder.add(obj, `${param}`, min, max).name(`${name}`).step(step);
  }

  function updateSliderAMax() {
    if (obj.selectedHairType === "lines") {
      hairTopSlider.__max = sidesSlider.getValue();

      if (
        obj.sides <= hairTopSlider.getValue() ||
        sidesSlider.getValue() <= hairTopSlider.getValue()
      ) {
        obj.hairVals.position.top = Math.floor(hairTopSlider.getValue());
      }
    }
    hairBottomSlider.__max = sidesSlider.getValue();

    if (
      obj.sides <= hairBottomSlider.getValue() ||
      sidesSlider.getValue() <= hairBottomSlider.getValue()
    ) {
      obj.hairVals.position.bottom = obj.hairVals.position.top;
    }
  }
}
