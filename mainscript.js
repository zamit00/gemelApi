var datanetunimKlaliXM;var datanetunimKlaliXB;var datanetunimKlaliXP;var clickStatus;
const gufmosdixA = [
    'הראל פנסיה וגמל', 'כלל פנסיה וגמל',
    'מגדל מקפת קרנות פנסיה וקופות גמל', 'מנורה מבטחים פנסיה וגמל',
    'הפניקס פנסיה וגמל', 'אלטשולר שחם גמל ופנסיה',
    'אנליסט קופות גמל', 'ילין לפידות ניהול קופות גמל', 'מור גמל ופנסיה',
    'מיטב גמל ופנסיה', 'אינפיניטי השתלמות, גמל ופנסיה '
];
const pHishSmall=`קרן השתלמות היא מכשיר חיסכון לטווח בינוני המאפשר חיסכון הן לשכירים והן לעצמאים. הקרן היא לספק מענה לצרכי השתלמות מקצועית, אך בפועל היא משמשת ככלי חיסכון פופולרי בישראל בזכות הטבות המס הנלוות לה . בקרן ההשתלמות מגוון מסלולי השקעה השונים זה מזה ברמת הסיכון. ככלל, הכספים בקרן ניתנים 
למשיכה לאחר 6 שנים ממועד הפקדה ראשונה.`
const pHishBig=`קרן השתלמות היא מכשיר חיסכון לטווח בינוני המאפשר חיסכון הן לשכירים והן לעצמאים. מטרת הקרן היא לספק מענה לצרכי השתלמות מקצועית, אך בפועל היא משמשת ככלי חיסכון פופולרי בישראל בזכות הטבות המס הנלוות לה . בקרן ההשתלמות מגוון מסלולי השקעה השונים זה מזה ברמת הסיכון. ככלל, הכספים בקרן ניתנים למשיכה לאחר 6 שנים ממועד הפקדה ראשונה.
שיעורי הפקדה מקובל לעמית שכיר הינם 7.5% מהשכר על חשבון המעסיק  ו -2.5% מהשכר על חשבון העובד. מעסיקים  נוהגים להגביל את ההפקדה עד לתקרת השכר שבגינו העובד אינו
מחויב במס על חלק המעסיק.`
const pYeled=`קופת גמל להשקעה חסכון לכל ילד היא מכשיר פנסיוני ופיננסי שמנוהל על ידי המוסד לביטוח לאומי בשיתוף עם רשות שוק ההון.  המוצר פותח במטרה להבטיח עתיד כלכלי יציב עבור ילדיכם. התוכנית נפתחת על שם הילד, כאשר ההפקדות מבוצעות מידי חודש על חשבון הביטוח הלאומי, כ – 57 ₪ לחודש. ההורה מקבל הקצבה יכול לבקש להפקיד 57 ₪ נוספים על חשבון קצבת הילדים. דמי הניהול משולמים על ידי ביטוח לאומי עד גיל 21. `
const pPolisaSmall=`פוליסת חיסכון היא חסכון כספי נזיל בכל עת אשר מנוהל על ידי חברת ביטוח. כספי הפוליסה מושקעים בהתאם לבחירת המבוטח כאשר הפוליסה מציעה מגוון מסלולי השקעה, מהמסלולים בעלי הסיכון הגבוהה ביותר ועד למסלולים חסרי סיכון.  פוליסת החסכון מהווה אלטרנטיבה למשקיע ביחס להשקעה בפיקדונות בבנקים, בתוכניות חסכון ובקרנות נאמנות.`
const pPolisaBig=`פוליסת חיסכון היא חסכון כספי נזיל בכל עת אשר מנוהל על ידי חברת ביטוח. כספי הפוליסה מושקעים בהתאם לבחירת המבוטח כאשר הפוליסה מציעה מגוון מסלולי השקעה, מהמסלולים בעלי הסיכון הגבוהה ביותר ועד למסלולים חסרי סיכון.  פוליסת החסכון מהווה אלטרנטיבה למשקיע ביחס להשקעה בפיקדונות בבנקים, בתוכניות חסכון ובקרנות נאמנות.
המוצר פתוח להצטרפות לכל אחד בין אם הוא שכיר, עצמאי או שאינו עובד בכלל, בין אם הוא ילד או מבוגר. המוצר מהווה אלטרנטיבה לפתיחת חסכון עבור ילדים.
`
const pHashBig=`קופת גמל להשקעה היא מוצר חסכון מתחרה לפוליסות החסכון בחברות הביטוח ולפיקדונות והחסכונות הבנקאיים. מדובר במוצר פיננסי ופנסיוני בשל הטבת מס הגלומה בו. ניתן לחסוך ולהשקיע בצורה גמישה, והוא מהווה פתרון לחיסכון עבור הטווח הקצר והן עבור הטווח הארוך. הכספים בקופה ניתנים למשיכה בכל עת כסכום חד פעמי או בתשלומים והכל בהתאם לצרכי העמית. הפקדות בקופה אינן מקנות הטבת מס מסוג ניכוי או זיכוי. קיימת תקרת הפקדה שנתית אשר בשנת 2025 עומדת על סך של 81,711 ₪. תקרה זו מתעדכנת אחת לשנה בדרך כלל בהתאם לעליית המדד.`
const pHashSmall=`קופת גמל להשקעה היא מוצר חסכון מתחרה לפוליסות החסכון ולפיקדונות הבנקאיים. מדובר במוצר פיננסי ופנסיוני בשל הטבת מס הגלומה בו. המוצר מהווה פתרון לחיסכון לטווח הקצר ולטווח ארוך. הכספים ניתנים למשיכה בכל עת. קיימת תקרת הפקדה שנתית אשר בשנת 2025 עומדת על סך של 81,711 ₪. התקרה מתעדכנת אחת לשנה בצמוד לעליית המדד.`


