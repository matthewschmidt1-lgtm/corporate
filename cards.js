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
    { id: 1, cat: "decisions", t: "Too many approval layers", joke: "Four signatures for one pen.", why: "Decisions take weeks instead of hours." },
    { id: 2, cat: "decisions", t: "Excessive meetings", joke: "This could have been an email.", why: "Employees spend more time discussing work than doing it." },
    { id: 3, cat: "decisions", t: "Approval by committee", joke: "Everyone owns it, so no one does.", why: "Nobody takes clear ownership of decisions." },
    { id: 4, cat: "decisions", t: "Endless email chains", joke: "Reply all. Reply all again.", why: "Simple questions become complicated processes." },
    { id: 5, cat: "decisions", t: "Escalating every decision", joke: "Your manager is a toll booth.", why: "Managers become bottlenecks." },
    { id: 6, cat: "decisions", t: "Fear of making mistakes", joke: "Safe is the career plan.", why: "Employees avoid taking initiative." },
    { id: 7, cat: "decisions", t: "Excessive documentation", joke: "The binder wins.", why: "People prioritize paperwork over outcomes." },

    { id: 8, cat: "leadership", t: "Too many management layers", joke: "Telephone, but with titles.", why: "Information gets distorted as it travels up and down." },
    { id: 9, cat: "leadership", t: "Micromanagement", joke: "Per my last reminder.", why: "Employees lose independence and confidence." },
    { id: 10, cat: "leadership", t: "Managing by hierarchy", joke: "Rank beats the right answer.", why: "Job titles matter more than competence." },
    { id: 11, cat: "leadership", t: "Political promotions", joke: "Golf handicap as a KPI.", why: "People advance because of relationships rather than results." },
    { id: 12, cat: "leadership", t: "Avoiding difficult conversations", joke: "Strong feelings, zero conversations.", why: "Poor performance goes unaddressed." },
    { id: 13, cat: "leadership", t: "Managers protecting their departments", joke: "My silo, my rules.", why: "Company-wide goals become secondary to departmental interests." },

    { id: 14, cat: "innovation", t: "Rejecting ideas because they are unconventional", joke: "Weird is a risk factor.", why: "The organization becomes resistant to change." },
    { id: 15, cat: "innovation", t: "Prioritizing tradition over results", joke: "Because that is how 2011 did it.", why: "Old processes survive even when they no longer work." },
    { id: 16, cat: "innovation", t: "Excessive risk aversion", joke: "Zero downside, zero upside.", why: "The company misses opportunities." },
    { id: 17, cat: "innovation", t: "Copying competitors", joke: "Following, now with a strategy deck.", why: "The business becomes reactive rather than innovative." },
    { id: 18, cat: "innovation", t: "Overengineering products", joke: "Fourteen settings. Nobody uses nine.", why: "More features create complexity without adding meaningful value." },
    { id: 19, cat: "innovation", t: "Slow product development", joke: "The roadmap is a historical document.", why: "Competitors move faster and capture your customers." },

    { id: 20, cat: "waste", t: "Measuring hours instead of results", joke: "Green status light at 7 pm.", why: "Employees optimize for looking busy." },
    { id: 21, cat: "waste", t: "Duplicate work across departments", joke: "Three teams, three wheels.", why: "Multiple teams solve the same problem." },
    { id: 22, cat: "waste", t: "Unnecessary reporting", joke: "A weekly report about the weekly report.", why: "Employees report progress instead of making progress." },
    { id: 23, cat: "waste", t: "Too many priorities", joke: "Priority one through priority nine.", why: "Nothing receives enough attention." },
    { id: 24, cat: "waste", t: "Excessive internal processes", joke: "The org chart has a customer problem.", why: "Serving the organization gets harder than serving customers." },
    { id: 25, cat: "waste", t: "Poor communication between departments", joke: "Left hand, meet the other left hand.", why: "Teams work in silos and create conflicting outcomes." },

    { id: 26, cat: "tells", t: "That is not my responsibility.", why: "Ownership is missing." },
    { id: 27, cat: "tells", t: "We need another meeting.", why: "Decisions are being delayed." },
    { id: 28, cat: "tells", t: "That is how we have always done it.", why: "Tradition is replacing critical thinking." },
    { id: 29, cat: "tells", t: "We need approval from leadership.", why: "Authority is too centralized." },
    { id: 30, cat: "tells", t: "Let us circle back next quarter.", why: "Urgency and accountability are missing." },
    { id: 31, cat: "tells", t: "We cannot take that risk.", why: "Fear is preventing experimentation." },
    { id: 32, cat: "tells", t: "We need everyone aligned first.", why: "Consensus is being confused with progress." },
    { id: 33, cat: "tells", t: "That is above my pay grade.", why: "People do not feel empowered." },
    { id: 34, cat: "tells", t: "Let us create a committee.", why: "Nobody wants direct accountability." },
    { id: 35, cat: "tells", t: "We need more data before deciding.", why: "Analysis may be replacing action." }
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
