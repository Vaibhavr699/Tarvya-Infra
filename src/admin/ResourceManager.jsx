import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Plus, Pencil, Trash2, Eye, EyeOff, X, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { ImageField, ImagesField, VideoField, FileField, ListField, UnitsField, DetailsField } from './fields';

const badgeTones = {
  green: 'bg-green-100 text-green-700',
  blue: 'bg-brand-50 text-brand-800',
  amber: 'bg-amber-100 text-amber-700',
};

const slugify = (text = '') =>
  text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');

const emptyValues = (fields) =>
  Object.fromEntries(fields.map((f) => [f.name, f.default ?? (f.type === 'checkbox' ? false : '')]));

const toPayload = (fields, values) => {
  const payload = {};
  for (const field of fields) {
    let value = values[field.name];
    if (field.type === 'number' || field.numeric) {
      value = value === '' || value === null || value === undefined ? null : Number(value);
    } else if (['text', 'textarea', 'image', 'video', 'file'].includes(field.type)) {
      value = typeof value === 'string' ? value.trim() || null : value ?? null;
    }
    payload[field.name] = value;
  }
  if ('slug' in payload && !payload.slug) payload.slug = slugify(values.title);
  if ('sort_order' in payload && payload.sort_order === null) payload.sort_order = 0;
  return payload;
};

const FieldInput = ({ field, value, onChange, folder }) => {
  switch (field.type) {
    case 'textarea':
      return <textarea className="field resize-y" rows={field.rows || 3} value={value ?? ''} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} required={field.required} />;
    case 'number':
      return <input type="number" step={field.step || '1'} className="field" value={value ?? ''} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} />;
    case 'select':
      return (
        <select className="field" value={value ?? ''} onChange={(e) => onChange(e.target.value)}>
          {field.options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      );
    case 'checkbox':
      return (
        <label className="inline-flex items-center gap-2.5 text-gray-700">
          <input type="checkbox" className="w-4 h-4 accent-brand-800" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} />
          {field.label}
        </label>
      );
    case 'image':
      return <ImageField value={value} onChange={onChange} folder={folder} />;
    case 'images':
      return <ImagesField value={value || []} onChange={onChange} folder={folder} />;
    case 'video':
      return <VideoField value={value} onChange={onChange} folder={folder} />;
    case 'file':
      return <FileField value={value} onChange={onChange} folder={folder} />;
    case 'list':
      return <ListField value={value || []} onChange={onChange} placeholder={field.placeholder} />;
    case 'units':
      return <UnitsField value={value || []} onChange={onChange} />;
    case 'details':
      return <DetailsField value={value || {}} onChange={onChange} keys={field.keys} />;
    default:
      return <input type="text" className="field" value={value ?? ''} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} required={field.required} />;
  }
};

