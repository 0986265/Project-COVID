class HealthPoint {

    div: HTMLElement
    hp: number = 1

    constructor() {
        let game = document.getElementsByTagName("level")
        this.div = document.createElement("hp")
        game[0].appendChild(this.div)
    }
    getRectangle() {
        return this.div.getBoundingClientRect()
    }
}