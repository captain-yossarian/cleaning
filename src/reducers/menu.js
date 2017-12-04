let reset = {
  0: {
    id: 0,
		name:'zero',
    counter: 0,
    childIds: [1,2,3,4,5,6]
  },
  1: {
    id: 1,
		name:'one',
    tabindex:-1,
    parent:'root'
  },
  2: {
		name:'two',
    id: 2,
    tabindex:-1,
    parent:'root'
  },
  3: {
    id: 3,
		name:'three',
    tabindex:-1,
    parent:'root'

  },
  4: {
		name:'four',
    id: 4,
    tabindex:-1,
    childIds: [11],
    parent:'root'
  },
  5: {
    id: 5,
		name:'five',
    tabindex:-1,
    parent:'root'
  },
  6: {
    id: 6,
		name:'sixx',
    tabindex:-1,
    childIds: [7,8,9],
    parent:'root'
  },
	7:{
		id:7,
		name:'seven',
    tabindex:-1,
    parent:6
	},
	8:{
		id:8,
		name:'eight',
    tabindex:-1,
    parent:6
	},
		9:{
		id:9,
		name:'nine',
		childIds:[10],
    tabindex:-1,
    parent:6
	},
	10:{
		id:10,
		name:'ten',
    tabindex:-1,
    parent:9
	},
		11:{
		id:11,
		name:'eleven',
		childIds:[12],
    tabindex:-1,
    parent:4
	},
		12:{
		id:12,
		name:'tvelve',
    tabindex:-1,
    parent:11
	}
}
let menu = {
  0: {
    id: 0,
    name:'zero',
    counter: 0,
    childIds: [1,2,3,4,5,6]
  },
  1: {
    id: 1,
    name:'one',
    tabindex:0,
    parent:'root'
  },
  2: {
    name:'two',
    id: 2,
    tabindex:-1,
    parent:'root'
  },
  3: {
    id: 3,
    name:'three',
    tabindex:-1,
    parent:'root'

  },
  4: {
    name:'four',
    id: 4,
    tabindex:-1,
    childIds: [11],
    parent:'root'
  },
  5: {
    id: 5,
    name:'five',
    tabindex:-1,
    parent:'root'
  },
  6: {
    id: 6,
    name:'sixx',
    tabindex:-1,
    childIds: [7,8,9],
    parent:'root'
  },
  7:{
    id:7,
    name:'seven',
    tabindex:-1,
    parent:6
  },
  8:{
    id:8,
    name:'eight',
    tabindex:-1,
    parent:6
  },
    9:{
    id:9,
    name:'nine',
    childIds:[10],
    tabindex:-1,
    parent:6
  },
  10:{
    id:10,
    name:'ten',
    tabindex:-1,
    parent:9
  },
    11:{
    id:11,
    name:'eleven',
    childIds:[12],
    tabindex:-1,
    parent:4
  },
    12:{
    id:12,
    name:'tvelve',
    tabindex:-1,
    parent:11
  }
}

/*
var menu = [
  {
    name: 'Home',
    tabindex: 0,
    id: 0
  }, {
    name: 'About',
    tabindex: -1,
    id: 1
  }, {
    name: 'Portfolio',
    tabindex: -1,
    id: 2,
    sub: [
      {
        name: 'first'
      }, {
        name: 'first'
      }, {
        name: 'first'
      }, {
        name: 'first',
        sub: [
          {
            name: 'second'
          }, {
            name: 'second',
            sub: [
              {
                name: 'third'
              }, {
                name: 'third',
                sub: [
                  {
                    name: 'fourth'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }, {
    name: 'Blog',
    tabindex: -1,
    id: 3,
    sub: [
      {
        name: 'kiwi'
      }, {
        name: 'banana'
      }
    ]
  }, {
    name: 'Contacts',
    tabindex: -1,
    id: 4
  }, {
    name: 'Features',
    tabindex: -1,
    id: 5,
    sub: [
      {
        name: 'Multipage'
      }, {
        name: 'Options',
        sub: [
          {
            name: 'General',
            sub: [
              {
                name: 'Kapitan'
              }
            ]
          }, {
            name: 'Sidebars'
          }, {
            name: 'Fonts'
          }, {
            name: 'Socials'
          }
        ]
      }, {
        name: 'Page'
      }, {
        name: 'FAQ'
      }
    ]
  }
]
var generator=function(menu,deep=-1,coordinates=[]){
 deep+=1;
 return menu.forEach((elem,index)=>{
   coordinates[deep]=index;
   elem.coordinates=[...coordinates];
   if(elem.sub){
     var newCoordinates=coordinates.slice(0,deep+1);
     return generator(elem.sub,deep,newCoordinates)
   }else{
      return elem
   }
 })
};
var result = generator(menu);


class KeyController {
  constructor(coordinates) {
    this.coordinates = coordinates.slice();
    this.lastElement = this.coordinates.length - 1
  }
  levelUP() {
    if (this.coordinates[this.lastElement] == 0) {
      this.coordinates.pop();
      return this.coordinates;
    }
  }
}
/*
function moveTo(arr,current,destination){
	var temporary=current.slice();
	var lastElement=temporary.length-1;
  switch (destination){
    case 'left':
    switch (true){
      case (current.length==1):
				var destination=[temporary[lastElement]-1];
        return destination;
        break;
			case (current.length>1):
				if(temporary[lastElement]==0){
					temporary.pop();
					return temporary
				}
				temporary[lastElement]=temporary[lastElement]-1;
				return temporary;
				break;
    }
		case 'right':
			console.log(temporary.slice(0,1))

			break;
    break;
  }
}
 */
export {menu,reset};
