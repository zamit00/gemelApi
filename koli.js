let startStop = 0; let ifrmValue=0;
 let finalTranscript = '';  var transcript='';var matchKlaliLast;
;let lastTranscript = '';

let lastAmount='';let lastInterest='';let lastTerm='';let lastGrace='';
 
const recognition = typeof webkitSpeechRecognition !== "undefined"
  ? new webkitSpeechRecognition()
  : new SpeechRecognition();
recognition.lang = "he-IL";
recognition.interimResults = true;
recognition.maxAlternatives = 1;
recognition.continuous = true;

function micClick() {
  startStop = 0;
  const mictext = document.getElementById('resultMic').textContent;

  if (mictext.includes("עצור")) {
    startStop = 1;
    recognition.stop();
  } else {
    document.getElementById('resultMic').textContent = " מאזין - אמור 'עצור' כדי להפסיק";
    recognition.start();
  }
}

function regexAll(transcript){ 
  
  const loanWords= ["לוח", "סכום", "ריבית", "תקופ", "גרייס","סילוקין","סילוקים"];
  const loanExist=loanWords.some(word => new RegExp(word, "i").test(transcript));

  const DeribitWords= ["חודשי", "חד פעמי", "ריבית", "תקופ", "חשב","שיעור","דמי ניהול","הפעל"];
  const DeribitExist=DeribitWords.some(word => new RegExp(word, "i").test(transcript));
  
  const yaaditWords= ["התחל", "סכום יעד", "ריבית", "תקופ", "חשב","שיעור","דמי ניהול","הפעל","תקופת"];
  const yaadExist=yaaditWords.some(word => new RegExp(word, "i").test(transcript));
  
  const DmeyWords= ["סוג", "סכום צבירה", "ריבית", "גיל", "חשב","סכום חודשי","קיים","הפעל","חדש","צבירה","חודשי"];
  const DmeyExist=DmeyWords.some(word => new RegExp(word, "i").test(transcript));

  const sikonWords= ["ראשונה", "שניה", "שנייה", "שלישית", "רביעית","חמישית",
    "שישית","חשב"];
  const sikonExist=sikonWords.some(word => new RegExp(word, "i").test(transcript));

  const MenahalotWords= ["מרובה", "שתי", "הצג", "מוצר", "מסלול","חברה",
    "בצע","בצא","מובילה","מול","סגור","הסתר","אסתר","בחר","כל","קול","כל","כלל"];
  const MenahalotExist=MenahalotWords.some(word => new RegExp(word, "i").test(transcript));
  const  gufmosdiMatch =transcript.match(/(כלל|הראל|מנורה|מגדל|אלטשולר|פניקס|מור|ילין|אנליסט|אינפיניטי|מיטב)/)   
  
  const  HasifotWords= ["מוצר", "מניות", "חול", "מטבע", "מטח","פנסיה"
  ,"גמל","השתלמות","ילד","פוליסות","גמל להשקעה"];
  const HasifotExist=HasifotWords.some(word => new RegExp(word, "i").test(transcript));

  const  sharpWords= ["מוצר","פנסיה"
    ,"גמל","השתלמות","ילד","פוליסות","גמל להשקעה","בצע","בצא"];
  const sharpExist=sharpWords.some(word => new RegExp(word, "i").test(transcript));

  const  MeshulavWords= ["מוצר","פנסיה"
    ,"גמל","השתלמות","ילד","פוליסות","גמל להשקעה","הפעל","הוסף","נקה",
    "שיעור","מסלול","הצג","מיין","מעיין","אוסף"];
  const MeshulavExist=MeshulavWords.some(word => new RegExp(word, "i").test(transcript));
 
  return{
     
      loanExist:loanExist,
      DeribitExist:DeribitExist,
      yaadExist:yaadExist,
      DmeyExist:DmeyExist,
      sikonExist:sikonExist,
      MenahalotExist:MenahalotExist,
      gufmosdiMatch:gufmosdiMatch,
      HasifotExist:HasifotExist,
      sharpExist:sharpExist,
      MeshulavExist:MeshulavExist
    }
      
  
  }
recognition.onresult = (event) => {
  const result = event.results[event.resultIndex];
  transcript = result[0].transcript.trim();
  if (!result.isFinal) return;
  if (!transcript) return;
  if (transcript === lastTranscript) return;
  lastTranscript = transcript;
  console.log("transcript:"+transcript);

  // ======= טיפול ב־Swal Yossi =======
  if (Swal.isVisible()) {
    const popup = document.querySelector('.swal2-popup');
    if (popup && popup.classList.contains('SwalYossi')) {
      const text = transcript.trim().toLowerCase();

      if (text.includes("לא")) {
        const cancelBtn = document.querySelector(".swal2-cancel");
        if (cancelBtn) cancelBtn.click();
      } else if (text.includes("מאשר") && !text.includes("לא")) {
        const checkbox = document.getElementById("swal-checkbox");
        if (checkbox && !checkbox.checked) checkbox.checked = true;
        const confirmBtn = document.querySelector(".swal2-confirm");
        if (confirmBtn) confirmBtn.click();
      }
    }
    transcript = "";
    lastTranscript = "";
    return;
  }

  // ======= פקודות כלליות =======
  if (transcript.includes("עצור")) {
    startStop = 1;
    recognition.stop();
    transcript = "";
    lastTranscript = "";
    return;
  }

  if (transcript.includes("חזור")) {
    handleSearchFromVoice('חזור');
    transcript = "";
    lastTranscript = "";
    return;
  }

  // ======= בדיקת iframe קיים =======
  var iframe = document.getElementById('ifrm');
  if (iframe && iframe.src.includes("html") && !iframe.src.includes("index")) {
    ifrmValue = 1;
  } else {
    ifrmValue = 0;
  }

  // ======= בדיקת "X מול Y" =======
  const molMatch = transcript.match(/((\S+)\s+מול\s+(\S+))/);
  const molMatchAll = [...transcript.matchAll(/(\S+)\s+מול\s+(\S+)/g)];

  // ======= בדיקת "הצג מסלול ..." =======
  var matchMaslul = transcript.match(/הצג מסלול\s+(\S+)/);
  const matchReg = regexAll(transcript);

  if (matchMaslul && matchMaslul !== matchKlaliLast) {
    matchKlaliLast = matchMaslul;
    searchMh(matchMaslul[1].trim());
    transcript = "";
    lastTranscript = "";
    recognition.stop();
    return;
  }

  else if (molMatch && transcript !== matchKlaliLast) {
    matchKlaliLast = transcript;

    hideformic();
    showIframe("hashMenahalot.html");
    const iframex = document.getElementById("ifrm");

    iframex.onload = function () {
      if (molMatchAll.length > 0) {
        const firstMatch = molMatchAll[molMatchAll.length-1];
        const fullText = firstMatch[0]; // לדוגמה: "אלטשולר מול ילין"
        handleMenahalot(fullText);
      }
      transcript = "";
      lastTranscript = "";
    };
    return;
  }

  // ======= מילת חיפוש כללית =======
  const matchWord = matchOneTwo(transcript);
  if (matchWord.matched && matchWord.matched !== matchKlaliLast) {
    matchKlaliLast = matchWord.matched;
    handleSearchFromVoice(matchWord.matched);
    transcript = "";
    lastTranscript = "";
    recognition.stop();
    return;
  }

  // ======= טיפול בסימולטורים =======
  if (ifrmValue === 1) {
    if ((matchReg.loanExist) && iframe.src.includes('loan')) {
        const patterns = {
        amount: /(בסכום(?: של)?|סכום(?: של)?)/,
        interest: /(בריבית(?: של)?|ריבית(?: של)?)/,
        term: /(לתקופה(?: של)?|תקופה(?: של)?|במשך)/,
        grace: /(בגרייס(?: של)?|גרייס(?: של)?)/,
      };

// מיזוג כל ההתחלות לביטוי רגולרי כולל
      const markerRegex = new RegExp(
       Object.values(patterns).map(r => r.source).join('|'),'g');

// זיהוי כל הנקודות בהן מתחילים החלקים
      const matches = [...text.matchAll(markerRegex)];

// חילוץ החלקים לפי התחלה → תחילת הבא או סוף טקסט
        const parts = {};
        for (let i = 0; i < matches.length; i++) {
          const start = matches[i].index;
          const nextStart = i + 1 < matches.length ? matches[i + 1].index : text.length;
          const segment = text.substring(start, nextStart).trim();

          // זיהוי סוג החלק לפי ההתאמה
          for (const [key, regex] of Object.entries(patterns)) {
            if (regex.test(segment)) {
              parts[key] = segment;
              break;
            }
          }
        }

      console.log(parts);
      
      handleLoan(transcript);
    } else if ((matchReg.DeribitExist) && iframe.src.includes('ribit')) {
      handleCompoundInterest(transcript);
    } else if ((matchReg.yaadExist) && iframe.src.includes('hafkada')) {
      handleYaad(transcript);
    } else if ((matchReg.DmeyExist) && iframe.src.includes('hashDmey')) {
      handleHashDmeyNihul(transcript);
    } else if ((matchReg.sikonExist) && iframe.src.includes('riskQ')) {
      handleSheelon(transcript);
    } else if ((matchReg.MenahalotExist || matchReg.gufmosdiMatch) && iframe.src.includes('hashMen')) {
      if (matchReg.MenahalotExist === 'כלל') {
        handleMenahalot(matchReg.MenahalotExist);
      } else {
        handleMenahalot(transcript);
      }
    } else if ((matchReg.HasifotExist) && iframe.src.includes('hasifotMeshulav')) {
      handleHasifot(transcript);
    } else if ((matchReg.sharpExist) && document.getElementById('filter').style.display === 'flex') {
      handleHasifot(transcript);
    } else if ((matchReg.MeshulavExist) && iframe.src.includes('Virtual')) {
      handleMeshulav(transcript);
    }

    transcript = "";
    lastTranscript = "";
    return;
  }
};

