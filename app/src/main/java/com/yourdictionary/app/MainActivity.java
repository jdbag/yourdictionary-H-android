package com.yourdictionary.app;

import android.os.Bundle;
import android.speech.tts.TextToSpeech;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.JavascriptInterface;
import android.widget.RelativeLayout;
import android.view.View;
import android.util.Log;
import androidx.appcompat.app.AppCompatActivity;

import java.util.Locale;

// HMS Ads imports
import com.huawei.hms.ads.AdParam;
import com.huawei.hms.ads.BannerAdSize;
import com.huawei.hms.ads.BannerView;
import com.huawei.hms.ads.HwAds;
import com.huawei.hms.ads.interstitial.InterstitialAd;

public class MainActivity extends AppCompatActivity {

    private static final String TAG = "YourDictionary";

    private WebView webView;
    private BannerView bannerAdView;
    private InterstitialAd interstitialAd;
    private TextToSpeech tts;
    private boolean ttsReady = false;

    // HMS Ad Slots (from AppGallery Connect)
    // Replace with your actual slot IDs from Huawei Developer Console
    private static final String HMS_BANNER_ID  = "testw6vs28auh3";  // test ID, replace with real
    private static final String HMS_INTER_ID   = "testb4znbuh3n2";  // test ID, replace with real

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Initialize HMS Ads
        HwAds.init(this);

        // Initialize TTS
        initTTS();

        // Setup WebView
        webView = findViewById(R.id.webView);
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccessFromFileURLs(true);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        settings.setMediaPlaybackRequiresUserGesture(false); // allow TTS audio
        settings.setDefaultTextEncodingName("UTF-8");

        // Enable large viewport for tablet
        settings.setUseWideViewPort(true);
        settings.setLoadWithOverviewMode(true);

        // JavaScript bridge
        webView.addJavascriptInterface(new AndroidBridge(), "AndroidBridge");
        webView.addJavascriptInterface(new HmsAdsBridge(), "HmsAdsBridge");
        webView.setWebViewClient(new WebViewClient());

        // Load app
        webView.loadUrl("file:///android_asset/www/index.html");

        // Setup HMS Banner Ad
        setupBannerAd();

        // Load HMS Interstitial
        loadInterstitialAd();
    }

    // ─── TEXT TO SPEECH ──────────────────────────────────────
    private void initTTS() {
        tts = new TextToSpeech(this, status -> {
            if (status == TextToSpeech.SUCCESS) {
                tts.setLanguage(Locale.US);
                tts.setSpeechRate(0.85f);
                tts.setPitch(1.0f);
                ttsReady = true;
                Log.d(TAG, "TTS initialized successfully");
            } else {
                Log.e(TAG, "TTS initialization failed: " + status);
            }
        });
    }

    // ─── HMS BANNER AD ────────────────────────────────────────
    private void setupBannerAd() {
        bannerAdView = findViewById(R.id.adView);
        if (bannerAdView == null) return;
        bannerAdView.setAdId(HMS_BANNER_ID);
        bannerAdView.setBannerAdSize(BannerAdSize.BANNER_SIZE_320_50);
        AdParam adParam = new AdParam.Builder().build();
        bannerAdView.loadAd(adParam);
    }

    // ─── HMS INTERSTITIAL ─────────────────────────────────────
    private void loadInterstitialAd() {
        interstitialAd = new InterstitialAd(this);
        interstitialAd.setAdId(HMS_INTER_ID);
        AdParam adParam = new AdParam.Builder().build();
        interstitialAd.loadAd(adParam);
    }

    // ─── ANDROID BRIDGE ──────────────────────────────────────
    public class AndroidBridge {

        // TTS - Called from JavaScript
        @JavascriptInterface
        public void speakText(String text, String langCode) {
            runOnUiThread(() -> {
                if (!ttsReady || tts == null) return;
                try {
                    Locale locale = parseLocale(langCode);
                    int result = tts.setLanguage(locale);
                    if (result == TextToSpeech.LANG_MISSING_DATA || result == TextToSpeech.LANG_NOT_SUPPORTED) {
                        tts.setLanguage(Locale.US);
                    }
                    tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, "tts_" + System.currentTimeMillis());
                } catch (Exception e) {
                    Log.e(TAG, "TTS error: " + e.getMessage());
                }
            });
        }

        @JavascriptInterface
        public void showInterstitial(String adSlotId) {
            runOnUiThread(() -> {
                if (interstitialAd != null && interstitialAd.isLoaded()) {
                    interstitialAd.show(MainActivity.this);
                    loadInterstitialAd();
                }
            });
        }

        @JavascriptInterface
        public void loadInterstitial(String adSlotId) {
            runOnUiThread(() -> loadInterstitialAd());
        }

        @JavascriptInterface
        public void initHmsAds() {
            runOnUiThread(() -> setupBannerAd());
        }

        private Locale parseLocale(String langCode) {
            if (langCode == null) return Locale.US;
            switch (langCode) {
                case "ar":    return new Locale("ar");
                case "ar-SA": return new Locale("ar", "SA");
                case "fr-FR": return Locale.FRANCE;
                case "es-ES": return new Locale("es", "ES");
                case "de-DE": return Locale.GERMANY;
                case "zh-CN": return Locale.SIMPLIFIED_CHINESE;
                case "ja-JP": return Locale.JAPAN;
                case "pt-BR": return new Locale("pt", "BR");
                case "ru-RU": return new Locale("ru", "RU");
                case "it-IT": return Locale.ITALY;
                case "ko-KR": return Locale.KOREA;
                default:      return Locale.US;
            }
        }
    }

    // ─── HMS ADS BRIDGE ──────────────────────────────────────
    public class HmsAdsBridge {
        @JavascriptInterface
        public void showBanner(String slotId, String containerId) {
            runOnUiThread(() -> setupBannerAd());
        }

        @JavascriptInterface
        public void loadInterstitial(String slotId) {
            runOnUiThread(() -> loadInterstitialAd());
        }

        @JavascriptInterface
        public void showInterstitial(String slotId) {
            runOnUiThread(() -> {
                if (interstitialAd != null && interstitialAd.isLoaded()) {
                    interstitialAd.show(MainActivity.this);
                    loadInterstitialAd();
                }
            });
        }
    }

    // ─── BACK PRESS ──────────────────────────────────────────
    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) webView.goBack();
        else super.onBackPressed();
    }

    // ─── LIFECYCLE ───────────────────────────────────────────
    @Override
    protected void onPause() {
        if (bannerAdView != null) bannerAdView.pause();
        if (tts != null) tts.stop();
        super.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (bannerAdView != null) bannerAdView.resume();
    }

    @Override
    protected void onDestroy() {
        if (bannerAdView != null) bannerAdView.destroy();
        if (tts != null) { tts.stop(); tts.shutdown(); }
        super.onDestroy();
    }
}
