const Mustache = require('mustache');

//Simple example model - without using JSON file
const model = {
    name: "ExampleSource"
}

//Simple template - without external template file
const template = `
    --Create Database 
    CREATE DATABASE {{name}};
    GO`;

function loadTemplate(){
      var toRender = Mustache.render(template, model);
      console.log(toRender);
}

loadTemplate();