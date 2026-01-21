import { start as loadAndBuildMenu, presets } from './buildMenu.js';

// About imports and exports in JavaScript modules
// see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
// and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
// and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export

// default imports of classes from waveformdrawer.js and trimbarsdrawer.js
import WaveformDrawer from './waveformdrawer.js';
import TrimbarsDrawer from './trimbarsdrawer.js';
// "named" imports from utils.js and soundutils.js
import { decodeAllSounds, playSound } from './soundutils.js';
import { pixelToSeconds } from './utils.js';

// The AudioContext object is the main "entry point" into the Web Audio API
let ctx;


/*
const soundURL =
    'https://mainline.i3s.unice.fr/WAMSampler2/audio/808/Maracas%20808.wav';
let decodedSound;
*/
const soundURLs = [
    'https://upload.wikimedia.org/wikipedia/commons/a/a3/Hardstyle_kick.wav',
    'https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c7/Redoblante_de_marcha.ogg/Redoblante_de_marcha.ogg.mp3',
    'https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c9/Hi-Hat_Cerrado.ogg/Hi-Hat_Cerrado.ogg.mp3',
    'https://upload.wikimedia.org/wikipedia/commons/transcoded/0/07/Hi-Hat_Abierto.ogg/Hi-Hat_Abierto.ogg.mp3',
    'https://upload.wikimedia.org/wikipedia/commons/transcoded/3/3c/Tom_Agudo.ogg/Tom_Agudo.ogg.mp3',
    'https://upload.wikimedia.org/wikipedia/commons/transcoded/a/a4/Tom_Medio.ogg/Tom_Medio.ogg.mp3',
    'https://upload.wikimedia.org/wikipedia/commons/transcoded/8/8d/Tom_Grave.ogg/Tom_Grave.ogg.mp3',
    'https://upload.wikimedia.org/wikipedia/commons/transcoded/6/68/Crash.ogg/Crash.ogg.mp3',
    'https://upload.wikimedia.org/wikipedia/commons/transcoded/2/24/Ride.ogg/Ride.ogg.mp3'
];

let decodedSounds = [];


let canvas, canvasOverlay;
// waveform drawer is for drawing the waveform in the canvas
// trimbars drawer is for drawing the trim bars in the overlay canvas

let waveformDrawer, trimbarsDrawer;
let mousePos = { x: 0, y: 0 }

window.onload = async function init() {
    ctx = new AudioContext();

    // Build the preset menu
    let presetMenu = await loadAndBuildMenu();
    // select by default the first preset
    presetMenu.value = 0;

    presetMenu.onchange = async () => {
        const selectedIndex = presetMenu.value;
        console.log("Selected preset index/name: " + selectedIndex, presets[selectedIndex].name);

        // load the sound files for this preset
        decodedSounds = await loadPresetSoundFiles(presets, selectedIndex);
    }

    async function loadPresetSoundFiles(presets, index) {
        // URIS are like http://localhost:3000/presets/808/Kick%20808X.wav
        const BASE_PRESET_URI = "http://localhost:3000/presets";

        // build the URIs of the sound files for this preset
        const soundFileURIs = presets[index].samples.map(sample => {
            return encodeURI(`${BASE_PRESET_URI}/${sample.url}`);
        });

        console.log("Sound file URIs for preset " + presets[index].name + " : ", soundFileURIs);

        let decodedSounds = await decodeAllSounds(soundFileURIs, ctx);
        // We now have an array of sound file URIs
        // You can use them to load and play the sounds as needed
        buildButtonsAndWaveform(presets[index], decodedSounds);

        return decodedSounds;
    }

    // two canvas : one for drawing the waveform, the other for the trim bars
    canvas = document.querySelector("#myCanvas");
    canvasOverlay = document.querySelector("#myCanvasOverlay");

    // create the waveform drawer and the trimbars drawer
    waveformDrawer = new WaveformDrawer();
    trimbarsDrawer = new TrimbarsDrawer(canvasOverlay, 0, canvasOverlay.width);

    // load and decode the sound
    // this is asynchronous, we use await to wait for the end of the loading and decoding
    // before going to the next instruction
    // Note that we cannot use await outside an async function
    // so we had to declare the init function as async
    decodedSounds = await loadPresetSoundFiles(presets,0);
    console.log("##### Decoded sounds for preset 0: ", decodedSounds);

    // For simplicity, we display and trim only the first sound
    let decodedSound = decodedSounds[0];

   
    function buildButtonsAndWaveform(currentPreset, decodedSounds) {
        // we generate all buttons for playing all sounds
        const buttonsContainer = document.getElementById("buttonContainer");
        buttonsContainer.innerHTML = ""; // clear previous buttons

        decodedSounds.forEach((decodedSound, index) => {
            const button = document.createElement("button");
            //button.textContent = `Play sound ${index + 1}`;
            button.textContent = currentPreset.samples[index].name; 
            buttonsContainer.appendChild(button);

            // Event listener for the button. When the button is pressed, we play the sound
            button.onclick = function (evt) {
                // get start and end time (in seconds) from trim bars position.x (in pixels)
                let start = pixelToSeconds(trimbarsDrawer.leftTrimBar.x, decodedSound.duration, canvas.width);
                let end = pixelToSeconds(trimbarsDrawer.rightTrimBar.x, decodedSound.duration, canvas.width);
                console.log("start: " + start + " end: " + end);
                // from utils.js

                playSound(ctx, decodedSound, start, end);
                waveformDrawer.init(decodedSound, canvas, '#83E83E');
                waveformDrawer.clear();

                waveformDrawer.drawWave(0, canvas.height);
            };
        });

    }

    // Load preset 0 by default
    buildButtonsAndWaveform(presets[0], decodedSounds);

    // declare mouse event listeners for ajusting the trim bars
    // when the mouse moves, we check if we are close to a trim bar
    // if so: highlight it!
    // if a trim bar is selected and the mouse moves, we move the trim bar
    // when the mouse is pressed, we start dragging the selected trim bar (if any)
    // when the mouse is released, we stop dragging the trim bar (if any)
    canvasOverlay.onmousemove = (evt) => {
        // get the mouse position in the canvas
        let rect = canvas.getBoundingClientRect();

        mousePos.x = (evt.clientX - rect.left);
        mousePos.y = (evt.clientY - rect.top);

        // When the mouse moves, we check if we are close to a trim bar
        // if so: move it!
        trimbarsDrawer.moveTrimBars(mousePos);
    }

    canvasOverlay.onmousedown = (evt) => {
        // If a trim bar is close to the mouse position, we start dragging it
        trimbarsDrawer.startDrag();
    }

    canvasOverlay.onmouseup = (evt) => {
        // We stop dragging the trim bars (if they were being dragged)
        trimbarsDrawer.stopDrag();
    }

    // start the animation loop for drawing the trim bars
    requestAnimationFrame(animate);
};

// Animation loop for drawing the trim bars
// We use requestAnimationFrame() to call the animate function
// at a rate of 60 frames per second (if possible)
// see https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
function animate() {
    // clear overlay canvas;
    trimbarsDrawer.clear();

    // draw the trim bars
    trimbarsDrawer.draw();

    // redraw in 1/60th of a second
    requestAnimationFrame(animate);
}



