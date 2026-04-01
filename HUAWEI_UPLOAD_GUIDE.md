# 📱 دليل رفع Your Dictionary على متجر هواوي AppGallery

---

## ⚠️ فحص المستودع — ما وجدناه

عند فحص https://github.com/jdbag/yourdictionary-H-android وجدنا:
- ✅ ملفات الكود مرفوعة
- ❌ **README.md لا يزال يذكر AdMob** — يجب تحديثه
- ❌ **agconnect-services.json غير موجود** في المستودع (لأسباب أمنية هذا صحيح)

**إجراء مطلوب:** حدّث README.md بحذف أي ذكر لـ AdMob وإضافة معلومات HMS.

---

## 🔨 الخطوة 1 — بناء APK موقّع (Signed Release APK)

### المتطلبات أولاً:
- Android Studio (آخر إصدار)
- JDK 17
- الملف المُحدَّث من هذا ZIP

### 1.1 افتح المشروع
```
File → Open → اختر مجلد المشروع
انتظر حتى يكتمل Gradle Sync
```

### 1.2 أنشئ Keystore (مفتاح التوقيع) — مرة واحدة فقط
```
Build → Generate Signed Bundle / APK
اختر APK → Next
اضغط "Create new..."
```
أدخل:
- Key store path: اختر مكان حفظ ملف `.jks`
- Password: كلمة مرور قوية (احفظها!)
- Alias: `yourdictionary`
- Key password: نفس الكلمة أو مختلفة
- First and Last Name: اسمك
- Country Code: DZ

⚠️ **احفظ ملف .jks في مكان آمن — بدونه لا تقدر تحدّث التطبيق أبداً**

### 1.3 ابنِ APK الـ Release
```
Build → Generate Signed Bundle / APK
اختر APK → Next
اختر الـ keystore الذي أنشأته
اختر Release → Finish
```

ستجد الـ APK في:
```
app/build/outputs/apk/release/app-release.apk
```

---

## 🏪 الخطوة 2 — رفع على AppGallery Connect

### 2.1 تسجيل الدخول
اذهب إلى: https://developer.huawei.com/consumer/en/appgallery

### 2.2 إنشاء التطبيق (إذا لم يكن موجوداً)
```
My Apps → New → App
- App Name: Your Dictionary
- App Category: Tools
- Default Language: English
- Package Name: com.yourdictionary.app
```

### 2.3 معلومات التطبيق الأساسية
في تبويب **App Information**:

| الحقل | القيمة |
|-------|--------|
| App Name | Your Dictionary |
| Short Description | English dictionary with offline support, translation & quiz |
| Full Description | (انظر أدناه) |
| App Icon | 512×512 PNG |
| Screenshots | 3-8 صور للتطبيق |
| Category | Education > Language Learning |
| Tags | dictionary, english, translation, offline, vocabulary |

**وصف مقترح:**
```
Your Dictionary is a powerful English dictionary app with:
• 200+ offline words — works without internet
• Definitions, examples, synonyms & antonyms
• Multi-language translation (20+ languages)
• Word of the Day
• Pronunciation (Text-to-Speech)
• Vocabulary Quiz
• Save favorite words
• Dark & Light themes
```

### 2.4 رفع الـ APK
في تبويب **Software Version**:
```
New Version → Add → اختر app-release.apk
Version Number: 1.2
What's new: Initial release with offline dictionary support
```

### 2.5 Content Rating (تقييم المحتوى)
```
Fill in questionnaire
- Does app contain violence? No
- Does app contain adult content? No
- Age rating: All Ages (3+)
```

### 2.6 Pricing & Distribution
```
Free
Countries: All / اختر الدول التي تريدها
```

### 2.7 مراجعة الإعلانات HMS
تأكد أن في التطبيق:
```
app_id في agconnect-services.json: 101653523124765842
```
في AppGallery Connect → Project → Monetize → Ads:
- أنشئ Ad Unit للـ Banner (احفظ الـ ID)
- أنشئ Ad Unit للـ Interstitial (احفظ الـ ID)
- استبدل في MainActivity.java:
  - "testw6vs28auh3" → ID الـ Banner الحقيقي
  - "testb4znbuh3n2" → ID الـ Interstitial الحقيقي

---

## ✅ الخطوة 3 — قائمة تحقق قبل الرفع

- [ ] APK موقّع بـ Release keystore
- [ ] versionCode يزيد مع كل رفع (حالياً 3)
- [ ] لا يوجد أي ذكر لـ AdMob في الكود
- [ ] agconnect-services.json موجود في app/
- [ ] أيقونة التطبيق 512×512 موجودة
- [ ] 3 screenshots على الأقل
- [ ] وصف التطبيق مكتوب
- [ ] Privacy Policy URL موجود
- [ ] Content Rating مكتمل

---

## 🔁 الخطوة 4 — تحديث README.md في GitHub

ارفع README.md الجديد (موجود في هذا ZIP) الذي يحذف كل ذكر لـ AdMob.

---

## ⏳ وقت المراجعة

هواوي عادةً يراجع التطبيق خلال **1-3 أيام عمل**.
بعد القبول ستصلك رسالة على بريدك الإلكتروني.
