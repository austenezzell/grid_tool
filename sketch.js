let ogImg, newImg, imgInput;
let pixelation_level = 40;
let grid = 40;

function preload() {
  ogImg = loadImage("./img/14.jpg");
}

function setup() {
  createCanvas(600, 600);
  pixelDensity(1);
  image(ogImg, 0, 0, width, height);
  loadPixels();
  noStroke();

  // UPLOAD IMAGE
  imgInput = createFileInput(handleFile);
  imgInput.position(700, 100);

  // SAVE BUTTON
  saveButton = createButton('Save');
  saveButton.mousePressed(saveImage);
  saveButton.position(700, 300);

  // INSTRUCTIONS
  stepOne = createP();
  stepOne.position(700, 50);
  stepTwo = createP();
  stepTwo.position(700, 160);
  displayGridSize = createP();
  displayGridSize.position(700, 220);

  // SLIDER
  slider = createSlider(0, 60, 40, 20);
  slider.position(700, 200);
  slider.style('width', '200px');
  slider.input(pixelSizeChange);
  
  for (let x = 0; x < width; x += pixelation_level) {
    for (let y = 0; y < height; y += pixelation_level) {
      
      let i = (x + y * width) * 4;
      let r = pixels[i + 0];
      let g = pixels[i + 1];
      let b = pixels[i + 2];
      let a = pixels[i + 3];

      fill(r, g, b, a);
      square(x, y, pixelation_level);
    }
  }
}

function pixelSizeChange() {
  
  if (slider.value() == 0) {
    grid = 16;
  } else if (slider.value() == 20) {
    grid = 20;
  } else if (slider.value() == 40) {
    grid = 40;
  } else if (slider.value() == 60) {
    grid = 60;
  }

  for (let x = 0; x < width; x += grid) {
    for (let y = 0; y < height; y += grid) {
      
      let i = (x + y * width) * 4;
      let r = pixels[i + 0];
      let g = pixels[i + 1];
      let b = pixels[i + 2];
      let a = pixels[i + 3];

      fill(r, g, b, a);
      square(x, y, grid);
    }
  }
  
}

function draw(){
  
  // GRID SIZE INSTRUCTIONS
  let gridSize = 'medium';
  if (slider.value() == 0) {
    gridSize = 'extra small';
  } else if (slider.value() == 20) {
    gridSize = 'small';    
  } else if (slider.value() == 40) {
    gridSize = 'medium';
  } else if (slider.value() == 60) {
    gridSize = 'large';
  }
  displayGridSize.html('The grid is '+gridSize);
  stepOne.html('STEP 1: Upload a square image');
  stepTwo.html('STEP 2: Use the slider to adjust grid size');

  // NEW IMAGE UPLOADED
  if (newImg) {
    image(newImg, 0, 0, width, height);
    
    // SET THE GRID
    if (slider.value() == 0) {
      grid = 15;
    } else if (slider.value() == 20) {
      grid = 20;
    } else if (slider.value() == 40) {
      grid = 40;
    } else if (slider.value() == 60) {
      grid = 60;
    }

    // MAKE THE GRID
    loadPixels();
    for (let x = 0; x < width; x += grid) {
      for (let y = 0; y < height; y += grid) {
        
        let i = (x + y * width) * 4;
        let r = pixels[i + 0];
        let g = pixels[i + 1];
        let b = pixels[i + 2];
        let a = pixels[i + 3];

        fill(r, g, b, a);
        square(x, y, grid);
      }
    }
  }

}

function saveImage(){
  save("myimage.png");
}

function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    newImg = createImg(file.data, '');
    newImg.hide();

  } else {
    newImg = null;
  }
}