var timeToListen=6000;var interval;
const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
recognition.lang = "he-IL";
recognition.interimResults = false;
recognition.maxAlternatives = 1;
recognition.continuous = false;
function micClick() {
   startStop=0;
  const mictext=document.getElementById('resultMic').textContent;
  if(mictext.includes("עצור") ){
	startStop=1;  recognition.stop();
  
}
else{
  document.getElementById('resultMic').textContent = " מאזין קבוע - לעצירה אמור עצור או לחץ שוב";
  recognition.start();}
}
recognition.onstart = function () {
   const timerDisplay = document.getElementById('timerDisplay');
  let secondsPassed = 0;
  timerDisplay.style.display = 'block';
  interval = setInterval(() => {
    secondsPassed++;
    timerDisplay.textContent = secondsPassed;
    if (secondsPassed * 1000 >= timeToListen) {
      clearInterval(interval);
      timerDisplay.style.display = 'none';
      recognition.stop(); 
    }
  }, 1000);
};
recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  handleSearchFromVoice(transcript);
};
recognition.onend = () => {
clearInterval(interval);
if(startStop===0) {recognition.start();}
else{document.getElementById('resultMic').textContent ="לא מאזין"}
};
recognition.onerror = (e) => {
   document.getElementById("result").textContent = "שגיאה בזיהוי קולי: " + e.error;
};


function toggleMenux() {
  if(document.getElementById("hamb").className.includes('open')){
        document.getElementById("hamb").classList.remove("open");
        document.querySelector(".menu-container").style.display='none';
        document.getElementById("menu").classList.remove("open");
  }}
