async function getData(typamas,sugmuzar,mishkal) { 
  
  const dataToScore =await parent.filterMaslul(typamas, sugmuzar, 0);
  
  const numbertesua = dataToScore
    .map(obj => Number(obj.tesuam))
    .filter(num => num !== 0 && !isNaN(num));


  const numbersharp = dataToScore
    .map(obj => Number(obj.sharp))
    .filter(num => num !== 0 && !isNaN(num));
  const mintesuam = Math.min(...numbertesua);
  const maxtesuam = Math.max(...numbertesua);
  const minsharp = Math.min(...numbersharp);
  const maxsharp = Math.max(...numbersharp);

  const avg = dataIndicators.find(obj => 
    obj.mozar===sugmuzar && obj.maslul.includes(typamas)
  );

  const avgTesuam = parseFloat(avg.tesuam);
  const avgSharp = parseFloat(avg.sharp);

  
  return scoreBack = calculateScore(
    dataToScore, avgTesuam, avgSharp,
    mintesuam, maxtesuam,
    minsharp, maxsharp,mishkal
  );
  
}

function calculateScore(arr, avgTesuam, avgSharp, mintesuam, maxtesuam, minsharp, maxsharp,mishkal) {
  const scoreList=[];
  const paarPlusTesua = maxtesuam - avgTesuam;
  const paarMinusTesua = mintesuam - avgTesuam;
  const paarPlusSharp = maxsharp - avgSharp;
  const paarMinusSharp = minsharp - avgSharp;

  const maparr= arr.map(obj => {
    const tesuam = Number(obj.tesuam);
    const sharp = Number(obj.sharp);

    // בדיקה אם ערכים חסרים או לא תקינים
    const validTesua = !isNaN(tesuam) && tesuam !== 0;
    const validSharp = !isNaN(sharp) && sharp !== 0;

    if (!validTesua || !validSharp) {
      return { ...obj, score: null }; // או פשוט לא להוסיף בכלל score
    }

    const tesuamScore = getSingleScore(tesuam, avgTesuam, paarMinusTesua, paarPlusTesua);
    
    const sharpScore = getSingleScore(sharp, avgSharp, paarMinusSharp, paarPlusSharp);
    
    const finalScore = tesuamScore * (1-Number(mishkal)/100) + sharpScore * Number(mishkal)/100;

obj.finalScore = Number(finalScore.toFixed(2));
scoreList.push({
  shemkupa:obj.shemkupa,finalScore:obj.finalScore,
  tesuam:obj.tesuam,
  sharp:parseFloat(obj.sharp),
  avgSharp:avgSharp,
  avgTesuam:avgTesuam
})
   
  });
  scoreList.sort((a, b) => b.finalScore - a.finalScore);
  return scoreList;
}

function getSingleScore(val, avg, paarMinus, paarPlus) {
  const diff = val - avg;
  var baseScore;
  if(diff<0){
     baseScore=75-(diff/paarMinus*25)
  }
  else if(diff>0){
     baseScore=75+(diff/paarPlus*25)
  }
  else{
    baseScore=80
  }
  
  return baseScore;
}
