import React, { useState, useEffect } from 'react';
import { Upload, Trash2, X, Users, Image as ImageIcon, Plus, Edit2, Search } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Model } from '../../types';
import { models } from '../../data/models';
import { Button } from '../ui/Button';

type Tab = 'models' | 'users';

interface ModelFormData {
  name: string;
  bio: string;
  location: string;
  profileImage: string;
  gallery: string[];
  stats: {
    height: string;
    measurements: string;
    shoeSize: string;
  };
  experience: string[];
}

const emptyModelForm: ModelFormData = {
  name: '',
  bio: '',
  location: '',
  profileImage: '',
  gallery: [],
  stats: {
    height: '',
    measurements: '',
    shoeSize: ''
  },
  experience: []
};

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState<Tab>('models');
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [isModelModalOpen, setIsModelModalOpen] = useState(false);
  const [isCreatingNewModel, setIsCreatingNewModel] = useState(false);
  const [modelFormData, setModelFormData] = useState<ModelFormData>(emptyModelForm);
  const [searchQuery, setSearchQuery] = useState('');

  const { getUsers, deleteUser, updateModelProfile, deleteModelProfile, addModelProfile } = useAuthStore();
  const users = getUsers();

  const filteredModels = models.filter(model => 
    model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    model.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleModelAction = (action: 'edit' | 'create', model?: Model) => {
    if (action === 'edit' && model) {
      setModelFormData({
        name: model.name,
        bio: model.bio,
        location: model.location,
        profileImage: model.profileImage,
        gallery: model.gallery,
        stats: { ...model.stats },
        experience: [...model.experience]
      });
      setSelectedModel(model);
    } else {
      setModelFormData(emptyModelForm);
      setIsCreatingNewModel(true);
    }
    setIsModelModalOpen(true);
  };

  const handleModelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreatingNewModel) {
      const newModel: Model = {
        id: Date.now().toString(),
        ...modelFormData
      };
      addModelProfile(newModel);
    } else if (selectedModel) {
      updateModelProfile(selectedModel.id, modelFormData);
    }
    setIsModelModalOpen(false);
    setSelectedModel(null);
    setIsCreatingNewModel(false);
  };

  const handleDeleteModel = (modelId: string) => {
    if (confirm('Are you sure you want to delete this model?')) {
      deleteModelProfile(modelId);
      setSelectedModel(null);
    }
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      deleteUser(userId);
    }
  };

  return (
    <div className="min-h-screen bg-[#141414] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('models')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'models'
                  ? 'bg-[#E50914] text-white'
                  : 'bg-[#2F2F2F] text-white/60 hover:text-white'
              }`}
            >
              <ImageIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'users'
                  ? 'bg-[#E50914] text-white'
                  : 'bg-[#2F2F2F] text-white/60 hover:text-white'
              }`}
            >
              <Users className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#2F2F2F] text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E50914]"
            />
          </div>
        </div>

        {activeTab === 'models' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <button
              onClick={() => handleModelAction('create')}
              className="aspect-[3/4] bg-[#1F1F1F] rounded-lg flex flex-col items-center justify-center gap-4 text-white/60 hover:text-white hover:bg-[#2F2F2F] transition-colors group"
            >
              <div className="w-16 h-16 rounded-full bg-[#2F2F2F] group-hover:bg-[#3F3F3F] flex items-center justify-center transition-colors">
                <Plus className="w-8 h-8" />
              </div>
              <span className="font-medium">Add New Model</span>
            </button>

            {filteredModels.map((model) => (
              <div key={model.id} className="relative group">
                <div className="aspect-[3/4] bg-[#1F1F1F] rounded-lg overflow-hidden">
                  <img
                    src={model.profileImage}
                    alt={model.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-semibold text-lg">{model.name}</h3>
                      <p className="text-white/60 text-sm">{model.location}</p>
                    </div>
                  </div>
                </div>
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleModelAction('edit', model)}
                    className="p-2 bg-[#E50914] rounded-full text-white hover:bg-[#F40612] transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteModel(model.id)}
                    className="p-2 bg-[#2F2F2F] rounded-full text-white hover:bg-[#3F3F3F] transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#1F1F1F] rounded-lg overflow-hidden">
            <table className="w-full text-white">
              <thead className="bg-[#2F2F2F]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-white/60 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-[#2F2F2F]">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.role === 'admin' 
                          ? 'bg-[#E50914] text-white' 
                          : 'bg-[#2F2F2F] text-white/60'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white/60">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {user.role !== 'admin' && (
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-white/60 hover:text-[#E50914] transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Model Form Modal */}
      {isModelModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1F1F1F] rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {isCreatingNewModel ? 'Add New Model' : 'Edit Model'}
              </h2>
              <button
                onClick={() => setIsModelModalOpen(false)}
                className="text-white/60 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleModelSubmit} className="space-y-6">
              <div>
                <label className="text-white/80 text-sm font-medium">Name</label>
                <input
                  type="text"
                  value={modelFormData.name}
                  onChange={(e) => setModelFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 w-full bg-[#2F2F2F] border border-white/10 rounded-md px-4 py-2 text-white"
                  required
                />
              </div>

              <div>
                <label className="text-white/80 text-sm font-medium">Bio</label>
                <textarea
                  value={modelFormData.bio}
                  onChange={(e) => setModelFormData(prev => ({ ...prev, bio: e.target.value }))}
                  className="mt-1 w-full bg-[#2F2F2F] border border-white/10 rounded-md px-4 py-2 text-white h-32"
                  required
                />
              </div>

              <div>
                <label className="text-white/80 text-sm font-medium">Location</label>
                <input
                  type="text"
                  value={modelFormData.location}
                  onChange={(e) => setModelFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="mt-1 w-full bg-[#2F2F2F] border border-white/10 rounded-md px-4 py-2 text-white"
                  required
                />
              </div>

              <div>
                <label className="text-white/80 text-sm font-medium">Profile Image URL</label>
                <input
                  type="url"
                  value={modelFormData.profileImage}
                  onChange={(e) => setModelFormData(prev => ({ ...prev, profileImage: e.target.value }))}
                  className="mt-1 w-full bg-[#2F2F2F] border border-white/10 rounded-md px-4 py-2 text-white"
                  required
                />
              </div>

              <div>
                <label className="text-white/80 text-sm font-medium">Gallery URLs (one per line)</label>
                <textarea
                  value={modelFormData.gallery.join('\n')}
                  onChange={(e) => setModelFormData(prev => ({ ...prev, gallery: e.target.value.split('\n').filter(Boolean) }))}
                  className="mt-1 w-full bg-[#2F2F2F] border border-white/10 rounded-md px-4 py-2 text-white h-32"
                  placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                  required
                />
              </div>

              <div>
                <label className="text-white/80 text-sm font-medium">Stats</label>
                <div className="grid grid-cols-3 gap-4 mt-1">
                  <div>
                    <input
                      type="text"
                      placeholder="Height"
                      value={modelFormData.stats.height}
                      onChange={(e) => setModelFormData(prev => ({
                        ...prev,
                        stats: { ...prev.stats, height: e.target.value }
                      }))}
                      className="w-full bg-[#2F2F2F] border border-white/10 rounded-md px-4 py-2 text-white"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Measurements"
                      value={modelFormData.stats.measurements}
                      onChange={(e) => setModelFormData(prev => ({
                        ...prev,
                        stats: { ...prev.stats, measurements: e.target.value }
                      }))}
                      className="w-full bg-[#2F2F2F] border border-white/10 rounded-md px-4 py-2 text-white"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Shoe Size"
                      value={modelFormData.stats.shoeSize}
                      onChange={(e) => setModelFormData(prev => ({
                        ...prev,
                        stats: { ...prev.stats, shoeSize: e.target.value }
                      }))}
                      className="w-full bg-[#2F2F2F] border border-white/10 rounded-md px-4 py-2 text-white"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-white/80 text-sm font-medium">Experience (one per line)</label>
                <textarea
                  value={modelFormData.experience.join('\n')}
                  onChange={(e) => setModelFormData(prev => ({
                    ...prev,
                    experience: e.target.value.split('\n').filter(Boolean)
                  }))}
                  className="mt-1 w-full bg-[#2F2F2F] border border-white/10 rounded-md px-4 py-2 text-white h-32"
                  placeholder="Vogue Magazine&#10;Paris Fashion Week"
                  required
                />
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  variant="secondary"
                  onClick={() => setIsModelModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                >
                  {isCreatingNewModel ? 'Create Model' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}