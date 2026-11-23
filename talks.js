/*
  In his own words: the talks and the shapes in them, as data. talks-page.js draws the page from this.

  TALKS is the list of sources, in date order. SHAPES is the list of ideas he keeps returning to.
  The page is organised by shape; the talks give each shape its year strip and the sources list.

  To add a talk:
  1. Add one object to TALKS, in date order: year (also its id), venue, url (plain watch URL),
     videoId (the v= value), captionType ('channel' or 'auto' for YouTube auto-generated), runtime.
  2. Read its transcript and add its year to each shape's counts (clear moments on that shape, 0 if none).
     Every year strip gains a new tick on its own.
  3. If a passage is better than one already on a shape, swap it in. Each shape keeps three moments.
  4. Add the talk to the plain list inside <noscript> in talks.html.

  Each moment: talk (the year), t (the second the passage starts on YouTube), setup (one sentence under
  18 words ending in a colon, saying what he had just been asked or was talking about, taken from the
  lines before the passage), quote (the full thought, about 40 to 90 words, exact from the captions;
  for auto captions fix only punctuation and capitals; one ellipsis at most, only to cut filler),
  note (one line under 12 words, or '' when setup and passage already say it).
  A second talk in the same year needs an id (for example '1991-12'); its moments and counts then use that id
  instead of the year, and the year strips add the two together.
  Each moment also carries key (the one sentence to underline, copied exactly from its quote) and one moment per
  shape carries lead: true (shown open; the others fold). changed is one line on how the idea moved over the years.
  The count line and the sources sentence update themselves.
*/
window.TALKS = [
  { year: 1981, venue: 'Television interview', url: 'https://www.youtube.com/watch?v=DbfejwP1d3c', videoId: 'DbfejwP1d3c', captionType: 'auto', runtime: '19:40' },
  { year: 1983, venue: 'International Design Conference, Aspen', url: 'https://www.youtube.com/watch?v=t9HmOz8H0qI', videoId: 't9HmOz8H0qI', captionType: 'channel', runtime: '55:14' },
  { year: 1986, venue: 'NeXT retreats, Pebble Beach', url: 'https://www.youtube.com/watch?v=s-a4aU1RUgM', videoId: 's-a4aU1RUgM', captionType: 'channel', runtime: '20:12' },
  { year: 1991, venue: 'Interview on ten years of the PC', url: 'https://www.youtube.com/watch?v=OzZB5pZTslE', videoId: 'OzZB5pZTslE', captionType: 'channel', runtime: '21:40' },
  { year: 1991, id: '1991-12', venue: 'Interview on Joseph Juran and quality', url: 'https://www.youtube.com/watch?v=XbkMcvnNq3g', videoId: 'XbkMcvnNq3g', captionType: 'auto', runtime: '19:18' },
  { year: 1992, venue: 'MIT, Distinguished Speaker Series', url: 'https://www.youtube.com/watch?v=YXUhLbV8Nrg', videoId: 'YXUhLbV8Nrg', captionType: 'auto', runtime: '1:12:53' },
  { year: 1995, venue: 'Triumph of the Nerds, the Lost Interview', url: 'https://www.youtube.com/watch?v=Bbwj58Xj2yI', videoId: 'Bbwj58Xj2yI', captionType: 'auto', runtime: '1:11:08', film: 'https://www.youtube.com/watch?v=tBh5_j4a1yo' },
  { year: 1997, venue: 'Apple staff meeting, introducing Think Different', url: 'https://www.youtube.com/watch?v=keCwRdbwNQY', videoId: 'keCwRdbwNQY', captionType: 'auto', runtime: '7:00' },
  { year: 1998, venue: 'iMac satellite tour', url: 'https://www.youtube.com/watch?v=8a5KSoOUT_U', videoId: '8a5KSoOUT_U', captionType: 'auto', runtime: '10:29' },
  { year: 2008, venue: 'iPhone 3G interview', url: 'https://www.youtube.com/watch?v=qSUTHa7ssoc', videoId: 'qSUTHa7ssoc', captionType: 'auto', runtime: '4:40' }
];

