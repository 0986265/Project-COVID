"use strict";
var Alarm = (function () {
    function Alarm() {
        var game = document.getElementsByTagName("level");
        this.div = document.createElement("alarm");
        game[0].appendChild(this.div);
    }
    return Alarm;
}());
var Background = (function () {
    function Background() {
        var _this = this;
        this.left = false;
        this.right = false;
        this.bg = document.createElement("bg");
        this.bg2 = document.createElement("bg2");
        var level = document.getElementsByTagName("level");
        level[0].appendChild(this.bg2);
        level[0].appendChild(this.bg);
        window.addEventListener("keydown", function (e) { return _this.keyListener(e); });
        window.addEventListener("keyup", function (e) { return _this.keyListener(e); });
    }
    Background.prototype.keyListener = function (event) {
        var key_state = false;
        if (event.type == "keydown") {
            key_state = true;
        }
        else {
            key_state = false;
        }
        switch (event.keyCode) {
            case 65:
                this.left = key_state;
                break;
            case 37:
                this.left = key_state;
                break;
            case 68:
                this.right = key_state;
                break;
            case 39:
                this.right = key_state;
                break;
        }
    };
    Background.prototype.update = function () {
        if (this.left == true) {
        }
        else if (this.right == true) {
            var player = document.getElementsByTagName("player");
            var style = window.getComputedStyle(player[0]);
            var pos = style.left.split("p", 1);
            if (+pos[0] > 675) {
                this.move(-1);
            }
        }
        else
            this.move(0);
    };
    Background.prototype.move = function (moveDirection) {
        var splitted = this.bg2.style.left.split("p", 1);
        this.bg2.style.left = +splitted[0] + (1 * moveDirection) + "px";
    };
    return Background;
}());
var End = (function () {
    function End() {
        this.spawnEnd();
    }
    End.prototype.spawnEnd = function () {
        this.div = document.createElement("end");
        var level = document.getElementsByTagName("level");
        this.div.style.top = "0px";
        this.div.style.left = "14700px";
        level[0].appendChild(this.div);
    };
    return End;
}());
var Enemy = (function () {
    function Enemy(index) {
        this.name = "";
        this.hitpoints = 0;
        this.direction = 0;
        this.grounded = false;
        this.weapon = 0;
        this.id = 0;
        this.id = index;
    }
    Enemy.prototype.EnemeyLoop = function () {
        var _this = this;
        this.HealthEnemy();
        this.movement();
        requestAnimationFrame(function () { return _this.EnemeyLoop(); });
    };
    Enemy.prototype.movement = function () {
        var splitted = this.div.style.left.split("p", 1);
        if (+splitted > 10000) {
            this.direction = 0;
        }
        else if (+splitted < 0) {
            this.direction = 1;
        }
        if (this.direction == 0) {
            this.div.style.left = +splitted[0] - (this.movementSpeed) + "px";
            this.div.style.transform = "scaleX(1)";
        }
        else if (this.direction == 1) {
            this.div.style.left = +splitted[0] + (this.movementSpeed) + "px";
            this.div.style.transform = "scaleX(-1)";
        }
    };
    Enemy.prototype.getRectangle = function () {
        return this.hitbox.getBoundingClientRect();
    };
    Enemy.prototype.randomSprite = function () {
        var x = (Math.random() * 10);
        if (x >= 0 && x <= 2) {
            this.div.style.backgroundImage = "url('images/enemy/EM1.gif')";
        }
        if (x >= 2 && x <= 4) {
            this.div.style.backgroundImage = "url('images/enemy/EM2.gif')";
        }
        if (x >= 4 && x <= 6) {
            this.div.style.backgroundImage = "url('images/enemy/EM3.gif')";
        }
        if (x >= 6 && x <= 8) {
            this.div.style.backgroundImage = "url('images/enemy/EMB.gif')";
        }
        if (x >= 8 && x <= 10) {
            this.div.style.backgroundImage = "url('images/enemy/enemyWalkLeft.gif')";
        }
    };
    Enemy.prototype.spawnEnemy = function (r1, r2, speed) {
        this.movementSpeed = speed;
        this.div = document.createElement("enemy");
        var level = document.getElementsByTagName("level");
        this.hitbox = document.createElement("hitbox");
        this.hitbox.setAttribute("id", this.id.toString());
        this.hitbox.setAttribute("name", "enemyhitbox");
        this.div.appendChild(this.hitbox);
        var x = (Math.random() * r1) + r2;
        this.div.style.top = "600px";
        this.div.style.left = x + "px";
        level[0].appendChild(this.div);
        this.hitbox.setAttribute("health", "3");
        this.div.setAttribute("name", "enemy");
        this.div.setAttribute("id", this.id.toString());
    };
    Enemy.prototype.HealthEnemy = function () {
        var health = this.hitbox.getAttribute("health");
        if (health == "2") {
            this.div.style.opacity = "66%";
        }
        if (health == "1") {
            this.div.style.opacity = "33%";
        }
    };
    return Enemy;
}());
var EnemyBoss = (function () {
    function EnemyBoss() {
        this.name = "";
        this.hitpoints = 0;
        this.direction = 0;
        this.grounded = false;
        this.weapon = 0;
    }
    EnemyBoss.prototype.behiaviour = function () {
    };
    return EnemyBoss;
}());
var Foreground = (function () {
    function Foreground() {
        this.div = document.createElement("fg");
        var level = document.getElementsByTagName("level");
        level[0].appendChild(this.div);
    }
    Foreground.prototype.update = function () {
    };
    Foreground.prototype.checkCollison = function () {
    };
    Foreground.prototype.draw = function () {
    };
    return Foreground;
}());
var Game = (function () {
    function Game() {
        this.currentLevel = 0;
        this.score = 0;
        this.GT3 = false;
        this.GT31 = true;
        this.GT32 = true;
        this.GT33 = false;
        this.Hg = false;
        this.Ar = false;
        this.Sg = false;
        this.switch1 = false;
        this.switch2 = false;
        this.switch3 = false;
        this.switch4 = false;
        this.switch5 = false;
        this.switch6 = false;
        this.switch7 = false;
        this.switch8 = false;
        this.alarm = [];
        console.log("Game was created!");
        this.level = new Level();
        this.foreground = new Foreground();
        this.background = new Background();
        this.player = new Player();
        this.guntip = new GunTip();
        this.HGitem = new HGitem();
        this.ARitem = new ARitem();
        this.SGitem = new SGitem();
        this.end = new End();
        this.healthpoint = new HealthPoint();
        for (var i = 0; i < 6; i++) {
            this.alarm[i] = new Alarm();
            this.alarm[i].div.style.left = 8800 + (1000 * i) + "px";
        }
        this.gameLoop();
        this.hitLoop();
        this.displayHealth();
        this.cutscene();
        var audioButtercup = new Audio("audio/buttercup.mp3");
        audioButtercup.play();
    }
    Game.prototype.checkIfHit = function () {
        var _this = this;
        document.getElementsByName("enemyhitbox").forEach(function (enemy) {
            var testhit = _this.checkCollision(_this.player.getRectangle(), enemy.getBoundingClientRect());
            if (testhit == true) {
                var health = _this.player.playerHealth;
                health.pop();
                _this.destroyHealth();
                _this.player.hit = 1;
                if (_this.player.playerHealth.length === 0) {
                    _this.respawnPlayer();
                }
                else {
                    console.log(_this.player.playerHealth);
                }
            }
        });
    };
    Game.prototype.cutscene = function () {
        var vid = document.getElementById("video");
        vid.addEventListener('ended', function () {
            var div = document.getElementById("videodiv");
            vid === null || vid === void 0 ? void 0 : vid.remove();
            div === null || div === void 0 ? void 0 : div.remove();
        });
        vid.addEventListener('click', function () {
            var div = document.getElementById("videodiv");
            vid === null || vid === void 0 ? void 0 : vid.remove();
            div === null || div === void 0 ? void 0 : div.remove();
        });
    };
    Game.prototype.hitLoop = function () {
        var _this = this;
        if (this.player.hit == 1) {
            this.player.hit = 0;
            setTimeout(function () {
                requestAnimationFrame(function () { return _this.hitLoop(); });
            }, 500);
        }
        else {
            this.checkIfHit();
            requestAnimationFrame(function () { return _this.hitLoop(); });
        }
    };
    Game.prototype.checkIfHitHGitem = function () {
        var hit = this.checkCollision(this.player.getRectangle(), this.HGitem.getRectangle());
        var hit1 = this.checkCollision(this.player.getRectangle(), this.ARitem.getRectangle());
        var hit2 = this.checkCollision(this.player.getRectangle(), this.SGitem.getRectangle());
        var gun1 = document.getElementById("handgun");
        var gun2 = document.getElementById("assultgun");
        var gun3 = document.getElementById("shotgun");
        if (hit == true && this.player.e == true) {
            this.player.gun = 1;
            this.Hg = true;
            this.GT33 = true;
            this.HGitem.div.remove();
            var gun = document.getElementById("handgun");
            gun === null || gun === void 0 ? void 0 : gun.setAttribute("style", "display:block;");
            console.log("Handgun");
            gun1 === null || gun1 === void 0 ? void 0 : gun1.setAttribute("style", "background-color:#33A6B5; display:block; opacity: 100%;");
            if (this.Ar == true) {
                gun2 === null || gun2 === void 0 ? void 0 : gun2.setAttribute("style", "background-color:none; display:block; opacity: 100%;");
            }
            if (this.Sg == true) {
                gun3 === null || gun3 === void 0 ? void 0 : gun3.setAttribute("style", "background-color:none; display:block; opacity: 100%;");
            }
        }
        if (hit1 == true && this.score >= 300 && this.player.e == true) {
            this.score -= 300;
            this.player.gun = 2;
            this.Ar = true;
            this.ARitem.div.remove();
            this.GT3 = true;
            var gun = document.getElementById("assultgun");
            gun === null || gun === void 0 ? void 0 : gun.setAttribute("style", "display:block;");
            console.log("Assault Rifle");
            if (this.Hg == true) {
                gun1 === null || gun1 === void 0 ? void 0 : gun1.setAttribute("style", "background-color:none; display:block; opacity: 100%;");
            }
            gun2 === null || gun2 === void 0 ? void 0 : gun2.setAttribute("style", "background-color:#33A6B5; display:block; opacity: 100%;");
            if (this.Sg == true) {
                gun3 === null || gun3 === void 0 ? void 0 : gun3.setAttribute("style", "background-color:none; display:block; opacity: 100%;");
            }
        }
        if (hit2 == true && this.score >= 200 && this.player.e == true) {
            this.score -= 200;
            this.player.gun = 3;
            this.Sg = true;
            this.GT3 = true;
            this.SGitem.div.remove();
            var gun = document.getElementById("shotgun");
            gun === null || gun === void 0 ? void 0 : gun.setAttribute("style", "display:block;");
            console.log("Shotgun");
            if (this.Hg == true) {
                gun1 === null || gun1 === void 0 ? void 0 : gun1.setAttribute("style", "background-color:none; display:block; opacity: 100%;");
            }
            if (this.Ar == true) {
                gun2 === null || gun2 === void 0 ? void 0 : gun2.setAttribute("style", "background-color:none; display:block; opacity: 100%;");
            }
            gun3 === null || gun3 === void 0 ? void 0 : gun3.setAttribute("style", "background-color:#33A6B5; display:block; opacity: 100%;");
        }
    };
    Game.prototype.gunSwitch = function () {
        var gun1 = document.getElementById("handgun");
        var gun2 = document.getElementById("assultgun");
        var gun3 = document.getElementById("shotgun");
        if (this.player.key1 == true && this.Hg == true) {
            this.player.gun = 1;
            gun1 === null || gun1 === void 0 ? void 0 : gun1.setAttribute("style", "background-color:#33A6B5; display:block; opacity: 100%;");
            if (this.Ar == true) {
                gun2 === null || gun2 === void 0 ? void 0 : gun2.setAttribute("style", "background-color:none; display:block; opacity: 100%;");
            }
            if (this.Sg == true) {
                gun3 === null || gun3 === void 0 ? void 0 : gun3.setAttribute("style", "background-color:none; display:block; opacity: 100%;");
            }
        }
        else if (this.player.key3 == true && this.Ar == true) {
            this.player.gun = 2;
            if (this.Hg == true) {
                gun1 === null || gun1 === void 0 ? void 0 : gun1.setAttribute("style", "background-color:none; display:block; opacity: 100%;");
            }
            gun2 === null || gun2 === void 0 ? void 0 : gun2.setAttribute("style", "background-color:#33A6B5; display:block; opacity: 100%;");
            if (this.Sg == true) {
                gun3 === null || gun3 === void 0 ? void 0 : gun3.setAttribute("style", "background-color:none; display:block; opacity: 100%;");
            }
        }
        else if (this.player.key2 == true && this.Sg == true) {
            this.player.gun = 3;
            if (this.Hg == true) {
                gun1 === null || gun1 === void 0 ? void 0 : gun1.setAttribute("style", "background-color:none; display:block; opacity: 100%;");
            }
            if (this.Ar == true) {
                gun2 === null || gun2 === void 0 ? void 0 : gun2.setAttribute("style", "background-color:none; display:block; opacity: 100%;");
            }
            gun3 === null || gun3 === void 0 ? void 0 : gun3.setAttribute("style", "background-color:#33A6B5; display:block; opacity: 100%;");
        }
    };
    Game.prototype.checkIfHitHealthPoint = function () {
        var hit = this.checkCollision(this.player.getRectangle(), this.healthpoint.getRectangle());
        if (hit == true && this.player.playerHealth.length > 0) {
            this.player.playerHealth.push(1);
            this.addHealth();
            this.healthpoint.div.remove();
        }
        return hit;
    };
    Game.prototype.spawnEnemies = function (spawnAmount, r1, r2, speed) {
        for (var index = 0; index < spawnAmount; index++) {
            this.enemy = new Enemy(index);
            this.enemy.spawnEnemy(r1, r2, speed);
            this.enemy.EnemeyLoop();
            this.enemy.randomSprite();
        }
    };
    Game.prototype.spawnEnemiesInLevel = function () {
        if (this.switch1 == false) {
            if (this.level.levelX < -10) {
                this.spawnEnemies(1, 1900, 2000, 2);
                this.switch1 = true;
            }
        }
        if (this.switch2 == false) {
            if (this.level.levelX < -1200) {
                this.spawnEnemies(1, 2700, 2600, 4);
                this.switch2 = true;
            }
        }
        if (this.switch3 == false) {
            if (this.level.levelX < -2500) {
                this.spawnEnemies(3, 3800, 3800, 5);
                this.switch3 = true;
            }
        }
        if (this.switch4 == false) {
            if (this.level.levelX < -4000) {
                this.spawnEnemies(5, 5500, 5800, 6);
                this.switch4 = true;
            }
        }
        if (this.switch5 == false) {
            if (this.level.levelX < -4200) {
                this.spawnEnemies(18, 5200, 18000, 7);
                this.switch5 = true;
            }
        }
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.gunSwitch();
        this.checkIfHitHGitem();
        this.player.update();
        this.level.update();
        this.background.update();
        this.displayScore();
        this.hitEnd();
        this.guntipMaker();
        this.enemyDestroyedChecker();
        this.checkIfHitHealthPoint();
        this.spawnEnemiesInLevel();
        for (var _i = 0, _a = this.player.bullets; _i < _a.length; _i++) {
            var bullet = _a[_i];
            bullet.update();
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.guntipMaker = function () {
        var _this = this;
        if (this.GT33 == true) {
            this.GT33 = false;
            setTimeout(function () {
                var tip = document.getElementsByTagName("guntip");
                tip[0].remove();
            }, 3000);
        }
        if (this.GT32 == true) {
            if (this.score >= 200) {
                this.guntip2 = new GunTip2();
                this.GT32 = false;
            }
        }
        if (this.GT3 == true) {
            this.GT3 = false;
            setTimeout(function () {
                var tip = document.getElementsByTagName("guntip2");
                tip[0].remove();
                _this.guntip3 = new GunTip3();
            }, 3000);
            setTimeout(function () {
                var tip = document.getElementsByTagName("guntip3");
                tip[0].remove();
            }, 12000);
        }
    };
    Game.prototype.enemyDestroyedChecker = function () {
        var _this = this;
        document.getElementsByName("enemyhitbox").forEach(function (Target) {
            var _a;
            var name = Target.getAttribute("health");
            if (name == "0" || name == "-1") {
                _this.score += 100;
                Target.setAttribute("health", "-1");
                (_a = Target.parentElement) === null || _a === void 0 ? void 0 : _a.remove();
                Target.remove();
            }
        });
    };
    Game.prototype.displayScore = function () {
        var score = document.getElementById("score");
        score.innerHTML = String(this.score) + " points";
        return score;
    };
    Game.prototype.displayHealth = function () {
        var health = document.createElement("div");
        health.setAttribute("class", "health");
        this.player.playerHealth.forEach(function () {
            var _a;
            var health = document.createElement("div");
            health.setAttribute("id", "health");
            (_a = document.getElementById("flex")) === null || _a === void 0 ? void 0 : _a.prepend(health);
        });
    };
    Game.prototype.destroyHealth = function () {
        var ele = document.getElementById("health");
        ele === null || ele === void 0 ? void 0 : ele.remove();
        var audioHP = new Audio("audio/hp.mp3");
        audioHP.play();
    };
    Game.prototype.hitEnd = function () {
        var end = document.getElementsByTagName("end");
        var hit = this.checkCollision(this.player.hitbox.getBoundingClientRect(), end[0].getBoundingClientRect());
        if (hit == true) {
            this.end.div.remove();
            var endlevelDiv = document.getElementById("endlevel");
            endlevelDiv === null || endlevelDiv === void 0 ? void 0 : endlevelDiv.addEventListener("click", function () { window.location.reload(); });
            endlevelDiv === null || endlevelDiv === void 0 ? void 0 : endlevelDiv.setAttribute("style", "display:block;");
        }
    };
    Game.prototype.addHealth = function () {
        var _a;
        var health = document.createElement("div");
        health.setAttribute("id", "health");
        (_a = document.getElementById("flex")) === null || _a === void 0 ? void 0 : _a.prepend(health);
        var audioAddHealth = new Audio("audio/addHealth.mp3");
        audioAddHealth.play();
    };
    Game.prototype.respawnPlayer = function () {
        this.player.div.remove();
        var respawnDiv = document.getElementById("respawn");
        respawnDiv === null || respawnDiv === void 0 ? void 0 : respawnDiv.addEventListener("click", function () { window.location.reload(); });
        respawnDiv === null || respawnDiv === void 0 ? void 0 : respawnDiv.setAttribute("style", "display:block;");
        var audioRespawnPlayer = new Audio("audio/died.mp3");
        audioRespawnPlayer.play();
    };
    Game.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var HealthPoint = (function () {
    function HealthPoint() {
        this.hp = 1;
        var game = document.getElementsByTagName("level");
        this.div = document.createElement("hp");
        game[0].appendChild(this.div);
    }
    HealthPoint.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    return HealthPoint;
}());
var Item = (function () {
    function Item() {
        this.name = "";
        this.hitpoints = 0;
        this.direction = 0;
        this.grounded = false;
        this.weapon = 0;
        this.enemyhealth = 3;
        this.spawnItem();
    }
    Item.prototype.getRectangle = function () {
        return this.hitbox.getBoundingClientRect();
    };
    Item.prototype.behiaviour = function () {
    };
    Item.prototype.spawnItem = function () {
        this.div = document.createElement("item");
        var level = document.getElementsByTagName("level");
        this.hitbox = document.createElement("hitboxitem");
        this.div.appendChild(this.hitbox);
        this.div.style.top = "600px";
        this.div.style.left = "500px";
        level[0].appendChild(this.div);
    };
    return Item;
}());
var Level = (function () {
    function Level() {
        var _this = this;
        this.id = 0;
        this.player = "";
        this.enemies = "";
        this.items = 0;
        this.left = false;
        this.right = false;
        this.levelX = 0;
        this.div = document.createElement("level");
        var game = document.getElementsByTagName("game");
        game[0].appendChild(this.div);
        window.addEventListener("keydown", function (e) { return _this.keyListener(e); });
        window.addEventListener("keyup", function (e) { return _this.keyListener(e); });
    }
    Level.prototype.keyListener = function (event) {
        var key_state = false;
        if (event.type == "keydown") {
            key_state = true;
        }
        else {
            key_state = false;
        }
        switch (event.keyCode) {
            case 65:
                this.left = key_state;
                break;
            case 37:
                this.left = key_state;
                break;
            case 68:
                this.right = key_state;
                break;
            case 39:
                this.right = key_state;
                break;
        }
    };
    Level.prototype.update = function () {
        if (this.left == true) {
        }
        else if (this.right == true) {
            var player = document.getElementsByTagName("player");
            var style = window.getComputedStyle(player[0]);
            var pos = style.left.split("p", 1);
            if (+pos[0] >= 700) {
                this.move(-1);
            }
        }
        else
            this.move(0);
        this.levelX = this.div.getBoundingClientRect().x;
    };
    Level.prototype.move = function (moveDirection) {
        var splitted = this.div.style.left.split("p", 1);
        this.div.style.left = +splitted[0] + (10 * moveDirection) + "px";
    };
    Level.prototype.checkCollison = function () {
    };
    Level.prototype.draw = function () {
    };
    return Level;
}());
var Player = (function () {
    function Player() {
        var _this = this;
        this.name = "";
        this.direction = 0;
        this.movespeed = 0;
        this.weapon = 0;
        this.playerHealth = [1, 1, 1, 1, 1,];
        this.x = 0;
        this.y = 0;
        this.playerX = 0;
        this.playerY = 0;
        this.gravity = 1;
        this.gravitySpeed = 0;
        this.speedY = 0;
        this.left = false;
        this.right = false;
        this.spacebar = false;
        this.shoot = false;
        this.jumping = false;
        this.gun = 0;
        this.hit = 0;
        this.e = false;
        this.key1 = false;
        this.key2 = false;
        this.key3 = false;
        this.timer = 10;
        this.bullets = [];
        this.spawnPlayer();
        this.facing = 1;
        window.addEventListener("keydown", function (e) { return _this.keyListener(e); });
        window.addEventListener("keyup", function (e) { return _this.keyListener(e); });
    }
    Player.prototype.getRectangle = function () {
        return this.hitbox.getBoundingClientRect();
    };
    Player.prototype.keyListener = function (event) {
        var key_state = false;
        if (event.type == "keydown") {
            key_state = true;
        }
        else {
            key_state = false;
        }
        switch (event.keyCode) {
            case 65:
                this.left = key_state;
                break;
            case 37:
                this.left = key_state;
                break;
            case 32:
                this.spacebar = key_state;
                break;
            case 87:
                this.spacebar = key_state;
                break;
            case 38:
                this.spacebar = key_state;
                break;
            case 68:
                this.right = key_state;
                break;
            case 39:
                this.right = key_state;
                break;
            case 13:
                this.shoot = key_state;
                break;
            case 69:
                this.e = key_state;
                break;
            case 49:
                this.key1 = key_state;
                break;
            case 50:
                this.key2 = key_state;
                break;
            case 51:
                this.key3 = key_state;
                break;
        }
    };
    Player.prototype.update = function () {
        this.newPos();
        if (this.left == true) {
            var pos = this.div.style.left.split("p", 1);
            if (+pos[0] > -100) {
                this.walk(-1);
            }
            this.facing = -1;
            this.div.style.backgroundImage = "url('images/player/playerRun.gif')";
            this.div.style.transform = "scaleX(-1)";
        }
        else if (this.right == true) {
            var pos = this.div.style.left.split("p", 1);
            if (+pos[0] <= 700) {
                this.walk(1);
            }
            this.facing = 1;
            this.div.style.backgroundImage = "url('images/player/playerRun.gif')";
            this.div.style.transform = "scaleX(1)";
        }
        else {
            this.div.style.backgroundImage = "url('images/player/player_idle.gif')";
        }
        if (this.left == true && this.gun == 1) {
            this.facing = -1;
            this.div.style.backgroundImage = "url('images/player/playerRunHG.gif')";
            this.div.style.transform = "scaleX(-1)";
        }
        else if (this.right == true && this.gun == 1) {
            this.facing = 1;
            this.div.style.backgroundImage = "url('images/player/playerRunHG.gif')";
            this.div.style.transform = "scaleX(1)";
        }
        else if (this.gun == 1) {
            this.div.style.backgroundImage = "url('images/player/playerIdleHG.png')";
        }
        if (this.left == true && this.gun == 2) {
            this.facing = -1;
            this.div.style.backgroundImage = "url('images/player/playerRunAR.gif')";
            this.div.style.transform = "scaleX(-1)";
        }
        else if (this.right == true && this.gun == 2) {
            this.facing = 1;
            this.div.style.backgroundImage = "url('images/player/playerRunAR.gif')";
            this.div.style.transform = "scaleX(1)";
        }
        else if (this.gun == 2) {
            this.div.style.backgroundImage = "url('images/player/playerIdleAR.png')";
        }
        if (this.left == true && this.gun == 3) {
            this.facing = -1;
            this.div.style.backgroundImage = "url('images/player/playerRunSG.gif')";
            this.div.style.transform = "scaleX(-1)";
        }
        else if (this.right == true && this.gun == 3) {
            this.facing = 1;
            this.div.style.backgroundImage = "url('images/player/playerRunSG.gif')";
            this.div.style.transform = "scaleX(1)";
        }
        else if (this.gun == 3) {
            this.div.style.backgroundImage = "url('images/player/playerIdleSG.png')";
        }
        if (this.spacebar && this.jumping == false) {
            this.jump();
        }
        if (this.jumping == true) {
            this.div.style.backgroundImage = "url('images/player/playerJump.gif')";
        }
        if (this.shoot == true) {
            if (this.gun == 0) {
                this.div.style.backgroundImage = "url('images/player/player_idle.gif')";
            }
            else if (this.gun == 1) {
                this.shootBullet(1);
                this.div.style.backgroundImage = "url('images/player/playerIdleShootHG.gif')";
                if (this.right == true || this.left == true) {
                    this.div.style.backgroundImage = "url('images/player/playerRunShootHG.gif')";
                }
            }
            else if (this.gun == 2) {
                this.shootBullet(2);
                this.div.style.backgroundImage = "url('images/player/playerIdleShootAR.gif')";
                if (this.right == true || this.left == true) {
                    this.div.style.backgroundImage = "url('images/player/playerRunShootAR.gif')";
                }
            }
            else if (this.gun == 3) {
                this.shootBullet(3);
                this.div.style.backgroundImage = "url('images/player/playerIdleShootSG.gif')";
                if (this.right == true || this.left == true) {
                    this.div.style.backgroundImage = "url('images/player/playerRunShootSG.gif')";
                }
            }
        }
        this.timer -= 1;
        this.playerX = this.hitbox.getBoundingClientRect().x;
        this.playerY = this.hitbox.getBoundingClientRect().y;
    };
    Player.prototype.walk = function (moveDirection) {
        this.direction = moveDirection;
        var splitted = this.div.style.left.split("p", 1);
        this.div.style.left = +splitted[0] + (10 * moveDirection) + "px";
    };
    Player.prototype.jump = function () {
        this.jumping = true;
        this.gravitySpeed = 0;
        this.gravity = -2;
        var audioJump = new Audio("audio/jump.mp3");
        audioJump.play();
    };
    Player.prototype.newPos = function () {
        this.gravitySpeed += this.gravity;
        var splitted = this.div.style.top.split("p", 1);
        this.y = +splitted[0];
        this.y += this.speedY + this.gravitySpeed;
        this.div.style.top = this.y + "px";
        this.hitJumpHight();
        this.hitBottom();
    };
    Player.prototype.hitJumpHight = function () {
        var splitted = this.div.style.top.split("p", 1);
        if (+splitted[0] < 400) {
            this.gravity = 2;
            this.gravitySpeed = 0;
            this.div.style.top = "400px";
        }
    };
    Player.prototype.hitBottom = function () {
        var splitted = this.div.style.top.split("p", 1);
        if (+splitted[0] > 600) {
            this.jumping = false;
            this.div.style.top = "600px";
        }
    };
    Player.prototype.spawnPlayer = function () {
        this.div = document.createElement("player");
        var game = document.getElementsByTagName("game");
        this.hitbox = document.createElement("hitbox");
        this.div.appendChild(this.hitbox);
        this.div.style.top = "600px";
        this.div.style.left = "0px";
        game[0].appendChild(this.div);
    };
    Player.prototype.shootBullet = function (x) {
        if (this.timer < 0) {
            var bullettype = x;
            if (bullettype == 1) {
                this.timer = 30;
                var x_1 = this.playerX + 60;
                var y = this.playerY - 11;
                this.bullets.push(new Bullet(x_1, y, this.facing));
                var audioGunShot = new Audio("audio/shot1.mp3");
                audioGunShot.play();
            }
            if (bullettype == 2) {
                this.timer = 10;
                var x_2 = this.playerX + 10;
                var y = this.playerY - 35;
                this.bullets.push(new ArBullet(x_2, y, this.facing));
                var audioGunShot = new Audio("audio/shot2.mp3");
                audioGunShot.play();
            }
            if (bullettype == 3) {
                this.timer = 40;
                var x_3 = this.playerX + 2;
                var y = this.playerY - 20;
                this.bullets.push(new SgBullet(x_3, y, this.facing));
                var audioGunShot = new Audio("audio/shot3.mp3");
                audioGunShot.play();
            }
        }
    };
    return Player;
}());
var ArBullet = (function () {
    function ArBullet(x, y, direction) {
        this.spawnBullet(x, y);
        this.facing = direction;
    }
    ArBullet.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    ArBullet.prototype.spawnBullet = function (x, y) {
        this.div = document.createElement("bulletAR");
        this.div.setAttribute("id", "");
        var level = document.getElementsByTagName("game");
        level[0].appendChild(this.div);
        if (this.facing == 1) {
            this.div.style.left = x + 75 + "px";
        }
        else {
            this.div.style.left = x + 0 + "px";
            this.div.style.top = y + 115 + "px";
        }
    };
    ArBullet.prototype.update = function () {
        decodeURI;
        this.locateAllEnemys();
        var splitted = this.div.style.left.split("p", 1);
        if (this.facing == 1) {
            this.div.style.left = +splitted[0] + (20) + "px";
        }
        else {
            this.div.style.left = +splitted[0] - (20) + "px";
        }
        var bulletPosX = this.div.style.left.split("p", 1);
        if (+bulletPosX[0] > 1800 || +bulletPosX[0] < 0) {
            this.div.remove();
        }
    };
    ArBullet.prototype.locateAllEnemys = function () {
        var _this = this;
        document.getElementsByName("enemyhitbox").forEach(function (item) {
            var enemyHit = _this.checkCollision(_this.getRectangle(), item.getBoundingClientRect());
            if (enemyHit == true) {
                _this.div.remove();
                var audiobulletHit = new Audio("audio/bulletHit.mp3");
                audiobulletHit.play();
                var newHealth = item.getAttribute("health");
                var health = Number(newHealth) - 1;
                item.setAttribute("health", health.toString());
            }
        });
    };
    ArBullet.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    return ArBullet;
}());
var ARitem = (function () {
    function ARitem() {
        this.name = "";
        this.hitpoints = 0;
        this.direction = 0;
        this.grounded = false;
        this.weapon = 0;
        this.enemyhealth = 3;
        this.spawnItem();
    }
    ARitem.prototype.getRectangle = function () {
        return this.hitbox.getBoundingClientRect();
    };
    ARitem.prototype.behiaviour = function () {
    };
    ARitem.prototype.spawnItem = function () {
        this.div = document.createElement("ARitem");
        var level = document.getElementsByTagName("level");
        this.hitbox = document.createElement("hitboxARitem");
        this.div.appendChild(this.hitbox);
        this.div.style.top = "590px";
        this.div.style.left = "7500px";
        level[0].appendChild(this.div);
    };
    return ARitem;
}());
var HGitem = (function () {
    function HGitem() {
        this.name = "";
        this.hitpoints = 0;
        this.direction = 0;
        this.grounded = false;
        this.weapon = 0;
        this.enemyhealth = 3;
        this.spawnItem();
    }
    HGitem.prototype.getRectangle = function () {
        return this.hitbox.getBoundingClientRect();
    };
    HGitem.prototype.behiaviour = function () {
    };
    HGitem.prototype.spawnItem = function () {
        this.div = document.createElement("HGitem");
        var level = document.getElementsByTagName("level");
        this.hitbox = document.createElement("hitboxHGitem");
        this.div.appendChild(this.hitbox);
        this.div.style.top = "590px";
        this.div.style.left = "500px";
        level[0].appendChild(this.div);
    };
    return HGitem;
}());
var Bullet = (function () {
    function Bullet(x, y, direction) {
        this.spawnBullet(x, y);
        this.facing = direction;
    }
    Bullet.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    Bullet.prototype.spawnBullet = function (x, y) {
        this.div = document.createElement("bullet");
        this.div.setAttribute("id", "");
        var level = document.getElementsByTagName("game");
        level[0].appendChild(this.div);
        if (this.facing == 1) {
            this.div.style.left = x + 75 + "px";
        }
        else {
            this.div.style.left = x + 0 + "px";
            this.div.style.top = y + 115 + "px";
        }
    };
    Bullet.prototype.update = function () {
        decodeURI;
        this.locateAllEnemys();
        var splitted = this.div.style.left.split("p", 1);
        if (this.facing == 1) {
            this.div.style.left = +splitted[0] + (20) + "px";
        }
        else {
            this.div.style.left = +splitted[0] - (20) + "px";
        }
        var bulletPosX = this.div.style.left.split("p", 1);
        if (+bulletPosX[0] > 1800 || +bulletPosX[0] < 0) {
            this.div.remove();
        }
    };
    Bullet.prototype.locateAllEnemys = function () {
        var _this = this;
        document.getElementsByName("enemyhitbox").forEach(function (item) {
            var enemyHit = _this.checkCollision(_this.getRectangle(), item.getBoundingClientRect());
            if (enemyHit == true) {
                _this.div.remove();
                var audiobulletHit = new Audio("audio/bulletHit.mp3");
                audiobulletHit.play();
                var newHealth = item.getAttribute("health");
                var health = Number(newHealth) - 1;
                item.setAttribute("health", health.toString());
            }
        });
    };
    Bullet.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    return Bullet;
}());
var SGitem = (function () {
    function SGitem() {
        this.name = "";
        this.hitpoints = 0;
        this.direction = 0;
        this.grounded = false;
        this.weapon = 0;
        this.enemyhealth = 3;
        this.spawnItem();
    }
    SGitem.prototype.getRectangle = function () {
        return this.hitbox.getBoundingClientRect();
    };
    SGitem.prototype.behiaviour = function () {
    };
    SGitem.prototype.spawnItem = function () {
        this.div = document.createElement("SGitem");
        var level = document.getElementsByTagName("level");
        this.hitbox = document.createElement("hitboxSGitem");
        this.div.appendChild(this.hitbox);
        this.div.style.top = "590px";
        this.div.style.left = "2775px";
        level[0].appendChild(this.div);
    };
    return SGitem;
}());
var SgBullet = (function () {
    function SgBullet(x, y, direction) {
        this.spawnBullet(x, y);
        this.facing = direction;
    }
    SgBullet.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    SgBullet.prototype.spawnBullet = function (x, y) {
        this.div = document.createElement("bulletSG");
        this.div.setAttribute("id", "");
        var level = document.getElementsByTagName("game");
        level[0].appendChild(this.div);
        if (this.facing == 1) {
            this.div.style.left = x + 75 + "px";
        }
        else {
            this.div.style.left = x + 0 + "px";
            this.div.style.top = y + 115 + "px";
        }
    };
    SgBullet.prototype.update = function () {
        decodeURI;
        this.locateAllEnemys();
        var splitted = this.div.style.left.split("p", 1);
        if (this.facing == 1) {
            this.div.style.left = +splitted[0] + (20) + "px";
        }
        else {
            this.div.style.left = +splitted[0] - (20) + "px";
        }
        var bulletPosX = this.div.style.left.split("p", 1);
        var player = document.getElementsByTagName("player");
        var style = window.getComputedStyle(player[0]);
        var playerPos = style.left.split("p", 1);
        if (+bulletPosX[0] > +playerPos[0] + 550 || +bulletPosX[0] < +playerPos[0] - 300) {
            this.div.remove();
        }
    };
    SgBullet.prototype.locateAllEnemys = function () {
        var _this = this;
        document.getElementsByName("enemyhitbox").forEach(function (item) {
            var enemyHit = _this.checkCollision(_this.getRectangle(), item.getBoundingClientRect());
            if (enemyHit == true) {
                _this.div.remove();
                var audiobulletHit = new Audio("audio/bulletHit.mp3");
                audiobulletHit.play();
                var newHealth = item.getAttribute("health");
                var health = Number(newHealth) - 2;
                item.setAttribute("health", health.toString());
            }
        });
    };
    SgBullet.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    return SgBullet;
}());
var GunTip = (function () {
    function GunTip() {
        this.spawnTip();
    }
    GunTip.prototype.spawnTip = function () {
        this.div = document.createElement("guntip");
        var level = document.getElementsByTagName("level");
        level[0].appendChild(this.div);
    };
    return GunTip;
}());
var GunTip2 = (function () {
    function GunTip2() {
        this.spawnTip();
    }
    GunTip2.prototype.spawnTip = function () {
        this.div = document.createElement("guntip2");
        var level = document.getElementsByTagName("level");
        level[0].appendChild(this.div);
    };
    return GunTip2;
}());
var GunTip3 = (function () {
    function GunTip3() {
        this.spawnTip();
    }
    GunTip3.prototype.spawnTip = function () {
        this.div = document.createElement("guntip3");
        var level = document.getElementsByTagName("game");
        level[0].appendChild(this.div);
    };
    return GunTip3;
}());
//# sourceMappingURL=main.js.map