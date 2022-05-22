class Games {
    constructor(player, com) {
        this.player = player;
        this.com = com;
    }
}

function draw() {
    document.getElementById("draw").style.display = "block";
    document.getElementById("versus").style.display = "none";
}

function playerWin() {
    document.getElementById("playerWin").style.display = "block";
    document.getElementById("versus").style.display = "none";
}

function comWin() {
    document.getElementById("comWin").style.display = "block";
    document.getElementById("versus").style.display = "none";
}

var pilihan = false;
var acak;

function play(el, player) {
    if (pilihan) return;
    pilihan = true;
    el.style.backgroundColor = "rgb(243, 231, 231)",
        el.style.borderRadius = "10%";
    const com = acak();

    if (player - com === 0) {
        draw();
    } else if (player - com === -2 || player - com === 1) {
        playerWin();
    } else if (player - com === -1 || player - com === 2) {
        comWin();
    }
}

function acak() {
    const com = Math.floor((Math.random() * 3) - 0, 0001);
    const el = document.querySelectorAll("div.player2 > input.computer")
    el[com].style.backgroundColor = "rgb(243, 231, 231)";
    el[com].style.borderRadius = "10%";
    return com;
}
console.log(el);

function reset() {
    document.getElementById("batu").style.backgroundColor = "transparent";
    document.getElementById("kertas").style.backgroundColor = "transparent";
    document.getElementById("gunting").style.backgroundColor = "transparent";
    document.getElementById("batu2").style.backgroundColor = "transparent";
    document.getElementById("kertas2").style.backgroundColor = "transparent";
    document.getElementById("gunting2").style.backgroundColor = "transparent";
    document.getElementById("draw").style.display = "none";
    document.getElementById("playerWin").style.display = "none";
    document.getElementById("comWin").style.display = "none";
    document.getElementById("versus").style.display = "block";
    pilihan = false;
}