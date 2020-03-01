// title: Spring
// author: Eduard Bespalov
// license: MIT License
// description: testing solidFromSlices()
function getParameterDefinitions () {
    return [
      {name: 'waviness', initial: 5, min: 0, max: 20, step: 2, type: 'slider', caption: 'Waviness'},
      {name: 'twistiness', type: 'slider', initial: 3, min: 0, max: 10, step: 1, caption: 'Twistiness'},
      {name: 'funkiness', type: 'slider', initial: 3, min: 0, max: 10, step: 1, caption: 'Funkiness'},
      {name: 'growiness', type: 'slider', initial: 0, min: -5, max: 5, step: 1, caption: 'Growiness'} 
    ];
  }
  
  function main(params) {
      var sqrt3 = Math.sqrt(3) / 2;
      var radius = 2;
  
      var hex = CSG.Polygon.createFromPoints([
              [radius, 0, 0],
              [radius / 2, radius * sqrt3, 0],
              [-radius / 2, radius * sqrt3, 0],
              [-radius, 0, 0],
              [-radius / 2, -radius * sqrt3, 0],
              [radius / 2, -radius * sqrt3, 0]
      ]);
      
  //	var hex = circle({center: [0,0], radius: 1, segments: 6})
     var offset = params.funkiness/20

      var resolution = 500
      var objects = [];
      objects.push( hex.solidFromSlices({
          numslices: resolution,
          callback: function(t, slice) {
              var rotate = 1 + Math.cos(slice/300*params.waviness)*.2 + params.growiness* slice / 4000
              return this.translate([offset, offset, slice/resolution*10]).rotateZ(slice/20*params.twistiness).scale([rotate, rotate, 1])
          }
      }).translate([-offset, -offset,0]).scale(30).translate([0,0,-100]).rotateX(-90).setColor([2,2,2]));
      objects.push(cylinder({r: 90, h: 45, fn: 200}).translate([0,0,-45]).setColor([245/255,191/255,73/255]).translate([0,0,-100]).rotateX(-90));

      return objects;
  }
  