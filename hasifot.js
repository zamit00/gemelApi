
const havarotMenahalot=['הראל פנסיה וגמל','כלל פנסיה וגמל',
  'מגדל מקפת קרנות פנסיה וקופות גמל','מנורה מבטחים פנסיה וגמל',
  'הפניקס פנסיה וגמל','אינפיניטי השתלמות, גמל ופנסיה','אלטשולר שחם גמל ופנסיה',
  'אנליסט קופות גמל','ילין לפידות ניהול קופות גמל','מור גמל ופנסיה','מיטב גמל ופנסיה'
]




function changehasifa(){
 tablhasifot();
}

function changehasifaMen(){
document.getElementById('allTheTables').style.display="none";
}


async function hasifotFilter(x,y) {

    if(document.getElementById('klalikoch0')){document.getElementById('allTheTables').innerHTML=''}
    
    try {
        const response = await fetch('dataJasonM.json');
        if (!response.ok) {
            throw new Error(`שגיאה: ${response.status} ${response.statusText}`);
        } else {
            var data = await response.json();
            data = data.filter(item=>(!item.ochlosiyayaad.includes('עובדי סקטור מסויים')
      &&  !item.ochlosiyayaad.includes('עובדי מפעל/גוף מסויים') && Number( item.tesuam)!==0)
    && !item.menahelet.includes('סלייס')) 
              return data
        }
    } catch (error) {
        console.error('שגיאה בשליפת הנתונים:', error);
         
    }
   
    


    if(y==='נמוכה'){ 
        data = data.filter(item => Number(item.kvutzaAhuz4751) <30 && item.mozar===x); 
    }
    else if(y==='גבוהה'){
        data = data.filter(item => Number(item.kvutzaAhuz4751) > 60 && item.mozar===x);
    }
    else if(y==='בינונית'){
        data = data.filter(item => Number(item.kvutzaAhuz4751) >= 30 && Number(item.kvutzaAhuz4751) <=60 && item.mozar===x);
    }
    
    
    let maslulim = new Set();
    for (let countmas = 0; countmas< data.length; countmas++) {
        if(!data[countmas].mas.includes('פאסיבי')
        && !data[countmas].mas.includes('חו\"ל')
    && !data[countmas].mas.includes('קיימות')
&& !data[countmas].mas.includes('הלכה איסלאמית'))
        maslulim.add(data[countmas].mas)

    }
   
    let maslulimArray = Array.from(maslulim);
    var z = 0;var typamas;var dataY;
    
    
    
    for (let i = 0; i < maslulimArray.length; i++) {
    
    let za = 0;
        dataY =await filterMaslul(maslulimArray[i], x)

      
        
        dataY.forEach(item=>{
            if(item.tesuam){
                za=1;  
            }    
        })
        
        
         addtbleAll(i,maslulimArray[i])
        
         
            const table = document.getElementById(`klalikoch${i}`);
           // if (!table){continue;}
            table.innerHTML='';
            table.innerHTML=`<tr style="font-weight: bold;background-color: blue;color: white;
            border:none;">						
						<td>מה</td>
                        			<td>שם המסלול</td>
						<td>שיעור מניות</td>
						<td>שנה</td>
						<td>3 שנים</td>
						<td>5 שנים</td>
					</tr>`

          if (!dataY || !Array.isArray(dataY)) {
            console.error(`Data is not valid for typamas: ${typamas}, mozkoch: ${mozkoch}`);
            return; 
        }
        
            for (let tb = 0; tb < dataY.length; tb++) {
                if (dataY[tb].tesuam) {
                    const trm = document.createElement('tr');

                    // יצירת תא ראשון
                    let td = document.createElement('td');
                    td.style.color = '#333';
                    td.className="tdmh";
                    td.style.boxSizing="border-box";
                    td.textContent = dataY[tb].mh;
                    trm.appendChild(td);

                    // יצירת תא שני עם קישור
                    td = document.createElement('td');
                    td.style.color = '#333';
                    td.className="tdbig";
                    td.style.boxSizing="border-box";
                    td.style.textAlign = "right";
                    td.style.boxSizing="border-box";
                    td.style.paddingRight = "5px";
                    let link = document.createElement('a');
                    link.href = '#';
                    link.className="linktdbig";
                    link.style.textDecoration = "none";
                   
                    link.textContent = dataY[tb].shemkupa;
                    td.appendChild(link);
                    trm.appendChild(td);

                    // יצירת תא שלישי עם נתון מ-fetchtuaa
                    td = document.createElement('td');
                    td.style.color = 'darkgreen';
                    td.className="tdsmall";
                    td.style.boxSizing="border-box";
                    td.style.textAlign="right";
                    td.textContent = dataY[tb].kvutzaAhuz4751 + "%";
                    trm.appendChild(td);

                    // יצירת תאים נוספים
                    td = document.createElement('td');
                    td.style.color = '#333';
                    td.className="tdsmall";
                    td.style.boxSizing="border-box";
                    td.style.textAlign="right"
                    td.textContent = dataY[tb].tesuam + "%";
                    trm.appendChild(td);

                    td = document.createElement('td');
                    td.style.color = 'green';
                    td.className="tdsmall";
                    td.style.boxSizing="border-box";
                    td.style.textAlign="right"
                    if (dataY[tb].tesuam36) { td.textContent = dataY[tb].tesuam36 + "%"; }
                    trm.appendChild(td);
      label.id='label';              
                    td = document.createElement('td');
                    td.style.color = '#333';
                    td.className="tdsmall";
                    td.style.boxSizing="border-box";
                    td.style.textAlign="right"
                    if (dataY[tb].tesuam60) { td.textContent = dataY[tb].tesuam60 + "%"; }
                    trm.appendChild(td);

                    table.appendChild(trm);
                }
            }
 
        }   
    addclick(); tablerek();   

   
}
  

