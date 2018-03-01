import { states } from './sketch.js'


export var s1 = function (sketch) {

    // define variables
    var table;
    var tabLen;
    var myFont;
    var i = 0;
    var totalDeaths = 0;
    var totalInjured = 0;

    // load csv data and the font
    sketch.preload = function () {
        table = sketch.loadTable('res/2014-2018_MassShootings_USA.csv', 'csv', 'header')
        myFont = sketch.loadFont('res/Roboto-Regular.ttf')

    }

    // init sketch
    sketch.setup = function () {
        tabLen = table.getRowCount()
        let canv = sketch.createCanvas(980, 280)
        canv.parent('p5Bars');
        sketch.textFont(myFont)
        sketch.frameRate(30);
        sketch.textSize(20);
    }


    // DRAW LOOP
    sketch.draw = function () {

        // white background
        sketch.background(255)

        // if there is data left...
        if (i < tabLen) {

            // add incident data to total counts
            totalDeaths += table.getNum(i, 4);
            totalInjured += table.getNum(i, 5);

            // display date
            sketch.stroke(0)
            sketch.text(table.getString(i, 0), 10, 15);

            // update the state in the map
            updateState();
        }
        // update the flashing animation
        checkFlashes();

        // draw the bar chart
        drawRects();

        i++;
    }


    function drawRects() {
        let y1 = 50
        let y2 = 150
        let x1 = totalDeaths * 0.1
        let x2 = totalInjured * 0.1

        // draw total bars
        sketch.noStroke();
        sketch.fill(255, 0, 0, 80)
        sketch.rect(0, y1, x1, 100);
        sketch.fill(255, 155, 0, 80)
        sketch.rect(0, y2, x2, 100);

        // draw timeline
        for (let j = 0; j < 20; j++) {
            if ((i + j) < tabLen) {
                let dead = table.getNum(i + j, 4)
                let inj = table.getNum(i + j, 5)
                let size = 50
                sketch.fill(255, 0, 0, sketch.pow(dead * 5, 1 / 1.4))
                sketch.rect(j * size, y1, size, 100)
                sketch.fill(255, 128, 0, sketch.pow(inj * 5, 1 / 1.4))
                sketch.rect(j * size, y2, size, 100)
            }
        }

        // add text markers with the counts
        sketch.stroke(0);
        sketch.fill(0);
        sketch.text(totalDeaths + " killed (Total)", x1 + 20, y1 + 50);
        sketch.text(totalInjured + " injured (Total)", x2 + 20, y2 + 50);
    }


    function updateState() {

        // get location of incident and get matching state in the map svg
        let loc = table.getString(i, 1);
        let svgState = states.find(item => {
            return item.nameLong === loc
        });

        // update state data
        svgState.addEvent(table.getNum(i, 4), table.getNum(i, 5))

        // change saturation of state
        svgState.updateSaturation();

        // flash the state
        svgState.flash(sketch.millis());
    }


    function checkFlashes() {
        states.forEach(el => {
            el.checkFlash(sketch.millis());
        })
    }
}