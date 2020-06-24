class GunTip2 {

    div: HTMLElement

    constructor() {
        this.spawnTip()
    }
    
    spawnTip() {
        this.div = document.createElement("guntip2")
        let level = document.getElementsByTagName("level")
        
        level[0].appendChild(this.div)
    }
}