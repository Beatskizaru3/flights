import { MOCK_CITY_LIST, MOCK_FLIGHTS } from "../store/mock.js";

let requestData;

const formEl = document.getElementById("searchForm");

let searchResult; // для резульатата по поиску -Б 193строка

let departureCityRequest;
let arriveCityRequest;

const resultOnLoad = document.querySelector(".results");
if (window.innerWidth < 992) {
  if (resultOnLoad.classList.contains("col-9")) {
    resultOnLoad.classList.remove("col-9");
  }
}

function findMatches(requestData) {
  const way = requestData.get("ways");
  departureCityRequest = requestData.get("CityFrom");
  arriveCityRequest = requestData.get("CityTo");
  const startDate = requestData.get("startDate").toString();

  let endDate = requestData.get("backDate");
  if (endDate !== null) {
    endDate = endDate.toString();
  }

  const flightClass = parseInt(requestData.get("selectClass"));

  let resultArr = [];

  resultArr = MOCK_FLIGHTS.filter((race) => {
    if (
      race.departureCity === departureCityRequest &&
      race.arrivalCity === arriveCityRequest &&
      race.departureDate === startDate &&
      race.classValue === flightClass
    ) {
      console.log(resultArr);
      return true;
    }
  });
  console.log(resultArr);
  if (way === "roundTrip") {
    resultArr = MOCK_FLIGHTS.filter((race) => {
      if (race.departureCity === arriveCity && race.departureDate === endDate) {
        console.log(resultArr);
        return true;
      } else {
        false;
      }
    });
  }
  console.log(resultArr);
  return resultArr;
}

