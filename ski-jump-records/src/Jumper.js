import { scale, yOff } from './sketch.js'

var g = 1.0
var dt = 0.01
var xOff = 210;

export default class Jumper {
    constructor(target, name, nationality) {
        this.pos = [0, 220 + yOff]
        this.spd = this.calcStartVector(target, random(10, 20))
        this.trail = [];
        this.trail.push([this.pos[0], this.pos[1]])
        this.finished = false
        this.finTime = 0
        this.name = name
        this.width = target
        this.nationality = nationality
        this.col = color(255, 128, target, 50)
    }

    update() {
        if (!this.finished) {
            for (let f = 0; f < 50; f++) {
                if (this.pos[1] + this.spd[1] * dt < (300 + yOff)) {
                    this.pos[0] += this.spd[0] * dt
                    this.pos[1] += this.spd[1] * dt
                } else {
                    this.pos = intersectLines(this.pos, this.spd, [0, 300 + yOff], [1, 0])
                    this.finished = true;
                    this.finTime = millis();
                }
                this.spd[1] += g * dt
            }
            this.trail.push([this.pos[0], this.pos[1]])
        }
    }

    draw() {
        // draw jumper
        stroke(0)
        fill(0)
        ellipse(xOff + this.pos[0] * scale, this.pos[1], 5, 5)

        // draw trail
        noFill()
        strokeWeight(2)
        stroke(this.col)
        beginShape()
        this.trail.forEach(el => {
            vertex(xOff + el[0] * scale, el[1])
        });
        endShape()

        // draw text
        fill(0)
        stroke(0)
        strokeWeight(0.5)
        if (this.finished && ((millis() - this.finTime) / 6) < 255) {
            noStroke()
            fill(0, 0, 0, 255 - ((millis() - this.finTime) / 6))
            push()
            translate(xOff + this.pos[0] * scale, this.pos[1] + 9)
            rotate(PI / 2)
            text(round(10 * this.pos[0]) / 10 + "m" + " (" + this.name + ")", 0, 0)
            pop()
        } else if (!this.finished) {
            text(round(10 * this.pos[0]) / 10 + "m", xOff + this.pos[0] * scale + 5, this.pos[1] - 5)
        }
        strokeWeight(1)

    }

    calcStartVector(target, ySpd) {
        // Steigzeit:
        let t1 = ySpd / g
        let h = pow(ySpd, 2) / (2 * g) + 80
        let t = t1 + sqrt(2 * h / g)
        let xSpd = (target / t)
        return [xSpd, -ySpd]
    }
}

function intersectLines(P, r, Q, s) {
    var rLen = sqrt(r[0] * r[0] + r[1] * r[1])
    r = [r[0] / rLen, r[1] / rLen]

    var PQx = Q[0] - P[0];
    var PQy = Q[1] - P[1];
    var rx = r[0];
    var ry = r[1];
    var rxt = -ry;
    var ryt = rx;
    var qx = PQx * rx + PQy * ry;
    var qy = PQx * rxt + PQy * ryt;
    var sx = s[0] * rx + s[1] * ry;
    var sy = s[0] * rxt + s[1] * ryt;
    // if lines are identical or do not cross...
    if (sy == 0) return null;
    var a = qx - qy * sx / sy;
    return [P[0] + a * rx, P[1] + a * ry];
}