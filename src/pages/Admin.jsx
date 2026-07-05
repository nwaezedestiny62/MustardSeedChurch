import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Upload, Edit2, Trash2, Save, Plus, X, Eye, EyeOff } from 'lucide-react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('services');
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [editingService, setEditingService] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);

  // Form states
  const [serviceForm, setServiceForm] = useState({
    type: 'split',
    title: '',
    description: '',
    image: '',
    images: [],
    video: '',
    verse: '',
    live_streams: [],
    discover_more_link: '',
    order: 0,
  });

  const [projectForm, setProjectForm] = useState({
    name: '',
    description: '',
    image: '',
    bg_image: '',
    frameworks: [],
    order: 0,
  });

  const [liveStreamForm, setLiveStreamForm] = useState({
    title: '',
    youtube_id: '',
    facebook_url: '',
    schedule: '',
    is_live: false,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: serv, error: servError } = await supabase
        .from('services')
        .select('*')
        .order('order');
      
      const { data: proj, error: projError } = await supabase
        .from('projects')
        .select('*')
        .order('order');

      if (servError) throw servError;
      if (projError) throw projError;

      setServices(serv || []);
      setProjects(proj || []);
    } catch (error) {
      setMessage('Error fetching data: ' + error.message);
    }
  };

  const uploadImage = async (file) => {
    if (!file) return null;
    setUploading(true);

    try {
      const fileName = `${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('mscmedia')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('mscmedia')
        .getPublicUrl(fileName);

      setMessage('Image uploaded successfully!');
      setUploading(false);
      return publicUrl;
    } catch (error) {
      setMessage('Upload failed: ' + error.message);
      setUploading(false);
      return null;
    }
  };

  // ==================== SERVICES HANDLERS ====================

  const handleAddService = () => {
    setServiceForm({
      type: 'split',
      title: '',
      description: '',
      image: '',
      images: [],
      video: '',
      verse: '',
      live_streams: [],
      discover_more_link: '',
      order: services.length,
    });
    setEditingService(null);
    setShowServiceModal(true);
  };

  const handleEditService = (service) => {
    setServiceForm(service);
    setEditingService(service.id);
    setShowServiceModal(true);
  };

  const handleSaveService = async () => {
    try {
      if (editingService) {
        const { error } = await supabase
          .from('services')
          .update(serviceForm)
          .eq('id', editingService);
        
        if (error) throw error;
        setMessage('Service updated successfully!');
      } else {
        const { error } = await supabase
          .from('services')
          .insert([serviceForm]);
        
        if (error) throw error;
        setMessage('Service added successfully!');
      }

      setShowServiceModal(false);
      fetchData();
    } catch (error) {
      setMessage('Error saving service: ' + error.message);
    }
  };

  const handleDeleteService = async (id) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setMessage('Service deleted successfully!');
      fetchData();
    } catch (error) {
      setMessage('Error deleting service: ' + error.message);
    }
  };

  // ==================== PROJECTS HANDLERS ====================

  const handleAddProject = () => {
    setProjectForm({
      name: '',
      description: '',
      image: '',
      bg_image: '',
      frameworks: [],
      order: projects.length,
    });
    setEditingProject(null);
    setShowProjectModal(true);
  };

  const handleEditProject = (project) => {
    setProjectForm(project);
    setEditingProject(project.id);
    setShowProjectModal(true);
  };

  const handleSaveProject = async () => {
    try {
      if (editingProject) {
        const { error } = await supabase
          .from('projects')
          .update(projectForm)
          .eq('id', editingProject);
        
        if (error) throw error;
        setMessage('Project updated successfully!');
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([projectForm]);
        
        if (error) throw error;
        setMessage('Project added successfully!');
      }

      setShowProjectModal(false);
      fetchData();
    } catch (error) {
      setMessage('Error saving project: ' + error.message);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setMessage('Project deleted successfully!');
      fetchData();
    } catch (error) {
      setMessage('Error deleting project: ' + error.message);
    }
  };

  // ==================== LIVE STREAM MANAGEMENT ====================

  const handleAddLiveStream = () => {
    setLiveStreamForm({
      title: '',
      youtube_id: '',
      facebook_url: '',
      schedule: '',
      is_live: false,
    });
  };

  const handleSaveLiveStream = () => {
    if (!liveStreamForm.title) {
      setMessage('Please enter a stream title');
      return;
    }

    const newStreams = [...(serviceForm.live_streams || []), liveStreamForm];
    setServiceForm({ ...serviceForm, live_streams: newStreams });
    setLiveStreamForm({
      title: '',
      youtube_id: '',
      facebook_url: '',
      schedule: '',
      is_live: false,
    });
    setMessage('Live stream added to service!');
  };

  const handleRemoveLiveStream = (index) => {
    const newStreams = serviceForm.live_streams.filter((_, i) => i !== index);
    setServiceForm({ ...serviceForm, live_streams: newStreams });
  };

  // ==================== RENDER ====================

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">Mustard Seed Church Admin</h1>
          <p className="text-zinc-400">Permanent Content Management System</p>
        </div>

        {/* Message Alert */}
        {message && (
          <div className="bg-emerald-600/20 border border-emerald-600 p-4 rounded-2xl mb-6 flex justify-between items-center">
            <span>{message}</span>
            <button onClick={() => setMessage('')} className="text-emerald-400 hover:text-emerald-300">
              <X size={20} />
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-4 sm:gap-8 border-b border-zinc-800 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('services')}
            className={`pb-4 text-lg font-medium border-b-2 transition whitespace-nowrap ${
              activeTab === 'services'
                ? 'border-white text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-300'
            }`}
          >
            Services (MSC Moments)
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`pb-4 text-lg font-medium border-b-2 transition whitespace-nowrap ${
              activeTab === 'projects'
                ? 'border-white text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-300'
            }`}
          >
            MSC Family (Works)
          </button>
        </div>

        {/* ==================== SERVICES TAB ==================== */}
        {activeTab === 'services' && (
          <div>
            <button
              onClick={handleAddService}
              className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-2xl hover:bg-white/90 mb-8 font-medium transition"
            >
              <Plus size={22} /> Add New Service Block
            </button>

            <div className="space-y-6">
              {services.length === 0 ? (
                <div className="text-center py-12 text-zinc-400">
                  <p>No services yet. Click "Add New Service Block" to get started.</p>
                </div>
              ) : (
                services.map((service) => (
                  <div key={service.id} className="bg-zinc-900 p-6 rounded-3xl border border-zinc-700 hover:border-zinc-600 transition">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-semibold">{service.title}</h3>
                        <p className="text-emerald-400 text-sm">Type: {service.type}</p>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEditService(service)}
                          className="p-3 bg-zinc-800 rounded-xl hover:bg-zinc-700 transition"
                        >
                          <Edit2 size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteService(service.id)}
                          className="p-3 bg-red-900/30 text-red-400 rounded-xl hover:bg-red-900/50 transition"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                    <p className="text-zinc-300 text-sm line-clamp-2">{service.description}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ==================== PROJECTS TAB ==================== */}
        {activeTab === 'projects' && (
          <div>
            <button
              onClick={handleAddProject}
              className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-2xl hover:bg-white/90 mb-8 font-medium transition"
            >
              <Plus size={22} /> Add New Project
            </button>

            <div className="space-y-6">
              {projects.length === 0 ? (
                <div className="text-center py-12 text-zinc-400">
                  <p>No projects yet. Click "Add New Project" to get started.</p>
                </div>
              ) : (
                projects.map((project) => (
                  <div key={project.id} className="bg-zinc-900 p-6 rounded-3xl border border-zinc-700 hover:border-zinc-600 transition">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-semibold">{project.name}</h3>
                        <p className="text-zinc-400 text-sm">Frameworks: {project.frameworks?.length || 0}</p>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEditProject(project)}
                          className="p-3 bg-zinc-800 rounded-xl hover:bg-zinc-700 transition"
                        >
                          <Edit2 size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="p-3 bg-red-900/30 text-red-400 rounded-xl hover:bg-red-900/50 transition"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                    <p className="text-zinc-300 text-sm line-clamp-2">{project.description}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* ==================== SERVICE MODAL ==================== */}
      {showServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 rounded-3xl border border-zinc-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-zinc-900 border-b border-zinc-700 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">{editingService ? 'Edit Service' : 'Add New Service'}</h2>
              <button
                onClick={() => setShowServiceModal(false)}
                className="text-zinc-400 hover:text-white transition"
              >
                <X size={28} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Service Type */}
              <div>
                <label className="block text-sm font-medium mb-2">Service Type</label>
                <select
                  value={serviceForm.type}
                  onChange={(e) => setServiceForm({ ...serviceForm, type: e.target.value })}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="split">Split Layout (Text + Image)</option>
                  <option value="full">Full Screen Gallery</option>
                  <option value="verse">Verse of the Week</option>
                  <option value="video">Live & Upcoming Streams</option>
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                  placeholder="Enter service title"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 resize-none"
                  rows="4"
                  placeholder="Enter service description"
                />
              </div>

              {/* Single Image (for split type) */}
              {serviceForm.type === 'split' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Image</label>
                  <div className="flex gap-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const url = await uploadImage(e.target.files[0]);
                        if (url) setServiceForm({ ...serviceForm, image: url });
                      }}
                      disabled={uploading}
                      className="flex-1"
                    />
                    {serviceForm.image && (
                      <img src={serviceForm.image} alt="preview" className="w-16 h-16 object-cover rounded-lg" />
                    )}
                  </div>
                </div>
              )}

              {/* Multiple Images (for full type) */}
              {serviceForm.type === 'full' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Gallery Images</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const url = await uploadImage(e.target.files[0]);
                      if (url) {
                        setServiceForm({
                          ...serviceForm,
                          images: [...(serviceForm.images || []), url],
                        });
                      }
                    }}
                    disabled={uploading}
                    className="w-full mb-3"
                  />
                  <div className="flex flex-wrap gap-3">
                    {serviceForm.images?.map((img, idx) => (
                      <div key={idx} className="relative">
                        <img src={img} alt={`gallery-${idx}`} className="w-20 h-20 object-cover rounded-lg" />
                        <button
                          onClick={() => {
                            setServiceForm({
                              ...serviceForm,
                              images: serviceForm.images.filter((_, i) => i !== idx),
                            });
                          }}
                          className="absolute -top-2 -right-2 bg-red-600 rounded-full p-1 text-white hover:bg-red-700"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Verse (for verse type) */}
              {serviceForm.type === 'verse' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Bible Verse</label>
                  <textarea
                    value={serviceForm.verse}
                    onChange={(e) => setServiceForm({ ...serviceForm, verse: e.target.value })}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 resize-none"
                    rows="3"
                    placeholder="Enter the Bible verse"
                  />
                </div>
              )}

              {/* Video (for video type) */}
              {serviceForm.type === 'video' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Background Video URL</label>
                  <input
                    type="text"
                    value={serviceForm.video}
                    onChange={(e) => setServiceForm({ ...serviceForm, video: e.target.value })}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                    placeholder="/videos/program.mp4"
                  />
                </div>
              )}

              {/* Live Streams (for video type) */}
              {serviceForm.type === 'video' && (
                <div className="border-t border-zinc-700 pt-6">
                  <h3 className="text-lg font-semibold mb-4">Live Stream Cards</h3>

                  {/* Live Stream List */}
                  <div className="space-y-3 mb-6">
                    {serviceForm.live_streams?.map((stream, idx) => (
                      <div key={idx} className="bg-zinc-800 p-4 rounded-lg flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-medium">{stream.title}</p>
                          <p className="text-sm text-zinc-400">{stream.schedule}</p>
                          <div className="flex gap-2 mt-2">
                            {stream.youtube_id && (
                              <span className="text-xs bg-red-600/30 text-red-300 px-2 py-1 rounded">YouTube</span>
                            )}
                            {stream.facebook_url && (
                              <span className="text-xs bg-blue-600/30 text-blue-300 px-2 py-1 rounded">Facebook</span>
                            )}
                            {stream.is_live && (
                              <span className="text-xs bg-emerald-600/30 text-emerald-300 px-2 py-1 rounded flex items-center gap-1">
                                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /> LIVE
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveLiveStream(idx)}
                          className="text-red-400 hover:text-red-300 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add Live Stream Form */}
                  <div className="bg-zinc-800 p-4 rounded-lg space-y-3">
                    <input
                      type="text"
                      value={liveStreamForm.title}
                      onChange={(e) => setLiveStreamForm({ ...liveStreamForm, title: e.target.value })}
                      placeholder="Stream Title (e.g., Youth Ignition Night)"
                      className="w-full bg-zinc-700 border border-zinc-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
                    />

                    <input
                      type="text"
                      value={liveStreamForm.youtube_id}
                      onChange={(e) => setLiveStreamForm({ ...liveStreamForm, youtube_id: e.target.value })}
                      placeholder="YouTube Video ID (e.g., PPa67ZcmS9E)"
                      className="w-full bg-zinc-700 border border-zinc-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
                    />

                    <input
                      type="text"
                      value={liveStreamForm.facebook_url}
                      onChange={(e) => setLiveStreamForm({ ...liveStreamForm, facebook_url: e.target.value })}
                      placeholder="Facebook Video URL"
                      className="w-full bg-zinc-700 border border-zinc-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
                    />

                    <input
                      type="text"
                      value={liveStreamForm.schedule}
                      onChange={(e) => setLiveStreamForm({ ...liveStreamForm, schedule: e.target.value })}
                      placeholder="Schedule (e.g., Every Friday • 6PM)"
                      className="w-full bg-zinc-700 border border-zinc-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
                    />

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={liveStreamForm.is_live}
                        onChange={(e) => setLiveStreamForm({ ...liveStreamForm, is_live: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Show LIVE badge</span>
                    </label>

                    <button
                      onClick={handleSaveLiveStream}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-lg transition"
                    >
                      Add Live Stream
                    </button>
                  </div>
                </div>
              )}

              {/* Discover More Link */}
              {serviceForm.type === 'video' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Discover More Link</label>
                  <input
                    type="text"
                    value={serviceForm.discover_more_link}
                    onChange={(e) => setServiceForm({ ...serviceForm, discover_more_link: e.target.value })}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                    placeholder="https://facebook.com/groups/YOUR_GROUP_ID"
                  />
                </div>
              )}

              {/* Order */}
              <div>
                <label className="block text-sm font-medium mb-2">Display Order</label>
                <input
                  type="number"
                  value={serviceForm.order}
                  onChange={(e) => setServiceForm({ ...serviceForm, order: parseInt(e.target.value) })}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Save Button */}
              <button
                onClick={handleSaveService}
                disabled={uploading}
                className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-white/90 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Save size={20} /> {editingService ? 'Update Service' : 'Create Service'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== PROJECT MODAL ==================== */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 rounded-3xl border border-zinc-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-zinc-900 border-b border-zinc-700 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
              <button
                onClick={() => setShowProjectModal(false)}
                className="text-zinc-400 hover:text-white transition"
              >
                <X size={28} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Project Name */}
              <div>
                <label className="block text-sm font-medium mb-2">Project Name</label>
                <input
                  type="text"
                  value={projectForm.name}
                  onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                  placeholder="Enter project name"
                />
              </div>

              {/* Project Description */}
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 resize-none"
                  rows="4"
                  placeholder="Enter project description"
                />
              </div>

              {/* Project Image */}
              <div>
                <label className="block text-sm font-medium mb-2">Project Image</label>
                <div className="flex gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const url = await uploadImage(e.target.files[0]);
                      if (url) setProjectForm({ ...projectForm, image: url });
                    }}
                    disabled={uploading}
                    className="flex-1"
                  />
                  {projectForm.image && (
                    <img src={projectForm.image} alt="preview" className="w-16 h-16 object-cover rounded-lg" />
                  )}
                </div>
              </div>

              {/* Background Image */}
              <div>
                <label className="block text-sm font-medium mb-2">Background Image</label>
                <div className="flex gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const url = await uploadImage(e.target.files[0]);
                      if (url) setProjectForm({ ...projectForm, bg_image: url });
                    }}
                    disabled={uploading}
                    className="flex-1"
                  />
                  {projectForm.bg_image && (
                    <img src={projectForm.bg_image} alt="bg-preview" className="w-16 h-16 object-cover rounded-lg" />
                  )}
                </div>
              </div>

              {/* Frameworks */}
              <div>
                <label className="block text-sm font-medium mb-2">Team Members / Frameworks</label>
                <div className="space-y-2 mb-3">
                  {projectForm.frameworks?.map((fw, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={fw.name}
                        onChange={(e) => {
                          const newFw = [...projectForm.frameworks];
                          newFw[idx].name = e.target.value;
                          setProjectForm({ ...projectForm, frameworks: newFw });
                        }}
                        className="flex-1 bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
                      />
                      <button
                        onClick={() => {
                          setProjectForm({
                            ...projectForm,
                            frameworks: projectForm.frameworks.filter((_, i) => i !== idx),
                          });
                        }}
                        className="text-red-400 hover:text-red-300 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setProjectForm({
                      ...projectForm,
                      frameworks: [...(projectForm.frameworks || []), { id: Date.now(), name: '' }],
                    });
                  }}
                  className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-2 rounded-lg transition text-sm"
                >
                  + Add Team Member
                </button>
              </div>

              {/* Order */}
              <div>
                <label className="block text-sm font-medium mb-2">Display Order</label>
                <input
                  type="number"
                  value={projectForm.order}
                  onChange={(e) => setProjectForm({ ...projectForm, order: parseInt(e.target.value) })}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Save Button */}
              <button
                onClick={handleSaveProject}
                disabled={uploading}
                className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-white/90 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Save size={20} /> {editingProject ? 'Update Project' : 'Create Project'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
