"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save } from "lucide-react";

type Settings = {
  brandName?: string;
  primaryPhone?: string | null;
  whatsappNumber?: string;
  supportEmail?: string | null;
  addressLine?: string | null;
  defaultOgImage?: string | null;
  googleSiteVerification?: string | null;
  googleAnalyticsId?: string | null;
  googleTagManagerId?: string | null;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  twitterUrl?: string | null;
  youtubeUrl?: string | null;
};

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    brandName: "",
    primaryPhone: "",
    whatsappNumber: "+16467197124",
    supportEmail: "",
    addressLine: "",
    defaultOgImage: "",
    googleSiteVerification: "",
    googleAnalyticsId: "",
    googleTagManagerId: "",
    facebookUrl: "",
    instagramUrl: "",
    twitterUrl: "",
    youtubeUrl: "",
  });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/settings/site");
        const json = await res.json();
        if (!mounted) return;
        setSettings({
          brandName: json.brandName || "",
          primaryPhone: json.primaryPhone || "",
          whatsappNumber: json.whatsappNumber || "+16467197124",
          supportEmail: json.supportEmail || "",
          addressLine: json.addressLine || "",
          defaultOgImage: json.defaultOgImage || "",
          googleSiteVerification: json.googleSiteVerification || "",
          googleAnalyticsId: json.googleAnalyticsId || "",
          googleTagManagerId: json.googleTagManagerId || "",
          facebookUrl: json.facebookUrl || "",
          instagramUrl: json.instagramUrl || "",
          twitterUrl: json.twitterUrl || "",
          youtubeUrl: json.youtubeUrl || "",
        });
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  async function onSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/settings/site", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error(await res.text());
      alert("Settings saved.");
    } catch (e: any) {
      alert(e?.message || "Failed to save settings.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-2">Brand, contact info, and default SEO image.</p>
      </div>

      <div className="bg-white rounded-lg border shadow-sm p-6 space-y-6">
        {loading ? (
          <div className="flex items-center gap-2 text-gray-600">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading…
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <Label htmlFor="brandName">Brand name</Label>
              <Input
                id="brandName"
                value={settings.brandName || ""}
                onChange={(e) => setSettings((s) => ({ ...s, brandName: e.target.value }))}
                placeholder="Your Movers Brand"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="whatsappNumber">WhatsApp number</Label>
                <Input
                  id="whatsappNumber"
                  value={settings.whatsappNumber || ""}
                  onChange={(e) => setSettings((s) => ({ ...s, whatsappNumber: e.target.value }))}
                  placeholder="+16467197124"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="primaryPhone">Primary phone (optional)</Label>
                <Input
                  id="primaryPhone"
                  value={settings.primaryPhone || ""}
                  onChange={(e) => setSettings((s) => ({ ...s, primaryPhone: e.target.value }))}
                  placeholder="+1 ..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="supportEmail">Support email (optional)</Label>
                <Input
                  id="supportEmail"
                  value={settings.supportEmail || ""}
                  onChange={(e) => setSettings((s) => ({ ...s, supportEmail: e.target.value }))}
                  placeholder="support@yourdomain.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="defaultOgImage">Default OG image URL (optional)</Label>
                <Input
                  id="defaultOgImage"
                  value={settings.defaultOgImage || ""}
                  onChange={(e) => setSettings((s) => ({ ...s, defaultOgImage: e.target.value }))}
                  placeholder="https://.../og.jpg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="addressLine">Business address (optional)</Label>
              <Input
                id="addressLine"
                value={settings.addressLine || ""}
                onChange={(e) => setSettings((s) => ({ ...s, addressLine: e.target.value }))}
                placeholder="Street, City, State ZIP"
              />
            </div>

            <div className="pt-4 border-t">
              <h2 className="text-lg font-semibold text-gray-900">SEO / IDs</h2>
              <p className="text-sm text-gray-500 mt-1">Add verification and tracking IDs for SEO/marketing.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="googleSiteVerification">Google Site Verification (optional)</Label>
                <Input
                  id="googleSiteVerification"
                  value={settings.googleSiteVerification || ""}
                  onChange={(e) => setSettings((s) => ({ ...s, googleSiteVerification: e.target.value }))}
                  placeholder="google-site-verification=..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="googleAnalyticsId">Google Analytics ID (optional)</Label>
                <Input
                  id="googleAnalyticsId"
                  value={settings.googleAnalyticsId || ""}
                  onChange={(e) => setSettings((s) => ({ ...s, googleAnalyticsId: e.target.value }))}
                  placeholder="G-XXXXXXXXXX"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="googleTagManagerId">Google Tag Manager ID (optional)</Label>
                <Input
                  id="googleTagManagerId"
                  value={settings.googleTagManagerId || ""}
                  onChange={(e) => setSettings((s) => ({ ...s, googleTagManagerId: e.target.value }))}
                  placeholder="GTM-XXXXXXX"
                />
              </div>
            </div>

            <div className="pt-4 border-t">
              <h2 className="text-lg font-semibold text-gray-900">Social links</h2>
              <p className="text-sm text-gray-500 mt-1">These are shown in the footer.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="facebookUrl">Facebook URL</Label>
                <Input
                  id="facebookUrl"
                  value={settings.facebookUrl || ""}
                  onChange={(e) => setSettings((s) => ({ ...s, facebookUrl: e.target.value }))}
                  placeholder="https://facebook.com/yourpage"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagramUrl">Instagram URL</Label>
                <Input
                  id="instagramUrl"
                  value={settings.instagramUrl || ""}
                  onChange={(e) => setSettings((s) => ({ ...s, instagramUrl: e.target.value }))}
                  placeholder="https://instagram.com/yourprofile"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitterUrl">Twitter/X URL</Label>
                <Input
                  id="twitterUrl"
                  value={settings.twitterUrl || ""}
                  onChange={(e) => setSettings((s) => ({ ...s, twitterUrl: e.target.value }))}
                  placeholder="https://x.com/yourhandle"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="youtubeUrl">YouTube channel URL</Label>
                <Input
                  id="youtubeUrl"
                  value={settings.youtubeUrl || ""}
                  onChange={(e) => setSettings((s) => ({ ...s, youtubeUrl: e.target.value }))}
                  placeholder="https://youtube.com/@yourchannel"
                />
              </div>
            </div>

            <Button onClick={onSave} disabled={saving} className="flex items-center gap-2">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save settings
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

