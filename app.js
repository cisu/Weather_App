window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescrition = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection  = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/fb0d3d585120b2e835cf7b35b59fd732/${lat},${long}`;
            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data);
                const { temperature, summary, icon } = data.currently;
                //Set DOM Elements from the API
                temperatureDegree.textContent = temperature;
                temperatureDescrition.textContent = summary;
                locationTimezone.textContent = data.timezone;
                    //Forumula for Celsius
                    let celsius = (temperature - 32) * (5 / 9);

                    //Set Icon
                    setIcons(icon, document.querySelector(".icon"));

                    //Change temperature to Celsius/Farenheit
                    temperatureSection.addEventListener('click', () => {
                        if(temperatureSpan.textContent === "F"){
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        }else{
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    })
            });
        });
    } //else{h1.textContent = "hi this is not working malaka"}

   function setIcons(icon, iconID){
       const skycons = new Skycons({ color: "white" });
       const currentIcon = icon.replace('-', '_').toUpperCase();
       skycons.add("sky-icon", Skycons[currentIcon]);
       skycons.play();
   }
});