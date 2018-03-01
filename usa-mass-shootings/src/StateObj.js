import { tab, pop } from './mapNames.js';

var useRelativePopulation = false
export class StateObj {
    constructor(state) {
        this.state = state
        this.nameShort = state.name
        this.nameLong = tab[state.name]
        this.pop = pop[state.name]
        this.defaultLightness = state.fillColor.lightness;
        this.isFlashing = false
        this.flashTime = 0
        this.deathCnt = 0
        this.injuredCnt = 0;
    }

    updateSaturation() {
        this.state.fillColor.saturation = ((this.deathCnt + this.injuredCnt) / 75);
    }

    addEvent(dead, injured) {
        if (useRelativePopulation) {
            this.deathCnt += dead * (1000000 / this.pop)
            this.injuredCnt += injured * (1000000 / this.pop)
        } else {
            this.deathCnt += dead
            this.injuredCnt += injured
        }

    }

    flash(t) {
        this.isFlashing = true
        this.flashTime = t
    }

    checkFlash(t) {
        if (this.isFlashing && (t - this.flashTime) < 250) {
            this.state.fillColor.lightness = 0.9 - (0.9 - this.defaultLightness) * ((t - this.flashTime) / 250)
        } else {
            this.state.fillColor.lightness = this.defaultLightness
            this.isFlashing = false
        }
    }
}