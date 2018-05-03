let mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

if (mobilecheck()) {
  var batchSize = 9;
} else {
  var batchSize = 25;
}
const gridSize = Math.sqrt(batchSize);
const varNamePrefix = 'BeganGenerator/';
const imageHeight = 80;
const imageWidth = 80;
const zDim = 100;
const imageSize = imageWidth * imageHeight * 3;
const firstModelOnLoad = 2;
const deltas = [0.25, 0.05, 0.25];
const cornerInitialValues = [
  [
    1.0, 1.0, 0.25, // top left
    0.0, 2.0, 0.75, // bottom left
    -0.75, -0.75, 2.0, // top right
    0.0, 2.0, 1.25,  // bottom right
  ],
  [
    1.0, 1.5, -1.0, // top left
    0.5, 0.5, 0.5, // bottom left
    -0.45, 2.5, 0.4, // top right
    0.0, 1.0, 1.0,  // bottom right
  ],
  [
    1.0, 1.0, 1.0, // top left
    -0.5, -1.0, 1.5, // bottom left
    -1.0, 2.5, 1.0, // top right
    0.0, 1.0, 1.0,  // bottom right
  ],
];
const arithmeticInitialValues = [
  [
    0.0, 2.0, 1.0, // base
    -0.5, 1.75, 1.0, // subtracted
    0.5, -0.5, 0.5, // added
  ],
  [
    0.0, 3.0, 0.0, // base
    0.4, 2.0, 0.0, // subtracted
    1.25, 0.0, 0.0, // added
  ],
  [
    0.5, -1.0, 1.0, // base
    -0.5, -1.0, 0.0, // subtracted
    -1.0, 0.0, 0.0, // added
  ],
];