const pPensiaBig=`קרן פנסיה היא תוכנית לביטוח פנסיוני המבטיחה לחוסך תשלום חודשי לכל ימי חייו עם פרישתו מעבודה בהגיעו לגיל  פרישה וכן מספקת מענה למקרים ביטוחיים במצב של נכות ובמקרה של מוות.  תשלומים לקרן מבוצעים בתדירות חודשית כאשר תשלומים של שכיר מבוצעים באמצעות מעסיקו ותשלומי עצמאי מבוצעים על ידי המבוטח עצמו.  חוק פנסיית חובה מחייב כל מעסיק להפריש לכל עובד מעל גיל 21 לגברים ומעל גיל 20 לנשים כספים, כאשר קיימת חובת מינימום הפקדה כשיעורים משכר העובד לרכיבי התגמולים והפיצויים.`
const pPensiaSmall=`קרן פנסיה היא תוכנית המבטיחה לחוסך תשלום חודשי לכל ימי חייו עם פרישתו מעבודה וכן מספקת מענה למקרים ביטוחיים של נכות ומוות.  תשלומים לקרן מבוצעים בתדירות חודשית. תשלומי שכיר מבוצעים באמצעות מעסיקו ותשלומי עצמאי מבוצעים על ידי המבוטח עצמו.  חוק פנסיית חובה מחייב כל מעסיק להפריש לכל עובד מעל גיל 21 לגברים ומעל גיל 20 לנשים כספים. קיימת חובת מינימום הפקדה כשיעורים משכר העובד.`