// פונקציה מחוץ ל-onresult
function matchOneTwo(transcript) {
  const words = transcript.toLowerCase();
  const nivutWordsTwo = [
  "הרבה למעלה", "הרבה למטה", "קצת למעלה", "קצת למטה", "מידע מקצועי", "הסבר קולי",
    "גמל להשקעה", "דמי ניהול", "ערך עתידי", "שאלון סיכון", "סכום יעד", "לסכום יעד",
    "תנאי שימוש", "צור קשר"
  ,'מקצועי השתלמות','מקצועי גמל','מקצועי השקעה','מקצועי חיסכון לילד','מקצועי פוליס','מקצועי פנסיה','השוואת חברות'];
  const matchedTwo = nivutWordsTwo.find(phrase => words.includes(phrase));
  if (matchedTwo) {
    return { type: "phrase-2", matched: matchedTwo };
  }

  const nivutWordsOne = [
    "למעלה", "למטה", "ראש", "תחתית", "הלווא", "הסבר", "קולי", "שימוש", "תנאי", "פנסיה",
    "גמל", "השתלמות", "ילד", "פוליסות", "שאלון", "סיכון",
    "שרפ", "שארפ", "מנהלות", "חשיפות", "משולב", "מחשבונים", "חזור", "הבית",
    "דריבית", "דריביט", "דרביט", "ניהול", "סוכן", "קשר", "מאשר", "משולם", "חזור"
  ];
  const matchedOne = nivutWordsOne.find(word => words.includes(word));
  if (matchedOne) {
    return { type: "word-1", matched: matchedOne };
  }

  return { type: "null", matched: null };
}

recognition.onend = () => {
  if (startStop === 0) {
    recognition.start();
    
  } else {
    document.getElementById('resultMic').textContent = "לא מאזין";
  }

  transcript = '';
};

recognition.onerror = (e) => {
  console.error("שגיאת זיהוי קולי:", e.error);
  document.getElementById("result").textContent = "שגיאה בזיהוי קולי: " + e.error;
};

function normalize(text) {
  return text
    .replace(/עבור?/g, "עבור")
    .replace(/עצור[.]?/g, "עצור")
    .replace(/[.,]/g, "") // מנקה פסיקים ונקודות
    .trim();
}
function toggleMenux() {
  if(document.getElementById("hamb").className.includes('open')){
        document.getElementById("hamb").classList.remove("open");
        document.querySelector(".menu-container").style.display='none';
        document.getElementById("menu").classList.remove("open");
  }}