// Sampled flattened 3x100 Gaussian.
var projection = [
    -0.8035534620285034, 0.04123091697692871, 1.733445644378662, -2.060840368270874, -1.5745307207107544, -1.2349134683609009, -0.22945132851600647, -0.4755406379699707, 0.422950804233551, -2.305410861968994, 3.119903564453125, -1.3486213684082031, -1.035377025604248, -0.5880785584449768, 0.669640302658081, 0.2943703830242157, 0.7816686630249023, 0.010197167284786701, -0.26273685693740845, -0.2867874801158905, 1.5224779844284058, 0.3250919282436371, -1.2939221858978271, -0.034932155162096024, 0.7675665616989136, -0.4083618223667145, -1.0096744298934937, 2.5484886169433594, -1.2018587589263916, 0.29580259323120117, 0.7082129120826721, 0.22844983637332916, 1.6224935054779053, 0.5670775175094604, 1.4123108386993408, -0.6381589770317078, 0.2075062096118927, 0.6005012392997742, 1.8378734588623047, -0.10027559101581573, 0.46772488951683044, -0.5839422345161438, 0.5804895162582397, 0.9855154752731323, -1.2539434432983398, 0.281200110912323, 1.7557659149169922, 0.3076074421405792, 1.1145814657211304, -1.0713653564453125, 1.2379255294799805, 1.3811609745025635, -0.4313724935054779, -0.1950715333223343, 0.1608259230852127, -2.4984991550445557, -1.0601564645767212, 2.6661601066589355, 0.1612643003463745, 1.728853464126587, 0.15968871116638184, -1.2066010236740112, -1.2344790697097778, -1.5470948219299316, -0.6351626515388489, -0.59174644947052, 1.513207197189331, -0.2231295108795166, 0.9084782600402832, -0.6302774548530579, 0.6608337163925171, 0.5037643909454346, -0.1310075968503952, -0.47467803955078125, 0.7791898250579834, -0.16766919195652008, 1.272935390472412, 0.5367006063461304, -0.850256621837616, 0.8937282562255859, -0.22326667606830597, -0.0397939532995224, 0.7640165686607361, 1.0800102949142456, -0.03299254551529884, 0.3244723081588745, 0.8122327923774719, -1.7319624423980713, -2.2309041023254395, 0.527291476726532, 0.6495563387870789, 1.789552092552185, 0.6190829277038574, 1.4477128982543945, -1.3796290159225464, -0.7497734427452087, 0.1321786791086197, 0.26560404896736145, -0.8968109488487244, 1.1795728206634521, 0.4864388108253479, 0.9078678488731384, 0.13689708709716797, 0.3286551833152771, 2.0198543071746826, -1.945761799812317, -0.3370742201805115, -1.0437960624694824, -0.503593385219574, -1.6525707244873047, 1.0539194345474243, -0.6578174829483032, 1.7453795671463013, 0.3207275867462158, -0.834213137626648, -1.6620177030563354, 0.5901670455932617, 0.18780823051929474, -1.5331865549087524, -0.23143458366394043, -1.9635018110275269, 0.6867969036102295, 1.4194140434265137, 0.5686676502227783, -0.8470115065574646, 0.11763998121023178, 1.1646082401275635, -0.10885244607925415, -0.44869738817214966, 0.6378187537193298, 1.0317271947860718, 1.1176058053970337, 0.7494161128997803, 0.5616273283958435, -0.15856127440929413, -0.5563780665397644, -0.9861903190612793, -0.1715395450592041, -0.05705750361084938, -0.6518458724021912, 0.5698049068450928, 1.4118379354476929, -1.1093093156814575, 1.142293095588684, -1.072534203529358, -0.06300937384366989, 0.5628966093063354, -0.05363064631819725, 1.201349139213562, 0.9351444840431213, -1.9959287643432617, 1.2003769874572754, 2.1945533752441406, 1.585421085357666, 2.1334588527679443, -0.36250877380371094, 0.5068919062614441, -1.9092825651168823, 0.5531058311462402, 0.05719592049717903, -0.10247296839952469, 0.7630394697189331, 0.9881771802902222, -0.1723143458366394, 0.0652017742395401, 0.3326807916164398, -0.1854034960269928, 0.6352784037590027, -0.5445818305015564, -0.08395051211118698, -0.8305928111076355, -0.13508126139640808, -0.06035991758108139, 0.2825920879840851, -2.9099929332733154, -0.6438550353050232, -0.5537970066070557, 0.42941197752952576, 1.5183143615722656, -1.0279526710510254, 0.926645040512085, 0.9053146243095398, 0.03802984207868576, -0.4608300030231476, -0.18556353449821472, -1.7586156129837036, -0.07442878931760788, -1.9974888563156128, 0.6563036441802979, 1.3683003187179565, 0.24332937598228455, -0.9237229228019714, 1.7962992191314697, -0.1627594232559204, -0.1702893227338791, -0.34158939123153687, 1.124398112297058, 0.9053552746772766, 1.259344458580017, 0.3502177596092224, 0.6774585247039795, 0.41587746143341064, -0.9406152963638306, 0.9606156945228577, -0.5095129609107971, -1.6480884552001953, 1.647287130355835, 0.8217741847038269, -0.5057307481765747, 1.115449070930481, -0.6354618072509766, 0.11629342287778854, -0.4951287508010864, -0.4582783579826355, 1.0901741981506348, 1.7766051292419434, -1.5170793533325195, 2.260369300842285, -0.35181280970573425, -0.07685474306344986, 0.5857223272323608, -0.6455304026603699, -0.34834328293800354, -0.7180488705635071, -2.0474956035614014, 0.061712075024843216, -0.2279413342475891, 1.4734455347061157, -1.777657151222229, 1.912495732307434, -0.5199675559997559, 0.166719451546669, 1.5485223531723022, 1.6852473020553589, 1.4791797399520874, -0.5986591577529907, 1.2717344760894775, 0.3298024833202362, -1.0000407695770264, 1.0814248323440552, 0.508610725402832, -1.059212565422058, -0.9301035404205322, -1.7221739292144775, -0.49974724650382996, -0.524479866027832, -2.1503772735595703, -1.6616657972335815, 1.118998646736145, 1.325447916984558, 0.681256890296936, -1.3296102285385132, 2.515101909637451, 0.06355910748243332, -0.6412551999092102, -1.1876611709594727, 0.23734000325202942, -0.6802937388420105, 1.0495260953903198, -0.20238643884658813, 0.1539255827665329, 0.5033733248710632, -0.6111624836921692, 0.11195582151412964, -0.20773130655288696, -1.9850356578826904, -0.007952124811708927, -0.667571485042572, 0.1021166741847992, 1.8573389053344727, 1.2773349285125732, 2.2263596057891846, -0.46690744161605835, 0.3097454905509949, 0.9387890100479126, -0.7132562398910522, -1.2388118505477905, -1.3607747554779053, -2.2747418880462646, 0.4466155469417572, 0.3558008372783661, -0.9210812449455261, -0.7394195199012756, 1.5575844049453735, 2.062492847442627, -0.2857460677623749, -0.9410421848297119, -0.8612229228019714, 0.25816211104393005, -0.355398565530777, 0.90036940574646, 0.5678399801254272, 0.04819479584693909, 1.58297860622406, 2.038360357284546, 0.5850480794906616, -1.2599414587020874, 0.023071186617016792, 1.3493151664733887, -1.0687123537063599
];
projection = dl.tensor2d(projection, [zDim, 3]);

