import {newElement, clearNode, toggleTemp, changeBackground} from "./DOM";
import getData from "./weatherapi";
//select submit button and information div
let submit = document.getElementById("submit");
let info = document.getElementById("information");
//Get Data for the requisted city
function handleSubmit(e) {
    e.preventDefault();
    //Clear previous data on the screen
    clearNode(info);
    //Get city name from the search box and then get the data for that city
    let city = document.getElementById("searchBox").value;
    getData(city).then(data => {
        //If the response is not valid, display the error message
        if (typeof data === "string") {
            newElement("div","error", info, data);
            return;
        }
        //Display the data on the screen
        newElement("div","name", info, data.name);
        newElement("div","country", info, data.country);
        newElement("div","localTime", info, data.localtime);
        newElement("div","condition", info, data.text);
        newElement("div","lastUpdated", info, data.last_updated);
        let tempeture = newElement("div","tempeture", info, data.temp_c + " °C");
        let currentTemp = data.temp_c
        let otherTemp = data.temp_f
        tempeture.addEventListener("click", () => {
            [currentTemp, otherTemp] = toggleTemp(currentTemp, otherTemp);
        });
        changeBackground(data.temp_c);
    });
}
submit.addEventListener("click", handleSubmit);
