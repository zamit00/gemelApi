//gemel datagov
    fetch('https://data.gov.il/api/3/action/datastore_search?resource_id=a30dcbea-a1d2-482c-ae29-8f781f5025fb&limit=32000')
  .then(response => response.json())
  .then(data => {
   const array = Object.values(data.result);
   const nestedArray = array[5];
   //nestedArray.filter(obj.FUND_CLASSIFICATION==='קרנות השתלמות');   
   console.log(nestedArray)
 console.log(nestedArray[1].FUND_NAME);
  

   // console.log('Total results:', data.result.total);
   // console.log('Records:', datanetunimGemelNet.result.records);
   // console.log(Array.isArray(data));
  })
  .catch(error => console.error('Fetch error:', error));
//pensia datagov
    fetch('https://data.gov.il/api/3/action/datastore_search?resource_id=6d47d6b5-cb08-488b-b333-f1e717b1e1bd&limit=32000')
  .then(response => response.json())
  .then(data => {
   console.log('Total results:', data.result.total);
    console.log('Records:', data.result.records);
  })
  .catch(error => console.error('Fetch error:', error));
  
  //bituach datagov
    fetch('https://data.gov.il/api/3/action/datastore_search?resource_id=c6c62cc7-fe02-4b18-8f3e-813abfbb4647&limit=32000')
  .then(response => response.json())
  .then(data => {
    datanetunimBituachNet=data;
   console.log('Total results:', data.result.total);
    console.log('Records:', data.result.records);
  })
  .catch(error => console.error('Fetch error:', error));
  /*
// פעולת סיכום
 function totalsData(){
   const totals = datanetunimKlaliXM.filter(obj => obj.mozar === 'קרנות השתלמות')
  .reduce(
    (acc, item) => {
      acc.hafkadot += parseFloat(item.hafkadot);
      acc.meshichot += parseFloat(item.meshichot);
      acc.niyudNeto += parseFloat(item.niyudNeto);
      acc.zviraNeto += parseFloat(item.zviraNeto);
      return acc;
    },
    { hafkadot: 0, meshichot: 0, niyudNeto: 0, zviraNeto: 0 }
  );
  const roundedTotals = {
  hafkadot: Math.round(totals.hafkadot),
  meshichot: Math.round(totals.meshichot),
  niyudNeto: Math.round(totals.niyudNeto),
  zviraNeto: Math.round(totals.zviraNeto),
};
    console.log('total:', roundedTotals);
}
*/
