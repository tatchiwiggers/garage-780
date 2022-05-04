import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["carsList", "brand", "model", "plate", "owner"]

  connect() {
    this.garageName = 'batch-780'
    this.garageUrl = `https://wagon-garage-api.herokuapp.com/${this.garageName}/cars`
    // console.log("hello from garage controller!")
    this.fetchCars()
  }

  insertCar(car) {
    const carHtml = `
          <div class="car">
            <div class="car-image">
              <img src="http://loremflickr.com/280/280/${car.brand} ${car.model}"/>
            </div>
            <div class="car-info">
              <h4>${car.brand} ${car.model}</h4>
              <p><strong>Owner:</strong>${car.owner}</p>
              <p><strong>Plate:</strong>${car.plate}</p>
            </div>
          </div>`

    this.carsListTarget.insertAdjacentHTML('beforeend', carHtml)
  }

  fetchCars() {
    fetch("https://wagon-garage-api.herokuapp.com/batch780/cars")
    .then(response => response.json())
    .then((data) => {
      data.forEach(car => {
        this.insertCar(car)
      });
    })
  }

  createCar(event) {
    event.preventDefault()
    const newCar =
        {
            "brand": this.brandTarget.value,
            "model": this.modelTarget.value,
            "owner": this.ownerTarget.value,
            "plate": this.plateTarget.value
        }
    //we are not gonna use this.garageUrl becaus POST is failing
    fetch("https://wagon-garage-api.herokuapp.com/batch780/cars", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newCar)
    })
    .then(response => response.json())
    .then((data) => {
      // console.log(data);
      this.insertCar(data);
    })
    event.currentTarget.reset()
  }
}
// CAR
// {
//   "brand": "Ferrari",
//   "model": "308 GT",
//   "owner": "ssaunier",
//   "plate": "123AZ56"
// }