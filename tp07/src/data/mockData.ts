import type { Story, SuggestedUser } from "../types";

export const CAT_API_KEY = "live_4l9vFZSPAlJz2cIyxtaUr65SlZEwu9HCkeLR64j5I7Ybhvw0RUKAVBfpUlm7guGE";

export const stories: Story[] = [
  { id: 1, username: "Your Story", avatar: "https://i.pravatar.cc/56?img=1", hasStory: false },
  { id: 2, username: "fluffy_cats",  avatar: "https://i.pravatar.cc/56?img=2", hasStory: true },
  { id: 3, username: "meow.world",   avatar: "https://i.pravatar.cc/56?img=3", hasStory: true },
  { id: 4, username: "cat.lovers",   avatar: "https://i.pravatar.cc/56?img=4", hasStory: true },
  { id: 5, username: "purr.daily",   avatar: "https://i.pravatar.cc/56?img=5", hasStory: true },
  { id: 6, username: "kitty_hq",     avatar: "https://i.pravatar.cc/56?img=6", hasStory: true },
  { id: 7, username: "pawsome.pics", avatar: "https://i.pravatar.cc/56?img=7", hasStory: true },
  { id: 8, username: "cats.of.ig",   avatar: "https://i.pravatar.cc/56?img=8", hasStory: true },
];

export const suggestedUsers: SuggestedUser[] = [
  { id: 1, username: "meow.daily",    avatar: "https://i.pravatar.cc/32?img=20", subtitle: "Suggested for you" },
  { id: 2, username: "cat.universe",  avatar: "https://i.pravatar.cc/32?img=21", subtitle: "Followed by fluffy_cats" },
  { id: 3, username: "kittenpics",    avatar: "https://i.pravatar.cc/32?img=22", subtitle: "Suggested for you" },
  { id: 4, username: "persianlovers", avatar: "https://i.pravatar.cc/32?img=23", subtitle: "Followed by 8 others" },
  { id: 5, username: "feline.art",    avatar: "https://i.pravatar.cc/32?img=24", subtitle: "Suggested for you" },
];

export const postMeta = [
  { username: "fluffy_cats",  avatar: "https://i.pravatar.cc/32?img=10", caption: "Durmiendo todo el día.",    hashtags: "#CatNap #LazyDay #Cats",        likes: 12480, comments: 342, time: "2 HOURS AGO" },
  { username: "meow.world",   avatar: "https://i.pravatar.cc/32?img=11", caption: "Ojos que lo dicen todo.",   hashtags: "#CatEyes #Hypnotized #Felinos",  likes: 8930,  comments: 210, time: "4 HOURS AGO" },
  { username: "purr.daily",   avatar: "https://i.pravatar.cc/32?img=12", caption: "Conquistó el sillón.",      hashtags: "#CatLife #KingOfCouch #Meow",    likes: 21340, comments: 587, time: "6 HOURS AGO" },
  { username: "kitty_hq",     avatar: "https://i.pravatar.cc/32?img=13", caption: "Lunes? No gracias.",        hashtags: "#MondayCat #NoThanks #Feline",   likes: 6720,  comments: 198, time: "9 HOURS AGO" },
  { username: "pawsome.pics", avatar: "https://i.pravatar.cc/32?img=14", caption: "Pura ternura gatuna.",      hashtags: "#Kitten #TooMuchCute #Adorable", likes: 33100, comments: 901, time: "12 HOURS AGO" },
];