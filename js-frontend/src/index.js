const endPoint = "http://localhost:3000/api/v1/articles"
const userPoint = "http://localhost:3000/api/v1/users"
const favePoint = "http://localhost:3000/api/v1/favorited_articles"
let numberFaves = 0
let userId = 0
let faveId = document.querySelector(`#fave-id`)
let faveIds = document.querySelectorAll(`#fave-id`)


document.addEventListener("DOMContentLoaded", () =>{
  console.log("Ive been Loaded!")
  addDays();
  signIn();
  getArticles();
  toggleDisplay();
  favoriteListener();



})

function getArticles(){
  let health= []
  let science = []
  let entertainment = []
  let business = []
  let topArts = []
  let all = []
  let counter = 0
  fetch(endPoint)
  .then(response => response.json())
  .then(articles=>{

    articles.data.forEach((article) => {
      let id = article.id
      let tickerMarkUp = ` <div class=hitem><a id=ticker-${id}class="article-link" href=${article.attributes.url} onclick="toggleRedirect(${id})">  ${article.attributes.title}  </a></div>`
      let ticker = document.querySelector(".hmove")

      if (article.attributes.is_top === true && counter <20){
          counter++
          ticker.innerHTML+=tickerMarkUp
      }
      if (article.attributes.category === "health"){
        health.push(article)
        all.push(article)
      }
      if (article.attributes.category === "science") {
        science.push(article)
        all.push(article)
      }
      if (article.attributes.category === "entertainment"){
        entertainment.push(article)
        all.push(article)
      }
      if (article.attributes.category === "business") {
        business.push(article)
        all.push(article)
      }

      let articleMarkup = `
      <div id=${article.id}>
        <img src=${article.attributes.image_url}>
        <a id=${article.id} class="article-link" href=${article.attributes.url} onclick="fetchDisplay(${id})" >${article.attributes.title}</a>
      </div>`

      document.querySelector('#articles').innerHTML += articleMarkup
      stopLink();

    });
    /*divide*/
    let healthButton = document.querySelector("#myTopnav > a:nth-child(2)")
    let scienceButton = document.querySelector("#myTopnav > a:nth-child(3)")
    let entertainmentButton = document.querySelector("#myTopnav > a:nth-child(4)")
    let businessButton = document.querySelector("#myTopnav > a:nth-child(5)")
    let art = document.querySelector('#articles')
    let index = document.querySelector("#myTopnav > a:nth-child(1)")

    buttons = []
    buttons.push(healthButton, scienceButton, entertainmentButton, businessButton, index)

    buttons.forEach(function(button){

      button.addEventListener("click", e => {
        if (button === index ){
          highlightButton(button)
          art.innerHTML = ""
          all.forEach(article => {
            let id = article.id
            const articleMarkup = `
            <div id=${article.id} >
              <img src=${article.attributes.image_url}>
              <a id=${article.id} class="article-link" href=${article.attributes.url} onclick="fetchDisplay(${id})">${article.attributes.title}</a>
            </div>`
            art.innerHTML += articleMarkup
            stopLink();
          });
        }
        if (button === healthButton){
          console.log('health')
          highlightButton(button)
          art.innerHTML = ""
          health.forEach(article => {
            let id = article.id
            const articleMarkup = `
            <div id=${article.id}>
              <img src=${article.attributes.image_url}>
              <a id=${article.id} class="article-link" href=${article.attributes.url} onclick="fetchDisplay(${id})"> ${article.attributes.title} </a>
             </div> `
            art.innerHTML += articleMarkup
            stopLink();
          });
        }
        if (button === entertainmentButton){
          console.log('entertainment')
          highlightButton(button)
          art.innerHTML = ""
          entertainment.forEach(article => {
            let id = article.id
            const articleMarkup = `
            <div id=${article.id} >
              <img src=${article.attributes.image_url}>
              <a id=${article.id} class="article-link" href=${article.attributes.url} onclick="fetchDisplay(${id})">${article.attributes.title}</a>
            </div>`
            art.innerHTML += articleMarkup
            stopLink();
          });

        }
        if (button === scienceButton){
          console.log('science')
          highlightButton(button)
          art.innerHTML = ""
          science.forEach(article => {
            let id = article.id
            const articleMarkup = `
            <div id=${article.id} >
              <img class="article-img"src=${article.attributes.image_url}>
              <a id=${article.id} class="article-link" href=${article.attributes.url} onclick="fetchDisplay(${id})">${article.attributes.title}</a>
            </div>`
            art.innerHTML += articleMarkup
            stopLink();
          });
        }
        if (button === businessButton){
          console.log('business')
          highlightButton(button)
          art.innerHTML = ""
          business.forEach(article => {
            let id = article.id
            const articleMarkup = `
            <div id=${article.id}>
              <img src=${article.attributes.image_url}>
              <a id=${article.id} class="article-link" href=${article.attributes.url} onclick="fetchDisplay(${id})">${article.attributes.title}</a>
            </div>`
            art.innerHTML += articleMarkup
            stopLink();
          });
        }
      })
    });
  })

}



