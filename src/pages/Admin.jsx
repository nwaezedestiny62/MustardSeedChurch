import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, Upload } from 'lucide-react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('services');
  const [services, setServices] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase.from('services').select('*').order('order');
    if (error) console.error(error);
    else setServices(data || []);
  };

  const uploadImage = async (file) => {
    if (!file) return null;
    setUploading(true);

    const fileName = `${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from('church-assets')
      .upload(fileName, file);

    if (uploadError) {
      setMessage('Upload failed: ' + uploadError.message);
      setUploading(false);
      return null;
    }

    const { data: urlData } = supabase.storage.from('church-assets').getPublicUrl(fileName);
    setUploading(false);
    return urlData.publicUrl;
  };

  const addNewService = async () => {
    const newItem = {
      type: "split",
      title: "New Announcement",
      description: "Add your description here...",
      order: services.length + 1
    };

    const { error } = await supabase.from('services').insert([newItem]);
    if (error) setMessage("Error adding service");
    else {
      setMessage("New service added successfully!");
      fetchServices();
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-2">Mustard Seed Church CMS</h1>
        <p className="text-zinc-400 mb-10">Manage content permanently</p>

        {message && <div className="mb-6 p-4 bg-emerald-600/20 border border-emerald-500 rounded-2xl">{message}</div>}

        <div className="flex gap-8 mb-8 border-b border-zinc-800">
          <button onClick={() => setActiveTab('services')} className={`pb-4 text-xl ${activeTab === 'services' ? 'border-b-4 border-white' : 'text-zinc-400'}`}>
            Services (MSC Moments)
          </button>
          <button onClick={() => setActiveTab('projects')} className={`pb-4 text-xl ${activeTab === 'projects' ? 'border-b-4 border-white' : 'text-zinc-400'}`}>
            MSC Family (Works)
          </button>
        </div>

        {activeTab === 'services' && (
          <div>
            <button 
              onClick={addNewService}
              className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl mb-8 hover:bg-white/90"
            >
              <Plus size={24} /> Add New Service Block
            </button>

            <div className="grid gap-6">
              {services.map((service) => (
                <div key={service.id} className="bg-zinc-900 p-6 rounded-3xl">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-2xl font-bold">{service.title}</h3>
                      <p className="text-emerald-400 text-sm">Type: {service.type}</p>
                    </div>
                    <div className="flex gap-4">
                      <button className="p-3 hover:bg-zinc-800 rounded-xl"><Edit2 /></button>
                      <button className="p-3 hover:bg-red-900/30 text-red-400 rounded-xl"><Trash2 /></button>
                    </div>
                  </div>
                  {service.image && <img src={service.image} alt="" className="mt-4 w-48 rounded-xl" />}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;