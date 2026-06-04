'use strict';

// ─── Field Labels ──────────────────────────────────────────────────────────────
const fieldNames = {
    tesuam:               'תשואה ל - 12 חודשים',
    tesuam36:             'תשואה 3 שנים',
    tesuam60:             'תשואה 5 שנים',
    stiya36:              'סטיית תקן 3 שנים',
    stiya60:              'סטיית תקן 5 שנים',
    yitratNechasim:       'יתרת נכסים',
    sharp:                'מדד שארפ',
    tusaAharona:          'תשואה חודש אחרון',
    tesuaMitchilatshana:  'תשואה מתחילת שנה',
    kvutzaAhuz4751:       'שיעור חשיפה למניות',
    kvutzaAhuz4761:       'שיעור חשיפה למטבע חוץ',
    tesuaLestiya36:       'תשואה לסטייה 3 שנים',
    tesuaLestiya60:       'תשואה לסטייה 5 שנים',
    1:'ראשון', 2:'שני', 3:'שלישי', 4:'רביעי', 5:'חמישי', 6:'שישי',
    7:'שביעי', 8:'שמיני', 9:'תשיעי', 10:'עשירי', 11:'אחדעשרה', 12:'שנייםעשר'
};

const fieldsToCompare = [
    'yitratNechasim', 'tusaAharona', 'tesuaMitchilatshana',
    'tesuam', 'tesuam36', 'tesuam60',
    'stiya36', 'stiya60', 'sharp',
    'kvutzaAhuz4751', 'kvutzaAhuz4761',
    'tesuaLestiya36', 'tesuaLestiya60'
];

const BETTER_IF_HIGHER = new Set([
    'tesuam', 'tesuam36', 'tesuam60', 'sharp', 'tusaAharona',
    'tesuaMitchilatshana', 'kvutzaAhuz4751', 'kvutzaAhuz4761',
    'tesuaLestiya36', 'tesuaLestiya60', 'yitratNechasim'
]);
const BETTER_IF_LOWER = new Set(['stiya36', 'stiya60']);

// ─── Detail View Builder ───────────────────────────────────────────────────────