function hideformic() {
  hideAllimages();
  hideTkufa();
}
function handleSearchFromVoice(transcript) {
  var iframe = document.getElementById('ifrm');
if(iframe && iframe.src.includes("html") && !iframe.src.includes("index")) {ifrmValue=1;}
else {ifrmValue=0;}
if(!transcript){return}
//פקודת עצירה
if (transcript.includes("עצור") || transcript.includes("הפסק") || transcript.includes("צליל")) {
	startStop=1;
	transcript='';return;
    }
  // פקודות שימוש באתר והסבר קולי
if (transcript.includes("שימוש") || transcript.includes("תנאי")) {
  showIframe('tnaiyShimosh.html'); 
  transcript='';
  return;
}
else if (transcript.includes("הסבר") || transcript.includes(" קולי")) {
  showIframe('koliHes.html'); 
  transcript='';return;
  }
  else if (transcript.includes("תקרות") || transcript.includes(" מס הכנסה")) {
    showIframe('.html'); 
    transcript='';return;
    }

  // פקודות חזרה
if (((transcript.includes("חזור") || transcript.includes("הבית")) && matchKlaliLast!=='')
 ) {
   matchKlaliLast='חזור'
      hideframe();
      showAllimages();
      hidekupainfo();
      transcript='';
      return;
      
  }
    // פקודות גלילה
if (transcript.includes("ראש")  && ifrmValue===1 && 
  !iframe.src.includes('riskQuest')) {
    
    iframe.contentWindow.scrollTo(0, 0);transcript='';return;}
else	if (transcript.includes("ראש")  && ifrmValue===0) {window.scrollTo(0, 0); transcript='';return;}
	if (transcript.includes("תחתית")) {window.scrollTo({top: document.body.scrollHeight,
          behavior: 'smooth'}); transcript='';return;}
  if (transcript.includes('למטה') &&  ifrmValue===1 ) {
    if(transcript.includes("הרבה")){
      var tvach=700;
    }
    else if(transcript.includes("קצת")){
      var tvach=150;
    }
    else{
      var tvach=300
    }
    if (iframe.contentWindow.scrollY + tvach > iframe.contentWindow.document.body.scrollHeight - iframe.contentWindow.innerHeight) {
        iframe.contentWindow.scrollTo(0, iframe.contentWindow.document.body.scrollHeight - iframe.contentWindow.innerHeight);
     } else {
        iframe.contentWindow.scrollBy(0, tvach); 
    }
    transcript='';return;
  }
  if (transcript.includes('למעלה') &&  ifrmValue===1) {
    if(transcript.includes("הרבה")){
      var minustvach=-700;
    }
    else if(transcript.includes("קצת")){
      var minustvach=-150;
    }
    else{
      var minustvach=-300
    }
    if (iframe.contentWindow.scrollY + minustvach < 0) {
      iframe.contentWindow.scrollTo(0, 0); 
    } else {
      iframe.contentWindow.scrollBy(0, minustvach); 
    }
    transcript='';return;
  }
  if (transcript.includes('למטה') &&  ifrmValue===0) {
    if(transcript.includes("הרבה")){
      var tvach=700;
    }
    else if(transcript.includes("קצת")){
      var tvach=150;
    }
    else{
      var tvach=300
    }
    if(window.scrollY+tvach>document.scrollHeight-window.innerHeight){
      window.scrollBy(0,document.scrollHeight-window.innerHeight); 
    }
    else{window.scrollBy(0,tvach); }
    transcript='';return;
  }
  if (transcript.includes('למעלה') &&  ifrmValue===0) {
    if(transcript.includes("הרבה")){
      var minustvach=-700;
    }
    else if(transcript.includes("קצת")){
      var minustvach=-150;
    }
    else{
      var minustvach=-300
    }
    if(window.scrollY+minustvach<0){
    window.scrollTo(0,0); 
    }
    else{window.scrollBy(0,minustvach); }
    transcript='';return;
  }


// הפניה לסוכן
	if ((transcript.includes("קשר") || transcript.includes("סוכן"))) {yossi();  transcript='';return;
	}
if (Swal.isVisible()) {
  const popup = document.querySelector('.swal2-popup');
  if (popup && popup.classList.contains('SwalYossi')) {
    const text = transcript.trim().toLowerCase();

    // אם יש "לא" — תמיד נבטל
    if (text.includes("לא")) {
      const cancelBtn = document.querySelector(".swal2-cancel");
      if (cancelBtn) cancelBtn.click();
    } 
    // רק אם אין בכלל "לא", נבדוק אם הוא אמר "מאשר"
    else if (text.includes("מאשר")) {
      const checkbox = document.getElementById("swal-checkbox");
      if (checkbox && !checkbox.checked) checkbox.checked = true;

      const confirmBtn = document.querySelector(".swal2-confirm");
      if (confirmBtn) confirmBtn.click();
    }
  }

  transcript = '';
  return;
}
  // פקודות הפניה למחשבונים
  if ((transcript.includes("מחשבונים") || transcript.includes("פיננסיים")) && ifrmValue===0) {
    hideformic(); showIframe("Machshevonim.html");transcript='';return;
  }
if(ifrmValue===1){
  
  if (iframe.src.includes("Machshevonim")) {
    hideformic();
    if (transcript.includes("הלווא") || 
    transcript.includes("שפיצר")){
      showIframe("loan.html");
      const iframe = document.getElementById("ifrm");iframe.onload = function() {
        handleLoan(transcript);
      }
      transcript='';return;
    }
    else if (transcript.includes("דריבית") || transcript.includes("עתידי") ||
    transcript.includes("דריביט") || transcript.includes("דרביט")) {
      showIframe("ribitderibit.html");
      const iframe = document.getElementById("ifrm");iframe.onload = function() {
        handleCompoundInterest(transcript);
      }
      transcript='';return;
    }
    else if (transcript.includes("ניהול")) {
      showIframe("hashDmeyNihul.html");
      const iframe = document.getElementById("ifrm");iframe.onload = function() {
        handleHashDmeyNihul(transcript);
      }
      transcript='';return;
    } 
    else if (transcript.includes("הפקדה חודשית") || transcript.includes("יעד")) {
        hideformic(); showIframe("hafkada.html");
        document.getElementById('ifrm').onload = function() {
          handleYaad(transcript);
        }
        transcript='';return;
      }
      else if ((transcript.includes("שאלון") || transcript.includes("סיכון")) && !transcript
    .includes("חשב") && !transcript.includes("בצע")) {
        showIframe('riskQuest.html');
        const iframe = document.getElementById("ifrm");iframe.onload=function(){
          iframe.contentWindow.sheelon();
          handleSheelon(transcript);
        }
        transcript='';return;
      }
    
  }
  
}
// פקודות הפניה למחשבונים ישירות
if ((transcript.includes("הלווא") || transcript.includes("שפיצר")) && ifrmValue === 0) {
    hideformic();
    showIframe("loan.html");
    const iframe = document.getElementById("ifrm");
    document.getElementById('ifrm').onload = function() {
        handleLoan(transcript);
    };
    transcript='';return;
}
  else if ((transcript.includes("דריבית") || transcript.includes("עתידי")
    ||   transcript.includes("דריביט") || transcript.includes("דרביט"))
  && ifrmValue === 0) {
    hideformic(); showIframe("ribitderibit.html");
	const iframe = document.getElementById("ifrm");
      document.getElementById('ifrm').onload = function() {
        handleCompoundInterest(transcript);
    };
    transcript='';return;
  }
  else if (transcript.includes("ניהול") && ifrmValue===0) {
    hideformic(); showIframe("hashDmeyNihul.html");
       document.getElementById('ifrm').onload = function() {
      handleHashDmeyNihul(transcript);
    };
    transcript='';return;
  }
  
  else if ((transcript.includes("הפקדה חודשית") || transcript.includes("יעד")) && ifrmValue===0) {
    hideformic(); showIframe("hafkada.html");
    document.getElementById('ifrm').onload = function() {
      handleYaad(transcript);
    };
    transcript='';return;
  }
  else if ((transcript.includes("שאלון") || transcript.includes("סיכון")) && ifrmValue===0) {
    showIframe('riskQuest.html');
    const iframe = document.getElementById("ifrm");iframe.onload=function(){
      iframe.contentWindow.sheelon();
      handleSheelon(transcript);
    };
    transcript='';return;
  }
  
  //  פקודות הפניה להשוואות 
  if (transcript.includes("חברות") && ifrmValue===0
    && !transcript.includes("ניהול") && !transcript.includes("משולב") && !transcript.includes("מנהלות")) {
    hideformic(); showIframe("hashvaotRikuz.html");transcript='';return;
  }
if(iframe && ifrmValue===1){
  if (iframe.src.includes("hashvaotRikuz")) {
    if (transcript.includes("מנהלות") || transcript.includes("מנהלת")) {
      hideformic(); showIframe("hashMenahalot.html"); 
    	const iframe = document.getElementById("ifrm");iframe.onload = function() {
        handleMenahalot(transcript);
       
    };
      transcript='';return;
    }
    else if (transcript.includes("חשיפות")) {
      hideformic();
      showIframe("hasifotMeshulav.html");
      const iframe = document.getElementById("ifrm");
      iframe.onload = function () {
        handleHasifot(transcript);
      };
      transcript='';return;
    }
   else if (transcript.includes("שארפ") || transcript.includes("שרפ")) {
     hideformic();
     hideAllimages();
     createForm(0);handleSharp(transcript);
      transcript='';return;
    }
    else if ((transcript.includes("משולב") || transcript.includes("תיק") || transcript.includes('משולם')) && ifrmValue===0) {
      hideformic(); showIframe("VirtualInvest.html");
      const iframe = document.getElementById("ifrm");iframe.onload =function(){
        handleMeshulav(transcript);
        transcript='';return;
      }
    }
    
  }
}
// פקודות הפניה להשוואות ישירות
if(transcript.includes("מנהלות") || transcript.includes("מנהלת")) {
      hideformic(); showIframe("hashMenahalot.html");
      const iframe = document.getElementById("ifrm");iframe.onload = function() {
        handleMenahalot(transcript);
      }
      transcript='';return;
    }
    else if(transcript.includes("חשיפות")) {
      hideformic(); showIframe("hasifotMeshulav.html");
    	const iframe = document.getElementById("ifrm");iframe.onload = function() {
        handleHasifot(transcript);}
      transcript='';return;
    }
    else if (transcript.includes("שארפ") || transcript.includes("שרפ")) {
      hideAllimages(); createForm(0);handleSharp(transcript);
      transcript='';return;
    }
    else if(transcript.includes("משולב") || transcript.includes("תיק") || transcript.includes('משולם')) {
      hideformic(); showIframe("VirtualInvest.html");
      const iframe = document.getElementById("ifrm");iframe.onload = function() {
        handleMeshulav(transcript);
      }
      transcript='';return;
    }

  // פקודות הפניה למידע
if(transcript.includes("מקצועי")  && ifrmValue===0
&& !transcript.includes("השתלמות") && !transcript.includes("פנסיה") && 
!transcript.includes("גמל") && !transcript.includes("השקעה") && !transcript.includes("חסכון")
&& !transcript.includes("ילד") && !transcript.includes("פוליס")) {
    hideformic(); showIframe("meidaMikzoei.html");transcript='';return;
  }
if(iframe && ifrmValue===1){
  if (iframe.src.includes("meidaMikzoei")) {
    if (transcript.includes("השתלמות")) {
      hideformic(); showIframe("hishtalmotMikzoei.html");
      transcript='';return;
  }
    else if (transcript.includes("פנסיה")) {
    hideformic(); showIframe("pensiaMikzoei.html");
    transcript='';return;
  }
    else if (transcript.includes("השקעה")) {
      hideformic(); showIframe("hashkaaMikzoei.html");
      transcript='';return;
    }
    else if (transcript.includes("ילד")) {
      hideformic(); showIframe("hisyeled.html");
    transcript='';return;
    }
    else if (transcript.includes("פוליס")) {
      hideformic(); showIframe("polisotMikzoei.html");
      transcript='';return;
    }
    else if (transcript.includes("גמל") && !transcript.includes("השקעה")) {
      hideformic(); showIframe("kupatgemelmikzoei.html");
      transcript='';return;
    }
  }
}
// פקודות הפניה למידע ישירות
 if(transcript.includes("מקצועי") || transcript.includes('מידע')) {
    if (transcript.includes("השתלמות")) {
      hideformic(); showIframe("hishtalmotMikzoei.html");
      transcript='';return;
    }
    else if (transcript.includes("פנסיה")) {
      hideformic(); showIframe("pensiaMikzoei.html");
      transcript='';return;
    }
    else if (transcript.includes("השקעה")) {
      hideformic(); showIframe("hashkaaMikzoei.html");
      transcript='';return;
    }
    else if (transcript.includes("ילד")) {
      hideformic(); showIframe("hisyeled.html");
   transcript='';return;
    }
    else if (transcript.includes("פוליס")) {
      hideformic(); showIframe("polisotMikzoei.html");
      transcript='';return;
    }
    else if (transcript.includes("גמל") && !transcript.includes("השקעה")) {
      hideformic(); showIframe("kupatgemelmikzoei.html");
      transcript='';return;
    }
  }
  // פקודות הפניה למידע מסלולים
  else if (transcript.includes("השתלמות") && !transcript.includes("מקצועי")
	  && ifrmValue === 0 && document.getElementById('filter').style.display==='none') {
    showKupaMeida('pHish'); hideMaBaatar(); maslulim(30,'קרנות השתלמות',0);transcript='';return; 
  }
  else if (transcript.includes("פנסיה") && !transcript.includes("מקצועי") && ifrmValue === 0   && document.getElementById('filter').style.display==='none') {
    showKupaMeida('pPensia'); hideMaBaatar(); maslulimP(30,'קרנות חדשות',0);transcript='';return; 
  }
  else if (transcript.includes("השקעה") && !transcript.includes("מקצועי")
	 && ifrmValue === 0  && document.getElementById('filter').style.display==='none') {
    showKupaMeida('pHash'); hideMaBaatar(); maslulim(30,'קופת גמל להשקעה',0);transcript='';return; 
  }
  else if (transcript.includes("ילד") && !transcript.includes("מקצועי") && ifrmValue === 0  && document.getElementById('filter').style.display==='none') {
    showKupaMeida('pYeled'); hideMaBaatar(); maslulim(30,'קופת גמל להשקעה - חסכון לילד',0);transcript='';return; 
  }
  else if (transcript.includes("פוליס") && !transcript.includes("מקצועי") && ifrmValue === 0  && document.getElementById('filter').style.display==='none') {
    showKupaMeida('pPolisa'); hideMaBaatar(); maslulim(30,'פוליסות חסכון',0);transcript='';return; 
  }
  else if (transcript.includes("גמל") && !transcript.includes("השקעה") && !transcript.includes("מקצועי")
	   && ifrmValue === 0  && document.getElementById('filter').style.display==='none') {
    showKupaMeida('pGemel'); hideMaBaatar(); maslulim(30,'תגמולים ואישית לפיצויים',0);transcript='';return; 
  }
  
  
  // פקודות הפניה למידע תקרות
	
	 if (transcript.includes("תקרות") || transcript.includes("תקרות הפקדה")) {
		showIframe('tikrot.html');transcript='';return;
    }

	 if (transcript.includes("מסלול") && ifrmValue===0 ) {
		const match = transcript.match(/מסלול\s+(\S+)/);
			if (match) {
				searchMh(match[1]);
		}
		else{
     Swal.fire({
          html: "<span style='color: green; font-size: 16px'> אמור  מסלול  + מספר מסלול </span>",
          showConfirmButton: false,
          width: "clamp(300px, 90vw, 600px)",
          position: "center",
          timer: 2000,
          timerProgressBar: true,
          background: "#fff",
          icon: "warning",
          customClass: {
            popup: 'swal2-center-custom'
          }
        });
		  }
      transcript='';return; 
    }
	// פקודות לטיפול בתוך התהליך
	if(ifrmValue===1){
	  
		if(iframe.src.includes("loan")){
		handleLoan(transcript);return
		}
		else if(iframe.src.includes("ribitderibit")){
			handleCompoundInterest(transcript);transcript='';return;
		}
		else if(iframe.src.includes("hashMenahalot")){
			handleMenahalot(transcript);transcript='';return;
		}
    else if(iframe.src.includes("hashDmeyNihul")){
      
      handleHashDmeyNihul(transcript);transcript='';return;
    }
    else if(iframe.src.includes("hafkada")){
      handleYaad(transcript);transcript='';return;
    }
    else if(iframe.src.includes("hasifotMeshulav")){
      handleHasifot(transcript);transcript='';return;
    }
      else if(iframe.src.includes('riskQuest')) {
        handleSheelon(transcript);transcript='';return;
      }
      else if(iframe.src.includes('VirtualInvest')){
        handleMeshulav(transcript);transcript='';return;
      }
   }
  if(document.getElementById('filter').style.display==='flex'){
	  handleSharp(transcript);transcript='';return;
	}
  else if(transcript.includes("הדפס") || transcript.includes("pdf")){
    window.exportToPDF();return
  }
  
if(transcript!=='' && transcript!=='עבור' && !transcript.includes('מאשר')){
  Swal.fire({
    html: "<span style='color: green; font-size: 16px;'>הבקשה אינה ברורה - אמור שוב</span>",
    showConfirmButton: false,
    width: "clamp(300px, 90vw, 600px)",
    position: "center",
    timer: 2000,
    timerProgressBar: true,
    background: "#fff",
    icon: "warning",
    customClass: {
      popup: 'swal2-center-custom'
    }
  });
  }
 transcript='';	 
}
function handleLoan(transcript) {
	const iframex = document.getElementById('ifrm');
	const loanDoc = iframex.contentWindow.document;
	const loanWindow = iframex.contentWindow;
	const loanAmountInput = loanDoc.getElementById('loan-amount');
	const termfor = loanDoc.getElementById('loan-term');
	const interestfor = loanDoc.getElementById('interest-rate');
	const delayfor = loanDoc.getElementById('payment-delay');
	const pianoach=handleInput(transcript);

	// סכום
	
  if (pianoach.amount) {
		loanAmountInput.value = pianoach.amount;
		loanDoc.getElementById('loan-amount-range').value=pianoach.amount;
	}
	// גרייס
	if (pianoach.grace) {
	         delayfor.value = pianoach.grace;
		loanDoc.getElementById('payment-delay-range').value=pianoach.grace;
	}
	else if (transcript.includes("גרייס") ) {
		delayfor.value = '';
		loanDoc.getElementById('payment-delay-range').value=0;
			}
	// תקופה
	if (pianoach.term) {
		termfor.value = pianoach.term;
		loanDoc.getElementById('loan-term-range').value=pianoach.term;
			}
	// ריבית
	if (pianoach.interest) {
		interestfor.value = pianoach.interest;
		loanDoc.getElementById('interest-rate-range').value=pianoach.interest;
			}
	// הפעלת מחשבון רק אם כל השדות מולאו
	if (termfor.value && interestfor.value && loanAmountInput.value) {
		loanWindow.calculateLoan();
	}
	// לוח סילוקין
	if (transcript.includes("סילוק") || transcript.includes("הסתר")
    || transcript.includes('אסתר')) {
		loanWindow.toggleAmortizationTable();
	}
	transcript='';
}
function handleCompoundInterest(transcript) {
  const iframex = document.getElementById('ifrm');
  const compoundDoc = iframex.contentWindow.document;
  const compoundWindow = iframex.contentWindow;
  const initialAmountInput = compoundDoc.getElementById('hadpeami');
  const monthlyDepositInput = compoundDoc.getElementById('hodshi');
  const termInput = compoundDoc.getElementById('txttkofa1');
  const interestRateInput = compoundDoc.getElementById('selecttoz');
  const DmeyNihulInput= compoundDoc.getElementById('txttkofa2');
  const tesuaInput= compoundDoc.getElementById('selectoz');
if(transcript.includes('סוג')){
  if(transcript.includes('פעמי') && (!transcript.includes('חודשי' || transcript.includes('בתשלומים')))){
    compoundDoc.getElementById('rdbutton1').checked=true;compoundWindow.rdchange();
  }
  if((transcript.includes('חודשי') || transcript.includes('בתשלומים')) && !transcript.includes('פעמי')){
    compoundDoc.getElementById('rdbutton2').checked=true;compoundWindow.rdchange();
  }
  if(transcript.includes('פעמי') && (transcript.includes('חודשי') || transcript.includes('בתשלומים'))){
    compoundDoc.getElementById('rdbutton3').checked=true;compoundWindow.rdchange();
  }
}
  const pianoach=handleInput(transcript);
	if (pianoach.had) {
		initialAmountInput.value = pianoach.had;
		compoundWindow.onch()
			}
	if (pianoach.hodshi) {
		monthlyDepositInput.value = pianoach.hodshi;
		compoundWindow.onch()
	}
	if (pianoach.term) {
			termInput.value = pianoach.term;
			compoundWindow.onch()
				}
	// ריבית
if (pianoach.interest) {
   interestRateInput.value = pianoach.interest/100;
   compoundDoc.getElementById("kottoz").textContent = `לפי ריבית ${pianoach.interest}% שנתי:`
   ;compoundWindow.hashev(0.4);
}
if (pianoach.dmey || pianoach.dmey===0) {
    const valueToSelect = pianoach.dmey.toString();
    const options = Array.from(DmeyNihulInput.options);
    const existingOption = options.find(opt => opt.value === valueToSelect);
    if (existingOption) {
        existingOption.selected = true;
    } else {
       if(valueToSelect<=2 && valueToSelect>=0){
        const option = document.createElement('option');
        option.value = valueToSelect;
        option.textContent = valueToSelect + '%';
        option.selected = true;
        DmeyNihulInput.appendChild(option);
       }
    }
    compoundWindow.onch()
}
  // הפעלת חישוב אם כל השדות מולאו
 if(transcript.includes('חשב') && !transcript.includes('מחשב')){
    compoundWindow.hashev(0.04)
  }
  }
