import { states } from './sketch.js'

export var s2 = function (sketch) {
    var myFont;

    // preload font
    sketch.preload = function () {
        myFont = sketch.loadFont('res/Roboto-Regular.ttf')
    }

    // initialize sketch
    sketch.setup = function () {
        let canv = sketch.createCanvas(700, 930)
        canv.parent('p5Stats');
        sketch.textFont(myFont)
        sketch.textSize(12)
        sketch.frameRate(30);
    }

    // DRAW LOOP
    sketch.draw = function () {
        // white background
        sketch.background(255)

        // update state stats
        drawStateStats()
    }

    function drawStateStats() {
        let scl = 0.75
        let yOff = 18
        let rectXOff = 25;

        // draw line at zero
        sketch.stroke(0)
        sketch.line(rectXOff - 1, 8, rectXOff - 1, 920)


        sketch.noStroke();
        states.forEach(el => {

            // draw state name
            sketch.fill(0)
            sketch.text(el.name, 0, yOff)

            // draw state data (death/injured)
            if (el.deathCnt !== 0 || el.injuredCnt !== 0)
                sketch.text(el.deathCnt + "/" + el.injuredCnt, rectXOff + 3 + (el.deathCnt + el.injuredCnt) * scl, yOff)

            // draw the bars    
            sketch.fill(255, 0, 0)
            sketch.rect(rectXOff, yOff - 10, el.deathCnt * scl, 10)
            sketch.fill(255, 128, 0)
            sketch.rect(rectXOff + el.deathCnt * scl, yOff - 10, el.injuredCnt * scl, 10)
            yOff += 18
        })
    }
}