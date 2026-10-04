import { useEffect, useState } from 'react';
import { NavLink, Link, Routes, Route, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  LayoutDashboard, Building2, MessageSquareQuote, Users, Sofa, LogOut, ExternalLink, Loader2, DownloadCloud,
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { resources } from './resources';
import ResourceManager from './ResourceManager';
import { importExistingContent } from './importContent';
import logo from '../assets/logo.png';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/properties', label: 'Properties', icon: Building2 },
  { to: '/admin/testimonials', label: 'Testimonials', icon: MessageSquareQuote },
  { to: '/admin/team', label: 'Team', icon: Users },
  { to: '/admin/interior', label: 'Interior Projects', icon: Sofa },
];

const CenteredCard = ({ children }) => (
  <div className="min-h-screen grid place-items-center bg-gray-50 px-4 py-12">
    <div className="card w-full max-w-md p-8">{children}</div>
  </div>
);

const SetupNotice = () => (
  <CenteredCard>
    <h1 className="text-2xl font-bold mb-3">Connect Supabase</h1>
    <p className="text-gray-600 mb-4">
      The admin panel needs a Supabase project. Add these two values to a <code>.env</code> file in the project root, then restart <code>npm run dev</code>:
    </p>
    <pre className="rounded-xl bg-gray-900 text-gray-100 text-xs p-4 overflow-x-auto">
      VITE_SUPABASE_URL=...{'\n'}VITE_SUPABASE_ANON_KEY=...
    </pre>
    <p className="text-gray-500 text-sm mt-4">
      Then run <code>supabase/schema.sql</code> in the Supabase SQL editor.
    </p>
  </CenteredCard>
);

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) toast.error(error.message);
  };

  return (
    <CenteredCard>
      <img src={logo} alt="Tarvya Infra" className="h-12 w-auto mb-6" />
      <h1 className="text-2xl font-bold mb-1">Admin sign in</h1>
      <p className="text-gray-500 text-sm mb-6">Manage properties, testimonials, team, and interior projects.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" className="field" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
        <input type="password" className="field" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          Sign in
        </button>
      </form>
    </CenteredCard>
  );
};

const Dashboard = () => {
  const [counts, setCounts] = useState({});
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState('');

  const loadCounts = async () => {
    const entries = await Promise.all(
      Object.entries(resources).map(async ([key, resource]) => {
        const { count } = await supabase.from(resource.table).select('id', { count: 'exact', head: true });
        return [key, count ?? 0];
      })
    );
    setCounts(Object.fromEntries(entries));
  };

  useEffect(() => {
    loadCounts();
  }, []);

  const handleImport = async () => {
    if (!window.confirm('Copy the properties, team, and interior projects currently on the website into the admin panel?')) return;
    setImporting(true);
    try {
      const summary = await importExistingContent(setProgress);
      toast.success(`Imported ${summary.join(', ')}.`);
      loadCounts();
    } catch (error) {
      toast.error(`Import failed: ${error.message}`);
    } finally {
      setImporting(false);
      setProgress('');
    }
  };

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {navItems.slice(1).map(({ to, label, icon: Icon }) => {
          const key = to.split('/').pop();
          return (
            <Link key={to} to={to} className="card card-hover p-5">
              <div className="icon-chip mb-4">
                <Icon className="w-6 h-6" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{counts[key] ?? '–'}</p>
              <p className="text-sm text-gray-500">{label}</p>
            </Link>
          );
        })}
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-bold mb-1">Import current website content</h2>
        <p className="text-gray-600 text-sm mb-4">
          Copies the properties, team members, and interior projects that are currently hard-coded on the site into the
          admin panel, including their images. Safe to run again: properties are updated, and team and interior projects
          are only imported while those sections are empty.
        </p>
        <button type="button" onClick={handleImport} disabled={importing} className="btn-outline px-5 py-2.5">
          {importing ? <Loader2 className="w-4 h-4 animate-spin" /> : <DownloadCloud className="w-4 h-4" />}
          {importing ? progress || 'Importing…' : 'Import content'}
        </button>
      </div>
    </div>
  );
};

const AdminLayout = ({ email }) => (
  <div className="min-h-screen bg-gray-50 md:flex">
    <aside className="md:w-64 md:min-h-screen bg-white border-b md:border-b-0 md:border-r border-gray-100 md:flex md:flex-col">
      <div className="flex items-center justify-between px-5 py-4">
        <img src={logo} alt="Tarvya Infra" className="h-9 w-auto" />
        <span className="text-xs font-semibold uppercase tracking-wide text-brand-700">Admin</span>
      </div>
      <nav className="flex md:flex-col gap-1 overflow-x-auto px-3 pb-3 md:pb-0">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                isActive ? 'bg-brand-800 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="hidden md:block mt-auto border-t border-gray-100 p-4 space-y-2">
        <p className="text-xs text-gray-500 truncate">{email}</p>
        <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand-800">
          <ExternalLink className="w-4 h-4" /> View website
        </a>
        <button type="button" onClick={() => supabase.auth.signOut()} className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600">
          <LogOut className="w-4 h-4" /> Sign out
        </button>
      </div>
    </aside>

    <main className="flex-1 p-5 md:p-10 max-w-6xl">
      <Routes>
        <Route index element={<Dashboard />} />
        {Object.entries(resources).map(([key, resource]) => (
          <Route key={key} path={key} element={<ResourceManager resource={resource} />} />
        ))}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
      <button type="button" onClick={() => supabase.auth.signOut()} className="md:hidden mt-10 flex items-center gap-2 text-sm text-gray-600">
        <LogOut className="w-4 h-4" /> Sign out
      </button>
    </main>
  </div>
);

const AdminApp = () => {
  const [session, setSession] = useState(undefined);
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    if (!isSupabaseConfigured) return undefined;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) {
      setIsAdmin(null);
      return;
    }
    supabase
      .from('admins')
      .select('user_id')
      .eq('user_id', session.user.id)
      .maybeSingle()
      .then(({ data }) => setIsAdmin(Boolean(data)));
  }, [session]);

  if (!isSupabaseConfigured) return <SetupNotice />;

  if (session === undefined || (session && isAdmin === null)) {
    return (
      <div className="min-h-screen grid place-items-center text-gray-500">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (!session) return <LoginForm />;

  if (!isAdmin) {
    return (
      <CenteredCard>
        <h1 className="text-2xl font-bold mb-3">No admin access</h1>
        <p className="text-gray-600 mb-6">
          {session.user.email} is signed in but is not listed as an admin. Add this account to the <code>admins</code> table in Supabase.
        </p>
        <button type="button" onClick={() => supabase.auth.signOut()} className="btn-outline w-full">
          Sign out
        </button>
      </CenteredCard>
    );
  }

  return <AdminLayout email={session.user.email} />;
};

export default AdminApp;
