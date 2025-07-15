import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const sectionTitles = {
  application: 'Application Settings',
  database: 'Database Configuration',
  api: 'API Management',
  email: 'Email Configuration',
  storage: 'File Storage',
  backup: 'Backup & Recovery',
  performance: 'Performance Tuning',
  logging: 'Logging & Monitoring',
  health: 'System Health',
  maintenance: 'Maintenance Mode',
};

function ApplicationSettingsForm() {
  const [form, setForm] = useState({
    appName: '',
    logo: null,
    language: 'en',
    timezone: 'UTC',
    theme: 'system',
  });
  return (
    <form className="space-y-6">
      <div>
        <label className="block font-medium mb-1">Application Name</label>
        <input type="text" className="input" value={form.appName} onChange={e => setForm(f => ({...f, appName: e.target.value}))} />
      </div>
      <div>
        <label className="block font-medium mb-1">Logo</label>
        <input type="file" className="input" onChange={e => setForm(f => ({...f, logo: e.target.files[0]}))} />
      </div>
      <div>
        <label className="block font-medium mb-1">Default Language</label>
        <select className="input" value={form.language} onChange={e => setForm(f => ({...f, language: e.target.value}))}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
      </div>
      <div>
        <label className="block font-medium mb-1">Timezone</label>
        <input type="text" className="input" value={form.timezone} onChange={e => setForm(f => ({...f, timezone: e.target.value}))} />
      </div>
      <div>
        <label className="block font-medium mb-1">Theme</label>
        <select className="input" value={form.theme} onChange={e => setForm(f => ({...f, theme: e.target.value}))}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>
      <button className="btn-primary mt-4" disabled>Save Changes</button>
    </form>
  );
}

function DatabaseConfigForm() {
  const [form, setForm] = useState({
    type: 'PostgreSQL',
    host: '',
    port: '',
    username: '',
    password: '',
  });
  return (
    <form className="space-y-6">
      <div>
        <label className="block font-medium mb-1">Database Type</label>
        <select className="input" value={form.type} onChange={e => setForm(f => ({...f, type: e.target.value}))}>
          <option>PostgreSQL</option>
          <option>MySQL</option>
          <option>SQLite</option>
          <option>MongoDB</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Host</label>
          <input type="text" className="input" value={form.host} onChange={e => setForm(f => ({...f, host: e.target.value}))} />
        </div>
        <div>
          <label className="block font-medium mb-1">Port</label>
          <input type="text" className="input" value={form.port} onChange={e => setForm(f => ({...f, port: e.target.value}))} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Username</label>
          <input type="text" className="input" value={form.username} onChange={e => setForm(f => ({...f, username: e.target.value}))} />
        </div>
        <div>
          <label className="block font-medium mb-1">Password</label>
          <input type="password" className="input" value={form.password} onChange={e => setForm(f => ({...f, password: e.target.value}))} />
        </div>
      </div>
      <button className="btn-primary mt-4" disabled>Save Changes</button>
      <button className="btn-secondary ml-4" type="button" disabled>Test Connection</button>
    </form>
  );
}

function APIManagementForm() {
  const [form, setForm] = useState({
    baseUrl: '',
    apiKey: '************',
    enabled: true,
    allowedOrigins: '',
  });
  return (
    <form className="space-y-6">
      <div>
        <label className="block font-medium mb-1">API Base URL</label>
        <input type="text" className="input" value={form.baseUrl} onChange={e => setForm(f => ({...f, baseUrl: e.target.value}))} />
      </div>
      <div>
        <label className="block font-medium mb-1">API Key</label>
        <div className="flex items-center space-x-2">
          <input type="text" className="input flex-1" value={form.apiKey} readOnly />
          <button className="btn-secondary" type="button" disabled>Regenerate</button>
        </div>
      </div>
      <div>
        <label className="block font-medium mb-1">Enable API</label>
        <input type="checkbox" checked={form.enabled} onChange={e => setForm(f => ({...f, enabled: e.target.checked}))} className="ml-2" />
      </div>
      <div>
        <label className="block font-medium mb-1">Allowed Origins (CORS)</label>
        <input type="text" className="input" value={form.allowedOrigins} onChange={e => setForm(f => ({...f, allowedOrigins: e.target.value}))} placeholder="e.g. https://yourdomain.com" />
      </div>
      <button className="btn-primary mt-4" disabled>Save Changes</button>
    </form>
  );
}