function stopLink(){
let anchors = document.getElementsByTagName('a')
  for (let i = 0; i < anchors.length; i++){
    anchors[i].addEventListener("click",
    function (e){
            e.preventDefault();

            });
          }
}

function toggleDisplay(articleId){
  let toggle = document.querySelector("body > div.row > div.column.middle > div.column.toggle")
  let back = document.querySelector("#myTopnav > a:nth-child(2)")
  let middleContent = document.querySelector("body > div.row > div.column.middle > div.middleContent")
  let toggledBar = document.querySelector("#toggledBar")
  let myTopnav = document.querySelector("#myTopnav")
  let artId = document.querySelector(`#art-id`)
  let favButton = document.querySelector(`#art-${articleId}`)
  let faveId = document.querySelector(`#fave-${articleId}`)
  let faveIds = document.querySelectorAll(`.fav`)
  if (toggle.style.display === "none"){
    toggle.style.display = "block";
    toggledBar.style.display ="inline-block"
    favorite(articleId);
    middleContent.style.display = "none"
    myTopnav.style.display = "none"
  }else{
    toggle.style.display = "none";
    toggledBar.style.display = "none"
    middleContent.style.display = "block"
    myTopnav.style.display = "inline-block"
  }
}



function fetchDisplay(articleId){
  let favInnerText = "favorite"
  let toggle = document.querySelector("body > div.row > div.column.middle > div.column.toggle")
  document.querySelector("body > div.row > div.column.middle").scrollTo(0,0)
  let indextog = document.querySelector("#indextog")
  let favButton = document.querySelector(`#art-${articleId}`)
  let faveId = document.querySelector(`#fave-${articleId}`)
  let faveIds = document.querySelectorAll(`.favorites`)
  let artId = document.querySelector(`#art-id`)
  let articleEndPoint = (endPoint+`/${articleId}`)

  fetch(articleEndPoint)
  .then(response => response.json())
  .then(article=>{
    const articleMarkup = `
    <h2>${article.title}</h2>
      <p id="art-id" data-id=${article.id} style="display:none">${article.id}</p>
      <span><img src=${article.image_url}><button style="float: right; align:center; margin-right: 10px;"class="favorite-button" id=art-${article.id}>favorite</button></spn>
      <h3>${article.author}, ${article.news_org}</h3>
      <p>${article.content}</p>
    </li>`


    if (!!faveId && faveIds.length == 1) {

      if (faveId.innerText === artId.dataset.id && toggle.style.display==="none"){

        toggle.innerHTML = articleMarkup;
        let favButton = document.querySelector(`#art-${articleId}`)
        indextog.innerHTML = `${article.category}`

        toggleDisplay(artId.dataset.id)
        unfavorite(articleId)

      }else if (faveId.innerText === artId.dataset.id && toggle.style.display==="block") {


        unfavorite(articleId)
      }else if (faveId.innerText != artId.dataset.id && toggle.style.display==="block"){

      toggle.innerHTML = articleMarkup;
      indextog.innerHTML = `${article.category}`
      let favButton = document.querySelector(`.favorite-button`)
      unfavorite(articleId)
  /*somethings up here when trying to remove the last fave*/
    }else if (faveId.innerText != artId.dataset.id && toggle.style.display==="none"){

      toggle.innerHTML = articleMarkup;
      let favButton = document.querySelector(`#art-${articleId}`)
      indextog.innerHTML = `${article.category}`
      unfavorite(articleId)

      toggleDisplay(artId.dataset.id)
    }
    }else if (!!faveIds && faveIds.length > 1 && toggle.style.display === "block"){

      for (let i = 0; i < faveIds.length; i++){

        if (faveIds[i].innerText === articleId.toString()){
            /*theres something weird going on in the for loop, it seems to keep going and going instead of stopping at first one*/
          toggle.innerHTML = articleMarkup;
          let favButton = document.querySelector(`#art-${articleId}`)


          unfavorite(articleId)
          break;
            /*toggle must be marked up with the fave Id*/


        }else{
          toggle.innerHTML = articleMarkup;
          /*stuck on loop here*/

          let favButton = document.querySelector(`.favorite-button`)
          if (favButton.innerText === "favorite"){
            /*let faveIds = document.querySelectorAll(`.favorites`)
            for (i =0; i < faveIds.length; i++){

              if (faveIds[i].innerText === articleId.toString()){
                debugger

                unfavorite(articleId)
                break;
              }else{*/
              favorite(articleId)


          }else{

            favButton.innerText = "favorite"
            favorite(articleId)
          }
        }
      }
    } else if (toggle.style.display === "block" && artId != articleId){

      toggle.innerHTML = articleMarkup;
      toggle.style.display = "none"
      indextog.innerHTML = `${article.category}`
      toggleDisplay(articleId);
    }else if(toggle.style.display === "block" && artId == articleId){



      unfavorite(articleId)
    }else{

      toggle.innerHTML = articleMarkup;
      indextog.innerHTML = `${article.category}`
      if(!!faveId){
            toggleDisplay(articleId)
            unfavorite(articleId)
          }else if(!faveId){
              favorite(articleId)
              toggleDisplay(articleId)

            }else{
              console.log("?")

            }
          }
      }
  )}

