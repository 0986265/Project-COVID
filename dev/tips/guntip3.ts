class GunTip3 {

    div: HTMLElement

    constructor() {
        this.spawnTip()
    }
    
    spawnTip() {
        this.div = document.createElement("guntip3")
        let level = document.getElementsByTagName("game")
        
        level[0].appendChild(this.div)
    }
}