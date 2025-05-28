const url = 'https://functions-hello-world-742661432038.me-west1.run.app';
let outputLast='';
async function geminiCall(data) {
  try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const json = await res.json();
        return json.output;
    } catch (err) {
        console.error("שגיאה בקריאה לפונקציה:", err);
    }
}
function geminiAnswer(transcript){
  
  const dataA = { text:transcript};

let outputLastJson = '';

const geminiBack = geminiCall(dataA).then(responseText => {
  try {
    // שלב 1: חילוץ JSON מתוך טקסט התשובה
    const jsonMatch = responseText.match(/{[\s\S]*}/); // מחפש את ה־JSON בגוף הטקסט
    if (!jsonMatch) {
      console.error("לא נמצא JSON בתשובת Gemini:", responseText);
      return;
    }

    const output = JSON.parse(jsonMatch[0]);

    // שלב 2: מניעת כפילויות
    const outputJson = JSON.stringify(output);
    if (outputLastJson === outputJson) return;
    outputLastJson = outputJson;

    // שלב 3: הדפסת נתונים
  for (const key in output) {
  if (
    output.hasOwnProperty(key) &&
    output[key] !== undefined &&
    output[key] !== null &&
    output[key] !== ''
  ) {
   // speakLater(`${key} ${output[key]}`);
    console.log(`${key}: ${output[key]}`);
  }
  recognition.stop;
}
  
   /* if (output.had !== undefined) console.log("סכום חד פעמי (had):", output.had);
    if (output.termS !== undefined) console.log("תקופה בשנים (termS):", output.termS);
    if (output.interest !== undefined) console.log("ריבית (interest):", output.interest);
    if (output.tahalich !== undefined) console.log("תהליך (tahalich):", output.tahalich);*/

  } catch (err) {
    console.error("שגיאה בעיבוד תשובת Gemini:", err);
  }
});

}
