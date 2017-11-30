
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
export {menu};
