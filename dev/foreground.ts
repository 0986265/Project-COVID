class Foreground {
    
    div:HTMLElement

    //startfunction
    constructor() {
        this.div = document.createElement("fg")
        let level = document.getElementsByTagName("level")
        level[0].appendChild(this.div)
    }

    update() {

    }

    checkCollison() {

    }

    draw() {
        
    }
}