function signIn(){
  let b = document.querySelector("#sign-in")
  let a = document.querySelector("body > div.signInContainer")
  b.addEventListener("submit", (e) => {
    createFormHandler(e)
    a.style.display="none"
  }

  )
}

function createFormHandler(e){
  e.preventDefault()
  const nameInput = document.querySelector('#input-name').value
  const zipcodeInput = document.querySelector('#input-zipcode').value
  postUser(nameInput, zipcodeInput)
}

function postUser(nameInput, zipcodeInput){
  console.log(nameInput, zipcodeInput)

  let bodyData = {nameInput, zipcodeInput}
  fetch(userPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"},
    body: JSON.stringify({
      name: nameInput,
      zipcode: zipcodeInput
    })
  })
  .then(response => response.json())
  .then(user => {
    let weatherZone = document.querySelector("body > div.row > div.column.left > div.weatherheader")
    const userMarkup = `
      <p>${user.name} ${user.zipcode}</p>
      <p>${user.lat} ${user.lon}</p>
    `

    let lat = user.lat
    let lon = user.lon
    userId = user.id
    /* function should go here */
    let weatherPoint = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely&appid=b7bfa861214865eea90a83b5ecc80c7e`
  fetch(weatherPoint)
  .then(res => res.json())
  .then(result => {
    console.log(result)

    let currentTemp = result.current.temp+String.fromCharCode(176)
    let currentHumidity = result.current.humidity
    let currentFeelsLike = result.current.feels_like+String.fromCharCode(176)
    let currentWeather = result.current.weather[0].main
    let currentIcon = result.current.weather[0].icon
      if (!result.alerts === null){
        let alertName = result.alerts[0].event
        let alertDesc = result.alerts[0].description
      }
    let weatherIconUrl = `http://openweathermap.org/img/wn/${currentIcon}@2x.png`

    let weatherIcon = document.querySelector("#weather-icon")
      weatherIcon.src = weatherIconUrl
    let cw = document.querySelector("#current-weather")
      cw.innerHTML += currentWeather
    let ct = document.querySelector("#current-temperature")
      cw.innerHTML += (" " + currentTemp)


    let day2Temp = (result.daily[1].temp["max"].toString()+String.fromCharCode(176) +("/")+ result.daily[1].temp["min"].toString()+String.fromCharCode(176))
    let day3Temp = (result.daily[2].temp["max"].toString()+String.fromCharCode(176) +("/")+ result.daily[2].temp["min"].toString()+String.fromCharCode(176))
    let day4Temp = (result.daily[3].temp["max"].toString()+String.fromCharCode(176) +("/")+ result.daily[3].temp["min"].toString()+String.fromCharCode(176))
    let day5Temp = (result.daily[4].temp["max"].toString()+String.fromCharCode(176) +("/")+ result.daily[4].temp["min"].toString()+String.fromCharCode(176))
    let day6Temp = (result.daily[5].temp["max"].toString()+String.fromCharCode(176) +("/")+ result.daily[5].temp["min"].toString()+String.fromCharCode(176))
    let day7Temp = (result.daily[6].temp["max"].toString()+String.fromCharCode(176) +("/")+ result.daily[6].temp["min"].toString()+String.fromCharCode(176))

    let day2Icon = result.daily[1].weather[0].icon
    let day2Desc = result.daily[1].weather[0].main
    let day2Fc = document.querySelector("#day-2-fc")
    let day2Img = document.querySelector("#day2Img")
    day2Fc.innerHTML += day2Desc
    day2Img.src = `http://openweathermap.org/img/wn/${day2Icon}@2x.png`

    let day3Icon = result.daily[2].weather[0].icon
    let day3Desc = result.daily[2].weather[0].main
    let day3Fc = document.querySelector("#day-3-fc")
    let day3Img = document.querySelector("#day3Img")
    day3Fc.innerHTML += day3Desc
    day3Img.src = `http://openweathermap.org/img/wn/${day3Icon}@2x.png`

    let day4Icon = result.daily[3].weather[0].icon
    let day4Desc = result.daily[3].weather[0].main
    let day4Fc = document.querySelector("#day-4-fc")
    let day4Img = document.querySelector("#day4Img")
    day4Fc.innerHTML += day4Desc
    day4Img.src = `http://openweathermap.org/img/wn/${day4Icon}@2x.png`

    let day5Icon = result.daily[4].weather[0].icon
    let day5Desc = result.daily[4].weather[0].main
    let day5Fc = document.querySelector("#day-5-fc")
    let day5Img = document.querySelector("#day5Img")
    day5Fc.innerHTML += day5Desc
    day5Img.src = `http://openweathermap.org/img/wn/${day5Icon}@2x.png`

    let day6Icon = result.daily[5].weather[0].icon
    let day6Desc = result.daily[5].weather[0].main
    let day6Fc = document.querySelector("#day-6-fc")
    let day6Img = document.querySelector("#day6Img")
    day6Fc.innerHTML += day6Desc
    day6Img.src = `http://openweathermap.org/img/wn/${day6Icon}@2x.png`

    let day7Icon = result.daily[6].weather[0].icon
    let day7Desc = result.daily[6].weather[0].main
    let day7Fc = document.querySelector("#day-7-fc")
    let day7Img = document.querySelector("#day7Img")
    day7Fc.innerHTML += day7Desc
    day7Img.src = `http://openweathermap.org/img/wn/${day7Icon}@2x.png`

    let d2 = document.querySelector("#day-2-t")
      d2.innerHTML = day2Temp
    let d3 = document.querySelector("#day-3-t")
      d3.innerHTML= day3Temp
    let d4 = document.querySelector("#day-4-t")
      d4.innerHTML= day4Temp
    let d5 = document.querySelector("#day-5-t")
      d5.innerHTML= day5Temp
    let d6 = document.querySelector("#day-6-t")
      d6.innerHTML= day6Temp
    let d7 = document.querySelector("#day-7-t")
      d7.innerHTML= day7Temp
  })

  })
}

