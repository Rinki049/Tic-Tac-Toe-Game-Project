let turn = "x";
let isgameover = false;

const turnSound = new Audio("ting.mp3");
const winSound = new Audio("win.mp3");

// Change turn
const changeTurn = () => turn === "x" ? "o" : "x";

// Check Win
const checkWin = () => {
    let box_text = document.getElementsByClassName('box_text');

    let wins = [
        [0,1,2, 4,4,0],
        [3,4,5, 4,14,0],
        [6,7,8, 4,24,0],
        [0,3,6, -6,14,90],
        [1,4,7, 4,14,90],
        [2,5,8, 14,14,90],
        [0,4,8, 4,14,45],
        [2,4,6, 4,14,135]
    ];

    wins.forEach(e => {
        if (
            box_text[e[0]].innerText !== "" &&
            box_text[e[0]].innerText === box_text[e[1]].innerText &&
            box_text[e[1]].innerText === box_text[e[2]].innerText
        ) {
            document.querySelector('.info').innerText = box_text[e[0]].innerText + " wins!";
            isgameover = true;
            winSound.play();

            document.querySelector('.imgBox img').style.width = "200px";
            document.querySelector(".line").style.transform =
                `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            document.querySelector(".line").style.width = "18vw";
        }
    });
};

// Check Draw
const checkDraw = () => {
    let all = [...document.querySelectorAll(".box_text")].every(b => b.innerText !== "");
    if (!isgameover && all) {
        document.querySelector(".info").innerText = "It's a Draw!";
        isgameover = true;
    }
};

// Game logic
let boxes = document.getElementsByClassName("box");

Array.from(boxes).forEach(box => {
    let box_text = box.querySelector('.box_text');

    box.addEventListener('click', () => {
        if (box_text.innerText === "" && !isgameover) {
            box_text.innerText = turn;
            box_text.style.transform = "scale(1.2)";
            setTimeout(() => box_text.style.transform = "scale(1)", 150);

            turnSound.play();
            checkWin();
            checkDraw();

            if (!isgameover) {
                turn = changeTurn();
                document.querySelector(".info").innerText = "Turn for " + turn;
            }
        }
    });
});

// Reset button
reset.addEventListener("click", () => {
    document.querySelectorAll(".box_text").forEach(b => b.innerText = "");
    turn = "x";
    isgameover = false;

    document.querySelector(".info").innerText = "Turn for x";
    document.querySelector('.imgBox img').style.width = "0";
    document.querySelector(".line").style.width = "0";
});