function hideformic() {
  hideAllimages();
  hideTkufa();
}
function handleSearchFromVoice(transcript) {
var ifrmValue=0;
var iframe = document.getElementById('ifrm');
  

if(iframe && iframe.src.includes("html") && !iframe.src.includes("index")) {ifrmValue=1;}
else {ifrmValue=0;}
if(!transcript){return};

// פקודות כלליות
  // פקודת עצירה
if (transcript.includes("עצור") || transcript.includes("הפסק") || transcript.includes("צליל")) {
	startStop=1;
  document.getElementById('timerDisplay').textContent='';
  return;
    }
  // פקודות שימוש באתר והסבר קולי
if (transcript.includes("שימוש") || transcript.includes("תנאי")) {
  showIframe('tnaiyShimosh.html');
  return;
}
else if (transcript.includes("הסבר") || transcript.includes("הוראות קוליות") || transcript.includes("הוראות")) {
  showIframe('koliHes.html');return;
  }


  // פקודות חזרה
if (((transcript.includes("חזור") || transcript.includes("הבית")))
 ) {
      hideframe();
      showAllimages();
      hidekupainfo();
      
      return;
  }
    // פקודות גלילה
  if (transcript.includes("ראש")  && ifrmValue===1 && 
  !iframe.src.includes('riskQuest')) {iframe.contentWindow.scrollTo(0, 0);return;}
	if (transcript.includes("ראש")  && ifrmValue===0) {window.scrollTo(0, 0);return;}
	if (transcript.includes("תחתית")) {window.scrollTo({top: document.body.scrollHeight,
          behavior: 'smooth'});return;}
  if (transcript.includes('למטה') &&  ifrmValue===1 ) {
    if(transcript.includes("הרבה")){
      var tvach=700;
    }
    else if(transcript.includes("קצת")){
      var tvach=150;
    }
    else{
      var tvach=300
    }
    if (iframe.contentWindow.scrollY + tvach > iframe.contentWindow.document.body.scrollHeight - iframe.contentWindow.innerHeight) {
        iframe.contentWindow.scrollTo(0, iframe.contentWindow.document.body.scrollHeight - iframe.contentWindow.innerHeight);
    } else {
        iframe.contentWindow.scrollBy(0, tvach);
    }
    return;
  }
  if (transcript.includes('למעלה') &&  ifrmValue===1) {
    if(transcript.includes("הרבה")){
      var minustvach=-700;
    }
    else if(transcript.includes("קצת")){
      var minustvach=-150;
    }
    else{
      var minustvach=-300
    }
    if (iframe.contentWindow.scrollY + minustvach < 0) {
      iframe.contentWindow.scrollTo(0, 0);
    } else {
      iframe.contentWindow.scrollBy(0, minustvach);
    }
    return;
  }
  if (transcript.includes('למטה') &&  ifrmValue===0) {
    if(transcript.includes("הרבה")){
      var tvach=700;
    }
    else if(transcript.includes("קצת")){
      var tvach=150;
    }
    else{
      var tvach=300
    }
    if(window.scrollY+tvach>document.scrollHeight-window.innerHeight){
      window.scrollBy(0,document.scrollHeight-window.innerHeight)
    }
    else{window.scrollBy(0,tvach)}
    return;
  }
  if (transcript.includes('למעלה') &&  ifrmValue===0) {
    if(transcript.includes("הרבה")){
      var minustvach=-700;
    }
    else if(transcript.includes("קצת")){
      var minustvach=-150;
    }
    else{
      var minustvach=-300
    }
    if(window.scrollY+minustvach<0){
    window.scrollTo(0,0)
    }
    else{window.scrollBy(0,minustvach)}
    return;
  }

    // פקודות זמן
  if (transcript.includes("קצר") && transcript.includes('מאוד')) {timeToListen=3000;}
  else if (transcript.includes("קצר") && !transcript.includes('מאוד')) {timeToListen=6000;}
  else if (transcript.includes("בינוני") || transcript.includes("בנוני"))
    {timeToListen=10000;}
  else if (transcript.includes("ארוך") && transcript.includes('מאוד')) {timeToListen=20000;}
  else if (transcript.includes("ארוך") && !transcript.includes('מאוד')) {timeToListen=15000;}

// הפניה לסוכן
	if ((transcript.includes("קשר") || transcript.includes("סוכן"))) {yossi(); return;
	}
if (Swal.isVisible()) {
    const popup = document.querySelector('.swal2-popup');
  if (popup && popup.classList.contains('SwalYossi')) {
		if (transcript.includes("מאשר") && !transcript.includes("לא") ) {
			const checkbox = document.getElementById("swal-checkbox");
			if (checkbox && !checkbox.checked) {
				checkbox.checked = true;
			}
			const confirmBtn = document.querySelector(".swal2-confirm");
			if (confirmBtn) {
				confirmBtn.click();
			}
		} else if (transcript.includes("לא מאשר") || transcript.includes("לא")) {
			const cancelBtn = document.querySelector(".swal2-cancel");
			if (cancelBtn) {
				cancelBtn.click();
			}
		}
  }
    return;
}
 
  // פקודות הפניה למחשבונים
  if ((transcript.includes("מחשבונים") || transcript.includes("פיננסיים")) && ifrmValue===0) {
    hideformic(); showIframe("Machshevonim.html");return;
  }
if(ifrmValue===1){
  if (iframe.src.includes("Machshevonim")) {
    hideformic();
    if (transcript.includes("הלוואות") || transcript.includes("הלוואה") || 
    transcript.includes("שפיצר")){
      showIframe("loan.html");
      const iframe = document.getElementById("ifrm");iframe.onload = function() {
        handleLoan(transcript);
      }
    }
    else if (transcript.includes("דריבית") || transcript.includes("ערך עתידי")) {
      showIframe("ribitderibit.html");
      const iframe = document.getElementById("ifrm");iframe.onload = function() {
        handleCompoundInterest(transcript);
      }
    }
    else if (transcript.includes("דמי ניהול") || transcript.includes("ניהול")) {  
      showIframe("hashDmeyNihul.html");
      const iframe = document.getElementById("ifrm");iframe.onload = function() {
        handleHashDmeyNihul(transcript);
      }
    } 
    else if (transcript.includes("הפקדה חודשית") || transcript.includes("יעד")
      || transcript.includes("סכום יעד")) {
        hideformic(); showIframe("hafkada.html");
        document.getElementById('ifrm').onload = function() {
          handleYaad(transcript);
        }
      }
      else if ((transcript.includes("שאלון") || transcript.includes("סיכון")) && !transcript
    .includes("חשב") && !transcript.includes("בצע")) {
        showIframe('riskQuest.html');
        const iframe = document.getElementById("ifrm");iframe.onload=function(){
          iframe.contentWindow.sheelon();
          handleSheelon(transcript);
        }
      }
    return;
  }
}
// פקודות הפניה למחשבונים ישירות
if ((transcript.includes("הלוואות") || transcript.includes("הלוואה") || transcript.includes("שפיצר")) && ifrmValue === 0) {
    hideformic();
    showIframe("loan.html");
    const iframe = document.getElementById("ifrm");
    document.getElementById('ifrm').onload = function() {
        handleLoan(transcript);
    };
    return;
}
  else if ((transcript.includes("דריבית") || transcript.includes("ערך עתידי"))
  && ifrmValue === 0) {
    hideformic(); showIframe("ribitderibit.html");
	const iframe = document.getElementById("ifrm");
      document.getElementById('ifrm').onload = function() {
        handleCompoundInterest(transcript);
    };
    return;
  }
  else if ((transcript.includes("דמי ניהול") || transcript.includes("ניהול")) && ifrmValue===0) {
    hideformic(); showIframe("hashDmeyNihul.html");
       document.getElementById('ifrm').onload = function() {
      handleHashDmeyNihul(transcript);
    };
    return;
  }
  
  else if ((transcript.includes("הפקדה חודשית") || transcript.includes("יעד")
  || transcript.includes("סכום יעד")) && ifrmValue===0) {
    hideformic(); showIframe("hafkada.html");
    document.getElementById('ifrm').onload = function() {
      handleYaad(transcript);
    };
    return;
  }
  else if ((transcript.includes("שאלון") || transcript.includes("סיכון")) && ifrmValue===0) {
    showIframe('riskQuest.html');
    const iframe = document.getElementById("ifrm");iframe.onload=function(){
      iframe.contentWindow.sheelon();
      handleSheelon(transcript);
    };
    return;
  }
  
  //  פקודות הפניה להשוואות 
  if ((transcript.includes("השווא") || transcript.includes("חברות")) && ifrmValue===0
    && !transcript.includes("ניהול") && !transcript.includes("משולב") && !transcript.includes("מנהלות")) {
    hideformic(); showIframe("hashvaotRikuz.html");return;
  }
if(iframe && ifrmValue===1){
  if (iframe.src.includes("hashvaotRikuz")) {
    if (transcript.includes("מנהלות") || transcript.includes("מנהלת")) {
      hideformic(); showIframe("hashMenahalot.html"); 
    	const iframe = document.getElementById("ifrm");iframe.onload = function() {
        handleMenahalot(transcript);
       
    };
      return;
    }
    else if (transcript.includes("חשיפות")) {
      hideformic();
      showIframe("hasifotMeshulav.html");
      const iframe = document.getElementById("ifrm");
      iframe.onload = function () {
        handleHasifot(transcript);
      };
      return;
    }
   else if (transcript.includes("שארפ") || transcript.includes("שרפ")) {
     hideformic();
     hideAllimages();
     createForm(0);handleSharp(transcript);
      return;
    }
    else if ((transcript.includes("משולב") || transcript.includes("תיק") && ifrmValue===0)) {
      hideformic(); showIframe("VirtualInvest.html");
      const iframe = document.getElementById("ifrm");iframe.onload =function(){
        handleMeshulav(transcript);
        return;
      }
    }
    
  }
}
// פקודות הפניה להשוואות ישירות
if(transcript.includes("מנהלות") || transcript.includes("מנהלת")) {

      hideformic(); showIframe("hashMenahalot.html");
      const iframe = document.getElementById("ifrm");iframe.onload = function() {
        handleMenahalot(transcript);
      }
      return;
    }
    else if(transcript.includes("חשיפות")) {
      hideformic(); showIframe("hasifotMeshulav.html");
    	const iframe = document.getElementById("ifrm");iframe.onload = function() {
        handleHasifot(transcript);}
      return;
    }
    else if (transcript.includes("שארפ") || transcript.includes("שרפ")) {
      hideAllimages(); createForm(0);handleSharp(transcript);
      return;
    }
    else if(transcript.includes("משולב") || transcript.includes("תיק")) {
      hideformic(); showIframe("VirtualInvest.html");
      const iframe = document.getElementById("ifrm");iframe.onload = function() {
        handleMeshulav(transcript);
      }
      return;
    }

  // פקודות הפניה למידע
if(transcript.includes("מקצועי")  && ifrmValue===0
&& !transcript.includes("השתלמות") && !transcript.includes("פנסיה") && 
!transcript.includes("גמל") && !transcript.includes("השקעה") && !transcript.includes("חסכון")
&& !transcript.includes("ילד") && !transcript.includes("פוליסות")) {
    hideformic(); showIframe("meidaMikzoei.html");return;
  }
if(iframe && ifrmValue===1){
  if (iframe.src.includes("meidaMikzoei")) {
    if (transcript.includes("השתלמות")) {
      hideformic(); showIframe("hishtalmotMikzoei.html");
  }
    else if (transcript.includes("פנסיה")) {
    hideformic(); showIframe("pensiaMikzoei.html");
  }
    else if (transcript.includes("השקעה")) {
      hideformic(); showIframe("hashkaaMikzoei.html");
    }
    else if (transcript.includes("ילד")) {
      hideformic(); showIframe("hisyeled.html");
    }
    else if (transcript.includes("פוליסות")) {
      hideformic(); showIframe("polisotMikzoei.html");
    }
    else if (transcript.includes("גמל") && !transcript.includes("השקעה")) {
      hideformic(); showIframe("kupatgemelmikzoei.html");
    }
    return;
  }
}
// פקודות הפניה למידע ישירות
 if(transcript.includes("מקצועי")) {
    if (transcript.includes("השתלמות")) {
      hideformic(); showIframe("hishtalmotMikzoei.html");
      return;
    }
    else if (transcript.includes("פנסיה")) {
      hideformic(); showIframe("pensiaMikzoei.html");
      return;
    }
    else if (transcript.includes("השקעה")) {
      hideformic(); showIframe("hashkaaMikzoei.html");
    }
    else if (transcript.includes("ילד")) {
      hideformic(); showIframe("hisyeled.html");
    }
    else if (transcript.includes("פוליסות")) {
      hideformic(); showIframe("polisotMikzoei.html");
    }
    else if (transcript.includes("גמל") && !transcript.includes("השקעה")) {
      hideformic(); showIframe("kupatgemelmikzoei.html");
    }
   return; 
  }
  // פקודות הפניה למידע מסלולים
  else if (transcript.includes("קרנות השתלמות") && !transcript.includes("מקצועי")
	  && ifrmValue === 0 && document.getElementById('filter').style.display==='none') {
    showKupaMeida('pHish'); hideMaBaatar(); maslulim(30,'קרנות השתלמות',0);return; 
  }
  else if (transcript.includes("קרנות פנסיה") && !transcript.includes("מקצועי") && ifrmValue === 0   && document.getElementById('filter').style.display==='none') {
    showKupaMeida('pPensia'); hideMaBaatar(); maslulimP(30,'קרנות חדשות',0);return; 
  }
  else if (transcript.includes("השקעה") && !transcript.includes("מקצועי")
	 && ifrmValue === 0  && document.getElementById('filter').style.display==='none') {
    showKupaMeida('pHash'); hideMaBaatar(); maslulim(30,'קופת גמל להשקעה',0);return; 
  }
  else if (transcript.includes("ילד") && !transcript.includes("מקצועי") && ifrmValue === 0  && document.getElementById('filter').style.display==='none') {
    showKupaMeida('pYeled'); hideMaBaatar(); maslulim(30,'קופת גמל להשקעה - חסכון לילד',0);return; 
  }
  else if (transcript.includes("פוליסות") && !transcript.includes("מקצועי") && ifrmValue === 0  && document.getElementById('filter').style.display==='none') {
    showKupaMeida('pPolisa'); hideMaBaatar(); maslulim(30,'פוליסות חסכון',0);return; 
  }
  else if (transcript.includes("גמל") && !transcript.includes("השקעה") && !transcript.includes("מקצועי")
	   && ifrmValue === 0  && document.getElementById('filter').style.display==='none') {
    showKupaMeida('pGemel'); hideMaBaatar(); maslulim(30,'תגמולים ואישית לפיצויים',0);return; 
  }
  
  
  // פקודות הפניה למידע תקרות
	
	 if (transcript.includes("תקרות") || transcript.includes("תקרות הפקדה")) {
		showIframe('tikrot.html');return;
    }

	 if (transcript.includes("מסלול") && ifrmValue===0 ) {
		const match = transcript.match(/מסלול\s+(\S+)/);
			if (match) {
				searchMh(match[1]);
		}
		else{
     Swal.fire({
          html: "<span style='color: green; font-size: 16px'> אמור  מסלול  + מספר מסלול </span>",
          showConfirmButton: false,
          width: "clamp(300px, 90vw, 600px)",
          position: "center",
          timer: 2000,
          timerProgressBar: true,
          background: "#fff",
          icon: "warning",
          customClass: {
            popup: 'swal2-center-custom'
          }
        });
		  }
      return; 
    }
	// פקודות לטיפול בתוך התהליך
	if(iframe  ){
		if(iframe.src.includes("loan")){
		handleLoan(transcript);return
		}
		else if(iframe.src.includes("ribitderibit")){
			handleCompoundInterest(transcript);return;
		}
		else if(iframe.src.includes("hashMenahalot")){
			handleMenahalot(transcript);return;
		}
    else if(iframe.src.includes("hashDmeyNihul")){
      handleHashDmeyNihul(transcript);return;
    }
    else if(iframe.src.includes("hafkada")){
      handleYaad(transcript);return;
    }
    else if(iframe.src.includes("hasifotMeshulav")){
      handleHasifot(transcript);return;
    }
      else if(iframe.src.includes('riskQuest')) {
        handleSheelon(transcript);;return;
      }
      else if(iframe.src.includes('VirtualInvest')){
        handleMeshulav(transcript);return;
      }
   }
  if(document.getElementById('filter').style.display==='flex'){
	  handleSharp(transcript);return;
	}
  else if(transcript.includes("הדפס") || transcript.includes("pdf")){
    window.exportToPDF();return
  }
  
if(!transcript.includes('קצר') && !transcript.includes('בינוני') &&!transcript.includes('ארוך')){
  Swal.fire({
    html: "<span style='color: green; font-size: 16px;'>הבקשה אינה ברורה - אמור שוב</span>",
    showConfirmButton: false,
    width: "clamp(300px, 90vw, 600px)",
    position: "center",
    timer: 2000,
    timerProgressBar: true,
    background: "#fff",
    icon: "warning",
    customClass: {
      popup: 'swal2-center-custom'
    }
  });
  }
 	 
}
function handleLoan(transcript) {
	const iframex = document.getElementById('ifrm');
	const loanDoc = iframex.contentWindow.document;
	const loanWindow = iframex.contentWindow;
	const loanAmountInput = loanDoc.getElementById('loan-amount');
	const termfor = loanDoc.getElementById('loan-term');
	const interestfor = loanDoc.getElementById('interest-rate');
	const delayfor = loanDoc.getElementById('payment-delay');
	const pianoach=handleInput(transcript);
	// סכום
	if (pianoach.amount) {
		loanAmountInput.value = pianoach.amount;
		loanDoc.getElementById('loan-amount-range').value=pianoach.amount;
	}
	// גרייס
	if (pianoach.grace) {
	         delayfor.value = pianoach.grace;
		loanDoc.getElementById('payment-delay-range').value=pianoach.grace;
	}
	else if (transcript.includes("גרייס") ) {
		delayfor.value = '';
		loanDoc.getElementById('payment-delay-range').value=0;
			}
	// תקופה
	if (pianoach.term) {
		termfor.value = pianoach.term;
		loanDoc.getElementById('loan-term-range').value=pianoach.term;
			}
	// ריבית
	if (pianoach.interest) {
		interestfor.value = pianoach.interest;
		loanDoc.getElementById('interest-rate-range').value=pianoach.interest;
			}
	// הפעלת מחשבון רק אם כל השדות מולאו
	if (termfor.value && interestfor.value && loanAmountInput.value) {
		loanWindow.calculateLoan();
	}
	// לוח סילוקין
	if (transcript.includes("סילוקין") || transcript.includes("לוח") || transcript.includes("הסתר")
    || transcript.includes('אסתר')) {
		loanWindow.toggleAmortizationTable();
	}
}
function handleCompoundInterest(transcript) {
  const iframex = document.getElementById('ifrm');
  const compoundDoc = iframex.contentWindow.document;
  const compoundWindow = iframex.contentWindow;
  const initialAmountInput = compoundDoc.getElementById('hadpeami');
  const monthlyDepositInput = compoundDoc.getElementById('hodshi');
  const termInput = compoundDoc.getElementById('txttkofa1');
  const interestRateInput = compoundDoc.getElementById('selecttoz');
  const DmeyNihulInput= compoundDoc.getElementById('txttkofa2');
  const tesuaInput= compoundDoc.getElementById('selectoz');
if(transcript.includes('סוג')){
  if(transcript.includes('פעמי') && (!transcript.includes('חודשי' || transcript.includes('בתשלומים')))){
    compoundDoc.getElementById('rdbutton1').checked=true;compoundWindow.rdchange();
  }
  if((transcript.includes('חודשי') || transcript.includes('בתשלומים')) && !transcript.includes('פעמי')){
    compoundDoc.getElementById('rdbutton2').checked=true;compoundWindow.rdchange();
  }
  if(transcript.includes('פעמי') && (transcript.includes('חודשי') || transcript.includes('בתשלומים'))){
    compoundDoc.getElementById('rdbutton3').checked=true;compoundWindow.rdchange();
  }
}
  const pianoach=handleInput(transcript);
	if (pianoach.had) {
		initialAmountInput.value = pianoach.had;
			}
	if (pianoach.hodshi) {
		monthlyDepositInput.value = pianoach.hodshi;
	}
	if (pianoach.term) {
			termInput.value = pianoach.term;
				}
	// ריבית
if (pianoach.interest) {
   interestRateInput.value = pianoach.interest/100;
   compoundDoc.getElementById("kottoz").textContent = `לפי ריבית ${pianoach.interest}% שנתי:`;compoundWindow.hashev(0.4);
}
if (pianoach.dmey || pianoach.dmey===0) {
    const valueToSelect = pianoach.dmey.toString();
    const options = Array.from(DmeyNihulInput.options);
    const existingOption = options.find(opt => opt.value === valueToSelect);
    if (existingOption) {
        existingOption.selected = true;
    } else {
       if(valueToSelect<=2 && valueToSelect>=0){
        const option = document.createElement('option');
        option.value = valueToSelect;
        option.textContent = valueToSelect + '%';
        option.selected = true;
        DmeyNihulInput.appendChild(option);
       }
    }
}
  // הפעלת חישוב אם כל השדות מולאו
 if(transcript.includes('חשב') && !transcript.includes('מחשבונים')){
    compoundWindow.hashev(0.04)
  }
  }