const modelHparamMap = [
// vm2pugan/16b.64gf.64df.0.001lr.0.8g.4dx.4gx.vanres100000.lrelu.samed.stats2x.sepconv.bnd_bng.sep
  ['/assets/pusheen/weights/v0', {
    iteration: 137000,
    layerRepeats: 4,
    numFilters: 64,
    residualIterations: 100000,
    separableConv: true,
    sameDepth: false,
  }],
  // vm1pugan/16b.16gf.64df.0.7g.3dx.4gx.vanres100000.lrelu.samed.stats2x.bnd_bng.same
  ['/assets/pusheen/weights/v1', {
    iteration: 155000,
    layerRepeats: 4,
    numFilters: 16,
    residualIterations: 100000,
    separableConv: false,
    sameDepth: false,
  }],
  // vm2pugan/16b.64gf.64df.0.7g.4dx.4gx.vanres100000.lrelu.samed.stats2x.sepconv.bnd_bng.sep
  ['/assets/pusheen/weights/v2', {
    iteration: 143000,
    layerRepeats: 4,
    numFilters: 64,
    residualIterations: 100000,
    separableConv: true,
    sameDepth: false,
  }],
];

// let normalSample = function () {
//   var u = 0, v = 0;
//   while(u === 0) u = seededRandom(); //Converting [0,1) to (0,1)
//   while(v === 0) v = seededRandom();
//   return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
// }

let normalSample = function () {
  let s = 0;
  let n = 6;
  for (var i = 0; i < n; i++) {
    s += Math.random();
  }
  s = (s - n / 2) / (n / 2);
  return s;
};

let rescalePixel = function (p) {
  return Math.round((p + 1.0) * 127.5);
};

let randomVector = function(scale) {
  if (scale === undefined) {
    scale = 1.0;
  }
  let v = [];
  for (var i = 0; i < zDim; i++) {
    v.push(scale * normalSample());
  }
  return v;
};

let interpolate = function(start, end) {
  const row = [start];
  for (var b = 1; b < gridSize - 1; b++) {
    row.push([]);
    for (var i = 0; i < zDim; i++) {
      row[b].push(b / (gridSize - 1) * end[i] + (gridSize - 1 - b) / (gridSize - 1) * start[i]);
      // row[b].push(Math.sqrt(b / (gridSize - 1)) * end[i] + Math.sqrt((gridSize - 1 - b) / (gridSize - 1)) * start[i]);
    }
  }
  row.push(end);
  return row;
};

let project = function (l) {
  return Array.prototype.slice.call(dl.squeeze(dl.matMul(projection, dl.expandDims(dl.tensor1d(l), 1))).dataSync());
};


let setupCanvases = function(elementId) {
  let demo = $(elementId);
  let contexts = []
  demo.width(gridSize * imageWidth);
  for (var b = 0; b  < gridSize; b++) {
    let row = $('<div></div>');
    row.width(gridSize * imageWidth);
    for (var bb = 0; bb < gridSize; bb++) {
      let canvas = $('<canvas></canvas>');
      canvas[0].height = imageHeight;
      canvas[0].width = imageWidth;
      row.append(canvas);
      contexts.push(canvas[0].getContext('2d'));
    }
    demo.append(row);
  }
  return contexts;
};

let getVectorFromInputs = function (cornerId) {
  let inputs = $('#' + cornerId).find('.input-text');
  let inputValues = [];
  for (var i = 0; i < 3; i++) {
    let currentValue = parseFloat($(inputs[i]).val());
    if (isNaN(currentValue)) {
      currentValue = 0.0;
    }
    inputValues.push(currentValue);
  }
  return inputValues;
};

let renderImages = function (contexts, images) {
  for (var b = 0; b < contexts.length; b++) {
    let imageSize = 80*80*3;
    let imageData = new ImageData(imageWidth, imageHeight);
    for(var i = 0; i < imageSize; i++) {
      let j = i * 3;
      let k = i * 4;
      imageData.data[k] = rescalePixel(images[b*imageSize+j]);
      imageData.data[k+1] = rescalePixel(images[b*imageSize+j+1]);
      imageData.data[k+2] = rescalePixel(images[b*imageSize+j+2]);
      imageData.data[k+3] = 255.0;
    }
    contexts[b].putImageData(imageData, 0, 0);
  }
  $(".pusheen-loading-image").hide();
};

