'use strict';

// ─── Global State ─────────────────────────────────────────────────────────────
let datanetunimKlaliXM, datanetunimKlaliXB, datanetunimKlaliXP;
let clickStatus;
let tkofa = '';
let sikonData = [];
const dataIndicators = [];
const dataIndicatorsSikon = [];

// ─── Constants ────────────────────────────────────────────────────────────────
const gufmosdixA = [
    'הראל פנסיה וגמל', 'כלל פנסיה וגמל',
    'מגדל מקפת קרנות פנסיה וקופות גמל', 'מנורה מבטחים פנסיה וגמל',
    'הפניקס פנסיה וגמל', 'אלטשולר שחם גמל ופנסיה',
    'אנליסט קופות גמל', 'ילין לפידות ניהול קופות גמל', 'מור גמל ופנסיה',
    'מיטב גמל ופנסיה', 'אינפיניטי השתלמות, גמל ופנסיה '
];
const gufmosdiA = [...gufmosdixA].sort((a, b) => a.localeCompare(b, 'he'));

const mozAll = [
    'קרנות השתלמות', 'תגמולים ואישית לפיצויים', 'קופת גמל להשקעה',
    'קופת גמל להשקעה - חסכון לילד', 'פוליסות חסכון',
    'קרנות חדשות', 'קרנות כלליות', 'מרכזית לפיצויים'
];

const fieldsToAverage = [
    'tesuam', 'tesuam36', 'tesuam60',
    'stiya36', 'stiya60', 'yitratNechasim',
    'sharp', 'tusaAharona', 'tesuaMitchilatshana',
    'kvutzaAhuz4751', 'kvutzaAhuz4761', 'dmeyNihul', 'dmeyNihulHafkad'
];

// ─── Product Descriptions ──────────────────────────────────────────────────────
const pHishSmall = `קרן השתלמות היא מכשיר חיסכון לטווח בינוני המאפשר חיסכון הן לשכירים והן לעצמאים. הקרן היא לספק מענה לצרכי השתלמות מקצועית, אך בפועל היא משמשת ככלי חיסכון פופולרי בישראל בזכות הטבות המס הנלוות לה. בקרן ההשתלמות מגוון מסלולי השקעה השונים זה מזה ברמת הסיכון. ככלל, הכספים בקרן ניתנים למשיכה לאחר 6 שנים ממועד הפקדה ראשונה.`;

const pHishBig = `קרן השתלמות היא מכשיר חיסכון לטווח בינוני המאפשר חיסכון הן לשכירים והן לעצמאים. מטרת הקרן היא לספק מענה לצרכי השתלמות מקצועית, אך בפועל היא משמשת ככלי חיסכון פופולרי בישראל בזכות הטבות המס הנלוות לה. בקרן ההשתלמות מגוון מסלולי השקעה השונים זה מזה ברמת הסיכון. ככלל, הכספים בקרן ניתנים למשיכה לאחר 6 שנים ממועד הפקדה ראשונה.
שיעורי הפקדה מקובל לעמית שכיר הינם 7.5% מהשכר על חשבון המעסיק ו-2.5% מהשכר על חשבון העובד. מעסיקים נוהגים להגביל את ההפקדה עד לתקרת השכר שבגינו העובד אינו מחויב במס על חלק המעסיק.`;

const pYeled = `קופת גמל להשקעה חסכון לכל ילד היא מכשיר פנסיוני ופיננסי שמנוהל על ידי המוסד לביטוח לאומי בשיתוף עם רשות שוק ההון. המוצר פותח במטרה להבטיח עתיד כלכלי יציב עבור ילדיכם. התוכנית נפתחת על שם הילד, כאשר ההפקדות מבוצעות מידי חודש על חשבון הביטוח הלאומי, כ-57 ₪ לחודש. ההורה מקבל הקצבה יכול לבקש להפקיד 57 ₪ נוספים על חשבון קצבת הילדים. דמי הניהול משולמים על ידי ביטוח לאומי עד גיל 21.`;

