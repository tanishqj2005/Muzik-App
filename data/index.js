export const sounds = [
  {
    id: 1,
    title: "OneRepublic",
    artist: "Counting Stars",
    source: require("./sounds/countingstars.mp3"),
    artwork: require("./artworks/countingstars.jpg"),
  },
  {
    id: 2,
    title: "Riptide",
    artist: "Vance Joy",
    source: require("./sounds/riptide.mp3"),
    artwork: require("./artworks/riptide.jpg"),
  },
  {
    id: 3,
    title: "Violin Sonata No. 2 in A minor BWV.1003",
    artist: "Johann Sebastian Bach",
    source: require("./sounds/violinsonata.mp3"),
    artwork: require("./artworks/violinsonata.jpg"),
  },
];

export const playlist = [
  {
    id: 1,
    title: "Pop",
    items: [1, 3],
  },
  {
    id: 2,
    title: "Road",
    items: [1, 2, 3],
  },
];
