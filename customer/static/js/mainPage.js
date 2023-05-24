import { cerveza, energizante, licor, noAlcohol, shot, vino, snacks } from "./firebase.js"

const beer = document.getElementById('cervezas')
const liquor = document.getElementById('licor')
const shotss = document.getElementById('shot')
const monster = document.getElementById('energizantes')
const xAlcohol = document.getElementById('noAlcohol')
const papas = document.getElementById('snacks')
const wines = document.getElementById('vino')

window.addEventListener("DOMContentLoaded", async (e) => {
    cerveza(beer)
    energizante(monster)
    shot(shotss)
    licor(liquor)
    noAlcohol(xAlcohol)
    vino(wines)
    snacks(papas)
})

{/* <li class="card">
    <div class="img"><img src="{% static 'images/budweiser.webp' %}" alt="img" draggable="false"></div>
    <h2>Sixpack Budweiser x286ml</h2>
    <div class="price">
    <span class="price_num">$14.000</span>
    </div>
</li> */}