function handleMenahalot(transcript) {
  const iframex = document.getElementById('ifrm');
  const menahalotDoc = iframex.contentWindow.document;
  const menahalotWindow = iframex.contentWindow;
  const rd1=menahalotDoc.getElementById('radio1');
  const rd2=menahalotDoc.getElementById('radio2');
  const selmenu1 = menahalotDoc.getElementById('selmen1');
  const selmenu2 = menahalotDoc.getElementById('selmen2');
	var input=''; 
 console.log(transcript);
if(transcript.includes("מול")){
 
  setTimeout(function() {

    menahalotDoc.getElementById('form2').style.display='flex';
	  menahalotDoc.getElementById('form1').style.display='none';
    const matchtext=transcript.split("מול");
    input=matchHevra(matchtext[0].trim());
    var match1 = gufmosdixA.find(name => name.includes(input));
    if(match1){
      rd2.checked=true; 
      selmenu1.value = match1;
      menahalotWindow.selchange();
    
      input=matchHevra(matchtext[1].trim());
      var match2 = gufmosdixA.find(name => name.includes(input));
      if(match1){
        selmenu2.value = match2;
      }  
        if(selmenu1.value && selmenu2.value){
          menahalotWindow.compare2();
          setTimeout(function() {
            iframex.contentWindow.scrollBy(0, window.innerHeight*0.8);
          }, 100);
        }
        return; 
     } 
     else{
       if(transcript.includes("מול")){
        input=matchHevra(transcript);
        var match = gufmosdixA.find(name => name.includes(input));
        if(match){
          selmenu2.value = match;
        }
        if(selmenu1.value && selmenu2.value){
          menahalotWindow.compare2();
          setTimeout(function() {
            iframex.contentWindow.scrollBy(0, window.innerHeight*0.8);
          }, 100);
        }
        return; 
      }
     }
  }, 100);
   
}

else if ((transcript.includes("שתי") && menahalotWindow.document.getElementById('mas').style.display==='none') || rd2.checked===true) {
		rd2.checked=true;
	menahalotDoc.getElementById('form2').style.display='flex';
	menahalotDoc.getElementById('form1').style.display='none';

	if (transcript.includes("מובילה") || transcript.includes("מול")) {
		if (transcript.includes("מובילה") && transcript.includes("מול")){
			const matchtext=transcript.split("מול");
			input=matchHevra(matchtext[0].trim());
			var match = gufmosdixA.find(name => name.includes(input));
      if(match){
			  selmenu1.value = match;
      }
			input=matchHevra(matchtext[1].trim());
			var match = gufmosdixA.find(name => name.includes(input));
      if(match){
			  selmenu2.value = match;
      }
		}
		else if(transcript.includes("מובילה")){
			input=matchHevra(transcript);
			var match = gufmosdixA.find(name => name.includes(input));
      if(match){
			  selmenu1.value = match;
      }
		}
		
	}
	if(transcript.includes("השווה") || transcript.includes("השוואה") || transcript.includes("בצע")
		||  transcript.includes("בצא")){
		const iframe = document.getElementById('ifrm');
      if(selmenu1.value && selmenu2.value){  
        menahalotWindow.compare2();
        iframe.contentWindow.scrollBy(0, window.innerHeight*0.8);
      }
		}

		if(transcript.includes("הדפס") || transcript.includes("pdf")){
        menahalotWindow.pdfDo();
		}
}
if (transcript.includes("מרובה") || rd1.checked===true) {
    const matchHev=matchHevra(transcript);
		rd1.checked=true;
		menahalotWindow.selchange()
    var sugMMen=menahalotDoc.getElementById('sugMMen');
    if(transcript.includes('סגור') || transcript.includes('אסתר') || transcript.includes('הסתר') ){
      
      if(menahalotDoc.getElementById('mas').style.display==='block'){
        menahalotDoc.getElementById('mas').style.display='none';
      }
      else  if(menahalotDoc.querySelector('.dropdown-menu').style.display==='block'){ 
        menahalotWindow.toggleDr();
      }
    }
    if (transcript.includes('הצג') || transcript.includes('בצק')){
      if( transcript.includes('מסלול') && menahalotWindow.document.getElementById('mas').style.display==='none' 
    && sugMMen.value!==''){
        showMaslul();
      }
      else if((transcript.includes('חבר') || transcript.includes('מנהל')) && menahalotWindow.document.getElementById('mas').style.display==='none'){
        menahalotWindow.toggleDr();
      }
    }

    
   
     if(matchHev ||  transcript.includes("כול") || transcript.includes("כל") 
    || transcript.includes("קול")){
      
       const checkboxes = menahalotDoc.querySelectorAll('.dropdown-menu input[type="checkbox"]');
       checkboxes.forEach((checkbox) => {
         if((transcript.includes("כל") || transcript.includes("כול") || transcript.includes("קול"))
           && checkbox.value.includes("all")){
            
            checkboxes.forEach((checkb) => {
              checkb.checked = false;
            });
            checkbox.checked = true;menahalotWindow.sfira();
         } 
         else if(checkbox.value.includes(matchHev)){
          checkboxes.forEach((checkb) => {
            if(checkb.value.includes("all") && checkb.checked === false){
              checkbox.checked = true;menahalotWindow.sfira();
            }
          });
          
         } 
        
     })

     }
    if (transcript.includes('מוצר')) {
      if (transcript.includes("השתלמות")) {
        sugMMen.selectedIndex = 1;
      } else if (transcript.includes("פנסיה")) {
        sugMMen.selectedIndex = 6;
      } else if (transcript.includes("גמל") && !transcript.includes("השקעה")) {
        sugMMen.selectedIndex = 2;
      } else if (transcript.includes("השקעה")) {
        sugMMen.selectedIndex = 3;
      } else if ((transcript.includes("חסכון") || transcript.includes("חיסכון")) && !transcript.includes("ילד")) {
        sugMMen.selectedIndex = 5;
      } else if (transcript.includes("ילד")) {
        sugMMen.selectedIndex = 4;
      }
      menahalotWindow.changeTheMuzar();
    }
    
    if(transcript.includes('מסלול')  && !transcript.includes('הצג')){
      const nummatch=matchNumber(transcript.replace('מסלול','').trim());
      if(nummatch && !transcript.includes('אחוז') && !transcript.includes('שיעור')){
        menahalotWindow.document.getElementById('selectShemkupa').selectedIndex=parseInt(nummatch)-1;
        menahalotWindow.document.getElementById('mas').style.display='none';
        menahalotWindow.changmoz()
    }
    }
  
  }

  if((transcript.includes("בצע") || transcript.includes("בצא") || transcript.includes("השווה"))
     && !transcript.includes('מחשבון')){
      menahalotWindow.dohash();menahalotWindow.scrollBy(0, 300);
  }

 
}
function handleSharp(transcript) {
        var sugmM=document.getElementById('sugM');
        if (transcript.includes("השתלמות")) {
            sugmM.selectedIndex=0;
        }
        else if (transcript.includes("פנסיה")) {
            sugmM.selectedIndex=4	;
	}
        else if (transcript.includes("גמל") && !transcript.includes("השקעה")) {sugmM.selectedIndex=1;
        }
        else if (transcript.includes("השקעה")) {
            sugmM.selectedIndex=2;
}
        else if (transcript.includes("חסכון") || transcript.includes("חיסכון")) {
            sugmM.selectedIndex=3;
}
            tablhasifot()
            window.scrollBy(0, window.innerHeight*0.8);
      }

