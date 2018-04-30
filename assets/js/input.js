// changeValueListener: a function that takes the jquery element whose value
// was changed
//
// call from within $(document).ready
let Inputs = function (parentElementSelector) {
  const holdUpdateInterval = 100;
  this.delta = 1.0;
  let self = this;

  // Setup inputs
  var decrementTimeout;
  var incrementTimeout;
  $(parentElementSelector + ' .decrement-arrow').click(function () {
    changeValue($(this), false);
  });
  // $(parentElementSelector + ' .decrement-arrow').mousedown(function () {
  //   let arrow = $(this);
  //   decrementTimeout = setInterval(function () {
  //     changeValue(arrow, false);
  //   }, holdUpdateInterval);
  //   return false;
  // });

  $(parentElementSelector + ' .increment-arrow').click(function () {
    changeValue($(this), true);
  });
  // $(parentElementSelector + ' .increment-arrow').mousedown(function () {
  //   let arrow = $(this);
  //   incrementTimeout = setInterval(function () {
  //     changeValue(arrow, true);
  //   }, holdUpdateInterval);
  //   return false;
  // });

  let changeValue = function(arrow, isIncrement) {
    let input = arrow.parent().find('.input-text');
    let direction = isIncrement ? 1.0 : -1.0;
    let currentValue = parseFloat(input.val());
    if (isNaN(currentValue)) {
      currentValue = 0.0;
    }
    let newValue = currentValue + direction * self.delta;
    input.val(newValue.toPrecision(3));
    self.changeValueListener(arrow);
  };

  // should not be double called if manually change values because this is only
  // for when the user manually types the new number in
  $(parentElementSelector + ' .input-text').change(function () {
    self.changeValueListener($(this));
  });

  $(document).mouseup(function () {
    clearInterval(decrementTimeout);
    clearInterval(incrementTimeout);
    return false;
  });

  // values: a 1d list of initial values for the inputs, same length as the
  // number of inputs
  this.setInputs = function (values) {
    let inputs = $(parentElementSelector + ' .input-text');
    for (var i = 0; i < inputs.length; i++) {
      $(inputs[i]).val(values[i]);// + '.0');
    }
  };

  this.setDelta = function(delta) {
    this.delta = delta;
  };

  this.setChangeValueListener = function(changeValueListener) {
    this.changeValueListener = changeValueListener;
  };
};