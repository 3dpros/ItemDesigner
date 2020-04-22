

function getParameterDefinitions () {
  return [
    {name: 'Design', type: 'group', caption: 'Design Options'},
    {name: 'sizeOpt',
    type: 'choice',
    caption: 'Size',
    values: ['6', '9', '12'],
    captions: ['6"', '9"', '12"'],
    initial: '6',
    },

    {name: 'banana', checked: true, type: 'checkbox', caption: 'Banana for Scale'},   
    //{name: 'color', type: 'color', initial: '#0F0F0F', caption: 'Color?'}
  ];
}



function main (param) {
  include("./BlockingBoardBase.jscad");
  include("./banana.jscad");

  items = [];
  if(param.sizeOpt == '6') {
    items.push(BBsix());
   } else if (param.sizeOpt == '9') {
     items.push(BBnine());
   } else if (param.sizeOpt == '12') {
    items.push(BBtwelve());
   }

  if(param.banana !== null && param.banana) {
    items.push(banana().rotateX(90).translate([-50,150,200]));
  }
  return items;
}

