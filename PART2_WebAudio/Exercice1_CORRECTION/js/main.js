import { start as loadAndBuildMenu } from '../../Exercice2_CORRECTION/js/buildMenu.js';

// About imports and exports in JavaScript modules
// see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
// and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
// and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export

// "named" imports from utils.js and soundutils.js
import { loadAndDecodeSound, playSound } from './soundutils.js';

// The AudioContext object is the main "entry point" into the Web Audio API
let ctx;

//const soundURL =
//   'https://mainline.i3s.unice.fr/mooc/shoot2.mp3';
//let decodedSound;

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

window.onload = async function init() {
    ctx = new AudioContext();



    // load and decode the sound
    // this is asynchronous, we use await to wait for the end of the loading and decoding
    // before going to the next instruction
    // Note that we cannot use await outside an async function
    // so we had to declare the init function as async
    //decodedSound = await loadAndDecodeSound(soundURL, ctx);

    // load and decode all sounds
    // version sans parallelime
    /*
    for (let i = 0; i < soundURLs.length; i++) {
        let decodedSound = await loadAndDecodeSound(soundURLs[i], ctx);
        decodedSounds.push(decodedSound);
    }
        */

    // Version avec parallélisme (Promise.all)
    
    let promiseArray = soundURLs.map(url => loadAndDecodeSound(url, ctx));
    decodedSounds = await Promise.all(promiseArray);
    
    // On genere autant de boutons que de sons
    const buttonsContainer = document.getElementById("buttonsContainer");

    decodedSounds.forEach((decodedSound, index) => {
        const button = document.createElement("button");
        button.textContent = `Play sound ${index + 1}`;
        button.addEventListener("click", () => {
            playSound(ctx, decodedSound, 0, decodedSound.duration);
        });
        buttonsContainer.appendChild(button);
    });
}
