// Types for chat logic
type ChatState = {
  currentFlow: string;
  answers: Record<string, string>;
};

// Define conversation flows
const conversationFlows = {
  website: [
    "Great! Have you seen any websites you like the look of?",
    "If so, could you send us a link for inspiration?",
    "Do you already have content ready (like text, images, etc)?",
    "What features do you need? (e.g. shop, blog, booking system)",
    "What's your budget range?",
    "Do you have a deadline or launch date in mind?"
  ],
  logo: [
    "Brilliant! Do you have any ideas or styles you like?",
    "Any colours or themes in mind?",
    "Do you want text only, icon + text, or a full graphic design?",
    "Have you seen any logos you really like? Feel free to link them!",
    "What's your budget for the logo design?"
  ],
  products: [
    "Are you looking for anything in particular?",
    "Seen something on our site or elsewhere you liked?",
    "Can you send a link or describe the product?",
    "What's your budget or price range?",
    "Would you like us to notify you if a similar product comes up?"
  ],
  general: [
    "Would you like us to contact you via email or phone?",
    "Do you have any files, images, or notes you'd like to upload?",
    "Would you prefer a call back from our team?"
  ]
};

// Process user input and determine next response
export function processUserInput(input: string, state: ChatState) {
  const lowerInput = input.toLowerCase();
  
  // Detect keywords
  if (lowerInput.includes('website')) {
    return {
      message: conversationFlows.website[0],
      newState: { ...state, currentFlow: 'website', answers: { ...state.answers, type: 'website' } }
    };
  }
  
  if (lowerInput.includes('logo')) {
    return {
      message: conversationFlows.logo[0],
      newState: { ...state, currentFlow: 'logo', answers: { ...state.answers, type: 'logo' } }
    };
  }
  
  if (lowerInput.includes('product') || lowerInput.includes('browsing')) {
    return {
      message: conversationFlows.products[0],
      newState: { ...state, currentFlow: 'products', answers: { ...state.answers, type: 'products' } }
    };
  }

  // Handle ongoing conversation
  if (state.currentFlow) {
    const flow = conversationFlows[state.currentFlow as keyof typeof conversationFlows];
    const currentIndex = Object.keys(state.answers).length - 1;
    
    if (currentIndex < flow.length - 1) {
      return {
        message: flow[currentIndex + 1],
        newState: {
          ...state,
          answers: { ...state.answers, [`answer${currentIndex + 1}`]: input }
        }
      };
    } else {
      // End of specific flow, move to general questions
      return {
        message: conversationFlows.general[0],
        newState: {
          ...state,
          currentFlow: 'general',
          answers: { ...state.answers, [`answer${currentIndex + 1}`]: input }
        }
      };
    }
  }

  // Default response for unrecognized input
  return {
    message: "I'm not sure I understand. Could you please rephrase that or choose one of the options above?",
    newState: state
  };
}

// Generate quick reply options based on current state
export function getQuickReplyOptions(state: ChatState) {
  if (!state.currentFlow) {
    return [
      "I need a website",
      "I need a logo",
      "I'm browsing products",
      "Just looking / Other"
    ];
  }

  if (state.currentFlow === 'general') {
    return [
      "Yes, please contact me",
      "No, I'm all set",
      "I have more questions"
    ];
  }

  return ["Yes", "No", "I'm not sure"];
} 