let renderSingleImage = function (context, image) {
  let imageData = new ImageData(imageWidth, imageHeight);
  for(var i = 0; i < imageSize; i++) {
    let j = i * 3;
    let k = i * 4;
    imageData.data[k] = rescalePixel(image[j]);
    imageData.data[k+1] = rescalePixel(image[j+1]);
    imageData.data[k+2] = rescalePixel(image[j+2]);
    imageData.data[k+3] = 255.0;
  }
  context.putImageData(imageData, 0, 0);
};

// always outputs the same image because batch size 1 and so the bn params are messed up, need to save a sample from here and make into a weight
let generateImages = function (hparams, modelVars, contexts, images, gridVectors, bi) {
  // generate(hparams, modelVars, gridVectors).data().then(function (images) {
  //   renderImages(contexts, images);
  // });  
  // return;
  if (bi == gridVectors.length) {
    $(".pusheen-loading-image").hide();
    return;
  }
  $(".pusheen-loading-image").show();
  generate(hparams, modelVars, [gridVectors[bi]]).data().then(function (image) {
    dl.nextFrame().then(function () {
      renderSingleImage(contexts[bi], image);
      generateImages(hparams, modelVars, contexts, images, gridVectors, bi + 1);
    });
  });  
};

let generateRandomImages = function (modelIndex, randomContexts, batchSize, hparams, modelVars) {
  $("#pusheen-random-demo-wrapper .pusheen-loading-image").show();
  let gridVectors = [];
  for (var b = 0; b < batchSize; b++) {
    if (modelIndex == 0 || modelIndex == 2) {
      gridVectors.push(randomVector(4));
    }
    if (modelIndex == 1) {
      let m = normalSample();
      if (m < 0.0) {
        m *= -1.0;
      }
      let zz = [normalSample(), m, normalSample()];
      gridVectors.push(project(zz));
    }
  }
  generateImages(hparams, modelVars, randomContexts, [], gridVectors, 0);
};