window.SHAPES = [
  {
    id: 'tools', label: 'Tools', glyph: 'tools', figure: 'bicycle',
    about: 'Tools that change what\'s possible',
    name: 'Give people leverage.',
    meaning: 'Technology as human leverage.',
    changed: "1981, a tool for one person. 1991, for the team. 2008, for the employee who wants it at work.",
    counts: { 1981: 3, 1983: 4, 1986: 2, 1991: 1, 1992: 2, 1995: 2, 1997: 0, 1998: 1, 2008: 1 },
    moments: [
      { talk: 1981, t: 358, setup: "Asked what kind of person needs a personal computer, he tells a story about a condor:",
        quote: "But someone there had the insight to test the efficiency of man riding a bicycle, and man riding a bicycle was twice as good as the condor, all the way off the end of the list. And what it really illustrated was man's ability as a tool maker to fashion a tool that can amplify an inherent ability that he has. And that's exactly what we think we're doing. We think we're basically fashioning a 21st century bicycle here.",
        key: "We think we're basically fashioning a 21st century bicycle here.", lead: true, note: "" },
      { talk: 1986, t: 1145, setup: "On why he started over at 31, remembering a classroom full of Apple IIs:",
        quote: "And when it finally got into the hands of a lot of people, uh, it blossomed out of this tiny little seed. And it seemed like an incredible uh, amount of leverage. And it all started with just an idea. … And that's an incredible feeling to know that you had something to do with it. A, and B to know it can be done. To know that you can plant something in the world and it'll grow and and change the world ever so slightly.",
        key: "To know that you can plant something in the world and it'll grow and and change the world ever so slightly.", note: "" },
      { talk: 1995, t: 517, setup: "On what he and Woz learned building blue boxes that made free calls around the world:",
        quote: "What's so interesting is that we were young, and what we learned was that we could build something ourselves that could control billions of dollars' worth of infrastructure in the world. That was what we learned. … We didn't know much. We could build a little thing that could control a giant thing, and that was an incredible lesson. I don't think there would have ever been an Apple computer had there not been blue boxing.",
        key: "We could build a little thing that could control a giant thing", note: "" }
    ],
    monday: 'Find the reason customers choose you over the alternatives, and build on it.'
  },
  {
    id: 'focus', label: 'Focus', glyph: 'focus', figure: 'focus',
    about: 'Focus is a decision',
    name: 'The power of knowing what matters.',
    meaning: 'Not everything deserves your attention.',
    changed: "A founder's bet, then an operating discipline, then plain composure.",
    counts: { 1981: 1, 1983: 1, 1986: 3, 1991: 0, 1992: 2, 1995: 1, 1997: 1, 1998: 1, 2008: 1 },
    moments: [
      { talk: 1986, t: 382, setup: "At the first NeXT retreat, 90 days in, with one market chosen:",
        quote: "So really, the next 90 days are real important. We are going to make it or break it based on whether we can provide products to higher education and services and relationships to higher education that no one else provides. And I think we ought to spend 100% of our time thinking about that. And if we can't do that, then we ought to go broke.",
        key: "And if we can't do that, then we ought to go broke.", lead: true, note: "" },
      { talk: 1992, t: 3246, setup: "On how the eight-person team at the top of NeXT decides:",
        quote: "One is we try to differentiate between the really important decisions and the ones that we don't have to make, and the really important ones we work on it till we all agree, because we're paying people to tell us what to do. … The key to making that work is to realize there's not that many things that any one team really has to decide, and we might have 25 really important things we have to decide on a year. Not a lot.",
        key: "we might have 25 really important things we have to decide on a year. Not a lot.", note: "" },
      { talk: 1995, t: 2778, setup: "Asked whether desktop publishing was obvious, he remembers Apple's January 1985 annual meeting:",
        quote: "Yes, but we also envisioned really the networked office. … I made probably the largest marketing blunder of my career by announcing the Macintosh Office instead of just desktop publishing. And we had desktop publishing as a major component of that, but we announced a bunch of other stuff as well, and I think we should have just focused on desktop publishing at that time.",
        key: "I think we should have just focused on desktop publishing at that time.", note: "" }
    ],
    monday: 'Identify the one priority you\'d bet the next 90 days on, and stop one thing competing with it.'
  },
  {
    id: 'customers', label: 'Customers', glyph: 'customer', figure: 'customers',
    about: 'Let customers show you the way',
    name: 'Build it. Listen. Learn.',
    meaning: 'Your customers may know something you don\'t.',
    changed: "Barely there in 1981. By 2008 it is every answer he gives.",
    counts: { 1981: 1, 1983: 1, 1986: 1, 1991: 2, 1992: 3, 1995: 2, 1997: 1, 1998: 2, 2008: 3 },
    moments: [
      { talk: 1992, t: 705, setup: "On how NeXT found out, a year late, what it was actually good at:",
        quote: "Some really big companies came to us and said, you don't understand what you've got. The same software that allows Lotus to create their apps five to ten times is letting us build our in-house mission-critical apps five to ten times faster, and this is the biggest problem we've had. This is a huge problem for every big company and almost all medium-sized companies, and you have the solution in your hands, and you dummies don't even know it.",
        key: "you have the solution in your hands, and you dummies don't even know it.", lead: true, note: "NeXT took three months to hear it. Be faster." },
      { talk: 2008, t: 13, setup: "Asked why a phone that is all about fun should go after the business world:",
        quote: "Well, you know, the business world has bought a lot of iPhones in the last year. Uh, there's a ton of CEOs and senior executives in, in most of the Fortune 500 companies that have iPhones, and there's a lot of employees that have them at home, and they really want to use them at work. So we've been getting a lot of requests to, to really figure out how to work with enterprise.",
        key: "they really want to use them at work.", note: "" },
      { talk: 1995, t: 1899, setup: "On the Lisa, a $10,000 computer built by engineers who had come from Hewlett-Packard:",
        quote: "Apple drifted too far away from its roots. To these Hewlett-Packard guys, $10,000 was cheap. To our market, to our distribution channels, $10,000 was impossible. So we produced a product that was a complete mismatch for the culture of our company, for the image of our company, for the distribution channels of our company, for our current customers. None of them could afford a product like that, and it failed.",
        key: "To our market, to our distribution channels, $10,000 was impossible.", note: "" }
    ],
    monday: 'Get closer to the people buying your products. Discover what they love, what frustrates them, and what they\'re missing.'
  },
  {
    id: 'simple', label: 'Simple', glyph: 'simplicity', figure: 'watch',
    about: 'Simplicity is a discipline',
    name: 'Simplicity takes work.',
    meaning: 'Less is more powerful.',
    changed: "First a hardware paradox, then a software strategy, then a product promise.",
    counts: { 1981: 1, 1983: 2, 1986: 0, 1991: 1, 1992: 2, 1995: 1, 1997: 0, 1998: 2, 2008: 0 },
    moments: [
      { talk: 1983, t: 2550, setup: "On the two ways to bring people and computers together:",
        quote: "So, gradually, the level of technical literacy is rising. The problem is we’re educating people on these garbage devices. Setting a Casio watch is really a pain still. So even though we have products like Lisa, we are still going to need to educate people about what computers are and what they do. But where we’re trying to get is we’re trying to get away from programming. We’ve got to get away from programming, because people don’t want to program computers, people want to use computers.",
        key: "people don’t want to program computers, people want to use computers.", note: "" },
      { talk: 1992, t: 1703, setup: "Explaining to MIT students why NeXT apps take a fraction of the usual time:",
        quote: "However, to do a particular app, on average you write about 20% of the code that you do in any other development environment we know of, about 20% of the code then in Sun or anything else. So the code that's the fastest to write, the code that's the easiest to maintain, and the code that never breaks is the code you don't write. So that's our strategy, right? A lot less code.",
        key: "the code that never breaks is the code you don't write.", lead: true, note: "The step you never add can never fail." },
      { talk: 1998, t: 177, setup: "Asked whether the iMac is a breakthrough:",
        quote: "I think, you know, what iMac was designed to do was to do for the Internet what the original Macintosh did for personal computing, which was to make it easy. … Its greatest power, I think, is that you can take it home, take it out of the box and be cruising the Internet within 10 minutes, and that's not something you can do on, on any other computer we know of.",
        key: "take it out of the box and be cruising the Internet within 10 minutes", note: "" }
    ],
    monday: 'Look at your packaging, product, and buying experience. Find one thing you can make simpler.'
  },
  {
    id: 'care', label: 'Care', glyph: 'excellence', figure: 'care',
    about: 'Excellence is in the details',
    name: 'Greatness is built, not advertised.',
    meaning: 'Quality speaks for itself.',
    changed: "1983, how it looks. 1992, how it is made. 1998, how it looks again.",
    counts: { 1981: 0, 1983: 3, 1986: 1, 1991: 0, '1991-12': 3, 1992: 2, 1995: 2, 1997: 1, 1998: 1, 2008: 1 },
    moments: [
      { talk: 1983, t: 489, setup: "Asking designers for help, since computers would sell by the million however they looked:",
        quote: "It doesn’t really matter, because people are going to just suck this stuff up so fast that they’re going to do it no matter what it looks like. And it doesn’t cost any more money to make it look great. There are going to be these objects, this new object that’s going to be in everyone’s working environment… And we have a shot at putting a great object there, or if we don’t, we’re going to put one more piece-of-junk object there.",
        key: "And it doesn’t cost any more money to make it look great.", lead: true, note: "" },
      { talk: 1995, t: 2107, setup: "Asked how he orders priorities when building a product, he names what hurt Apple:",
        quote: "One of the things that really hurt Apple was after I left, John Sculley got a very serious disease. … It's the disease of thinking that a really great idea is 90% of the work, and that if you just tell all these other people, “Here's this great idea,” then of course they can go off and make it happen. And the problem with that is that there's just a tremendous amount of craftsmanship in between a great idea and a great product.",
        key: "there's just a tremendous amount of craftsmanship in between a great idea and a great product.", note: "" },
      { talk: '1991-12', t: 365, setup: "On why the companies that advertise quality the most are not the ones known for it:",
        quote: "The answer is because customers don't form their opinions on quality from marketing. They don't form their opinions on quality from who won the, the Deming award or who won the Baldrige award. They form their opinions on quality from their own experience with the products or the services. And so one can spend enormous amounts of money on quality, one can win every quality award there is, and yet if your products don't live up to it, customers will not keep that opinion for long in their minds.",
        key: "They form their opinions on quality from their own experience with the products or the services.", note: "" }
    ],
    monday: 'Find one detail that falls short of your standards, take ownership, and fix it.'
  },
  {
    id: 'people', label: 'People', glyph: 'people', figure: 'people',
    about: 'Give great people room to lead',
    name: 'Put authority where the answers are.',
    meaning: 'Stop managing. Start trusting.',
    changed: "From hiring stars to how a team decides. Gone from the short late interviews.",
    counts: { 1981: 1, 1983: 3, 1986: 1, 1991: 0, '1991-12': 2, 1992: 4, 1995: 4, 1997: 1, 1998: 0, 2008: 0 },
    moments: [
      { talk: 1995, t: 1818, setup: "Asked whether professionalism has a dark side, he says companies just get confused:",
        quote: "Companies get confused. When they start getting bigger, they want to replicate their initial success, and a lot of them think, well, somehow there's some magic in the process of how that success was created. So they start to try to institutionalize process across the company, and before very long people get very confused that the process is the content. … In my career I found that the best people are the ones that really understand the content, and they're a pain in the butt to manage.",
        key: "the best people are the ones that really understand the content, and they're a pain in the butt to manage.", note: "" },
      { talk: 1997, t: 199, setup: "Introducing Think Different to Apple staff, on what Apple stands for beyond making boxes:",
        quote: "Apple's about something more than that. Apple, at the core, its core value is that we believe that people with passion can change the world for the better. That's what we believe. And we've had the opportunity to work with people like that. … And we believe that in this world people can change it for the better, and that those people that are crazy enough to think they can change the world are the ones that actually do.",
        key: "people with passion can change the world for the better.", lead: true, note: "" },
      { talk: '1991-12', t: 593, setup: "Asked what requests he says yes to now; he says the question has it backwards:",
        quote: "Authority should be vested in the people doing the work to improve their own processes, to teach them how to measure them, to understand them, and to improve them. And they should not have to ask for permission to improve their processes. So I think a lot of the philosophy behind this quality stuff carries with it a flattening of the traditional hierarchical organization and a distribution of authority to the people who are best in the position to decide what should happen to improve these processes: the people doing the work themselves.",
        key: "they should not have to ask for permission to improve their processes.", note: "The permission that matters is permission not to ask." }
    ],
    monday: 'Stop being the bottleneck. Give someone the responsibility and authority to make a decision without waiting for you.'
  },
  {
    id: 'own', label: 'Ownership', glyph: 'own', figure: 'own',
    about: 'Stay hungry. Stay accountable.',
    name: 'Don\'t let success slow you down.',
    meaning: 'Earn tomorrow\'s success.',
    changed: "Loudest in 1986 and 1992, the years outside Apple.",
    counts: { 1981: 1, 1983: 3, 1986: 4, 1991: 3, 1992: 5, 1995: 3, 1997: 1, 1998: 0, 2008: 0 },
    moments: [
      { talk: 1983, t: 3096, setup: "On what happens to a company once it has something to lose:",
        quote: "We started with nothing. So whenever you start with nothing, you always can shoot for the moon. You have nothing to lose. And the thing that happens is when you start to get something, it’s very easy to go into cover-your-ass mode. … What we’re trying to do is to realize the very amazing time that we’re in and not go into that mode.",
        key: "it’s very easy to go into cover-your-ass mode.", lead: true, note: "" },
      { talk: 1986, t: 802, setup: "Opening the second company retreat, six months in, as the deadlines start to bite:",
        quote: "Well, my first saying that the honeymoon is over. Uh all of those wonderful things that we got for just being are now sort of just old news. We are like every other startup. We've been a company now for six months. … The bottom line is the world doesn't really care. What the world cares about is what we produce.",
        key: "The bottom line is the world doesn't really care. What the world cares about is what we produce.", note: "" },
      { talk: 1995, t: 3179, setup: "In 1995, a year before he went back, asked about the state of Apple:",
        quote: "When I walked out the door at Apple, we had a 10-year lead on everybody else in the industry. Macintosh was 10 years ahead. We watched Microsoft take 10 years to catch up with it. Well, the reason that they could catch up with it was because Apple stood still. I mean, the Macintosh that's shipping today is like 25% different than the day I left. … What did they get for it? I don't know.",
        key: "the reason that they could catch up with it was because Apple stood still.", note: "" }
    ],
    monday: 'Identify your next opportunity for growth. Don\'t let today\'s success become tomorrow\'s limit.'
  }
];
