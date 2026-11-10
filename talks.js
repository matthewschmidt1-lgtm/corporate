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
  The count line and the sources sentence update themselves.
*/
window.TALKS = [
  { year: 1981, venue: 'Television interview', url: 'https://www.youtube.com/watch?v=DbfejwP1d3c', videoId: 'DbfejwP1d3c', captionType: 'auto', runtime: '19:40' },
  { year: 1983, venue: 'International Design Conference, Aspen', url: 'https://www.youtube.com/watch?v=t9HmOz8H0qI', videoId: 't9HmOz8H0qI', captionType: 'channel', runtime: '55:14' },
  { year: 1986, venue: 'NeXT retreats, Pebble Beach', url: 'https://www.youtube.com/watch?v=s-a4aU1RUgM', videoId: 's-a4aU1RUgM', captionType: 'channel', runtime: '20:12' },
  { year: 1991, venue: 'Interview on ten years of the PC', url: 'https://www.youtube.com/watch?v=OzZB5pZTslE', videoId: 'OzZB5pZTslE', captionType: 'channel', runtime: '21:40' },
  { year: 1991, id: '1991-12', venue: 'Interview on Joseph Juran and quality', url: 'https://www.youtube.com/watch?v=XbkMcvnNq3g', videoId: 'XbkMcvnNq3g', captionType: 'auto', runtime: '19:18' },
  { year: 1992, venue: 'MIT, Distinguished Speaker Series', url: 'https://www.youtube.com/watch?v=YXUhLbV8Nrg', videoId: 'YXUhLbV8Nrg', captionType: 'auto', runtime: '1:12:53' },
  { year: 1998, venue: 'iMac satellite tour', url: 'https://www.youtube.com/watch?v=8a5KSoOUT_U', videoId: '8a5KSoOUT_U', captionType: 'auto', runtime: '10:29' },
  { year: 2008, venue: 'iPhone 3G interview', url: 'https://www.youtube.com/watch?v=qSUTHa7ssoc', videoId: 'qSUTHa7ssoc', captionType: 'auto', runtime: '4:40' }
];

