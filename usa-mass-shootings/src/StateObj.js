export class StateObj {
    constructor(state) {
        this.state = state
        this.name = state.name
        this.defaultLightness = state.fillColor.lightness;
        this.isFlashing = false
        this.flashTime = 0
        this.deathCnt = 0
        this.injuredCnt = 0;
    }

    addSaturation(death, injured) {
        this.state.fillColor.saturation += ((death + injured) / 250);
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