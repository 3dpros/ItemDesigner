// title      : Hull
// author     : Rene K. Mueller
// license    : MIT License
// description: testing hull() function
// file       : hull.jscad

function getParameterDefinitions () {
  return [
    {name: 'numSlots', initial: 3, min: 1, max: 5, step: 2, type: 'slider', caption: 'Number of Slots'},
    {name: 'slotSize',initial: 18, min: 10, max: 30, step: 1,  type: 'slider', caption: 'Slot Size (mm)'}
  ];
}

function main (params) {
  numSlots = params.numSlots;
  slotSize = params.slotSize-0;
  thickness = 3;
  var o = [];
  var cuts = [];

  for(i=0;i<numSlots+2;i++)
  {
     cuts.push(linear_extrude({height: 100},
  hull(
    circle({r: slotSize/2, center: false}).translate([-2, 80, 0]),
    circle({r: 4, center: false}).translate([slotSize-12,0,0]),
    circle({r: 4, center: false}).translate([0,0,0])

  )).translate([i*(slotSize+thickness/2), 0, 0]))
  }
  o.push(linear_extrude({height: 100},square({size: [(slotSize+thickness/2) * numSlots+17, 80], center: false}).translate([slotSize-10,-thickness,0])))
  return union(o).subtract(cuts).setColor([.3,.3,.3])

}
