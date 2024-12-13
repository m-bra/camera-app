// Set constraints for the video stream
var constraints = { video: { facingMode: "environment" }, audio: false };
var track = null;

// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger");

// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Oops. Something is broken.", error);
        });
}

var ctxt = null;

function onanimationframe() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    ctxt = cameraSensor.getContext("2d");
    ctxt.drawImage(cameraView, 0, 0);
    // let imgdata = ctxt.getImageData(0, 0, w / 2, h);
    // ctxt.putImageData(0, 0, imgdata);
    // ctxt.putImageData(w / 2, 0, imgdata);

    // cameraOutput.src = cameraSensor.toDataURL("image/webp");
    // cameraOutput.classList.add("taken");
    // track.stop();

    requestAnimationFrame(onanimationframe);
};

requestAnimationFrame(onanimationframe);

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);

cameraTrigger.addEventListener("click", (event) => {
    cameraTrigger.hidden = true;
    cameraView.requestFullscreen({ navigationUI: "hide" })
      .then(() => {})
      .catch((err) => {
        alert(
          `An error occurred while trying to switch into fullscreen mode: ${err.message} (${err.name})`,
        );
      });
});









