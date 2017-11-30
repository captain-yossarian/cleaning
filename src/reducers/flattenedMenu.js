import { normalize, schema } from 'normalizr';
// Define a users schema


var menu = {
  roots: {
    0: {
      name: 'Home',
      tabindex: 0,
      id: 0
    },
    1: {
      name: 'About',
      tabindex: -1,
      id: 1
    },
    2: {
      name: 'Portfolio',
      tabindex: -1,
      id: 2,
      children: {
        submenu:{
          1: {
            name: 'sub1'
          },
          2: {
            name: 'sub2'
          },
          3: {
            name: 'sub3'
          }
        }
      }
    },
    3: {
      name: 'Blog',
      tabindex: -1,
      id: 3
    },
    4: {
      name: 'Contacts',
      tabindex: -1,
      id: 4
    },
    5: {
      name: 'Features',
      tabindex: -1,
      id: 5
    }
  }
}
function mock(state, action) {
  switch (action.type) {
    case 'add':
      return {
        ...state.roots,
        [action.id]: 100
      }
      break;
  }
}

var result = mock(menu, {
  type: 'add',
  id: 2
})

const user = new schema.Entity('users');

// Define your comments schema
const comment = new schema.Entity('children', {
  submenu: user
});

// Define your article
const article = new schema.Entity('articles', {
  roots: user,
  children: [ comment ]
});

const normalizedData = normalize(menu, article);
export {result, menu,normalizedData};
