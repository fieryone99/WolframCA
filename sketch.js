let grid;

//true serpinskli
//let rule = 182;
let rule = 90;
//let rule = 82;

//diagopnal serpinski
//let rule = 60;
//let rule = 102;

//weird stripey 
//let rule = 225 ;

let ruleByPower = [(rule & 0b10000000)/0b10000000, (rule & 0b01000000)/0b01000000, (rule & 0b00100000)/0b00100000, (rule & 0b00010000)/0b00010000, (rule & 0b00001000)/0b00001000, (rule & 0b00000100)/0b00000100, (rule & 0b00000010)/0b00000010, (rule & 0b00000001)/0b00000001];

let actualWidth;
let actualHeight;

function setup() {
  density = pixelDensity();
  actualWidth = windowWidth * density;
  actualHeight = windowHeight * density;
  createCanvas(actualWidth, actualHeight);

  grid = create2DArray(width, height);

  console.log(ruleByPower);


  let NumPoints = 2;

  for (let i = 0; i < NumPoints; i++) {
    grid[floor(random(0, width))][0] = 1;
   }
}

function draw() {
  loadPixels();

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let index = (i + j * width) * 4;
      if (grid[i][j] == 1) {
        pixels[index] = 255; //r
        pixels[index+1] = 255; //g
        pixels[index+2] = 255; //b
        pixels[index+3] = 255; //a
      } else {
        //console.log('black');
        pixels[index] = 0; //r
        pixels[index+1] = 0; //g
        pixels[index+2] = 0; //b
        pixels[index+3] = 255; //a
      }
    }

  }

  updatePixels();

  for (let a = height; a > 0; a--) {
    for (let b = 0; b < width; b++) {
      grid[b][a] = grid[b][a-1];
    }
  }
  //console.log('moved');

   for (let p = 0; p < width-1; p++) {
    let pattern = 0;
    if (p == 0) {
      pattern = 4*0 + 2*(grid[p][1]) + 1*(grid[p+1][1]);
    } else if (p == 7) {
      pattern = 4*(grid[p-1][1]) + 2*(grid[p][1]) + 1*0;
    } else {
      pattern = 4*(grid[p-1][1]) + 2*(grid[p][1]) + 1*(grid[p+1][1]);
    }

    switch (pattern) {
      case 0b111:
        grid[p][0] = ruleByPower[0];
      break;

      case 0b110:
        grid[p][0] = ruleByPower[1];
      break;

      case 0b101:
        grid[p][0] = ruleByPower[2];
      break;

      case 0b100:
        grid[p][0] = ruleByPower[3];
      break;

      case 0b011:
        grid[p][0] = ruleByPower[4];
      break;

      case 0b010:
        grid[p][0] = ruleByPower[5];
      break;

      case 0b001:
        grid[p][0] = ruleByPower[6];
      break;

      case 0b000:
        grid[p][0] = ruleByPower[7];
      break;
    }
  }
}

function create2DArray(x, y) {
  let newArray = [];
  for (let i = 0; i < x; i++) {
    newArray[i] = [];
    for (let j = 0; j < y; j++) {
      newArray[i][j] = 0;
    }
  }
  return newArray;
}
