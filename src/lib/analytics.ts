
// Google Analytics 4 implementation
export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your actual GA4 measurement ID

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined') {
    // Load the Google Analytics script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize the dataLayer
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);

    // Add gtag to window
    window.gtag = gtag;
  }
};

// Track page view
export const pageview = (url: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Track event
export const event = ({ action, category, label, value }: {
  action: string;
  category?: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Custom events specific to our app
export const quizEvents = {
  startQuiz: () => event({ action: 'quiz_started', category: 'engagement' }),
  completeQuiz: (score: number) => event({ 
    action: 'quiz_completed', 
    category: 'engagement', 
    value: score 
  }),
  answerQuestion: (isCorrect: boolean) => event({ 
    action: 'question_answered', 
    category: 'engagement', 
    label: isCorrect ? 'correct' : 'incorrect' 
  }),
};

export const referralEvents = {
  copyReferral: () => event({ action: 'referral_copied', category: 'referral' }),
  clickRefer: () => event({ action: 'referral_clicked', category: 'referral' }),
};

export const rewardEvents = {
  viewReward: (rewardName: string) => event({
    action: 'reward_viewed',
    category: 'rewards',
    label: rewardName
  }),
  claimReward: (rewardName: string, pointsCost: number) => event({
    action: 'reward_claimed',
    category: 'rewards',
    label: rewardName,
    value: pointsCost
  }),
};
