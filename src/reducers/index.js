import {MAKE_GUESS} from '../actions'


const initialState = {
    guesses: [],
    feedback: 'Make your guess',
    correctAnswer: Math.round(Math.random() * 100) + 1
};

export const reducer = (state=initialState, action) => {
    console.log(state)
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

    return state;
}

