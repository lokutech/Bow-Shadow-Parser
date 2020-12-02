// sample = inset 0 1px 3px 5px rgba(0, 0, 0, 0.12), 0 1px 3px 15px #ffffff, inset 0 1px 3px 25px rgba(0, 0, 0, 0.12)

let inputEl = document.querySelector('#input')
let table = document.querySelector('table')
let tbody = document.querySelector('tbody')
let button = document.querySelector('#button')
const clear = document.querySelector('#clear')
const sample = document.querySelector('#sample')

// Parse
button.addEventListener('click', (e) => {
  e.preventDefault()
  if (inputEl.value) {
    table.className = 'show'
    parseAll(inputEl.value.trim())
  } else {
    tbody.innerText = ''
    table.classList.remove('show')
  }
})

// Clear
clear.addEventListener('click', (e) => {
  e.preventDefault()
  inputEl.value = null
  tbody.innerText = null
  table.classList.remove('show')
})

// Sample
sample.addEventListener('click', (e) => {
  e.preventDefault()
  inputEl.value =
    'inset 5px 1px 3px 5px rgba(0, 0, 0, 0.12), -5rem -1px 3px 15px #ffffff, inset 0 1px 3px 25px rgba(0, 0, 0, 0.12)'
  table.className = 'show'
  parseAll(inputEl.value.trim())
})

function parseAll(string) {
  let layers = string.split(/,\s*(?![^\(]*\))/g)
  layers.map((a) => parseSingle(a))
  // return layersArray
}

function parseSingle(string) {
  string = string.replace(/;/g, '')
  let shadow = {
    offsetX: '-',
    offsetY: '-',
    blurRadius: '-',
    spreadRadius: '-',
    color: '-',
    type: 'Drop'
   }

  // Put raw values into an array
  let values = string.split(/ (?![^\(]*\))/g)

  // Assign Shadow Type
  for (let i in values) {
    if (values[i].match('inset')) {
      values.splice(i, 1)
      shadow.type = 'Inset'
    }
  }

  // Assign color
  for (let i in values) {
    if (
      values[i].match(
        /(#(?:[0-9a-f]{2}){2,4}$|(#[0-9a-f]{3}$)|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\)$|black$|silver$|gray$|whitesmoke$|maroon$|red$|purple$|fuchsia$|green$|lime$|olivedrab$|yellow$|navy$|blue$|teal$|aquamarine$|orange$|aliceblue$|antiquewhite$|aqua$|azure$|beige$|bisque$|blanchedalmond$|blueviolet$|brown$|burlywood$|cadetblue$|chartreuse$|chocolate$|coral$|cornflowerblue$|cornsilk$|crimson$|currentcolor$|darkblue$|darkcyan$|darkgoldenrod$|darkgray$|darkgreen$|darkgrey$|darkkhaki$|darkmagenta$|darkolivegreen$|darkorange$|darkorchid$|darkred$|darksalmon$|darkseagreen$|darkslateblue$|darkslategray$|darkslategrey$|darkturquoise$|darkviolet$|deeppink$|deepskyblue$|dimgray$|dimgrey$|dodgerblue$|firebrick$|floralwhite$|forestgreen$|gainsboro$|ghostwhite$|goldenrod$|gold$|greenyellow$|grey$|honeydew$|hotpink$|indianred$|indigo$|ivory$|khaki$|lavenderblush$|lavender$|lawngreen$|lemonchiffon$|lightblue$|lightcoral$|lightcyan$|lightgoldenrodyellow$|lightgray$|lightgreen$|lightgrey$|lightpink$|lightsalmon$|lightseagreen$|lightskyblue$|lightslategray$|lightslategrey$|lightsteelblue$|lightyellow$|limegreen$|linen$|mediumaquamarine$|mediumblue$|mediumorchid$|mediumpurple$|mediumseagreen$|mediumslateblue$|mediumspringgreen$|mediumturquoise$|mediumvioletred$|midnightblue$|mintcream$|mistyrose$|moccasin$|navajowhite$|oldlace$|olive$|orangered$|orchid$|palegoldenrod$|palegreen$|paleturquoise$|palevioletred$|papayawhip$|peachpuff$|peru$|pink$|plum$|powderblue$|rosybrown$|royalblue$|saddlebrown$|salmon$|sandybrown$|seagreen$|seashell$|sienna$|skyblue$|slateblue$|slategray$|slategrey$|snow$|springgreen$|steelblue$|tan$|thistle$|tomato$|transparent$|turquoise$|violet$|wheat$|white$|yellowgreen$|rebeccapurple$)/i,
      )
    ) {
      shadow.color = values[i]
      values.splice(i, 1)
    }
  }

  // Assign values for offset-x, offset-y, blur, spread
  for (let i in shadow) {
    values.length && (shadow[i] = values[0])
    values.shift()
  }

  // Populate Table
  if (![shadow.offsetX, shadow.offsetY, shadow.color].includes('-')) {
    let newRow = tbody.appendChild(document.createElement('tr'))
    // Offset-X
    newRow.appendChild(document.createElement('td')).textContent = shadow.type
    if (Number(shadow.offsetX.replace(/[^-\d]/g, '')) === 0){
      newRow.appendChild(document.createElement('td')).textContent = shadow.offsetX
    } else if (Number(shadow.offsetX.replace(/[^-\d]/g, '')) > 0){
      newRow.appendChild(document.createElement('td')).textContent = shadow.offsetX
      newRow.querySelector('td:last-of-type')
      .appendChild(document.createElement('i'))
      .setAttribute('class', 'fas fa-arrow-right')
    } else {
      newRow.appendChild(document.createElement('td')).textContent = shadow.offsetX
      newRow.querySelector('td:last-of-type')
      .appendChild(document.createElement('i'))
      .setAttribute('class', 'fas fa-arrow-left')
    }

    // Offset Y
    if (Number(shadow.offsetY.replace(/[^-\d]/g, '')) === 0){
      newRow.appendChild(document.createElement('td')).textContent = shadow.offsetY
    } else if (Number(shadow.offsetY.replace(/[^-\d]/g, '')) > 0){
      newRow.appendChild(document.createElement('td')).textContent = shadow.offsetY
      newRow.querySelector('td:last-of-type')
      .appendChild(document.createElement('i'))
      .setAttribute('class', 'fas fa-arrow-down')
    } else {
      newRow.appendChild(document.createElement('td')).textContent = shadow.offsetY
      newRow.querySelector('td:last-of-type')
      .appendChild(document.createElement('i'))
      .setAttribute('class', 'fas fa-arrow-up')
    }

    // Blur Radius
    newRow.appendChild(document.createElement('td')).textContent = shadow.blurRadius
    let img = document.createElement('img')
    img.src = 'blur.png'
    newRow.querySelector('td:last-of-type').appendChild(img)

    // Spread Radius
    newRow.appendChild(document.createElement('td')).textContent = shadow.spreadRadius
    img = document.createElement('img')
    img.src = 'spread.png'
    newRow.querySelector('td:last-of-type').appendChild(img)
    
    // Color
    newRow.appendChild(document.createElement('td')).textContent = shadow.color
    newRow.querySelector('td:last-of-type')
    .appendChild(document.createElement('span'))
    .style.backgroundColor = shadow.color
  }
}


// REGEX Sources //
// for parseAll function: https://stackoverflow.com/questions/19943049/get-every-value-from-a-box-shadow-by-regex
// color match: https://gist.github.com/olmokramer/82ccce673f86db7cda5e#gistcomment-3227016

