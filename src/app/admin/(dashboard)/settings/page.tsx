"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Check, AlertCircle, Mail, Server } from "lucide-react";

export default function SettingsPage() {
  // Password state
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // SMTP state
  const [smtpSettings, setSmtpSettings] = useState({
    host: "smtp.hostinger.com",
    port: "465",
    user: "",
    password: "",
    fromEmail: "",
    secure: true
  });
  const [smtpLoading, setSmtpLoading] = useState(false);
  const [testEmail, setTestEmail] = useState("");
  const [smtpMessage, setSmtpMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/admin/smtp")
      .then(res => res.json())
      .then(data => {
        if (data.host) {
          setSmtpSettings({
            host: data.host,
            port: data.port.toString(),
            user: data.user,
            password: data.password || "",
            fromEmail: data.fromEmail,
            secure: data.secure
          });
        }
      })
      .catch(console.error);
  }, []);

  const handleUpdatePassword = async () => {
    if (!password) return;
    
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/auth/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update password");
      }

      setMessage({ type: "success", text: "Password updated successfully" });
      setPassword("");
    } catch (error) {
      setMessage({ 
        type: "error", 
        text: error instanceof Error ? error.message : "Failed to update password" 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSmtp = async () => {
    setSmtpLoading(true);
    setSmtpMessage(null);

    try {
      const res = await fetch("/api/admin/smtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(smtpSettings),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save SMTP settings");
      }

      setSmtpMessage({ type: "success", text: "SMTP settings saved successfully" });
    } catch (error) {
      setSmtpMessage({ 
        type: "error", 
        text: error instanceof Error ? error.message : "Failed to save SMTP settings" 
      });
    } finally {
      setSmtpLoading(false);
    }
  };

  const handleTestEmail = async () => {
    if (!testEmail) {
      setSmtpMessage({ type: "error", text: "Please enter an email address to send a test to" });
      return;
    }

    setSmtpLoading(true);
    setSmtpMessage(null);

    try {
      const res = await fetch("/api/admin/smtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "test", testEmail }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send test email");
      }

      setSmtpMessage({ type: "success", text: "Test email sent successfully!" });
    } catch (error) {
      setSmtpMessage({ 
        type: "error", 
        text: error instanceof Error ? error.message : "Failed to send test email" 
      });
    } finally {
      setSmtpLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your admin preferences and site configuration.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>Update your admin profile information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {message && (
              <Alert variant={message.type === "error" ? "destructive" : "default"} className={message.type === "success" ? "border-green-500 text-green-500" : ""}>
                {message.type === "success" ? <Check className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <AlertDescription>{message.text}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue="admin@lugvia.com" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button onClick={handleUpdatePassword} disabled={loading || !password}>
              {loading ? "Updating..." : "Save Changes"}
            </Button>
          </CardContent>
        </Card>

        {/* SMTP Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              SMTP Configuration
            </CardTitle>
            <CardDescription>Configure email settings for system notifications.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {smtpMessage && (
              <Alert variant={smtpMessage.type === "error" ? "destructive" : "default"} className={smtpMessage.type === "success" ? "border-green-500 text-green-500" : ""}>
                {smtpMessage.type === "success" ? <Check className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <AlertDescription>{smtpMessage.text}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="smtp-host">SMTP Host</Label>
                <div className="relative">
                  <Server className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="smtp-host" 
                    placeholder="smtp.hostinger.com" 
                    className="pl-9"
                    value={smtpSettings.host}
                    onChange={(e) => setSmtpSettings({...smtpSettings, host: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-port">Port</Label>
                <Input 
                  id="smtp-port" 
                  placeholder="465" 
                  value={smtpSettings.port}
                  onChange={(e) => setSmtpSettings({...smtpSettings, port: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="smtp-user">SMTP Username</Label>
              <Input 
                id="smtp-user" 
                placeholder="info@lugvia.com" 
                value={smtpSettings.user}
                onChange={(e) => setSmtpSettings({...smtpSettings, user: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="smtp-pass">SMTP Password</Label>
              <Input 
                id="smtp-pass" 
                type="password" 
                placeholder={smtpSettings.password === "********" ? "********" : "Enter SMTP password"}
                value={smtpSettings.password}
                onChange={(e) => setSmtpSettings({...smtpSettings, password: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="from-email">From Email</Label>
              <Input 
                id="from-email" 
                placeholder="Lugvia <info@lugvia.com>" 
                value={smtpSettings.fromEmail}
                onChange={(e) => setSmtpSettings({...smtpSettings, fromEmail: e.target.value})}
              />
            </div>

            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="secure"
                className="h-4 w-4 rounded border-gray-300"
                checked={smtpSettings.secure}
                onChange={(e) => setSmtpSettings({...smtpSettings, secure: e.target.checked})}
              />
              <Label htmlFor="secure">Use Secure Connection (SSL/TLS)</Label>
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <Button onClick={handleSaveSmtp} disabled={smtpLoading}>
                {smtpLoading ? "Saving..." : "Save Configuration"}
              </Button>

              <div className="border-t pt-4 mt-2">
                <Label className="mb-2 block">Test Configuration</Label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Enter email to test" 
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                  />
                  <Button variant="outline" onClick={handleTestEmail} disabled={smtpLoading || !testEmail}>
                    Send Test
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