let changeModel = function (modelIndex, cornerContexts, randomContexts,
    cornerInputManager, arithmeticInputManager) {
  $(".pusheen-loading-image").show();
  let modelWeights = modelHparamMap[modelIndex][0];
  let hparams = modelHparamMap[modelIndex][1];
  $('#pusheen-random-images').attr('src','/assets/pusheen/images/random_v' + modelIndex + '.png');
  $('#pusheen-corner-images').attr('src','/assets/pusheen/images/corner_v' + modelIndex + '.png');
  $('#pusheen-arithmetic-images').attr('src','/assets/pusheen/images/arithmetic_v' + modelIndex + '.png');
  const varLoader = new dl.CheckpointLoader(modelWeights);
  varLoader.getAllVariables().then((modelVars) => {
    $(".pusheen-loading-image").hide();
    // setup random demo
    $('#pusheen-random-demo-button').click(function () {
      generateRandomImages(modelIndex, randomContexts, batchSize, hparams, modelVars);
    });
    generateRandomImages(modelIndex, randomContexts, batchSize, hparams, modelVars);

    // setup corner demo
    if (!mobilecheck()) {
      let cornerChangeValueListener = function (changed) {
        $("#pusheen-corner-demo-wrapper .pusheen-loading-image").show();
        let topLeftVector = getVectorFromInputs('pusheen-top-left-corner');
        let topRightVector = getVectorFromInputs('pusheen-top-right-corner');
        let bottomLeftVector = getVectorFromInputs('pusheen-bottom-left-corner');
        let bottomRightVector = getVectorFromInputs('pusheen-bottom-right-corner');
        topLeftVector = project(topLeftVector);
        topRightVector = project(topRightVector);
        bottomLeftVector = project(bottomLeftVector);
        bottomRightVector = project(bottomRightVector);
        let gridVectors = [];
        // Generate vertical sides of grid, then interpolate between them.
        const leftSideVectors = interpolate(topLeftVector, bottomLeftVector);
        const rightSideVectors = interpolate(topRightVector, bottomRightVector);

        // Don't need to regenerate the top (bottom) row if we changed one of
        // the bottom (top) corners, and don't need to regenerate the left
        // (right) column if changed one of the right (left) corners.
        let rowStart = 0;
        let rowEnd = gridSize;
        let staleCornerContexts = cornerContexts;
        if (changed) {
          let changedId = changed.parent().parent().attr('id');
          let isLeft = changedId.includes('left');
          let isTop = changedId.includes('top');
          rowStart = isTop ? 0 : 1;
          rowEnd = isTop ? gridSize - 1 : gridSize;
          columnRemove = isLeft ? gridSize - 1 : 0;
          staleCornerContexts = [];
          for (var b = gridSize * rowStart; b < gridSize * rowEnd; b++) {
            if (isLeft && b % gridSize == (gridSize - 1)) {
              continue;
            }
            if (!isLeft && b % gridSize == 0) {
              continue;
            }
            staleCornerContexts.push(cornerContexts[b]);
          }
        }
        for (var r = rowStart; r < rowEnd; r++) {
          let row = interpolate(leftSideVectors[r], rightSideVectors[r]);
          if (changed) {
            row.splice(columnRemove, 1);
          }
          gridVectors = gridVectors.concat(row);
        }
        generateImages(hparams, modelVars, staleCornerContexts, [], gridVectors, 0);
      };
      // Need this below the inputs setup so the corner values are set before
      // generating images.
      cornerInputManager.setInputs(cornerInitialValues[modelIndex]);
      cornerInputManager.setDelta(deltas[modelIndex]);
      cornerInputManager.setChangeValueListener(cornerChangeValueListener);
      cornerChangeValueListener(null);
    }


    // Setup the arithmetic demo.
    let baseCanvas = $('#pusheen-base-arithmetic-canvas');
    let subtractedCanvas = $('#pusheen-subtracted-arithmetic-canvas');
    let addedCanvas = $('#pusheen-added-arithmetic-canvas');
    let resultCanvas = $('#pusheen-result-arithmetic-canvas');
    let arithmeticCanvases = [
        baseCanvas, subtractedCanvas, addedCanvas, resultCanvas
    ];
    let arithmeticContexts = [];
    for (let i = 0; i < 4; i++) {
      let canvas = arithmeticCanvases[i];
      canvas[0].height = imageHeight;
      canvas[0].width = imageWidth;
      arithmeticContexts.push(canvas[0].getContext('2d'));
    }
    let arithmeticChangeValueListener = function (changed) {
      let changedId = changed ? changed.parent().parent().attr('id') : null;
      let isBase = !changed || changedId.includes('base');
      let isSubtracted = !changed || changedId.includes('subtracted');
      let isAdded = !changed || changedId.includes('added');
      let base = project(getVectorFromInputs('pusheen-base-arithmetic-inputs'));
      let subtracted = project(getVectorFromInputs('pusheen-subtracted-arithmetic-inputs'));
      let added = project(getVectorFromInputs('pusheen-added-arithmetic-inputs'));
      let result = [];
      for (let i = 0; i < zDim; i++) {
        result.push(base[i] - subtracted[i] + added[i]);
      }
      let staleArithmeticVectors = [];
      let staleArithmeticContexts = [];
      if (isBase) {
        staleArithmeticVectors.push(base);
        staleArithmeticContexts.push(arithmeticContexts[0]);
      }
      if (isSubtracted) {
        staleArithmeticVectors.push(subtracted);
        staleArithmeticContexts.push(arithmeticContexts[1]);
      }
      if (isAdded) {
        staleArithmeticVectors.push(added);
        staleArithmeticContexts.push(arithmeticContexts[2]);
      }
      staleArithmeticVectors.push(result);
      staleArithmeticContexts.push(arithmeticContexts[3]);
      generateImages(hparams, modelVars, staleArithmeticContexts, [], staleArithmeticVectors, 0);
    };
    arithmeticInputManager.setInputs(arithmeticInitialValues[modelIndex]);
    arithmeticInputManager.setDelta(deltas[modelIndex]);
    arithmeticInputManager.setChangeValueListener(arithmeticChangeValueListener);
    arithmeticChangeValueListener(null);
  });
};

$(document).ready(() => {
  Math.seedrandom('~ ~ ~ P U S H E 111111njoiuwjd87frehfidlskjlE N ~ ~ ~');
  const randomContexts = setupCanvases('#pusheen-random-demo');
  const cornerContexts = setupCanvases('#pusheen-corner-demo');
  let cornerInputManager = new Inputs('#pusheen-corner-demo-wrapper');
  let arithmeticInputManager = new Inputs('#pusheen-arithmetic-demo-wrapper');
  // Setup model dropdown selector.
  $('#pusheen-model-selector').change(function () {
    changeModel(parseInt(this.value), cornerContexts, randomContexts,
        cornerInputManager, arithmeticInputManager);
  });
  changeModel(firstModelOnLoad, cornerContexts, randomContexts,
      cornerInputManager, arithmeticInputManager);
});
