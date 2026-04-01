# 📚 نظام المكتبة الأوفلاين — Your Dictionary

## الفكرة (نفس نظام U Dictionary)

```
التطبيق يُشغَّل
      ↓
يبحث في dict.db المدمج (177 كلمة)
      ↓
المستخدم يفتح "Offline Pkg"
      ↓
يرى قائمة الباقات مثل U Dictionary تماماً
      ↓
يضغط ⬇ → التطبيق يُحمّل dict.db من Huawei Cloud
      ↓
يُخزّن في IndexedDB (داخل الجهاز)
      ↓
72,000+ كلمة أوفلاين بدون إنترنت إلى الأبد
```

---

## الخطوات على جهازك (PC)

### الخطوة 1 — بناء قاعدة البيانات (مرة واحدة)

```bash
# ثبّت Python dependencies
pip install nltk

# شغّل السكريبت
python3 build_dict_db.py
```

النتيجة:
```
✅ Database built successfully!
   Words:       147,306
   Definitions: 206,941
   Synonyms:    128,409
   Antonyms:     93,016
   Size:        ~7.2 MB
   Time:        ~45s
```

### الخطوة 2 — رفع على Huawei Cloud Storage

**الطريقة السهلة (يدوي):**
1. اذهب إلى https://developer.huawei.com → AppGallery Connect
2. Project → Build → Cloud Storage
3. أنشئ Bucket اسمه `yourdictionary-offline`
4. ارفع `dict.db` كملف عام (Public Read)
5. انسخ الـ URL

**الطريقة التلقائية:**
```bash
pip install requests
python3 upload_to_huawei_cloud.py
```

### الخطوة 3 — حدّث الـ URL في التطبيق

في `offline_download_manager.js` السطر 10:
```javascript
const CLOUD_DB_URL = "https://YOUR-ACTUAL-URL/dict_v1.db";
```

### الخطوة 4 — انسخ dict.db للمشروع

```bash
cp dict.db app/src/main/assets/www/dict.db
```

هذا يجعل النسخة المدمجة تحتوي على الـ 177 كلمة الأساسية.

---

## هيكل الملفات

```
app/src/main/assets/www/
├── dict.db                    ← مدمج (177 كلمة — يُبدَّل بالكاملة اختيارياً)
├── offline_dict.js            ← Fallback ثابت (JS)
├── offline_download_manager.js ← نظام التحميل الكامل
└── app.js                     ← يستخدم offlineLookup() و offlineSuggest()
```

---

## أرقام متوقعة بعد بناء الـ DB

| الجدول | الكمية |
|--------|--------|
| كلمات | ~147,000 |
| تعريفات | ~206,000 |
| مرادفات | ~128,000 |
| أضداد | ~93,000 |
| حجم الملف | ~7.2 MB |

---

## النطق (TTS)

النطق يعمل بدون إنترنت عبر Android TTS المدمج في الجهاز:
- **هواتف هواوي**: TTS مدمج يدعم الإنجليزية
- **الكلمات المترجمة**: يُقرأ بلغة الترجمة (عربي، فرنسي، إلخ)
- لا يحتاج أي API خارجي

