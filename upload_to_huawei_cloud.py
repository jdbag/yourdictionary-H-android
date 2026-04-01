#!/usr/bin/env python3
"""
╔══════════════════════════════════════════════════════════════╗
║   YOUR DICTIONARY — Upload dict.db to Huawei Cloud Storage  ║
║                                                              ║
║   RUN AFTER build_dict_db.py:                               ║
║   pip install requests                                       ║
║   python3 upload_to_huawei_cloud.py                         ║
╚══════════════════════════════════════════════════════════════╝
"""

import requests
import json
import os
import hashlib
import time

# ── Your Huawei AGC credentials ────────────────────────────
CLIENT_ID     = "1917766453457643584"
CLIENT_SECRET = "BA4D3119E6FA69F5B55B01309B4E668DB648923D69FEE02A59D10C3FACE1D89C"
APP_ID        = "101653523124765842"
BUCKET_NAME   = "yourdictionary-offline"  # create this in AGC console
DB_FILE       = "dict.db"

# ── AGC Auth Token URL ──────────────────────────────────────
TOKEN_URL = "https://oauth-login.cloud.huawei.com/oauth2/v3/token"
STORAGE_BASE = "https://ops-dre.agcstorage.link/v1"


def get_access_token():
    """Get Huawei AGC OAuth2 access token"""
    resp = requests.post(TOKEN_URL, data={
        "grant_type": "client_credentials",
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET
    })
    resp.raise_for_status()
    data = resp.json()
    token = data.get("access_token")
    if not token:
        raise Exception(f"Token error: {data}")
    print(f"✅ Got access token (expires in {data.get('expires_in')}s)")
    return token


def create_bucket_if_needed(token):
    """Create storage bucket"""
    url = f"{STORAGE_BASE}/{BUCKET_NAME}"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    # Try HEAD first to check existence
    r = requests.head(url, headers=headers)
    if r.status_code == 200:
        print(f"✅ Bucket '{BUCKET_NAME}' already exists")
        return
    
    # Create bucket
    r = requests.put(url, headers=headers, json={
        "storageClass": "STANDARD",
        "location": "DE"
    })
    if r.status_code in (200, 201, 204):
        print(f"✅ Bucket '{BUCKET_NAME}' created")
    else:
        print(f"⚠️  Bucket status: {r.status_code} — {r.text[:200]}")


def upload_file(token, local_path, remote_name):
    """Upload file to Huawei Cloud Storage"""
    file_size = os.path.getsize(local_path)
    print(f"\nUploading {remote_name} ({file_size/1024/1024:.1f} MB)...")

    url = f"{STORAGE_BASE}/{BUCKET_NAME}/{remote_name}"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/octet-stream",
        "x-object-meta-app": "yourdictionary"
    }

    with open(local_path, 'rb') as f:
        data = f.read()

    # Calculate MD5
    md5 = hashlib.md5(data).hexdigest()
    headers["Content-MD5"] = md5

    r = requests.put(url, headers=headers, data=data, timeout=300)

    if r.status_code in (200, 201):
        # Make object public readable
        acl_url = f"{url}?acl"
        requests.put(acl_url, headers={
            **headers,
            "x-acl": "public-read"
        })
        public_url = url
        print(f"✅ Uploaded successfully!")
        print(f"   Public URL: {public_url}")
        return public_url
    else:
        print(f"❌ Upload failed: {r.status_code} — {r.text[:300]}")
        return None


def save_url_to_config(url, version="1.0"):
    """Save the cloud URL to config file for the app"""
    config = {
        "cloud_db_url": url,
        "version": version,
        "size_mb": os.path.getsize(DB_FILE) / (1024 * 1024),
        "uploaded_at": time.strftime("%Y-%m-%d %H:%M:%S")
    }
    with open("cloud_config.json", "w") as f:
        json.dump(config, f, indent=2)
    print(f"\n📄 Config saved to cloud_config.json")
    print(f"   Update CLOUD_DB_URL in offline_download_manager.js with:")
    print(f"   '{url}'")


if __name__ == "__main__":
    if not os.path.exists(DB_FILE):
        print(f"❌ {DB_FILE} not found! Run build_dict_db.py first.")
        exit(1)

    print("Huawei Cloud Storage Uploader")
    print("=" * 40)

    try:
        token = get_access_token()
        create_bucket_if_needed(token)
        url = upload_file(token, DB_FILE, "dict_v1.db")
        if url:
            save_url_to_config(url)
            print("\n✅ All done! Update the URL in your app and rebuild APK.")
    except Exception as e:
        print(f"\n❌ Error: {e}")
        print("\nManual alternative:")
        print("1. Go to AppGallery Connect → Cloud Storage")
        print("2. Create bucket 'yourdictionary-offline'")
        print("3. Upload dict.db manually")
        print("4. Copy the public URL and paste in offline_download_manager.js")