function renderResult(racesArr) {
  const results = document.querySelector(".results");
  while (results.firstChild) {
    results.removeChild(results.firstChild);
  }

  const resultsTitle = document.createElement("h3");
  resultsTitle.classList.add("fw-bold", "mx-auto", "my-5", "text-center");

  const cityNow = document.createElement("span");
  const cityArrive = document.createElement("span");

  cityNow.textContent = departureCityRequest;
  cityArrive.textContent = arriveCityRequest;
  cityNow.classList.add("cityNow");
  cityArrive.classList.add("cityArrive");
  resultsTitle.append(cityNow);
  resultsTitle.append(document.createTextNode(" to "));
  resultsTitle.append(cityArrive);

  results.append(resultsTitle);

  const rowsNames = document.createElement("div");
  rowsNames.classList.add(
    "rows-names",
    "row",
    "p-3",
    "border",
    "border-start-0",
    "border-end-0",
    "border-dark"
  );
  const airLinesRow = document.createElement("span");
  const departureRow = document.createElement("span");
  const durationRow = document.createElement("span");
  const arrivalRow = document.createElement("span");
  const priceRow = document.createElement("span");

  airLinesRow.textContent = "Airlines";
  departureRow.textContent = "Departure";
  durationRow.textContent = "Duration";
  arrivalRow.textContent = "Arrival";
  priceRow.textContent = "Price";

  airLinesRow.classList.add(
    "small-hidden",
    "fw-bold",
    "row-name",
    "col",
    "text-center"
  );
  departureRow.classList.add("fw-bold", "row-name", "col", "text-center");
  durationRow.classList.add("fw-bold", "row-name", "col", "text-center");
  arrivalRow.classList.add("fw-bold", "row-name", "col", "text-center");
  priceRow.classList.add("fw-bold", "row-name", "col", "text-center");

  rowsNames.append(
    airLinesRow,
    departureRow,
    durationRow,
    arrivalRow,
    priceRow
  );

  if (window.innerWidth < 992) {
    rowsNames.classList.remove("row-cols-5");
    rowsNames.classList.remove("row-cols-4");
    rowsNames.classList.add("row-cols-6");
    if (window.innerWidth < 768) {
      rowsNames.classList.remove("row-cols-6");
      rowsNames.classList.add("row-cols-5");
    }
    if (window.innerWidth < 425) {
      rowsNames.classList.remove("row-cols-6");
      rowsNames.classList.remove("row-cols-5");
      rowsNames.classList.add("row-cols-4");
    }
  } else {
    rowsNames.classList.remove("row-cols-5");
    rowsNames.classList.remove("row-cols-4");
    rowsNames.classList.add("row-cols-6");
  }

  results.append(rowsNames);

  const flightsList = document.createElement("div");
  flightsList.classList.add("flight-cards");

  racesArr.forEach((element) => {
    const card = document.createElement("div");
    card.classList.add(
      "flight-card",
      "row",
      "row-cols-6",
      "p-3",
      "border-bottom"
    );

    if (window.innerWidth < 992) {
      if (card.classList.contains("row-cols-5")) {
        card.classList.remove("row-cols-5");
      }
      if (!card.classList.contains("row-cols-6")) {
        card.classList.add("row-cols-6");
      }
      if (window.innerWidth < 768) {
        if (card.classList.contains("row-cols-6")) {
          card.classList.remove("row-cols-6");
        }
        if (!card.classList.contains("row-cols-5")) {
          card.classList.add("row-cols-5");
        }
        if (window.innerWidth < 425) {
          if (card.classList.contains("row-cols-6")) {
            card.classList.remove("row-cols-6");
          }
          if (card.classList.contains("row-cols-5")) {
            card.classList.remove("row-cols-5");
          }
          if (!card.classList.contains("row-cols-4")) {
            card.classList.add("row-cols-4");
          }
        }
      }
    }

    const airlines = document.createElement("div");
    airlines.classList.add(
      "flight-card-airline",
      "d-flex",
      "flex-column",
      "text-center",
      "justify-content-center",
      "small-hidden"
    );
    const airlineName = document.createElement("span");
    const airlineNumber = document.createElement("span");
    airlineName.classList.add("flight-card-airline-name");
    airlineName.textContent = element.airline;
    airlineNumber.classList.add("flight-card-airline-number", "text-secondary");
    airlineNumber.textContent = element.flightNumber;
    airlines.append(airlineName, airlineNumber);

    const departure = document.createElement("div");
    departure.classList.add(
      "flight-card-departure",
      "d-flex",
      "flex-column",
      "text-center",
      "justify-content-center"
    );
    const departureTime = document.createElement("span");
    departureTime.classList.add("flight-card-departure-time");
    departureTime.textContent = element.departureTime;
    const departureCity = document.createElement("span");
    departureCity.classList.add("flight-card-departure-city", "text-secondary");
    departureCity.textContent = element.departureCity;
    departure.append(departureTime, departureCity);

    const flightDuration = document.createElement("div");
    flightDuration.classList.add(
      "flight-card-duration",
      "d-flex",
      "flex-column",
      "text-center",
      "justify-content-center"
    );
    const flightDurationTime = document.createElement("span");
    flightDurationTime.classList.add("flight-card-duration-time");
    flightDurationTime.textContent = element.duration;
    const flightDurationStops = document.createElement("span");
    flightDurationStops.classList.add(
      "flight-card-duration-stops",
      "text-secondary"
    );
    flightDurationStops.textContent = element.stopsDisplay;
    flightDuration.append(flightDurationTime, flightDurationStops);

    const arrival = document.createElement("div");
    arrival.classList.add(
      "flight-card-arrival",
      "d-flex",
      "flex-column",
      "text-center",
      "justify-content-center"
    );
    const arrivalTime = document.createElement("span");
    arrivalTime.classList.add("flight-card-arrival-time");
    arrivalTime.textContent = element.arrivalTime;
    const arrivalCity = document.createElement("span");
    arrivalCity.classList.add("flight-card-arrival-city", "text-secondary");
    arrivalCity.textContent = element.arrivalCity;
    arrival.append(arrivalTime, arrivalCity);

    const flightPrice = document.createElement("div");
    flightPrice.classList.add(
      "flight-card-price",
      "justify-content-center",
      "d-flex",
      "align-items-center"
    );
    flightPrice.textContent = "$";
    const priceAmount = document.createElement("span");
    priceAmount.classList.add("flight-card-price-amount");
    priceAmount.textContent = element.price;
    flightPrice.append(priceAmount);

    const flightOrder = document.createElement("div");
    flightOrder.classList.add(
      "flight-card-button",
      "justify-content-center",
      "flex-column",
      "gap-1",
      "d-grid",
      "align-items-center"
    );
    const flightButton = document.createElement("button");
    flightButton.classList.add("flight-card-button-btn", "btn", "btn-primary");
    flightButton.textContent = "Book";

    const flightLink = document.createElement("a");
    flightLink.classList.add(
      "flight-card-button-details",
      "text-primary",
      "fs-6"
    );
    flightLink.href = "#";
    flightLink.textContent = "Flight details";
    flightOrder.append(flightButton, flightLink);

    card.append(
      airlines,
      departure,
      flightDuration,
      arrival,
      flightPrice,
      flightOrder
    );
    1;
    flightsList.append(card);
  });

  results.append(flightsList);
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(formEl);
  requestData = formData;
  console.log(requestData);
  searchResult = findMatches(requestData); // сохраняем результатм запроса в пременуую
  renderResult(searchResult);
});

