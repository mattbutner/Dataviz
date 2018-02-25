/// <reference path="./p5.global-mode.d.ts" />

import Jumper from './Jumper.js'

var table;
var tabLen;
var i = 0;
var jumpers = [];
var delay = 120;
export var yOff = 400

export var scale = 70;

function preload() {
    table = loadTable('res/history_of_records.csv', 'csv', 'header')
}

function setup() {
    tabLen = table.getRowCount()
    createCanvas(1800, 1000)
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
    if (frameCount % delay === 0) {
        jumpers.push(new Jumper(table.getNum(i, 6), table.getString(i, 2), table.getString(i, 3)))
        i++;
    }

    if (jumpers.length > 0) {
        textSize(30)
        fill(0)
        noStroke()
        text(jumpers[jumpers.length - 1].name, 20, 40)
        textSize(20)
        text(jumpers[jumpers.length - 1].nationality, 20, 70)
        text(jumpers[jumpers.length - 1].width + "m", 20, 100)

        if (jumpers[jumpers.length - 1].width * scale > width - 550) {
            scale *= 0.999
        }
    }



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

    // draw jumper on slope
    let x;
    let y;
    let t1 = (2 / 8) * delay
    let t2 = (1 / 8) * delay
    let t = (frameCount + t1 + t2) % delay;
    fill(0)
    if (t >= t1 && t < (t1 + t2)) {
        x = curvePoint(0, 100, 210, 220, (t - t1) / t2)
        y = curvePoint(yOff + 0, yOff + 180, yOff + 220, yOff + 150, (t - t1) / t2)
        ellipse(x, y, 5, 5)
    } else if (t < t1) {
        x = curvePoint(0, 0, 100, 210, t / t1)
        y = curvePoint(yOff + 0, yOff + 0, yOff + 180, yOff + 220, t / t1)
        ellipse(x, y, 5, 5)
    }


}

function drawCoordSys() {
    fill(0)

    textSize(15)
    line(0, yOff + 300, 1800, yOff + 300)
    noStroke()
    for (let j = 210; j < width; j += 50 * scale) {
        stroke(0)
        line(j, yOff + 303, j, yOff + 295)
        noStroke()
        text(round((j - 210) / scale) + "m", j, yOff + 320)
    }
}

window.preload = preload
window.setup = setup
window.draw = draw