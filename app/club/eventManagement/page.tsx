'use client'
import {
  Eye, Edit, Trash2, Plus, X, ChevronLeft, ChevronRight,
  MapPin, Users, Calendar, DollarSign, Star,
} from 'lucide-react';
import { useState } from 'react';

type Event = {
  id: string;
  name: string;
  date: string;
  location: string;
  fee: string;
  registrations: number;
  status: 'Active' | 'Pending';
  featured: boolean;
  views: number;
  confirmed: number;
  pending: number;
  capacity: number;
  description?: string;
  contactEmail?: string;
  contactPhone?: string;
};

const fakeEvents: Event[] = [
  {
    id: 'e1', name: 'Youth Trial - Summer 2025', date: '15/09/2025',
    location: 'Barcelona, Spain', fee: '€50', registrations: 45,
    status: 'Active', featured: true, views: 842, confirmed: 38, pending: 7,
    capacity: 100, description: 'Comprehensive trial for talented young players.',
    contactEmail: 'events@fcbarcelonayouth.com', contactPhone: '+34 933 00 22 11',
  },
  {
    id: 'e2', name: 'Academy Showcase', date: '20/09/2025',
    location: 'Barcelona, Spain', fee: '€75', registrations: 67,
    status: 'Active', featured: false, views: 1245, confirmed: 59, pending: 8,
    capacity: 120,
  },
  {
    id: 'e3', name: 'Talent Scouting Day', date: '25/09/2025',
    location: 'Madrid, Spain', fee: '€40', registrations: 23,
    status: 'Pending', featured: false, views: 389, confirmed: 0, pending: 23,
    capacity: 60,
  },
];

