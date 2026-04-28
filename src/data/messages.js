// Seed messages use `minutesAgo` (relative to "now") rather than absolute
// timestamps. Absolute timestamps computed at import would freeze and
// silently drift over time. AppContext converts these to absolute
// timestamps when the app boots.
const seedMessages = {
  1: [
    { id: 1, text: 'hey! you said you hike — what\'s your favorite trail?', sender: 'them', minutesAgo: 60 * 48 },
    { id: 2, text: 'omg hi! breakneck ridge is my obsession lately', sender: 'me', minutesAgo: 60 * 48 - 1 },
    { id: 3, text: 'okay you have great taste already', sender: 'them', minutesAgo: 60 * 48 - 1.5 },
    { id: 4, text: 'haha thanks 😊 you?', sender: 'me', minutesAgo: 60 * 48 - 2 },
    { id: 5, text: 'bear mountain mostly, but i\'ve been wanting to do breakneck', sender: 'them', minutesAgo: 60 * 24 - 1 },
    { id: 6, text: 'we should go!', sender: 'them', minutesAgo: 60 * 24 - 1.5 },
    { id: 7, text: 'i\'m down. saturday?', sender: 'me', minutesAgo: 60 * 6 },
    { id: 8, text: 'saturday works! 9am too early?', sender: 'them', minutesAgo: 60 * 5 },
    { id: 9, text: 'perfect actually, i\'ll bring coffee ☕', sender: 'me', minutesAgo: 60 * 4 },
    { id: 10, text: 'okay this is shaping up to be a great date', sender: 'them', minutesAgo: 30 },
    { id: 11, text: 'is it a date now? 👀', sender: 'me', minutesAgo: 25 },
  ],
  2: [
    { id: 1, text: 'hey, i see you climb! gunks or red river?', sender: 'me', minutesAgo: 60 * 72 },
    { id: 2, text: 'gunks all day. you?', sender: 'them', minutesAgo: 60 * 72 - 0.5 },
    { id: 3, text: 'just started, mostly gym climbing right now', sender: 'me', minutesAgo: 60 * 72 - 1 },
    { id: 4, text: 'nice! what gym?', sender: 'them', minutesAgo: 60 * 72 - 1.5 },
    { id: 5, text: 'brooklyn boulders dumbo', sender: 'me', minutesAgo: 60 * 48 },
    { id: 6, text: 'oh i\'m there all the time, we should climb sometime', sender: 'them', minutesAgo: 60 * 48 - 1 },
    { id: 7, text: 'i\'d love that, but fair warning i\'m bad', sender: 'me', minutesAgo: 60 * 24 - 1 },
    { id: 8, text: 'i\'ll teach you, no judgement 😄', sender: 'them', minutesAgo: 60 * 24 - 1.5 },
    { id: 9, text: 'okay deal. tuesday after work?', sender: 'me', minutesAgo: 60 * 8 },
    { id: 10, text: 'tuesday works. 7pm?', sender: 'them', minutesAgo: 60 * 2 },
  ],
  3: [
    { id: 1, text: 'late night ramen — please tell me you know about totto', sender: 'me', minutesAgo: 60 * 120 },
    { id: 2, text: 'OBVIOUSLY. i\'ve been there twice this week alone', sender: 'them', minutesAgo: 60 * 120 - 1 },
    { id: 3, text: 'you\'re my person', sender: 'me', minutesAgo: 60 * 120 - 1.5 },
    { id: 4, text: 'haha okay slow down 😂', sender: 'them', minutesAgo: 60 * 120 - 2 },
    { id: 5, text: 'sorry sorry. but the spicy miso?', sender: 'me', minutesAgo: 60 * 96 },
    { id: 6, text: 'top 3 ramen in the city, easy', sender: 'them', minutesAgo: 60 * 96 - 0.5 },
    { id: 7, text: 'what\'s 1 and 2', sender: 'me', minutesAgo: 60 * 96 - 1 },
    { id: 8, text: 'ichiran (don\'t @ me) and ippudo east village', sender: 'them', minutesAgo: 60 * 72 },
    { id: 9, text: 'controversial but i\'ll allow it', sender: 'me', minutesAgo: 60 * 72 - 0.5 },
    { id: 10, text: 'we should ramen tour. i have a list.', sender: 'them', minutesAgo: 60 * 24 - 1 },
    { id: 11, text: 'send the list. i\'m IN.', sender: 'me', minutesAgo: 60 },
    { id: 12, text: 'incoming...', sender: 'them', minutesAgo: 45 },
  ],
};

export default seedMessages;
