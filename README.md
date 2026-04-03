# Your Dictionary — Android (Huawei AppGallery Edition)

قاموس إنجليزي متكامل مع دعم HMS — مخصص لمتجر هواوي AppGallery

---

## 📋 معلومات التطبيق

| المعلومة | القيمة |
|----------|--------|
| اسم التطبيق | Your Dictionary |
| Package Name | com.yourdictionary.app |
| HMS App ID | 101653523124765842 |
| الإعلانات | Huawei HMS Ads (لا AdMob) |
| versionCode | 3 |
| versionName | 1.2 |

---

## ✅ ميزات التطبيق

- 📖 **قاموس إنجليزي كامل** — أونلاين + أوفلاين
- 🔊 **نطق حقيقي** عبر Android TTS (يعمل بدون إنترنت على جميع أجهزة هواوي)
- 📚 **مكتبة أوفلاين** 170+ كلمة مدمجة — قابلة للتوسع عبر التحميل
- 🌐 **ترجمة** لـ 20+ لغة
- 📅 **كلمة اليوم**
- ❤️ **المفضلة**
- 🎯 **اختبار مفردات** (Quiz)
- 🌙 **وضع ليلي / نهاري**
- 📱 **دعم التابلت** (Responsive layout)
- 📦 **نظام الباقات الأوفلاين** — تحميل 70,000+ كلمة من السحابة

---

## 🏗️ هيكل المشروع

```
yourdictionary-H-android/
├── app/
│   ├── agconnect-services.json        ← HMS config
│   ├── build.gradle                   ← HMS Ads dependency
│   └── src/main/
│       ├── assets/www/
│       │   ├── index.html
│       │   ├── style.css
│       │   ├── app.js
│       │   ├── offline_dict.js        ← Static fallback (170 words)
│       │   ├── offline_download_manager.js  ← Download system
│       │   └── dict.db                ← SQLite offline DB
│       ├── java/.../MainActivity.java ← HMS Ads + TTS Bridge
│       └── AndroidManifest.xml
├── build.gradle                       ← HMS classpath
├── settings.gradle                    ← Huawei repo config
└── .github/workflows/build.yml        ← CI/CD
```

---

## ⚙️ إعداد قبل الرفع على AppGallery

في `MainActivity.java` السطر 32-33، استبدل الـ IDs التجريبية بالحقيقية:

```java
// احصل عليها من: AppGallery Connect → Project → Monetize → Ads
private static final String BANNER_AD_ID = "YOUR_REAL_BANNER_ID";
private static final String INTER_AD_ID  = "YOUR_REAL_INTER_ID";
```

---

## 🔨 بناء الـ APK

### تلقائياً عبر GitHub Actions

كل push على `main` يُنشئ APK تلقائياً.
ابحث عن الـ APK في: **Actions → آخر run ناجح → Artifacts → YourDictionary-APK**

### يدوياً من Android Studio

```bash
./gradlew assembleDebug
# APK في: app/build/outputs/apk/debug/app-debug.apk
```

### Release للنشر

```bash
./gradlew assembleRelease
# ثم وقّع من: Build → Generate Signed Bundle/APK
```

---

## 📚 المكتبة الأوفلاين

### المدمجة (جاهزة فوراً)
- 170+ كلمة مع تعريفات، أمثلة، مرادفات، أضداد
- لا تحتاج إنترنت

### القابلة للتحميل (100,000+ كلمة)
1. شغّل `build_dict_db.py` على جهازك
2. ارفع `dict.db` على Huawei Cloud Storage
3. حدّث الرابط في `offline_download_manager.js`

```bash
pip install nltk
python3 build_dict_db.py
```

---

## 🏪 الرفع على AppGallery

1. ابنِ APK موقّع (Release)
2. اذهب إلى: https://developer.huawei.com
3. My Apps → تطبيقك → Software Version → Add APK
4. أكمل Content Rating وبيانات التطبيق
5. انشر!

---

## 📄 الترخيص

للاستخدام الشخصي والتجاري.
