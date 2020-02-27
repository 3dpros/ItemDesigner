

function getParameterDefinitions () {
  return [
    {name: 'Configuration', type: 'group', caption: 'Design Options'},
    {name: 'Text', initial: 'Line 1\nLine 2\nLine 3', type: 'textbox', caption: 'Text', height: '5'},
    {name: 'color',
    type: 'choice',
    caption: 'Color',
    values: ['black', 'gray', 'blue', 'green', 'red'],
    captions: ['Black', 'Gray', 'Blue', 'Green', 'Red']
    },
    {name: 'style',
    type: 'choice',
    caption: 'Text Style',
    values: ['gothic', 'arial'],
    captions: ['Sharp', 'Rounded'],
    },

    //{name: 'hidePlate', checked: false, type: 'checkbox', caption: 'Hide Plate'},
   
    {name: 'sizeOpt',
    type: 'choice',
    caption: 'Height',
    values: ['6', '8'],
    captions: ['6"', '8"'],
    initial: '6', 
    internal: true
  },

    {name: 'bananaInternal', checked: false, type: 'checkbox', caption: 'Banana for Scale', internal: true},
    {name: 'renderMode',
    type: 'choice',
    caption: 'Render Mode',
    values: ['all', 'base', 'text'],
    captions: ['Show All', 'Base Only', 'Text Only'],
    initial: 'all', internal: true
  },
    //{name: 'color', type: 'color', initial: '#0F0F0F', caption: 'Color?'}
  ];
}

function main (param) {
  include("/../kettlebellModelBase.jscad");
  return kettlebellModel(param, mode = 0);
}