async function bring(data, mikom) {
    if (!data?.length) return;

    const item    = data[0];
    const mhkupa  = item.mh;
    const muzar   = item.mozar;
    const shemkupa = item.shemkupa;
    const maslul  = item.mas;
    let menahelet = item.menahelet;

    // חישוב מדדי סיכון/תשואה
    if (item.tesuam36 && item.stiya36 && item.stiya36 !== 0) {
        item.tesuaLestiya36 = (item.tesuam36 / item.stiya36).toFixed(2);
    }
    if (item.tesuam60 && item.stiya60 && item.stiya60 !== 0) {
        item.tesuaLestiya60 = (item.tesuam60 / item.stiya60).toFixed(2);
    }

    if (!menahelet || menahelet === 'undefined' || menahelet === 'null') {
        menahelet = matchHevra(shemkupa).replace('-', ' ');
    }

    const kupaInfo = document.getElementById('kupaInfo');
    kupaInfo.innerHTML = `
        <div class="closekupainfo" id="closeinfo"
             onclick="hidekupainfo(); showAllimages(); showMabaatar()"
             style="margin-right:10px;display:block">
            <i class="fa-solid fa-rotate-left"></i>
        </div>`;

    // ─ נתונים כלליים ─
    kupaInfo.innerHTML += `
        <h3 style="text-align:center;color:blue;">נתונים כלליים</h3>
        <table id="tableklali" style="width:clamp(300px,90vw,800px);margin:0 auto;
               border-collapse:collapse;font-size:16px;"><tbody></tbody></table>`;

    document.querySelector('#tableklali tbody').innerHTML = `
        <tr>
            <td class="td-label">שם המסלול:</td>
            <td id="shemkupa" style="padding:8px;border:1px solid #ccc;font-weight:bold;
                color:orangered;font-size:16px;">${shemkupa}</td>
        </tr>
        <tr>
            <td class="td-label">מספר אוצר:</td>
            <td style="padding:8px;border:1px solid #ccc;">${mhkupa}</td>
        </tr>
        <tr>
            <td class="td-label">סוג מוצר:</td>
            <td style="padding:8px;border:1px solid #ccc;">${muzar}</td>
        </tr>
        <tr>
            <td class="td-label">חברה מנהלת:</td>
            <td style="padding:8px;border:1px solid #ccc;">${menahelet}</td>
        </tr>`;

    // ─ אופי השקעה ─
    kupaInfo.innerHTML += `
        <h3 style="text-align:center;color:blue;margin:10px auto;">אופי השקעה</h3>
        <table id="tableOfi" style="width:clamp(300px,90vw,800px);margin:0 auto;
               border-collapse:collapse;font-size:16px;"><tbody></tbody></table>`;

    document.querySelector('#tableOfi tbody').innerHTML = `
        <tr>
            <td class="td-label">אפיק השקעה:</td>
            <td style="padding:8px;border:1px solid #ccc;">${maslul}</td>
        </tr>
        <tr>
            <td class="td-label">אופי מסלול השקעה:</td>
            <td style="padding:8px;border:1px solid #ccc;">${item.masOfi}</td>
        </tr>`;

    // ─ נתוני תשואה וסיכון ─
    kupaInfo.innerHTML += `
        <h3 style="text-align:center;color:blue;margin:10px auto;">נתוני נכסים, תשואה וסיכון</h3>
        <h3>המסלול מדורג במקום ה - <span style="color:orangered;">${mikom}</span>
            בתשואה ל - 12 חודשים אחרונים</h3>
        <table id="tableTesuot" style="width:clamp(300px,90vw,800px);margin:0 auto;
               border-collapse:collapse;font-size:16px;"><tbody></tbody></table>`;

    const tableTesuot   = document.querySelector('#tableTesuot tbody');
    const analysisScore = analyzeMaslulAgainstAverage(item);

    tableTesuot.innerHTML = `
        <tr>
            <td class="td-label" style="text-align:center;">נושא</td>
            <td class="td-label" style="text-align:center;">נתון במסלול</td>
            <td class="td-label" style="text-align:center;">ממוצע ענף</td>
            <td class="td-label" style="text-align:center;">ביחס לממוצע</td>
        </tr>`;

    if (analysisScore?.fields?.length) {
        for (const field of fieldsToCompare) {
            const fd = analysisScore.fields.find(f => f.field === field);
            if (!fd || isNaN(fd.value) || isNaN(fd.average)) continue;

            const fmt = n => Number(n).toLocaleString('he-IL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            tableTesuot.innerHTML += `
                <tr>
                    <td style="padding:8px;border:1px solid #ccc;text-align:right;">${fieldNames[field] ?? field}</td>
                    <td style="padding:8px;border:1px solid #ccc;text-align:center;">${fmt(fd.value)}</td>
                    <td style="padding:8px;border:1px solid #ccc;text-align:center;">${fmt(fd.average)}</td>
                    <td style="padding:8px;border:1px solid #ccc;text-align:center;">${fd.result}</td>
                </tr>`;
        }
    } else {
        tableTesuot.innerHTML += `
            <tr>
                <td colspan="4" style="padding:15px;text-align:center;color:#666;">
                    לא נמצאו נתוני השוואה לממוצע ענף
                </td>
            </tr>`;
    }

    kupaInfo.innerHTML += `
        <canvas id="myChartkupa" style="width:100%;max-width:1000px;max-height:200px;"></canvas>
        <canvas id="myChart"     style="width:100%;max-width:1000px;max-height:200px;margin:30px auto;"></canvas>
        <h3 id="nehasimkot" class="nehasimkot" style="text-align:center;color:blue;margin:10px auto;"></h3>
        <div id="tblnehasim" class="tblnehasim">
            <table id="nehasim" style="width:clamp(300px,90vw,800px);margin:15px auto;
                   border-collapse:collapse;font-size:16px;"></table>
            <canvas id="pieChartkupa" style="width:clamp(250px,80vw,300px);max-height:400px;"></canvas>
        </div>`;

    document.getElementById('kupaInfo').style.display = 'block';
    document.getElementById('kupaInfo').style.margin  = '0 auto';

    if (typeof openKupaInfoModal === 'function') openKupaInfoModal(shemkupa);

    // ─ גרפי תשואה ─
    renderReturnCharts(item);

    // ─ טבלת חלוקת נכסים ─
    const nehasim = [];
    for (let i = 4701; i <= 4710; i++) {
        if (item[`kvutzaSchum${i}`] > 0) {
            nehasim.push(item[`kvutzaSug${i}`], item[`kvutzaSchum${i}`], item[`kvutzaAhuz${i}`]);
        }
    }
    pie(nehasim);
}

// ─── Charts ────────────────────────────────────────────────────────────────────

function destroyChart(id) {
    const existing = Chart.getChart(id);
    if (existing) existing.destroy();
}

function renderReturnCharts(item) {
    const xValues = [], yValues = [], yValuesM = [];
    let miztaberet = 1;

    for (let r = 1; r <= 12; r++) {
        const parts = item[`tesua${r}`].split('=');
        const monthly = Number(parts[0]);
        miztaberet *= 1 + monthly / 100;

        yValues.push(monthly);
        yValuesM.push(Number(((miztaberet - 1).toFixed(4) * 100).toFixed(2)));

        const num = parts[1].toString();
        xValues.push(`${num.substring(4, 6)}/${num.substring(0, 4)}`);
    }

    const barColors = yValues.map(v => v >= 0 ? 'green' : 'red');

    // גרף עמודות — תשואות חודשיות
    destroyChart('myChartkupa');
    new Chart('myChartkupa', {
        type: 'bar',
        data: { labels: xValues, datasets: [{ backgroundColor: barColors, data: yValues }] },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title:  { display: true, text: 'תשואות 12 חודשים אחרונים', color: 'blue', font: { size: 20, weight: 'bold' } },
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true, min: Math.min(0, ...yValues) },
                x: { ticks: { autoSkip: false } }
            }
        }
    });

    // גרף קו — תשואה מצטברת
    destroyChart('myChart');
    new Chart('myChart', {
        type: 'line',
        data: {
            labels: xValues,
            datasets: [{
                data: yValuesM, borderColor: 'blue', borderWidth: 2,
                pointRadius: 5, pointBackgroundColor: 'green', fill: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title:  { display: true, text: 'תשואה חודשית מצטברת 12 חודשים', color: 'blue', font: { size: 20 } },
                legend: { display: false }
            },
            scales: {
                x: { title: { display: true, text: 'חודש' } },
                y: { title: { display: true, text: 'תשואה (%)' } }
            }
        }
    });
}

// ─── Asset Allocation Pie ──────────────────────────────────────────────────────

let pieChartInstance;

function pie(nehasim) {
    const tbl = document.getElementById('nehasim');
    document.getElementById('nehasimkot').innerText = 'חלוקת נכסים לקבוצות ראשיות:';
    tbl.innerHTML = '';

    const labels = [], values = [];
    for (let i = 0; i < nehasim.length; i += 3) {
        tbl.innerHTML += `
            <td style="background:aliceblue;color:#333;padding:8px;border:1px solid #ccc;text-align:right;">
                ${nehasim[i]}
            </td>
            <td style="padding:8px;border:1px solid #ccc;text-align:center;">
                ${Number(nehasim[i + 2]).toFixed(2)}%
            </td>`;
        labels.push(nehasim[i]);
        values.push(Number(nehasim[i + 2]));
    }

    destroyChart('pieChartkupa');
    pieChartInstance = new Chart('pieChartkupa', {
        type: 'pie',
        data: {
            labels,
            datasets: [{
                data: values,
                backgroundColor: ['#FF6384','#36A2EB','#FFCE56','#4BC0C0','#9966FF',
                                  '#FF9F40','#C9CBCF','#8B0000','#FFD700']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title:  { display: true, text: 'פיזור נכסים', color: 'blue', font: { size: 25, family: 'Arial', weight: 'bold' } },
                legend: { display: true, position: 'bottom', align: 'end' }
            }
        }
    });
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function matchHevra(hevra) {
    return hevra.split(' ')[0];
}

function exportToPDF() {
    const element = document.getElementById('kupaInfo');
    const kupa    = document.getElementById('shemkupa');
    html2pdf().set({
        margin:      0.5,
        filename:    `${kupa.innerText}.pdf`,
        image:       { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF:       { unit: 'in', format: 'a4', orientation: 'portrait' }
    }).from(element).save();
}

// ─── Performance Analysis ──────────────────────────────────────────────────────

function analyzeMaslulAgainstAverage(maslulData) {
    const analysis = { mozar: maslulData.mozar || '', maslul: maslulData.mas || '', totalAboveAvg: 0, totalFields: 0, fields: [] };

    if (typeof dataIndicators === 'undefined' || !Array.isArray(dataIndicators)) return analysis;

    const maslulType   = typeof getMaslulType === 'function' ? getMaslulType(maslulData.shemkupa) : maslulData.mas;
    const averageData  = dataIndicators.find(i => i.maslul === maslulType && i.mozar === maslulData.mozar);

    if (!averageData) return analysis;

    if (averageData.tesuam36 && averageData.stiya36 && averageData.stiya36 !== 0) {
        averageData.tesuaLestiya36 = (averageData.tesuam36 / averageData.stiya36).toFixed(2);
    }
    if (averageData.tesuam60 && averageData.stiya60 && averageData.stiya60 !== 0) {
        averageData.tesuaLestiya60 = (averageData.tesuam60 / averageData.stiya60).toFixed(2);
    }

    for (const field of fieldsToCompare) {
        const val = parseFloat(maslulData[field]);
        const avg = parseFloat(averageData[field]);

        if (isNaN(val) || isNaN(avg)) {
            analysis.fields.push({ field, value: '', average: '', result: 'לא נותח' });
            continue;
        }

        let result = 'לא נותח';
        if (BETTER_IF_HIGHER.has(field)) {
            result = val > avg ? 'מעל הממוצע' : val < avg ? 'מתחת לממוצע' : 'שווה לממוצע';
            if (val > avg) analysis.totalAboveAvg++;
        } else if (BETTER_IF_LOWER.has(field)) {
            result = val < avg ? 'מעל הממוצע (סטייה נמוכה)' : val > avg ? 'מתחת לממוצע (סטייה גבוהה)' : 'שווה לממוצע';
            if (val < avg) analysis.totalAboveAvg++;
        }

        analysis.fields.push({ field, value: val, average: avg, result });
        analysis.totalFields++;
    }

    analysis.score = `${((analysis.totalAboveAvg / analysis.totalFields) * 100).toFixed(1)}% ביצועים מעל הממוצע`;
    return analysis;
}
