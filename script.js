const imgs = document.querySelectorAll(".img");
const container = document.querySelector(".container");
const mode = document.querySelector(".mode");
const filterHeader = document.querySelector(".filter-header");
const filter = document.querySelector(".filter");
const countries = document.querySelector(".countries");
import data from "./data.json" assert { type: "json" };
const regions = document.querySelectorAll(".region");
const search = document.querySelector("input");

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
    countries.innerHTML += `<div class="country">
            <img src='${item.flags.png}' alt="flag" />
            <div class="country-properties">
              <p><b>${item.name}</b></p>
              <span
                ><span class="properties-teg">Population</span>:
                ${item.population}</span
              >
              <span><span class="properties-teg">Region</span>: ${item.region}</span>
              <span><span class="properties-teg">Capital</span>: ${item.capital}</span>
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

function changeData(region) {
  const newData = region
    ? data.filter(
        (item) => item.region === (region === "America" ? "Americas" : region)
      )
    : data;
  exportData(newData);
}

changeData();

for (let i = 0; i < regions.length; i++) {
  regions[i].addEventListener("click", function () {
    changeData(regions[i].textContent);
  });
}