function handleMenahalot(transcript) {
  const iframex = document.getElementById('ifrm');
  const menahalotDoc = iframex.contentWindow.document;
  const menahalotWindow = iframex.contentWindow;
  const rd1=menahalotDoc.getElementById('radio1');
  const rd2=menahalotDoc.getElementById('radio2');
  const selmenu1 = menahalotDoc.getElementById('selmen1');
  const selmenu2 = menahalotDoc.getElementById('selmen2');
	var input=''; 
 const molMatchx = transcript.match(/((\S+)\s+מול\s+(\S+))/);
 
if(transcript.includes("מול")){
 
  setTimeout(function() {
    menahalotDoc.getElementById('form2').style.display='flex';
	  menahalotDoc.getElementById('form1').style.display='none';
    const matchtext=transcript.split("מול");
    input=matchHevra(matchtext[0].trim());
    var match1 = gufmosdixA.find(name => name.includes(input));
    if(match1){
      rd2.checked=true; 
      menahalotWindow.selchange();
      selmenu1.value = match1;
      
    
      input=matchHevra(matchtext[1].trim());
      var match2 = gufmosdixA.find(name => name.includes(input));
      if(match1){
        selmenu2.value = match2;
      }  
        if(selmenu1.value && selmenu2.value){
          menahalotWindow.compare2();
          setTimeout(function() {
            iframex.contentWindow.scrollTo(0, window.innerHeight*0.8);
          }, 100);
        }
        transcript='';return; 
     } 
     else{
       if(transcript.includes("מול")){
        input=matchHevra(transcript);
        var match = gufmosdixA.find(name => name.includes(input));
        if(match){
          selmenu2.value = match;
        }
        if(selmenu1.value && selmenu2.value){
          menahalotWindow.compare2();
          setTimeout(function() {
           handleSearchFromVoice('ראש');
            iframex.contentWindow.scrollBy(0, window.innerHeight*0.5);
          }, 100);
        }
        transcript='';return; 
      }
     }
  }, 100);
   
}

else if ((transcript.includes("שתי") && menahalotWindow.document.getElementById('mas').style.display==='none') || rd2.checked===true) {
		rd2.checked=true;
	menahalotDoc.getElementById('form2').style.display='flex';
	menahalotDoc.getElementById('form1').style.display='none';

	if (transcript.includes("מובילה") || transcript.includes("מול")) {
		if (transcript.includes("מובילה") && transcript.includes("מול")){
			const matchtext=transcript.split("מול");
			input=matchHevra(matchtext[0].trim());
			var match = gufmosdixA.find(name => name.includes(input));
      if(match){
			  selmenu1.value = match;
      }
			input=matchHevra(matchtext[1].trim());
			var match = gufmosdixA.find(name => name.includes(input));
      if(match){
			  selmenu2.value = match;
      }
		}
		else if(transcript.includes("מובילה")){
			input=matchHevra(transcript);
			var match = gufmosdixA.find(name => name.includes(input));
      if(match){
			  selmenu1.value = match;
      }
		}
		
	}
	if(transcript.includes("השווה") || transcript.includes("השוואה") || transcript.includes("בצע")
		||  transcript.includes("בצא") || transcript.includes("הפעל") || transcript.includes("הפאל")){
		const iframe = document.getElementById('ifrm');
      if(selmenu1.value && selmenu2.value){  
        menahalotWindow.compare2();
        iframe.contentWindow.scrollBy(0, window.innerHeight*0.8);
      }
		}

		if(transcript.includes("הדפס") || transcript.includes("pdf")){
        menahalotWindow.pdfDo();
		}
}
if (transcript.includes("מרובה") || rd1.checked===true) {
    const matchHev=matchHevra(transcript);
		rd1.checked=true;
		menahalotWindow.selchange()
    var sugMMen=menahalotDoc.getElementById('sugMMen');
    if(transcript.includes('סגור') || transcript.includes('אסתר') || transcript.includes('הסתר') ){
      
      if(menahalotDoc.getElementById('mas').style.display==='block'){
        menahalotDoc.getElementById('mas').style.display='none';
      }
      else  if(menahalotDoc.querySelector('.dropdown-menu').style.display==='block'){ 
        menahalotWindow.toggleDr();
      }
    }
    if (transcript.includes('הצג') || transcript.includes('בצק') || transcript.includes('בחר')){
      if( transcript.includes('מסלול') && menahalotWindow.document.getElementById('mas').style.display==='none' 
    && sugMMen.value!==''){
        showMaslul();
        recognition.stop;
        recognition.start;
      }
      else if((transcript.includes('חבר') || transcript.includes('מנהל')) && menahalotWindow.document.getElementById('mas').style.display==='none'){
        menahalotWindow.toggleDr();
        recognition.stop;
        recognition.start;
      }
    }

    
   
     if(matchHev ||  transcript.includes("כול") || transcript.includes("כל") 
    || transcript.includes("קול") && !transcript.includes("כלל")){
      
       const checkboxes = menahalotDoc.querySelectorAll('.dropdown-menu input[type="checkbox"]');
       checkboxes.forEach((checkbox) => {
        if(transcript.includes('כלל') && checkbox.value.includes("all")) {
          checkbox.checked ===false;
        }
        
         if((transcript.includes("כל") || transcript.includes("כול") || transcript.includes("קול"))
           && checkbox.value.includes("all") && !transcript.includes("כלל")){
            
            checkboxes.forEach((checkb) => {
              checkb.checked = false;
            });
            checkbox.checked = true;menahalotWindow.sfira();
         } 
         else if(checkbox.value.includes(matchHev)){
          
          checkboxes.forEach((checkb) => {
            
           if(checkb.value.includes("all") && checkb.checked === false){
              checkbox.checked = true;menahalotWindow.sfira();
            }
          });
          
         } 
        
     })

     }
    if (transcript.includes('מוצר')) {
      if (transcript.includes("השתלמות")) {
        sugMMen.selectedIndex = 1;
      } else if (transcript.includes("פנסיה")) {
        sugMMen.selectedIndex = 6;
      } else if (transcript.includes("גמל") && !transcript.includes("השקעה")) {
        sugMMen.selectedIndex = 2;
      } else if (transcript.includes("השקעה")) {
        sugMMen.selectedIndex = 3;
      } else if ((transcript.includes("חסכון") || transcript.includes("חיסכון")) && !transcript.includes("ילד")) {
        sugMMen.selectedIndex = 5;
      } else if (transcript.includes("ילד")) {
        sugMMen.selectedIndex = 4;
      }
      menahalotWindow.changeTheMuzar();
    }
    
    if(transcript.includes('מסלול')  && (!transcript.includes('הצג') || !transcript.includes('בחר'))){
      const nummatch=matchNumber(transcript.replace('מסלול','').trim());
      if(nummatch && !transcript.includes('אחוז') && !transcript.includes('שיעור')){
        menahalotWindow.document.getElementById('selectShemkupa').selectedIndex=parseInt(nummatch)-1;
        menahalotWindow.document.getElementById('mas').style.display='none';
        menahalotWindow.changmoz()
    }
    }
  
  }

  if((transcript.includes("בצע") || transcript.includes("בצא") || transcript.includes("השווה") || transcript.includes("הפעל") || transcript.includes("הפאל"))
     && !transcript.includes('מחשב')){
      menahalotWindow.dohash();menahalotWindow.scrollBy(0, 300);
  }

 
}
function handleSharp(transcript) {
        var sugmM=document.getElementById('sugM');
        if (transcript.includes("השתלמות")) {
            sugmM.selectedIndex=0;
        }
        else if (transcript.includes("פנסיה")) {
            sugmM.selectedIndex=4	;
	}
        else if (transcript.includes("גמל") && !transcript.includes("השקעה")) {sugmM.selectedIndex=1;
        }
        else if (transcript.includes("השקעה")) {
            sugmM.selectedIndex=2;
}
        else if (transcript.includes("חסכון") || transcript.includes("חיסכון")) {
            sugmM.selectedIndex=3;
}
            tablhasifot()
            window.scrollBy(0, window.innerHeight*0.8);
      }

