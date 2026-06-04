'use strict';

// ─── Constants ────────────────────────────────────────────────────────────────
const excludedOchlosiya = ['עובדי סקטור מסויים', 'עובדי מפעל/גוף מסויים'];

const mozkoch = [
    'קרנות השתלמות', 'תגמולים ואישית לפיצויים', 'קופת גמל להשקעה',
    'קופת גמל להשקעה - חסכון לילד', 'פוליסות חסכון'
];

const hishtalmot = [
    'כללי', 'עוקב מדד s&p 500', 'מניות', 'אשראי ואג"ח', 'אשראי ואג"ח עם מניות',
    'כספי (שקלי)', 'עוקב מדדים - גמיש', 'אג"ח ממשלות', 'הלכה יהודית', 'משולב סחיר',
    'עוקב מדדי אג"ח', 'עוקב מדדי מניות', 'אג"ח סחיר', 'מניות סחיר',
    'עוקב מדדי אג"ח עם מניות', 'אג"ח סחיר עם מניות', 'אג"ח ממשלתי סחיר'
];

const gemel = [
    'מניות', 'עוקב מדד s&p 500', 'עד 50', '50-60', '60 ומעלה',
    'אשראי ואג"ח', 'כספי (שקלי)', 'משולב סחיר', 'עוקב מדדים - גמיש',
    'אג"ח ממשלות', 'הלכה יהודית', 'מניות סחיר', 'עוקב מדדי אג"ח',
    'עוקב מדדי מניות', 'אג"ח סחיר', 'עוקב מדדי אג"ח עם מניות',
    'אג"ח סחיר עם מניות', 'אג"ח ממשלתי סחיר'
];

const layeled = ['סיכון מועט', 'סיכון בינוני', 'סיכון מוגבר', 'הלכה יהודית'];

const bituach = [
    'הראל פנסיה וגמל', 'כלל פנסיה וגמל',
    'מגדל מקפת קרנות פנסיה וקופות גמל', 'מנורה מבטחים פנסיה וגמל',
    'הפניקס פנסיה וגמל', 'מניות סחיר', 'עוקב מדדי אג"ח עם מניות', 'אג"ח סחיר עם מניות'
];

const bateyhashkaot = [
    'אינפיניטי השתלמות, גמל ופנסיה', 'אלטשולר שחם גמל ופנסיה',
    'אנליסט קופות גמל', 'ילין לפידות ניהול קופות גמל', 'מור גמל ופנסיה',
    'מיטב גמל ופנסיה', 'סלייס גמל'
];

// ─── Main Table Builder ────────────────────────────────────────────────────────

async function maslulim(t, moz, hevra) {
    if (t === 2) {
        document.getElementById('tkufatdivuach')?.scrollIntoView({ behavior: 'smooth' });
        t = 1;
    }

    document.getElementById('closeinfo')?.style.setProperty('display', 'none');
    document.getElementById('menu')?.classList.remove('open');
    document.querySelector('.menu-btn')?.classList.remove('open');

    if (t === 1) document.getElementById('filter')?.style.setProperty('display', 'none');

    const allTheTables = document.getElementById('allTheTables');
    if (!allTheTables) { console.error('allTheTables element not found'); return; }

    allTheTables.innerHTML = '';
    allTheTables.style.display = 'flex';
    document.getElementById('kothasifot')?.style.setProperty('display', 'none');

    let z = 0;

    for (let r = 0; r < mozkoch.length; r++) {
        const sugmuzar = mozkoch[r];
        if (moz !== 0 && sugmuzar !== moz) continue;

        const mozA = {
            'תגמולים ואישית לפיצויים':         'קופות גמל',
            'קופת גמל להשקעה - חסכון לילד':    'קופת חסכון לילד'
        }[sugmuzar] ?? sugmuzar;

        const mesanen  = document.getElementById('sanenMosdy');
        const hadashim = document.getElementById('hadashim');
        const typamas  = (r === 1) ? gemel : (r === 3) ? layeled : hishtalmot;

        allTheTables.innerHTML += `
            <h2 id="h2Hish" name="h2Hish" style="font-size:1rem;line-height:1.8rem;
            vertical-align:middle;margin-top:15px;text-align:right;padding-right:5px;">
                ${mozA}
                <a onclick="maslulim(30,'${sugmuzar}',0);" class="txta" id="spanHish" name="spanHish">כל המסלולים</a>
            </h2>`;

        if (mesanen) mesanen.style.display = 'none';

        if (t === 30) {
            if (sugmuzar !== 'פוליסות חסכון' && mesanen) mesanen.style.display = 'flex';
            document.querySelectorAll('[name="spanHish"]').forEach(a => {
                a.setAttribute('onclick',
                    'maslulim(1,0,0);' +
                    'if(typeof backtop==="function")backtop();' +
                    'if(typeof showMabaatar==="function")showMabaatar();' +
                    'if(typeof hideMabaatarSpecific==="function")hideMabaatarSpecific();'
                );
            });
        }

        // כל מוצר חדש מתחיל בשורת גריד חדשה (כפולה של 3)
        if (z !== 0 && z % 3 !== 0) z++;

        for (let i = 0; i < typamas.length; i++) {
            if (i > t && i > 2) continue;

            let dataY = await filterMaslul(typamas[i], sugmuzar, hevra);

            if (hadashim?.checked) {
                dataY.sort((a, b) =>
                    (b.tusaAharona ?? -Infinity) - (a.tusaAharona ?? -Infinity)
                );
            } else {
                dataY.sort((a, b) => b.tesuam - a.tesuam);
            }

            if (!dataY.length) continue;

            addtble(z, typamas[i]);

            const table = document.getElementById(`klalikoch${z}`);
            if (!table) continue;

            table.innerHTML = buildTableHeader();

            for (const item of dataY) {
                table.appendChild(buildTableRow(item, false));
            }
            z++;
        }
    }

    attachClickHandlers('bringinfo');
    hideEmptyTables('klalikoch');
    styleNegativeValues();

    if (t === 30) {
        document.getElementById('mabaatarSpecific')?.scrollIntoView({ behavior: 'smooth' });
    }
}

