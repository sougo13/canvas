window.onload = function () {
  this.main();
  //setInterval(() => this.main(), 10000); 
  const button = document.getElementById('downloadButton')
  button.onclick = handleButtonClick;
}

async function main() {

  const canvas = document.getElementById('canvas')

  const photos = await getPhotos()

  const text = await getText()
  const arrText = text.split(' ')

  let arr = []
  photos.forEach(elem => {
    arr.push(elem.urls.small)
  })

  const x = canvas.getContext('2d')

  const draw = () => {
    arr.forEach((elem, i) => {
      let image = new Image();
      image.src = elem;

      image.onload = async () => {
        x.globalCompositeOperation = "destination-over";
        x.drawImage(image,
          500 * (i === 2 ? i - 2 : i === 3 ? i - 2 : i),
          250 * (i === 1 ? i - 1 : i === 2 ? i - 1 : i === 3 ? i - 2 : i),
          500,
          250)
      }
    });
  }

  const writeText = () => {
    const maxLength = 50
    let str = ''
    let tmp = ''
    let k = 0
    x.fillStyle = '#ffffff';
    x.font = '24px Comic Sans MS'
    x.textAlign = "center"
    for (i = 0; i < arrText.length; i++) {
      tmp = str
      str += arrText[i] + ' '
      if (str.length > maxLength) {
        x.fillText(tmp, 500, 250 + 30 * k);
        str = arrText[i] + ' '
        k++
      }
      if (str.length === maxLength) {
        x.fillText(str, 500, 250 + 30 * k);
        str = ''
        k++
      }
    }
    x.fillText(str, 500, 250 + 30 * k);
  }

  draw()
  writeText()
}

async function getPhotos() {
  const response = await fetch('https://api.unsplash.com/photos/random?count=4&query=space&client_id=NR9ATPxcIKwmtInFjop1fi71TJFH9UvxGJ-S7IoYkV4');
  const body = await response.json();
  return body
}

async function getText() {
  const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&json=parseQuote');
  const body = await response.json();
  return body.quoteText
}

function handleButtonClick() {
  const canvas = document.getElementById('canvas')
  const image = canvas.toDataURL("image/png");
  document.write('<img src="' + image + '"/>');
}
