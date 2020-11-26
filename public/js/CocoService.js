"use strict";
// Note: Require the cpu and webgl backend and add them to package.json as peer dependencies.
require('@tensorflow/tfjs-backend-cpu');
require('@tensorflow/tfjs-backend-webgl');
const cocoSsd = require('@tensorflow-models/coco-ssd');
export async function CocoService(img) {
    await (async () => {
        // Load the model.
        const model = await cocoSsd.load();
        // Classify the image.
        const predictions = await model.detect(img);

        console.log('Predictions: ');
        console.log(predictions);
        return predictions;
    })();
}

// module.exports = {
//     CocoService
// }