function handleHashDmeyNihul(transcript) {
  const iframex = document.getElementById('ifrm');
  const dmeyNihultDoc = iframex.contentWindow.document;
  const dmeyNihulWindow = iframex.contentWindow;
  const rd1=dmeyNihultDoc.getElementById('rd1');
  const rd2=dmeyNihultDoc.getElementById('rd2');
  const rd3=dmeyNihultDoc.getElementById('rd3');
  const savingAmount=dmeyNihultDoc.getElementById('savingAmount');
  const depositAmount=dmeyNihultDoc.getElementById('depositAmount');
  const saving=dmeyNihultDoc.getElementById('saving');
  const deposit=dmeyNihultDoc.getElementById('deposit');
  const age=dmeyNihultDoc.getElementById('age');
  const alltoz=dmeyNihultDoc.getElementById("alltoz");
  const feeSaving1=dmeyNihultDoc.getElementById("feeSaving1");
  const feeDeposit1=dmeyNihultDoc.getElementById("feeDeposit1");
  const feeSaving2=dmeyNihultDoc.getElementById("feeSaving2");
  const feeDeposit2=dmeyNihultDoc.getElementById("feeDeposit2");
  const selecttoz=dmeyNihultDoc.getElementById("selecttoz");
  const pianoach=handleInputx(transcript);
  

  if (transcript.includes("סוג")){
    
    alltoz.style.display="none";
   if (transcript.includes("צבירה") && !transcript.includes("חודשי")) {rd1.checked=true;
   }
    else if ((transcript.includes("חודשי") || transcript.includes('הפקדה')) && !transcript.includes("צבירה")) {rd2.checked=true;
    
    }
    else if (transcript.includes("חודשי") && transcript.includes("צבירה")) {rd3.checked=true;
    }
    dmeyNihulWindow.updateFields();
    transcript='';
  }
  if((transcript.includes("בצע") || transcript.includes("בצא") || transcript.includes("חשב")
    || transcript.includes("חישוב") || transcript.includes("הפעל") || transcript.includes("הפאל")) && !transcript.includes('מחשב')){
    dmeyNihulWindow.hashev(0.04);dmeyNihulWindow.scrollBy(0, 300);
    transcript='';
  }
 if (!pianoach) {transcript='';return;}
  if(pianoach.amount){
      savingAmount.value=pianoach.amount;
      alltoz.style.display="none";
    }
    if(pianoach.hodshi){
      depositAmount.value=pianoach.hodshi;
      alltoz.style.display="none";
    }
    if(pianoach.gil){
      age.value=pianoach.gil;
      alltoz.style.display="none";
    }
    if(pianoach.zvirakayam){
      feeSaving1.value=pianoach.zvirakayam;
      alltoz.style.display="none";
    }
    if(pianoach.zvirahadash){
      feeSaving2.value=pianoach.zvirahadash;
      alltoz.style.display="none";
    }
    if(pianoach.hafkadakayam){
      feeDeposit1.value=pianoach.hafkadakayam;
      alltoz.style.display="none";
    }
    if(pianoach.hafkadahadash){
     feeDeposit2.value=pianoach.hafkadahadash;
     alltoz.style.display="none";
    }
    if(pianoach.interest){
      selecttoz.value=pianoach.interest/100;
 //     if(!alltoz.style.display==="none"){
        dmeyNihulWindow.othribit(pianoach.interest/100);
	dmeyNihultDoc.getElementById("kottoz").textContent = `לפי ריבית ${match.interest}% שנתי:`;
        if(window.innerWidth<400){ dmeyNihulWindow.scrollBy(0, 350);}
        
     // }
    }
    
  
}
function handleYaad(transcript) {
  const iframex = document.getElementById('ifrm');
  const yaadDoc = iframex.contentWindow.document;
  const yaadWindow = iframex.contentWindow;
  const targetAmount=yaadDoc.getElementById('targetAmount');
  const targetAmountSlider=yaadDoc.getElementById('targetAmount_slider');
  const initialAmount=yaadDoc.getElementById('initialAmount');
  const initialAmountSlider=yaadDoc.getElementById('initialAmount_slider');
  const interestRate=yaadDoc.getElementById('interestRate');
  const interestRateSlider=yaadDoc.getElementById('interestRate_slider');
  const managementFee=yaadDoc.getElementById('managementFee');
  const managementFeeSlider=yaadDoc.getElementById('managementFee_slider');
  const years=yaadDoc.getElementById('years');
  const yearsSlider=yaadDoc.getElementById('years_slider');
  if(transcript.includes("דמי ניהול") || transcript.includes("ניהול")){
      const match=handleInput(transcript)
      managementFee.value = match.dmey;
      managementFeeSlider.value = match.dmey;
      if(window.innerWidth<400 && match.dmey){
        yaadWindow.scrollBy(0,150)};
    }
    if((transcript.includes("יעד") || transcript.includes("יד")) && transcript.includes("סכום")){
      const match=handleInput(transcript)
      targetAmount.value = match.amount;
      targetAmountSlider.value = match.amount;
    }
    if(transcript.includes("התחל")  && transcript.includes("סכום")){
      const match=handleInput(transcript)
      initialAmount.value = match.amount;
      initialAmountSlider.value = match.amount;
      if(window.innerWidth<400 && match.amount){
        yaadWindow.scrollBy(0,150)};
    }
    if(transcript.includes("ריבית") ){
      const match=handleInput(transcript);
      interestRate.value = match.interest;
      interestRateSlider.value = match.interest;
      if(window.innerWidth<400 && match.interest){
        yaadWindow.scrollBy(0,150)};
    }
    if(transcript.includes("תקופ")){
      const match=handleInput(transcript);
      years.value = match.term;
      yearsSlider.value = match.term;
    }
    if(transcript.includes("בצע") || transcript.includes("בצא") || transcript.includes("חשב")
      || transcript.includes("חישוב") || transcript.includes("הפעל") || transcript.includes("הפאל")){
      yaadWindow.calculateMonthlyDeposit();
      yaadDoc.getElementById("result").scrollIntoView({ behavior: "smooth", block: "start" });
    }
//yaadWindow.calculateMonthlyDeposit()
}
function handleHasifot(transcript) {
  const iframex = document.getElementById('ifrm');
  const hasifotDoc = iframex.contentWindow.document;
  const hasifotWindow = iframex.contentWindow;
  const sugmM = hasifotDoc.getElementById('product');
  const stocks = hasifotDoc.getElementById('stocks');
  const abroad = hasifotDoc.getElementById('abroad');
  const currency = hasifotDoc.getElementById('currency');
  // בחירת מוצר
  
    if (transcript.includes("השתלמות")) {
      sugmM.selectedIndex = 1;
    } else if (transcript.includes("פנסיה")) {
      sugmM.selectedIndex = 3;
    } else if (transcript.includes("גמל") && !transcript.includes("השקעה")) {
      sugmM.selectedIndex = 2;
    } else if (transcript.includes("השקעה")) {
      sugmM.selectedIndex = 5;
    } else if ((transcript.includes("חסכון") || transcript.includes("חיסכון")) && !transcript.includes("ילד")) {
      sugmM.selectedIndex = 4;
    } else if (transcript.includes("ילד")) {
      sugmM.selectedIndex = 6;
    }
    if (sugmM.value !== '') {
      hasifotWindow.submitForm(sugmM);
    }
  
  // פונקציה עזר להצבת אחוזים
  function setSelectByPercentage(transcript, element) {
    if (transcript.includes('עד חמש עשרה') || transcript.includes('15')) {
      element.selectedIndex = 1;
    } else if (transcript.includes('עד שלושים') || transcript.includes('30')) {
      element.selectedIndex = 2;
    } else if (transcript.includes('עד חמישים') || transcript.includes('50')) {
      element.selectedIndex = 3;
    } else if ((transcript.includes('עד שיבעים') || transcript.includes('עד שבעים') || transcript.includes('70')) && !transcript.includes('מעל')) {
      element.selectedIndex = 4;
    } else if (transcript.includes('מעל')) {
      element.selectedIndex = 5;
    }
    if (element.value !== '') {
      hasifotWindow.doTheCircle(element);
    }
  }
  // מניות
  if (transcript.includes('מניות') && sugmM.value !== '') {
    setSelectByPercentage(transcript, stocks);
    hasifotWindow.hasifch(stocks);hasifotWindow.submitForm(stocks)
  }
  // חול
  if (transcript.includes('חול') && sugmM.value !== '') {
    setSelectByPercentage(transcript, abroad);
    hasifotWindow.hasifch(abroad);hasifotWindow.submitForm(abroad)
  }
  // חוץ (מט"ח)
  if ((transcript.includes('חוץ')|| transcript.includes('מטח')) && sugmM.value !== '') {
    setSelectByPercentage(transcript, currency);
    hasifotWindow.hasifch(currency);hasifotWindow.submitForm(currency)
  }
}
function extractAmounta(text) {
  const units = {
    "אפס": 0, "אפסים": 0,
    "אחד": 1, "אחת": 1,
    "שתיים": 2, "שניים": 2, "שתי": 2, "שני": 2, "שניי": 2,
    "שלוש": 3, "שלושה": 3, "שלושת": 3,
    "ארבע": 4, "ארבעה": 4, "ארבעת": 4,
    "חמש": 5, "חמישה": 5, "חמשת": 5,
    "שש": 6, "שישה": 6, "ששת": 6,
    "שבע": 7, "שבעה": 7, "שבעת": 7,
    "שמונה": 8, "שמונת": 8,
    "תשע": 9, "תשעה": 9, "תשעת": 9,
    "עשר": 10, "עשרה": 10, "עשרת": 10,
    "אלפיים": 2000
  };
  const teens = {
    "אחת עשרה": 11, "אחד עשר": 11, "שתים עשרה": 12, "שניים עשר": 12,
    "שלוש עשרה": 13, "שלושה עשר": 13, "ארבע עשרה": 14, "ארבעה עשר": 14,
    "חמש עשרה": 15, "חמישה עשר": 15, "שש עשרה": 16, "שישה עשר": 16,
    "שבע עשרה": 17, "שבעה עשר": 17, "שמונה עשרה": 18, "שמונה עשר": 18,
    "תשע עשרה": 19, "תשעה עשר": 19
  };
  const tens = {
    "עשרים": 20, "שלושים": 30, "ארבעים": 40,
    "חמישים": 50, "שישים": 60, "שבעים": 70,
    "שמונים": 80, "תשעים": 90
  };
  const hundreds = {
    "מאה": 100, "מאתיים": 200, "שלוש מאות": 300, "ארבע מאות": 400,
    "חמש מאות": 500, "שש מאות": 600, "שבע מאות": 700,
    "שמונה מאות": 800, "תשע מאות": 900
  };
  const fractions = { "חצי": 0.5, "שליש": 1 / 3, "שלושת רבעי": 0.75, "רבע": 0.25 };
  const multipliers = { "כפול": true, "פי": true };

  function parseGroup(words) {
    let total = 0, currentGroup = 0, multiplyNext = 1;
    for (let i = 0; i < words.length; i++) {
      let word = words[i].trim();
      if (!word) continue;
      if (multipliers[word]) { multiplyNext = currentGroup || 1; currentGroup = 0; continue; }
      if (/^\d+$/.test(word)) { currentGroup += parseInt(word); continue; }
      if (i + 1 < words.length) {
        const twoWords = word + ' ' + words[i + 1];
        if (teens[twoWords]) { currentGroup += teens[twoWords]; i++; continue; }
        if (hundreds[twoWords]) { currentGroup += hundreds[twoWords]; i++; continue; }
      }
      if (units[word]) currentGroup += units[word];
      else if (tens[word]) currentGroup += tens[word];
      else if (hundreds[word]) currentGroup += hundreds[word];
      else if (fractions[word]) {
        if (currentGroup === 0) currentGroup = 1;
        total += currentGroup * fractions[word];
        currentGroup = 0;
      }
    }
    total += currentGroup;
    total *= multiplyNext;
    return total;
  }

  const cleanedText = text.replace(/[,\-]/g, ' ').replace(/\s+/g, ' ').replace(/(^ו)|(\sו)/g, ' ').trim();
  const words = cleanedText.split(' ');
  let total = 0;

  // מפצל לפי "אלף", תומך בכמה מופעים
  let i = 0;
  let currentWords = [];

  while (i < words.length) {
    if (words[i] === 'אלף' || words[i] === 'אלפים') {
      const before = parseGroup(currentWords);
      total += (before === 0 ? 1 : before) * 1000;
      currentWords = [];
    } else {
      currentWords.push(words[i]);
    }
    i++;
  }

  total += parseGroup(currentWords);
  return total || null;
}