function handleHashDmeyNihul(transcript) {
  const iframex = document.getElementById('ifrm');
  const dmeyNihultDoc = iframex.contentWindow.document;
  const dmeyNihulWindow = iframex.contentWindow;
  const rd1=dmeyNihultDoc.getElementById('rd1');
  const rd2=dmeyNihultDoc.getElementById('rd2');
  const rd3=dmeyNihultDoc.getElementById('rd3');
  const savingAmount=dmeyNihultDoc.getElementById('savingAmount');
  const depositAmount=dmeyNihultDoc.getElementById('depositAmount');
  const saving=dmeyNihultDoc.getElementById('saving');
  const deposit=dmeyNihultDoc.getElementById('deposit');
  const age=dmeyNihultDoc.getElementById('age');
  const alltoz=dmeyNihultDoc.getElementById("alltoz");
  const feeSaving1=dmeyNihultDoc.getElementById("feeSaving1");
  const feeDeposit1=dmeyNihultDoc.getElementById("feeDeposit1");
  const feeSaving2=dmeyNihultDoc.getElementById("feeSaving2");
  const feeDeposit2=dmeyNihultDoc.getElementById("feeDeposit2");
  const selecttoz=dmeyNihultDoc.getElementById("selecttoz");
  const pianoach=handleInputx(transcript);
  if (!pianoach) return;

  if (transcript.includes("סוג")){
    alltoz.style.display="none";
   if (transcript.includes("צבירה") && !transcript.includes("חודשי")) {rd1.checked=true;
   }
    else if ((transcript.includes("חודשי") || transcript.includes('הפקדה')) && !transcript.includes("צבירה")) {rd2.checked=true;
    }
    else if (transcript.includes("חודשי") && transcript.includes("צבירה")) {rd3.checked=true;
    }
    dmeyNihulWindow.updateFields();
  }
 
  if(pianoach.amount){
      savingAmount.value=pianoach.amount;
      alltoz.style.display="none";
    }
    if(pianoach.hodshi){
      depositAmount.value=pianoach.hodshi;
      alltoz.style.display="none";
    }
    if(pianoach.gil){
      age.value=pianoach.gil;
      alltoz.style.display="none";
    }
    if(pianoach.zvirakayam){
      feeSaving1.value=pianoach.zvirakayam;
      alltoz.style.display="none";
    }
    if(pianoach.zvirahadash){
      feeSaving2.value=pianoach.zvirahadash;
      alltoz.style.display="none";
    }
    if(pianoach.hafkadakayam){
      feeDeposit1.value=pianoach.hafkadakayam;
      alltoz.style.display="none";
    }
    if(pianoach.hafkadahadash){
     feeDeposit2.value=pianoach.hafkadahadash;
     alltoz.style.display="none";
    }
    if(pianoach.interest){
      selecttoz.value=pianoach.interest/100;
      if(!alltoz.style.display==="none"){
        dmeyNihulWindow.hashev(match.interest/100);
        dmeyNihultDoc.getElementById("kottoz").textContent = `לפי ריבית ${match.interest}% שנתי:`;
        if(window.innerWidth<400){ dmeyNihulWindow.scrollBy(0, 350);}}
    }
    if((transcript.includes("בצע") || transcript.includes("בצא") || transcript.includes("חשב")
    || transcript.includes("חישוב")) && !transcript.includes('מחשבון')){
    dmeyNihulWindow.hashev(0.04);dmeyNihulWindow.scrollBy(0, 300);
  }
  
}
function handleYaad(transcript) {
  const iframex = document.getElementById('ifrm');
  const yaadDoc = iframex.contentWindow.document;
  const yaadWindow = iframex.contentWindow;
  const targetAmount=yaadDoc.getElementById('targetAmount');
  const targetAmountSlider=yaadDoc.getElementById('targetAmount_slider');
  const initialAmount=yaadDoc.getElementById('initialAmount');
  const initialAmountSlider=yaadDoc.getElementById('initialAmount_slider');
  const interestRate=yaadDoc.getElementById('interestRate');
  const interestRateSlider=yaadDoc.getElementById('interestRate_slider');
  const managementFee=yaadDoc.getElementById('managementFee');
  const managementFeeSlider=yaadDoc.getElementById('managementFee_slider');
  const years=yaadDoc.getElementById('years');
  const yearsSlider=yaadDoc.getElementById('years_slider');
  if(transcript.includes("דמי ניהול") || transcript.includes("ניהול")){
      const match=handleInput(transcript)
      managementFee.value = match.dmey;
      managementFeeSlider.value = match.dmey;
      if(window.innerWidth<400){
        managementFeeSlider.scrollIntoView({ behavior: "smooth", block: "start" })};
    }
    if((transcript.includes("יעד") || transcript.includes("יד")) && transcript.includes("סכום")){
      const match=handleInput(transcript)
      targetAmount.value = match.amount;
      targetAmountSlider.value = match.amount;
    }
    if(transcript.includes("התחל")  && transcript.includes("סכום")){
      const match=handleInput(transcript)
      initialAmount.value = match.amount;
      initialAmountSlider.value = match.amount;
      if(window.innerWidth<400){
        initialAmount.scrollIntoView({ behavior: "smooth", block: "start" })};
    }
    if(transcript.includes("ריבית") ){
      const match=handleInput(transcript);
      interestRate.value = match.interest;
      interestRateSlider.value = match.interest;
      if(window.innerWidth<400){
        interestRateSlider.scrollIntoView({ behavior: "smooth", block: "start" })};
    }
    if(transcript.includes("תקופ")){
      const match=handleInput(transcript);
      years.value = match.term;
      yearsSlider.value = match.term;
    }
    if(transcript.includes("בצע") || transcript.includes("בצא") || transcript.includes("חשב")
      || transcript.includes("חישוב")){
      yaadWindow.calculateMonthlyDeposit();
      yaadDoc.getElementById("result").scrollIntoView({ behavior: "smooth", block: "start" });
    }
//yaadWindow.calculateMonthlyDeposit()
}
function handleHasifot(transcript) {
  const iframex = document.getElementById('ifrm');
  const hasifotDoc = iframex.contentWindow.document;
  const hasifotWindow = iframex.contentWindow;
  const sugmM = hasifotDoc.getElementById('product');
  const stocks = hasifotDoc.getElementById('stocks');
  const abroad = hasifotDoc.getElementById('abroad');
  const currency = hasifotDoc.getElementById('currency');
  // בחירת מוצר
  if (transcript.includes('מוצר')) {
    if (transcript.includes("השתלמות")) {
      sugmM.selectedIndex = 1;
    } else if (transcript.includes("פנסיה")) {
      sugmM.selectedIndex = 3;
    } else if (transcript.includes("גמל") && !transcript.includes("השקעה")) {
      sugmM.selectedIndex = 2;
    } else if (transcript.includes("השקעה")) {
      sugmM.selectedIndex = 5;
    } else if ((transcript.includes("חסכון") || transcript.includes("חיסכון")) && !transcript.includes("ילד")) {
      sugmM.selectedIndex = 4;
    } else if (transcript.includes("ילד")) {
      sugmM.selectedIndex = 6;
    }
    if (sugmM.value !== '') {
      hasifotWindow.submitForm(sugmM);
    }
  }
  // פונקציה עזר להצבת אחוזים
  function setSelectByPercentage(transcript, element) {
    if (transcript.includes('עד חמש עשרה') || transcript.includes('15')) {
      element.selectedIndex = 1;
    } else if (transcript.includes('עד שלושים') || transcript.includes('30')) {
      element.selectedIndex = 2;
    } else if (transcript.includes('עד חמישים') || transcript.includes('50')) {
      element.selectedIndex = 3;
    } else if ((transcript.includes('עד שיבעים') || transcript.includes('עד שבעים') || transcript.includes('70')) && !transcript.includes('מעל')) {
      element.selectedIndex = 4;
    } else if (transcript.includes('מעל')) {
      element.selectedIndex = 5;
    }
    if (element.value !== '') {
      hasifotWindow.doTheCircle(element);
    }
  }
  // מניות
  if (transcript.includes('מניות') && sugmM.value !== '') {
    setSelectByPercentage(transcript, stocks);
    hasifotWindow.hasifch(stocks);hasifotWindow.submitForm(stocks)
  }
  // חול
  if (transcript.includes('חול') && sugmM.value !== '') {
    setSelectByPercentage(transcript, abroad);
    hasifotWindow.hasifch(abroad);hasifotWindow.submitForm(abroad)
  }
  // חוץ (מט"ח)
  if ((transcript.includes('חוץ')|| transcript.includes('מטח')) && sugmM.value !== '') {
    setSelectByPercentage(transcript, currency);
    hasifotWindow.hasifch(currency);hasifotWindow.submitForm(currency)
  }
}
function extractAmounta(text) {
  const units = {
    "אפס": 0, "אפסים": 0,
    "אחד": 1, "אחת": 1,
    "שתיים": 2, "שניים": 2, "שתי": 2, "שני": 2, "שניי": 2,
    "שלוש": 3, "שלושה": 3, "שלושת": 3,
    "ארבע": 4, "ארבעה": 4, "ארבעת": 4,
    "חמש": 5, "חמישה": 5, "חמשת": 5,
    "שש": 6, "שישה": 6, "ששת": 6,
    "שבע": 7, "שבעה": 7, "שבעת": 7,
    "שמונה": 8, "שמונת": 8,
    "תשע": 9, "תשעה": 9, "תשעת": 9,
    "עשר": 10, "עשרה": 10, "עשרת": 10,
    "אלפיים": 2000
  };
  const teens = {
    "אחת עשרה": 11, "אחד עשר": 11, "שתים עשרה": 12, "שניים עשר": 12,
    "שלוש עשרה": 13, "שלושה עשר": 13, "ארבע עשרה": 14, "ארבעה עשר": 14,
    "חמש עשרה": 15, "חמישה עשר": 15, "שש עשרה": 16, "שישה עשר": 16,
    "שבע עשרה": 17, "שבעה עשר": 17, "שמונה עשרה": 18, "שמונה עשר": 18,
    "תשע עשרה": 19, "תשעה עשר": 19
  };
  const tens = {
    "עשרים": 20, "שלושים": 30, "ארבעים": 40,
    "חמישים": 50, "שישים": 60, "שבעים": 70,
    "שמונים": 80, "תשעים": 90
  };
  const hundreds = {
    "מאה": 100, "מאתיים": 200, "שלוש מאות": 300, "ארבע מאות": 400,
    "חמש מאות": 500, "שש מאות": 600, "שבע מאות": 700,
    "שמונה מאות": 800, "תשע מאות": 900
  };
  const fractions = { "חצי": 0.5, "שליש": 1 / 3, "שלושת רבעי": 0.75, "רבע": 0.25 };
  const multipliers = { "כפול": true, "פי": true };

  function parseGroup(words) {
    let total = 0, currentGroup = 0, multiplyNext = 1;
    for (let i = 0; i < words.length; i++) {
      let word = words[i].trim();
      if (!word) continue;
      if (multipliers[word]) { multiplyNext = currentGroup || 1; currentGroup = 0; continue; }
      if (/^\d+$/.test(word)) { currentGroup += parseInt(word); continue; }
      if (i + 1 < words.length) {
        const twoWords = word + ' ' + words[i + 1];
        if (teens[twoWords]) { currentGroup += teens[twoWords]; i++; continue; }
        if (hundreds[twoWords]) { currentGroup += hundreds[twoWords]; i++; continue; }
      }
      if (units[word]) currentGroup += units[word];
      else if (tens[word]) currentGroup += tens[word];
      else if (hundreds[word]) currentGroup += hundreds[word];
      else if (fractions[word]) {
        if (currentGroup === 0) currentGroup = 1;
        total += currentGroup * fractions[word];
        currentGroup = 0;
      }
    }
    total += currentGroup;
    total *= multiplyNext;
    return total;
  }

  const cleanedText = text.replace(/[,\-]/g, ' ').replace(/\s+/g, ' ').replace(/(^ו)|(\sו)/g, ' ').trim();
  const words = cleanedText.split(' ');
  let total = 0;

  // מפצל לפי "אלף", תומך בכמה מופעים
  let i = 0;
  let currentWords = [];

  while (i < words.length) {
    if (words[i] === 'אלף' || words[i] === 'אלפים') {
      const before = parseGroup(currentWords);
      total += (before === 0 ? 1 : before) * 1000;
      currentWords = [];
    } else {
      currentWords.push(words[i]);
    }
    i++;
  }

  total += parseGroup(currentWords);
  return total || null;
}

