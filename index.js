const inquirer = require('inquirer');
const fs = require("fs")
const {Triangle, Circle, Square} = require("./lib/shapes");

async function generateLogo() {
  // Create a new SVG.js canvas
  const canvas = SVG().size(300, 150);

  // Prompt the user for input
  const userInput = [
    {
      type: 'list',
      name: 'color',
      message: 'Select a color:',
      choices: ['red', 'green', 'blue'],
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Select a shape:',
      choices: ['circle', 'square', 'triangle'],
    },
  
    {
      type: 'input',
      name: 'text',
      message: 'Enter the text for your logo:',
    },
    {
      type: 'input',
      name: 'filename',
      message: 'Enter the output filename:',
    },
  ];

  // Create the logo based on the user input
  let shape;
  switch (userInput.shape) {
    case 'circle':
      shape = canvas.circle(100);
      break;
    case 'square':
      shape = canvas.rect(100, 100);
      break;
    case 'triangle':
      shape = canvas.polygon('0,100 50,0 100,100');
      break;
  }

  shape.fill(userInput.color);
  canvas.text(userInput.text).move(50, 50);

  // Convert the SVG to a PNG image
  const svgData = canvas.svg();
  const pngData = await svg2img(svgData, { format: 'png', width: 300, height: 150 });

  // Save the PNG image to disk
  fs.writeFileSync(`${userInput.filename}.png`, pngData);
}

generateLogo();