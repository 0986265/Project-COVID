class Enemy {


    div: HTMLElement

    hitbox: HTMLElement
    game: Game
    name: string = ""
    hitpoints: number = 0
    direction: number = 0
    grounded: boolean = false
    weapon: number = 0
    id: number = 0
    movementSpeed: number

    //startfunction
    constructor(index: number) {
        this.id = index
    }

    EnemeyLoop() {
        this.HealthEnemy()
        this.movement()
        requestAnimationFrame(() => this.EnemeyLoop())
    }

    movement() {
        let splitted = this.div.style.left.split("p", 1);

        if (+splitted > 10000) {
            this.direction = 0
        } else if (+splitted < 0) {
            this.direction = 1
        }

        if (this.direction == 0) {
            this.div.style.left = +splitted[0] - (this.movementSpeed) + "px"
            this.div.style.transform = "scaleX(1)"
        } else if (this.direction == 1) {
            this.div.style.left = +splitted[0] + (this.movementSpeed) + "px"
            this.div.style.transform = "scaleX(-1)"
        }
    }

    getRectangle() {
        return this.hitbox.getBoundingClientRect()
    }


    randomSprite() {
        let x = (Math.random() * 10)
        if (x >= 0 && x <= 2) {
            this.div.style.backgroundImage = "url('images/enemy/EM1.gif')"
        }
        if (x >= 2 && x <= 4) {
            this.div.style.backgroundImage = "url('images/enemy/EM2.gif')"
        }
        if (x >= 4 && x <= 6) {
            this.div.style.backgroundImage = "url('images/enemy/EM3.gif')"
        }
        if (x >= 6 && x <= 8) {
            this.div.style.backgroundImage = "url('images/enemy/EMB.gif')"
        }
        if (x >= 8 && x <= 10) {
            this.div.style.backgroundImage = "url('images/enemy/enemyWalkLeft.gif')"
        }
    }

    spawnEnemy(r1: number, r2: number, speed: number) {
        this.movementSpeed = speed
        this.div = document.createElement("enemy")
        let level = document.getElementsByTagName("level")

        this.hitbox = document.createElement("hitbox")
        this.hitbox.setAttribute("id", this.id.toString())
        this.hitbox.setAttribute("name", "enemyhitbox")
        this.div.appendChild(this.hitbox)

        let x = (Math.random() * r1) + r2

        this.div.style.top = "600px"
        this.div.style.left = `${x}px`

        level[0].appendChild(this.div)
        this.hitbox.setAttribute("health", "3")

        this.div.setAttribute("name", "enemy")
        this.div.setAttribute("id", this.id.toString())
    }

    HealthEnemy() {
        let health = this.hitbox.getAttribute("health")
        if (health == "2") {
            this.div.style.opacity = "66%"
        }
        if (health == "1") {
            this.div.style.opacity = "33%"
        }
    }
}