function extractInterestRatea(text) {
  text = text.replaceAll("אחוזים", "אחוז").replaceAll("%", "אחוז").trim();
const wordMap = {
  "אפס":0,
  "אחת": 1, "אחד": 1,
  "שתיים": 2, "שניים": 2, "שני": 2, "שניי": 2,
  "שלוש": 3, "שלושה": 3, "ארבע": 4, "ארבעה": 4,
  "חמש": 5, "חמישה": 5, "שש": 6, "שישה": 6,
  "שבע": 7, "שבעה": 7, "שמונה": 8,
  "תשע": 9, "תשעה": 9
};
function getDecimalWord(word) {
  return wordMap[word] ?? null;
}
// תבנית: "שלושה נקודה חמש"
const match = text.match(/(אחת|אחד|שתיים|שניים|שלוש|שלושה|ארבע|ארבעה|חמש|חמישה|שש|שישה|שבע|שבעה|שמונה|תשע|תשעה)\s*נקודה\s*(אחת|אחד|שתיים|שניים|שלוש|שלושה|ארבע|ארבעה|חמש|חמישה|שש|שישה|שבע|שבעה|שמונה|תשע|תשעה)/);
if (match) {
  const intPart = getDecimalWord(match[1]);
  const decimalPart = getDecimalWord(match[2]);
  if (intPart != null && decimalPart != null) {
    return parseFloat(`${intPart}.${decimalPart}`);
  }
}
// תבנית: מספר ספרתי רגיל
const digitMatch = text.match(/(\d+(?:\.\d+)?)\s*אחוז/);
if (digitMatch) return parseFloat(digitMatch[1]);
// תבנית: "שישה אחוז"
const wordOnlyMatch = text.match(/(אחת|אחד|שתיים|שניים|שני|שלוש|שלושה|ארבע|ארבעה|חמש|חמישה|שש|שישה|שבע|שבעה|שמונה|תשע|תשעה)\s*אחוז/);
if (wordOnlyMatch) {
  const val = getDecimalWord(wordOnlyMatch[1]);
  if (val != null) return val;
}
return null;
  }
