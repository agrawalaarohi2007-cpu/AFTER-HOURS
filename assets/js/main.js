// assets/js/main.js - Final Version with All Fixes

let currentLang = localStorage.getItem('language') || 'en';

const translations = {
  en: {
    appName: "MoneyMap",
    tagline: "Financial Survival & Strategy Engine",
    welcome: "Welcome back!",
    totalBalance: "Total Balance",
    thisMonthSpent: "This Month Spent",
    addTransaction: "Add Transaction",
    investmentPlan: "Investment Plan",
    recentActivity: "Recent Activity",
    noTransactions: "No transactions yet",
    familyName: "Family Information",
    members: "Members",
    language: "Language & Translation",
    addMember: "+ Add Family Member",
    home: "Home",
    transactions: "Transactions",
    invest: "Invest",
    insights: "Insights",
    settings: "Settings",
    speak: "Speak",
    monthlyIncome: "Monthly Income (₹)",
    currentDay: "Current Day of Month",
    predictShortfall: "Predict Shortfall",
    predictionResult: "Prediction Result",
    principalAmount: "Principal Amount (₹)",
    yourAge: "Your Age",
    goalYears: "Goal Years",
    monthlySurplus: "Monthly Surplus (₹)",
    riskCapacity: "Risk Taking Capacity",
    generatePlan: "Generate Detailed Plan"
  },
  hi: {
    appName: "मनीमैप",
    tagline: "वित्तीय अस्तित्व और रणनीति इंजन",
    welcome: "वापस स्वागत है!",
    totalBalance: "कुल बैलेंस",
    thisMonthSpent: "इस महीने खर्च",
    addTransaction: "ट्रांजेक्शन जोड़ें",
    investmentPlan: "निवेश प्लान",
    recentActivity: "हाल की गतिविधियाँ",
    noTransactions: "अभी कोई ट्रांजेक्शन नहीं",
    familyName: "परिवार की जानकारी",
    members: "सदस्य",
    language: "भाषा और अनुवाद",
    addMember: "+ परिवार सदस्य जोड़ें",
    home: "होम",
    transactions: "ट्रांजेक्शन",
    invest: "निवेश",
    insights: "इनसाइट्स",
    settings: "सेटिंग्स",
    speak: "सुनें",
    monthlyIncome: "मासिक आय (₹)",
    currentDay: "महीने का वर्तमान दिन",
    predictShortfall: "शॉर्टफॉल की भविष्यवाणी करें",
    predictionResult: "भविष्यवाणी परिणाम",
    principalAmount: "मूलधन राशि (₹)",
    yourAge: "आपकी उम्र",
    goalYears: "लक्ष्य वर्ष",
    monthlySurplus: "मासिक अधिशेष (₹)",
    riskCapacity: "जोखिम लेने की क्षमता",
    generatePlan: "विस्तृत प्लान बनाएं"
  }
};

function speak(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLang === 'hi' ? 'hi-IN' : 'en-US';
    utterance.rate = 0.95;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  }
}

function translatePage() {
  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.getAttribute('data-translate');
    if (translations[currentLang] && translations[currentLang][key]) {
      el.textContent = translations[currentLang][key];
    }
  });
}

function changeLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('language', lang);
  translatePage();
  location.reload();
}

function speakCurrentPage() {
  const page = window.location.pathname.split("/").pop();
  let text = currentLang === 'hi' ? "आप मनीमैप में हैं" : "You are in MoneyMap";
  speak(text);
}

// Transaction Functions
function getTransactions() {
  return JSON.parse(localStorage.getItem('transactions')) || [];
}

function saveTransactions(transactions) {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Investment Calculation
function calculateInvestment(age, goalYears, riskLevel, principal, monthlySurplus) {
  let equity = 110 - age;
  if (goalYears > 10) equity += 10;
  if (riskLevel === "aggressive") equity += 20;
  if (riskLevel === "conservative") equity -= 25;
  equity = Math.max(20, Math.min(80, equity));
  const debt = Math.max(10, 85 - equity);
  const gold = 10;

  return {
    equity: { percent: Math.round(equity), amount: Math.round(principal * equity / 100) },
    debt: { percent: Math.round(debt), amount: Math.round(principal * debt / 100) },
    gold: { percent: gold, amount: Math.round(principal * gold / 100) }
  };
}

// Make all functions globally available
window.speak = speak;
window.speakCurrentPage = speakCurrentPage;
window.translatePage = translatePage;
window.changeLanguage = changeLanguage;
window.getTransactions = getTransactions;
window.saveTransactions = saveTransactions;
window.calculateInvestment = calculateInvestment;