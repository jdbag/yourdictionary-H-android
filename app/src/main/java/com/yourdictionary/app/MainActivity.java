
package com.yourdictionary.app;

import android.os.Bundle;
import android.speech.tts.TextToSpeech;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.JavascriptInterface;
import android.widget.LinearLayout;
import android.view.Gravity;
import android.util.Log;
import androidx.appcompat.app.AppCompatActivity;

import com.huawei.hms.ads.AdParam;
import com.huawei.hms.ads.BannerAdSize;
import com.huawei.hms.ads.BannerView;
import com.huawei.hms.ads.HwAds;
import com.huawei.hms.ads.InterstitialAd;

import java.util.Locale;

public class MainActivity extends AppCompatActivity {

    private WebView webView;
    private BannerView bannerAdView;
    private InterstitialAd interstitialAd;
    private TextToSpeech tts;
    private boolean ttsReady = false;

    // ===== HMS ADS IDs =====
    // للاختبار: استخدم IDs التجريبية
    // للنشر: استبدلها بالـ IDs الحقيقية من AppGallery Connect
    private static final String BANNER_AD_ID = "testw6vs28auh3";      // ← غيّر للنشر
    private static final String INTER_AD_ID  = "testb4znbuh3n2";      // ← غيّر للنشر

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // تهيئة HMS Ads
        HwAds.init(this);

        // Layout رئيسي
        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setLayoutParams(new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.MATCH_PARENT));

        // WebView
        webView = new WebView(this);
        LinearLayout.LayoutParams webParams = new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT, 0, 1f);
        webView.setLayoutParams(webParams);

        // إعداد Banner Ad
        bannerAdView = new BannerView(this);
        bannerAdView.setAdId(BANNER_AD_ID);
        bannerAdView.setBannerAdSize(BannerAdSize.BANNER_SIZE_360_57);
        LinearLayout.LayoutParams bannerParams = new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.WRAP_CONTENT);
        bannerParams.gravity = Gravity.CENTER_HORIZONTAL;
        bannerAdView.setLayoutParams(bannerParams);
        bannerAdView.loadAd(new AdParam.Builder().build());

        root.addView(webView);
        root.addView(bannerAdView);
        setContentView(root);

        // إعداد Interstitial Ad
        loadInterstitialAd();

        // إعداد TTS
        tts = new TextToSpeech(this, status -> {
            if (status == TextToSpeech.SUCCESS) {
                tts.setLanguage(Locale.ENGLISH);
                ttsReady = true;
                Log.d("TTS", "Ready");
            }
        });

        // إعداد WebView
        WebSettings s = webView.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setAllowFileAccessFromFileURLs(true);
        s.setAllowUniversalAccessFromFileURLs(true);
        s.setCacheMode(WebSettings.LOAD_DEFAULT);
        s.setUseWideViewPort(true);
        s.setLoadWithOverviewMode(true);
        s.setSupportZoom(false);
        s.setBuiltInZoomControls(false);
        s.setMediaPlaybackRequiresUserGesture(false);

        webView.addJavascriptInterface(new Bridge(), "AndroidBridge");
        webView.setWebViewClient(new WebViewClient());
        webView.loadUrl("file:///android_asset/www/index.html");
    }

    private void loadInterstitialAd() {
        interstitialAd = new InterstitialAd(this);
        interstitialAd.setAdId(INTER_AD_ID);
        interstitialAd.loadAd(new AdParam.Builder().build());
    }

    public class Bridge {
        @JavascriptInterface
        public void showInterstitial() {
            runOnUiThread(() -> {
                if (interstitialAd != null && interstitialAd.isLoaded()) {
                    interstitialAd.show(MainActivity.this);
                    loadInterstitialAd();
                }
            });
        }

        @JavascriptInterface
        public void speakWord(String text, String langCode) {
            if (tts == null) return;
            runOnUiThread(() -> {
                try {
                    Locale locale = (langCode != null && !langCode.isEmpty())
                            ? new Locale(langCode) : Locale.ENGLISH;
                    int res = tts.setLanguage(locale);
                    if (res == TextToSpeech.LANG_MISSING_DATA || res == TextToSpeech.LANG_NOT_SUPPORTED) {
                        tts.setLanguage(Locale.ENGLISH);
                    }
                    tts.stop();
                    tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, "YD_" + text);
                } catch (Exception e) {
                    Log.e("TTS", e.getMessage());
                }
            });
        }

        @JavascriptInterface
        public void stopSpeech() {
            if (tts != null) tts.stop();
        }

        @JavascriptInterface
        public boolean isTtsAvailable() {
            return ttsReady;
        }
    }

    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) webView.goBack();
        else super.onBackPressed();
    }

    @Override
    protected void onPause() {
        super.onPause();
        if (bannerAdView != null) bannerAdView.pause();
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
        if (webView != null) webView.destroy();
        super.onDestroy();
    }
}
