// a reducer takes in two things:
// 1. the action (info about what happened)
// 2. copy of the current state

function axes(state = [], action) {
  switch(action.type) {
    case 'CHANGE AXIS PROPERTIES':
      return action.options;
    default:
      return state;
  }
}

export default axes;