class Alarm {

    div: HTMLElement

    constructor() {
        let game = document.getElementsByTagName("level")
        this.div = document.createElement("alarm")
        game[0].appendChild(this.div)
    }
}