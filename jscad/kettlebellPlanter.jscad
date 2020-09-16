function getParameterDefinitions () {
  var defaultVariantType = '1'; 
  return [
    {name: 'Configuration', type: 'group', caption: 'Design Options'},
    {name: 'Text', initial: 'Line 1\nLine 2\nLine 3', type: 'textbox', caption: 'Text', height: '5'},
    {name: 'color',
    type: 'choice',
    caption: 'Color',
    values: ['black', 'blue', 'green', 'red'],
    captions: ['Black', 'Blue', 'Green', 'Red']
    },
    {name: 'BackText', initial: '', type: 'textbox', caption: 'Back Text (if different)', height: '5'},
    {name: 'style',
    type: 'choice',
    caption: 'Text Style',
    values: ['gothic', 'arial'],
    captions: ['Sharp', 'Rounded'],
    initial: 'gothic'
    },

    //{name: 'hidePlate', checked: false, type: 'checkbox', caption: 'Hide Plate'},
   
    {name: 'sizeOpt',
    type: 'choice',
    caption: 'Height',
    values: ['6', '8', '16'],
    captions: ['6"', '8"', "unset"],
    initial: '16', //hack until we have camera settings per model
    internal: true
  },
  {name: 'textScale', type: 'slider', initial: 100, min: 50, max: 150, step: 10, caption: 'Text Scale'},
  {name: 'variant',
  type: 'choice',
  caption: 'Variant',
  values: ['0', '1', '2'],
  captions: ['Model', 'Planter', 'Pencil Holder'],
  initial: defaultVariantType, internal: true
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
  return kettlebellModel(param);
}


