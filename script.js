const width = 500
const height = 500
const gridSize = 3;


let slider = document.querySelector("input") 
let label = document.querySelector("p")
slider.addEventListener("change", (event) => {
  let input = +event.target.value
  label.innerHTML = "Rule: " + input
  clear()
  main(input)
})

function generateRule(input) {
  let bin = input.toString(2).padStart(8, "0")
  let rule = {
    111: bin[0],
    110: bin[1],
    101: bin[2],
    100: bin[3],
    "011": bin[4],
    "010": bin[5],
    "001": bin[6],
    "000": bin[7],
  };
  
  return rule
}



function createNextGen(currentGen, rule) {
  let nextGen = [];
  for (let i = 0; i < currentGen.length; i++) {
    let binStr = "";
    if (i === 0) {
      binStr = "" + currentGen[currentGen.length - 1] + currentGen[i] + currentGen[i + 1];
    } else if (i === currentGen.length - 1) {
      binStr = "" + currentGen[i - 1] + currentGen[i] + currentGen[0];
    } else {
      binStr = "" + currentGen[i - 1] + currentGen[i] + currentGen[i + 1];
    }

    nextGen.push(rule[binStr]);
  }
  return nextGen;
}


function setup() {
  createCanvas(width, height);
  noLoop();
}


function draw() {
  fill("black");
  main(30);
}

function main(input) {
  let currentGen = Array(Math.floor(width / gridSize))
    .fill(0)
  currentGen[Math.floor(currentGen.length / 2)] = 1
    
  //   Array(Math.floor(width / gridSize))
  // .fill(0)
  // .map(() => {
  //   return Math.floor(Math.random() * 2);
  // });
  
  let rule = generateRule(input)
  drawCA(currentGen, rule)
}

function drawCA(currentGen, rule) {
  for (let j = 0; j < Math.floor(height / gridSize); j++) {
    for (let i = 0; i < currentGen.length; i++) {
      if (currentGen[i] == 1) {
        rect(i * gridSize, j * gridSize, gridSize, gridSize);
      }
    }
    currentGen = createNextGen(currentGen, rule);
  }
}