// Defining constants
const MIN_INCOME = 0;
const MAX_INCOME = 7000;

const LOW_CLASS = "Unterschicht";
const MIDDLE_CLASS = "Mittelschicht";
const UPPER_CLASS = "Oberschicht";

// Getting html elements
var slider = document.getElementById("slider");
var output = document.getElementById("income-value");
var under14 = document.getElementById("under14").value;
var over14 = document.getElementById("over14").value;

slider.setAttribute("min", MIN_INCOME);
slider.setAttribute("max", MAX_INCOME);

output.innerHTML = slider.value;


// Slider
slider.addEventListener("input", () => {
  let value = slider.value;

  // Check if value exceeds 1000
  if (value > 999) {
    // Add a dot at the thousands place
    value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  output.innerHTML = value;
});

// Increase/Decrease input
function updateValue(e) {
  var diff = 0;
  var parent = e.target.parentElement;

  var inputValue = parent.children[1];

  var value = parseInt(inputValue.value, 10);

  // add value if increase button, subtract if decrease
  if (e.target.classList.contains("decrease")) {
    diff = -1;
  } else if (e.target.classList.contains("increase")) {
    diff = 1;
  }

  inputValue.value = isNaN(value) ? 0 : Math.max(0, value + diff);
}

var widgetContainer = document.getElementById("widget-container");
var graphContainer = document.getElementById("graph-container");

// Change to graph page when button 'BERECHNEN' clicked
function changePage() {
  income = slider.value;

  widgetContainer.style.display = "none";
  graphContainer.style.display = "flex";

  determineIncomeClass(income, under14, over14);
  calculateIncomeSliderHeight(income);
}

// Determine income range for the dynamic line
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

// Calculate and set the height of dynamic line in graph
function calculateIncomeSliderHeight(income) {
  var dynamicLineElement = document.getElementById("dynamic-line");
  var dynamicLineStyle = window.getComputedStyle(dynamicLineElement);

  var diff = (income / MAX_INCOME) * 100;

  var tmax = parseFloat(dynamicLineStyle.getPropertyValue("max-height"));
  var tmin = parseFloat(10);

  var normalized = (diff / 100) * (tmax - tmin) + tmin;
  dynamicLineElement.style.height = `${normalized}\%`;
}

// Income class classifier for graph
function determineIncomeClass(income, under14, over14) {

  // Arbitary formulas used for people's age and income determining class

  if (under14 > 0) {
    income = income - 200*under14;
  }

  if (over14 > 0) {
    income = income - 400*over14;
  }
  
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

// A back button for ease of use
function navigateBack() {
  widgetContainer.style.display = "flex";
  graphContainer.style.display = "none";
}