const pPolisaSmall = `פוליסת חיסכון היא חסכון כספי נזיל בכל עת אשר מנוהל על ידי חברת ביטוח. כספי הפוליסה מושקעים בהתאם לבחירת המבוטח כאשר הפוליסה מציעה מגוון מסלולי השקעה, מהמסלולים בעלי הסיכון הגבוהה ביותר ועד למסלולים חסרי סיכון. פוליסת החסכון מהווה אלטרנטיבה למשקיע ביחס להשקעה בפיקדונות בבנקים, בתוכניות חסכון ובקרנות נאמנות.`;

const pPolisaBig = `פוליסת חיסכון היא חסכון כספי נזיל בכל עת אשר מנוהל על ידי חברת ביטוח. כספי הפוליסה מושקעים בהתאם לבחירת המבוטח כאשר הפוליסה מציעה מגוון מסלולי השקעה, מהמסלולים בעלי הסיכון הגבוהה ביותר ועד למסלולים חסרי סיכון. פוליסת החסכון מהווה אלטרנטיבה למשקיע ביחס להשקעה בפיקדונות בבנקים, בתוכניות חסכון ובקרנות נאמנות.
המוצר פתוח להצטרפות לכל אחד בין אם הוא שכיר, עצמאי או שאינו עובד בכלל, בין אם הוא ילד או מבוגר. המוצר מהווה אלטרנטיבה לפתיחת חסכון עבור ילדים.`;

const pHashBig = `קופת גמל להשקעה היא מוצר חסכון מתחרה לפוליסות החסכון בחברות הביטוח ולפיקדונות והחסכונות הבנקאיים. מדובר במוצר פיננסי ופנסיוני בשל הטבת מס הגלומה בו. ניתן לחסוך ולהשקיע בצורה גמישה, והוא מהווה פתרון לחיסכון עבור הטווח הקצר והן עבור הטווח הארוך. הכספים בקופה ניתנים למשיכה בכל עת כסכום חד פעמי או בתשלומים והכל בהתאם לצרכי העמית. הפקדות בקופה אינן מקנות הטבת מס מסוג ניכוי או זיכוי. קיימת תקרת הפקדה שנתית אשר בשנת 2025 עומדת על סך של 81,711 ₪. תקרה זו מתעדכנת אחת לשנה בדרך כלל בהתאם לעליית המדד.`;

const pHashSmall = `קופת גמל להשקעה היא מוצר חסכון מתחרה לפוליסות החסכון ולפיקדונות הבנקאיים. מדובר במוצר פיננסי ופנסיוני בשל הטבת מס הגלומה בו. המוצר מהווה פתרון לחיסכון לטווח הקצר ולטווח ארוך. הכספים ניתנים למשיכה בכל עת. קיימת תקרת הפקדה שנתית אשר בשנת 2025 עומדת על סך של 81,711 ₪. התקרה מתעדכנת אחת לשנה בצמוד לעליית המדד.`;

const pPensiaBig = `קרן פנסיה היא תוכנית לביטוח פנסיוני המבטיחה לחוסך תשלום חודשי לכל ימי חייו עם פרישתו מעבודה בהגיעו לגיל פרישה וכן מספקת מענה למקרים ביטוחיים במצב של נכות ובמקרה של מוות. תשלומים לקרן מבוצעים בתדירות חודשית כאשר תשלומים של שכיר מבוצעים באמצעות מעסיקו ותשלומי עצמאי מבוצעים על ידי המבוטח עצמו. חוק פנסיית חובה מחייב כל מעסיק להפריש לכל עובד מעל גיל 21 לגברים ומעל גיל 20 לנשים כספים, כאשר קיימת חובת מינימום הפקדה כשיעורים משכר העובד לרכיבי התגמולים והפיצויים.`;

