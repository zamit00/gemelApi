let hasifachoose;
function hasifch(z){
  if(z.id==="stocks"){hasifachoose='stocks'}
  else if(z.id==="currency"){hasifachoose='currency'}
  else if(z.id==="abroad"){hasifachoose='abroad'}


}
function notfind(x){
  const expo=document.getElementsByClassName('circular-progress')
    Array.from(expo).forEach(exp=>{
      exp.style.display='none'
    })
  Swal.fire({
    title: "<span style='color: green; font-size: 16px;'>לא נמצאו מסלולים מתאימים</span>",
    
    icon: "error",
    width: "clamp(300px, 90vw, 600px)",
          position: "center", 
          timer: 2000, 
          showConfirmButton: false,
          timerProgressBar: true, 
          background: "#fff",
          customClass: {
            popup: 'swal2-center-custom'
          }
        });
    
   /* let ahuzStart='';
    let stocksValue = document.getElementById("stocks");
    let currencyValue = document.getElementById("currency");
    let abroadValue = document.getElementById("abroad");
    if(hasifachoose==='stocks'){ahuzStart=stocksValue.value;stocksValue.value=ahuzStart-1}
    else if(hasifachoose==='currency'){ahuzStart=currencyValue.value;currencyValue=ahuzStart-1}
    else if(hasifachoose==='abroad'){ahuzStart=abroadValue.value;abroadValue.value=ahuzStart-1}
    
    Swal.fire({
      title: "<span style='color: green; font-size: 16px;'>לא נמצאו מסלולים מתאימים - לחפש משהו בקירוב?</span>",
      width: "90vw", 
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "כן, מצא לי",
      cancelButtonText: "לא, בטל",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33"
  }).then((result) => {
      if (result.isConfirmed) {
          console.log("המשתמש אישר");
          Array.from(expo).forEach(exp=>{
            exp.style.display='flex';
          })
      } else {
          console.log("המשתמש ביטל");
          Array.from(expo).forEach(exp=>{
            exp.style.display='flex';
          })
      }
  });
  */
    //do {
    //  console.log(currencyValue.value);
   //   count++;
 // } while (count < 5);
}
async function fetchdataJasonh(x) {
  
  try {
      const response = await fetch(x); 
      if (!response.ok) {
          throw new Error(`שגיאה: ${response.status} ${response.statusText}`);
      }
      const data = await response.json(); 
      if(x==='dataJasonM.json'){
      datanetunimKlaliX = data.filter(item=>(!item.ochlosiyayaad.includes('עובדי סקטור מסויים')
      &&  !item.ochlosiyayaad.includes('עובדי מפעל/גוף מסויים') && Number( item.tesuam)!==0)
    && !item.menahelet.includes('סלייס'))  ;
    return datanetunimKlaliX;
      }
    else{return data};
        // חובה להחזיר נתונים כדי שהפונקציה תחכה באמת
  } catch (error) {
      console.error('שגיאה בשליפת הנתונים:', error);
      throw error;  // נזרוק את השגיאה כדי ש-Promise.all יוכל לטפל בה
  }
}
 async function submitForm(x) {
const xid=x.id;
  const table = document.getElementById('tblHasifot');
  
  table.innerHTML='';
  document.querySelectorAll('.slct').forEach(slc => {
    slc.disabled = false;
  });
      let product = document.getElementById("product").value;
      if(product==='קרנות השתלמות' || product==='תגמולים ואישית לפיצויים'
         || product==='קופת גמל להשקעה' || product==='קופת גמל להשקעה - חסכון לילד' ){
          var data=await fetchdataJasonh('dataJasonM.json');
         }
      else if(product==='קרנות חדשות'){
        var data=await fetchdataJasonh('dataJasonP.json');
      }
      else if(product==='פוליסות חסכון'){
        var data=await fetchdataJasonh('dataJasonB.json');
      }

let stocksValue = document.getElementById("stocks").value;
let currencyValue = document.getElementById("currency").value;
let abroadValue = document.getElementById("abroad").value;
var filteredData;
  if(product!=='פוליסות חסכון'){ 
      filteredData = data.filter(item => {
        return (
            item.mozar===product &&
            isInRange(item.kvutzaAhuz4751, stocksValue) &&
            isInRange(item.kvutzaAhuz4761, currencyValue) &&
            isInRange(item.kvutzaAhuz4752, abroadValue)
        );
    });
  }
  else{
    filteredData = data.filter(item => {
      return (
          item.mozar===product &&
          isInRange(item.kvutzaAhuz4751, stocksValue) &&
          isInRange(item.kvutzaAhuz4753, currencyValue) &&
          isInRange(item.kvutzaAhuz4752, abroadValue)
      );
  });
  
  }
            table.innerHTML='';
            if(filteredData.length===0){x.selectedIndex = 0;notfind(x);return;}
            table.innerHTML=`<tr style="font-weight: bold;background-color: blue;color: white;
            border:none;width:95vw;">	
           				
            <td class="tdbig" style="width:35vw;text-align:center;">שם המסלול</td>
						 <td class="tdsmall" style="width:14vw;text-align:center;">תשואה שנה</td>	
            <td class="tdsmall" style="width:14vw;text-align:center;">מניות</td>
						<td class="tdsmall" style="width:14vw;text-align:center;">חול<i class="fa fa-sort"></i></td>
						<td class="tdsmall" style="width:14vw;text-align:center;">מטח<i class="fa fa-sort"></i></td>
					</tr>`
          filteredData.sort((a, b) => b.tesuam - a.tesuam);
          for (let tb = 0; tb < filteredData.length; tb++) {
            
                const trm = document.createElement('tr');
                // יצירת תא שני עם קישור
                
                td = document.createElement('td');
                td.style.color = '#333';
                td.className="tdbig";
                td.style.boxSizing="border-box";
                td.style.textAlign = "right";
                td.style.boxSizing="border-box";
                td.style.paddingRight = "5px";
                td.textContent = filteredData[tb].shemkupa;
                trm.appendChild(td);
                td = document.createElement('td');
                td.style.color = 'darkgreen';
                td.className="tdsmall";
                td.style.boxSizing="border-box";
                td.style.textAlign="center";
                td.textContent = filteredData[tb].tesuam + "%";
                trm.appendChild(td);
                // יצירת תא שלישי עם נתון מ-fetchtuaa
                td = document.createElement('td');
                td.style.color = 'darkgreen';
                td.className="tdsmall";
                td.style.boxSizing="border-box";
                td.style.textAlign="center";
                if (filteredData[tb].kvutzaAhuz4751) { td.textContent = filteredData[tb].kvutzaAhuz4751 + "%"; }
                trm.appendChild(td);
                // יצירת תאים נוספים
                td = document.createElement('td');
                td.style.color = '#333';
                td.className="tdsmall";
                td.style.boxSizing="border-box";
                td.style.textAlign="center"
                if (filteredData[tb].kvutzaAhuz4752) { td.textContent = filteredData[tb].kvutzaAhuz4752 + "%"; }
                trm.appendChild(td);
                td = document.createElement('td');
                td.style.color = 'green';
                td.className="tdsmall";
                td.style.boxSizing="border-box";
                td.style.textAlign="center"
                if(product!=="פוליסות חסכון"){
                if (filteredData[tb].kvutzaAhuz4761) { td.textContent = filteredData[tb].kvutzaAhuz4761 + "%"; }
                }
                else{
                  if (filteredData[tb].kvutzaAhuz4753) { td.textContent = filteredData[tb].kvutzaAhuz4753 + "%"; }
                }
                trm.appendChild(td);
                table.appendChild(trm);
            
        }

document.querySelectorAll('.tblHasifot td').forEach(td => {
  let text = td.textContent.trim();
  if (text.startsWith("-")) {
      td.innerHTML = `<span style="direction: ltr; display: inline-block;">${text}</span>`;
  }
});
var z=0
document.querySelectorAll('.tblHasifot tr').forEach(tr => {
  if(z!==0 && Number(z) % 2 ==0){
    tr.style.backgroundColor ="rgb(237, 229, 229)";
  }
  z++;
});
   if(table.rows.length) {
     if(table.rows.length>1){
     Swal.fire({
    title: `<span style='color: green; font-size: 16px;'> נמצאו ${table.rows.length-1} מסלולים מתאימים</span>`,
   
    icon: "success",
    width: "clamp(300px, 90vw, 600px)",
          position: "top", 
          timer: 2000, 
          showConfirmButton: false,
          timerProgressBar: true, 
          background: "#fff",
          customClass: {
            popup: 'swal2-center-custom'
          }
        });
     }
   
   }    
 }  
 
  
