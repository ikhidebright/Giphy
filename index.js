let search = document.querySelector("#search");
let results = document.querySelector(".results");
let searchBtn = document.querySelector("i");
let loadingIcon = document.querySelector(".loading");
let apiData = []; // array of objects
let loaded = false;

//make api call
const api = () => {
        const api = `https://api.giphy.com/v1/gifs/search?api_key=kI0qfO7V3q5LdnehlDUCvcnp8Xxzv9vv&q=${search.value}&limit=2&offset=0&rating=G&lang=en`
        fetch(api).then((res) => res.json())
        .then((data) => {
                apiData.push(data.data);
                updateUI();
        })
        .catch((err) => {
            alert(err.message)    
        })
}


const load = () => {
        api();
        loadingIcon.style.display = 'block';
        setInterval(() => {
        if(loaded === true){
        loadingIcon.style.display = 'none'; 
        results.style.display = 'flex'; 
        }
        }, 100)
}

const updateUI = () => {
        loaded = true;
        apiData[0].forEach((obj) => {
                let embedGif = [];
                for (var key in obj) {
                        if(key === "url"){
                        embedGif.push(obj[key])
                        }
                }

                embedGif.forEach((item) => {
                        let img = document.createElement("img");
                        img.setAttribute("src", item);
                        img.setAttribute("width", "90vmin");
                        img.setAttribute("height", "90vmin");
                        results.appendChild(img);
                })
                
        })
       
}

searchBtn.addEventListener("click", load)