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
        question: "Which programming language is Josh best known for championing since its early days?",
        options: {
          A: "Java",
          B: "Python",
          C: "Ruby",
          D: "C++"
        },
        correctAnswer: "C"
      },
      {
        id: 6,
        question: "What philosophy does Josh believe is the foundation for innovation?",
        options: {
          A: "Proprietary software solutions",
          B: "Agile methodology",
          C: "Open Source",
          D: "Cloud-first"
        },
        correctAnswer: "C"
      },
      {
        id: 7,
        question: "Name two areas under Josh’s core capabilities apart from product development.",
        options: {
          A: "Application Modernization & AI/ML",
          B: "Marketing & Sales",
          C: "HR Consulting & Training",
          D: "Event Management & Design"
        },
        correctAnswer: "A"
      },
      {
        id: 8,
        question: "Which sector has Josh built Proofs of Concept for AI call centers and deepfake detection?",
        options: {
          A: "HealthTech",
          B: "FinTech & BFSI",
          C: "EdTech",
          D: "SportsTech"
        },
        correctAnswer: "B"
      },
      {
        id: 9,
        question: "Which global media giant partnered with Josh for digital projects?",
        options: {
          A: "Netflix",
          B: "Hotstar",
          C: "StarTV",
          D: "Sony"
        },
        correctAnswer: "C"
      },
      {
        id: 10,
        question: "What solution did Josh build for KindKart in the eCommerce sector?",
        options: {
          A: "Global B2B apparel ordering platform",
          B: "Online food delivery system",
          C: "Digital payment gateway",
          D: "AI chatbot for retail"
        },
        correctAnswer: "A"
      },
      {
        id: 11,
        question: "Which NGO did Josh support to empower the visually challenged?",
        options: {
          A: "Smile Foundation",
          B: "CRY",
          C: "Niwant Andh Mukta Vikasalay",
          D: "Pratham"
        },
        correctAnswer: "C"
      },
      {
        id: 12,
        question: "What is the name of Josh’s AI-powered technical assessment platform?",
        options: {
          A: "CodeCuriosity",
          B: "Sparkode",
          C: "Mentorgain",
          D: "Josh Edge"
        },
        correctAnswer: "B"
      },
      {
        id: 13,
        question: "Which Josh product offers on-device AI for transcription, summarization, and translation?",
        options: {
          A: "Lingo.ai",
          B: "Sparkode",
          C: "Josh Edge",
          D: "Mentorgain"
        },
        correctAnswer: "A"
      },
      {
        id: 14,
        question: "What is Josh Edge designed to showcase?",
        options: {
          A: "Client outcomes",
          B: "Employee performance",
          C: "Financial reports",
          D: "Training modules"
        },
        correctAnswer: "A"
      },
      {
        id: 15,
        question: "Which Josh platform helps track open-source contributions?",
        options: {
          A: "Mentorgain",
          B: "Sparkode",
          C: "CodeCuriosity",
          D: "Lingo.ai"
        },
        correctAnswer: "C"
      },
      {
        id: 16,
        question: "What percentage of Josh’s workforce is women?",
        options: {
          A: "25%",
          B: "38%",
          C: "40%",
          D: "50%"
        },
        correctAnswer: "B"
      },
      {
        id: 17,
        question: "What is the name of Josh’s unique initiative that blends technical and non-technical talks?",
        options: {
          A: "Voices of Josh",
          B: "Prose & Code",
          C: "Sports & Leisure",
          D: "Josh Talks"
        },
        correctAnswer: "B"
      },
      {
        id: 18,
        question: "Which two flagship conferences does Josh organize in India?",
        options: {
          A: "WebSummit & AICon",
          B: "RubyConf India & GopherCon India",
          C: "TechCrunch & DevFest",
          D: "CloudNext & PyCon"
        },
        correctAnswer: "B"
      },
      {
        id: 19,
        question: "How much ROI has Josh delivered through consulting engagements?",
        options: {
          A: "$50M+",
          B: "$100M+",
          C: "$200M+",
          D: "$500M+"
        },
        correctAnswer: "C"
      },
      {
        id: 20,
        question: "Name one recent Josh POC that combats fraud using AI + blockchain.",
        options: {
          A: "AI Call Center Automation",
          B: "Feedback Collector",
          C: "eKYC Spoofing Detection",
          D: "Local Share Market Chatbot"
        },
        correctAnswer: "C"
      }
];

export const fetchQuizQuestions = async (): Promise<Question[]> => {
  // Return 5 random questions from the pool
  return shuffleArray(questions).slice(0, 5);
};
