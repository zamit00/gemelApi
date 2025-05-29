let speechEnabled = false;
let speakLaterLast='';
const geminiInstruction = `
אם המשתמש מבקש לבצע חישוב, השוואה, או להפעיל מחולל מסוים – יש להחזיר תשובה בפורמט JSON תקני בלבד, הכוללת:

1. המאפיין "tahalich" – המתאר בקצרה (עד 4 מילים) את סוג התהליך.
סוג התהליכים שיש באתר:  סימולטור הלוואות, חישוב ערך עתידי, חישוב הפקדה לסכום יעד, השוואת דמי ניהול, מחשבון סיכון, השוואת חברות מנהלות, מחולל חשיפות, השוואת תיק משולב, מחולל יחס תשואה סיכון שארפ.
2. הנתונים הדרושים לביצוע – רק אם נאמרו במפורש. אין להשלים, לשער או להמציא ערכים.

❗ החזר אך ורק מאפיינים שיש להם ערך ברור. אין להחזיר מאפיינים ריקים, חסרים או מומצאים – אלא אם הבקשה מתחילה במילה "אחר".

### מיפוי מאפיינים:
- סכום חד פעמי: "had"
- סכום חודשי: "hodshi"
- סכום כללי: "amount"
- ריבית: "interest"
- תקופה בחודשים: "termH"
- תקופה בשנים: "termS"
- דמי ניהול כלליים: "dmey"
- סוג מסלול או מוצר: "sug"
- מניות: "menayut"
- מט"ח: "matach"
- חו"ל: "hul"
- דמי ניהול צבירה – קיים: "zvirakayam"
- דמי ניהול צבירה – חדש: "zvirahadash"
- דמי ניהול הפקדה – קיים: "hafkadakayam"
- דמי ניהול הפקדה – חדש: "hafkadahadash"
- גיל: "gil"
- גרייס: "grace"
- הצגת מסלול: "searchMaslul"
- בקשה למידע מקצועי כללי (לא פעולה): "mikzoei"

### הערות:
- כאשר מחזירים מספר שהוא באחוזים יש להחזיר את המספר  ללא אחוזים.
- אם מופיע ביטוי כמו "עד 70%" או "מעל 70%", יש לכלול במדויק את המילים "עד" או "מעל" כחלק מהערך.
- כל פנייה נבחנת בפני עצמה. יש להתעלם לחלוטין ממידע קודם.

### חריג – אם הבקשה מתחילה במילה "אחר":
- **אין להחזיר JSON**.
- החזר תשובה קצרה, ממוקדת, בגובה העיניים – עד 3 משפטים.
- ענה ישירות על הבקשה באופן מילולי.

בעת החזרת JSON – יש להחזיר אותו באופן נקי וללא טקסט נוסף לפניו או אחריו.
`;
function speakClick (){
  // הפעלה ראשונית — מספיקה כדי לקבל הרשאה
  speechEnabled = true;
  const dummy = new SpeechSynthesisUtterance("");
  dummy.lang = "he-IL";
  speechSynthesis.speak(dummy);
};
function speakLater(text) {
 if(text===speakLaterLast){return}
 speakLaterLast=text;
  if (!speechEnabled) return; // נוודא שהייתה אינטראקציה
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "he-IL";
  speechSynthesis.speak(utter);
}





let startStop = 0; let ifrmValue=0;
 let finalTranscript = '';  var transcript='';var matchKlaliLast;
;let lastTranscript = '';
 
const recognition = typeof webkitSpeechRecognition !== "undefined"
  ? new webkitSpeechRecognition()
  : new SpeechRecognition();
recognition.lang = "he-IL";
recognition.interimResults = true;
recognition.maxAlternatives = 1;
    
  
  if(transcript.includes('נקה')){
    iframeWindow.chngTik(); handleSearchFromVoice("הפעל");
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
