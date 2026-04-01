# Your Dictionary — Android App (Huawei HMS Edition)

قاموس إنجليزي متكامل للأندرويد — نسخة هواوي AppGallery

---

## 📋 معلومات المشروع

| المعلومة | القيمة |
|----------|--------|
| اسم التطبيق | Your Dictionary |
| Package | com.yourdictionary.app |
| App ID (HMS) | 101653523124765842 |
| إعلانات | Huawei HMS Ads (لا AdMob) |
| versionCode | 3 |
| versionName | 1.2 |

---

## ✅ ميزات التطبيق

- 📖 قاموس إنجليزي كامل (أونلاين + أوفلاين)
- 🔊 **نطق حقيقي** عبر Android TTS (يعمل بدون إنترنت على جميع أجهزة هواوي)
- 📚 **مكتبة أوفلاين** 177+ كلمة مدمجة (قابلة للتوسع)
- 🌐 ترجمة لـ 20+ لغة
- 📅 كلمة اليوم
- ❤️ المفضلة
- 🎯 اختبار المفردات (Quiz)
- 🌙 وضع ليلي / نهاري
- 📱 **دعم التابلت** (Responsive)

---

## 🔨 خطوات البناء

### متطلبات
- Android Studio Hedgehog أو أحدث
- JDK 17+
- اتصال بالإنترنت (لتحميل HMS dependencies)

### بناء Debug APK
```bash
./gradlew assembleDebug
# الناتج: app/build/outputs/apk/debug/app-debug.apk
```

### بناء Release APK
```bash
./gradlew assembleRelease
# الناتج: app/build/outputs/apk/release/app-release.apk
```

---

## ⚙️ إعداد HMS Ads

قبل الرفع على AppGallery، استبدل في `MainActivity.java`:

```java
// السطر 22-23 — استبدل بـ ID الحقيقي من AppGallery Connect
private static final String BANNER_AD_ID = "YOUR_REAL_BANNER_ID";
private static final String INTER_AD_ID  = "YOUR_REAL_INTER_ID";
```

احصل على الـ IDs من: AppGallery Connect → Project → Monetize → Ads

---

## 📁 هيكل المشروع

```
yourdictionary-H-android/
├── app/
│   ├── agconnect-services.json     ← HMS configuration
│   ├── build.gradle                ← HMS Ads dependency
│   └── src/main/
│       ├── assets/www/             ← WebApp files
│       │   ├── index.html
│       │   ├── style.css
│       │   ├── app.js              ← Main logic + TTS bridge
│       │   ├── offline_dict.js     ← Static offline words
│       │   ├── offline_db_loader.js ← SQLite DB loader
│       │   └── dict.db             ← Offline SQLite database
│       ├── java/.../MainActivity.java  ← HMS Ads + TTS
│       └── AndroidManifest.xml
├── build.gradle                    ← HMS classpath
└── settings.gradle
```

---

## 🏪 الرفع على AppGallery

راجع ملف `HUAWEI_UPLOAD_GUIDE.md` للتعليمات الكاملة.
