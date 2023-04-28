//Object to store the data necessary for the app
let finalObj = {};
//iterate over the nested data fetched from the api and retrieve only the data we need
function trimData(obj) {
    //array of the data necessary for the app
    let dataArr = ["temp_c", "temp_f", "text", "icon", "is_day", "last_updated", "name", "localtime", "country"];
    for (const [k,v] of Object.entries(obj)) {
        if (typeof v === "object") {
            trimData(v);
        } else {
            if (dataArr.includes(k)){
                finalObj[k] = v;
            }
        }
    }
    return finalObj;
}

//Get weather data for the given location
export default async function getData(location) {
    try {
        let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=a986c6321f714aa5ba752739232704&q=${location}`);
        let data = await response.json();
        //reduce data to only the data we need
        finalObj = trimData(data);
        return finalObj;
    } catch (error) {
        console.log("error", error);
    }
}