function extractInterestRatea(text) {
  text = text.replaceAll("אחוזים", "אחוז").replaceAll("%", "אחוז").trim();
const wordMap = {
  "אפס":0,
  "אחת": 1, "אחד": 1,
  "שתיים": 2, "שניים": 2, "שני": 2, "שניי": 2,
  "שלוש": 3, "שלושה": 3, "ארבע": 4, "ארבעה": 4,
  "חמש": 5, "חמישה": 5, "שש": 6, "שישה": 6,
  "שבע": 7, "שבעה": 7, "שמונה": 8,
  "תשע": 9, "תשעה": 9
};
function getDecimalWord(word) {
  return wordMap[word] ?? null;
}
// תבנית: "שלושה נקודה חמש"
const match = text.match(/(אחת|אחד|שתיים|שניים|שלוש|שלושה|ארבע|ארבעה|חמש|חמישה|שש|שישה|שבע|שבעה|שמונה|תשע|תשעה)\s*נקודה\s*(אחת|אחד|שתיים|שניים|שלוש|שלושה|ארבע|ארבעה|חמש|חמישה|שש|שישה|שבע|שבעה|שמונה|תשע|תשעה)/);
if (match) {
  const intPart = getDecimalWord(match[1]);
  const decimalPart = getDecimalWord(match[2]);
  if (intPart != null && decimalPart != null) {
    return parseFloat(`${intPart}.${decimalPart}`);
  }
}
// תבנית: מספר ספרתי רגיל
const digitMatch = text.match(/(\d+(?:\.\d+)?)\s*אחוז/);
if (digitMatch) return parseFloat(digitMatch[1]);
// תבנית: "שישה אחוז"
const wordOnlyMatch = text.match(/(אחת|אחד|שתיים|שניים|שני|שלוש|שלושה|ארבע|ארבעה|חמש|חמישה|שש|שישה|שבע|שבעה|שמונה|תשע|תשעה)\s*אחוז/);
if (wordOnlyMatch) {
  const val = getDecimalWord(wordOnlyMatch[1]);
  if (val != null) return val;
}
return null;
  }
