class Level {
    
    div:HTMLElement

    id:number = 0
    player:string = ""
    enemies:string = ""
    items:number = 0

    left: boolean = false
    right: boolean = false

    levelX: number = 0

    //startfunction
    constructor() {
        this.div = document.createElement("level")
        let game = document.getElementsByTagName("game")
        game[0].appendChild(this.div)

        window.addEventListener("keydown", (e: KeyboardEvent) => this.keyListener(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.keyListener(e))
    }

    keyListener(event: KeyboardEvent) {

        let key_state = false
        if (event.type == "keydown") {
            key_state = true
        } else {
            key_state = false
        }

        switch (event.keyCode) {
            case 65:    // key A
                this.left = key_state;
                break;
            case 37:    // key ARROW RIGHT
                this.left = key_state;
                break;
            case 68:    // key D
                this.right = key_state;
                break;
            case 39:    // key ARROW LEFT
                this.right = key_state;
                break;
        }
    }

    update() {
        
        if (this.left == true) {
            //this.move(1)
        } else if (this.right == true) {
            let player = document.getElementsByTagName("player");
            let style = window.getComputedStyle(player[0])
            let pos = style.left.split("p", 1);
            if(+pos[0] >= 700) {
            this.move(-1)
            }
        }
        else this.move(0)  

        this.levelX = this.div.getBoundingClientRect().x
    }

    move(moveDirection: number) {
        let splitted = this.div.style.left.split("p", 1);
        this.div.style.left = +splitted[0] + (10 * moveDirection) + "px"   //MOVEMENT SPEED ADJUSTMENT
    }

    checkCollison() {

    }

    draw() {
        
    }
}