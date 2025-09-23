const cars = [
  {
    id: 1,
    make: "Honda",
    image: "car_images/honda-accord-2005.jpg",
    model: "Accord",
    year: 2005,
    price: 7000,
  },
  {
    id: 2,
    make: "Honda",
    image: "car_images/honda-accord-2008.jpg",
    model: "Accord",
    year: 2008,
    price: 11000,
  },
  {
    id: 3,
    make: "Toyota",
    image: "car_images/toyota-camry-2009.jpg",
    model: "Camry",
    year: 2009,
    price: 12500,
  },
  {
    id: 4,
    make: "Toyota",
    image: "car_images/toyota-corrolla-2016.jpg",
    model: "Corolla",
    year: 2016,
    price: 15000,
  },
  {
    id: 5,
    make: "Suzuki",
    image: "car_images/suzuki-swift-2014.jpg",
    model: "Swift",
    year: 2014,
    price: 9000,
  },
  {
    id: 6,
    make: "Audi",
    image: "car_images/audi-a4-2013.jpg",
    model: "A4",
    year: 2013,
    price: 25000,
  },
  {
    id: 7,
    make: "Audi",
    image: "car_images/audi-a4-2013.jpg",
    model: "A4",
    year: 2013,
    price: 26000,
  },
];

class CarApp {
  constructor() {
    this.cars = cars;
    this.classOfCars = document.querySelectorAll(".car");
    this.selectMake = document.querySelector("#make");
    this.selectModel = document.querySelector("#model");
    this.selectPrice = document.querySelector("#price");
    this.selectYear = document.querySelector("#year");
    this.filterBtn = document.querySelector("#submit");

    this.init();
  }

  populateDropdownOptions(property, selectElement) {
    const uniqueValues = new Set();
    this.cars.forEach((car) => {
      uniqueValues.add(car[property]);
    });

    this._addOptions(selectElement, uniqueValues);
  }

  //helper to add elements to DOM
  _addOptions(selectElement, options) {
    options.forEach((optionValue) => {
      const newOption = document.createElement("option");
      newOption.value = optionValue;
      newOption.textContent = optionValue;
      selectElement.appendChild(newOption);
    });
  }

  handleFilterOptions(event) {
    event.preventDefault();

    let makeSelection = this.selectMake.value;
    let modelSelection = this.selectModel.value;
    let priceSelection = this.selectPrice.value;
    let yearSelection = this.selectYear.value;

    const idsOfCarsSelected = [];
    this.cars.forEach((car) => {
      if (
        (makeSelection === "all" || makeSelection === car.make) &&
        (modelSelection === "all" || modelSelection === car.model) &&
        (priceSelection === "any" || +priceSelection === car.price) &&
        (yearSelection === "any" || +yearSelection === car.year)
      ) {
        idsOfCarsSelected.push(car.id);
      }
    });

    this.classOfCars.forEach((carElement) => {
      if (idsOfCarsSelected.includes(Number(carElement.dataset.id))) {
        carElement.classList.remove("hidden");
      } else {
        carElement.classList.add("hidden");
      }
    });
  }

  handleMakeChange(event) {
    let makeSelection = this.selectMake.value;
    this.selectModel.innerHTML = '<option value="all">All</option>';

    if (makeSelection === "all") {
      this.populateDropdownOptions("model", this.selectModel);
    } else {
      const modelsOfMake = this.cars
        .filter((car) => car.make === makeSelection)
        .map((car) => car.model);

      const uniqueModels = new Set(modelsOfMake);
      this._addOptions(this.selectModel, uniqueModels);
    }
  }

  bindEvents() {
    this.filterBtn.addEventListener(
      "click",
      this.handleFilterOptions.bind(this)
    );

    this.selectMake.addEventListener(
      "change",
      this.handleMakeChange.bind(this)
    );
  }

  init() {
    this.populateDropdownOptions("make", this.selectMake);
    this.populateDropdownOptions("model", this.selectModel);
    this.populateDropdownOptions("price", this.selectPrice);
    this.populateDropdownOptions("year", this.selectYear);
    this.bindEvents();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new CarApp();
});