const pGemelBig=`קופת גמל היא שם כולל לקבוצת אפיקי חסכון פנסיוניים לטווח בינוני או ארוך.  קופה גמל לחסכון הינה סוג של קופת גמל לקצבה אשר מיועדת לצבירת כספים לגיל הפרישה, אשר ישולמו לעמית בדרך של קצבה או בדרך של היוון קצבה כאשר יגיע לגיל הפרישה. קופת גמל מקנה הטבות במס בשלב ההפקדה ובשלב המשיכה. קופת גמל לחסכון מיועדת לצבירת כספים לגיל הפרישה אשר ישולמו לעמית בדרך של קצבה  או בדרך של היוון קצבה. קופת הגמל במקור הינה תכנית לחסכון בלבד ללא מרכיב ביטוחי.  כספי קופת הגמל מושקעים בהשקעות במסלולים שונים הניתנים לבחירה ע"י העמית.`
const pGemelSmall=`קופה גמל לחסכון הינה סוג של קופת גמל לקצבה אשר מיועדת לצבירת כספים לגיל הפרישה, אשר ישולמו לעמית בדרך של קצבה או בדרך של היוון קצבה כאשר יגיע לגיל הפרישה. קופת גמל מקנה הטבות במס בשלב ההפקדה ובשלב המשיכה. קופת גמל לחסכון מיועדת לצבירת כספים לגיל הפרישה אשר ישולמו לעמית בדרך של קצבה  או בדרך של היוון קצבה. כספי קופת הגמל מושקעים בהשקעות במסלולים שונים הניתנים לבחירה ע"י העמית.`

const gufmosdiA = gufmosdixA.sort((a, b) => a.localeCompare(b, 'he'));
const sinon=document.getElementById('sinonHevra')
sinon.innerHTML='';
let opt=document.createElement('option')
opt.value=0;
opt.textContent="בחר חברה";
sinon.appendChild(opt) 
for(let i=0;i<gufmosdiA.length;i++){
     let opt=document.createElement('option')
     opt.textContent=gufmosdiA[i]
     opt.value=gufmosdiA[i]
     sinon.appendChild(opt)  
    }
window.onload = async function() {
    try {
        await Promise.all([
            fetchdataJasonB(),
            fetchdataJasonP(),
             fetchdataJasonM(),
            
        ]);
       // tkofa(); 
        backtop();
       
       
    } catch (error) {
        console.error("שגיאה בטעינת הנתונים:", error);
    }
}

function showKupaMeida(x){
    document.querySelector('.meidaMuzarSpecific').style.display='block';
    
    const pMeida=document.querySelectorAll('#mabaatarSpecific p')
    if(window.innerWidth>850 && x==='pHish'){pMeida[0].innerHTML=pHishBig;pMeida[1].innerHTML=''}
    if(window.innerWidth<=850 && x==='pHish'){pMeida[1].innerHTML=pHishSmall;pMeida[0].innerHTML=''}
    
    if(window.innerWidth>850 && x==='pGemel'){pMeida[0].innerHTML=pGemelBig;pMeida[1].innerHTML=''}
    if(window.innerWidth<=850 && x==='pGemel'){pMeida[1].innerHTML=pGemelSmall;pMeida[0].innerHTML=''}

    if(window.innerWidth>850 && x==='pPensia'){pMeida[0].innerHTML=pPensiaBig;pMeida[1].innerHTML=''}
    if(window.innerWidth<=850 && x==='pPensia'){pMeida[1].innerHTML=pPensiaSmall;pMeida[0].innerHTML=''}

    if(window.innerWidth>850 && x==='pYeled'){pMeida[0].innerHTML=pYeled;pMeida[1].innerHTML=''}
    if(window.innerWidth<=850 && x==='pYeled'){pMeida[1].innerHTML=pYeled;pMeida[0].innerHTML=''}

    if(window.innerWidth>850 && x==='pPolisa'){pMeida[0].innerHTML=pPolisaBig;pMeida[1].innerHTML=''}
    if(window.innerWidth<=850 && x==='pPolisa'){pMeida[1].innerHTML=pPolisaSmall;pMeida[0].innerHTML=''}

    if(window.innerWidth>850 && x==='pHash'){pMeida[0].innerHTML=pHashBig;pMeida[1].innerHTML=''}
    if(window.innerWidth<=850 && x==='pHash'){pMeida[1].innerHTML=pHashSmall;pMeida[0].innerHTML=''}
}
async function searchMh(x){
    
     var mikom=""
     var mhSearch=document.getElementById('searchBoxmh').value;
     if(x!==0 || !mhSearch ){mhSearch=x}
     var mhkupa=datanetunimKlaliXM.filter(item=>item.mh===mhSearch.trim());
     if(mhkupa.length===0){mhkupa=datanetunimKlaliXB.filter(item=>item.mh===mhSearch.trim())}
     if(mhkupa.length===0){mhkupa=datanetunimKlaliXP.filter(item=>item.mh===mhSearch.trim())}
    if(mhkupa.length===0){
         Swal.fire({
            title: "<span style='color: green; font-size: 16px;'> לא נמצא מסלול במספר שנבחר</span>" +" "+
            "<span style='color: green; font-size: 16px;'>בהוראה קולית יש לנקוב בספרות בלבד</span>",
            width: "90vw", 
            icon: "warning",
            timer: 2000, 
            showConfirmButton: false,
            timerProgressBar: true, 
            background: "#fff",
            customClass: {
            popup: 'swal2-center-custom'
          }       
         });return;}
   document.getElementById('searchBoxmh').value='';
     hidefooter();hideAllimages();hideMabaatarSpecific();hideMaBaatar();
     document.getElementById('sanenMosdy').style.display='none';
     document.getElementById("closeinfo").style.display='block';
     document.getElementById('allTheTables').style.display='none';
     document.getElementById('kupaInfo').style.display='block';	
     hidkot();
 	mhSearch.value='';
 	
     await bring(mhkupa,mikom);
 }
