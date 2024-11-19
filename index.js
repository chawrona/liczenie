const rozpocznijBtn = document.querySelector(".rozpocznij-btn")
const rozpocznij = document.querySelector(".rozpocznij")
const test = document.querySelector(".test")

let indexPytania = 0;

let pytania = []


function zapiszpytanie(object) {
    let obj = JSON.parse(localStorage.getItem("object"))
    if (!obj) obj = []
    obj = [...obj, ...object]
    localStorage.setItem("object", JSON.stringify(obj))
}

function wezObiekt() {
    return JSON.parse(localStorage.getItem("object"))
}


const selected = {
    "5": false,
    "8": false,
    "11": false,
    "17": false,
    "35": false,
}

rozpocznijBtn.addEventListener("click", ()=> {

    rozpocznij.style.display = "none";
    test.style.display = "block";
    document.body.style = "justify-content: start;"
    generowanie()
    row.innerHTML = pytania[indexPytania].pytanie
    ab.innerHTML = `${indexPytania + 1} / 10`
})


const buttons = document.querySelectorAll(".btn")

for (const button of buttons) {
    button.addEventListener("click", () => {
        const integer = Number(button.innerHTML)
        
        selected[integer] = !selected[integer]
        button.classList.toggle("active")
    })

}

const row = document.querySelector(".row")
const ab = document.querySelector(".ab")
const submit = document.querySelector(".submit")
const inp = document.querySelector(".inp")

const form = document.querySelector("form")


form.addEventListener("submit", (e) => {
    e.preventDefault()
    if (!inp.value) return

    pytania[indexPytania].odpowiedzGracza = inp.value

    inp.value = false

    indexPytania++
    if (indexPytania === 10) return generujWynik()

    inp.focus()

    row.innerHTML = pytania[indexPytania].pytanie
    ab.innerHTML = `${indexPytania + 1} / 10`
})


function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function generowanie() {

    const liczby = []

    if (selected[5]) liczby.push(5)
    if (selected[8]) liczby.push(8)
    if (selected[11]) liczby.push(11)
    if (selected[17]) liczby.push(17)
    if (selected[35]) liczby.push(35)

    console.log(liczby.length === 0);
        

    if (liczby.length === 0) {

        console.log(2);
        
        const ppp2 = wezObiekt()
        if (ppp2.length === 0) return
        while (pytania.length < 10) {
            pytania.push(ppp2[getRandomArbitrary(0, ppp2.length)])
        }
        return
    }

    while (pytania.length < 10) {

        // Losuj dwa mnożniki z zakresu 2-10
        const mnoznik2 =  getRandomArbitrary(0, liczby.length)
        const mnoznik1 = getRandomArbitrary(2, 11)

        // Oblicz odpowiedź
        const odpowiedz = mnoznik1 * liczby[mnoznik2];

        // Dodaj pytanie do tablicy
        pytania.push({
            pytanie: `${mnoznik1} x ${liczby[mnoznik2]}`,
            odpowiedz: odpowiedz,
            odpowiedzGracza: false,
        });
    }

}

const wynik = document.querySelector(".wynik")

function generujWynik() {
    test.style.display = "none";
    wynik.style.display = "flex"

    const p = wynik.querySelector("p")

    const www = document.querySelector(".www")
    www.innerHTML = ""

    let zmienna = 0;
   
    for (const pytanie of pytania) {
        const div = document.createElement("div")
        div.classList.add("pelo")

        console.log(pytanie.odpowiedz, Number(pytanie.odpowiedzGracza));
        
        const idk = []

        if (pytanie.odpowiedz === Number(pytanie.odpowiedzGracza)) {
            div.classList.add("green")
            div.innerHTML = `${pytanie.pytanie} = ${pytanie.odpowiedzGracza}`
            zmienna++;
            console.log(zmienna);
            
        } else {
            div.classList.add("red")
            idk.push({
                pytanie: pytanie.pytanie,
                odpowiedz: pytanie.odpowiedz, 
                odpowiedzGracza: 0,
            })
            div.innerHTML = `<span class="wb">${pytanie.pytanie} = ${pytanie.odpowiedz}</span> <span class="wb"> ${pytanie.odpowiedzGracza} </span>`
        }
       
        www.appendChild(div)
        zapiszpytanie(idk)
    }

    console.log(zmienna);
    p.innerText = `Wynik: ${zmienna} / 10`

}


const ppp = document.querySelector(".ppp")

ppp.addEventListener("click", () => {
    koniec()
})

function koniec() {
    document.body.style = "";
    wynik.style.display = "none"
    rozpocznij.style.display = "grid";

    pytania = []
    indexPytania = 0;
}