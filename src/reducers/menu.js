
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
export {menu};
