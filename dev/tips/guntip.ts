class GunTip {

    div: HTMLElement

    constructor() {
        this.spawnTip()
    }
    
    spawnTip() {
        this.div = document.createElement("guntip")
        let level = document.getElementsByTagName("level")
        
        level[0].appendChild(this.div)
    }
}