function handleInput(text) {
// חילוץ ממוקד לפי הקשר ולא לפי סדר בטקסט
const hadMatch = text.match(/(?:סכום\s+)?חד\s*פעמי\s+(.*?)(?=(סכום|חודשי|ריבית|תקופ|גרייס|$))/);
const hodshiMatch = text.match(/(?:סכום\s+)?חודשי\s+(.*?)(?=(סכום|חד\s*פעמי|ריבית|תקופ|גרייס|$))/);
const amountMatch = text.match(/(?:סכום\s+)(?!חודשי)(?!חד\s*פעמי)(.*?)(?=(חד\s*פעמי|חודשי|ריבית|תקופ|גרייס|$))/);
const interestMatch = text.match(/(?:ריבית\s*(של)?\s*)(.*?)(?=(סכום|תקופ|גרייס|$))/);
const termMatch = text.match(/(?:תקופ[ה|ת]\s*(של)?\s*)(.*?)(?=(ריבית|סכום|גרייס|$))/);
const graceMatch = text.match(/(?:גרייס\s*(של)?\s*)(.*?)(?=(ריבית|תקופ|סכום|$))/);
const dmeyMatch = text.match(/(?:ניהול\s*(של)?\s*)(.*?)(?=(ריבית|תקופ|סכום|$))/);
//const tesuaMatch = text.match(/(?:תשוא[אה]?|תשועה)\s*(של)?\s*(.*?)(?=(ריבית|תקופ|סכום|$))/);
  // טקסטים
const hadText = hadMatch ? hadMatch[1] : '';
const hodshiText = hodshiMatch ? hodshiMatch[1] : '';
const amountText = amountMatch ? amountMatch[1] : '';
const interestText = interestMatch ? interestMatch[2] : '';
const dmeyText = dmeyMatch ? dmeyMatch[2] : '';
const termText = termMatch ? termMatch[2] : '';
const graceText = graceMatch ? graceMatch[2] : '';
// המרות
const had = extractAmounta(hadText);
const hodshi = extractAmounta(hodshiText);
const amount = extractAmounta(amountText);
const interest = extractInterestRatea(interestText);
const term = extractAmounta(termText);
const grace = extractAmounta(graceText);
const dmey = extractInterestRatea(dmeyText);
  return {
  had: had,
  hodshi: hodshi,
  amount: amount,
  interest: interest,
  term: term,
  grace: grace,
  dmey: dmey,
};
}
function matchHevra(transcript){
	if (transcript.includes("מגדל")) {return "מגדל";}
	else if (transcript.includes("הראל")) {return  "הראל";}
	else if (transcript.includes("כלל")) {return  "כלל";}
	else if (transcript.includes("מנורה")) {return  "מנורה";}
	else if (transcript.includes("אלטשולר")) {return "אלטשולר";}
	else if (transcript.includes("פניקס")) {return  "פניקס";}
	else if (transcript.includes("מור")) {return  "מור";}
	else if (transcript.includes("ילין")) {return  "ילין";}
	else if (transcript.includes("אנליסט")) {return  "אנליסט";}
	else if (transcript.includes("מיטב")) {return  "מיטב";}
	else if (transcript.includes("אינפי") || transcript.includes("אנפי")) {return "אינפיניטי";}
}
function handleSheelon(transcript){
  const iframeWindow=document.getElementById('ifrm').contentWindow;
  const sheala=matchSheelon(transcript);

 if(sheala.rishona && sheala.rishonaTshuva){
    if(!transcript.includes('שישית')){
  iframeWindow.document.querySelector(`input[name="${sheala.rishona}"]`) .scrollIntoView({ behavior: "smooth", block: "start" });
 }
    iframeWindow.document.querySelector(`input[name="${sheala.rishona}"][value="${sheala.rishonaTshuva}"]`).checked = true;
  }
  if(sheala.shniya && sheala.shniyaTshuva){
    if(!transcript.includes('שישית')){
  iframeWindow.document.querySelector(`input[name="${sheala.shniya}"]`) .scrollIntoView({ behavior: "smooth", block: "start" });
 }
    iframeWindow.document.querySelector(`input[name="${sheala.shniya}"][value="${sheala.shniyaTshuva}"]`).checked = true;
  }
  if(sheala.shlishit && sheala.shlishitTshuva){
    if(!transcript.includes('שישית')){
  iframeWindow.document.querySelector(`input[name="${sheala.shlishit}"]`) .scrollIntoView({ behavior: "smooth", block: "start" });
 }
    iframeWindow.document.querySelector(`input[name="${sheala.shlishit}"][value="${sheala.shlishitTshuva}"]`).checked = true;
  }
  if(sheala.reviyit && sheala.reviyitTshuva){
    if(!transcript.includes('שישית')){
  iframeWindow.document.querySelector(`input[name="${sheala.reviyit}"]`) .scrollIntoView({ behavior: "smooth", block: "start" });
 }
    iframeWindow.document.querySelector(`input[name="${sheala.reviyit}"][value="${sheala.reviyitTshuva}"]`).checked = true;
  }
  if(sheala.hamishit && sheala.hamishitTshuva){
    if(!transcript.includes('שישית')){
  iframeWindow.document.querySelector(`input[name="${sheala.hamishit}"]`) .scrollIntoView({ behavior: "smooth", block: "start" });
 }
    iframeWindow.document.querySelector(`input[name="${sheala.hamishit}"][value="${sheala.hamishitTshuva}"]`).checked = true;
  }
  if(sheala.shishit && sheala.shishitTshuva){
    if(!transcript.includes('שישית')){
  iframeWindow.document.querySelector(`input[name="${sheala.shishit}"]`) .scrollIntoView({ behavior: "smooth", block: "start" });
 }
    iframeWindow.document.querySelector(`input[name="${sheala.shishit}"][value="${sheala.shishitTshuva}"]`).checked = true;
  }

  if((transcript.includes('חשב') || transcript.includes('בצע')) && !transcript.includes('מחשב') ){
    iframeWindow.calculateRisk();
    iframeWindow.scrollTo(0, 0);
  }
  if(transcript.includes('עבור')){
    iframeWindow.showme();
  }
 }
 function matchSheelon(text){
  const rishonaMatch = text.match(/(?:ראשונה\s*)(.*?)(?=(שניה|שלישית|רביעית|חמישית|שישית|$))/);
  const shniyaMatch = text.match(/(?:שניה\s*)(.*?)(?=(ראשונה|שלישית|רביעית|חמישית|שישית|$))/);
  const shlishitMatch = text.match(/(?:שלישית\s*)(.*?)(?=(ראשונה|שניה|רביעית|חמישית|שישית|$))/);
  const reviyitMatch = text.match(/(?:רביעית\s*)(.*?)(?=(שניה|שלישית|ראשונה|חמישית|שישית|$))/);
  const hamishitMatch = text.match(/(?:חמישית\s*)(.*?)(?=(שניה|שלישית|רביעית|ראשונה|שישית|$))/);
  const shishitMatch = text.match(/(?:שישית\s*)(.*?)(?=(שניה|שלישית|רביעית|חמישית|ראשונה|$))/);
  
  const rishonaText = rishonaMatch ? rishonaMatch[0] : '';
  const shniyaText =shniyaMatch ? shniyaMatch[0] : '';
  const shilishitText =shlishitMatch ? shlishitMatch[0] : '';
  const reviyitText =reviyitMatch ? reviyitMatch[0] : '';
  const hamishitText =hamishitMatch ? hamishitMatch[0] : '';
  const shishitText =shishitMatch ? shishitMatch[0] : '';

  const rishona=matchSheala(rishonaText);
  const shniya=matchSheala(shniyaText);
  const shlishit=matchSheala(shilishitText);
  const reviyit=matchSheala( reviyitText);
  const hamishit=matchSheala(hamishitText);
  const shishit=matchSheala(shishitText);

  const rishonaTshuva=matchTeshuva(rishonaText);
  const shniyaTshuva=matchTeshuva(shniyaText);
  const shlishitTshuva=matchTeshuva(shilishitText);
  const reviyitTshuva=matchTeshuva( reviyitText);
  const hamishitTshuva=matchTeshuva(hamishitText);
  const shishitTshuva=matchTeshuva(shishitText);

  
  return{
    rishona:rishona,
    shniya:shniya,
    shlishit:shlishit,
    reviyit:reviyit,
    hamishit:hamishit,
    shishit:shishit,
    rishonaTshuva:rishonaTshuva,
    shniyaTshuva:shniyaTshuva,
    shlishitTshuva:shlishitTshuva,
    reviyitTshuva:reviyitTshuva,
    hamishitTshuva:hamishitTshuva,
    shishitTshuva:shishitTshuva


  }

 }
