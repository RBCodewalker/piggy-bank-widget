// Slider

var slider = document.getElementById("slider");
var output = document.getElementById("val");
output.innerHTML = slider.value;

slider.addEventListener('input', () => {
  let value = slider.value;
  // Check if value exceeds 1000
  if (value > 999) {
    // Add a dot at the thousands place
    value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  output.innerHTML = value;
});

// Increase input

function increaseValue(inputId) {
  var value = parseInt(document.getElementById(inputId).value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementById(inputId).value = value;
}

// Decrease input

function decreaseValue(inputId) {
  var value = parseInt(document.getElementById(inputId).value, 10);
  value = isNaN(value) ? 0 : value;
  value < 1 ? value = 1 : '';
  value--;
  document.getElementById(inputId).value = value;
}