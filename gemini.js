const url = 'https://functions-hello-world-742661432038.me-west1.run.app';
let outputLast = '';
let outputLastJson = '';

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

function geminiAnswer(transcript, provider = "gemini") {
  const dataA = {
    text: transcript,
    provider: provider
  };

  geminiCall(dataA).then(responseText => {
    try {
      recognition.stop();

      // אם מדובר בפנייה רגילה (לא json) — פשוט הדפס
      if (transcript.includes('אחר')) {
        if (responseText !== outputLast) {
          outputLast = responseText;
          console.log(`${provider} (רגיל):`, responseText);
        }
        return;
      }

      // חילוץ JSON מתוך הטקסט
      const jsonMatch = responseText.match(/{[\s\S]*}/);
      if (!jsonMatch) {
        console.error(`לא נמצא JSON בתשובת ${provider}:`, responseText);
        return;
      }

      const output = JSON.parse(jsonMatch[0]);

      // מניעת כפילות
      const outputJson = JSON.stringify(output);
      if (outputLastJson === outputJson) return;
      outputLastJson = outputJson;

      // הדפסת נתונים תקפים
      for (const key in output) {
        if (
          output.hasOwnProperty(key) &&
          output[key] !== undefined &&
          output[key] !== null &&
          output[key] !== ''
        ) {
          console.log(`${key}: ${output[key]}`);
          // speakLater(`${key} ${output[key]}`); // אם אתה משתמש בזה
        }
      }

    } catch (err) {
      console.error(`שגיאה בעיבוד תשובת ${provider}:`, err);
    }
  });
}