function EmailConfigForm() {
  const [form, setForm] = useState({
    smtpHost: '',
    smtpPort: '',
    username: '',
    password: '',
    from: '',
  });
  return (
    <form className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">SMTP Host</label>
          <input type="text" className="input" value={form.smtpHost} onChange={e => setForm(f => ({...f, smtpHost: e.target.value}))} />
        </div>
        <div>
          <label className="block font-medium mb-1">SMTP Port</label>
          <input type="text" className="input" value={form.smtpPort} onChange={e => setForm(f => ({...f, smtpPort: e.target.value}))} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Username</label>
          <input type="text" className="input" value={form.username} onChange={e => setForm(f => ({...f, username: e.target.value}))} />
        </div>
        <div>
          <label className="block font-medium mb-1">Password</label>
          <input type="password" className="input" value={form.password} onChange={e => setForm(f => ({...f, password: e.target.value}))} />
        </div>
      </div>
      <div>
        <label className="block font-medium mb-1">From Address</label>
        <input type="email" className="input" value={form.from} onChange={e => setForm(f => ({...f, from: e.target.value}))} />
      </div>
      <button className="btn-primary mt-4" disabled>Save Changes</button>
      <button className="btn-secondary ml-4" type="button" disabled>Send Test Email</button>
    </form>
  );
}

function FileStorageForm() {
  const [form, setForm] = useState({
    provider: 'Local',
    bucket: '',
    accessKey: '',
    secret: '',
    region: '',
  });
  return (
    <form className="space-y-6">
      <div>
        <label className="block font-medium mb-1">Storage Provider</label>
        <select className="input" value={form.provider} onChange={e => setForm(f => ({...f, provider: e.target.value}))}>
          <option>Local</option>
          <option>AWS S3</option>
          <option>Azure Blob</option>
          <option>Google Cloud Storage</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Bucket/Container</label>
          <input type="text" className="input" value={form.bucket} onChange={e => setForm(f => ({...f, bucket: e.target.value}))} />
        </div>
        <div>
          <label className="block font-medium mb-1">Region</label>
          <input type="text" className="input" value={form.region} onChange={e => setForm(f => ({...f, region: e.target.value}))} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Access Key</label>
          <input type="text" className="input" value={form.accessKey} onChange={e => setForm(f => ({...f, accessKey: e.target.value}))} />
        </div>
        <div>
          <label className="block font-medium mb-1">Secret</label>
          <input type="password" className="input" value={form.secret} onChange={e => setForm(f => ({...f, secret: e.target.value}))} />
        </div>
      </div>
      <button className="btn-primary mt-4" disabled>Save Changes</button>
    </form>
  );
}

function BackupRecoveryForm() {
  const [form, setForm] = useState({
    frequency: 'Daily',
    retention: '30',
  });
  return (
    <form className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Backup Frequency</label>
          <select className="input" value={form.frequency} onChange={e => setForm(f => ({...f, frequency: e.target.value}))}>
            <option>Hourly</option>
            <option>Daily</option>
            <option>Weekly</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Retention Period (days)</label>
          <input type="number" className="input" value={form.retention} onChange={e => setForm(f => ({...f, retention: e.target.value}))} />
        </div>
      </div>
      <button className="btn-primary mt-4" disabled>Save Changes</button>
      <button className="btn-secondary ml-4" type="button" disabled>Manual Backup</button>
      <button className="btn-secondary ml-4" type="button" disabled>Restore from Backup</button>
    </form>
  );
}

function PerformanceTuningForm() {
  const [form, setForm] = useState({
    cacheSize: '128',
    queryCaching: true,
    maxUsers: '100',
    resourceLimit: 'Standard',
  });
  return (
    <form className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Cache Size (MB)</label>
          <input type="number" className="input" value={form.cacheSize} onChange={e => setForm(f => ({...f, cacheSize: e.target.value}))} />
        </div>
        <div>
          <label className="block font-medium mb-1">Max Concurrent Users</label>
          <input type="number" className="input" value={form.maxUsers} onChange={e => setForm(f => ({...f, maxUsers: e.target.value}))} />
        </div>
      </div>
      <div>
        <label className="block font-medium mb-1">Enable Query Caching</label>
        <input type="checkbox" checked={form.queryCaching} onChange={e => setForm(f => ({...f, queryCaching: e.target.checked}))} className="ml-2" />
      </div>
      <div>
        <label className="block font-medium mb-1">Resource Limit</label>
        <select className="input" value={form.resourceLimit} onChange={e => setForm(f => ({...f, resourceLimit: e.target.value}))}>
          <option>Standard</option>
          <option>High</option>
          <option>Unlimited</option>
        </select>
      </div>
      <button className="btn-primary mt-4" disabled>Save Changes</button>
    </form>
  );
}

