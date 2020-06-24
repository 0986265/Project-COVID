class ArBullet {

    div: HTMLElement
    hitbox: HTMLElement
    id: string

    facing: number

    constructor(x: number, y: number, direction: number) {
        this.spawnBullet(x, y)
        this.facing = direction

    }

    getRectangle() {
        return this.div.getBoundingClientRect()
    }

    public spawnBullet(x: number, y: number) {
        this.div = document.createElement("bulletAR")
        this.div.setAttribute("id", "")
        let level = document.getElementsByTagName("game")
        level[0].appendChild(this.div)


        if (this.facing == 1) {
            this.div.style.left = x + 75 + "px"
        } else {
            this.div.style.left = x + 0 + "px"
            this.div.style.top = y + 115 + "px"
        }
    }

    public update() {
        decodeURI

        this.locateAllEnemys()
        let splitted = this.div.style.left.split("p", 1);
        if (this.facing == 1) {
            this.div.style.left = +splitted[0] + (20) + "px"
        } else {
            this.div.style.left = +splitted[0] - (20) + "px"
        }

        let bulletPosX = this.div.style.left.split("p", 1)

        if (+bulletPosX[0] > 1800 || +bulletPosX[0] < 0) {
            this.div.remove()
        }
    }

    locateAllEnemys() {
        document.getElementsByName("enemyhitbox").forEach(item => {
            let enemyHit = this.checkCollision(this.getRectangle(), item.getBoundingClientRect())
            if (enemyHit == true) {
                this.div.remove()
                let audiobulletHit = new Audio("audio/bulletHit.mp3");
                audiobulletHit.play()
                let newHealth = item.getAttribute("health")
                let health = Number(newHealth) -1
                item.setAttribute("health", health.toString())
            }
        })

    }

    checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
    }
}
