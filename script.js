const imgs = document.querySelectorAll(".img");
const container = document.querySelector(".container");
const mode = document.querySelector(".mode");
const filterHeader = document.querySelector(".filter-header");
const filter = document.querySelector(".filter");
const countries = document.querySelector(".countries");
const country = document.querySelectorAll(".country");
import data from "./data.json" assert { type: "json" };
const regions = document.querySelectorAll(".region");
const search = document.querySelector("input");
const header = document.querySelector(".header");
const main = document.querySelector(".main");
const detail = document.querySelector(".detail");
const countryDetail = document.querySelector(".country-detail");
const back = document.querySelector("button");

mode.addEventListener("click", function () {
  container.classList.toggle("light");
  for (let i = 0; i < imgs.length; i++) {
    imgs[i].classList.toggle("hidden");
  }
});

filterHeader.addEventListener("click", function () {
  filter.classList.toggle("open");
});

function exportData(newData) {
  filter.classList.remove("open");
  countries.innerHTML = "";
  newData.forEach((item) => {
    countries.innerHTML += `<div class="country" id='${item.alpha3Code}'>
            <img src='${item.flags.png}' alt="flag" />
            <div class="country-properties">
              <p><b>${item.name}</b></p>
              <span
                ><span class="properties-teg">Population</span>:
                ${item.population}</span
              >
              <span><span class="properties-teg">Region:</span> ${item.region}</span>
              <span><span class="properties-teg">Capital:</span> ${item.capital}</span>
            </div>
          </div>`;
  });
}

search.addEventListener("input", function () {
  const newData = data.filter((item) =>
    item.name.toLowerCase().includes(search.value.toLowerCase())
  );
  exportData(newData);
});

function returnRegions(i) {
  for (let j = 0; j < regions.length; j++) {
    if (i != j) {
      regions[j].textContent = regions[j].id;
    }
  }
}

function changeData(region) {
  const newData = region
    ? region === "All"
      ? data
      : data.filter(
          (item) => item.region === (region === "America" ? "Americas" : region)
        )
    : data;
  exportData(newData);
}

changeData();

for (let i = 0; i < regions.length; i++) {
  regions[i].addEventListener("click", function () {
    changeData(regions[i].textContent);
    header.textContent = regions[i].textContent;
    if (regions[i].textContent === "All") {
      returnRegions();
    } else {
      regions[i].textContent = "All";
      returnRegions(i);
    }
  });
}

countries.addEventListener("click", function (event) {
  const clickedCountry = event.target.closest(".country");
  if (clickedCountry) {
    const countryName = clickedCountry.id;
    main.classList.add("hidden");
    detail.classList.remove("hidden");
    const item = data.find((item) => item.alpha3Code === countryName);
    const borders = item.borders.map((border) =>
      data.find((item) => item.alpha3Code === border)
    );
    countryDetail.innerHTML = ``;
    countryDetail.innerHTML = `<img src='${item.flag}' alt="flag" />
        <div class="details-name">
          <h2>${item.name}</h2>
          <div class="parts-details">
            <div class="details">
              <span
                ><span class="properties-teg">Native Name:</span> ${
                  item.nativeName
                }</span
              >
              <span
                ><span class="properties-teg">Population:</span>
                ${item.population}</span
              >
              <span><span class="properties-teg">Region:</span> ${
                item.region
              }</span>
              <span
                ><span class="properties-teg">Sub Region:</span> ${
                  item.subregion
                }</span
              >
              <span
                ><span class="properties-teg">Capital:</span> ${
                  item.capital
                }</span
              >
            </div>
            <div class="details">
              <span
                ><span class="properties-teg">Top Level Domain:</span>
                ${item.topLevelDomain}</span
              >
              <span
                ><span class="properties-teg">Currencies:</span> ${item.currencies.map(
                  (item) => item.name
                )}</span
              >
              <span
                ><span class="properties-teg">Languages:</span> ${item.languages.map(
                  (item) => item.name
                )}}</span
              >
            </div>
          </div>
          <div class="others">
            <span class="properties-teg">Border Countries:</span>
            ${borders
              .map(
                (item) =>
                  `<div  class="other-country"><span>${item.name}</span></div>`
              )
              .join("")}
          </div>
        </div>`;
  }
});

back.addEventListener("click", function () {
  main.classList.remove("hidden");
  detail.classList.add("hidden");
});

