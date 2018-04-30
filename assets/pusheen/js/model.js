// var stats = {};

let batchNorm = function (modelVars, input, layerVarNamePrefix) {
  let indices = null;
  if (input.shape.length == 2) {
    indices = [0];
  } else {
    // bn is over all but the channels dimension of the activations
    indices = [0, 1, 2];
  }
  let layerBatchNormVarNamePrefix = layerVarNamePrefix + 'BatchNorm';
  // let moments = dl.moments(input, indices);
  // stats[layerBatchNormVarNamePrefix] = {
  //   'mean': Array.prototype.slice.call(moments.mean.dataSync()),
  //   'variance': Array.prototype.slice.call(moments.variance.dataSync())
  // };
  // let mean = moments.mean;
  // let variance = moments.variance;
  let mean = modelVars[layerVarNamePrefix + 'BatchNorm_mean'];
  let variance = modelVars[layerVarNamePrefix + 'BatchNorm_variance'];
  let offset = modelVars[layerBatchNormVarNamePrefix + '/beta'];

  return dl.batchNormalization(input, mean, variance, 0.001, null, offset);
};

let conv2d = function (modelVars, input, numOutputFilters, layerIndex, useTanh, useSeparableConv) {
  let layerVarNamePrefix = null;
  let convVarName = useSeparableConv ? 'SeparableConv2d' : 'Conv';
  if (layerIndex == 0) {
    layerVarNamePrefix = varNamePrefix + convVarName + '/';
  } else {
    layerVarNamePrefix = varNamePrefix + convVarName + '_' + layerIndex + '/';
  }
  // tf.contrib.layers.conv2d doesn't use bias because we batch norm
  let h = null;
  if (useSeparableConv) {
    let depthW = modelVars[layerVarNamePrefix + 'depthwise_weights'];
    h = dl.depthwiseConv2d(input, depthW, [1, 1], 'same');
    let pointW = modelVars[layerVarNamePrefix + 'pointwise_weights'];
    h = dl.conv2d(h, pointW, [1, 1], 'same');
  } else {
    let w = modelVars[layerVarNamePrefix + 'weights'];
    h = dl.conv2d(input, w, [1, 1], 'same');
  }
  h = batchNorm(modelVars, h, layerVarNamePrefix);
  if (useTanh) {
    return dl.tanh(h);
  } else {
    return dl.leakyRelu(h, 0.2);
  }
};

let generate = function (hparams, modelVars, inputZ) {
  return dl.tidy(() => {
    const generatorBatchSize = inputZ.length;
    const carryFloat = (hparams.residualIterations - hparams.iteration) / hparams.residualIterations;
    const carry = dl.scalar(carryFloat);
    const onesMinusCarry = dl.scalar(1.0 - carryFloat);
    let size = Math.sqrt(zDim);
    let z = dl.tensor2d(inputZ);
    let fcVarNamePrefix = varNamePrefix + 'fully_connected/';
    let fcW = modelVars[fcVarNamePrefix + 'weights'];
    let z_4d = dl.reshape(z, [generatorBatchSize, 1, size, size]);
    let g = dl.matMul(z, fcW);
    g = batchNorm(modelVars, g, fcVarNamePrefix);
    g = dl.reshape(g, [generatorBatchSize, 8 * hparams.numFilters, size, size]);

    // correct for the fact that trained in NCHW data format but
    // generating in NHWC
    z_4d = dl.transpose(z_4d, [0, 2, 3, 1]);
    g = dl.transpose(g, [0, 2, 3, 1]);

    let convLayerIndex = 0;
    for (var i = 0; i < hparams.layerRepeats; i++) {
      let gPrev = g.clone();
      let depthMultiplier = hparams.sameDepth ? 1 : 8;
      g = conv2d(modelVars, g, depthMultiplier * hparams.numFilters, convLayerIndex, false,
          hparams.separableConv);
      convLayerIndex += 1;
      if (hparams.iteration < hparams.residualIterations && i > 0) {
        g = dl.addStrict(dl.mul(carry, gPrev), dl.mul(onesMinusCarry, g));
      }
    }
    g = dl.concat([g, z_4d], 3);
    g = dl.image.resizeBilinear(g, [2 * size, 2 * size]);
    for (var i = 0; i < hparams.layerRepeats; i++) {
      let gPrev = g.clone();
      let depthMultiplier = hparams.sameDepth ? 1 : 4;
      g = conv2d(modelVars, g, depthMultiplier * hparams.numFilters, convLayerIndex, false,
          hparams.separableConv);
      convLayerIndex += 1;
      if (hparams.iteration < hparams.residualIterations && i > 0) {
        g = dl.addStrict(dl.mul(carry, gPrev), dl.mul(onesMinusCarry, g));
      }
    }
    z_4d = dl.image.resizeBilinear(z_4d, [2 * size, 2 * size]);
    g = dl.concat([g, z_4d], 3);
    g = dl.image.resizeBilinear(g, [4 * size, 4 * size]);
    for (var i = 0; i < hparams.layerRepeats; i++) {
      let gPrev = g.clone();
      let depthMultiplier = hparams.sameDepth ? 1 : 2;
      g = conv2d(modelVars, g, depthMultiplier * hparams.numFilters, convLayerIndex, false,
          hparams.separableConv);
      convLayerIndex += 1;
      if (hparams.iteration < hparams.residualIterations && i > 0) {
        g = dl.addStrict(dl.mul(carry, gPrev), dl.mul(onesMinusCarry, g));
      }
    }
    z_4d = dl.image.resizeBilinear(z_4d, [4 * size, 4 * size]);
    g = dl.concat([g, z_4d], 3);
    g = dl.image.resizeBilinear(g, [8 * size, 8 * size]);
    for (var i = 0; i < hparams.layerRepeats - 1; i++) {
      let gPrev = g.clone();
      g = conv2d(modelVars, g, hparams.numFilters, convLayerIndex, false,
          hparams.separableConv);
      convLayerIndex += 1;
      if (hparams.iteration < hparams.residualIterations && i > 0) {
        g = dl.addStrict(dl.mul(carry, gPrev), dl.mul(onesMinusCarry, g));
      }
    }
    g = conv2d(modelVars, g, 3, convLayerIndex, true, hparams.separableConv);
    return g;
  });
};