function matchTeshuva(transcript){ 
  if(transcript.includes('שניים')||transcript.includes('שתיים')){
    return 2;
  }
  else if(transcript.includes('אחד')||transcript.includes('אחת')){
    return 1;
  }
  else if(transcript.includes('שלוש')){
    return 3;
  }
}
function matchSheala(transcript){

  if(transcript.includes('ראשונה')){
    return 'q1';}
    else if(transcript.includes('חמישית')){
    return 'q5'}
     else if(transcript.includes('שישית')){
    return 'q6'}
    else if(transcript.includes('שניה')){
    return 'q2'}
    else if(transcript.includes('שלישית')){
    return 'q3'}
    else if(transcript.includes('רביעית')){
    return 'q4'}
}
function handleMeshulav(transcript){
  const iframe=document.getElementById('ifrm');
  const iframeWindow=iframe.contentWindow;
  const sugMMen=iframeWindow.document.getElementById('sugMMen');
  const percentage=iframeWindow.document.getElementById('percentage');
  const btnDo=iframeWindow.document.getElementById('btnDo');
  
    if (transcript.includes("השתלמות")) {
      sugMMen.selectedIndex = 1;
    } else if (transcript.includes("פנסיה")) {
      sugMMen.selectedIndex = 5;
    } else if (transcript.includes("גמל") && !transcript.includes("השקעה")) {
      sugMMen.selectedIndex = 2;
    } else if (transcript.includes("השקעה")) {
      sugMMen.selectedIndex = 3;
    } else if ((transcript.includes("חסכון") || transcript.includes("חיסכון")) && !transcript.includes("ילד")) {
      sugMMen.selectedIndex = 4;
    }
    if(transcript.includes("השתלמות") || transcript.includes("פנסיה") || transcript.includes("גמל")
     || transcript.includes("השקעה") || transcript.includes("חסכון") || transcript.includes("חיסכון")){
      if (sugMMen.value !== '') {
      iframeWindow.chngTik(); iframeWindow.addMaslulim();
      }
      
    }


if((transcript.includes('הצג') || transcript.includes('מסלול') || transcript.includes('בחר') ) && iframeWindow.document.getElementById('mas').style.display==='none' ){
  showMaslul();
}
else if(transcript.includes('הסתר') || transcript.includes('אסתר')){
  iframeWindow.document.getElementById('mas').style.display='none';
}
 if(transcript.includes('מסלול')  && (!transcript.includes('הצג') || transcript.includes('בחר'))){
     const nummatch=matchNumber(transcript.replace('מסלול','').trim());
     if(nummatch && !transcript.includes('אחוז') && !transcript.includes('שיעור')){
     iframeWindow.document.getElementById('selectShemkupa').selectedIndex=parseInt(nummatch)-1;
     iframeWindow.document.getElementById('mas').style.display='none';
   }
   }
  if(transcript.includes('שיעור' ) || transcript.includes('אחוז')){
     const transcripta = transcript.replace(/שיעור|אחוז|%/g, '').trim();
     const shiur=extractAmounta(transcripta);if(shiur && parseFloat(shiur)<=100){
       percentage.value=shiur;
     }
     }
   if(transcript.includes('הוסף')  || transcript.includes('אוסף')){
    iframeWindow.addRow(btnDo)
  }
  if(transcript.includes('הפעל') || transcript.includes('בצע')){
    iframeWindow.submitForm();
  }
  if((transcript.includes('מיין') ||transcript.includes('מעיין'))  && iframeWindow.document.getElementById('miyunshana') ){
    if(transcript.includes('שנה') || transcript.includes('1')){
      iframeWindow.sortTableX(iframeWindow.document.getElementById('miyunshana'))
    }
    else if(transcript.includes('שלוש') || transcript.includes('3')){
      iframeWindow.sortTableX(iframeWindow.document.getElementById('miyunshalosh'))
    }
    else if(transcript.includes('חמש') || transcript.includes('5')){
      iframeWindow.sortTableX(iframeWindow.document.getElementById('miyunhamesh'))
    }
  }
  if(transcript.includes('נקה')){
    iframeWindow.chngTik(); handleSearchFromVoice("הפעל");
  }
}
function matchNumber(transcript) {
  transcript = transcript.trim();
  // בדיקה אם יש מספר 1–16, תוך הימנעות ממספרים דומים כמו "11", "12" וכו'
  if (transcript.includes('1') && !transcript.match(/1[1-6]/)) return 1;
  if (transcript.includes('2') && !transcript.includes('12')) return 2;
  if (transcript.includes('3') && !transcript.includes('13')) return 3;
  if (transcript.includes('4') && !transcript.includes('14')) return 4;
  if (transcript.includes('5') && !transcript.includes('15')) return 5;
  if (transcript.includes('6') && !transcript.includes('16')) return 6;
  if (transcript.includes('7')) return 7;
  if (transcript.includes('8')) return 8;
  if (transcript.includes('9')) return 9;
  if (transcript.includes('10')) return 10;
  if (transcript.includes('11')) return 11;
  if (transcript.includes('12')) return 12;
  if (transcript.includes('13')) return 13;
  if (transcript.includes('14')) return 14;
  if (transcript.includes('15')) return 15;
  if (transcript.includes('16')) return 16;
  // מילים
  if (!transcript.includes('עשר') && !transcript.includes('עשרה')) {
    if (transcript.includes('אחת') || transcript.includes('אחד')) return 1;
    if (transcript.includes('שניים') || transcript.includes('שתיים')) return 2;
    if (transcript.includes('שלוש')) return 3;
    if (transcript.includes('ארבע')) return 4;
    if (transcript.includes('חמש')) return 5;
    if (transcript.includes('שש')) return 6;
    if (transcript.includes('שבע')) return 7;
    if (transcript.includes('שמונה')) return 8;
    if (transcript.includes('תשע')) return 9;
  }
  if (transcript.includes('עשר') || transcript.includes('עשרה')) {
    if (transcript.includes('אחת') || transcript.includes('אחד')) return 11;
    if (transcript.includes('שניים') || transcript.includes('שתיים')) return 12;
    if (transcript.includes('שלוש') || transcript.includes('שלושה')) return 13;
    if (transcript.includes('ארבע') || transcript.includes('ארבעה')) return 14;
    if (transcript.includes('חמש') || transcript.includes('חמישה')) return 15;
    if (transcript.includes('שש') || transcript.includes('שישה')) return 16;
    if (!transcript.match(/(אחת|אחד|שניים|שתיים|שלוש|ארבע|חמש|שש)/)) return 10;
  }
  return null; // לא זוהה מספר
}
function showMaslul(){
  var maslul;
  const iframe=document.getElementById('ifrm');
  const iframeWindow=iframe.contentWindow;
  
  maslul=iframeWindow.document.getElementById('selectShemkupa');  
  var mas=
     iframeWindow.document.getElementById('mas');
     mas.style.display='block';
var count=1;
  maslul.querySelectorAll("option").forEach(option => {
    mas.innerHTML+=`
    <label style='display:block'>${count}.${option.textContent}
    </label>`;
 count++;
  });
}
function handleInputx(text) {
// חילוץ ממוקד לפי הקשר ולא לפי סדר בטקסט
const hadMatch = text.match(/(?:סכום\s+)?חד\s*פעמי\s+(.*?)(?=(סכום|חודשי|ריבית|תקופ|דמי|בצע|חשב|תשלום|$))/);
const hodshiMatch = text.match(/(?:סכום\s+)?חודשי\s+(.*?)(?=(סכום|חד\s*פעמי|ריבית|תק|ופה|גיל|גרייס|דמי|$))/);
const amountMatch = text.match(/(?:סכום\s+)(?!חודשי)(?!חד\s*פעמי)(.*?)(?=(חד\s*פעמי|חודשי|ריבית|גיל|בצע|חשב|תקופ|גרייס|דמי|$))/);
const interestMatch = text.match(/(?:ריבית\s*(של)?\s*)(.*?)(?=(סכום|בצע|חשב|תקופ|גרייס|$))/);
const termMatch = text.match(/(?:תקופ[ה|ת]\s*(של)?\s*)(.*?)(?=(ריבית|סכום|בצע|חשב|חודשים|גרייס|$))/);
const graceMatch = text.match(/(?:גרייס\s*(של)?\s*)(.*?)(?=(ריבית|חודשים|בצע|חשב|תקופ|סכום|$))/);
const dmeyMatch = text.match(/(?:ניהול\s*(של)?\s*)(.*?)(?=(ריבית|בצע|חשב|תקופ|סכום|$))/);
const zvirakayammatch =
text.match(/דמי\s+ניהול\s+(?:מ)?צבירה\s+קיים\s+(.*?)(?=(סכום|חודשי|ריבית|תקופ|דמי|בצע|חשב|תשלום|$))/);
const zvirahadashmatch = text.match(/דמי\s+ניהול\s+(?:מ)?צבירה\s+חדש\s+(.*?)(?=(סכום|חודשי|ריבית|תקופ|דמי|בצע|חשב|תשלום|$))/);
const hafkadakayammatch = text.match(/דמי\s+ניהול\s+(?:מה)?(?:ה)?פקדה\s+קיים\s+(.*?)(?=(סכום|חודשי|ריבית|תקופ|דמי|בצע|חשב|תשלום|$))/);
const hafkadahadashmatch = text.match(/דמי\s+ניהול\s+(?:מה)?(?:ה)?פקדה\s+חדש\s+(.*?)(?=(סכום|חודשי|ריבית|תקופ|דמי|בצע|חשב|תשלום|$))/);
  const gilMatch = text.match(/(?:גיל\s*(של)?\s*)(.*?)(?=(ריבית|שנים|דמי|תקופ|סכום|$))/);
//const tesuaMatch = text.match(/(?:תשוא[אה]?|תשועה)\s*(של)?\s*(.*?)(?=(ריבית|תקופ|סכום|$))/);
  // טקסטים
const hadText = hadMatch ? hadMatch[1] : '';
const hodshiText = hodshiMatch ? hodshiMatch[1] : '';
const amountText = amountMatch ? amountMatch[1] : '';
const interestText = interestMatch ? interestMatch[2] : '';
const dmeyText = dmeyMatch ? dmeyMatch[2] : '';
const termText = termMatch ? termMatch[2] : '';
const graceText = graceMatch ? graceMatch[2] : '';
const zvirakayamText = zvirakayammatch ? zvirakayammatch[1] : '';
const zvirahadashText = zvirahadashmatch ? zvirahadashmatch[1] : '';
const hafkadakayamText = hafkadakayammatch ? hafkadakayammatch[1] : '';
const hafkadahadashText = hafkadahadashmatch ? hafkadahadashmatch[1] : '';
const gilText = gilMatch ? gilMatch[2] : '';
// המרות
const had = extractAmounta(hadText);
const hodshi = extractAmounta(hodshiText);
const amount = extractAmounta(amountText);
const interest = extractInterestRatea(interestText);
const term = extractAmounta(termText);
const grace = extractAmounta(graceText);
const dmey = extractInterestRatea(dmeyText);
const zvirakayam = extractInterestRatea(zvirakayamText);
const zvirahadash = extractInterestRatea(zvirahadashText);
const hafkadakayam = extractInterestRatea(hafkadakayamText);
const hafkadahadash = extractInterestRatea(hafkadahadashText);
  const gil = extractAmounta(gilText);
  return {
  dmey: dmey,
  zvirakayam: zvirakayam,
  zvirahadash: zvirahadash,
  had: had,
  hodshi: hodshi,
  amount: amount,
  interest: interest,
  term: term,
  grace: grace,
  hafkadakayam:
  hafkadakayam,
  hafkadahadash:
  hafkadahadash,
  gil:gil
};
}
