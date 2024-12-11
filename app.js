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

function onanimationframe() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    // cameraOutput.src = cameraSensor.toDataURL("image/webp");
    // cameraOutput.classList.add("taken");
    // track.stop();

    requestAnimationFrame(onanimationframe);
};

requestAnimationFrame(onanimationframe);

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);

cameraTrigger.addEventListener("click", (event) => {
    cameraView.requestFullscreen({ navigationUI: "hide" })
      .then(() => {})
      .catch((err) => {
        alert(
          `An error occurred while trying to switch into fullscreen mode: ${err.message} (${err.name})`,
        );
      });
});









