import { Question } from '../types/quiz';

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const questions: Question[] = [
  {
    id: 1,
    question: "In which year was Josh Software founded?",
    options: {
      A: "2005",
      B: "2007",
      C: "2010",
      D: "2012"
    },
    correctAnswer: "B"
  },
  {
    id: 2,
    question: "Who are the two co-founders of Josh Software?",
    options: {
      A: "Gautam Rege & Sethupathi Asokan",
      B: "Sameer Tilak & Shailesh Kalekar",
      C: "Gautam Rege & Sameer Tilak",
      D: "Shailesh Kalekar & Sethupathi Asokan"
    },
    correctAnswer: "A"
  },
  {
    id: 3,
    question: "Which city is home to Josh Software’s headquarters?",
    options: {
      A: "Bengaluru",
      B: "Pune",
      C: "Mumbai",
      D: "Hyderabad"
    },
    correctAnswer: "B"
  },
  {
    id: 4,
    question: "Name two international locations where Josh has offices outside India.",
    options: {
      A: "New York & London",
      B: "Dallas & Dubai",
      C: "Singapore & Sydney",
      D: "Riyadh & Paris"
    },
    correctAnswer: "B"
  },
  {
    id: 5,
    question: "What is the name of Josh’s AI-powered technical assessment platform?",
    options: {
      A: "CodeCuriosity",
      B: "Sparkode",
      C: "Support Hawk",
      D: "Josh Edge"
    },
    correctAnswer: "B"
  },
  {
    id: 6,
    question: "What is the name of Josh’s unique initiative that blends technical and non-technical talks?",
    options: {
      A: "Innovation Lab",
      B: "Prose & Code",
      C: "Sports & Leisure",
      D: "Project Showcase"
    },
    correctAnswer: "B"
  },
  {
    id: 7,
    question: "Which two flagship conference does Josh sponsors in India?",
    options: {
      A: "Golang Girls",
      B: "RubyConf India & GopherCon India",
      C: "Rails Gilrs",
      D: "Ruby Meetup"
    },
    correctAnswer: "B"
  },
  {
    id: 8,
    question: "Which region is NOT explicitly mentioned as part of Josh’s client presence?",
    options: {
      A: "US",
      B: "Middle East",
      C: "South America",
      D: "Europe"
    },
    correctAnswer: "C"
  },
  {
    id: 9,
    question: "Which domain involves fraud detection and eKYC in Josh’s expertise?",
    options: {
      A: "HealthTech",
      B: "FinTech & BFSI",
      C: "EdTech",
      D: "SportsTech"
    },
    correctAnswer: "B"
  },
  {
    id: 10,
    question: "Which sector has Josh developed assessment engines and student engagement tools for?",
    options: {
      A: "HealthTech",
      B: "EdTech",
      C: "Media & Entertainment",
      D: "SportsTech"
    },
    correctAnswer: "B"
  },
  {
    id: 11,
    question: "What philosophy underpins Josh Software’s approach to innovation?",
    options: {
      A: "Proprietary-first",
      B: "Open Source First",
      C: "Vendor lock-in",
      D: "Outsourcing-only"
    },
    correctAnswer: "B"
  },
  {
    id: 12,
    question: "What makes Sparkode unique compared to generic coding tests?",
    options: {
      A: "Multiple-choice only",
      B: "AI-powered technical assessment for developers",
      C: "Offline exams",
      D: "Gamified only"
    },
    correctAnswer: "B"
  },
  {
    id: 13,
    question: "How does Josh support financial institutions against fraud?",
    options: {
      A: "Staff training",
      B: "AI + blockchain for eKYC & spoofing detection",
      C: "Manual KYC audits",
      D: "Partnering with law firms"
    },
    correctAnswer: "B"
  },
  {
    id: 14,
    question: "Who is the Gold Sponsor of Gophercon India 2025?",
    options: {
      A: "NPCI",
      B: "Quick Insure",
      C: "Josh Software",
      D: "Lingo"
    },
    correctAnswer: "C"
  }
];


export const fetchQuizQuestions = async (): Promise<Question[]> => {
  // Return 5 random questions from the pool
  return shuffleArray(questions).slice(0, 5);
};