function createForm(x) {
    
    hidkot()
    document.getElementById('sanenMosdy').style.display='none';
   // chng(document.getElementById('tafrit'));
    
    const allTheTables=document.getElementById('allTheTables');
    allTheTables.style.display='none';
    if(window.innerWidth<600){
    document.getElementById('footer').style.display="none";}
    const filter=document.getElementById('filter');
    filter.style.display='flex';
    document.getElementById("productForm").scrollIntoView({ behavior: "smooth" });
if(x!==0){
    tablhasifot()
  }
 
 
}

function createFormMen() { 
    document.getElementById('leloMifaliut').style.display='none';
    document.getElementById('sinonMuzar').style.display='none';
    document.getElementById('hadashim').style.display='none';
    document.getElementById('spanSanen').style.display="none";
    chng(document.getElementById('tafrit'));
    const allTheTables=document.getElementById('allTheTables');
    allTheTables.style.display='none';
    if(document.getElementById('ifrm').style.display==='flex'){
	document.getElementById('ifrm').style.display='none'}
   
    const filter=document.getElementById('filter');
    filter.style.display='none';
    const sugMenfirst=document.getElementById('sugMenfirst');
    const sugMensecond=document.getElementById('sugMensecond');

     sugMenfirst.innerHTML='';
     sugMensecond.innerHTML='';
	
		const opt1 = document.createElement('option');
		opt1.value='';
		opt1.textContent='בחר חברה מנהלת';
		opt1.disabled='true';
		opt1.selected='true';
  		sugMenfirst.appendChild(opt1);  

		const opta1 = document.createElement('option');
		opta1.value=``;
		opta1.textContent='בחר חברה מנהלת';
		opta1.disabled='true';
		opta1.selected='true';
  		sugMensecond.appendChild(opta1);
	
	
	for(let i=0;i<havarotMenahalot.length;i++){
	
		
	const opt = document.createElement('option');
	opt.value=havarotMenahalot[i];
	opt.textContent=havarotMenahalot[i];
  	sugMenfirst.appendChild(opt);  

	const opta = document.createElement('option');
	opta.value=havarotMenahalot[i];
	opta.textContent=havarotMenahalot[i];
  	sugMensecond.appendChild(opta);  
}	
}


async function tablhasifot() {
    event.preventDefault(); var datfilter;
    var sugmM=document.getElementById('sugM').value;
    if(sugmM==='קופות גמל' ){
        sugmM='תגמולים ואישית לפיצויים'
        ;await maslulim(30,sugmM,0);
        datfilter=datanetunimKlaliXM;

         }
    else if(sugmM==='קרנות פנסיה - מקיפה' ){
        sugmM='קרנות חדשות'
        ;datfilter=datanetunimKlaliXP;
        await maslulimP(30,sugmM,0);
         }
    else if(sugmM==='פוליסות חסכון' ){
                  datfilter=datanetunimKlaliXB;
                  await maslulim(30,sugmM,0);
        }
    else{await maslulim(30,sugmM,0);datfilter=datanetunimKlaliXM;}
    const tables = document.querySelectorAll("[id^='klalikoch']"); 
    var data = datfilter.filter(item => 
        item.sharp!==0 & item.sharp!==undefined
        )

    tables.forEach((table) => {
        const rows = table.querySelectorAll("tr"); 
        rows.forEach((row, index) => {
            const tdies = row.querySelectorAll("td, th");
            if(index === 0){tdies[2].textContent='שארפ'}
            if (index > 0) { // מתחיל מהשורה השנייה
                
                const dataspecific=data.filter(item=>(item.shemkupa===tdies[1].textContent
                ))
                
                if(dataspecific.length===0){                           
                            row.style.display="none";

                }
                else{
                    
                    tdies[2].textContent=dataspecific[0].sharp
                }
            }
        });
    });
    tables.forEach((table) => {sortTableA(table)});
    const elements = document.querySelectorAll("[id^='klalikoch']"); 
    elements.forEach((element) => {
      const parent = element.parentNode.parentNode;
      const h4 = parent.querySelector("h4");
      
      const visibleRows = [...element.querySelectorAll("tr")].filter(row => 
        row.offsetParent !== null 
    );
    
      if(visibleRows.length<2) {
        h4.style.display = "none";
        element.style.display = "none";    
      }
    });
    document.getElementById("allTheTables").scrollIntoView({ behavior: "smooth" });
    //document.getElementById('kotMaslulim').style.display='none';
	document.getElementById('sanenMosdy').style.display='none';
   
}