function handleInput(text) {
// חילוץ ממוקד לפי הקשר ולא לפי סדר בטקסט
const hadMatch = text.match(/(?:סכום\s+)?חד\s*פעמי\s+(.*?)(?=(סכום|חודשי|ריבית|תקופה|גרייס|$))/);
const hodshiMatch = text.match(/(?:סכום\s+)?חודשי\s+(.*?)(?=(סכום|חד\s*פעמי|ריבית|תקופה|גרייס|$))/);
const amountMatch = text.match(/(?:סכום\s+)(?!חודשי)(?!חד\s*פעמי)(.*?)(?=(חד\s*פעמי|חודשי|ריבית|תקופה|גרייס|$))/);
const interestMatch = text.match(/(?:ריבית\s*(של)?\s*)(.*?)(?=(סכום|תקופה|גרייס|$))/);
const termMatch = text.match(/(?:תקופ[ה|ת]\s*(של)?\s*)(.*?)(?=(ריבית|סכום|גרייס|$))/);
const graceMatch = text.match(/(?:גרייס\s*(של)?\s*)(.*?)(?=(ריבית|תקופה|סכום|$))/);
const dmeyMatch = text.match(/(?:ניהול\s*(של)?\s*)(.*?)(?=(ריבית|תקופה|סכום|$))/);
//const tesuaMatch = text.match(/(?:תשוא[אה]?|תשועה)\s*(של)?\s*(.*?)(?=(ריבית|תקופה|סכום|$))/);
  // טקסטים
const hadText = hadMatch ? hadMatch[1] : '';
const hodshiText = hodshiMatch ? hodshiMatch[1] : '';
const amountText = amountMatch ? amountMatch[1] : '';
const interestText = interestMatch ? interestMatch[2] : '';
const dmeyText = dmeyMatch ? dmeyMatch[2] : '';
const termText = termMatch ? termMatch[2] : '';
const graceText = graceMatch ? graceMatch[2] : '';
// המרות
const had = extractAmounta(hadText);
const hodshi = extractAmounta(hodshiText);
const amount = extractAmounta(amountText);
const interest = extractInterestRatea(interestText);
const term = extractAmounta(termText);
const grace = extractAmounta(graceText);
const dmey = extractInterestRatea(dmeyText);
  return {
  had: had,
  hodshi: hodshi,
  amount: amount,
  interest: interest,
  term: term,
  grace: grace,
  dmey: dmey,
};
}
function matchHevra(transcript){
	if (transcript.includes("מגדל")) {return "מגדל";}
	else if (transcript.includes("הראל")) {return  "הראל";}
	else if (transcript.includes("כלל")) {return  "כלל";}
	else if (transcript.includes("מנורה")) {return  "מנורה";}
	else if (transcript.includes("אלטשולר")) {return "אלטשולר";}
	else if (transcript.includes("פניקס")) {return  "פניקס";}
	else if (transcript.includes("מור")) {return  "מור";}
	else if (transcript.includes("ילין")) {return  "ילין";}
	else if (transcript.includes("אנליסט")) {return  "אנליסט";}
	else if (transcript.includes("מיטב")) {return  "מיטב";}
	else if (transcript.includes("אינפי") || transcript.includes("אנפי")) {return "אינפיניטי";}
}
function handleSheelon(transcript){
  const iframeWindow=document.getElementById('ifrm').contentWindow;
  const sheala=matchSheelon(transcript);

 if(sheala.rishona && sheala.rishonaTshuva){
    if(!transcript.includes('שישית')){
  iframeWindow.document.querySelector(`input[name="${sheala.rishona}"]`) .scrollIntoView({ behavior: "smooth", block: "start" });
 }
    iframeWindow.document.querySelector(`input[name="${sheala.rishona}"][value="${sheala.rishonaTshuva}"]`).checked = true;
  }
  if(sheala.shniya && sheala.shniyaTshuva){
    if(!transcript.includes('שישית')){
  iframeWindow.document.querySelector(`input[name="${sheala.shniya}"]`) .scrollIntoView({ behavior: "smooth", block: "start" });
 }
    iframeWindow.document.querySelector(`input[name="${sheala.shniya}"][value="${sheala.shniyaTshuva}"]`).checked = true;
  }
  if(sheala.shlishit && sheala.shlishitTshuva){
    if(!transcript.includes('שישית')){
  iframeWindow.document.querySelector(`input[name="${sheala.shlishit}"]`) .scrollIntoView({ behavior: "smooth", block: "start" });
 }
    iframeWindow.document.querySelector(`input[name="${sheala.shlishit}"][value="${sheala.shlishitTshuva}"]`).checked = true;
  }
  if(sheala.reviyit && sheala.reviyitTshuva){
    if(!transcript.includes('שישית')){
  iframeWindow.document.querySelector(`input[name="${sheala.reviyit}"]`) .scrollIntoView({ behavior: "smooth", block: "start" });
 }
    iframeWindow.document.querySelector(`input[name="${sheala.reviyit}"][value="${sheala.reviyitTshuva}"]`).checked = true;
  }
  if(sheala.hamishit && sheala.hamishitTshuva){
    if(!transcript.includes('שישית')){
  iframeWindow.document.querySelector(`input[name="${sheala.hamishit}"]`) .scrollIntoView({ behavior: "smooth", block: "start" });
 }
    iframeWindow.document.querySelector(`input[name="${sheala.hamishit}"][value="${sheala.hamishitTshuva}"]`).checked = true;
  }
  if(sheala.shishit && sheala.shishitTshuva){
    if(!transcript.includes('שישית')){
  iframeWindow.document.querySelector(`input[name="${sheala.shishit}"]`) .scrollIntoView({ behavior: "smooth", block: "start" });
 }
    iframeWindow.document.querySelector(`input[name="${sheala.shishit}"][value="${sheala.shishitTshuva}"]`).checked = true;
  }

  if(transcript.includes('חשב') || transcript.includes('בצע')){
    iframeWindow.calculateRisk();
    iframeWindow.scrollTo(0, 0);
  }
 }
 function matchSheelon(text){
  const rishonaMatch = text.match(/(?:ראשונה\s*)(.*?)(?=(שניה|שלישית|רביעית|חמישית|שישית|$))/);
  const shniyaMatch = text.match(/(?:שניה\s*)(.*?)(?=(ראשונה|שלישית|רביעית|חמישית|שישית|$))/);
  const shlishitMatch = text.match(/(?:שלישית\s*)(.*?)(?=(ראשונה|שניה|רביעית|חמישית|שישית|$))/);
  const reviyitMatch = text.match(/(?:רביעית\s*)(.*?)(?=(שניה|שלישית|ראשונה|חמישית|שישית|$))/);
  const hamishitMatch = text.match(/(?:חמישית\s*)(.*?)(?=(שניה|שלישית|רביעית|ראשונה|שישית|$))/);
  const shishitMatch = text.match(/(?:שישית\s*)(.*?)(?=(שניה|שלישית|רביעית|חמישית|ראשונה|$))/);
  
  const rishonaText = rishonaMatch ? rishonaMatch[0] : '';
  const shniyaText =shniyaMatch ? shniyaMatch[0] : '';
  const shilishitText =shlishitMatch ? shlishitMatch[0] : '';
  const reviyitText =reviyitMatch ? reviyitMatch[0] : '';
  const hamishitText =hamishitMatch ? hamishitMatch[0] : '';
  const shishitText =shishitMatch ? shishitMatch[0] : '';

  const rishona=matchSheala(rishonaText);
  const shniya=matchSheala(shniyaText);
  const shlishit=matchSheala(shilishitText);
  const reviyit=matchSheala( reviyitText);
  const hamishit=matchSheala(hamishitText);
  const shishit=matchSheala(shishitText);

  const rishonaTshuva=matchTeshuva(rishonaText);
  const shniyaTshuva=matchTeshuva(shniyaText);
  const shlishitTshuva=matchTeshuva(shilishitText);
  const reviyitTshuva=matchTeshuva( reviyitText);
  const hamishitTshuva=matchTeshuva(hamishitText);
  const shishitTshuva=matchTeshuva(shishitText);

  
  return{
    rishona:rishona,
    shniya:shniya,
    shlishit:shlishit,
    reviyit:reviyit,
    hamishit:hamishit,
    shishit:shishit,
    rishonaTshuva:rishonaTshuva,
    shniyaTshuva:shniyaTshuva,
    shlishitTshuva:shlishitTshuva,
    reviyitTshuva:reviyitTshuva,
    hamishitTshuva:hamishitTshuva,
    shishitTshuva:shishitTshuva


  }

 }
