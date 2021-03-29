const URL = "./CF_MODEL/"

let model, webcam, labelContainer, maxPredictions;
let count_value = 0;
let one_shoot = false;
classification_init();

// Load the image model and setup the webcam
async function classification_init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true;
    webcam = new tmImage.Webcam(720, 720, flip);
    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append elements to the DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    // labelContainer = document.getElementById("label-container");
    // for (let i = 0; i < maxPredictions; i++) { // and class labels
    //     labelContainer.appendChild(document.createElement("div"));
    // }
}

async function loop() {
    webcam.update();
    await predict();
    window.requestAnimationFrame(loop);
}

// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            let value = prediction[i].probability.toFixed(2);
            
            if(prediction[i].className=="sausage" && value >= 0.7)
            {
                document.getElementById("label-container").innerHTML = "ian-tshiâng"
            }
            else if(prediction[i].className=="riceSausage" && value >= 0.7)
            {
               document.getElementById("label-container").innerHTML = "bí-tn̂g"
            }
            else if(prediction[i].className=="driedTofu" && value >= 0.7)
            {
               document.getElementById("label-container").innerHTML = "tāu-kuann"
            }
            else if(prediction[i].className=="tempura" && value >= 0.7)
            {
                document.getElementById("label-container").innerHTML = "oo-lián"
            }
            // else if(prediction[i].className=="other" && value >= 0.7)
            // {
            //     console.log("OTHER");
            // }
            else if(prediction[i].className=="other" && value >= 0.7)
            {
                document.getElementById("label-container").innerHTML = "koh hip tsi̍t-pái"
            }

        // labelContainer.childNodes[i].innerHTML = classPrediction;
    }
}