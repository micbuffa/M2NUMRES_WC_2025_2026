### Exercise 1
 1. Look at "WebAudioExample1_load_decode_audio_sample_file", study the code. Try to replace the single URI of the sound by an array of sounds like this one : 
 ```js
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
]
 ```
 ... and load and decode the sounds using Promise.all (see course about JavaScript Promises). For each sound, generate a PLAY button on the fly.

### Exercise 2
Study "WebAudioExample2_display_waveform_and_trim_controls". Take some time looking at the different files... Play with the trim bars...

Your Work : make it work with a set of sound samples instead of just one simple sound:
1. Modify the example by adding the array of sounds + code from the previous exercice.
1. When a PLAY button for a sound is clicked, show its waveform and trimbars.
1. Try to store for each sound  the trim bar positions before playing each sound. When another sound is played, the stored position of its trim bars should be seen.
1. Think about a better design... maybe with a class for each sound?

### Exercise 3
Your work : instead of having the soundURLs array hard coded, run the nodeJS application from the "API" folder, that can send a list of presets from its REST Web Services, build the URIs of the sound files from the results, and load them. You can look at how the client in the sub folders under the API folders are done.

You will need:
1. to run the server. Run with "npm run start", then open the URI "localhost:3000/api/presets" and check that you get a JSON description of all the presets.
1. Modify main.js from Exercice2 to fetch this URI in order to fill properly the soundURLs array. YOU WILL START with just the files from the first preset. Remember to use the browser devtools (ctrl-shift-i or cmd-option-i on Mac), with the "network" tab open, show only fetch/XhR requests. Look that the data coming from the server in the debugger. This will help you verify the server response format. You can look also at the example with the dropdown menu to understand how to work with fetched data...
1. Your example should work now with the presets from your server.
1. Try to build a drop down menu with the names of the preset. When an preset is selected in the drop down menu,then fill the soundURLs array with the URIs of the audio files corresponding to this preset. ChatGPT/Copilot in agent mode can help, or any good tutorial on HTML drop down menus.

### Exercise 4

Look at "WebAudioExample4_a_real_WAM_sampler":  it shows a WAM Sampler at the end of the page. See it as an possible example of what you are going to develop during this course. Play with it, look at how it has been loaded in the page (see file host.js). See how the GUI and the processing part are clearly separated. See how it behaves like any simple AudioNode from the Web Audio API (it can be connected the same way to the audio graph), while obviously, it is made of its own Web Audio graph with dozens of nodes... Did this reminds you a Design Pattern?
