window.DECK = {
  cats: [
    { id: "decisions", name: "Decisions", short: "Decision speed",
      better: "Give people clear decision-making authority, spending limits, and accountability.",
      example: "An employee finds a $5,000 improvement that would save $100,000 a year. It needs four managers and two departments to approve. By the time the approvals arrive, the opportunity is gone." },
    { id: "leadership", name: "Leadership", short: "Leadership",
      better: "Promote competence, reward ownership, and let people challenge ideas respectfully.",
      example: "A talented employee has a better idea than their manager. It gets rejected because the manager feels threatened. The company loses an opportunity to protect one ego." },
    { id: "innovation", name: "Innovation", short: "Innovation",
      better: "Experiment, prototype, test, learn, and improve.",
      example: "Someone suggests a new way to serve customers. Management replies, “We have always done it this way.” That sentence has killed countless opportunities." },
    { id: "waste", name: "Waste", short: "Operational waste",
      better: "One source of truth, clear accountability, fewer priorities, and measurable outcomes.",
      example: "Three departments each report on the same business performance, using different spreadsheets and different definitions of success. Nobody is actually improving the business." },
    { id: "tells", name: "Tells", short: "Warning phrases",
      better: "These phrases are not always bad. Approvals, meetings, data and committees are sometimes necessary. The problem starts when they become automatic substitutes for judgment and action.",
      example: "" }
  ],

  cards: [
    { id: 1, cat: "decisions", t: "Too many approval layers", joke: "Four signatures for one pen.", why: "Weeks to decide an afternoon thing." },
    { id: 2, cat: "decisions", t: "Excessive meetings", joke: "This could have been an email.", why: "More talking about work than work." },
    { id: 3, cat: "decisions", t: "Approval by committee", joke: "Everyone owns it, so no one does.", why: "Everyone owns it. So no one does." },
    { id: 4, cat: "decisions", t: "Endless email chains", joke: "Reply all. Reply all again.", why: "Simple questions become projects." },
    { id: 5, cat: "decisions", t: "Escalating every decision", joke: "Your manager is a toll booth.", why: "Every decision waits in line." },
    { id: 6, cat: "decisions", t: "Fear of making mistakes", joke: "Safe is the career plan.", why: "People stop trying things." },
    { id: 7, cat: "decisions", t: "Excessive documentation", joke: "The binder wins.", why: "Paper beats outcomes." },

    { id: 8, cat: "leadership", t: "Too many management layers", joke: "Telephone, but with titles.", why: "The message changes at every layer." },
    { id: 9, cat: "leadership", t: "Micromanagement", joke: "Per my last reminder.", why: "People stop thinking for themselves." },
    { id: 10, cat: "leadership", t: "Managing by hierarchy", joke: "Rank beats the right answer.", why: "Rank beats the right answer." },
    { id: 11, cat: "leadership", t: "Political promotions", joke: "Golf handicap as a KPI.", why: "Who you know beats what you did." },
    { id: 12, cat: "leadership", t: "Avoiding difficult conversations", joke: "Strong feelings, zero conversations.", why: "Weak work goes unsaid." },
    { id: 13, cat: "leadership", t: "Managers protecting their departments", joke: "My silo, my rules.", why: "The department wins. The company loses." },

    { id: 14, cat: "innovation", t: "Rejecting ideas because they are unconventional", joke: "Weird is a risk factor.", why: "Odd ideas die on arrival." },
    { id: 15, cat: "innovation", t: "Prioritizing tradition over results", joke: "Because that is how 2011 did it.", why: "Old processes outlive their reasons." },
    { id: 16, cat: "innovation", t: "Excessive risk aversion", joke: "Zero downside, zero upside.", why: "No risk, no upside." },
    { id: 17, cat: "innovation", t: "Copying competitors", joke: "Following, now with a strategy deck.", why: "You follow instead of lead." },
    { id: 18, cat: "innovation", t: "Overengineering products", joke: "Fourteen settings. Nobody uses nine.", why: "More features, less meaning." },
    { id: 19, cat: "innovation", t: "Slow product development", joke: "The roadmap is a historical document.", why: "Rivals ship first." },

    { id: 20, cat: "waste", t: "Measuring hours instead of results", joke: "Green status light at 7 pm.", why: "People optimize looking busy." },
    { id: 21, cat: "waste", t: "Duplicate work across departments", joke: "Three teams, three wheels.", why: "Same problem, three budgets." },
    { id: 22, cat: "waste", t: "Unnecessary reporting", joke: "A weekly report about the weekly report.", why: "Reports replace progress." },
    { id: 23, cat: "waste", t: "Too many priorities", joke: "Priority one through priority nine.", why: "Nothing gets enough attention." },
    { id: 24, cat: "waste", t: "Excessive internal processes", joke: "The org chart has a customer problem.", why: "Serving the org beats serving customers." },
    { id: 25, cat: "waste", t: "Poor communication between departments", joke: "Left hand, meet the other left hand.", why: "Teams pull in different directions." },

    { id: 26, cat: "tells", t: "That is not my responsibility.", why: "Nobody owns it." },
    { id: 27, cat: "tells", t: "We need another meeting.", why: "The decision is being delayed." },
    { id: 28, cat: "tells", t: "That is how we have always done it.", why: "Habit is standing in for thinking." },
    { id: 29, cat: "tells", t: "We need approval from leadership.", why: "Authority is hoarded." },
    { id: 30, cat: "tells", t: "Let us circle back next quarter.", why: "Nobody is on the hook." },
    { id: 31, cat: "tells", t: "We cannot take that risk.", why: "Fear is blocking experiments." },
    { id: 32, cat: "tells", t: "We need everyone aligned first.", why: "Consensus is passing for progress." },
    { id: 33, cat: "tells", t: "That is above my pay grade.", why: "People do not feel trusted." },
    { id: 34, cat: "tells", t: "Let us create a committee.", why: "Nobody wants to be accountable." },
    { id: 35, cat: "tells", t: "We need more data before deciding.", why: "Analysis is standing in for action." }
  ],

  rules: [
    "Every project has one clearly accountable owner.",
    "Decisions are made as close to the work as possible.",
    "Every meeting has a clear purpose and a desired outcome.",
    "Employees can challenge management respectfully.",
    "Remove any process that does not protect quality, safety, compliance, or meaningful value.",
    "Measure outcomes, not appearances.",
    "Keep teams small enough to communicate effectively.",
    "Test ideas instead of debating them indefinitely.",
    "Put customer satisfaction ahead of internal politics.",
    "Regularly eliminate unnecessary work."
  ]
};