function matchTeshuva(transcript){ 
  if(transcript.includes('שניים')||transcript.includes('שתיים')){
    return 2;
  }
  else if(transcript.includes('אחד')||transcript.includes('אחת')){
    return 1;
  }
  else if(transcript.includes('שלוש')){
    return 3;
  }
}
function matchSheala(transcript){

  if(transcript.includes('ראשונה')){
    return 'q1';}
    else if(transcript.includes('חמישית')){
    return 'q5'}
     else if(transcript.includes('שישית')){
    return 'q6'}
    else if(transcript.includes('שניה')){
    return 'q2'}
    else if(transcript.includes('שלישית')){
    return 'q3'}
    else if(transcript.includes('רביעית')){
    return 'q4'}
}
function handleMeshulav(transcript){
  const iframe=document.getElementById('ifrm');
  const iframeWindow=iframe.contentWindow;
  const sugMMen=iframeWindow.document.getElementById('sugMMen');
  const percentage=iframeWindow.document.getElementById('percentage');
  const btnDo=iframeWindow.document.getElementById('btnDo');
  if (transcript.includes('מוצר')) {
    if (transcript.includes("השתלמות")) {
      sugMMen.selectedIndex = 1;
    } else if (transcript.includes("פנסיה")) {
      sugMMen.selectedIndex = 5;
    } else if (transcript.includes("גמל") && !transcript.includes("השקעה")) {
      sugMMen.selectedIndex = 2;
    } else if (transcript.includes("השקעה")) {
      sugMMen.selectedIndex = 3;
    } else if ((transcript.includes("חסכון") || transcript.includes("חיסכון")) && !transcript.includes("ילד")) {
      sugMMen.selectedIndex = 4;
    }
    if (sugMMen.value !== '') {
      iframeWindow.chngTik(); iframeWindow.addMaslulim();
      showMaslul();
  }
}
if((transcript.includes('הצג') || transcript.includes('מסלול')) && iframeWindow.document.getElementById('mas').style.display==='none' ){
  showMaslul();
}
else if(transcript.includes('הסתר') || transcript.includes('אסתר')){
  iframeWindow.document.getElementById('mas').style.display='none';
}
 if(transcript.includes('מסלול')  && !transcript.includes('הצג')){
     const nummatch=matchNumber(transcript.replace('מסלול','').trim());
     if(nummatch && !transcript.includes('אחוז') && !transcript.includes('שיעור')){
     iframeWindow.document.getElementById('selectShemkupa').selectedIndex=parseInt(nummatch)-1;
     iframeWindow.document.getElementById('mas').style.display='none';
   }
   }
  if(transcript.includes('שיעור' ) || transcript.includes('אחוז')){
     const transcripta = transcript.replace(/שיעור|אחוז|%/g, '').trim();
     const shiur=extractAmounta(transcripta);    if(shiur && parseFloat(shiur)<=100){
       percentage.value=shiur;
     }
     }
   if(transcript.includes('הוסף')  || transcript.includes('אוסף')){
    iframeWindow.addRow(btnDo)
  }
  if(transcript.includes('הפעל') || transcript.includes('בצע')){
    iframeWindow.submitForm();
  }
  if((transcript.includes('מיין') ||transcript.includes('מעיין'))  && iframeWindow.document.getElementById('miyunshana') ){
    if(transcript.includes('שנה') || transcript.includes('1')){
      iframeWindow.sortTableX(iframeWindow.document.getElementById('miyunshana'))
    }
    else if(transcript.includes('שלוש') || transcript.includes('3')){
      iframeWindow.sortTableX(iframeWindow.document.getElementById('miyunshalosh'))
    }
    else if(transcript.includes('חמש') || transcript.includes('5')){
      iframeWindow.sortTableX(iframeWindow.document.getElementById('miyunhamesh'))
    }
  }
  if(transcript.includes('נקה')){
    iframeWindow.chngTik(); handleSearchFromVoice("הפעל");
  }
}
function matchNumber(transcript) {
  transcript = transcript.trim();
  // בדיקה אם יש מספר 1–16, תוך הימנעות ממספרים דומים כמו "11", "12" וכו'
  if (transcript.includes('1') && !transcript.match(/1[1-6]/)) return 1;
  if (transcript.includes('2') && !transcript.includes('12')) return 2;
  if (transcript.includes('3') && !transcript.includes('13')) return 3;
  if (transcript.includes('4') && !transcript.includes('14')) return 4;
  if (transcript.includes('5') && !transcript.includes('15')) return 5;
  if (transcript.includes('6') && !transcript.includes('16')) return 6;
  if (transcript.includes('7')) return 7;
  if (transcript.includes('8')) return 8;
  if (transcript.includes('9')) return 9;
  if (transcript.includes('10')) return 10;
  if (transcript.includes('11')) return 11;
  if (transcript.includes('12')) return 12;
  if (transcript.includes('13')) return 13;
  if (transcript.includes('14')) return 14;
  if (transcript.includes('15')) return 15;
  if (transcript.includes('16')) return 16;
  // מילים
  if (!transcript.includes('עשר') && !transcript.includes('עשרה')) {
    if (transcript.includes('אחת') || transcript.includes('אחד')) return 1;
    if (transcript.includes('שניים') || transcript.includes('שתיים')) return 2;
    if (transcript.includes('שלוש')) return 3;
    if (transcript.includes('ארבע')) return 4;
    if (transcript.includes('חמש')) return 5;
    if (transcript.includes('שש')) return 6;
    if (transcript.includes('שבע')) return 7;
    if (transcript.includes('שמונה')) return 8;
    if (transcript.includes('תשע')) return 9;
  }
  if (transcript.includes('עשר') || transcript.includes('עשרה')) {
    if (transcript.includes('אחת') || transcript.includes('אחד')) return 11;
    if (transcript.includes('שניים') || transcript.includes('שתיים')) return 12;
    if (transcript.includes('שלוש') || transcript.includes('שלושה')) return 13;
    if (transcript.includes('ארבע') || transcript.includes('ארבעה')) return 14;
    if (transcript.includes('חמש') || transcript.includes('חמישה')) return 15;
    if (transcript.includes('שש') || transcript.includes('שישה')) return 16;
    if (!transcript.match(/(אחת|אחד|שניים|שתיים|שלוש|ארבע|חמש|שש)/)) return 10;
  }
  return null; // לא זוהה מספר
}
function showMaslul(){
  var maslul;
  const iframe=document.getElementById('ifrm');
  const iframeWindow=iframe.contentWindow;
  
  maslul=iframeWindow.document.getElementById('selectShemkupa');  
  var mas=
     iframeWindow.document.getElementById('mas');
     mas.style.display='block';
var count=1;
  maslul.querySelectorAll("option").forEach(option => {
    mas.innerHTML+=`
    <label style='display:block'>${count}.${option.textContent}
    </label>`;
 count++;
  });
}
function handleInputx(text) {
// חילוץ ממוקד לפי הקשר ולא לפי סדר בטקסט
const hadMatch = text.match(/(?:סכום\s+)?חד\s*פעמי\s+(.*?)(?=(סכום|חודשי|ריבית|תקופה|דמי|בצע|חשב|תשלום|$))/);
const hodshiMatch = text.match(/(?:סכום\s+)?חודשי\s+(.*?)(?=(סכום|חד\s*פעמי|ריבית|תק|ופה|גיל|גרייס|דמי|$))/);
const amountMatch = text.match(/(?:סכום\s+)(?!חודשי)(?!חד\s*פעמי)(.*?)(?=(חד\s*פעמי|חודשי|ריבית|גיל|בצע|חשב|תקופה|גרייס|דמי|$))/);
const interestMatch = text.match(/(?:ריבית\s*(של)?\s*)(.*?)(?=(סכום|בצע|חשב|תקופה|גרייס|$))/);
const termMatch = text.match(/(?:תקופ[ה|ת]\s*(של)?\s*)(.*?)(?=(ריבית|סכום|בצע|חשב|חודשים|גרייס|$))/);
const graceMatch = text.match(/(?:גרייס\s*(של)?\s*)(.*?)(?=(ריבית|חודשים|בצע|חשב|תקופה|סכום|$))/);
const dmeyMatch = text.match(/(?:ניהול\s*(של)?\s*)(.*?)(?=(ריבית|בצע|חשב|תקופה|סכום|$))/);
const zvirakayammatch =
text.match(/דמי\s+ניהול\s+(?:מ)?צבירה\s+קיים\s+(.*?)(?=(סכום|חודשי|ריבית|תקופה|דמי|בצע|חשב|תשלום|$))/);
const zvirahadashmatch = text.match(/דמי\s+ניהול\s+(?:מ)?צבירה\s+חדש\s+(.*?)(?=(סכום|חודשי|ריבית|תקופה|דמי|בצע|חשב|תשלום|$))/);
const hafkadakayammatch = text.match(/דמי\s+ניהול\s+(?:מה)?(?:ה)?פקדה\s+קיים\s+(.*?)(?=(סכום|חודשי|ריבית|תקופה|דמי|בצע|חשב|תשלום|$))/);
const hafkadahadashmatch = text.match(/דמי\s+ניהול\s+(?:מה)?(?:ה)?פקדה\s+חדש\s+(.*?)(?=(סכום|חודשי|ריבית|תקופה|דמי|בצע|חשב|תשלום|$))/);
  const gilMatch = text.match(/(?:גיל\s*(של)?\s*)(.*?)(?=(ריבית|שנים|דמי|תקופה|סכום|$))/);
//const tesuaMatch = text.match(/(?:תשוא[אה]?|תשועה)\s*(של)?\s*(.*?)(?=(ריבית|תקופה|סכום|$))/);
  // טקסטים
const hadText = hadMatch ? hadMatch[1] : '';
const hodshiText = hodshiMatch ? hodshiMatch[1] : '';
const amountText = amountMatch ? amountMatch[1] : '';
const interestText = interestMatch ? interestMatch[2] : '';
const dmeyText = dmeyMatch ? dmeyMatch[2] : '';
const termText = termMatch ? termMatch[2] : '';
const graceText = graceMatch ? graceMatch[2] : '';
const zvirakayamText = zvirakayammatch ? zvirakayammatch[1] : '';
const zvirahadashText = zvirahadashmatch ? zvirahadashmatch[1] : '';
const hafkadakayamText = hafkadakayammatch ? hafkadakayammatch[1] : '';
const hafkadahadashText = hafkadahadashmatch ? hafkadahadashmatch[1] : '';
const gilText = gilMatch ? gilMatch[2] : '';
// המרות
const had = extractAmounta(hadText);
const hodshi = extractAmounta(hodshiText);
const amount = extractAmounta(amountText);
const interest = extractInterestRatea(interestText);
const term = extractAmounta(termText);
const grace = extractAmounta(graceText);
const dmey = extractInterestRatea(dmeyText);
const zvirakayam = extractInterestRatea(zvirakayamText);
const zvirahadash = extractInterestRatea(zvirahadashText);
const hafkadakayam = extractInterestRatea(hafkadakayamText);
const hafkadahadash = extractInterestRatea(hafkadahadashText);
  const gil = extractAmounta(gilText);
  return {
  dmey: dmey,
  zvirakayam: zvirakayam,
  zvirahadash: zvirahadash,
  had: had,
  hodshi: hodshi,
  amount: amount,
  interest: interest,
  term: term,
  grace: grace,
  hafkadakayam:
  hafkadakayam,
  hafkadahadash:
  hafkadahadash,
  gil:gil
};
}
