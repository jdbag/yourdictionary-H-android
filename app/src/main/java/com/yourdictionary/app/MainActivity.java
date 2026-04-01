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
import android.view.ViewGroup;
import androidx.appcompat.app.AppCompatActivity;

import com.huawei.hms.ads.AdParam;
import com.huawei.hms.ads.AdSize;
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

    // HMS Ads IDs — replace testw6vs28auh3/testb4znbuh3n2 with your real slot IDs from AppGallery Connect
    private static final String BANNER_AD_ID = "testw6vs28auh3";
    private static final String INTER_AD_ID  = "testb4znbuh3n2";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        HwAds.init(this);

        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setLayoutParams(new ViewGroup.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.MATCH_PARENT));

        webView = new WebView(this);
        LinearLayout.LayoutParams wvParams = new LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.MATCH_PARENT, 0, 1f);
        webView.setLayoutParams(wvParams);

        bannerAdView = new BannerView(this);
        bannerAdView.setAdId(BANNER_AD_ID);
        bannerAdView.setBannerAdSize(AdSize.BANNER_SIZE_360_57);
        LinearLayout.LayoutParams adParams = new LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.MATCH_PARENT,
            LinearLayout.LayoutParams.WRAP_CONTENT);
        adParams.gravity = Gravity.CENTER_HORIZONTAL;
        bannerAdView.setLayoutParams(adParams);

        root.addView(webView);
        root.addView(bannerAdView);
        setContentView(root);

        bannerAdView.loadAd(new AdParam.Builder().build());
        loadInterstitial();

        tts = new TextToSpeech(this, status -> {
            if (status == TextToSpeech.SUCCESS) {
                tts.setLanguage(Locale.ENGLISH);
                ttsReady = true;
                Log.d("TTS", "Ready");
            }
        });

        WebSettings s = webView.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setAllowFileAccessFromFileURLs(true);
        s.setAllowUniversalAccessFromFileURLs(true);
        s.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        s.setCacheMode(WebSettings.LOAD_DEFAULT);
        s.setUseWideViewPort(true);
        s.setLoadWithOverviewMode(true);
        s.setSupportZoom(false);
        s.setBuiltInZoomControls(false);
        s.setDisplayZoomControls(false);
        s.setMediaPlaybackRequiresUserGesture(false);

        webView.addJavascriptInterface(new Bridge(), "AndroidBridge");
        webView.setWebViewClient(new WebViewClient());
        webView.loadUrl("file:///android_asset/www/index.html");
    }

    private void loadInterstitial() {
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
                    loadInterstitial();
                }
            });
        }

        @JavascriptInterface
        public void speakWord(String text, String langCode) {
            if (!ttsReady || tts == null) return;
            runOnUiThread(() -> {
                try {
                    Locale locale = (langCode != null && !langCode.isEmpty())
                        ? new Locale(langCode) : Locale.ENGLISH;
                    int res = tts.setLanguage(locale);
                    if (res == TextToSpeech.LANG_MISSING_DATA || res == TextToSpeech.LANG_NOT_SUPPORTED) {
                        tts.setLanguage(Locale.ENGLISH);
                    }
                    tts.stop();
                    tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, "YD_" + System.currentTimeMillis());
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

    @Override protected void onPause()   { super.onPause();   if(bannerAdView!=null) bannerAdView.pause();  if(tts!=null) tts.stop(); }
    @Override protected void onResume()  { super.onResume();  if(bannerAdView!=null) bannerAdView.resume(); }
    @Override protected void onDestroy() {
        super.onDestroy();
        if(bannerAdView!=null) bannerAdView.destroy();
        if(tts!=null){ tts.stop(); tts.shutdown(); }
        if(webView!=null) webView.destroy();
    }
}
