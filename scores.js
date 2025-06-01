function getData(datanetunim, dataIndicat){ 
const dataToScore=datanetunim.filter(obj => obj.tesuam !== undefined && obj.sharp !== undefined &&
    obj.mozar==="קרנות השתלמות" && obj.mas==="כללי" && !obj.ochlosiyayaad.includes('עובדי סקטור מסויים')
     && !obj.ochlosiyayaad.includes('עובדי מפעל/גוף מסויים') )
 
const avg=dataIndicat.filter(obj => obj['mozar'].includes('השתלמות') && obj['maslul'].includes('כללי'))[0]; 
const avgTesuam = parseFloat(avg.tesuam);
console.log(avgTesuam);
}
 function calculateScore(arr, avgTesuam, avgSharp) {
  return arr.map(obj => {
    const tesuamScore = getSingleScore(obj.tesuam, avgTesuam);
    const sharpScore = getSingleScore(obj.sharp, avgSharp);

    const finalScore = tesuamScore * 0.8 + sharpScore * 0.2;

    return { ...obj, score: finalScore };
  });
}

function getSingleScore(val, avg) {
  const diff = val - avg;
  const ratio = Math.abs(diff) / avg;

  let baseScore = 0;
  if (ratio <= 0.1) baseScore = 5;
  else if (ratio <= 0.2) baseScore = 10;
  else baseScore = 20;

  return diff >= 0 ? baseScore : -baseScore;
}
