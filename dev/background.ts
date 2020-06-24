class Background {
    
    bg:HTMLElement
    bg2:HTMLElement

    left: boolean = false
    right: boolean = false

    //startfunction
    constructor() {
        this.bg = document.createElement("bg")
        this.bg2 = document.createElement("bg2")

        let level = document.getElementsByTagName("level")
        level[0].appendChild(this.bg2)
        level[0].appendChild(this.bg)
        

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
            if(+pos[0] > 675) {
            this.move(-1)
            }
        }
        else this.move(0)  
    }

    move(moveDirection: number) {
        let splitted = this.bg2.style.left.split("p", 1);
        this.bg2.style.left = +splitted[0] + (1 * moveDirection) + "px"   //MOVEMENT SPEED ADJUSTMENT
    }
}