function addDays(){
  let dayOne = document.querySelector("#current-day")
  let dayTwo = document.querySelector("#day-2")
  let dayThree = document.querySelector("#day-3")
  let dayFour = document.querySelector("#day-4")
  let dayFive = document.querySelector("#day-5")
  let daySix = document.querySelector("#day-6")
  let daySeven = document.querySelector("#day-7")

  dayOne.innerHTML = Date.today().toDateString().split(" ")[0]
  dayTwo.innerHTML = Date.parse("+").toDateString().split(" ")[0]
  dayThree.innerHTML = Date.parse("+2").toDateString().split(" ")[0]
  dayFour.innerHTML =  Date.parse("+3").toDateString().split(" ")[0]
  dayFive.innerHTML =  Date.parse("+4").toDateString().split(" ")[0]
  daySix.innerHTML = Date.parse("+5").toDateString().split(" ")[0]
  daySeven.innerHTML = Date.parse("+6").toDateString().split(" ")[0]

}

function favorite(articleId){
  let favoriteButton = document.querySelector(`#art-${articleId}`)
  favoriteButton.addEventListener("click", favoriteMark, true)
}
function favoriteMark(e){
  e.preventDefault
  let favoriteButton = document.querySelector(".favorite-button")
  if (!!favoriteButton){

    if (favoriteButton.innerText === "unfavorite"){

      favoriteButton.removeEventListener("click", favoriteMark)
      favoriteButton.addEventListener("click", clearFave)
    }
  }if (numberFaves < 3 ){
  let articleId = parseInt(document.querySelector("#art-id").dataset.id)
  console.log(articleId)
  console.log(userId)
  console.log(numberFaves)
  fetch(favePoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"},
    body: JSON.stringify({
      user_id: userId,
      article_id: articleId
    })
  })
  .then(response => response.json())
  .then(fave => {
    console.log(fave)

    let faveOne = document.querySelector("body > div.row > div.column.right > div:nth-child(2)")


    let faveTwo = document.querySelector("body > div.row > div.column.right > div:nth-child(3)")


    let faveThree = document.querySelector("body > div.row > div.column.right > div:nth-child(4)")

    let faveMarkUp = `
    <h4 style="white-space: normal">${fave.data.attributes.article.title}</h4>
    <p id=fave-${fave.data.attributes.article.id} class=favorites data=${fave.data.attributes.article.id} stye="display:none">${fave.data.attributes.article.id}</p>
    <a class="fetch" onclick="toggleRedirect(${fave.data.attributes.article.id})"><img style="white-space: normal"  style="border-color: pink" class=faveimg src="${fave.data.attributes.article.image_url}"></img></a>
    `
    if (faveOne.innerText === ""){
      faveOne.innerHTML = faveMarkUp;
        numberFaves += 1;
      unfavorite(articleId)
    }else if (faveTwo.innerText === ""){
      if(faveOne.childNodes[3].innerText){
        if(articleId != faveOne.childNodes[3].innerText){
          faveTwo.innerHTML = faveMarkUp
            numberFaves += 1;
          unfavorite(articleId)

        }
      }
    } else if(faveThree.innerText === ""){
      if(faveTwo.childNodes[3].innerText){
        if(articleId != faveOne.childNodes[3].innerText && articleId != faveTwo.childNodes[3].innerText){
          faveThree.innerHTML = faveMarkUp
            numberFaves += 1;

          unfavorite(articleId)

        }
      }
    }
  })
  }else{
  console.log("too many likes!")
  alert("You may only have Three favorited articles, please unfavorite one to proceed")
}
}

