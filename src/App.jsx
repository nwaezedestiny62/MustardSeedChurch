import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Upload, Edit2, Trash2, Save, Plus } from 'lucide-react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('services');
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: serv } = await supabase.from('services').select('*').order('order');
    const { data: proj } = await supabase.from('projects').select('*').order('order');
    setServices(serv || []);
    setProjects(proj || []);
  };

  const uploadImage = async (file) => {
    if (!file) return null;
    setUploading(true);

    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from('church-assets')
      .upload(fileName, file);

    if (error) {
      setMessage('Upload failed: ' + error.message);
      setUploading(false);
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('church-assets')
      .getPublicUrl(fileName);

    setUploading(false);
    return publicUrl;
  };

  const handleAddService = async () => {
    const newService = {
      type: 'split',
      title: 'New Service Title',
      description: 'Add description here...',
      order: services.length + 1
    };

    const { error } = await supabase.from('services').insert([newService]);
    if (error) setMessage('Error: ' + error.message);
    else {
      setMessage('New service added!');
      fetchData();
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-2">Mustard Seed Church Admin</h1>
        <p className="text-zinc-400 mb-10">Permanent Content Management</p>

        {message && (
          <div className="bg-emerald-600/20 border border-emerald-600 p-4 rounded-2xl mb-6">
            {message}
          </div>
        )}

        <div className="flex gap-8 border-b border-zinc-800 mb-8">
          <button 
            onClick={() => setActiveTab('services')}
            className={`pb-4 text-lg font-medium border-b-2 transition ${activeTab === 'services' ? 'border-white text-white' : 'border-transparent text-zinc-400'}`}
          >
            Services (MSC Moments)
          </button>
          <button 
            onClick={() => setActiveTab('projects')}
            className={`pb-4 text-lg font-medium border-b-2 transition ${activeTab === 'projects' ? 'border-white text-white' : 'border-transparent text-zinc-400'}`}
          >
            MSC Family (Works)
          </button>
        </div>

        {activeTab === 'services' && (
          <>
            <button 
              onClick={handleAddService}
              className="flex items-center gap-3 bg-white text-black px-6 py-4 rounded-2xl hover:bg-white/90 mb-8 font-medium"
            >
              <Plus size={22} /> Add New Service Block
            </button>

            <div className="space-y-6">
              {services.map((service) => (
                <div key={service.id} className="bg-zinc-900 p-6 rounded-3xl border border-zinc-700">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-semibold">{service.title}</h3>
                      <p className="text-emerald-400">Type: {service.type}</p>
                    </div>
                    <div className="flex gap-3">
                      <button className="p-3 bg-zinc-800 rounded-xl hover:bg-zinc-700">
                        <Edit2 size={20} />
                      </button>
                      <button className="p-3 bg-red-900/30 text-red-400 rounded-xl hover:bg-red-900/50">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;