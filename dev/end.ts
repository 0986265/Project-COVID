class End {

    div: HTMLElement


    constructor() {
        this.spawnEnd()
    }



    spawnEnd() {
        this.div = document.createElement("end")
        let level = document.getElementsByTagName("level")

        this.div.style.top = "0px"
        this.div.style.left = "14700px"

        level[0].appendChild(this.div)
    }
}