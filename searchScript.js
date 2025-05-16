const data = [
    'מחשבון ריבית דריבית', 'סימולטור הלוואות', 'מחשבון השוואת דמי ניהול',
    'השוואת חברות', 'קופות לפי חשיפות', 'שאלון סיכון',
    'מידע מקצועי', 'מדד השירות', 'מדד הפנדינג', ];

const searchBox = document.getElementById("searchBox");
const searchResults = document.getElementById("searchResults");

searchBox.addEventListener("input", function() {
    const query = this.value.toLowerCase();
    searchResults.innerHTML = "";

    if (query.trim() === "") {
        searchResults.style.display = "none";
        return;
    }

    const filteredResults = data.filter(item => item.toLowerCase().includes(query));

    if (filteredResults.length === 0) {
        searchResults.style.display = "none";
        return;
    }

    filteredResults.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;

        li.addEventListener("click", () => handleSearchSelection(item));

        searchResults.appendChild(li);
    });

    searchResults.style.display = "block";
});

// **הפעלת פונקציה לפי הבחירה**
function handleSearchSelection(selectedText) {
    searchBox.value = selectedText; // הכנסת הבחירה לשדה החיפוש
    searchResults.style.display = "none"; // הסתרת התוצאות

    console.log("המשתמש בחר:", selectedText);

    // **בחירת פעולה בהתאם לטקסט שנבחר**
    switch (selectedText) {
    case "מחשבון ריבית דריבית":
searchBox.value ='';
   showSearch();
   hideTkufa();hideAllimages();showIframe('ribitderibit.html') ;
            break;
            case "מחשבון אבטלה לעצמאים":
    searchBox.value ='';
   showSearch();
   hideTkufa();hideAllimages();showIframe('pensiaLeAzmaim.html') ;
            break;
   case "קופות לפי חשיפות":
   searchBox.value ='';
   showSearch();hideAllimages();
   showIframe('hasifotMeshulav.html')
            break;
    case 'שאלון סיכון':
      searchBox.value ='';
      showSearch();
      hideTkufa();hideAllimages();
      showIframe('riskQuest.html')
      break;
     case 'מדד השירות' :
       searchBox.value ='';
       showSearch();
       hideTkufa();hideAllimages();
       showIframe('madadHasherut.html');
       break;
      case 'מדד הפנדינג':
      searchBox.value ='';
      showSearch();
      hideTkufa();hideAllimages();
      showIframe('madadhpending.html')
      break;
            
   case "סימולטור הלוואות":
    searchBox.value ='';
    showSearch();
    hideTkufa();hideAllimages();
    showIframe('loan.html')
            break;
 case "מחשבון השוואת דמי ניהול":
  searchBox.value ='';
  showSearch();
  hideTkufa();hideAllimages();
  showIframe('hashDmeyNihul.html');
            break;
 case 'מידע מקצועי':
 searchBox.value ='';
 showSearch();
 hideTkufa();hideAllimages();
  showIframe('meidaMikzoei.html');
  break;
  
 case "השוואת חברות":
  searchBox.value ='';
  showSearch();
  hideTkufa();hideAllimages();
  showIframe('hashvaotRikuz.html');
            break;
        default:
            console.log("אין פונקציה מוגדרת לבחירה הזו.");
    }
}

// **פונקציות לדוגמא**



// **הסתרת הרשימה בלחיצה מחוץ לחיפוש**
document.addEventListener("click", function(event) {
    if (!searchBox.contains(event.target) && !searchResults.contains(event.target)) {
        searchResults.style.display = "none";
    }
});
const clearSearch = document.getElementById("clearSearch");



searchBox.addEventListener("input", function () {
    clearSearch.style.display = this.value ? "block" : "none";
});
