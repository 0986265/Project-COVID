class Player {

    div: HTMLElement

    hitbox: HTMLElement

    name: string = ""
    direction: number = 0
    movespeed: number = 0
    weapon: number = 0

    playerHealth: number[] = [1, 1, 1, 1, 1,]

    x: number = 0
    y: number = 0

    playerX: number = 0
    playerY: number = 0

    gravity: number = 1
    gravitySpeed: number = 0
    speedY: number = 0

    left: boolean = false
    right: boolean = false
    spacebar: boolean = false
    shoot: boolean = false
    jumping: boolean = false
    gun: number = 0
    hit: number = 0
    e: boolean = false
    key1: boolean = false
    key2: boolean = false
    key3: boolean = false

    timer: number = 10

    bullets: Bullet[] = []
    facing: number

    audioGunShot: HTMLAudioElement

    //startfunction
    constructor() {
        this.spawnPlayer()
        this.facing = 1
        window.addEventListener("keydown", (e: KeyboardEvent) => this.keyListener(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.keyListener(e))
    }

    getRectangle() {
        return this.hitbox.getBoundingClientRect()
    }


    //check if keys are pressed
    keyListener(event: KeyboardEvent) {

        let key_state = false
        if (event.type == "keydown") {
            key_state = true
        } else{
            key_state = false
        }

        switch (event.keyCode) {
            case 65:    // key A
                this.left = key_state;
                break;
            case 37:    // key ARROW RIGHT
                this.left = key_state;
                break;
            case 32:    // key SPACE
                this.spacebar = key_state;
                break;
            case 87:    // key W
                this.spacebar = key_state;
                break;
            case 38:    // key ARROW UP
                this.spacebar = key_state;
                break;
            case 68:    // key D
                this.right = key_state;
                break;
            case 39:    // key ARROW LEFT
                this.right = key_state;
                break;
            case 13:    // key ENTER
                this.shoot = key_state;
                break;
            case 69:     // key E
                this.e = key_state;
                break;
            case 49: // key 1
                this.key1 = key_state;
                break;
            case 50: // key 2
                this.key2 = key_state;
                break;
            case 51: // key 3
                this.key3 = key_state;
                break;
        }
    }

    update() {
        //check on movement left and right
        this.newPos()
        if (this.left == true) {
            //Player Gating
            let pos = this.div.style.left.split("p", 1);
            if (+pos[0] > -100) {
                this.walk(-1)
            }
            this.facing = -1    //flip facing of the image
            this.div.style.backgroundImage = "url('images/player/playerRun.gif')"
            this.div.style.transform = "scaleX(-1)"
        } else if (this.right == true) {
            let pos = this.div.style.left.split("p", 1);
            if(+pos[0] <= 700) {
                this.walk(1)
            }
            this.facing = 1     //flip facing of the image
            this.div.style.backgroundImage = "url('images/player/playerRun.gif')"
            this.div.style.transform = "scaleX(1)"
        } else {                //default position of the player image
            this.div.style.backgroundImage = "url('images/player/player_idle.gif')"
        }

        if (this.left == true && this.gun == 1) {
            this.facing = -1    //flip facing of the image
            this.div.style.backgroundImage = "url('images/player/playerRunHG.gif')"
            this.div.style.transform = "scaleX(-1)"
        } else if (this.right == true && this.gun == 1) {
            this.facing = 1     //flip facing of the image
            this.div.style.backgroundImage = "url('images/player/playerRunHG.gif')"
            this.div.style.transform = "scaleX(1)"
        } else if (this.gun == 1) {
            this.div.style.backgroundImage = "url('images/player/playerIdleHG.png')"
        }

        if (this.left == true && this.gun == 2) {
            this.facing = -1    //flip facing of the image
            this.div.style.backgroundImage = "url('images/player/playerRunAR.gif')"
            this.div.style.transform = "scaleX(-1)"
        } else if (this.right == true && this.gun == 2) {
            this.facing = 1     //flip facing of the image
            this.div.style.backgroundImage = "url('images/player/playerRunAR.gif')"
            this.div.style.transform = "scaleX(1)"
        } else if (this.gun == 2) {
            this.div.style.backgroundImage = "url('images/player/playerIdleAR.png')"
        }

        if (this.left == true && this.gun == 3) {
            this.facing = -1    //flip facing of the image
            this.div.style.backgroundImage = "url('images/player/playerRunSG.gif')"
            this.div.style.transform = "scaleX(-1)"
        } else if (this.right == true && this.gun == 3) {
            this.facing = 1     //flip facing of the image
            this.div.style.backgroundImage = "url('images/player/playerRunSG.gif')"
            this.div.style.transform = "scaleX(1)"
        } else if (this.gun == 3) {
            this.div.style.backgroundImage = "url('images/player/playerIdleSG.png')"
        }

        //enable jumping and check if player is already jumping
        if (this.spacebar && this.jumping == false) {
            this.jump()
        }

        if (this.jumping == true) {
            this.div.style.backgroundImage = "url('images/player/playerJump.gif')"
        }
        // Gun and gif
        if (this.shoot == true) {
            if (this.gun == 0) {
                this.div.style.backgroundImage = "url('images/player/player_idle.gif')";
            }
            else if (this.gun == 1) {
                this.shootBullet(1)
                this.div.style.backgroundImage = "url('images/player/playerIdleShootHG.gif')";
                if (this.right == true || this.left == true) {
                    this.div.style.backgroundImage = "url('images/player/playerRunShootHG.gif')";
                }
            }
            else if (this.gun == 2) {
                this.shootBullet(2)
                this.div.style.backgroundImage = "url('images/player/playerIdleShootAR.gif')";
                if (this.right == true || this.left == true) {
                    this.div.style.backgroundImage = "url('images/player/playerRunShootAR.gif')";
                }
            }
            else if (this.gun == 3) {
                this.shootBullet(3)
                this.div.style.backgroundImage = "url('images/player/playerIdleShootSG.gif')";
                if (this.right == true || this.left == true) {
                    this.div.style.backgroundImage = "url('images/player/playerRunShootSG.gif')";
                }
            }
        }

        this.timer -= 1;

        this.playerX = this.hitbox.getBoundingClientRect().x
        this.playerY = this.hitbox.getBoundingClientRect().y
    }


    walk(moveDirection: number) {
        this.direction = moveDirection

        let splitted = this.div.style.left.split("p", 1);
        this.div.style.left = +splitted[0] + (10 * moveDirection) + "px"   //MOVEMENT SPEED ADJUSTMENT
    }

    jump() {
        this.jumping = true
        this.gravitySpeed = 0
        this.gravity = -2

        let audioJump = new Audio("audio/jump.mp3");
        audioJump.play()
    }

    newPos() {
        this.gravitySpeed += this.gravity;

        let splitted = this.div.style.top.split("p", 1);
        this.y = +splitted[0]
        this.y += this.speedY + this.gravitySpeed;

        this.div.style.top = this.y + "px"

        this.hitJumpHight()
        this.hitBottom();
    }

    hitJumpHight() {
        let splitted = this.div.style.top.split("p", 1);
        if (+splitted[0] < 400) { //hight of jump
            this.gravity = 2;
            this.gravitySpeed = 0
            this.div.style.top = "400px"
        }
    }

    hitBottom() {
        let splitted = this.div.style.top.split("p", 1);
        if (+splitted[0] > 600) {
            this.jumping = false
            this.div.style.top = "600px";
        }
    }

    spawnPlayer() {
        this.div = document.createElement("player")
        let game = document.getElementsByTagName("game")

        this.hitbox = document.createElement("hitbox")
        this.div.appendChild(this.hitbox)

        this.div.style.top = "600px"
        this.div.style.left = "0px" //750px

        game[0].appendChild(this.div)
    }

    shootBullet(x: number) {
        if (this.timer < 0) {
            let bullettype = x
            if (bullettype == 1) {
                this.timer = 30             //cooldown on gun
                let x = this.playerX + 60
                let y = this.playerY - 11
                this.bullets.push(new Bullet(x, y, this.facing))
                let audioGunShot = new Audio("audio/shot1.mp3");
                audioGunShot.play()
            } if (bullettype == 2) {
                this.timer = 10             //cooldown on gun
                let x = this.playerX + 10
                let y = this.playerY - 35
                this.bullets.push(new ArBullet(x, y, this.facing))
                let audioGunShot = new Audio("audio/shot2.mp3");
                audioGunShot.play()
            } if (bullettype == 3) {
                this.timer = 40             //cooldown on gun
                let x = this.playerX + 2
                let y = this.playerY - 20
                this.bullets.push(new SgBullet(x, y, this.facing))
                let audioGunShot = new Audio("audio/shot3.mp3");
                audioGunShot.play()
            }
        }
    }
}