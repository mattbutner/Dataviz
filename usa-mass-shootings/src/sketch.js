
import { StateObj } from './StateObj.js'
import { s1 } from './barGraphSketch.js'
import { s2 } from './statSketch.js'

export var states = [];

// initialize paper.js
var canvas = document.getElementById('myCanvas');
paper.setup(canvas);

// load and display map
paper.project.importSVG('res/Map.svg', item => {

    // push state to array
    item.children[0].children.forEach(e => {
        states.push(new StateObj(e))
    });
});

// create p5 sketches
var p5one = new p5(s1)
var p5two = new p5(s2)