function isInRange(value, selectedValue) {
    if (selectedValue === "") return true; // אין סינון
    value = parseFloat(value);
    selectedValue = parseFloat(selectedValue);
    if (selectedValue === '') return value >= -100 && value <= 150;
    if (selectedValue === 15) return value >= 0 && value <= 15;
    if (selectedValue === 30) return value > 15 && value <= 30;
    if (selectedValue === 50) return value > 30 && value <= 50;
    if (selectedValue === 70) return value > 50 && value <= 70;
    if (selectedValue === 100) return value > 70; // מעל 70
    return false;
}
      
        
function doTheCircle(x) {
  const expo=document.getElementsByClassName('circular-progress')
    Array.from(expo).forEach(exp=>{
      exp.style.display='flex'
    })
  const selectedValue = x.value; // הערך שנבחר
  console.log('selected:'+selectedValue)
  const progressBar = document.querySelector(`#${x.id}circle`); // מוצא את המעגל המתאים
  const progressValue = progressBar.querySelector(".percentage");
  var progressColor = "green";
  if(x.id==='stocks'){progressColor = "blue"}
  if(x.id==='abroad'){progressColor = "red"}
  const bgColor = progressBar.getAttribute("data-bg-color");

  if (!selectedValue) {
    progressBar.style.background = `conic-gradient(${bgColor} 0deg, ${bgColor} 360deg)`;
    progressValue.textContent = "לא נבחר";
    return;
  }

  if (selectedValue === '') { return; }

  // הגדרת זוויות התחלה וסוף על פי הערך שנבחר
  let startValue = 0;
  let endValue = 0;

  switch(selectedValue) {
    case '15':
      startValue = 0;
      endValue = 15 / 100 * 360;
      break;
    case '30':
      startValue = 15 / 100 * 360;
      endValue = 30 / 100 * 360;
      break;
    case '50':
      startValue = 30 / 100 * 360;
      endValue = 50 / 100 * 360;
      break;
    case '70':
      startValue = 50 / 100 * 360;
      endValue = 70 / 100 * 360;
      break;
    case '100':
      startValue = 70 / 100 * 360;
      endValue = 100 / 100 * 360;
      break;
  }

  // אתחול הגרדיאנט עם צבע רקע לכל המעגל
  progressBar.style.background = `conic-gradient(${bgColor} 0deg, ${bgColor} 360deg)`;
  
  // אנימציה למילוי הדרגתי של המקטע הספציפי בלבד
  const speed = 15;
  let currentAngleAnim = startValue; // מתחילים מזווית ההתחלה

  const progress = setInterval(() => {
    currentAngleAnim += 1; // כל פעם להוסיף 1 מעלה
    if (currentAngleAnim <= endValue) {
      // עדכון אחוזים לפי המקטע הנוכחי
     
      progressValue.textContent = `${Math.round(endValue/3.6)}%`;
      if(x.id==='stocks'){progressValue.style.color ='green'}
      if(x.id==='abroad'){progressValue.style.color ='blue'}
      if(x.id==='currency'){progressValue.style.color ='red'}
      // עדכון הגרדיאנט - צובע רק את המקטע הנוכחי
      progressBar.style.background = `conic-gradient(
        ${bgColor} 0deg, 
        ${bgColor} ${startValue}deg, 
        ${progressColor} ${startValue}deg, 
        ${progressColor} ${currentAngleAnim}deg, 
        ${bgColor} ${currentAngleAnim}deg, 
        ${bgColor} 360deg
      )`;
    } else {
      clearInterval(progress); // סיום האנימציה
    }
  }, speed);
};

      
      


