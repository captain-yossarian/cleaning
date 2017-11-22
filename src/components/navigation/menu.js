export var menu = [
  {
    name: 'Home'

  }, {
    name: 'About'
  }, {
    name: 'Portfolio',
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
          },
          {
            name:'second',
            sub:[
              {name:'third'},
              {name:'third',
            sub:[
              {name:'fourth'}
            ]}
            ]
        }
        ]
      }
    ]
  }, {
    name: 'Blog',
    sub:[
      {name:'kiwi'},
      {name:'banana'}
    ]
  }, {
    name: 'Contacts'
  }, {
    name: 'Features',
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
