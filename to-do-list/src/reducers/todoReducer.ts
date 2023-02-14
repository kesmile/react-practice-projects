export default function reducer(state:any[], action: any) {
    let newState = [];
    switch (action.type) {
      case 'setState':
        newState = action.payload
        break;
      case 'add':
        newState = [
          ...state,
          {
            name: action.name,
            check: false
          }
        ];
        break;
      case 'remove':
        newState = state.filter((_, index) => index != action.index);
        break;
      case 'check':
        newState = state.map((item, index) => {
          if (index === action.index) {
            item.check = !item.check
          }

          return item;
        })
        break;
    }
    return newState;
  }