const pPensiaSmall = `קרן פנסיה היא תוכנית המבטיחה לחוסך תשלום חודשי לכל ימי חייו עם פרישתו מעבודה וכן מספקת מענה למקרים ביטוחיים של נכות ומוות. תשלומים לקרן מבוצעים בתדירות חודשית. תשלומי שכיר מבוצעים באמצעות מעסיקו ותשלומי עצמאי מבוצעים על ידי המבוטח עצמו. חוק פנסיית חובה מחייב כל מעסיק להפריש לכל עובד מעל גיל 21 לגברים ומעל גיל 20 לנשים כספים. קיימת חובת מינימום הפקדה כשיעורים משכר העובד.`;

const pGemelBig = `קופת גמל היא שם כולל לקבוצת אפיקי חסכון פנסיוניים לטווח בינוני או ארוך. קופה גמל לחסכון הינה סוג של קופת גמל לקצבה אשר מיועדת לצבירת כספים לגיל הפרישה, אשר ישולמו לעמית בדרך של קצבה או בדרך של היוון קצבה כאשר יגיע לגיל הפרישה. קופת גמל מקנה הטבות במס בשלב ההפקדה ובשלב המשיכה. קופת גמל לחסכון מיועדת לצבירת כספים לגיל הפרישה אשר ישולמו לעמית בדרך של קצבה או בדרך של היוון קצבה. קופת הגמל במקור הינה תכנית לחסכון בלבד ללא מרכיב ביטוחי. כספי קופת הגמל מושקעים בהשקעות במסלולים שונים הניתנים לבחירה ע"י העמית.`;

const pGemelSmall = `קופה גמל לחסכון הינה סוג של קופת גמל לקצבה אשר מיועדת לצבירת כספים לגיל הפרישה, אשר ישולמו לעמית בדרך של קצבה או בדרך של היוון קצבה כאשר יגיע לגיל הפרישה. קופת גמל מקנה הטבות במס בשלב ההפקדה ובשלב המשיכה. קופת גמל לחסכון מיועדת לצבירת כספים לגיל הפרישה אשר ישולמו לעמית בדרך של קצבה או בדרך של היוון קצבה. כספי קופת הגמל מושקעים בהשקעות במסלולים שונים הניתנים לבחירה ע"י העמית.`;

// ─── Data Loading ──────────────────────────────────────────────────────────────
async function fetchJsonData(filename) {
    const response = await fetch(filename);
    if (!response.ok) throw new Error(`שגיאה בטעינת ${filename}: ${response.status}`);
    return response.json();
}

async function loadalldata() {
    try {
        const [dataM, dataB, dataP] = await Promise.all([
            fetchJsonData('dataJasonM.json'),
            fetchJsonData('dataJasonB.json'),
            fetchJsonData('dataJasonP.json'),
        ]);

        datanetunimKlaliXM = dataM.filter(item => !item.menahelet.includes('סלייס'));
        datanetunimKlaliXB = dataB;
        datanetunimKlaliXP = dataP;

        const tkofa579      = datanetunimKlaliXM.find(item => item.mh === '579');
        const tkofaItem     = tkofa579?.tesua12;
        const partAfterEq   = typeof tkofaItem === 'string' ? tkofaItem.split('=')[1] : null;
        tkofa = (partAfterEq?.length >= 4)
            ? `${partAfterEq.slice(4, 6)}/${partAfterEq.slice(0, 4)}`
            : '';

        await indications();
        await fetchInvestmentData();
    } catch (error) {
        console.error('שגיאה בטעינת הנתונים:', error);
    }
}

window.addEventListener('load', loadalldata);

// ─── Investment Pathway Data ───────────────────────────────────────────────────
async function fetchInvestmentData() {
    const response = await fetch('ofihashkaa.xml');
    const xml = new DOMParser().parseFromString(await response.text(), 'application/xml');

    for (const row of xml.getElementsByTagName('Row')) {
        const name = row.getElementsByTagName('ID')[0]?.textContent.trim();
        let risk    = row.getElementsByTagName('SIKON')[0]?.textContent.trim();

        if (!risk && row.nextElementSibling?.tagName === 'SIKON') {
            risk = row.nextElementSibling.textContent.trim();
        }

        if (name && risk) sikonData.push({ name, risk });
    }

    return sikonData;
}

