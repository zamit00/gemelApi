# 🎬 Video Editor - עורך וידאו מתקדם

מערכת מקיפה לעריכת וידאו עם יכולות מתקדמות, הכוללת כלי Python וממשק אינטרנט.

## ✨ יכולות

### 🐍 Python Video Editor (`video_editor.py`)
- **חיתוך וידאו** - חיתוך קטעים ספציפיים
- **חיבור וידאו** - חיבור מספר קטעי וידאו
- **הוספת טקסט** - כתוביות ותוויות מותאמות אישית
- **שינוי רזולוציה** - התאמה לפורמטים שונים
- **שינוי מהירות** - האצה והאטה
- **אפקטי Fade** - מעברים חלקים
- **חילוץ אודיו** - הפרדת הקול מהוידאו
- **מוזיקת רקע** - הוספת אודיו נוסף
- **מצגת תמונות** - יצירת וידאו מתמונות
- **עיבוד אצווה** - עיבוד מרובה קבצים

### 🌐 Web Video Editor (`video_editor_web.html`)
- **ממשק גרפי מתקדם** - עיצוב מודרני ונוח
- **גרירה ושחרור** - העלאת קבצים פשוטה
- **תצוגה מקדימה** - צפייה בוידאו בזמן אמת
- **ציר זמן** - ניווט ועריכה ויזואלית
- **אפקטים בזמן אמת** - תצוגה מקדימה מיידית
- **קיצורי מקלדת** - עבודה מהירה ויעילה

## 🚀 התקנה ושימוש

### דרישות מערכת
```bash
Python 3.7+
pip install moviepy opencv-python
```

### שימוש בסקריפט Python

#### 1. שימוש אינטראקטיבי
```bash
python video_editor.py
```

#### 2. שורת פקודה
```bash
# חיתוך וידאו
python video_editor.py --input video.mp4 --operation cut --start 10 --end 30

# הוספת טקסט
python video_editor.py --input video.mp4 --operation text --text "שלום עולם" --position 100 100

# שינוי רזולוציה
python video_editor.py --input video.mp4 --operation resize --width 1280 --height 720

# שינוי מהירות
python video_editor.py --input video.mp4 --operation speed --speed 2.0

# הוספת אפקטי fade
python video_editor.py --input video.mp4 --operation fade --fade-in 2 --fade-out 2
```

#### 3. שימוש בקוד Python
```python
from video_editor import VideoEditor

editor = VideoEditor()

# חיתוך וידאו
editor.cut_video("input.mp4", start_time=10, end_time=30)

# הוספת טקסט
editor.add_text("input.mp4", "Hello World!", position=(100, 100))

# חיבור וידאו
editor.concatenate_videos(["clip1.mp4", "clip2.mp4", "clip3.mp4"])
```

### שימוש בממשק האינטרנט

1. פתח את הקובץ `video_editor_web.html` בדפדפן
2. גרור ושחרר קובץ וידאו או לחץ "בחר קובץ וידאו"
3. השתמש בכלי העריכה השונים
4. הורד את הוידאו המעובד

## 📖 דוגמאות שימוש

### הרצת דוגמאות
```bash
# הרצת דוגמאות בסיסיות
python video_demo.py --basic

# הרצת דוגמאות מתקדמות  
python video_demo.py --advanced

# הצגת דוגמאות שימוש
python video_demo.py --examples

# מצב אינטראקטיבי
python video_demo.py
```

### יצירת וידאו לדוגמה
```python
# הסקריפט יוצר וידאו לדוגמה לבדיקות
python -c "from video_demo import create_sample_video; create_sample_video()"
```

## 🎯 פעולות נתמכות

| פעולה | Python | Web | תיאור |
|--------|--------|-----|-------|
| חיתוך | ✅ | ✅ | חיתוך קטע ספציפי |
| חיבור | ✅ | ❌ | חיבור מספר קטעים |
| טקסט | ✅ | ✅ | הוספת כתוביות |
| רזולוציה | ✅ | ✅ | שינוי איכות |
| מהירות | ✅ | ✅ | האצה/האטה |
| אפקטים | ✅ | ✅ | פילטרים ויזואליים |
| אודיו | ✅ | ❌ | חילוץ והוספה |
| מצגת | ✅ | ❌ | וידאו מתמונות |
| אצווה | ✅ | ❌ | עיבוד מרובה |

## 🔧 הגדרות מתקדמות

### עיבוד אצווה
```python
editor = VideoEditor()

# עיבוד כל הקבצים בתיקייה
editor.batch_process(
    input_dir="./videos",
    operation="resize", 
    width=1280, 
    height=720
)
```

### הוספת מוזיקת רקע
```python
editor.add_background_music(
    video_path="video.mp4",
    audio_path="music.mp3",
    volume=0.3
)
```

### יצירת מצגת
```python
images = ["img1.jpg", "img2.jpg", "img3.jpg"]
editor.create_slideshow(
    image_paths=images,
    duration_per_image=3.0,
    transition_duration=0.5
)
```

## 🎨 אפקטים זמינים

### Python Effects
- **Fade In/Out** - מעברים חלקים
- **Speed Change** - שינוי מהירות
- **Resize** - שינוי רזולוציה
- **Text Overlay** - הוספת טקסט

### Web Effects  
- **Blur** - טשטוש
- **Brightness** - בהירות
- **Contrast** - ניגודיות
- **Grayscale** - שחור לבן
- **Sepia** - גוון ספיה
- **Invert** - היפוך צבעים

## 🎮 קיצורי מקלדת (Web)

| מקש | פעולה |
|-----|-------|
| `Space` | השהה/המשך |
| `←` | אחורה 5 שניות |
| `→` | קדימה 5 שניות |

## 📂 מבנה הפרויקט

```
├── video_editor.py          # מחלקה ראשית לעריכת וידאו
├── video_demo.py           # דוגמאות והדגמות
├── video_editor_web.html   # ממשק אינטרנט
├── README_video_editor.md  # מדריך זה
└── output/                 # תיקיית פלט
```

## 🔍 פתרון בעיות

### בעיות נפוצות

1. **"ModuleNotFoundError"**
   ```bash
   pip install moviepy opencv-python
   ```

2. **"FFmpeg not found"**
   - Windows: הורד FFmpeg ממקום רשמי
   - Linux: `sudo apt install ffmpeg`
   - Mac: `brew install ffmpeg`

3. **בעיות ביצועים**
   - השתמש ברזולוציה נמוכה יותר
   - חתוך קטעים קצרים יותר
   - סגור יישומים אחרים

### הגדרות מומלצות

- **רזולוציה**: 1280x720 לאיכות טובה
- **FPS**: 24-30 למרבית השימושים
- **Codec**: H.264 לתאימות מקסימלית

## 🤝 תרומה ופיתוח

הפרויקט פתוח להרחבות ושיפורים:

1. הוספת אפקטים חדשים
2. שיפור ביצועים
3. תמיכה בפורמטים נוספים
4. ממשק משתמש משופר

## 📝 רישיון

פרויקט זה זמין לשימוש חופשי למטרות לימוד ופיתוח.

---

**נוצר עם ❤️ לקהילת המפתחים העברית**

לשאלות ותמיכה, צור קשר או פתח issue בפרויקט.