const EditorModal = ({ resource, initial, onClose, onSaved }) => {
  const [values, setValues] = useState(initial);
  const [saving, setSaving] = useState(false);
  const Preview = resource.preview;

  const setField = (name, value) => setValues((v) => ({ ...v, [name]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const missing = resource.fields.find((f) => f.required && !values[f.name]);
    if (missing) {
      toast.error(`${missing.label} is required.`);
      return;
    }

    setSaving(true);
    const payload = toPayload(resource.fields, values);
    const query = values.id
      ? supabase.from(resource.table).update(payload).eq('id', values.id)
      : supabase.from(resource.table).insert(payload);
    const { error } = await query;
    setSaving(false);

    if (error) {
      toast.error(error.code === '23505' ? 'That URL slug is already used by another property.' : error.message);
      return;
    }
    toast.success(`${resource.singular[0].toUpperCase()}${resource.singular.slice(1)} saved.`);
    onSaved();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-gray-900/40 backdrop-blur-sm" onClick={onClose}>
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="flex h-full w-full max-w-2xl flex-col bg-white shadow-elevated"
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-xl font-bold">
            {values.id ? 'Edit' : 'Add'} {resource.singular}
          </h2>
          <button type="button" onClick={onClose} className="grid place-items-center w-9 h-9 rounded-full hover:bg-gray-100" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
          {Preview && (
            <div className="flex justify-center">
              <Preview values={values} />
            </div>
          )}
          {resource.fields.map((field) => (
            <div key={field.name}>
              {field.type !== 'checkbox' && (
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  {field.label}
                  {field.required && <span className="text-red-500"> *</span>}
                </label>
              )}
              <FieldInput field={field} value={values[field.name]} onChange={(v) => setField(field.name, v)} folder={resource.folder} />
              {field.help && <p className="mt-1 text-xs text-gray-500">{field.help}</p>}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-100 px-6 py-4">
          <button type="button" onClick={onClose} className="btn-outline px-5 py-2.5">
            Cancel
          </button>
          <button type="submit" disabled={saving} className="btn-primary px-5 py-2.5">
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

const ResourceManager = ({ resource }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [filterIndex, setFilterIndex] = useState(0);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from(resource.table)
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });
    if (error) toast.error(error.message);
    setRows(data || []);
    setLoading(false);
  }, [resource.table]);

  useEffect(() => {
    setFilterIndex(0);
    setEditing(null);
    load();
  }, [load]);

  const togglePublished = async (row) => {
    const { error } = await supabase.from(resource.table).update({ published: !row.published }).eq('id', row.id);
    if (error) return toast.error(error.message);
    setRows((list) => list.map((r) => (r.id === row.id ? { ...r, published: !r.published } : r)));
  };

  const remove = async (row) => {
    if (!window.confirm(`Delete "${row[resource.primary]}"? This cannot be undone.`)) return;
    const { error } = await supabase.from(resource.table).delete().eq('id', row.id);
    if (error) return toast.error(error.message);
    toast.success('Deleted.');
    setRows((list) => list.filter((r) => r.id !== row.id));
  };

  const filter = resource.filters?.[filterIndex];
  const visibleRows = filter ? rows.filter(filter.test) : rows;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{resource.title}</h1>
          <p className="text-gray-500 text-sm mt-1">
            {rows.length} {rows.length === 1 ? resource.singular : `${resource.singular}s`}
          </p>
        </div>
        <button type="button" onClick={() => setEditing(emptyValues(resource.fields))} className="btn-primary px-5 py-2.5">
          <Plus className="w-5 h-5" /> Add {resource.singular}
        </button>
      </div>

      {resource.filters && (
        <div className="flex flex-wrap gap-2 mb-5">
          {resource.filters.map((f, index) => (
            <button
              key={f.label}
              type="button"
              onClick={() => setFilterIndex(index)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                index === filterIndex ? 'bg-brand-800 text-white' : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50'
              }`}
            >
              {f.label} ({rows.filter(f.test).length})
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20 text-gray-500">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : visibleRows.length === 0 ? (
        <div className="card p-10 text-center text-gray-500">Nothing here yet. Click “Add {resource.singular}” to create one.</div>
      ) : (
        <div className="card divide-y divide-gray-100">
          {visibleRows.map((row) => {
            const image = row[resource.image];
            return (
              <div key={row.id} className={`flex items-center gap-4 p-4 ${row.published ? '' : 'opacity-60'}`}>
                {image ? (
                  <img
                    src={image}
                    alt=""
                    className={`w-16 h-16 shrink-0 object-cover ring-1 ring-gray-200 ${resource.imageShape === 'circle' ? 'rounded-full' : 'rounded-xl'}`}
                  />
                ) : (
                  <div className={`w-16 h-16 shrink-0 grid place-items-center bg-gray-100 font-bold text-gray-500 ${resource.imageShape === 'circle' ? 'rounded-full' : 'rounded-xl'}`}>
                    {String(row[resource.primary] || '?').charAt(0)}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 truncate">{row[resource.primary]}</p>
                  <p className="text-sm text-gray-500 truncate capitalize">{resource.secondary(row)}</p>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {resource.badges?.(row).map((b) => (
                      <span key={b.label} className={`rounded-full px-2 py-0.5 text-xs font-semibold ${badgeTones[b.tone]}`}>
                        {b.label}
                      </span>
                    ))}
                    {!row.published && <span className="rounded-full px-2 py-0.5 text-xs font-semibold bg-gray-100 text-gray-600">Hidden</span>}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => togglePublished(row)} className="grid place-items-center w-9 h-9 rounded-lg text-gray-500 hover:bg-gray-100" title={row.published ? 'Hide from website' : 'Show on website'}>
                    {row.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button type="button" onClick={() => setEditing(row)} className="grid place-items-center w-9 h-9 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-brand-800" title="Edit">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button type="button" onClick={() => remove(row)} className="grid place-items-center w-9 h-9 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {editing && (
        <EditorModal
          resource={resource}
          initial={{ ...emptyValues(resource.fields), ...editing }}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            load();
          }}
        />
      )}
    </div>
  );
};

export default ResourceManager;
