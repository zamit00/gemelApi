
async function bring(data,mikom) {
    
    const mhkupa = data[0].mh;
    const muzar = data[0].mozar; 
    const shemkupa = data[0].shemkupa;
    const maslul = data[0].mas;
    const tesuam = data[0].tesuam;
    const tesuam36 = data[0].tesuam36;
    const tesuam60 =data[0].tesuam60;
    const menahelet = data[0].menahelet;
    const yitratnechasim=data[0].yitratnechasim;
    const stiya36=data[0].stiya36;
    const stiya60=data[0].stiya60;
    const mas = await maslultype(maslul);
    document.getElementById('pdf').style.display='block';
    document.getElementById('kupa').innerHTML=shemkupa;
    document.getElementById('sugmuzar').innerHTML='<span style="color: orangered;">'
    +'סוג המוצר: '+ '</span>'+muzar; 
    if(maslul!==undefined){  
    document.getElementById('sugmaslul').innerHTML='<span style="color: orangered;">'
    +'אפיק ההשקעה: '+ '</span>'+maslul
    document.getElementById('ofi').innerHTML='<span style="color: orangered;">'
    +'אופי מסלול ההשקעה: '+ '</span>'+mas[0]}
    document.getElementById('mhkupa').innerHTML='<span style="color: orangered;">'
    +'מספר קופה: '+ '</span>'+mhkupa
    document.title =shemkupa+mhkupa;
    let tesuaMitchilatshana=data[0].tesuaMitchilatshana;
    let ramatsikon= data[0].ramatsikon; let shiurmenayut= data[0].kvutzaAhuz4751;
     let baaretz= data[0].kvutzaSug4731; let shiurbaaretz= data[0].kvutzaAhuz4731;
     let behul= data[0].kvutzaSug4761; let shiurbehul= data[0].kvutzaAhuz4761;
    document.getElementById('stiya36').innerHTML='<span style="color: orangered;">'
      +'סטיית תקן ל - 3 שנים: '+ '</span>'+stiya36;
    var tchilatshana=1;
    var yValues = [];
    var xValues = [];
    var yValuesM = [];
    var miztaberet=1;var numpush;
    var numString; var year;var month;var formattedDate;
    for (let r = 1; r <= 12; r ++) {
        const kvutza=`tesua${r}`
        let parts = data[0][kvutza].split("=");
        yValues.push(Number(parts[0]));
        miztaberet=miztaberet*(1+Number(parts[0]/100));
        numpush=Number(((miztaberet-1).toFixed(4)*100).toFixed(2));
        yValuesM.push(numpush);
        numString = parts[1].toString();
        year = numString.substring(0, 4);
        month = numString.substring(4, 6);
        formattedDate = month + '/' + year;
        xValues.push(formattedDate);
    }
    document.getElementById("miztaberet").innerHTML ='<span style="color: orangered;">'
    + 'תשואה מצטברת מתחילת שנה: '+ '</span>'+data[0].tesuaMitchilatshana+"%"
    document.getElementById("shana").innerHTML ='<span style="color: orangered;">'
    + 'תשואה מצטברת לשנה: '+ '</span>'+tesuam+"%";
    document.getElementById("shalosh").innerHTML ='<span style="color: orangered;">'
      + 'תשואה מצטברת ל -3 שנים: '+ '</span>'+tesuam36+"%";
      if(maslul!==undefined && mikom!==''){
    document.getElementById("derog").innerHTML ='<span style="color: orangered;">'
    + 'דירוג: '+ '</span>'+
  'הקופה מדורגת במקום ה - <span style="color: green;font-size:22px">' + mikom + '</span>' + 
  ' באפיק ההשקעה ' + maslul + '.';}
  else{
    document.getElementById("derog").innerHTML ='<span style="color: orangered;">'
    + 'דירוג: '+ '</span>'+
  'הקופה מדורגת במקום ה - <span style="color: green;font-size:22px">' + mikom + '</span>' + 
  ' באפיק ההשקעה '  + '.';
  }
    var barColors = yValues.map(function (value) {
        return value >= 0 ? "green" : "red"; // Green for positive values, red for negative values
    });
var existingChart = Chart.getChart("myChartkupa"); // מחפש אם יש גרף קיים
if (existingChart) {
    existingChart.destroy(); // הורס את הגרף הקודם
}
    new Chart("myChartkupa", {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: "תשואות 12 חודשים אחרונים"
                    ,font: {
                size: 20,  
                family: 'Arial',  // Optional: set the font family
                weight: 'bold'  // Optional: set the font weight
            },
            color: 'blue'  // Set the text color
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    min: Math.min(0, Math.min(...yValues))
                },
                x: {
                    ticks: {
                        autoSkip: false
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
    document.getElementById('ramatsikon').innerHTML='<span style="color: orangered;">'
                +'רמת סיכון: '+ '</span>'+ramatsikon ;
    document.getElementById('menayot').innerHTML='<span style="color: orangered;">'
                +'חשיפה למניות: '+ '</span>'+shiurmenayut+"%";
   document.getElementById('behul').innerHTML='<span style="color: orangered;">'
                +'חשיפה למטח: ' + '</span>'+ shiurbehul+"%";
    document.getElementById('baaretz').innerHTML='<span style="color: orangered;">'
                +'שיעור נכסים בארץ: '+ '</span>'+shiurbaaretz+"%";
    existingChart = Chart.getChart("myChart"); // מחפש אם יש גרף קיים
        if (existingChart) {
                    existingChart.destroy(); // הורס את הגרף הקודם
        }
     
     existingChart = Chart.getChart("myChart"); // מחפש אם יש גרף קיים
        if (existingChart) {
            existingChart.destroy(); // הורס את הגרף הקודם
        }    
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart("myChart", {
        type: 'line',
        data: {
            labels: xValues,
            datasets: [{
                data: yValuesM,
                borderColor: 'blue',
                borderWidth: 2,
                pointRadius: 5,
                pointBackgroundColor: 'green',
                fill: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'תשואה חודשית מצטברת 12 חודשים',
                    color: 'blue',
                    font: {
                        size: 20
                    }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'חודש'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'תשואה (%)'
                    }
                }
            }
        }
    });

    
    
    
    var nehasim=[];
    for (let i = 4701; i <= 4710; i++) {
      const keySchum = `kvutzaSchum${i}`;
      const keyAhuz = `kvutzaAhuz${i}`;
      const keySug = `kvutzaSug${i}`;
    if (data[0][keySchum]>0) {
        nehasim.push(data[0][keySug]);
        nehasim.push(data[0][keySchum]);
        nehasim.push(data[0][keyAhuz]);
    }
}
       pie(nehasim);    
}
// פונקציות tesua ו-maslultype ללא שינוי

async function maslultype(y) {
    try {
        const response = await fetch('ofihashkaa.xml');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const xmlString = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "application/xml");
        const rows = xmlDoc.getElementsByTagName("Row");
        var databack=[];
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const mhkupa = row.getElementsByTagName("ID")[0]?.textContent || '';
            const shemkupa = row.getElementsByTagName("SHM_KUPA")[0]?.textContent || '';
            const sikon = row.getElementsByTagName("SIKON")[0]?.textContent || '';
            if (mhkupa === y) {
                databack.push(shemkupa);
                databack.push(sikon)
                return databack;
            }
        }
        return [];
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
    
}
let pieChartInstance; 

function pie(nehasim) {
    var tda, trma;
    const tbl = document.getElementById('nehasim');   
    document.getElementById('nehasimkot').innerText = 'חלוקת נכסים לקבוצות ראשיות:';  
    tbl.innerHTML = ""; // איפוס הטבלה לפני הוספת נתונים חדשים

    var shemhaneches = [], ahuzhaneches = [];
    for (let i = 0; i < nehasim.length; i += 3) {
        trma = document.createElement('tr');
        trma.className = 'trkupa';
        tda = document.createElement('td');
        tda.className = "tdmhkupa";
        tda.innerHTML = `<span style="font-weight: bold; color: blue;">${nehasim[i]}:</span> 
                          ${Number(nehasim[i + 2]).toFixed(2)}%`;
        shemhaneches.push(nehasim[i]);
        ahuzhaneches.push(Number(nehasim[i + 2]));

        trma.appendChild(tda);
        tbl.appendChild(trma);
    }
    var existingChart = Chart.getChart("pieChartkupa"); // מחפש אם יש גרף קיים
    if (existingChart) {
        existingChart.destroy(); // הורס את הגרף הקודם
    }  
    const ctx = document.getElementById("pieChartkupa");
    
    // אם קיים גרף קודם - הורסים אותו
    
    // יצירת גרף חדש
    pieChartInstance = new Chart("pieChartkupa", {
        type: "pie",
        data: {
            labels: shemhaneches,
            datasets: [{
                data: ahuzhaneches,
                backgroundColor: [
                    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", 
                    "#9966FF", "#FF9F40", "#C9CBCF", "#8B0000", "#FFD700"
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: "פיזור נכסים",
                    font: {
                        size: 20,
                        family: "Arial",
                        weight: "bold"
                    },
                    color: "#333"
                },
                legend: {
                    display: true,
                    position: "bottom",
                    align: "end"
                }
            }
        }
    });
}


/*    function exportToPDF() {
        document.getElementById('closeinfo').style.display='none';
        const element = document.getElementById('kupaInfo');
        const originalDisplay = element.style.display;
    
        element.style.display = 'block';
        window.print();
        element.style.display = originalDisplay;
        document.getElementById('closeinfo').style.display='block';
}*/
function exportToPDF() {
    const element = document.getElementById('kupaInfo');
    const kupa = document.getElementById('mhkupa');
    const opt = {
        margin:       0.5,
        filename:     `${kupa.innerText}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
}
    
