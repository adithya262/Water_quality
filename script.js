async function loadModel() {
    const model = await tf.loadLayersModel('https://yourusername.github.io/water-quality-model/tfjs_model/model.json');
    return model;
}

async function predict() {
    const model = await loadModel();
    
    // Example input: [TDS, Turbidity, pH, Temperature]
    let input = tf.tensor2d([[500, 2.5, 7.2, 25]], [1, 4]);

    // Normalize input (same as training normalization)
    input = input.div(tf.tensor1d([1000, 10, 14, 50]));

    const prediction = model.predict(input);
    prediction.data().then(data => {
        document.getElementById("result").innerText = "Prediction: " + data[0];
    });
}