function fillCities() {
  const dataFromList = document.getElementById("fromList");
  const dataToList = document.getElementById("toList");

  MOCK_CITY_LIST.forEach((element) => {
    const city = document.createElement("option");
    city.value = element;

    dataFromList.append(city.cloneNode());

    dataToList.append(city);
  });
}

function formingRequest() {
  const waysRadio = document.querySelectorAll('input[name="ways"]');

  const backDate = document.querySelector('label[for="endDate"]');
  const departDay = document.querySelector('label[for="startDate"]');

  const flightSearch = document.querySelector(".flight-search");

  waysRadio.forEach((el) => {
    el.addEventListener("change", (e) => {
      let selected = e.target.value;
      if (selected === "oneWay") {
        backDate.remove();
      } else {
        if (!flightSearch.contains(backDate)) {
          departDay.after(backDate);
        }
      }
    });
  });
}

let filteringResult;

function applyFilter(searchResult, filterObject) {
  let filtered = searchResult;

  if (filterObject.stops.length > 0) {
    const requiredStops = filterObject.stops.map(Number); // переводим в числа массив из поля запроса
    filtered = filtered.filter((flight) =>
      requiredStops.includes(flight.stops)
    );
  }

  if (filterObject.airlines.length > 0) {
    filtered = filtered.filter((flight) =>
      filterObject.airlines.includes(flight.airline)
    );
  }

  const minPrice = parseInt(filterObject.minPrice || 0);
  const maxPrice = parseInt(filterObject.maxPrice || 9999);

  filtered = filtered.filter(
    (flight) => flight.price >= minPrice && flight.price <= maxPrice
  );

  return filtered;
}

function updateRender(currentFilterObj) {
  // вызываем при каждом изменеии фильтра
  const finalResults = applyFilter(searchResult, currentFilterObj);
  renderResult(finalResults);
}

function useFilters() {
  const stopsChecks = document.querySelectorAll('input[name="stops"]');
  const airlinesCheck = document.querySelectorAll('input[name="Airlines');
  const priceCheck = document.querySelectorAll('input[name="price"]');

  let filterObj = {
    stops: [],
    airlines: [],
    minPrice: "0",
    maxPrice: "9999",
  };

  filteringResult = searchResult;

  stopsChecks.forEach((el) => {
    const checkName = el.id;
    el.addEventListener("change", (e) => {
      let selected = e.target.value;
      let getStopsValues = filterObj.stops;
      if (el.checked) {
        getStopsValues.push(selected);
        filterObj.stops = getStopsValues;
      } else {
        if (filterObj.stops.includes(selected)) {
          getStopsValues = getStopsValues.filter((el) => el !== selected);
          filterObj.stops = getStopsValues;
        }
      }
      updateRender(filterObj); // перерендериваем при изменении фильтров
      console.log(filterObj);
    });
  });

  priceCheck.forEach((el) => {
    el.addEventListener("change", (e) => {
      setTimeout(() => {
        let currentValue = e.target.value;
        if (e.target.id === "minPrice") {
          filterObj.minPrice = e.target.value;
        } else if (e.target.id === "maxPrice") {
          filterObj.maxPrice = e.target.value;
        }
        updateRender(filterObj); // перерендериваем при изменении фильтров
        console.log(filterObj);
      }, 3000);
    });
  });

  airlinesCheck.forEach((el) => {
    el.addEventListener("change", (e) => {
      let selected = e.target.value;
      let getAirlinesValues = filterObj.airlines;
      if (el.checked) {
        getAirlinesValues.push(selected);
        filterObj.airlines = getAirlinesValues;
      } else {
        if (filterObj.airlines.includes(selected)) {
          getAirlinesValues = getAirlinesValues.filter((el) => el !== selected);
          filterObj.airlines = getAirlinesValues;
        }
      }
      updateRender(filterObj); // перерендериваем при изменении фильтров
      console.log(filterObj);
      return filterObj;
    });
  });
}

fillCities();
formingRequest();
useFilters();
