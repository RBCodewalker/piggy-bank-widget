// Slider

const MIN_INCOME = 0;
const MAX_INCOME = 7000;

const LOW_CLASS = "Unterschicht";
const MIDDLE_CLASS = "Mittelschicht";
const UPPER_CLASS = "Oberschicht";

var slider = document.getElementById("slider");
var output = document.getElementById("val");

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

function changePage() {
  income = slider.value;

  var widgetContainer = document.getElementById("widget-container");
  var graphContainer = document.getElementById("graph-container");

  widgetContainer.style.display = "none";
  graphContainer.style.display = "flex";

  determineIncomeClass(income);
  calculateIncomeSliderHeight(income);
}

function createIncomeRangeElements() {
  // var incomeRanges = [...Array(Math.ceil(MAX_INCOME / 1000)).keys()]
  //   .map((x) => (x + 1) * 1000)
  //   .reverse();

  var incomeRanges = [2000, 4000, 5000, 6000, 7000].reverse();

  var incomeRangeDiv = document.getElementById("income-range");

  for (income in incomeRanges) {
    var el = document.createElement("div");
    el.classList.add("row1");

    el.innerHTML = incomeRanges[income];

    incomeRangeDiv.appendChild(el);
  }
}

// TODO: change based on topline
function calculateIncomeSliderHeight(income) {
  var dynamicLineElement = document.getElementById("dynamic-line");
  var dynamicLineStyle = window.getComputedStyle(dynamicLineElement);

  var diff = (income / MAX_INCOME) * 100;

  var tmax = parseFloat(dynamicLineStyle.getPropertyValue("max-height"));
  var tmin = parseFloat(dynamicLineStyle.getPropertyValue("min-height"));

  var normalized = (diff / 100) * (tmax - tmin) + tmin;
  dynamicLineElement.style.height = `${normalized}\%`;
}

function determineIncomeClass(income) {
  var incomeClassElement = document.getElementById("income-class");

  var diff = (income / MAX_INCOME) * 100;
  var incomeClass = LOW_CLASS;

  if (diff >= 0 && diff <= 40) {
    incomeClass = LOW_CLASS;
  } else if (diff >= 40 && diff <= 80) {
    incomeClass = MIDDLE_CLASS;
  } else {
    incomeClass = UPPER_CLASS;
  }

  incomeClassElement.innerHTML = `Ich gehöre zur deutschen ${incomeClass}`;
}

createIncomeRangeElements();