async function tablMen() {
    event.preventDefault(); 
    const sugmMMen=document.getElementById('sugMMen').value;
    const sugMenfirst=document.getElementById('sugMenfirst').value;
    const sugMensecond=document.getElementById('sugMensecond').value;

	
    sugMenfirst.innerHTML='';
     sugMensecond.innerHTML='';
    await maslulim(30,sugMMen);
    const tables = document.querySelectorAll("[id^='klalikoch']"); 

    tables.forEach((table) => {
        const rows = table.querySelectorAll("tr"); 
        
        rows.forEach((row, index) => {
            if (index > 0) { // מתחיל מהשורה השנייה
                const firstCell = row.querySelector("td, th"); 
                
                if (firstCell) {
                    
                    const data = datanetunimKlaliXM.filter(item => 
                        Number(item.mh) === Number(firstCell.textContent)			  
                        );
                            if (firstRow  &&  (item.menahelet.includes(sugMenfirst) || item.menahelet.includes(sugMensecond) ) ) {
                               row.style.display="block";  
                            } 
                        
                        else{                              
                            row.style.display="none";
                        }
                    
                }
            }
        });
    });
    
    const elements = document.querySelectorAll("[id^='klalikoch']"); 
    elements.forEach((element) => {
      const parent = element.parentNode.parentNode;
      const h4 = parent.querySelector("h4");
      
      const visibleRows = [...element.querySelectorAll("tr")].filter(row => 
        row.offsetParent !== null 
    );
    
      if(visibleRows.length<2) {
        h4.style.display = "none";
        element.style.display = "none";    
      }
    });
}

function sortTableA(x) {
    var data = [];
    
    if (!x) {
        console.error('לא נמצאה טבלה.');
        return;
    }

    const rows = x.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        const tds = rows[i].getElementsByTagName('td');

        if (tds.length >= 6) {
            data.push({
                mh: tds[0].textContent.trim(),
                shemkupa: tds[1]?.children[0]?.textContent.trim() || '',
                sharp: tds[2].textContent.trim().replace('%', ''),
                tesuam: tds[3].textContent.trim().replace('%', ''),
                tesuam36: tds[4].textContent.trim().replace('%', ''),
                tesuam60: tds[5].textContent.trim().replace('%', '')
            });
        } else {
            console.warn(`שורה ${i} אינה מכילה מספיק עמודות.`);
        }
    }

    // מיון לפי הכותרת שנלחצה
    
const selectedKey = 'שארפ';

const sortKey = selectedKey ? {
    'שארפ': 'sharp',
    
}[selectedKey] : null;

    if (sortKey) {
        data.sort((a, b) => b[sortKey] - a[sortKey]);
    }

    // עדכון הנתונים בטבלה
    for (let i = 1; i < rows.length; i++) {
        const tds = rows[i].children;
        if (data[i - 1]) {
            tds[0].textContent = data[i - 1].mh;
            if (tds[1]?.children[0]) tds[1].children[0].textContent = data[i - 1].shemkupa;
            tds[2].textContent = data[i - 1].sharp ? Number(data[i - 1].sharp).toFixed(2) : '';
            if(Number( tds[2].textContent)<0){console.log(tds[2].textContent);
                tds[2].innerHTML = `<span style="direction: ltr; display: inline-block;">${Number(tds[2].textContent).toFixed(2)}</span>`;
              }
            tds[3].textContent = data[i - 1].tesuam ? data[i - 1].tesuam + '%' : '';
            tds[4].textContent = data[i - 1].tesuam36 ? data[i - 1].tesuam36 + '%' : '';
            tds[5].textContent = data[i - 1].tesuam60 ? data[i - 1].tesuam60 + '%' : '';
        }
    }
}




