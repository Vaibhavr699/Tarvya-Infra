import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { ImagePlus, Loader2, X, ArrowLeft, ArrowRight, Plus, Trash2, Video } from 'lucide-react';
import { uploadImage } from './upload';

const DropZone = ({ multiple, onFiles, uploading, compact }) => {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (fileList) => {
    const files = Array.from(fileList || []).filter((f) => f.type.startsWith('image/'));
    if (files.length) onFiles(multiple ? files : files.slice(0, 1));
  };

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
      disabled={uploading}
      className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed text-sm transition-colors ${
        compact ? 'aspect-[4/3] w-full' : 'w-full py-8'
      } ${dragging ? 'border-brand-700 bg-brand-50 text-brand-800' : 'border-gray-200 text-gray-500 hover:border-brand-700 hover:text-brand-800'}`}
    >
      {uploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <ImagePlus className="w-6 h-6" />}
      <span>{uploading ? 'Uploading…' : multiple ? 'Drop images or click to add' : 'Drop an image or click to upload'}</span>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = '';
        }}
      />
    </button>
  );
};

export const ImageField = ({ value, onChange, folder }) => {
  const [uploading, setUploading] = useState(false);

  const handleFiles = async ([file]) => {
    setUploading(true);
    try {
      onChange(await uploadImage(file, folder));
    } catch (error) {
      toast.error(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  if (value) {
    return (
      <div className="relative w-full max-w-xs">
        <img src={value} alt="" className="w-full aspect-[4/3] object-cover rounded-xl ring-1 ring-gray-200" />
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute top-2 right-2 grid place-items-center w-8 h-8 rounded-full bg-white/95 text-gray-700 shadow hover:text-red-600"
          aria-label="Remove image"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return <DropZone onFiles={handleFiles} uploading={uploading} />;
};

const MAX_VIDEO_MB = 50;

export const VideoField = ({ value, onChange, folder }) => {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;
    if (!file.type.startsWith('video/')) {
      toast.error('Please choose a video file.');
      return;
    }
    if (file.size > MAX_VIDEO_MB * 1024 * 1024) {
      toast.error(`Video is ${(file.size / 1024 / 1024).toFixed(0)} MB. The limit is ${MAX_VIDEO_MB} MB — trim or compress it first.`);
      return;
    }
    setUploading(true);
    try {
      onChange(await uploadImage(file, folder));
    } catch (error) {
      toast.error(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  if (value) {
    return (
      <div className="relative w-full max-w-sm">
        <video src={value} controls preload="metadata" className="w-full rounded-xl ring-1 ring-gray-200 bg-black" />
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute top-2 right-2 grid place-items-center w-8 h-8 rounded-full bg-white/95 text-gray-700 shadow hover:text-red-600"
          aria-label="Remove video"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        handleFile(e.dataTransfer.files?.[0]);
      }}
      disabled={uploading}
      className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 py-8 text-sm text-gray-500 transition-colors hover:border-brand-700 hover:text-brand-800"
    >
      {uploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Video className="w-6 h-6" />}
      <span>{uploading ? 'Uploading video… keep this window open' : `Drop a video or click to upload (MP4, up to ${MAX_VIDEO_MB} MB)`}</span>
      <input
        ref={inputRef}
        type="file"
        accept="video/mp4,video/webm,video/quicktime"
        className="hidden"
        onChange={(e) => {
          handleFile(e.target.files?.[0]);
          e.target.value = '';
        }}
      />
    </button>
  );
};

export const ImagesField = ({ value = [], onChange, folder }) => {
  const [uploading, setUploading] = useState(false);

  const handleFiles = async (files) => {
    setUploading(true);
    try {
      const urls = [];
      for (const file of files) urls.push(await uploadImage(file, folder));
      onChange([...value, ...urls]);
    } catch (error) {
      toast.error(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const move = (index, delta) => {
    const next = [...value];
    const target = index + delta;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {value.map((src, index) => (
        <div key={src} className="relative group">
          <img src={src} alt="" className="w-full aspect-[4/3] object-cover rounded-xl ring-1 ring-gray-200" />
          <div className="absolute inset-x-1 bottom-1 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
            <button type="button" onClick={() => move(index, -1)} className="grid place-items-center w-7 h-7 rounded-full bg-white/95 shadow" aria-label="Move left">
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button type="button" onClick={() => move(index, 1)} className="grid place-items-center w-7 h-7 rounded-full bg-white/95 shadow" aria-label="Move right">
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => onChange(value.filter((v) => v !== src))}
            className="absolute top-1 right-1 grid place-items-center w-7 h-7 rounded-full bg-white/95 text-gray-700 shadow hover:text-red-600"
            aria-label="Remove image"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
      <DropZone multiple compact onFiles={handleFiles} uploading={uploading} />
    </div>
  );
};

export const ListField = ({ value = [], onChange, placeholder }) => {
  const [draft, setDraft] = useState('');

  const add = () => {
    const item = draft.trim();
    if (!item || value.includes(item)) return;
    onChange([...value, item]);
    setDraft('');
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((item) => (
          <span key={item} className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 text-brand-800 text-sm px-3 py-1">
            {item}
            <button type="button" onClick={() => onChange(value.filter((v) => v !== item))} aria-label={`Remove ${item}`}>
              <X className="w-3.5 h-3.5" />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="field"
          value={draft}
          placeholder={placeholder}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              add();
            }
          }}
        />
        <button type="button" onClick={add} className="btn-outline px-4 py-2">
          Add
        </button>
      </div>
    </div>
  );
};

export const UnitsField = ({ value = [], onChange }) => {
  const update = (index, key, val) => onChange(value.map((u, i) => (i === index ? { ...u, [key]: val } : u)));

  return (
    <div className="space-y-2">
      {value.map((unit, index) => (
        <div key={index} className="flex gap-2">
          <input className="field" placeholder="Area, e.g. 25000 sq.ft" value={unit.area || ''} onChange={(e) => update(index, 'area', e.target.value)} />
          <input className="field" placeholder="Seats, e.g. 250" value={unit.seats || ''} onChange={(e) => update(index, 'seats', e.target.value)} />
          <button
            type="button"
            onClick={() => onChange(value.filter((_, i) => i !== index))}
            className="grid place-items-center px-3 rounded-xl text-gray-500 hover:text-red-600"
            aria-label="Remove unit"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...value, { area: '', seats: '' }])} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-800">
        <Plus className="w-4 h-4" /> Add unit
      </button>
    </div>
  );
};

export const DetailsField = ({ value = {}, onChange, keys }) => (
  <div className="grid sm:grid-cols-2 gap-3">
    {keys.map(({ key, label }) => (
      <label key={key} className="block">
        <span className="block text-xs font-semibold text-gray-500 mb-1">{label}</span>
        <input className="field" value={value[key] || ''} onChange={(e) => onChange({ ...value, [key]: e.target.value })} />
      </label>
    ))}
  </div>
);