// ─── Pension Table Builder (delegates to PensiaScript) ───────────────────────
// maslulimP is defined in PensiaScript.js

// ─── Table Helpers ────────────────────────────────────────────────────────────

function buildTableHeader() {
    return `<tr style="font-weight:bold;background-color:var(--main-color);color:white;border:none;">
        <td style="text-align:center;">מה</td>
        <td>שם המסלול</td>
        <td style="text-align:center;">חודש</td>
        <td style="text-align:center;" onclick="sortTable(this)">שנה<i class="fa fa-sort"></i></td>
        <td style="text-align:center;" onclick="sortTable(this)">3 שנים<i class="fa fa-sort"></i></td>
        <td style="text-align:center;" onclick="sortTable(this)">5 שנים<i class="fa fa-sort"></i></td>
    </tr>`;
}

function buildTableRow(item, isPension = false) {
    const tr = document.createElement('tr');

    const tdMh = createTd(item.mh, 'tdmh', { textAlign: 'center', color: '#333', boxSizing: 'border-box' });
    tr.appendChild(tdMh);

    const tdName = document.createElement('td');
    tdName.className = 'tdbig';
    Object.assign(tdName.style, { color: '#333', textAlign: 'right', paddingRight: '5px', boxSizing: 'border-box' });
    const link = document.createElement('a');
    link.href = '#';
    link.className = 'linktdbig';
    link.textContent = item.shemkupa;
    tdName.appendChild(link);
    tr.appendChild(tdName);

    // חודש
    const tdMonth = createTd('', 'tdsmall', { textAlign: 'center', boxSizing: 'border-box' });
    if (isPension) {
        tdMonth.textContent = item.tusaAharona != null ? `${item.tusaAharona.toFixed(2)}%` : '';
    } else {
        const tusaVal = item.tesua12;
        if (tusaVal?.includes('=') && tusaVal.includes(tkofa.split('/')[1])) {
            tdMonth.textContent = `${Number(tusaVal.split('=')[0]).toFixed(2)}%`;
        }
    }
    tr.appendChild(tdMonth);

    tr.appendChild(createNumericTd(item.tesuam));
    tr.appendChild(createNumericTd(item.tesuam36));
    tr.appendChild(createNumericTd(item.tesuam60));

    if (isPension) {
        tr.appendChild(createTd(item.aktoari ? `${item.aktoari}%` : '', 'tdsmall',
            { textAlign: 'center', color: '#333', boxSizing: 'border-box' }));
    }

    return tr;
}

function createTd(text, className, styles = {}) {
    const td = document.createElement('td');
    td.className = className;
    td.textContent = text;
    Object.assign(td.style, styles);
    return td;
}

function createNumericTd(value) {
    const td = document.createElement('td');
    td.className = 'tdsmall';
    Object.assign(td.style, { textAlign: 'center', color: '#333', boxSizing: 'border-box' });
    if (value != null) td.textContent = `${Number(value).toFixed(2)}%`;
    return td;
}

function addtble(x, mas) {
    if (mas.includes('עם מניות')) mas += ' (עד 25% מניות)';

    const allTheTables = document.getElementById('allTheTables');
    const tableHtml = `
        <div class="tbl">
            <h4 style="color:var(--main-color);">${mas}</h4>
            <div class="divTblNetunim">
                <table class="klalikoch" id="klalikoch${x}"></table>
            </div>
        </div>`;

    if (x === 0 || x % 3 === 0) {
        allTheTables.innerHTML += `<div class="tblMuzarim" id="tblMuzarim${x}">`;
        document.getElementById(`tblMuzarim${x}`).innerHTML += tableHtml;
    } else {
        const parentId = (x - 1) % 3 === 0 ? `tblMuzarim${x - 1}` : `tblMuzarim${x - 2}`;
        document.getElementById(parentId).innerHTML += tableHtml;
    }
}

