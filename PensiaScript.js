'use strict';

// ─── Constants ────────────────────────────────────────────────────────────────
const mozkochX = ['קרנות חדשות', 'קרנות כלליות'];

const pensia = [
    'מניות', 'עד 50', '50-60', '60 ומעלה', 'עוקב מדד s&p 500',
    'אשראי ואג"ח', 'כספי (שקלי)', 'משולב סחיר', 'עוקב מדדים - גמיש',
    'אג"ח ממשלות', 'הלכה יהודית', 'מניות סחיר', 'עוקב מדדי אג"ח',
    'עוקב מדדי מניות', 'אג"ח סחיר', 'עוקב מדדי אג"ח עם מניות', 'אג"ח סחיר עם מניות'
];

// ─── Pension Table Builder ─────────────────────────────────────────────────────

async function maslulimP(t, moz, hev) {
    const allTheTables = document.getElementById('allTheTables');
    if (!allTheTables) { console.error('allTheTables element not found'); return; }

    if (t === 30) allTheTables.innerHTML = '';
    allTheTables.style.display = 'flex';

    const sugmuzar = moz;
    const sugmozP  = sugmuzar === 'קרנות כלליות' ? 'קרנות פנסיה - כלליות' : 'קרנות פנסיה - חדשות';

    allTheTables.innerHTML += `
        <h2 id="h2Hish" name="h2Hish" style="font-size:1rem;line-height:1.8rem;
        vertical-align:middle;margin-top:15px;text-align:right;padding-right:5px;">
            ${sugmozP}
            <a onclick="maslulimP(30,'${sugmuzar}',0)" class="txta" id="spanHish" name="spanHish">כל המסלולים</a>
        </h2>`;

    const mesanen   = document.getElementById('sanenMosdy');
    const sinonHevra = document.getElementById('sinonHevra');
    if (sinonHevra) sinonHevra.selectedIndex = 0;
    if (mesanen)    mesanen.style.display = 'none';

    if (t === 30) {
        if (mesanen) mesanen.style.display = 'flex';
        document.querySelectorAll('[name="spanHish"]').forEach(a => {
            a.setAttribute('onclick',
                'maslulim(1,0,0);' +
                'if(typeof backtop==="function")backtop();' +
                'if(typeof showMabaatar==="function")showMabaatar();' +
                'if(typeof hideMabaatarSpecific==="function")hideMabaatarSpecific();'
            );
            a.className  = 'spanHish back';
            a.style.color       = '#333';
            a.style.fontWeight  = 'bold';
        });
    }

    let z = 0;

    for (let i = 0; i < pensia.length; i++) {
        if (i > t && i > 2) continue;

        const dataY = await filterMaslul(pensia[i], sugmuzar, hev);
        dataY.sort((a, b) => b.tesuam - a.tesuam);
        if (!dataY.length) continue;

        addtbleX(z, pensia[i]);

        const table = document.getElementById(`klalikochX${z}`);
        if (!table) continue;

        table.innerHTML = buildPensionTableHeader();

        const limit = t !== 30 ? 3 : dataY.length;
        for (let tb = 0; tb < limit; tb++) {
            if (dataY[tb]?.tesuam) {
                table.appendChild(buildTableRow(dataY[tb], true));
            }
        }
        z++;
    }

    addclickX();
    tablerekX();
    styleNegativeValues();

    if (t === 30) {
        document.getElementById('mabaatarSpecific')?.scrollIntoView({ behavior: 'smooth' });
    }
}

// ─── Table Helpers ────────────────────────────────────────────────────────────

function buildPensionTableHeader() {
    return `<tr style="font-weight:bold;background-color:var(--main-color);color:white;border:none;">
        <td>מה</td>
        <td>שם המסלול</td>
        <td>חודש</td>
        <td onclick="sortTablez(this)">שנה<i class="fa fa-sort"></i></td>
        <td onclick="sortTablez(this)">3 שנים<i class="fa fa-sort"></i></td>
        <td onclick="sortTablez(this)">5 שנים<i class="fa fa-sort"></i></td>
        <td onclick="sortTablez(this)">אקטוארי<i class="fa fa-sort"></i></td>
    </tr>`;
}

function addtbleX(x, mas) {
    const allTheTables = document.getElementById('allTheTables');
    const tableHtml = `
        <div class="tbl">
            <h4>${mas}</h4>
            <div class="divTblNetunim">
                <table class="klalikoch" id="klalikochX${x}"></table>
            </div>
        </div>`;

    if (x === 0 || x % 3 === 0) {
        allTheTables.innerHTML += `<div class="tblMuzarim" id="tblMuzarimX${x}">`;
        document.getElementById(`tblMuzarimX${x}`).innerHTML += tableHtml;
    } else {
        const parentId = (x - 1) % 3 === 0 || x - 1 === 0
            ? `tblMuzarimX${x - 1}`
            : `tblMuzarimX${x - 2}`;
        document.getElementById(parentId).innerHTML += tableHtml;
    }
}

// ─── Detail View ───────────────────────────────────────────────────────────────

/** פותח פרטי מסלול פנסיה — זהה ל-bringinfo אך ללא בדיקת hadashim */
async function bringinfoX(x) {
    await _openDetailView(x);
}