window.SHAPES = [
  {
    id: 'tools', label: 'Tools', glyph: 'tools', figure: 'bicycle',
    name: 'Tools that make people bigger.',
    meaning: 'Your product is worth what it lets an ordinary person do.',
    counts: { 1981: 3, 1983: 4, 1986: 2, 1991: 1, 1992: 2, 1998: 1, 2008: 1 },
    moments: [
      { talk: 1981, t: 358, setup: "Asked what kind of person needs a personal computer, he tells a story about a condor:",
        quote: "But someone there had the insight to test the efficiency of man riding a bicycle, and man riding a bicycle was twice as good as the condor, all the way off the end of the list. And what it really illustrated was man's ability as a tool maker to fashion a tool that can amplify an inherent ability that he has. And that's exactly what we think we're doing. We think we're basically fashioning a 21st century bicycle here.",
        note: "" },
      { talk: 1986, t: 1145, setup: "On why he started over at 31, remembering a classroom full of Apple IIs:",
        quote: "And when it finally got into the hands of a lot of people, uh, it blossomed out of this tiny little seed. And it seemed like an incredible uh, amount of leverage. And it all started with just an idea. … And that's an incredible feeling to know that you had something to do with it. A, and B to know it can be done. To know that you can plant something in the world and it'll grow and and change the world ever so slightly.",
        note: "" },
      { talk: 1991, t: 184, setup: "Asked what personal computers will let people do that they cannot do today:",
        quote: "I think personal computing, which we mastered in the eighties, its mission was to improve individual productivity and at best creativity, and with over 50 million personal computer shipped in the eighties, it worked! The next thing for the nineties though, needs to be more. Improving individual productivity isn't enough anymore. The real competitive advantage of the nineties is going to come from improving group productivity and collaboration.",
        note: "The tool grows from one person to the team." }
    ],
    monday: 'Ask a customer what your product lets them do. Lead with that.'
  },
  {
    id: 'simple', label: 'Simple', glyph: 'simplicity', figure: 'watch',
    name: 'Simple outside, hard inside.',
    meaning: 'Every step you remove for the customer costs you work. Remove it anyway.',
    counts: { 1981: 1, 1983: 2, 1986: 0, 1991: 1, 1992: 2, 1998: 2, 2008: 0 },
    moments: [
      { talk: 1983, t: 2550, setup: "On the two ways to bring people and computers together:",
        quote: "So, gradually, the level of technical literacy is rising. The problem is we’re educating people on these garbage devices. Setting a Casio watch is really a pain still. So even though we have products like Lisa, we are still going to need to educate people about what computers are and what they do. But where we’re trying to get is we’re trying to get away from programming. We’ve got to get away from programming, because people don’t want to program computers, people want to use computers.",
        note: "" },
      { talk: 1992, t: 1703, setup: "Explaining to MIT students why NeXT apps take a fraction of the usual time:",
        quote: "However, to do a particular app, on average you write about 20% of the code that you do in any other development environment we know of, about 20% of the code then in Sun or anything else. So the code that's the fastest to write, the code that's the easiest to maintain, and the code that never breaks is the code you don't write. So that's our strategy, right? A lot less code.",
        note: "The step you never add can never fail." },
      { talk: 1998, t: 177, setup: "Asked whether the iMac is a breakthrough:",
        quote: "I think, you know, what iMac was designed to do was to do for the Internet what the original Macintosh did for personal computing, which was to make it easy. … Its greatest power, I think, is that you can take it home, take it out of the box and be cruising the Internet within 10 minutes, and that's not something you can do on, on any other computer we know of.",
        note: "" }
    ],
    monday: 'Time a new customer\'s first result. Remove one step.'
  },
  {
    id: 'customers', label: 'Customers', glyph: 'customer',
    name: 'Customers tell you what you are.',
    meaning: 'Your real advantage is often the one customers name first.',
    counts: { 1981: 1, 1983: 1, 1986: 1, 1991: 2, 1992: 3, 1998: 2, 2008: 3 },
    moments: [
      { talk: 1992, t: 705, setup: "On how NeXT found out, a year late, what it was actually good at:",
        quote: "Some really big companies came to us and said, you don't understand what you've got. The same software that allows Lotus to create their apps five to ten times is letting us build our in-house mission-critical apps five to ten times faster, and this is the biggest problem we've had. This is a huge problem for every big company and almost all medium-sized companies, and you have the solution in your hands, and you dummies don't even know it.",
        note: "NeXT took three months to hear it. Be faster." },
      { talk: 2008, t: 13, setup: "Asked why a phone that is all about fun should go after the business world:",
        quote: "Well, you know, the business world has bought a lot of iPhones in the last year. Uh, there's a ton of CEOs and senior executives in, in most of the Fortune 500 companies that have iPhones, and there's a lot of employees that have them at home, and they really want to use them at work. So we've been getting a lot of requests to, to really figure out how to work with enterprise.",
        note: "" },
      { talk: 2008, t: 117, setup: "Asked whether the iPhone can replace the BlackBerry, which held almost half the market:",
        quote: "Well, that's up to customers to decide. We're just going to give them the best iPhone we know how, and they'll pick what they want.",
        note: "" }
    ],
    monday: 'Ask three customers what you are best at. Write down the surprise.'
  },
  {
    id: 'care', label: 'Care', glyph: 'excellence',
    name: 'Care costs no more.',
    meaning: 'Great and junk cost about the same to make. Choose great, everywhere.',
    counts: { 1981: 0, 1983: 3, 1986: 1, 1991: 0, '1991-12': 3, 1992: 2, 1998: 1, 2008: 1 },
    moments: [
      { talk: 1983, t: 489, setup: "Asking designers for help, since computers would sell by the million however they looked:",
        quote: "It doesn’t really matter, because people are going to just suck this stuff up so fast that they’re going to do it no matter what it looks like. And it doesn’t cost any more money to make it look great. There are going to be these objects, this new object that’s going to be in everyone’s working environment… And we have a shot at putting a great object there, or if we don’t, we’re going to put one more piece-of-junk object there.",
        note: "" },
      { talk: 1992, t: 3573, setup: "On what you learn the moment you start building factories:",
        quote: "Warehouses are bad because you tend to put things in them, and inventory is really bad. Inventory is really bad because if it's defective, you don't find out about it for a while, and you don't close the quality feedback loop with a vendor and correct the problem till they've made a zillion of them. What you want to do is find a problem, the first one that comes in the door, and stop them from making more until you fix the problem.",
        note: "Work that waits hides its defects." },
      { talk: '1991-12', t: 365, setup: "On why the companies that advertise quality the most are not the ones known for it:",
        quote: "The answer is because customers don't form their opinions on quality from marketing. They don't form their opinions on quality from who won the, the Deming award or who won the Baldrige award. They form their opinions on quality from their own experience with the products or the services. And so one can spend enormous amounts of money on quality, one can win every quality award there is, and yet if your products don't live up to it, customers will not keep that opinion for long in their minds.",
        note: "" }
    ],
    monday: 'Fix one thing customers see every day that nobody owns.'
  },
  {
    id: 'people', label: 'People', glyph: 'people',
    name: 'Few people, real agreement.',
    meaning: 'Hire people to tell you what to do. Then argue until you agree.',
    counts: { 1981: 1, 1983: 3, 1986: 1, 1991: 0, '1991-12': 2, 1992: 4, 1998: 0, 2008: 0 },
    moments: [
      { talk: 1981, t: 1137, setup: "Asked how a company growing this fast builds its executive team:",
        quote: "Well, one of the things that we always did was we tried to hire somebody who was better than us in a particular thing. That's still my greatest joy around here, is when we hire somebody that's better than I'll ever be at one particular thing. So you try to hire just really outstanding people that are much too, they're actually much too senior for the current jobs that you have.",
        note: "" },
      { talk: 1992, t: 3199, setup: "Asked how NeXT resolves conflict, he explains why he never tells people to just buy in:",
        quote: "Sooner or later you're paying somebody to do what they think is right, but then you're trying to get him to do what they think isn't right, and it ends, sooner or later it outs, and you end up having that conflict. So I've always felt that the best way is to get everybody in a room and talk it through until you agree. Now, that's not everybody in the company, but that's everybody that's really involved in that decision that needs to execute it.",
        note: "" },
      { talk: '1991-12', t: 593, setup: "Asked what requests he says yes to now; he says the question has it backwards:",
        quote: "Authority should be vested in the people doing the work to improve their own processes, to teach them how to measure them, to understand them, and to improve them. And they should not have to ask for permission to improve their processes. So I think a lot of the philosophy behind this quality stuff carries with it a flattening of the traditional hierarchical organization and a distribution of authority to the people who are best in the position to decide what should happen to improve these processes: the people doing the work themselves.",
        note: "The permission that matters is permission not to ask." }
    ],
    monday: 'On your next big call, argue until the people doing it agree.'
  },
  {
    id: 'focus', label: 'Focus', glyph: 'focus',
    name: 'Bet on a few things.',
    meaning: 'Name what you would go broke over. Spend your time there.',
    counts: { 1981: 1, 1983: 1, 1986: 3, 1991: 0, 1992: 2, 1998: 1, 2008: 1 },
    moments: [
      { talk: 1986, t: 382, setup: "At the first NeXT retreat, 90 days in, with one market chosen:",
        quote: "So really, the next 90 days are real important. We are going to make it or break it based on whether we can provide products to higher education and services and relationships to higher education that no one else provides. And I think we ought to spend 100% of our time thinking about that. And if we can't do that, then we ought to go broke.",
        note: "" },
      { talk: 1992, t: 3246, setup: "On how the eight-person team at the top of NeXT decides:",
        quote: "One is we try to differentiate between the really important decisions and the ones that we don't have to make, and the really important ones we work on it till we all agree, because we're paying people to tell us what to do. … The key to making that work is to realize there's not that many things that any one team really has to decide, and we might have 25 really important things we have to decide on a year. Not a lot.",
        note: "" },
      { talk: 1998, t: 123, setup: "Answering a question the tape did not catch, about something others were worrying over:",
        quote: "Oh, you know, I decided about probably about nine months ago that that wasn't my problem, so I stopped thinking about it, and I stopped worrying about it. And, uh, other people may worry about it, but I, I don't worry about it. I just focus on what I'm doing right now, which is trying to get the iMac launched and trying to make as many as we can.",
        note: "" }
    ],
    monday: 'List what you would go broke over. Stop one thing that is not.'
  },
  {
    id: 'own', label: 'Ownership', glyph: 'own',
    name: 'Own it. Keep moving.',
    meaning: 'Success breeds caution, and blaming outsiders is the comfortable kind.',
    counts: { 1981: 1, 1983: 3, 1986: 4, 1991: 3, 1992: 5, 1998: 0, 2008: 0 },
    moments: [
      { talk: 1983, t: 3096, setup: "On what happens to a company once it has something to lose:",
        quote: "We started with nothing. So whenever you start with nothing, you always can shoot for the moon. You have nothing to lose. And the thing that happens is when you start to get something, it’s very easy to go into cover-your-ass mode. … What we’re trying to do is to realize the very amazing time that we’re in and not go into that mode.",
        note: "" },
      { talk: 1986, t: 802, setup: "Opening the second company retreat, six months in, as the deadlines start to bite:",
        quote: "Well, my first saying that the honeymoon is over. Uh all of those wonderful things that we got for just being are now sort of just old news. We are like every other startup. We've been a company now for six months. … The bottom line is the world doesn't really care. What the world cares about is what we produce.",
        note: "" },
      { talk: 1991, t: 1080, setup: "Asked whether Wall Street's short-term pressure explains why US makers lost key parts to Japan:",
        quote: "And I think that the real problem has not been with Wall Street, it's been with the management of our industry. It's been with people not being willing to take responsibility for the underlying component technologies, and thinking that we could give that responsibility to others, and survive in just a successful of a fashion, which is not true. Industry after industry has shown us that that's not true.",
        note: "" }
    ],
    monday: 'Name one problem you blame on outsiders. Find your part in it.'
  }
];
