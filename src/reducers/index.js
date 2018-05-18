import {MAKE_GUESS, RESTART_GAME, GENERATE_AURAL_UPDATE} from '../actions'


const initialState = {
    guesses: [],
    feedback: 'Make your guess!',
    correctAnswer: Math.round(Math.random() * 100) + 1,
    auralStatus: ''
};

export const reducer = (state=initialState, action) => {

    if(action.type === 'MAKE_GUESS') {
        let guess, feedback, difference


        guess = parseInt(action.guess, 10);

        if (isNaN(guess)) {
            feedback = 'Please entere a valid number'

            return Object.assign({}, state, {
                ...state,
                feedback
            })
        }
    

        difference = Math.abs(guess - state.correctAnswer);

        if (difference >= 50) {
            feedback = 'You\'re Ice Cold...';
          } else if (difference >= 30) {
            feedback = 'You\'re Cold...';
          } else if (difference >= 10) {
            feedback = 'You\'re Warm.';
          } else if (difference >= 1) {
            feedback = 'You\'re Hot!';
          } else {
            feedback = 'You got it!';
          }
      
        return Object.assign({}, state, {
            feedback,
            guesses: [...state.guesses, guess]
        });
    }

    if(action.type === RESTART_GAME) {
        return Object.assign({}, state, {
            guesses: [],
            feedback: 'Make your guess!',
            correctAnswer: action.correctAnswer,
            auralStatus: ''
        })
    }

    if (action.type === GENERATE_AURAL_UPDATE) {
        console.log(state)
        const {guesses, feedback} = state;
        console.log(feedback, guesses.length)

        // If there's not exactly 1 guess, we want to
        // pluralize the nouns in this aural update.
        const pluralize = guesses.length !== 1;

        let auralStatus = `Here's the status of the game right now: ${feedback} You've made ${guesses.length} ${pluralize
            ? 'guesses'
            : 'guess'}.`;

        if (guesses.length > 0) {
            auralStatus += ` ${pluralize
                ? 'In order of most- to least-recent, they are'
                : 'It was'}: ${guesses.reverse().join(', ')}`;
        }

        return Object.assign({}, state, {auralStatus});
    }

    
    return state;
}

