const url = 'https://functions-hello-world-742661432038.me-west1.run.app';

async function geminiCall(data) {
  try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const json = await res.json();
        console.log("פלט:", json.output);
        return json.output;
    } catch (err) {
        console.error("שגיאה בקריאה לפונקציה:", err);
    }
}

const dataA = { text: "כתוב  לי מהו שער הדולר לעומת השקל וכן מהו שער מניית tesla" };

geminiCall(dataA).then(output => {
  console.log("תוצאה שהתקבלה מהפונקציה:", output);
});
