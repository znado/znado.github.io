const colorChannelWeightMap = {
  'red': [1.0, 0.0, 0.0],
  'green': [0.0, 1.0, 0.0],
  'blue': [0.0, 0.0, 1.0],
};
// 100% values [0.6, -3.0, -2.8, 0.1, 4.8]
const weatherDemoInitialValues = [1.0, -1.0, -1.0, 0.1, 1.0];
const weatherDemoTrueValues = [
    'Sunny', 'Stormy', 'Sunny', 'Stormy', 'Stormy', 'Sunny'
];
let weatherDimension = 5;

let rescalePixel = function (p) {
  return Math.round(p * 255.0);
};

let renderImage = function (canvasId, image) {
  let canvas = $('#' + canvasId);
  let height = canvas.height();
  let width = canvas.width();
  console.log(width, height)
  let imageData = new ImageData(width, height);
  let imageSize = width * height;
  console.log(image)
  console.log(imageData.data)
  for(var i = 0; i < imageSize; i++) {
    let k = i * 4;
    imageData.data[k] = rescalePixel(image[i]);
    imageData.data[k+1] = rescalePixel(image[i]);
    imageData.data[k+2] = rescalePixel(image[i]);
    imageData.data[k+3] = 255.0;
  }
  console.log(imageData.data)
  canvas[0].getContext('2d').putImageData(imageData, 0, 0);
};

let preprocess = function (input) {
  input = tf.fromPixels(input);
  input = tf.div(input, tf.scalar(127.5));
  input = tf.sub(input, tf.scalar(1.0));
  return input;
};

let makeFilter = function (channelWeights) {
  let filter = tf.tensor3d(channelWeights);
  // 3x1x1 -> 1x1x3
  filter = tf.transpose(filter, [1, 2, 0]);
  // 1x1x3 -> 1x1x3x1
  filter = tf.expandDims(filter, 3);
  return filter;
};

let colorConv = function (input, color) {
  let colorChannelWeighting = colorChannelWeightMap[color];
  if (!colorChannelWeighting) {
    return;
  }
  let filter = makeFilter([
    [[colorChannelWeighting[0] * 20]],
    [[colorChannelWeighting[1] * 20]],
    [[colorChannelWeighting[2] * 20]],
  ]);
  let h = tf.conv2d(input, filter, [1, 1], 'same');
  return tf.sigmoid(h);
};

let edgeConv = function (input) {
  const edgeFilter = [
    [-1,  1,  1],
    [-3,  8,  1],
    [-3, -3, -1],
  ];
  let filter = makeFilter([
    edgeFilter, edgeFilter, edgeFilter,
  ]);
  let h = tf.conv2d(input, filter, [1, 1], 'same');
  return tf.sigmoid(h);
};


let weatherDemoChangeListenerWrapper = function (weatherData) {
  return function () {
    let currentWeights = [];
    $('#weights-table .input-text').each(function (row, weight) {
      currentWeights.push(parseFloat($(weight).val()));
    });
    currentWeights = tf.tensor2d([currentWeights]);
    let results = tf.matMul(weatherData, currentWeights, false, true);
    results.data().then(function(resultValues) {
      $('.weather-result').each(function (index, resultElement) {
        let resultValue = resultValues[index];
        let label = resultValue > 0 ? 'Sunny' : 'Stormy';
        resultElement = $(resultElement);
        $(resultElement).text(label);
        if (label == weatherDemoTrueValues[index]) {
          resultElement.css({'color': 'green'});
        } else {
          resultElement.css({'color': 'red'});
        }
      });
    });
  }
};

$(document).ready(() => {
  let weatherData = [];
  let currentRow = [];
  $('#data-table td').each(function (row, dataPoint) {
    currentRow.push(parseFloat($(dataPoint).text()));
    if (row % weatherDimension == (weatherDimension - 1)) {
      weatherData.push(currentRow);
      currentRow = [];
    }
  });
  weatherData = tf.tensor2d(weatherData);

  let weatherDemoChangeListener = weatherDemoChangeListenerWrapper(weatherData);
  setupInputs(weatherDemoChangeListener, weatherDemoInitialValues);
  // Make sure to call after the initial values have been setup.
  weatherDemoChangeListener();
  console.log(preprocess($('#cat-image-1')[0]))

  $('#cat-image-1').on('load', function () {
    colorConv(preprocess(this), 'green').data().then(function(redImage) {
      console.log('why')
      renderImage('cat-canvas-1', redImage);
    });
  });
});
