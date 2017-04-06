import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS } from '../constants';
import { bake_cookie, read_cookie } from 'sfcookies';

// helper reminder function that returns an action
const reminder = (action) => {
	let {text, dueDate} = action;
	return {
		id: Math.random(),
		text: text,
		dueDate: dueDate
	}
}

const removeById = (state= [], id) => {
	// filters return new arrays of data rather than modify them
	const reminders = state.filter(reminder => reminder.id !== id);
	console.log('new reduced reminders', reminders);
	return reminders;
}

const reminders = (state = [], action) => {
	let reminders = null; // will be returned as a state
	state = read_cookie('reminders'); // initalise what is stored instead of using empty array
	// type in action tells you how to modify state
	switch(action.type){
		case ADD_REMINDER:
			// first is current spread state, next is current reminder with action
			reminders = [...state, reminder(action)] // spread copies content of one object to another/ even array.
			bake_cookie('reminders', reminders); // add reminder cookie to browser
			return reminders;
		case DELETE_REMINDER:
			// cannot modify state. Need to return a new state.
			reminders = removeById(state, action.id);
			bake_cookie('reminders',reminders);
			return reminders;
		case CLEAR_REMINDERS:
			reminders = []
			bake_cookie('reminders',reminders);
			return reminders;
		default:
			return state;
	}

}

export default reminders;