function yossi(){
  Swal.fire({
    title: "<span style='color: green; font-size: 16px;'>לקבלת הצעה והשארת פרטים לחץ מאשר</span><br>" +
           "<label style='display: flex; align-items: center; font-size: 12px;'>" +
           "<input id='swal-checkbox' type='checkbox' style='width: 14px; height: 14px; margin-left: 10px;'> " +
           "אני מאשר שקראתי את מדיניות האתר וניתן לשלוח לי הצעות" +
           "</label>",
    width: "clamp(300px,90vw,600px)",
    icon: "success",
    customClass: {
        popup: 'SwalYossi'
      },
    showCancelButton: true,
    confirmButtonText: "מאשר",
    cancelButtonText: "לא מאשר",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    preConfirm: () => {
        const checkbox = document.getElementById("swal-checkbox");
        if (!checkbox.checked) {
            Swal.showValidationMessage("עליך לאשר את תנאי השימוש לפני המשך");
        }
        return checkbox.checked;
    }
}).then((result) => {
    if (result.isConfirmed) {
        window.location = "https://www.finan-tech.co.il/contact";
    }
});

}
/*
window.addEventListener("popstate", function () {
    hideframe();
    showAllimages();
    history.pushState(null, null, location.href); 
});

history.pushState(null, null, location.href);*/

function showMachshevonim(){
hideMaBaatar();hideMabaatarSpecific();hideAllimages();showIframe('Machshevonim.html')
}

function showHashvaa(){
   hideMaBaatar();hideMabaatarSpecific();
   hideAllimages();
   showIframe('hashvaotRikuz.html') 
}
function showTikrot(){
    hideMaBaatar();hideMabaatarSpecific();
    hideAllimages();
    showIframe('tikrot.html') 
 }
function showMikzoei(){
  hideMaBaatar();hideMabaatarSpecific();hideAllimages();showIframe('meidaMikzoei.html')
}
function showMabaatar(){   
    document.getElementById('mabaatar').style.display="block";
}
function hideMaBaatar(){
    document.getElementById('mabaatar').style.display="none"; 
}
function hideMabaatarSpecific(){
    document.getElementById('mabaatarSpecific').style.display="none"; 
}


function hideproductForm(){
  document.getElementById('filter').style.display='none';
}
function hideAllimages(){
    document.getElementById('allImages').style.display='none';
    document.getElementById('searchmh').style.display='none';
document.getElementById('kategorut').style.display='none';
	
}
function showAllimages(){
    document.getElementById('allImages').style.display='grid';
    document.getElementById('searchmh').style.display='flex';
    document.getElementById('kategorut').style.display='block';

	showMabaatar();
}

 // 
