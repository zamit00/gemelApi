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
      
      if (transcript.includes('אחר') || transcript.includes('חיפוש')) {
        if (responseText !== outputLast) {
          outputLast = responseText;
          console.log(`${provider} (רגיל):`, responseText);
          const datacss=formatGeminiResponseInline(responseText)
          showGemini(datacss);
        }
        return responseText;
      }

      // חילוץ JSON מתוך הטקסט
      const jsonMatch = responseText.match(/{[\s\S]*}/);
      if (!jsonMatch) {
        //console.error(`לא נמצא JSON בתשובת ${provider}:`, responseText);  
        return responseText;
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
function showGemini(datam) {
  allImages= document.getElementById("allImages");
  allImages.style.opacity = "0.2";
  
  const existingPopup = document.getElementById("topFundsPopup");
  if (existingPopup) existingPopup.remove();

  const popup = document.createElement("div");
  popup.id = "topFundsPopup";
  popup.style.position = "fixed";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.background = "white";
  popup.style.border = "2px solid #444";
  popup.style.borderRadius = "12px";
  popup.style.boxShadow = "0 0 20px rgba(0,0,0,0.3)";
  popup.style.padding = "20px";
  popup.style.zIndex = "9999";
  popup.style.maxWidth = "90%";
  popup.style.width = "clamp(300px,90vw,750px)";
  popup.style.fontFamily = "Arial, sans-serif";
  popup.style.overflowY="auto";
  popup.style.maxHeight = "80vh";
  const title = document.createElement("h2");
  
  title.innerText = 'תשובת האתר:';
  title.style.marginBottom = "12px";
  title.style.color="rgb(0,154,248)"
  title.style.textAlign = "center";
  popup.appendChild(title);
  popup.appendChild(datam)

  const closeBtn = document.createElement("button");
  closeBtn.innerText = "סגור";
  closeBtn.style.marginTop = "16px";
  closeBtn.style.padding = "8px 16px";
  closeBtn.style.border = "none";
  closeBtn.style.borderRadius = "8px";
  closeBtn.style.background = "#444";
  closeBtn.style.color = "white";
  closeBtn.style.cursor = "pointer";
  closeBtn.style.display = "block";
  closeBtn.style.marginLeft = "auto";
  closeBtn.style.marginRight = "auto";
  closeBtn.onclick = () => {
  popup.remove();
  document.getElementById("allImages").style.opacity = "1"; 
};
  popup.appendChild(closeBtn);

  document.body.appendChild(popup);
}
function formatGeminiResponseInline(text) {
  const container = document.createElement('div');
  container.style.fontFamily = 'Arial, sans-serif';
  container.style.direction = 'rtl';
  container.style.textAlign = 'right';
  container.style.overflowY="auto"
  container.style.width = "clamp(300px,90vw,600px)"
  const lines = text.split('\n').filter(line => line.trim() !== '');

  let ul = null;

  lines.forEach(line => {
    if (line.startsWith('**') && line.endsWith(':**')) {
      // כותרת ביניים
      const h3 = document.createElement('h3');
      h3.textContent = line.replace(/\*\*/g, '').replace(':', '');
      h3.style.fontSize = '20px';
      h3.style.marginTop = '24px';
      h3.style.marginBottom = '12px';
      h3.style.borderBottom = '1px solid #ccc';
      h3.style.paddingBottom = '4px';
      h3.style.color = 'green';
      h3.style.textDecoration="underline";
      container.appendChild(h3);
      ul = null;
    } else if (line.startsWith('* **')) {
      // פריט רשימה עם הדגשה
      if (!ul) {
        ul = document.createElement('ul');
        ul.style.marginLeft = '20px';
        ul.style.marginBottom = '16px';
        container.appendChild(ul);
      }
      const li = document.createElement('li');
      li.innerHTML = line
        .replace('* **', '<strong>')
        .replace(':**', ':</strong>')
        .replace(/\*\*/g, '');
      li.style.fontSize = '15px';
      li.style.marginBottom = '8px';
      ul.appendChild(li);
    } else if (line.startsWith('* ')) {
      // פריט רשימה רגיל
      if (!ul) {
        ul = document.createElement('ul');
        ul.style.marginLeft = '20px';
        ul.style.marginBottom = '16px';
        container.appendChild(ul);
      }
      const li = document.createElement('li');
      li.textContent = line.replace('* ', '');
      li.style.fontSize = '15px';
      li.style.marginBottom = '8px';
      ul.appendChild(li);
    } else {
      // פסקה רגילה
      const p = document.createElement('p');
      p.textContent = line.replace(/\*\*/g, '');
      p.style.fontSize = '16px';
      p.style.lineHeight = '1.6';
      p.style.marginBottom = '12px';
      p.style.color = '#333';
      container.appendChild(p);
      ul = null;
    }
  });

  return container;
}
