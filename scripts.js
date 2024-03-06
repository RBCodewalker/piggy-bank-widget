// Slider

const MIN_INCOME = 0;
const MAX_INCOME = 7000;

const LOW_CLASS = "Unterschicht";
const MIDDLE_CLASS = "Mittelschicht";
const UPPER_CLASS = "Oberschicht";

var slider = document.getElementById("slider");
var output = document.getElementById("val");
var under14 = document.getElementById("under14").value;
var over14 = document.getElementById("over14").value;

slider.setAttribute("min", MIN_INCOME);
slider.setAttribute("max", MAX_INCOME);

output.innerHTML = slider.value;

slider.addEventListener("input", () => {
  let value = slider.value;

  // Check if value exceeds 1000
  if (value > 999) {
    // Add a dot at the thousands place
    value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  output.innerHTML = value;
});

// Increase input

function increaseValue(e) {
  var parent = e.target.parentElement;

  var inputValue = parent.children[1];

  var value = parseInt(inputValue.value, 10);
  value = isNaN(value) ? 0 : value;
  value++;

  inputValue.value = value;
}

// Decrease input

function decreaseValue(e) {
  var parent = e.target.parentElement;

  var inputValue = parent.children[1];

  var value = parseInt(inputValue.value, 10);
  value = isNaN(value) ? 0 : value;
  value < 1 ? (value = 1) : "";
  value--;

  inputValue.value = value;
}

// Change to graph page when button 'BERECHNEN' clicked

var widgetContainer = document.getElementById("widget-container");
var graphContainer = document.getElementById("graph-container");

function changePage() {
  income = slider.value;

  widgetContainer.style.display = "none";
  graphContainer.style.display = "flex";

  determineIncomeClass(income, under14, over14);
  calculateIncomeSliderHeight(income);
}

function createIncomeRangeElements() {
  var incomeRanges = [2000, 4000, 5000, 6000, 7000].reverse();
  var incomeRangeDiv = document.getElementById("income-range");

  for (income in incomeRanges) {
    var el = document.createElement("div");
    el.classList.add("rows");

    el.innerHTML = incomeRanges[income];

    incomeRangeDiv.appendChild(el);
  }
}

function calculateIncomeSliderHeight(income) {
  var dynamicLineElement = document.getElementById("dynamic-line");
  var dynamicLineStyle = window.getComputedStyle(dynamicLineElement);

  var diff = (income / MAX_INCOME) * 100;

  var tmax = parseFloat(dynamicLineStyle.getPropertyValue("max-height"));
  var tmin = parseFloat(10);

  var normalized = (diff / 100) * (tmax - tmin) + tmin;
  dynamicLineElement.style.height = `${normalized}\%`;
}

function determineIncomeClass(income, under14, over14) {

  if (under14 > 0) {
    income = income - 200*under14;
  }

  if (over14 > 0) {
    income = income - 400*over14;
  }
  
  console.log(income);

  var incomeClassElement = document.getElementById("income-class");

  var diff = (income / MAX_INCOME) * 100;
  var incomeClass = LOW_CLASS;

  if (diff >= 0 && diff <= 35) {
    incomeClass = LOW_CLASS;
  } else if (diff >= 35 && diff <= 70) {
    incomeClass = MIDDLE_CLASS;
  } else {
    incomeClass = UPPER_CLASS;
  }

  incomeClassElement.innerHTML = `Ich gehöre zur deutschen ${incomeClass}`;
}

createIncomeRangeElements();

function navigateBack() {
  widgetContainer.style.display = "flex";
  graphContainer.style.display = "none";
}