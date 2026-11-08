export const film = {
  title: "Adire: People & Process",
  creator: "Waliyy",
  runtime: "6:52",
  runtimeLong: "6 minutes 52 seconds",
  format: "Short documentary essay",
  year: null,
  contact: "waliyyajala@gmail.com",
  description:
    "Adire: People & Process is a short documentary essay exploring the shared history of Adire textile and its place within British art history.",
  synopsis: [
    "Inspired by a love for fashion and its impact on human lives, the film traces Adire’s endurance and evolution into a symbol of modern identity in Nigerian and British cultures.",
    "Through narration, archival footage, and selected interviews, the film explores identity, reclamation, acceptance, and cultural evolution.",
  ],
  media: {
    video: "/assets/Trailer.mp4",
    poster: "/assets/Adire-dyeing-process.jpeg",
    hero: {
      src: "/assets/Adire-dyeing-process.jpeg",
      srcSet:
        "/assets/optimized/Adire-dyeing-process-480.jpeg 480w, /assets/Adire-dyeing-process.jpeg 930w",
      alt: "A textile artist working indigo-dyed cloth by hand in a dyeing studio.",
      width: 930,
      height: 526,
      position: "center center",
    },
    overview: {
      src: "/assets/Adire-textile-detail.jpeg",
      srcSet:
        "/assets/optimized/Adire-textile-detail-480.jpeg 480w, /assets/Adire-textile-detail.jpeg 937w",
      alt: "A detailed indigo Adire textile featuring layered figurative and geometric patterns.",
      width: 937,
      height: 509,
      position: "center center",
    },
    portrait: {
      src: "/assets/optimized/waliyy-portrait-1024.jpg",
      srcSet:
        "/assets/optimized/waliyy-portrait-640.jpg 640w, /assets/optimized/waliyy-portrait-1024.jpg 1024w",
      alt: "Portrait of Waliyy standing against a stone wall, wearing a brown suit and adjusting his tie.",
      width: 1024,
      height: 1536,
      position: "center 30%",
    },
  },
};

export const navigation = [
  { label: "Overview", href: "#overview" },
  { label: "Story", href: "#story" },
  { label: "Archive", href: "#archive" },
  { label: "Waliyy", href: "#statement" },
  { label: "Press", href: "#press" },
];

export const storyThemes = [
  {
    title: "Origins & Identity",
    copy:
      "Rooted in Yoruba textile culture, Adire carries knowledge through cloth—in pattern, dye, and the hands that shape both. The film approaches textile as a living record of identity.",
    image: {
      src: "/assets/Adire-textile-detail.jpeg",
      srcSet:
        "/assets/optimized/Adire-textile-detail-480.jpeg 480w, /assets/Adire-textile-detail.jpeg 937w",
      alt: "An indigo Adire textile with layered figurative and geometric patterns.",
      width: 937,
      height: 509,
    },
  },
  {
    title: "Adaptation & Resistance",
    copy:
      "As cultural and economic conditions changed under colonial influence, makers adapted traditional methods to new pressures. The film considers women’s ingenuity, and how practice could become a means of continuity and economic resistance.",
    image: {
      src: "/assets/Adire-dyeing-process.jpeg",
      srcSet:
        "/assets/optimized/Adire-dyeing-process-480.jpeg 480w, /assets/Adire-dyeing-process.jpeg 930w",
      alt: "A textile artist working indigo-dyed cloth by hand in a dyeing studio.",
      width: 930,
      height: 526,
    },
  },
  {
    title: "Reinvention & Recognition",
    copy:
      "Adire’s story does not stand still. Its methods and meanings continue to shift across fashion, art, and the different contexts in which Nigerian and British artistic identity are understood.",
    image: {
      src: "/assets/Adire-contemporary-fashion.jpeg",
      srcSet:
        "/assets/optimized/Adire-contemporary-fashion-480.jpeg 480w, /assets/Adire-contemporary-fashion.jpeg 938w",
      alt: "Contemporary tie-dyed clothing and materials arranged on a work table.",
      width: 938,
      height: 526,
    },
  },
  {
    title: "Reclaiming Identity",
    copy:
      "Across these changes, the film returns to a central question: who gets to define the cultural life of a textile? Adire is a material through which identity can be claimed again.",
    image: {
      src: "/assets/Adire-pattern-grid.jpeg",
      srcSet:
        "/assets/optimized/Adire-pattern-grid-480.jpeg 480w, /assets/Adire-pattern-grid.jpeg 932w",
      alt: "A grid of hand-rendered Adire textile motifs in indigo and pale blue.",
      width: 932,
      height: 474,
    },
  },
];

export const archiveImages = storyThemes.map(({ image, title }) => ({
  ...image,
  title,
}));

export const creatorStatement = [
  "Last year, I spent months preparing an article for Vogue Business. When it was published, I realised that the paywall limited the audience—and the conversations—I had hoped it might reach. That experience made me think more deeply about how people discover and engage with stories.",
  "I have always loved film, and I began to see moving images as another way to communicate ideas. When an opportunity to make a film arose, I asked myself how I might bring my love of writing and cinema together. Adire: People & Process grew from that question.",
];

export const creatorBio = {
  introduction:
    "Waliyy is a writer and multidisciplinary artist whose work explores African identity, development, and cultural history.",
  details: [
    "He was a finalist in the Vogue Business Talent Competition and is a recipient of the British Art in Motion Grant.",
    "He graduated with an LLB in law from the University of Surrey. His legal academic background contributes to his research-led approach to historical storytelling.",
  ],
};

export const pressFacts = [
  { term: "Title", detail: film.title },
  { term: "Format", detail: film.format },
  { term: "Runtime", detail: film.runtimeLong },
  { term: "Creator", detail: film.creator },
];
