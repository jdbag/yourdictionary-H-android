// ============================================================
// HUAWEI HMS ADS INTEGRATION
// Replaces AdMob for Huawei AppGallery
// Developer ID: 30213000023085372
// ============================================================

const HMS_AD_SLOTS = {
  banner1: '103',
  banner2: '104',
  banner3: '105',
  interstitial1: '201',
  interstitial2: '202',
  rewarded: '301'
};

let searchCount = 0;

function initHmsAds() {
  if (window.HmsAdsBridge) {
    // Show banner ads via HMS bridge
    window.HmsAdsBridge.showBanner(HMS_AD_SLOTS.banner1, 'adBannerTop');
    window.HmsAdsBridge.showBanner(HMS_AD_SLOTS.banner2, 'adBannerMiddle');
    window.HmsAdsBridge.loadInterstitial(HMS_AD_SLOTS.interstitial1);
  } else if (window.AndroidBridge && window.AndroidBridge.initHmsAds) {
    window.AndroidBridge.initHmsAds();
  }
}

function onSearch() {
  searchCount++;
  if (searchCount % 3 === 0) {
    if (window.HmsAdsBridge) {
      window.HmsAdsBridge.showInterstitial(HMS_AD_SLOTS.interstitial1);
    } else if (window.AndroidBridge && window.AndroidBridge.showInterstitial) {
      window.AndroidBridge.showInterstitial(HMS_AD_SLOTS.interstitial1);
    }
  }
}

function onPageChange() {
  if (window.HmsAdsBridge) {
    window.HmsAdsBridge.showInterstitial(HMS_AD_SLOTS.interstitial2);
  } else if (window.AndroidBridge && window.AndroidBridge.showInterstitial) {
    window.AndroidBridge.showInterstitial(HMS_AD_SLOTS.interstitial2);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  initHmsAds();

  const heroBtn = document.getElementById('heroBtn');
  if (heroBtn) heroBtn.addEventListener('click', onSearch);

  document.querySelectorAll('.nav-link, .mobile-nav a').forEach(link => {
    link.addEventListener('click', function() {
      if (!link.classList.contains('active')) onPageChange();
    });
  });
});