// ─── Market Indicators ─────────────────────────────────────────────────────────

/** חישוב ממוצע תקף (מסנן null/0/'') */
function computeValidAverage(items, field) {
    const valid = items.filter(obj =>
        obj[field] != null && obj[field] !== '' &&
        !isNaN(obj[field]) && parseFloat(obj[field]) !== 0
    );
    if (!valid.length) return '0.00';
    const total = valid.reduce((sum, obj) => sum + parseFloat(obj[field]), 0);
    return (total / valid.length).toFixed(2);
}

/** מחשב min/avg/max עבור שדה נתון ממערך פריטים */
function fieldStats(items, field) {
    const valid = items.map(i => Number(i[field])).filter(v => v && !isNaN(v));
    if (!valid.length) return { avg: 0, min: 0, max: 0 };
    const avg = valid.reduce((s, v) => s + v, 0) / valid.length;
    return { avg, min: Math.min(...valid), max: Math.max(...valid) };
}

// מיפוי: מוצר → רשימת מסלולים (תלוי במשתנים מ-kochavimscript.js ו-PensiaScript.js)
const mozarToMaslulim = () => [
    { mozar: mozAll[0], typamas: hishtalmot },   // קרנות השתלמות
    { mozar: mozAll[1], typamas: gemel },         // תגמולים ואישית לפיצויים
    { mozar: mozAll[2], typamas: hishtalmot },    // קופת גמל להשקעה
    { mozar: mozAll[3], typamas: layeled },       // חסכון לילד
    { mozar: mozAll[4], typamas: hishtalmot },    // פוליסות חסכון
    { mozar: mozAll[5], typamas: pensia },        // קרנות חדשות
    { mozar: mozAll[6], typamas: pensia },        // קרנות כלליות
];

async function indications() {
    for (const { mozar, typamas } of mozarToMaslulim()) {
        for (const maslul of typamas) {
            const dataY = await filterMaslul(maslul, mozar, 0);
            if (!dataY.length) continue;

            if (dataIndicators.some(i => i.mozar === mozar && i.maslul === maslul)) continue;

            const result = { mozar, maslul };

            for (const field of fieldsToAverage) {
                result[field] = computeValidAverage(dataY, field);
            }

            if (result.dmeyNihulHafkad && result.dmeyNihul) {
                result.dmeyNihulMeshuklal =
                    (Number(result.dmeyNihulHafkad) / 10 + Number(result.dmeyNihul)).toFixed(2);
            }
            if (result.tesuam36 && result.stiya36) {
                result.tesuaLestiya36 = (result.tesuam36 / result.stiya36).toFixed(2);
            }
            if (result.tesuam60 && result.stiya60) {
                result.tesuaLestiya60 = (result.tesuam60 / result.stiya60).toFixed(2);
            }

            dataIndicators.push(result);
        }

        // ממוצע סטיות ברמת מוצר
        if (dataIndicatorsSikon.some(i => i.mozar === mozar)) continue;

        const productPathways = dataIndicators.filter(i => i.mozar === mozar);
        const s36 = fieldStats(productPathways, 'stiya36');
        const s60 = fieldStats(productPathways, 'stiya60');

        const avgCombined  = s36.avg * 0.6 + s60.avg * 0.4;
        const lowCombined  = s36.min * 0.6 + s60.min * 0.4;
        const highCombined = s36.max * 0.6 + s60.max * 0.4;

        dataIndicatorsSikon.push({
            mozar,
            stiyaCombinedMin: (lowCombined  + (avgCombined - lowCombined)  * 0.66).toFixed(2),
            stiyaCombinedMax: (highCombined - (highCombined - avgCombined) * 0.66).toFixed(2),
            lowCombined:  lowCombined.toFixed(2),
            highCombined: highCombined.toFixed(2),
            avgCombined:  avgCombined.toFixed(2),
        });
    }
}
