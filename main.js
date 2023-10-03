// all about game
{
  let random = Math.round(Math.random());
  let trueCase = "123 456 789 159 357 147 258 369".split(" ");
  let turn = "";
  if (random === 1) {
    turn = "x";
  } else {
    turn = "o";
  }
  let ob = {
    b: false,
    winner: "",
  };
  document.getElementById("turn").textContent = turn;

  function nextTurn() {
    if (turn === "x") {
      turn = "o";
    } else {
      turn = "x";
    }
  }
  let sumX = "";
  let sumO = "";
  let winner = "";
  let sumTurn = "";
  function know(sumType, Tu) {
    for (let i in trueCase) {
      let a = 0;
      for (let j of trueCase[i].split("")) {
        for (let k of sumType.split("")) {
          if (j === k) {
            a++;
          }
        }
      }
      if (a === 3) {
        ob.b = true;
        ob.winner = Tu;
      }
    }
    return ob;
  }
  function partieFunc(wi) {
    document.getElementById("winner").textContent = wi;
    document.getElementsByClassName("overlay")[0].style.display = "grid";
    document.querySelector("button").addEventListener("click", (_) => {
      location.reload();
    });
  }
  document.querySelectorAll(".box").forEach((e) => {
    e.setAttribute("data-b", false);
    e.addEventListener("click", (i) => {
      let t = i.currentTarget;
      let b = undefined;
      if (t.dataset.b === "false") {
        t.textContent = turn;
        if (turn === "x") {
          sumX += t.id;
          sumTurn = sumX;
        } else {
          sumO += t.id;
          sumTurn = sumO;
        }
        console.log(turn);
        console.log(sumTurn);
        know(sumTurn, turn);
        if (ob.b) {
          partieFunc(ob.winner);
        }

        nextTurn();
        document.getElementById("turn").textContent = turn;
        t.dataset.b = true;
      } else {
        i.defaultPrevented;
      }
    });
  });
  document.querySelector(".ref").addEventListener("click", function (i) {
    location.reload();
  });
}
// styling
let arrayColor = ["e52165", "0d1137", "b20238",'008080','333'];

function Coloring(color) {
  document.querySelectorAll("main .container .box").forEach((e) => {
    e.style.backgroundColor = color;
  });
  document.querySelector('.ref').style.backgroundColor = color
}

window.addEventListener("DOMContentLoaded", _ => {
  arrayColor.forEach((e) => {
    let div = document.createElement("div");
    div.style.backgroundColor = "#" + e;
    div.className = "coloring";
    document.querySelector(".theme").appendChild(div);
  });
  if (localStorage.getItem("theColor") === null) {
    document.querySelectorAll(".theme div")[0].classList.add("active");
    Coloring(document.querySelector(".active").style.backgroundColor);
  }else{
    Coloring(localStorage.getItem("theColor"))
    document.querySelectorAll('.theme div').forEach((e)=>{
      if(localStorage.getItem('theColor')===e.style.backgroundColor){
        e.classList.add('active')
      }
    })
  }
});

document.addEventListener('click',function(i){
  if (i.target.classList.contains('coloring')) {
    let curr = i.target.style.backgroundColor;
    Coloring(curr)
    localStorage.setItem('theColor',curr)
    document.querySelector('.active')===null?false:document.querySelector('.active').classList.remove('active')
    i.target.classList.add('active')
  }
})