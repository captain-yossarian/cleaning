import {ADD_TO_CART} from '../constans';
import cartReducer from './cart.reducer.js';

import {shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {initialState} from './cart.reducer.js';

configure({adapter: new Adapter()});

describe('Reducer::addToCart', () => {
  it('should return the initial state', () => {
    expect(cartReducer(undefined, {})).toEqual({
      cart: [
        {
          product: 'bread 700g',
          quantity: 2,
          unitCost: 90
        }, {
          product: 'milk 500ml',
          quantity: 1,
          unitCost: 47
        }
      ]
    })
  })
  it('should handle ADD_TO_CART', () => {
    expect(cartReducer(initialState, {
      type: ADD_TO_CART,
      payload: {
        product: 'Ukrainian salo 5kg',
        quantity: 5,
        unitCost: 1000
      }
    })).toEqual({
      cart: [
        {
          product: 'bread 700g',
          quantity: 2,
          unitCost: 90
        },
        {
          product: 'milk 500ml',
          quantity: 1,
          unitCost: 47
        },{
          product: 'Ukrainian salo 5kg',
          quantity: 5,
          unitCost: 1000
        }
      ]
    })



  })
});
