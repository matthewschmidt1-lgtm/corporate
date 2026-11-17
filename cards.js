window.DECK = {
  cats: [
    { id: "decisions", name: "Decisions", short: "Decision speed", sub: "Four ways organizations slow decisions.",
      better: "Give people clear decision making authority, reasonable limits, and accountability. Move decisions closer to the customer and the people doing the work.",
      example: "A competitor launches a better offer. Your team sees an opportunity to respond, but pricing changes require multiple approvals. Weeks pass while competitors move faster and customers move on." },
    { id: "leadership", name: "Leadership", short: "Leadership", sub: "Four ways management gets in the way.",
      better: "Promote competence, reward ownership, and let the best ideas win regardless of title.",
      example: "A talented employee has a better idea than their manager. It gets rejected because the manager feels threatened. The company loses an opportunity to protect one ego." },
    { id: "innovation", name: "Innovation", short: "Innovation", sub: "Four ways organizations stop moving forward.",
      better: "Question the status quo. Test new ideas, put them in front of customers, measure what works, and let results decide.",
      example: "Someone suggests a better way to serve customers. Management responds, \u201CWe've always done it this way.\u201D And another opportunity disappears." },
    { id: "waste", name: "Waste", short: "Operational waste", sub: "Four ways organizations consume time and resources.",
      better: "Create one source of truth, clear accountability, fewer priorities, and measurable outcomes.",
      example: "Three departments report on the same business performance using different spreadsheets and definitions of success. Everyone is reporting. Nobody is improving the business." },
    { id: "tells", name: "Tells", short: "Warning phrases",
      better: "These phrases are not always bad. Approvals, meetings, data and committees are sometimes necessary. The problem starts when they become automatic substitutes for judgment and action.",
      example: "" }
  ],

  cards: [
    { id: 1, cat: "decisions", t: "Too many approval layers", joke: "Four signatures for one pen.", why: "Weeks to decide an afternoon thing." },
    { id: 2, cat: "decisions", t: "Excessive meetings", joke: "This could have been an email.", why: "More talking about work than work." },
    { id: 3, cat: "decisions", t: "Approval by committee", joke: "Everyone owns it, so no one does.", why: "Everyone owns it. So no one does." },
    { id: 4, cat: "decisions", t: "Fear of making mistakes", joke: "Safe is the career plan.", why: "People stop trying things." },

    { id: 5, cat: "leadership", t: "Too many management layers", joke: "Telephone, but with titles.", why: "The message changes at every layer." },
    { id: 6, cat: "leadership", t: "Micromanagement", joke: "Per my last reminder.", why: "People stop thinking for themselves." },
    { id: 7, cat: "leadership", t: "Political promotions", joke: "Golf handicap as a KPI.", why: "Who you know beats what you did." },
    { id: 8, cat: "leadership", t: "Managers protecting their departments", joke: "My silo, my rules.", why: "The department wins. The company loses." },

    { id: 9, cat: "innovation", t: "Rejecting unconventional ideas", joke: "Weird is a risk factor.", why: "Odd ideas die on arrival." },
    { id: 10, cat: "innovation", t: "Prioritizing tradition over results", joke: "Because that's how 2011 did it.", why: "Old processes outlive their reasons." },
    { id: 11, cat: "innovation", t: "Excessive risk aversion", joke: "Zero downside, zero upside.", why: "No risk, no upside." },
    { id: 12, cat: "innovation", t: "Slow product development", joke: "The roadmap is a historical document.", why: "Rivals ship first." },

    { id: 13, cat: "waste", t: "Measuring hours instead of results", joke: "Green status light at 7 pm.", why: "People optimize looking busy." },
    { id: 14, cat: "waste", t: "Duplicate work across departments", joke: "Three teams, three wheels.", why: "Same problem, three budgets." },
    { id: 15, cat: "waste", t: "Too many priorities", joke: "Priority one through priority nine.", why: "Nothing gets enough attention." },
    { id: 16, cat: "waste", t: "Poor communication between departments", joke: "Left hand, meet the other left hand.", why: "Teams pull in different directions." },

    { id: 26, cat: "tells", t: "That is not my responsibility.", why: "Nobody owns it." },
    { id: 27, cat: "tells", t: "We need another meeting.", why: "The decision is being delayed." },
    { id: 28, cat: "tells", t: "That is how we have always done it.", why: "Habit is standing in for thinking." },
    { id: 29, cat: "tells", t: "We need approval from leadership.", why: "Authority is hoarded." },
    { id: 30, cat: "tells", t: "Let us circle back next quarter.", why: "Nobody is on the hook." },
    { id: 33, cat: "tells", t: "That is above my pay grade.", why: "People do not feel trusted." },
    { id: 36, cat: "tells", t: "That's not how we measure success.", why: "The scorecard has replaced the goal." }
  ],

  ruleGroups: [
    { t: "Ownership over bureaucracy", r: ["One project. One owner. Clear accountability.", "Make decisions as close to the work as possible."] },
    { t: "Substance over ceremony", r: ["Every meeting must have a purpose and a decision to make.", "Eliminate processes unless they protect quality, safety, compliance, or create meaningful value."] },
    { t: "Courage over conformity", r: ["Challenge ideas, question authority, and speak up.", "Stop debating. Test ideas. Let results decide."] },
    { t: "Results over activity", r: ["Measure what gets accomplished, not how busy people look.", "Keep teams small enough to move fast and work closely."] },
    { t: "Customers over politics", r: ["Put customers ahead of internal politics. Every time.", "Constantly question what can be simplified, improved, or eliminated."] }
  ]
};