function LoggingMonitoringForm() {
  const [form, setForm] = useState({
    logLevel: 'Info',
    retention: '30',
    emailAlerts: false,
    alertEmail: '',
  });
  return (
    <form className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Log Level</label>
          <select className="input" value={form.logLevel} onChange={e => setForm(f => ({...f, logLevel: e.target.value}))}>
            <option>Debug</option>
            <option>Info</option>
            <option>Warning</option>
            <option>Error</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Log Retention (days)</label>
          <input type="number" className="input" value={form.retention} onChange={e => setForm(f => ({...f, retention: e.target.value}))} />
        </div>
      </div>
      <div>
        <label className="block font-medium mb-1">Enable Email Alerts</label>
        <input type="checkbox" checked={form.emailAlerts} onChange={e => setForm(f => ({...f, emailAlerts: e.target.checked}))} className="ml-2" />
      </div>
      <div>
        <label className="block font-medium mb-1">Alert Email</label>
        <input type="email" className="input" value={form.alertEmail} onChange={e => setForm(f => ({...f, alertEmail: e.target.value}))} />
      </div>
      <button className="btn-primary mt-4" disabled>Save Changes</button>
    </form>
  );
}

function SystemHealthPanel() {
  // Mocked stats
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="font-medium">Uptime</div>
          <div>12 days, 4 hours</div>
        </div>
        <div>
          <div className="font-medium">Last Backup</div>
          <div>2024-06-01 02:00 UTC</div>
        </div>
        <div>
          <div className="font-medium">Disk Usage</div>
          <div>42% (420GB/1TB)</div>
        </div>
        <div>
          <div className="font-medium">CPU Usage</div>
          <div>23%</div>
        </div>
        <div>
          <div className="font-medium">Memory Usage</div>
          <div>68%</div>
        </div>
      </div>
    </div>
  );
}

function MaintenanceModeForm() {
  const [form, setForm] = useState({
    enabled: false,
    message: '',
    schedule: '',
  });
  return (
    <form className="space-y-6">
      <div>
        <label className="block font-medium mb-1">Enable Maintenance Mode</label>
        <input type="checkbox" checked={form.enabled} onChange={e => setForm(f => ({...f, enabled: e.target.checked}))} className="ml-2" />
      </div>
      <div>
        <label className="block font-medium mb-1">Custom Message</label>
        <input type="text" className="input" value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} placeholder="We'll be back soon!" />
      </div>
      <div>
        <label className="block font-medium mb-1">Schedule Maintenance Window</label>
        <input type="datetime-local" className="input" value={form.schedule} onChange={e => setForm(f => ({...f, schedule: e.target.value}))} />
      </div>
      <button className="btn-primary mt-4" disabled>Save Changes</button>
    </form>
  );
}

const sectionForms = {
  application: <ApplicationSettingsForm />,
  database: <DatabaseConfigForm />,
  api: <APIManagementForm />,
  email: <EmailConfigForm />,
  storage: <FileStorageForm />,
  backup: <BackupRecoveryForm />,
  performance: <PerformanceTuningForm />,
  logging: <LoggingMonitoringForm />,
  health: <SystemHealthPanel />,
  maintenance: <MaintenanceModeForm />,
};

const SystemPreferences = () => {
  const [searchParams] = useSearchParams();
  const activeSection = searchParams.toString() ? Object.keys(Object.fromEntries(searchParams))[0] : 'application';
  const title = sectionTitles[activeSection] || 'System Preferences';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">System Preferences</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage system-level settings and configurations for your QubitHire platform.</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{title}</h2>
        <div className="text-gray-600 dark:text-gray-300">
          {sectionForms[activeSection] || <p>Select a section from the System Preferences dropdown.</p>}
        </div>
      </div>
    </div>
  );
};

export default SystemPreferences; 