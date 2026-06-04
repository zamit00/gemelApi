'use strict';

/**
 * מסנן רשומות לפי מסלול, מוצר וחברה מנהלת.
 * שימוש ב-maslulFilters ו-applyFilters מ-data.js — ללא שכפול לוגיקת סינון.
 *
 * @param {string}   mas   - שם המסלול (לפי מפתחות maslulFilters)
 * @param {string}   moza  - סוג המוצר
 * @param {string[]} mena  - רשימת שמות חברות מנהלות לסינון
 * @returns {Array}        - רשומות מסוננות וממוינות לפי תשואה יורדת
 */
function filterMenahelet(mas, moza, mena) {
    // בחירת מאגר הנתונים הנכון — אותה לוגיקה כמו filterMaslul
    const dataset =
        moza === 'פוליסות חסכון' || moza === 'פוליסת ביטוח חיים משולב חיסכון'
            ? datanetunimKlaliXB
            : moza === 'קרנות חדשות' || moza === 'קרנות כלליות'
            ? datanetunimKlaliXP
            : datanetunimKlaliXM;

    // סינון לפי מוצר, קיום תשואה וחברה מנהלת
    let filtered = dataset.filter(item =>
        item.mozar === moza &&
        item.tesuam !== undefined &&
        mena.some(b => item.menahelet.includes(b))
    );

    // סינון מסלול — שימוש במפת הסינון הקיימת מ-data.js
    const masFilter = maslulFilters[mas];
    if (masFilter) {
        filtered = filtered.filter(item => applyFilters(item, masFilter));
    } else if (mas && mas !== 'כללי') {
        filtered = filtered.filter(item => item.shemkupa.includes(mas));
    }

    filtered.sort((a, b) => b.tesuam - a.tesuam);
    return filtered;
}
