/// <reference path="./p5.global-mode.d.ts" />

import Jumper from './Jumper.js'

var table;
var tabLen;
var i = 0;
var jumpers = [];
export var yOff = 400

export var scale = 50;

function preload() {
    table = loadTable('res/history_of_records.csv', 'csv', 'header')
}

function setup() {
    tabLen = table.getRowCount()
    createCanvas(1800, 800)
    frameRate(60)

}

function draw() {
    background(255)
    drawSlope()
    drawCoordSys()



    jumpers.forEach(jumper => {
        jumper.update();
        jumper.draw();
    })
    if (frameCount % 60 === 0) {
        jumpers.push(new Jumper(table.getNum(i, 6), table.getString(i, 2)))
        i++;
    }
    if (jumpers.length > 0) {
        textSize(30)
        fill(0)
        text(jumpers[jumpers.length - 1].name, 20, 40)
    }


    scale *= 0.9995

}

function drawSlope() {
    stroke(0)
    noFill()
    beginShape()
    curveVertex(0, yOff + 0)
    curveVertex(0, yOff + 0)
    curveVertex(100, yOff + 180)
    curveVertex(210, yOff + 220)
    curveVertex(220, yOff + 150)
    endShape()
}

function drawCoordSys() {
    fill(0)
    textSize(12)
    line(0, yOff + 300, 1600, yOff + 300)
    for (let j = 210; j < width; j += 50 * scale) {
        line(j, yOff + 303, j, yOff + 295)
        text(round((j - 210) / scale), j, yOff + 315)
    }
}

window.preload = preload
window.setup = setup
window.draw = draw