export default function EventManagementPage() {
  const [events, setEvents] = useState(fakeEvents);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [mode, setMode] = useState<'view' | 'edit' | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const openView = (ev: Event) => { setSelectedEvent(ev); setMode('view'); };
  const openEdit = (ev: Event) => { setSelectedEvent(ev); setMode('edit'); };
  const closeModal = () => { setSelectedEvent(null); setMode(null); };

  const handleDelete = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    setShowDeleteConfirm(null);
  };

  return (
    <div className="min-h-screen bg-[#0f1229] text-gray-100 p-6 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Event Management
          </h1>
          <button
            onClick={() => setShowCreate(true)}
            className="bg-[#04B5A3] hover:bg-[#039d8f] px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 shadow-md transition-colors"
          >
            <Plus size={18} /> Create Event
          </button>
        </div>

        {/* Table */}
        <div className="bg-[#12143A]/90 backdrop-blur-sm border border-[#1e2550] rounded-xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#1a1f4a]/70">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Event Name</th>
                  <th className="px-4 py-4 text-left">Date</th>
                  <th className="px-4 py-4 text-left">Location</th>
                  <th className="px-4 py-4 text-left">Fee</th>
                  <th className="px-4 py-4 text-center">Registrations</th>
                  <th className="px-4 py-4 text-center">Status</th>
                  <th className="px-4 py-4 text-center">Featured</th>
                  <th className="px-4 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2a3366]">
                {events.map(ev => (
                  <tr key={ev.id} className="hover:bg-[#1a1f4a]/40 transition-colors">
                    <td className="px-6 py-4 font-medium">{ev.name}</td>
                    <td className="px-4 py-4">{ev.date}</td>
                    <td className="px-4 py-4">{ev.location}</td>
                    <td className="px-4 py-4">{ev.fee}</td>
                    <td className="px-4 py-4 text-center">{ev.registrations}</td>
                    <td className="px-4 py-4 text-center">
                      <span className={`
                        px-3 py-1 rounded-full text-xs font-medium
                        ${ev.status === 'Active' ? 'bg-green-900/50 text-green-300' : 'bg-amber-900/50 text-amber-300'}
                      `}>
                        {ev.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      {ev.featured ? <Star size={18} className="text-yellow-400 mx-auto" fill="currentColor" /> : <span>—</span>}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <button onClick={() => openView(ev)} className="text-cyan-400 hover:text-cyan-300">
                          <Eye size={18} />
                        </button>
                        <button onClick={() => openEdit(ev)} className="text-blue-400 hover:text-blue-300">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => setShowDeleteConfirm(ev.id)} className="text-rose-400 hover:text-rose-300">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* ─── View / Edit Modal ──────────────────────────────────────── */}
      {selectedEvent && mode && (
        <EventModal
          event={selectedEvent}
          mode={mode}
          onClose={closeModal}
          onSave={(updated) => {
            setEvents(prev => prev.map(e => e.id === updated.id ? updated : e));
            closeModal();
          }}
        />
      )}

      {/* ─── Delete Confirmation ────────────────────────────────────── */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#12143A] border border-rose-800/50 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-rose-300 mb-4">Delete Event?</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete <strong>{events.find(e => e.id === showDeleteConfirm)?.name}</strong>?<br />
              This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="px-5 py-2.5 bg-rose-700 hover:bg-rose-600 rounded-lg font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Create Multi-step Modal ────────────────────────────────── */}
      {showCreate && (
        <CreateEventModal onClose={() => setShowCreate(false)} />
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────
   Event View/Edit Modal
───────────────────────────────────────────────── */
type ModalProps = {
  event: Event;
  mode: 'view' | 'edit';
  onClose: () => void;
  onSave?: (updated: Event) => void;
};

function EventModal({ event, mode, onClose, onSave }: ModalProps) {
  const isEdit = mode === 'edit';
  const [form, setForm] = useState(event);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-[#0f1229] border border-[#1e2550] rounded-xl w-full max-w-5xl max-h-[92vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#12143A] border-b border-[#2a3366] px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {event.name}
            </h2>
            <div className="flex gap-3 mt-1">
              <span className="px-3 py-1 bg-green-900/50 text-green-300 text-xs rounded-full font-medium">
                Active
              </span>
              {event.featured && (
                <span className="px-3 py-1 bg-yellow-900/50 text-yellow-300 text-xs rounded-full font-medium flex items-center gap-1">
                  <Star size={14} fill="currentColor" /> Featured Event
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-3">
            {isEdit ? (
              <>
                <button onClick={onClose} className="px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg">
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-[#04B5A3] hover:bg-[#039d8f] rounded-lg font-medium shadow-md"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <>
                <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg">
                  <X size={24} />
                </button>
              </>
            )}
          </div>
        </div>

        <div className="p-6 grid md:grid-cols-2 gap-6">

          {/* Left column - Stats */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatBox icon={<Eye />} label="Event Views" value={`${event.views}`} trend="+23% this week" />
              <StatBox icon={<Users />} label="Total Registrations" value={`${event.registrations}/${event.capacity}`} />
              <StatBox icon={<Users className="text-green-400" />} label="Confirmed" value={event.confirmed.toString()} trend={`${Math.round(event.confirmed / event.registrations * 100)}% confirmed`} />
              <StatBox icon={<Calendar className="text-amber-400" />} label="Pending" value={event.pending.toString()} trend="Awaiting confirmation" />
            </div>

            <div className="bg-[#1a1f4a]/40 rounded-xl p-5 border border-[#2a3366]">
              <h3 className="font-semibold mb-3">Event Details</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-400">Registration Fee</dt>
                  <dd>{event.fee}</dd>
                </div>
                {isEdit ? (
                  <>
                    <div>
                      <label className="block text-gray-400 mb-1">Description</label>
                      <textarea
                        name="description"
                        value={form.description || ''}
                        onChange={handleChange}
                        className="w-full bg-[#0f1229] border border-[#2a3366] rounded-lg p-3 text-sm min-h-[100px]"
                      />
                    </div>
                  </>
                ) : (
                  <div>
                    <dt className="text-gray-400">Description</dt>
                    <dd className="mt-1">{event.description || '—'}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>

          {/* Right column - Participants / Contact */}
          <div className="space-y-6">
            <div className="bg-[#1a1f4a]/40 rounded-xl p-5 border border-[#2a3366]">
              <h3 className="font-semibold mb-3 flex items-center justify-between">
                Registered Participants
                <input
                  placeholder="Search registrants..."
                  className="bg-[#0f1229] border border-[#2a3366] rounded-lg px-3 py-1.5 text-sm w-48"
                />
              </h3>
              <div className="space-y-3 text-sm">
                {['John Doe • Midfielder • 18y', 'Sarah Player • Forward • 17y', 'Mike Johnson • Defender • 20y'].map((p, i) => (
                  <div key={i} className="flex justify-between items-center bg-[#12143A]/60 p-3 rounded-lg">
                    <span>{p}</span>
                    <div className="flex gap-3">
                      <span className="text-green-300">Confirmed</span>
                      <Eye size={16} className="text-cyan-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1a1f4a]/40 rounded-xl p-5 border border-[#2a3366]">
              <h3 className="font-semibold mb-3">Contact Information</h3>
              {isEdit ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 mb-1">Email</label>
                    <input
                      name="contactEmail"
                      value={form.contactEmail || ''}
                      onChange={handleChange}
                      className="w-full bg-[#0f1229] border border-[#2a3366] rounded-lg px-4 py-2.5"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1">Phone</label>
                    <input
                      name="contactPhone"
                      value={form.contactPhone || ''}
                      onChange={handleChange}
                      className="w-full bg-[#0f1229] border border-[#2a3366] rounded-lg px-4 py-2.5"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-sm">
                  <p><strong>Email:</strong> {event.contactEmail}</p>
                  <p><strong>Phone:</strong> {event.contactPhone}</p>
                </div>
              )}
            </div>

            {isEdit && (
              <div className="bg-gradient-to-r from-rose-950/70 to-red-950/50 border border-rose-800/50 rounded-xl p-5">
                <h3 className="font-semibold text-rose-300 mb-3">Danger Zone</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 bg-rose-900/70 hover:bg-rose-800/70 border border-rose-700 rounded-lg py-2.5 font-medium">
                    Cancel Event
                  </button>
                  <button className="flex-1 bg-red-900/70 hover:bg-red-800/70 border border-red-700 rounded-lg py-2.5 font-medium">
                    Delete Event
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({ icon, label, value, trend }: { icon: React.ReactNode; label: string; value: string; trend?: string }) {
  return (
    <div className="bg-[#1a1f4a]/50 rounded-xl p-4 border border-[#2a3366]">
      <div className="text-cyan-400 mb-1">{icon}</div>
      <div className="text-xs text-gray-400">{label}</div>
      <div className="text-xl font-bold mt-1">{value}</div>
      {trend && <div className="text-xs mt-1 text-cyan-300">{trend}</div>}
    </div>
  );
}

/* ────────────────────────────────────────────────
   Multi-step Create Event Modal (simplified)
───────────────────────────────────────────────── */
function CreateEventModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);

  const next = () => setStep(s => Math.min(4, s + 1));
  const prev = () => setStep(s => Math.max(1, s - 1));

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0f1229] border border-[#1e2550] rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="sticky top-0 bg-[#12143A] border-b border-[#2a3366] px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg">
              <ChevronLeft />
            </button>
            <div>
              <h2 className="text-xl font-bold">Create New Event</h2>
              <p className="text-sm text-gray-400">Step {step} of 4 – {['Basic info', 'Location', 'Details', 'Review & publish'][step - 1]}</p>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="px-6 pt-5 pb-2">
          <div className="h-1.5 bg-[#2a3366] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00E5FF] to-[#9C27B0] transition-all duration-500"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            {['Basic info', 'Location', 'Details', 'Review'].map((s, i) => (
              <span key={s} className={i + 1 <= step ? 'text-[#00E5FF]' : ''}>
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Content per step */}
        <div className="p-6">
          {step === 1 && <Step1 onNext={next} />}
          {step === 2 && <Step2 onNext={next} onPrev={prev} />}
          {step === 3 && <Step3 onNext={next} onPrev={prev} />}
          {step === 4 && <Step4 onPrev={prev} onClose={onClose} />}
        </div>
      </div>
    </div>
  );
}

// Very simplified placeholders — you can expand inputs & validation
function Step1({ onNext }: { onNext: () => void }) {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-gray-300 mb-2">Event Name *</label>
          <input className="w-full bg-[#12143A] border border-[#2a3366] rounded-lg px-4 py-3" placeholder="Youth Summer Trial 2025" />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-2">Event Type *</label>
          <select className="w-full bg-[#12143A] border border-[#2a3366] rounded-lg px-4 py-3">
            <option>Trial</option>
            <option>Showcase</option>
            <option>Camp</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm text-gray-300 mb-2">Minimum Age</label>
          <input className="w-full bg-[#12143A] border border-[#2a3366] rounded-lg px-4 py-3" placeholder="16" />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-2">Maximum Age</label>
          <input className="w-full bg-[#12143A] border border-[#2a3366] rounded-lg px-4 py-3" placeholder="21" />
        </div>
        <div className="col-span-1 md:col-span-1">
          <label className="block text-sm text-gray-300 mb-2">Date *</label>
          <input type="date" className="w-full bg-[#12143A] border border-[#2a3366] rounded-lg px-4 py-3" />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="bg-[#04B5A3] hover:bg-[#039d8f] px-8 py-3 rounded-lg font-medium shadow-md"
        >
          Next Step →
        </button>
      </div>
    </div>
  );
}

function Step2({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <MapPin size={20} className="text-[#00E5FF]" /> Venue Location
          </h3>
          <input placeholder="Venue Name *" className="w-full bg-[#12143A] border border-[#2a3366] rounded-lg px-4 py-3" />
          <input placeholder="Street Address *" className="w-full bg-[#12143A] border border-[#2a3366] rounded-lg px-4 py-3" />
          <div className="grid grid-cols-3 gap-4">
            <input placeholder="City *" className="bg-[#12143A] border border-[#2a3366] rounded-lg px-4 py-3" />
            <input placeholder="Postal Code" className="bg-[#12143A] border border-[#2a3366] rounded-lg px-4 py-3" />
            <select className="bg-[#12143A] border border-[#2a3366] rounded-lg px-4 py-3">
              <option>Spain</option>
              <option>Portugal</option>
            </select>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-[#1a1f4a]/50 p-5 rounded-xl border border-[#2a3366]">
            <h4 className="font-medium mb-3">Location Tips</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Provide exact venue address</li>
              <li>• Ensure venue is easily accessible</li>
              <li>• Mention public transport options</li>
            </ul>
          </div>

          <div className="space-y-4">
            <label className="block text-sm text-gray-300">Maximum Capacity *</label>
            <input type="number" defaultValue={100} className="w-full bg-[#12143A] border border-[#2a3366] rounded-lg px-4 py-3" />
            <label className="block text-sm text-gray-300">Registration Fee *</label>
            <input type="text" defaultValue="€50.00" className="w-full bg-[#12143A] border border-[#2a3366] rounded-lg px-4 py-3" />
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={onPrev} className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg">
          ← Previous Step
        </button>
        <button onClick={onNext} className="bg-[#04B5A3] hover:bg-[#039d8f] px-8 py-3 rounded-lg font-medium shadow-md">
          Next Step →
        </button>
      </div>
    </div>
  );
}

// Step 3 & 4 left as placeholders — expand similarly
function Step3({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  return (
    <div className="space-y-8">
      <h3 className="text-lg font-semibold">Event Description & Media</h3>
      <textarea
        placeholder="Full description... what participants can expect, format, coaches, etc."
        className="w-full bg-[#12143A] border border-[#2a3366] rounded-lg p-4 min-h-[180px]"
      />
      {/* Upload area placeholder */}
      <div className="border-2 border-dashed border-[#2a3366] rounded-xl p-10 text-center text-gray-400">
        Click or drag Event Banner image (1920×1080 recommended)
      </div>

      <div className="flex justify-between">
        <button onClick={onPrev} className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg">
          ← Previous Step
        </button>
        <button onClick={onNext} className="bg-[#04B5A3] hover:bg-[#039d8f] px-8 py-3 rounded-lg font-medium shadow-md">
          Next Step →
        </button>
      </div>
    </div>
  );
}

function Step4({ onPrev, onClose }: { onPrev: () => void; onClose: () => void }) {
  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold text-center text-[#00E5FF]">Review & Publish</h3>

      <div className="bg-[#1a1f4a]/60 rounded-xl p-6 border border-[#2a3366] space-y-6">
        <div className="text-center">
          <div className="h-40 bg-gradient-to-br from-[#00E5FF]/20 to-[#9C27B0]/20 rounded-lg flex items-center justify-center mb-4">
            [ Event Banner Preview ]
          </div>
          <h4 className="text-xl font-semibold">Youth Summer Trial 2025</h4>
          <p className="text-gray-400 mt-1">Trial • 16–21 years • Barcelona, Spain • €50</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <p><strong>Date:</strong> 15/09/2025 10:00 – 17:00</p>
            <p><strong>Capacity:</strong> 100 participants</p>
          </div>
          <div>
            <p><strong>Contact:</strong> events@fcbarcelonayouth.com</p>
            <p><strong>Fee:</strong> €50</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={onPrev} className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg">
          ← Previous Step
        </button>
        <button
          onClick={() => {
            alert('Event published! (fake action)');
            onClose();
          }}
          className="bg-gradient-to-r from-[#00E5FF] to-[#9C27B0] px-10 py-3 rounded-lg font-bold shadow-lg hover:brightness-110 transition"
        >
          Publish Event
        </button>
      </div>
    </div>
  );
}