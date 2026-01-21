# Custom Web Audio Controller for DJ

### Gautier BENOIT

Bienvenue dans le projet **Custom Web Audio Controller for DJ** ! Ce projet est une application web interactive permettant de contrôler et de visualiser des pistes audio en temps réel, spécialement conçue pour les DJ et les amateurs de musique.

Vidéo de présentation : [Youtube](https://youtu.be/7cEFheNyqG4)

## Fonctionnalités

- **Lecture et contrôle audio** : Jouez, mettez en pause, arrêtez, couper le volume, mettre en boucle (loop) et changez de piste audio.
- **Visualiseur de fréquence** : Visualisez les fréquences audio en temps réel avec un visualiseur interactif.
- **Contrôle du volume et du gain** : Ajustez le volume et le gain de la piste audio.
- **Contrôle de la balance** : Modifiez la balance stéréo de la piste audio.
- **Contrôle de la vitesse de lecture** : Changez la vitesse de lecture de la piste audio.
- **Support MIDI** : Contrôlez l'application avec des périphériques MIDI.
- **Liste de lecture** : Sélectionnez des pistes audio à partir d'une liste de lecture et ajouter de nouveaux sons via fichier.
- **Interface utilisateur interactive et visuelle** : Cliquez sur le visualiseur pour changer la position de lecture de la piste audio.
- **Butterchurn Visualizer** : Visualisations fluides et psychédéliques générées par la librairie Butterchurn en web component, possibilité de modifier/choisir le preset de la visualisation.
- **WAM Equalizer** : Égaliseur audio en *web audio module* pour ajuster les fréquences audio. Un equalizer par piste audio.

## Structure du Projet

Le projet est divisé en plusieurs parties :
- assets/
- components/
  - libs/
    - webaudio-controls.js
    - butterchurn.js
    - butterchurn-presets.js
  - AudioController.js
  - audio-controller.html
  - FrequencyVisualizer.js
  - freq-visualizer.html
  - PlaylistComponent.js
  - ButterchurnVisualizer.js
  - butterchurn-visualizer.html
  - EqualizerComponent.js
- js/
  - midi.js
- styles/
  - index.css
- index.html
- README.md

### Détails des Composants

- **`AudioController.js`** : Ce fichier contient la logique principale pour contrôler les pistes audio, y compris la lecture, la pause, l'arrêt, le changement de piste, et l'ajustement du volume, du gain, de la balance et de la vitesse de lecture.
- **`FrequencyVisualizer.js`** : Ce fichier contient la logique pour visualiser les fréquences audio en temps réel.
- **`ButterchurnVisualizer.js`** : Composant responsable des visualisations fluides et psychédéliques générées par la librairie Butterchurn.
- **`PlaylistComponent.js`** : Gestion de la liste de lecture avec support pour l'ajout de fichiers audio.
- **`midi.js`** : Intégration du contrôle MIDI avec support étendu pour les contrôleurs DJ.
- **`EqualizerComponent.js`** : Composant pour l'égaliseur audio en *web audio module* pour ajuster les fréquences audio en fonction des pistes audio, possibilité de le déplacer partout dans la fênètre.

## Installation

1. Clonez le dépôt :
   ```sh
   git clone https://github.com/gautier-benoit/CustomWebAudioControllerDJ.git
    ```
2. Ouvrez le fichier `index.html` dans votre navigateur avec LivePreview ou LiveServer pour lancer l'application.

3. Ou sinon version en ligne (nécéssite peut être de dézoomer) : [Custom Web Audio Controller for DJ Online](https://gautier-benoit.github.io/CustomWebAudioControllerDJ/)

## Utilisation

- Lecture et Pause : Utilisez les boutons de lecture et de pause pour contrôler la piste audio.
- Changer de Piste : Sélectionnez une piste dans le sélecteur de musique (playlist) pour changer de piste.
- Visualiseur de Fréquence : Regardez les fréquences audio en temps réel et cliquez sur le visualiseur pour changer la position de lecture.
- Contrôles de Volume et de Gain : Utilisez les curseurs pour ajuster le volume et le gain.
- Contrôle de la Balance : Utilisez le curseur de balance pour ajuster la balance stéréo.
- Contrôle de la Vitesse de Lecture : Utilisez le curseur de vitesse pour changer la vitesse de lecture.
- Support MIDI : Connectez un périphérique MIDI pour contrôler l'application.
- Butterchurn Visualizer : Choisissez un preset de visualisation et regardez les visualisations fluides et psychédéliques.
- WAM Equalizer : Ajustez les fréquences audio avec l'égaliseur audio en *web audio module*.
- Playlist : Ajoutez de nouveaux sons à la liste de lecture en cliquant sur le bouton "Ajouter des musiques".
- Platine : Utilisez votre souris pour déplacer, "squizzer" la platine et changer la position de lecture.


## Captures d'écran

![Interface de l'application](./assets/Interface.png)
