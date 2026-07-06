import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import { useImageUpload } from "../hooks/useImageUpload";
import { 
  Plus, Save, Trash2, Edit2, X, Image as ImageIcon, 
  Video, Type, Layout, List, Lock, AlertCircle, ShieldCheck, Key, ChevronRight
} from "lucide-react";

const Admin = () => {
  // Security States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [entryPassword, setEntryPassword] = useState("");
  
  // Action Gate States
  const [showGate, setShowGate] = useState(false);
  const [gateType, setGateType] = useState(null); // 'add', 'save', 'delete'
  const [gatePassword, setGatePassword] = useState("");
  const [pendingAction, setPendingAction] = useState(null);
  const [pendingId, setPendingId] = useState(null);

  // Data States
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    type: "split",
    title: "",
    description: "",
    image: "",
    images: [],
    video: "",
    verse: "",
    live_streams: [],
    discover_more_link: "",
    order: 0,
  });

  const { uploadImage, uploading } = useImageUpload("mscmedia");
  const fileInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const PASSWORDS = {
    ENTRY: "volkeno123msc",
    ADD: "musiciology",
    SAVE: "password",
    DELETE: "purplerain"
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchServices();
    }
  }, [isAuthenticated]);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("order", { ascending: true });

      if (error) throw error;
      setServices(data || []);
    } catch (err) {
      console.error("Error fetching services:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEntryLogin = (e) => {
    e.preventDefault();
    if (entryPassword === PASSWORDS.ENTRY) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect Entry Password");
      setEntryPassword("");
    }
  };

  const openGate = (type, action, id = null) => {
    setGateType(type);
    setPendingAction(() => action);
    setPendingId(id);
    setShowGate(true);
  };

  const verifyGate = (e) => {
    e.preventDefault();
    const correctPassword = PASSWORDS[gateType.toUpperCase()];
    
    if (gatePassword === correctPassword) {
      if (typeof pendingAction === 'function') {
        pendingAction();
      }
      setShowGate(false);
      setGatePassword("");
      setGateType(null);
      setPendingAction(null);
    } else {
      alert(`Incorrect Password for ${gateType.toUpperCase()}`);
      setGatePassword("");
    }
  };

  const handleAddRequest = () => {
    const action = () => {
      resetForm();
      setShowModal(true);
    };
    openGate('add', action);
  };

  const handleSaveRequest = () => {
    const action = async () => {
      setLoading(true);
      try {
        if (editingId) {
          const { error } = await supabase
            .from("services")
            .update(formData)
            .eq("id", editingId);
          if (error) throw error;
        } else {
          const { error } = await supabase.from("services").insert([formData]);
          if (error) throw error;
        }
        setShowModal(false);
        resetForm();
        fetchServices();
      } catch (err) {
        alert("Error saving: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    openGate('save', action);
  };

  const handleDeleteRequest = (id) => {
    const action = async () => {
      setLoading(true);
      try {
        const { error } = await supabase.from("services").delete().eq("id", id);
        if (error) throw error;
        fetchServices();
      } catch (err) {
        alert("Error deleting: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    openGate('delete', action, id);
  };

  const handleImageUpload = async (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const url = await uploadImage(file, "services");
      if (url) {
        if (field === "images") {
          setFormData({ ...formData, images: [...formData.images, url] });
        } else {
          setFormData({ ...formData, [field]: url });
        }
      }
    }
  };

  const handleStreamCoverUpload = async (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const url = await uploadImage(file, "streams");
      if (url) {
        const newStreams = [...formData.live_streams];
        newStreams[index].cover_image = url;
        setFormData({ ...formData, live_streams: newStreams });
      }
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      type: "split",
      title: "",
      description: "",
      image: "",
      images: [],
      video: "",
      verse: "",
      live_streams: [],
      discover_more_link: "",
      order: services.length,
    });
  };

  const editService = (service) => {
    setEditingId(service.id);
    setFormData({
      type: service.type || "split",
      title: service.title || "",
      description: service.description || "",
      image: service.image || "",
      images: service.images || [],
      video: service.video || "",
      verse: service.verse || "",
      live_streams: service.live_streams || [],
      discover_more_link: service.discover_more_link || "",
      order: service.order || 0,
    });
    setShowModal(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 sm:p-6 font-sans overflow-hidden">
        <div className="w-full max-w-md bg-zinc-900 p-8 sm:p-10 rounded-[30px] sm:rounded-[40px] border border-white/10 shadow-2xl text-center relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center shadow-2xl border-4 border-black">
            <Lock className="text-black" size={32} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tighter mb-2 mt-8">Restricted Access</h1>
          <p className="text-white/40 text-[9px] uppercase tracking-[4px] font-bold mb-8">Mustard Seed Church Admin</p>
          <form onSubmit={handleEntryLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter Entry Password"
              className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 focus:border-emerald-500 outline-none transition-all text-center text-sm"
              value={entryPassword}
              onChange={(e) => setEntryPassword(e.target.value)}
              autoFocus
            />
            <button type="submit" className="w-full bg-white text-black font-black uppercase tracking-[4px] py-4 rounded-2xl hover:scale-105 active:scale-95 transition-all text-[10px]">
              Unlock CMS
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8 md:p-12 font-sans overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-12 sm:mb-16 text-center sm:text-left">
          <div className="w-full sm:w-auto">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <h1 className="text-4xl sm:text-5xl font-black italic uppercase tracking-tighter">MSC Admin</h1>
              <ShieldCheck className="text-emerald-500 hidden sm:block" size={28} />
            </div>
            <p className="text-emerald-400 text-[8px] sm:text-[10px] tracking-[4px] sm:tracking-[6px] uppercase font-black mt-2">Secure Management System</p>
          </div>
          <button 
            onClick={handleAddRequest}
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full transition-all hover:scale-105 active:scale-95 font-black text-[10px] uppercase tracking-[2px] sm:tracking-[3px] shadow-xl"
          >
            <Plus size={18} strokeWidth={3} /> Add New Section
          </button>
        </header>

        {/* LIST SECTION */}
        <div className="space-y-6 sm:space-y-8 pb-20">
          <div className="flex items-center gap-4 px-2 sm:px-0">
            <List size={20} className="text-white/20" />
            <h2 className="text-xl sm:text-2xl font-black italic uppercase tracking-tighter">Current Sections</h2>
          </div>
          
          {loading && services.length === 0 ? (
            <div className="py-20 sm:py-32 text-center text-white/20 uppercase tracking-[6px] sm:tracking-[8px] font-black text-[10px] animate-pulse">Syncing with Supabase...</div>
          ) : services.length === 0 ? (
            <div className="py-20 sm:py-32 text-center border-2 border-dashed border-white/5 rounded-[30px] sm:rounded-[50px] text-white/20 uppercase tracking-[6px] sm:tracking-[8px] font-black text-[10px]">No Content Created</div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              {services.map((service) => (
                <div key={service.id} className="group bg-zinc-900/40 border border-white/5 p-6 sm:p-8 rounded-[30px] sm:rounded-[40px] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:bg-zinc-900/60 transition-all hover:border-white/10 shadow-lg">
                  <div className="flex items-center gap-4 sm:gap-8 w-full lg:w-auto">
                    <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-black rounded-[15px] sm:rounded-[22px] flex items-center justify-center border border-white/5 text-emerald-400 font-black italic text-lg sm:text-xl shadow-inner">
                      {service.order}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl sm:text-2xl font-black italic uppercase tracking-tighter mb-1 truncate">{service.title}</h3>
                      <div className="flex items-center gap-2 sm:gap-4 overflow-hidden">
                        <span className="flex-shrink-0 text-[7px] sm:text-[8px] font-black uppercase tracking-[2px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">{service.type}</span>
                        <div className="flex-shrink-0 w-1 h-1 rounded-full bg-white/10" />
                        <p className="text-[9px] sm:text-[10px] text-white/30 truncate italic font-medium">{service.description || service.verse || "Database Content"}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 w-full lg:w-auto mt-2 lg:mt-0">
                    <button 
                      onClick={() => editService(service)}
                      className="flex-1 lg:flex-none h-12 bg-white/5 hover:bg-white hover:text-black rounded-xl sm:rounded-2xl flex items-center justify-center transition-all border border-white/5 px-4 sm:px-6 font-black text-[9px] uppercase tracking-widest group/btn"
                    >
                      <Edit2 size={14} className="mr-2 group-hover/btn:scale-110 transition-transform" /> Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteRequest(service.id)}
                      className="flex-1 lg:flex-none h-12 bg-red-900/10 hover:bg-red-600 text-red-500 hover:text-white rounded-xl sm:rounded-2xl flex items-center justify-center transition-all border border-red-900/10 px-4 sm:px-6 font-black text-[9px] uppercase tracking-widest group/btn"
                    >
                      <Trash2 size={14} className="mr-2 group-hover/btn:scale-110 transition-transform" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODAL FORM */}
      {showModal && (
        <div className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-3xl flex items-start sm:items-center justify-center p-0 sm:p-6 overflow-y-auto overflow-x-hidden">
          <div className="bg-zinc-900 w-full max-w-4xl min-h-screen sm:min-h-0 sm:rounded-[50px] border-x sm:border border-white/10 shadow-2xl relative flex flex-col">
            <div className="sticky top-0 bg-zinc-900/90 backdrop-blur-xl p-6 sm:p-10 border-b border-white/5 flex justify-between items-center z-20">
              <div className="min-w-0">
                <h2 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tighter truncate">
                  {editingId ? "Update Section" : "New Section"}
                </h2>
                <p className="text-[7px] sm:text-[9px] text-emerald-400 uppercase tracking-[3px] font-black mt-1">Configure Content Layout</p>
              </div>
              <button onClick={() => setShowModal(false)} className="flex-shrink-0 w-10 h-10 sm:w-14 sm:h-14 bg-white/5 hover:bg-white hover:text-black rounded-full flex items-center justify-center transition-all border border-white/10 ml-4">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 sm:p-10 space-y-8 sm:space-y-10 flex-1 overflow-y-auto max-h-[calc(100vh-160px)] sm:max-h-[60vh] custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
                <div className="space-y-6 sm:space-y-8">
                  <div className="bg-black/20 p-6 rounded-[30px] border border-white/5 space-y-6">
                    <div>
                      <label className="text-[8px] font-black uppercase tracking-[2px] text-white/30 block mb-2">Section Type</label>
                      <select 
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs focus:border-emerald-500 outline-none transition-all appearance-none cursor-pointer"
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      >
                        <option value="split">Split (Image + Text)</option>
                        <option value="full">Gallery (Horizontal Scroll)</option>
                        <option value="verse">Verse of the Week</option>
                        <option value="video">Live & Upcoming Streams</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[8px] font-black uppercase tracking-[2px] text-white/30 block mb-2">Display Title</label>
                      <input 
                        type="text" 
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs focus:border-emerald-500 outline-none transition-all"
                        placeholder="e.g. Announcements"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-[8px] font-black uppercase tracking-[2px] text-white/30 block mb-2">Display Order</label>
                      <input 
                        type="number" 
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs focus:border-emerald-500 outline-none transition-all"
                        value={formData.order}
                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6 sm:space-y-8">
                  {formData.type === "split" && (
                    <div className="bg-black/20 p-6 rounded-[30px] border border-white/5 space-y-6">
                      <div>
                        <label className="text-[8px] font-black uppercase tracking-[2px] text-white/30 block mb-2">Description</label>
                        <textarea 
                          className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs focus:border-emerald-500 outline-none transition-all h-32 resize-none"
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-[8px] font-black uppercase tracking-[2px] text-white/30 block mb-2">Section Image</label>
                        <div className="flex flex-wrap items-center gap-4">
                          <button 
                            onClick={() => fileInputRef.current.click()}
                            className="flex items-center gap-3 bg-white text-black px-5 py-3 rounded-xl font-black text-[8px] uppercase tracking-[1px] hover:scale-105 active:scale-95 transition-all"
                          >
                            <ImageIcon size={14} /> {uploading ? "..." : "Upload"}
                          </button>
                          <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => handleImageUpload(e, "image")} />
                          {formData.image && <img src={formData.image} className="w-12 h-12 rounded-xl object-cover border border-white/10 shadow-lg" alt="" />}
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.type === "full" && (
                    <div className="bg-black/20 p-6 rounded-[30px] border border-white/5 space-y-6">
                      <label className="text-[8px] font-black uppercase tracking-[2px] text-white/30 block mb-2">Gallery Images</label>
                      <button 
                        onClick={() => galleryInputRef.current.click()}
                        className="w-full border-2 border-dashed border-white/10 rounded-2xl py-8 flex flex-col items-center gap-2 hover:border-emerald-500/50 transition-all bg-black/40 group"
                      >
                        <ImageIcon size={24} className="text-white/20 group-hover:text-emerald-500/50 transition-colors" />
                        <span className="text-[7px] font-black uppercase tracking-[1px] text-white/30">Add Photos</span>
                      </button>
                      <input type="file" ref={galleryInputRef} className="hidden" onChange={(e) => handleImageUpload(e, "images")} />
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
                        {formData.images.map((img, i) => (
                          <div key={i} className="relative group aspect-square rounded-xl overflow-hidden border border-white/5">
                            <img src={img} className="w-full h-full object-cover" alt="" />
                            <button 
                              onClick={() => setFormData({ ...formData, images: formData.images.filter((_, idx) => idx !== i) })}
                              className="absolute inset-0 bg-red-600/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {formData.type === "verse" && (
                    <div className="bg-black/20 p-6 rounded-[30px] border border-white/5 space-y-6">
                      <div>
                        <label className="text-[8px] font-black uppercase tracking-[2px] text-white/30 block mb-2">Bible Verse</label>
                        <textarea 
                          className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs focus:border-emerald-500 outline-none transition-all h-24 resize-none italic"
                          placeholder="e.g. Philippians 4:13..."
                          value={formData.verse}
                          onChange={(e) => setFormData({ ...formData, verse: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-[8px] font-black uppercase tracking-[2px] text-white/30 block mb-2">Reference / Author</label>
                        <input 
                          type="text" 
                          className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs focus:border-emerald-500 outline-none transition-all"
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                      </div>
                    </div>
                  )}

                  {formData.type === "video" && (
                    <div className="space-y-6">
                      <div className="bg-black/20 p-6 rounded-[30px] border border-white/5 space-y-6">
                        <label className="text-[8px] font-black uppercase tracking-[2px] text-white/30 block mb-2">Live Stream Cards</label>
                        <div className="space-y-4">
                          {formData.live_streams.map((stream, i) => (
                            <div key={i} className="bg-black border border-white/10 p-5 rounded-[25px] space-y-4 relative group shadow-2xl">
                              <button 
                                onClick={() => setFormData({ ...formData, live_streams: formData.live_streams.filter((_, idx) => idx !== i) })}
                                className="absolute top-4 right-4 text-white/20 hover:text-red-500 transition-all"
                              >
                                <X size={16} />
                              </button>
                              
                              <div className="space-y-3">
                                <input 
                                  placeholder="Stream Title"
                                  className="w-full bg-zinc-900 border border-white/5 rounded-lg px-3 py-2 text-[10px] outline-none focus:border-emerald-500"
                                  value={stream.title}
                                  onChange={(e) => {
                                    const newStreams = [...formData.live_streams];
                                    newStreams[i].title = e.target.value;
                                    setFormData({ ...formData, live_streams: newStreams });
                                  }}
                                />
                                <input 
                                  placeholder="YouTube ID or FB URL"
                                  className="w-full bg-zinc-900 border border-white/5 rounded-lg px-3 py-2 text-[10px] outline-none focus:border-emerald-500"
                                  value={stream.youtube_id || stream.facebook_url || ""}
                                  onChange={(e) => {
                                    const newStreams = [...formData.live_streams];
                                    if (e.target.value.includes("facebook.com")) {
                                      newStreams[i].facebook_url = e.target.value;
                                      delete newStreams[i].youtube_id;
                                    } else {
                                      newStreams[i].youtube_id = e.target.value;
                                      delete newStreams[i].facebook_url;
                                    }
                                    setFormData({ ...formData, live_streams: newStreams });
                                  }}
                                />
                                <input 
                                  placeholder="Schedule (e.g. Every Sunday • 9AM)"
                                  className="w-full bg-zinc-900 border border-white/5 rounded-lg px-3 py-2 text-[10px] outline-none focus:border-emerald-500"
                                  value={stream.schedule}
                                  onChange={(e) => {
                                    const newStreams = [...formData.live_streams];
                                    newStreams[i].schedule = e.target.value;
                                    setFormData({ ...formData, live_streams: newStreams });
                                  }}
                                />
                                <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border border-white/5 rounded-lg">
                                  <span className="text-[8px] font-black uppercase tracking-[1px] text-white/30">Live Badge?</span>
                                  <input 
                                    type="checkbox"
                                    checked={stream.is_live}
                                    onChange={(e) => {
                                      const newStreams = [...formData.live_streams];
                                      newStreams[i].is_live = e.target.checked;
                                      setFormData({ ...formData, live_streams: newStreams });
                                    }}
                                    className="w-4 h-4 accent-red-600 cursor-pointer"
                                  />
                                </div>
                                <div className="flex items-center gap-3 pt-2">
                                  <label className="flex-1 cursor-pointer flex items-center justify-center gap-2 bg-white/5 border border-white/5 px-3 py-2 rounded-lg hover:bg-white/10 transition-all">
                                    <ImageIcon size={12} className="text-white/30" />
                                    <span className="text-[8px] font-black uppercase tracking-[1px]">Cover</span>
                                    <input 
                                      type="file" 
                                      className="hidden" 
                                      onChange={(e) => handleStreamCoverUpload(e, i)}
                                    />
                                  </label>
                                  {stream.cover_image && (
                                    <img src={stream.cover_image} className="w-8 h-8 rounded-lg object-cover border border-white/10" alt="" />
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                          <button 
                            onClick={() => setFormData({ ...formData, live_streams: [...formData.live_streams, { title: "", youtube_id: "", schedule: "", is_live: false }] })}
                            className="w-full py-4 border border-dashed border-white/10 rounded-2xl text-[8px] font-black uppercase tracking-[2px] text-white/20 hover:text-white hover:bg-white/5 transition-all"
                          >
                            + Add Stream
                          </button>
                        </div>
                      </div>
                      <div className="bg-black/20 p-6 rounded-[30px] border border-white/5">
                        <label className="text-[8px] font-black uppercase tracking-[2px] text-white/30 block mb-2">Discover More Link</label>
                        <input 
                          type="text" 
                          className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs focus:border-emerald-500 outline-none transition-all"
                          placeholder="https://facebook.com/groups/..."
                          value={formData.discover_more_link}
                          onChange={(e) => setFormData({ ...formData, discover_more_link: e.target.value })}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-zinc-900/90 backdrop-blur-xl p-6 sm:p-10 border-t border-white/5 sm:rounded-b-[50px] z-20">
              <button 
                onClick={handleSaveRequest}
                disabled={loading}
                className="w-full bg-white text-black font-black uppercase tracking-[3px] sm:tracking-[4px] py-5 sm:py-6 rounded-2xl sm:rounded-3xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 shadow-2xl disabled:opacity-50 text-[10px] sm:text-xs"
              >
                <Save size={20} className="sm:w-6 sm:h-6" /> {editingId ? "Update Section" : "Save Section"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ACTION GATE MODAL */}
      {showGate && (
        <div className="fixed inset-0 z-[250] bg-black/98 flex items-center justify-center p-4 sm:p-6 backdrop-blur-3xl">
          <div className="w-full max-w-md bg-zinc-900 p-8 sm:p-12 rounded-[40px] sm:rounded-[50px] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] text-center relative">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center shadow-2xl border-4 border-black">
              <Key size={32} className="text-black" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tighter mb-2 mt-8">Authorize {gateType.toUpperCase()}</h3>
            <p className="text-white/40 text-[8px] sm:text-[9px] mb-8 leading-relaxed uppercase tracking-[3px] font-bold">Security Verification Required</p>
            <form onSubmit={verifyGate} className="space-y-4 sm:space-y-6">
              <input
                type="password"
                placeholder="Enter Security Code"
                className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 sm:py-5 focus:border-emerald-500 outline-none transition-all text-center text-lg sm:text-xl tracking-widest"
                value={gatePassword}
                onChange={(e) => setGatePassword(e.target.value)}
                autoFocus
              />
              <div className="flex flex-col sm:flex-row gap-3">
                <button type="submit" className="flex-1 bg-white text-black font-black uppercase tracking-[3px] py-4 sm:py-5 rounded-2xl hover:scale-105 active:scale-95 transition-all text-[10px]">
                  Confirm
                </button>
                <button 
                  type="button"
                  onClick={() => { setShowGate(false); setGatePassword(""); setGateType(null); setPendingAction(null); }}
                  className="px-6 py-4 sm:py-5 border border-white/10 rounded-2xl text-[9px] font-black uppercase tracking-[2px] hover:bg-white/5 transition-all"
                >
                  Abort
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