/** מחבר מאזין onclick לכל קישורי .linktdbig */
function attachClickHandlers(callbackName) {
    document.querySelectorAll('.linktdbig').forEach(el => {
        el.onclick = function() { window[callbackName](this); };
    });
}

/** מסתיר טבלאות ריקות */
function hideEmptyTables(prefix) {
    document.querySelectorAll(`[id^="${prefix}"]`).forEach(table => {
        if (table.rows.length - 1 < 1) {
            const h4 = table.parentNode.parentNode.querySelector('h4');
            if (h4) h4.style.display = 'none';
            table.style.display = 'none';
        }
    });
}

/** מסמן ערכים שליליים באדום */
function styleNegativeValues() {
    document.querySelectorAll('[class^="klalikoch"] td').forEach(td => {
        const text = td.textContent.trim();
        if (text.startsWith('-')) {
            td.innerHTML = `<span style="direction:ltr;display:inline-block;">${text}</span>`;
            td.style.color = 'red';
        }
    });
}

// שמירת aliases לתאימות אחורה עם PensiaScript
const addclick  = () => attachClickHandlers('bringinfo');
const addclickX = () => attachClickHandlers('bringinfoX');
const tablerek  = () => hideEmptyTables('klalikoch');
const tablerekX = () => hideEmptyTables('klalikochX');

// ─── Detail View ───────────────────────────────────────────────────────────────

/** מחפש פריט לפי שם מסלול בכל מאגרי הנתונים */
function findDataByName(name) {
    const trimmed = name.trim();
    for (const ds of [datanetunimKlaliXM, datanetunimKlaliXB, datanetunimKlaliXP]) {
        const found = ds?.filter(item => item.shemkupa.trim() === trimmed) ?? [];
        if (found.length) return found;
    }
    return [];
}

async function bringinfo(x) {
    if (document.getElementById('hadashim')?.checked) return;
    await _openDetailView(x);
}

// bringinfoX נמצא ב-PensiaScript.js ומשתמש ב-_openDetailView ישירות

async function _openDetailView(x) {
    ['hidefooter', 'hideAllimages', 'hideMaBaatar', 'hideMabaatarSpecific'].forEach(fn => {
        if (typeof window[fn] === 'function') window[fn]();
    });

    document.getElementById('sanenMosdy')?.style.setProperty('display', 'none');
    document.getElementById('closeinfo')?.style.setProperty('display', 'block');
    document.getElementById('allTheTables')?.style.setProperty('display', 'none');
    document.getElementById('kupaInfo')?.style.setProperty('display', 'block');

    if (typeof hidkot === 'function') hidkot();

    const table    = x.closest('table');
    const mhkupaf  = x.parentNode.firstElementChild.textContent.trim();
    const rows     = table.getElementsByTagName('tr');

    let mikom = 0;
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].children[1]?.textContent.trim() === mhkupaf) { mikom = i; break; }
    }

    const data = findDataByName(mhkupaf);
    await bring(data, mikom);
}

// ─── Table Sort ───────────────────────────────────────────────────────────────

/**
 * ממיין טבלת תוצאות לפי העמודה שנלחצה.
 * @param {HTMLElement} x       - כותרת העמודה שנלחצה
 * @param {boolean}     pension - true אם טבלת פנסיה (7 עמודות)
 */
function _sortTableGeneric(x, pension = false) {
    const table = x.closest('table');
    if (!table) return;

    const rows = Array.from(table.getElementsByTagName('tr')).slice(1);
    const COL_MAP = pension
        ? { 'חודשי': 1, 'שנה': 2, '3 שנים': 3, '5 שנים': 4, 'אקטוארי': 5 }
        : { 'חודשי': 1, 'שנה': 2, '3 שנים': 3, '5 שנים': 4 };

    const selectedKey = Object.keys(COL_MAP).find(k => x.innerHTML.includes(k));
    if (!selectedKey) return;
    const colIndex = COL_MAP[selectedKey];

    const parseVal = td => {
        const n = parseFloat((td?.textContent ?? '').replace(/[^0-9.-]/g, ''));
        return isNaN(n) ? 0 : n;
    };

    rows.sort((a, b) => parseVal(b.cells[colIndex]) - parseVal(a.cells[colIndex]));
    rows.forEach(row => table.tBodies[0]?.appendChild(row));
}

function sortTable(x)  { _sortTableGeneric(x, false); }
function sortTablez(x) { _sortTableGeneric(x, true);  }
