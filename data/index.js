export const sounds = [
  {
    id: 1,
    title: "Banjara",
    artist: "Mohammed Irfan",
    artwork: require("./artworks/banjara.jpg"),
    source: require("./sounds/banjara.mp3"),
  },
  {
    id: 2,
    title: "Guzarish",
    artist: "Javed Ali",
    artwork: require("./artworks/guzarish.png"),
    source: require("./sounds/guzarish.mp3"),
  },
  {
    id: 3,
    title: "Qaafirana",
    artist: "Arijit Singh",
    artwork: require("./artworks/qafirana.jpg"),
    source: require("./sounds/qafirana.mp3"),
  },
  {
    id: 4,
    title: "Roop Tera Mastana",
    artist: "Sanam",
    artwork: require("./artworks/roopTeraMastana.png"),
    source: require("./sounds/roopTeraMastana.mp3"),
  },
  {
    id: 5,
    title: "Tera Hone Laga Hoon",
    artist: "Atif Aslam",
    artwork: require("./artworks/terahonelaga.jpg"),
    source: require("./sounds/terahonelaga.mp3"),
  },
];

export const playlist = [
  {
    id: 1,
    title: "Bollywood",
    items: [2, 4],
  },
  {
    id: 2,
    title: "Relax",
    items: [1, 3, 5],
  },
  {
    id: 3,
    title: "Love",
    items: [1, 2, 3, 4],
  },
];
