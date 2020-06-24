class HGitem {


    div: HTMLElement

    hitbox: HTMLElement

    name: string = ""
    hitpoints: number = 0
    direction: number = 0
    grounded: boolean = false
    weapon: number = 0
    enemyhealth: number = 3

    //startfunction
    constructor() {
        this.spawnItem()
    }

    getRectangle() {
        return this.hitbox.getBoundingClientRect()
    }
    
    behiaviour() {

    }

    spawnItem() {
        this.div = document.createElement("HGitem")
        let level = document.getElementsByTagName("level")

        this.hitbox = document.createElement("hitboxHGitem")
        this.div.appendChild(this.hitbox)

        this.div.style.top = "590px"
        this.div.style.left = "500px"

        level[0].appendChild(this.div)
    }
}