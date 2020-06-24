class Game {

    currentLevel: number = 0
    score: number = 0
    player: Player
    enemy: Enemy

    healthpoint: HealthPoint
    level: Level
    foreground: Foreground
    background: Background
    end: End

    guntip: GunTip // e voor wapen
    guntip2: GunTip2 //kopen met score
    guntip3: GunTip3 // 1,2,3 voor wapens
    GT3: boolean = false
    GT31: boolean = true //GunTip checker
    GT32: boolean = true //GunTip checker
    GT33: boolean = false
    HGitem: HGitem
    ARitem: ARitem
    SGitem: SGitem
    Hg: boolean = false // is handgun opgepakt
    Ar: boolean = false // is assultriffle opgepakt
    Sg: boolean = false // is Shotgun opgepakt

    switch1: boolean = false
    switch2: boolean = false
    switch3: boolean = false
    switch4: boolean = false
    switch5: boolean = false
    switch6: boolean = false
    switch7: boolean = false
    switch8: boolean = false

    alarm: Alarm[] = []

    //startfunction
    constructor() {
        console.log("Game was created!")
        this.level = new Level()
        this.foreground = new Foreground()
        this.background = new Background()
        this.player = new Player()

        this.guntip = new GunTip() // e voor wapen
        this.HGitem = new HGitem()
        this.ARitem = new ARitem()
        this.SGitem = new SGitem()
        this.end = new End()
        this.healthpoint = new HealthPoint()

        for (let i = 0; i < 6; i++) {
            this.alarm[i] = new Alarm()
            this.alarm[i].div.style.left = 8800 + (1000 * i) + "px"
        }

        this.gameLoop()
        this.hitLoop()
        this.displayHealth()
        this.cutscene()

        let audioButtercup = new Audio("audio/buttercup.mp3");
        audioButtercup.play()
    }

    checkIfHit() {
        document.getElementsByName("enemyhitbox").forEach(enemy => {
            let testhit = this.checkCollision(this.player.getRectangle(), enemy.getBoundingClientRect())
            if (testhit == true) {
                let health = this.player.playerHealth
                health.pop()
                this.destroyHealth()
                this.player.hit = 1
                if (this.player.playerHealth.length === 0) {
                    this.respawnPlayer()
                } else {
                    console.log(this.player.playerHealth)
                }
            }

        });
    }

    cutscene() {
        let vid = document.getElementById("video") as HTMLVideoElement
        vid.addEventListener('ended', () => {
            let div = document.getElementById("videodiv")
            vid?.remove()
            div?.remove()
        })
        vid.addEventListener('click', () => {
            let div = document.getElementById("videodiv")
            vid?.remove()
            div?.remove()
        }
        )
    }
    //loop for checking colision on hit
    hitLoop() {
        if (this.player.hit == 1) {
            this.player.hit = 0
            setTimeout(() => {
                requestAnimationFrame(() => this.hitLoop())
            }, 500); //1000 ms pause interval
        } else {
            this.checkIfHit()
            requestAnimationFrame(() => this.hitLoop())
        }
    }

    //Collision Items
    checkIfHitHGitem() {
        let hit = this.checkCollision(this.player.getRectangle(), this.HGitem.getRectangle())
        let hit1 = this.checkCollision(this.player.getRectangle(), this.ARitem.getRectangle())
        let hit2 = this.checkCollision(this.player.getRectangle(), this.SGitem.getRectangle())


        let gun1 = document.getElementById("handgun")
        let gun2 = document.getElementById("assultgun")
        let gun3 = document.getElementById("shotgun")

        if (hit == true && this.player.e == true) {
            this.player.gun = 1
            this.Hg = true
            this.GT33 = true
            this.HGitem.div.remove()

            let gun = document.getElementById("handgun")
            gun?.setAttribute("style", "display:block;")
            console.log("Handgun")

            gun1?.setAttribute("style", "background-color:lightgrey; display:block; opacity: 100%;")
            if (this.Ar == true) { gun2?.setAttribute("style", "background-color:none; display:block; opacity: 100%;") }
            if (this.Sg == true) { gun3?.setAttribute("style", "background-color:none; display:block; opacity: 100%;") }

        } if (hit1 == true && this.score >= 300 && this.player.e == true) {
            this.score -= 300
            this.player.gun = 2
            this.Ar = true
            this.ARitem.div.remove()
            this.GT3 = true

            let gun = document.getElementById("assultgun")
            gun?.setAttribute("style", "display:block;")
            console.log("Assault Rifle")

            if (this.Hg == true) { gun1?.setAttribute("style", "background-color:none; display:block; opacity: 100%;") }
            gun2?.setAttribute("style", "background-color:lightgrey; display:block; opacity: 100%;")
            if (this.Sg == true) { gun3?.setAttribute("style", "background-color:none; display:block; opacity: 100%;") }

        } if (hit2 == true && this.score >= 200 && this.player.e == true) {
            this.score -= 200
            this.player.gun = 3
            this.Sg = true
            this.GT3 = true
            this.SGitem.div.remove()

            let gun = document.getElementById("shotgun")
            gun?.setAttribute("style", "display:block;")
            console.log("Shotgun")

            if (this.Hg == true) { gun1?.setAttribute("style", "background-color:none; display:block; opacity: 100%;") }
            if (this.Ar == true) { gun2?.setAttribute("style", "background-color:none; display:block; opacity: 100%;") }
            gun3?.setAttribute("style", "background-color:lightgrey; display:block; opacity: 100%;")
        }
    }

    //switch guns
    gunSwitch() {

        let gun1 = document.getElementById("handgun")
        let gun2 = document.getElementById("assultgun")
        let gun3 = document.getElementById("shotgun")

        if (this.player.key1 == true && this.Hg == true) {
            this.player.gun = 1

            gun1?.setAttribute("style", "background-color:lightgrey; display:block; opacity: 100%;")
            if (this.Ar == true) { gun2?.setAttribute("style", "background-color:none; display:block; opacity: 100%;") }
            if (this.Sg == true) { gun3?.setAttribute("style", "background-color:none; display:block; opacity: 100%;") }
        }
        else if (this.player.key3 == true && this.Ar == true) {
            this.player.gun = 2

            if (this.Hg == true) { gun1?.setAttribute("style", "background-color:none; display:block; opacity: 100%;") }
            gun2?.setAttribute("style", "background-color:lightgrey; display:block; opacity: 100%;")
            if (this.Sg == true) { gun3?.setAttribute("style", "background-color:none; display:block; opacity: 100%;") }
        }
        else if (this.player.key2 == true && this.Sg == true) {
            this.player.gun = 3

            if (this.Hg == true) { gun1?.setAttribute("style", "background-color:none; display:block; opacity: 100%;") }
            if (this.Ar == true) { gun2?.setAttribute("style", "background-color:none; display:block; opacity: 100%;") }
            gun3?.setAttribute("style", "background-color:lightgrey; display:block; opacity: 100%;")
        }
    }

    checkIfHitHealthPoint() {
        let hit = this.checkCollision(this.player.getRectangle(), this.healthpoint.getRectangle())
        if (hit == true && this.player.playerHealth.length > 0) {
            this.player.playerHealth.push(1)
            this.addHealth()
            this.healthpoint.div.remove()
        }
        return hit
    }

    spawnEnemies(spawnAmount: number, r1: number, r2: number, speed: number) {
        for (let index = 0; index < spawnAmount; index++) {
            this.enemy = new Enemy(index)
            this.enemy.spawnEnemy(r1, r2, speed)
            this.enemy.EnemeyLoop()
            this.enemy.randomSprite()
        }
    }

    spawnEnemiesInLevel() {
        if (this.switch1 == false) {
            if (this.level.levelX < -10) {
                this.spawnEnemies(1, 1900, 2000, 2)
                this.switch1 = true
            }
        }

        if (this.switch2 == false) {
            if (this.level.levelX < -1200) {
                this.spawnEnemies(1, 2700, 2600, 4)
                this.switch2 = true
            }
        }

        if (this.switch3 == false) {
            if (this.level.levelX < -2500) {
                this.spawnEnemies(3, 3800, 3800, 5)
                this.switch3 = true
            }
        }

        if (this.switch4 == false) {
            if (this.level.levelX < -4000) {
                this.spawnEnemies(5, 5500, 5800, 6)
                this.switch4 = true
            }
        }

        if (this.switch5 == false) {
            if (this.level.levelX < -4200) {
                this.spawnEnemies(18, 5200, 18000, 7)
                this.switch5 = true
            }
        }
    }

    gameLoop() {
        this.gunSwitch()
        this.checkIfHitHGitem()
        this.player.update()
        this.level.update()
        this.background.update()
        this.displayScore()
        this.hitEnd()
        this.guntipMaker()
        this.enemyDestroyedChecker()
        this.checkIfHitHealthPoint()
        this.spawnEnemiesInLevel()

        for (let bullet of this.player.bullets) {
            bullet.update()
        }
        requestAnimationFrame(() => this.gameLoop())
    }


    guntipMaker() {
        if (this.GT33 == true) { // als handgun is opgepakt
            this.GT33 = false
            setTimeout(() => {
                let tip = document.getElementsByTagName("guntip")
                tip[0].remove()
            }, 3000);
        }
        if (this.GT32 == true) {
            if (this.score >= 200) {
                this.guntip2 = new GunTip2() // kopen met score
                this.GT32 = false
            }
        }
        if (this.GT3 == true) { // als shotgun is opgepakt
            this.GT3 = false
            setTimeout(() => {
                let tip = document.getElementsByTagName("guntip2")
                tip[0].remove()
                this.guntip3 = new GunTip3() // 1,2,3 voor ander wapen
            }, 3000);
            setTimeout(() => {
                let tip = document.getElementsByTagName("guntip3")
                tip[0].remove()
            }, 6000);
        }
    }


    enemyDestroyedChecker() {
        document.getElementsByName("enemyhitbox").forEach(Target => {
            let name = Target.getAttribute("health")
            if (name == "0" || name == "-1") {
                this.score += 100
                Target.setAttribute("health", "-1")
                Target.parentElement?.remove()
                Target.remove()
            }
        });
    }

    displayScore() {
        let score = document.getElementById("score") as HTMLInputElement
        score.innerHTML = String(this.score) + " points"
        return score
    }

    displayHealth() {
        let health = document.createElement("div")
        health.setAttribute("class", "health")

        this.player.playerHealth.forEach(function () {
            let health = document.createElement("div")
            health.setAttribute("id", "health")
            document.getElementById("flex")?.prepend(health)
        })
    }

    destroyHealth() {
        let ele = document.getElementById("health")
        ele?.remove()

        let audioHP = new Audio("audio/hp.mp3");
        audioHP.play()
    }

    hitEnd() {
        let end = document.getElementsByTagName("end")
        let hit = this.checkCollision(this.player.hitbox.getBoundingClientRect(), end[0].getBoundingClientRect())
        if (hit == true) {
            this.end.div.remove()
            let endlevelDiv = document.getElementById("endlevel")
            endlevelDiv?.addEventListener("click", () => { window.location.reload() })
            endlevelDiv?.setAttribute("style", "display:block;")
        }
    }

    addHealth() {
        let health = document.createElement("div")
        health.setAttribute("id", "health")
        document.getElementById("flex")?.prepend(health)
        let audioAddHealth = new Audio("audio/addHealth.mp3");
        audioAddHealth.play()
    }

    respawnPlayer() {
        this.player.div.remove()
        let respawnDiv = document.getElementById("respawn")
        respawnDiv?.addEventListener("click", () => { window.location.reload() })
        respawnDiv?.setAttribute("style", "display:block;")

        let audioRespawnPlayer = new Audio("audio/died.mp3");
        audioRespawnPlayer.play()
    }

    checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
    }
}

//create Game when the whole page is loaded
window.addEventListener("load", () => new Game())