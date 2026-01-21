
import "./libs/webaudiocontrols.js";

let style = `
<style>
#container {
        display: inline-block;
        border: 2px solid #666;
        border-radius: 10px;
        padding: 10px;
        background-color: #e0e0e0;
    }

    audio {
        border: 2px solid #333;
        border-radius: 5px;
        padding: 5px;
        background-color: #f0f0f0;
    }
</style>
`;
let html = `  
<div id="container">     
    <audio id="myplayer" src=""></audio>
    <button id="playbtn">Play</button>
    <button id="pausebtn">Pause</button>
    <br>
    <label>
        Volume:
        <input type="range" id="volumeslider" min="0" max="1" step="0.01" value="0.5">
    </label>   
    <webaudio-knob id="knobVolume" min=0 max=1 step=0.01 value=0.5
                   
                   midilearn=true
                   src="./assets/images/MonBouton.png"
    >
    </webaudio-knob>
</div> 
<script> 
`;
const getBaseURL = () => {
    return new URL('.', import.meta.url);
};


class MyAudioPlayer extends HTMLElement {
    constructor() {
        super();
        // On crée un shadow DOM: le HTML contenu dans le shadow DOM ne sera pas affecté par 
        // les styles CSS de la page hôte, et ne sera visible dans le debugger que si on coche 
        // la case dans les options du debugger "Show user agent shadow DOM"
        this.attachShadow({ mode: 'open' });

        // On récupère l'attribut src qui contient l'URL du fichier audio à lire
        this.src = this.getAttribute('src');
        console.log("AudioPlayer: src attribute = ", this.src);
    }

    connectedCallback() {
        // Cette méthode est appelée lorsque le composant est inséré dans la page HTML
        // on ajoute du HTML et du CSS dans le shadow DOM
        this.shadowRoot.innerHTML = style + html;

        // on initialise le src de l'élément audio
        const audioElement = this.shadowRoot.querySelector('#myplayer');
        audioElement.src = this.src;

        // on définit les listeners pour les boutons et le slider
        this.defineListeners();

        // on résoud les chemins relatifs pour les assets
        console.log("Base URL for web component assets: ", getBaseURL());
        this.resolveAssetPaths();
    }

    resolveAssetPaths() {
        let images = this.shadowRoot.querySelectorAll('img, webaudio-knob, webaudio-slider, webaudio-switch');
        images.forEach((e) => {
            let imagePath = e.getAttribute('src');
            e.src = getBaseURL() + '/' + imagePath;
        });
    }

    defineListeners() {
        const audioElement = this.shadowRoot.querySelector('#myplayer');
        const playButton = this.shadowRoot.querySelector('#playbtn');
        const pauseButton = this.shadowRoot.querySelector('#pausebtn');

        playButton.addEventListener('click', () => {
            audioElement.play();
        });

        pauseButton.addEventListener('click', () => {
            audioElement.pause();
        });

        const volumeKnob = this.shadowRoot.querySelector('#knobVolume');
        volumeKnob.addEventListener('input', (event) => {
            audioElement.volume = event.target.value;
        });
    }
}
// On définit le nouveau composant web avec le nom 'my-audio-player'
customElements.define('my-audio-player', MyAudioPlayer);