'use strict';

// ─── Pathway Type Detection ────────────────────────────────────────────────────

/**
 * מזהה את קטגוריית המסלול לפי שם חופשי.
 * מחזיר מחרוזת מפתח התואמת ל-maslulFilters.
 */
function getMaslulType(shemkupa) {
    if (!shemkupa) return 'כללי';

    const n = String(shemkupa).trim();

    if (n.includes('כללי') && !n.includes('כללי ב'))               return 'כללי';
    if (n.includes('500'))                                            return 'עוקב מדד s&p 500';
    if (n.includes('מניות') && !n.includes('מדד') && !n.includes('עוקב') &&
        !n.includes('סחיר') && !n.includes('משולב') && !n.includes('25') &&
        !n.includes('אג"ח') && !n.includes('פאסיבי'))               return 'מניות';
    if (n.includes('אשראי') && !n.includes('מניות') &&
        !n.includes('עוקב') && !n.includes('סחיר'))                  return 'אשראי ואג"ח';
    if (n.includes('אשראי') && n.includes('25'))                     return 'אשראי ואג"ח עם מניות';
    if (n.includes('כספי (שקלי)'))                                   return 'כספי (שקלי)';
    if (n.includes('עוקב') && n.includes('גמיש'))                    return 'עוקב מדדים - גמיש';
    if (n.includes('ממשלות'))                                         return 'אג"ח ממשלות';
    if (n.includes('הלכה'))                                           return 'הלכה יהודית';
    if (n.includes('משולב סחיר'))                                     return 'משולב סחיר';
    if (n.includes('עוקב') && n.includes('אג"ח') && !n.includes('מניות')) return 'עוקב מדדי אג"ח';
    if (n.includes('מניות') && !n.includes('אג"ח') && n.includes('עוקב') &&
        !n.includes('25'))                                            return 'עוקב מדדי מניות';
    if (n.includes('מניות') && n.includes('סחיר') && !n.includes('25')) return 'מניות סחיר';
    if (n.includes('סחיר') && n.includes('אג"ח') && !n.includes('מניות') &&
        !n.includes('ממשלתי'))                                        return 'אג"ח סחיר';
    if (n.includes('סחיר') && n.includes('אג"ח') && n.includes('ממשלתי')) return 'אג"ח ממשלתי סחיר';
    if (n.includes('סחיר') && n.includes('אג"ח') && n.includes('מניות')) return 'אג"ח סחיר עם מניות';
    if (!n.includes('סחיר') && n.includes('אג"ח') && n.includes('מניות') &&
        n.includes('עוקב'))                                           return 'עוקב מדדי אג"ח עם מניות';
    if ((n.includes('50') && n.includes('60')) || n.includes('לבני 50') ||
        n.includes('בני 50') || n.includes('50-60'))                 return '50-60';
    if ((n.includes('50') && !n.includes('עוקב') && !n.includes('60')) ||
        n.includes('עד גיל 50') || n.includes('עד 50'))             return 'עד 50';
    if ((!n.includes('50') && n.includes('60')) || n.includes('מגיל 60') ||
        n.includes('בני 60 ומעלה'))                                  return '60 ומעלה';
    if (n.includes('מוגבר'))  return 'סיכון מוגבר';
    if (n.includes('מועט'))   return 'סיכון מועט';
    if (n.includes('בינוני')) return 'סיכון בינוני';

    return 'כללי';
}

// ─── Filter Helpers ────────────────────────────────────────────────────────────

function filterIncludes(text, includes = [], excludes = []) {
    return includes.every(i => text.includes(i)) && excludes.every(e => !text.includes(e));
}

function applyFilters(item, { includes = [], excludes = [] }) {
    return filterIncludes(item.shemkupa, includes, excludes);
}

// ─── Pathway Filter Map ────────────────────────────────────────────────────────

const maslulFilters = {
    'כללי':                        { includes: ['כללי'] },
    'עוקב מדד s&p 500':            { includes: ['500'] },
    'מניות':                       { includes: ['מניות'], excludes: ['מדד', 'עוקב', 'סחיר', 'משולב', '25', 'אג"ח', 'פאסיבי'] },
    'אשראי ואג"ח':                 { includes: ['אג"ח', 'אשראי'], excludes: ['מניות', 'סחיר', 'עוקב', 'פאסיבי'] },
    'אשראי ואג"ח עם מניות':        { includes: ['אשראי', '25'] },
    'כספי (שקלי)':                 { includes: ['כספי', 'שקלי'] },
    'עוקב מדדים - גמיש':           { includes: ['עוקב', 'גמיש'] },
    'אג"ח ממשלות':                 { includes: ['ממשלות'] },
    'הלכה יהודית':                 { includes: ['הלכה'] },
    'משולב סחיר':                  { includes: ['משולב', 'סחיר'] },
    'עוקב מדדי אג"ח':              { includes: ['עוקב', 'אג"ח'], excludes: ['מניות'] },
    'עוקב מדדי מניות':             { includes: ['עוקב', 'מניות'], excludes: ['אג"ח', '25'] },
    'מניות סחיר':                  { includes: ['מניות', 'סחיר'], excludes: ['25'] },
    'אג"ח סחיר עם מניות':          { includes: ['אג"ח', 'סחיר', 'מניות'] },
    'עוקב מדדי אג"ח עם מניות':     { includes: ['עוקב', 'אג"ח', 'מניות', 'סחיר'] },
    '50-60':                       { includes: ['50', '60'] },
    'עד 50':                       { includes: ['50'], excludes: ['60', 'עוקב'] },
    '60 ומעלה':                    { includes: ['60'], excludes: ['50'] },
    'סיכון מוגבר':                  { includes: ['מוגבר'] },
    'סיכון בינוני':                 { includes: ['בינוני'] },
    'סיכון מועט':                   { includes: ['נמוך'] },
};

// ─── Main Filter Function ──────────────────────────────────────────────────────

/**
 * מסנן רשומות לפי מסלול, מוצר וחברה.
 * @param {string} mas    - שם המסלול
 * @param {string} moza   - סוג המוצר
 * @param {*}      hevra  - חברה (0 = הכל)
 */
function filterMaslul(mas, moza, hevra) {
    let dataset =
        moza === 'פוליסות חסכון' || moza === 'פוליסת ביטוח חיים משולב חיסכון'
            ? datanetunimKlaliXB
            : moza === 'קרנות חדשות' || moza === 'קרנות כלליות'
            ? datanetunimKlaliXP
            : datanetunimKlaliXM;

    // הסרת קופות ייעודיות לסקטור מהמדגם הכללי
    if (dataset === datanetunimKlaliXM) {
        dataset = dataset.filter(item =>
            !item.ochlosiyayaad.includes('עובדי סקטור') &&
            !item.ochlosiyayaad.includes('עובדי מפעל')
        );
    }

    let filtered = dataset.filter(item => item.mozar === moza);

    const masFilter = maslulFilters[mas];
    if (masFilter) {
        filtered = filtered.filter(item => applyFilters(item, masFilter));
    } else if (mas !== 'כללי') {
        filtered = filtered.filter(item => item.shemkupa.includes(mas));
    }

    filtered.sort((a, b) => b.tesuam - a.tesuam);
    return filtered;
}
