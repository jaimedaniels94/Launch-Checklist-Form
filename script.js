// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/

async function fetchMission() {
  try {
    let response = await fetch(
      "https://handlers.education.launchcode.org/static/planets.json"
    );
    let json = await response.json();
    let missionTarget = document.querySelector("#missionTarget");
    let i = Math.floor(Math.random() * json.length);
    missionTarget.innerHTML = `
    <h2>Mission Destination</h2>
<ol>
   <li>Name: ${json[i].name}</li>
   <li>Diameter: ${json[i].diameter}</li>
   <li>Star: ${json[i].star}</li>
   <li>Distance from Earth: ${json[i].distance}</li>
   <li>Number of Moons: ${json[i].moons}</li>
</ol>
<img src="${json[i].image}">
    `;
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener("load", main);

function main() {
  fetchMission();
  let form = document.querySelector("#launchForm");
  let pilotNameEl = document.querySelector("#pilotStatus");
  let copilotNameEl = document.querySelector("#copilotStatus");
  let fuelLevelEl = document.querySelector("#fuelStatus");
  let cargoMassEl = document.querySelector("#cargoStatus");
  let faultyItems = document.querySelector("#faultyItems");
  let launchStatus = document.querySelector("#launchStatus");

  form.addEventListener("submit", function (event) {
    let pilotNameInput = document.querySelector("input[name=pilotName]");
    let copilotNameInput = document.querySelector("input[name=copilotName]");
    let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
    let cargoMassInput = document.querySelector("input[name=cargoMass]");
    fuelLevelInput = Number(fuelLevelInput.value);
    cargoMassInput = Number(cargoMassInput.value);
    let letters = /^[A-Za-z]+$/;

    pilotNameEl.innerText = `Pilot ${pilotNameInput.value} is ready`;
    copilotNameEl.innerText = `Co-pilot ${copilotNameInput.value} is ready`;

    if (
      pilotNameInput.value === "" ||
      copilotNameInput.value === "" ||
      fuelLevelInput.value === "" ||
      cargoMassInput.value === ""
    ) {
      alert("All fields required.");
      launchStatus.innerText = `Awaiting Information Before Launch`;
      faultyItems.style.visibility = "hidden";
      event.preventDefault();
    } else if (
      !pilotNameInput.value.match(letters) ||
      !copilotNameInput.value.match(letters)
    ) {
      alert("Please enter a valid string");
      launchStatus.innerText = `Awaiting Information Before Launch`;
      faultyItems.style.visibility = "hidden";
      event.preventDefault();
    } else if (fuelLevelInput < 10000) {
      faultyItems.style.visibility = "visible";
      fuelLevelEl.innerText = `Not enough fuel for the journey`;
      launchStatus.innerText = `Shuttle not ready for launch`;
      launchStatus.style = "color: red;";
      event.preventDefault();
    } else if (cargoMassInput > 10000) {
      faultyItems.style.visibility = "visible";
      cargoMassEl.innerText = `Too much mass for takeoff`;
      launchStatus.innerText = `Shuttle not ready for launch`;
      launchStatus.style.color = "red";
      event.preventDefault();
    } else {
      launchStatus.style.color = "green";
      launchStatus.innerText = `Shuttle is ready for launch`;
      event.preventDefault();
    }
  });
}