function showSearch(){
 const srch= document.getElementById('search-container')
 if(srch.style.display==="block"){
   srch.style.display='none'
//document.getElementById("searchResults").innerHTML='';
 }
 else{
srch.style.display='block'
 }
 
}
function maslulimSanen(){
    const select=document.getElementById('sinonHevra').value
    const allTheTables = document.getElementById('allTheTables');
    const visibleH2s = Array.from(allTheTables.querySelectorAll('h2'))
    .filter(h2 => getComputedStyle(h2).display !== 'none');
    var sugmuzar = visibleH2s[0].childNodes[0].textContent.trim(); 
    if(sugmuzar.includes("קרנות פנסיה"))
    {sugmuzar='קרנות חדשות'; maslulimP(30,sugmuzar,select)}
    else {maslulim(30,sugmuzar,select)}   
}

window.addEventListener("scroll", function() {
    let backtop = document.getElementById("backtop");
    let scrollPosition = window.scrollY;
    let screenHeight = window.innerHeight;

    if (scrollPosition > screenHeight * 0.5) {
        backtop.style.display = "block"; // מציג את הכפתור
    } else {
        backtop.style.display = "none"; // מסתיר את הכפתור
    }
});

function backtop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function closeOdot(){
  document.getElementById('odotH').style.display='none';
}
function openOdot(){
  document.getElementById('odotH').style.display='block';
}




async function fetchdataJasonM() {
    try {
        const response = await fetch('dataJasonM.json'); 
        if (!response.ok) {
            throw new Error(`שגיאה: ${response.status} ${response.statusText}`);
        }
        const data = await response.json(); 
        datanetunimKlaliXM = data;
	    datanetunimKlaliXM= datanetunimKlaliXM.filter(item=>!item.menahelet.includes('סלייס'));    
       
        let tkofa = document.getElementById('tkufatdivuach');
        var tkf = data.filter(item => item.mh === '579');
        tkf=tkf[0].tesua12;
        tkf = tkf.split("=")[1].substring(4, 6) + "/" + tkf.split("=")[1].substring(0, 4);
        tkofa.innerText = 'הנתונים נכונים ל ' + tkf;

        return data;  // חובה להחזיר נתונים כדי שהפונקציה תחכה באמת
    } catch (error) {
        console.error('שגיאה בשליפת הנתונים:', error);
        throw error;  // נזרוק את השגיאה כדי ש-Promise.all יוכל לטפל בה
    }
}
async function fetchdataJasonB() {
    try {
        const response = await fetch('dataJasonB.json'); 
        if (!response.ok) {
            throw new Error(`שגיאה: ${response.status} ${response.statusText}`);
        }
        const data = await response.json(); 
        datanetunimKlaliXB = data; 
        return data;  // החזרת הנתונים כדי ש-`await` יעבוד נכון
    } catch (error) {
        console.error('שגיאה בשליפת הנתונים:', error);
        throw error;  // זורק את השגיאה כדי ש-Promise.all יוכל לטפל בה
    }
}
async function fetchdataJasonP() {
    try {
        const response = await fetch('dataJasonP.json'); 
        if (!response.ok) {
            throw new Error(`שגיאה: ${response.status} ${response.statusText}`);
        }
        const data = await response.json(); 
        datanetunimKlaliXP = data; 
        return data;  // מחזיר את הנתונים כדי שהפונקציה תהיה באמת אסינכרונית
    } catch (error) {
        console.error('שגיאה בשליפת הנתונים:', error);
        throw error;  // זורק את השגיאה כדי ש-Promise.all יוכל לטפל בה
    }
}


document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
});
document.addEventListener("keydown", function (event) {
    if (event.key === "F12" || (event.ctrlKey && event.shiftKey && event.key === "I")) {
        event.preventDefault();
    }
});

  function hideTkufa(){
    let tkofa= document.getElementById('tkufatdivuach');
    tkofa.style.display='none';
  }
  