function unfavorite(articleId){

  let favoriteButton = document.querySelector(`.favorite-button`)
  favoriteButton.innerText = "unfavorite"
  favoriteButton.removeEventListener("click", favoriteMark, true)
  favoriteButton.addEventListener("click", clearFave, true)

}

function clearFave(e){
  e.preventDefault
  let artId = document.querySelector(`#art-id`).dataset.id

  let faveParent = document.querySelector(`#fave-${artId}`).parentElement
  let favoriteButton = document.querySelector(`#art-${artId}`)
  let faveId = document.querySelector(`#fave-${artId}`).innerText
  if (artId === faveId){
    faveParent.innerHTML = " "
    document.querySelector(`#art-${artId}`).innerText = "favorite"
    favoriteButton.removeEventListener("click", clearFave, true)
    numberFaves -= 1;
    favoriteListener()

  }
}

function favoriteListener(){

  let favoriteButton = document.querySelector(".favorite-button")
  if (!!favoriteButton && numberFaves < 3){

    if(favoriteButton.innerText === "favorite"){
      favoriteButton.addEventListener("click", favoriteMark, true)
    }
  }else if(!!favoriteButton && numberFaves === 3){
    favoriteButton.removeEventListener("click", favoriteMark)
    favoriteButton.addEventListener("click", e =>{
      alert("Please unfavorite an existing article in order to Pin")
    })
  }
}

function toggleRedirect(articleId){
  let toggle = document.querySelector("body > div.row > div.column.middle > div.column.toggle")

  let faveId = document.querySelector(`#fave-${articleId}`)
  let faveIds = document.querySelectorAll(`.favorites`)
  let artId = document.querySelector(`#art-id`)

  fetchDisplay(articleId)
}

function highlightButton(button){
  console.log("im selected")
    /*button.classList.add('selected')*/
    buttons = document.querySelectorAll(".button")
    for (i =0; i<buttons.length; i++){
      if (buttons[i].id === "selected"){
        console.log("buttons[i] id removed")
        buttons[i].removeAttribute('id')
      }
    }
    button.id = "selected"
    console.log("added the selected id")

}