const acceptBtn = document.getElementById('accept-btn');
    acceptBtn.addEventListener('click', async () => {
      const overlay = document.getElementById('overlay');
      const content = document.getElementById('content');
      document.querySelector('.menu-btn').addEventListener('click', toggleMenu);
      
        overlay.style.display = 'none'; 
        content.style.display = 'block'; 
        
       await maslulim(1,0,0);
       
});

function toggleMenu() {
   hideMaBaatar();hideMabaatarSpecific();
  if(document.getElementById("hamb").className.includes('open')){
        document.getElementById("hamb").classList.remove("open");
        document.querySelector(".menu-container").style.display='none';
        document.getElementById("menu").classList.remove("open");
  }
  
else{
    document.querySelector(".menu-btn").classList.add("open");
    document.querySelector(".menu-container").style.display='block';
    document.getElementById("menu").classList.add("open");
}

}
function chng(x){
    document.getElementById("filter").style.display='none';
    toggleMenu();
    document.querySelector(".menu-btn").classList.remove("open");
   var allDropdowns = document.querySelectorAll('.dropdown-content');
   allDropdowns.forEach(function(dropdown) {dropdown.style.display = "none";});

}
function hisht(x) {
    const screenw=window.innerWidth;
    const screenh=window.innerHeight;
    const maxw=Math.min(screenw*0.95,800);
    const maxh=Math.min(screenh*0.95,600);
    const windowf=`width=${maxw},height=${maxh},resizable=yes,scrollbars=yes`;
    // פתיחת הקובץ בחלון חדש
    window.open( x, '_blank',  windowf
    );
    // סגירת תפריט ההמבורגר
    var hamburgerMenu = document.getElementById("tafrit");
    document.getElementById("menu").classList.remove("open");
    document.querySelector(".menu-btn").classList.remove("open");
    // החזרת הכפתורים למצבם הרגיל
    var btns = document.getElementsByClassName('btn');
    Array.from(btns).forEach(function(btn) {
      if (btn.classList.contains("btna")) {
        btn.classList.remove("btna");
      }
    });
    // הסתרת כל התפריטים הפתוחים
    var allDropdowns = document.querySelectorAll('.dropdown-content');
    allDropdowns.forEach(function(dropdown) {
      dropdown.style.display = "none";
    });
  }
  function harhev(x){
   const parent= x.parentNode;
   parent.style.height='auto';
   var displayValue;var txtcont;
   const divs = parent.querySelectorAll('div');
   if(x.innerText==="הרחב"){displayValue = 'block';txtcont="כווץ"}
   else{displayValue = 'none';txtcont="הרחב"}
    divs.forEach(div => {
        if(div.className!=='explainHasifa'){div.style.display=displayValue
        };
});
    x.innerText=txtcont;
  }
  function hidkot(){
    document.getElementById('leloMifaliut').style.display='none';
    document.getElementById('hadashim').style.display='none';
    document.getElementById('spanMif').style.display="none";
	document.getElementById('spanHad').style.display="none";
    document.getElementById('filterChoose').style.display="none";
    
    
  }
  function showkot(){
    document.getElementById('leloMifaliut').style.display='inline-block';
    document.getElementById('hadashim').style.display='inline-block';
    document.getElementById('spanMif').style.display="inline-block";
	document.getElementById('spanHad').style.display="inline-block";
  }
 function showIframe(x){
    hidkot()
    toggleMenu()
    document.getElementById('spanMif').style.display="none";
	document.getElementById('spanHad').style.display="none";
	document.getElementById('sanenMosdy').style.display='none';
    chng(document.getElementById('tafrit'));
   document.getElementById('allTheTables').style.display='none';
    document.getElementById('kupaInfo').style.display='none' 
   const iframCont=document.getElementById('iframeContainer');
   iframCont.innerHTML='';
   iframCont.innerHTML=`
   <iframe id="ifrm" class="iframe" src=${x}></iframe>`
   document.getElementById('ifrm').style.display='flex';
   document.getElementById('ifrm').scrollIntoView({ behavior: "smooth" })
 }
 function hidefooter(){
  document.getElementById('footer').style.display='none';
 }






