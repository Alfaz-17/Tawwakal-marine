"use client"

import React, { useState } from 'react';
import { Plus, Trash2, Edit2, LayoutGrid, Image as ImageIcon, Sparkles, Check } from 'lucide-react';
import Image from 'next/image';
import api from '@/lib/api';
import useSWR from 'swr';

const fetcher = (url: string) => api.get(url).then(res => res.data);

const CORE_CATEGORIES = [
  'Industrial Automation',
  'Marine Automation'
];

export default function AdminCategoryPage() {
  const { data: categories = [], error, mutate } = useSWR('/categories', fetcher);
  
  const [name, setName] = useState('');
  const [coreCategory, setCoreCategory] = useState(CORE_CATEGORIES[0]);
  const [division, setDivision] = useState('industrial');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const [message, setMessage] = useState({ type: '', text: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});

  const isLoading = !error && !categories.length && categories.length === 0;

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await api.post('/categories', {
        name: name.trim(),
        coreCategory,
        division,
        image: image.trim() || '/categories/plc-systems.png',
        description: description.trim()
      });
      mutate();
      setName('');
      setImage('');
      setDescription('');
      setMessage({ type: 'success', text: 'Category added successfully.' });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.response?.data?.error || 'Could not add category.' });
    }
  };

  const handleStartEdit = (cat: any) => {
    setEditingId(cat._id);
    setEditData({
      name: cat.name,
      coreCategory: cat.coreCategory || 'Industrial Automation',
      image: cat.image || '',
      description: cat.description || ''
    });
  };

  const handleUpdateCategory = async (id: string) => {
    if (!editData.name?.trim()) return;
    try {
      await api.put(`/categories/${id}`, editData);
      mutate();
      setEditingId(null);
      setMessage({ type: 'success', text: 'Category updated successfully.' });
    } catch (error: any) {
      setMessage({ type: 'error', text: 'Could not update category.' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this category? Associated products may be affected.')) return;
    try {
      await api.delete(`/categories/${id}`);
      mutate();
      setMessage({ type: 'success', text: 'Category deleted.' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Could not delete category.' });
    }
  };

  const filteredCategories = selectedFilter === 'All'
    ? categories
    : categories.filter((c: any) => c.coreCategory === selectedFilter);

  if (isLoading) return <div className="text-xs font-bold uppercase tracking-widest animate-pulse p-8">Loading Categories...</div>;

  return (
    <div className="max-w-5xl space-y-10">
      <div className="border-b border-border pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary uppercase tracking-tight">Categories &amp; Subcategories</h1>
          <p className="text-xs font-bold text-accent uppercase tracking-widest mt-1">Organize Industrial &amp; Marine Automation Taxonomy</p>
        </div>
        <div className="text-xs font-mono font-bold bg-[#F4F7FA] border border-[#CBD5E1] text-[#0B153B] px-3 py-1.5 rounded-full">
          Total: {categories.length} Categories
        </div>
      </div>

      {message.text && (
        <div className={`p-4 text-xs font-bold uppercase tracking-wider border-l-4 rounded-sm ${message.type === 'success' ? 'bg-green-50 text-green-700 border-green-500' : 'bg-red-50 text-red-700 border-red-500'}`}>
          {message.text}
        </div>
      )}

      {/* Add New Category Panel */}
      <div className="bg-white p-6 sm:p-8 border border-border rounded-2xl shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wider text-primary mb-6 flex items-center gap-2">
          <Plus className="w-4 h-4 text-accent" />
          <span>Add New Subcategory</span>
        </h2>
        
        <form onSubmit={handleAddCategory} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Core Category */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-primary mb-1.5">
                Core Category *
              </label>
              <select
                value={coreCategory}
                onChange={(e) => {
                  setCoreCategory(e.target.value);
                  if (e.target.value === 'Marine Automation') setDivision('marine');
                  else if (e.target.value === 'Industrial Automation') setDivision('industrial');
                  else setDivision('general');
                }}
                className="w-full px-3.5 py-2.5 bg-muted/20 border border-border focus:border-accent outline-none text-xs font-bold rounded-lg"
              >
                {CORE_CATEGORIES.map(cc => (
                  <option key={cc} value={cc}>{cc}</option>
                ))}
              </select>
            </div>

            {/* Subcategory Name */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-primary mb-1.5">
                Subcategory Name *
              </label>
              <input 
                type="text" 
                placeholder="e.g. PLC Systems &amp; Modules" 
                className="w-full px-3.5 py-2.5 bg-muted/20 border border-border focus:border-accent outline-none text-xs font-semibold rounded-lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Image Path */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-primary mb-1.5">
                Image Path (e.g. /categories/hmi.png)
              </label>
              <input 
                type="text" 
                placeholder="/categories/plc-systems.png" 
                className="w-full px-3.5 py-2.5 bg-muted/20 border border-border focus:border-accent outline-none text-xs font-mono rounded-lg"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>

            {/* Division */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-primary mb-1.5">
                Division
              </label>
              <select
                value={division}
                onChange={(e) => setDivision(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-muted/20 border border-border focus:border-accent outline-none text-xs font-bold rounded-lg"
              >
                <option value="industrial">Industrial</option>
                <option value="marine">Marine</option>
                <option value="general">General / Both</option>
              </select>
            </div>

          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-primary mb-1.5">
              Description (Optional)
            </label>
            <input 
              type="text" 
              placeholder="Short description of equipment in this subcategory..." 
              className="w-full px-3.5 py-2.5 bg-muted/20 border border-border focus:border-accent outline-none text-xs rounded-lg"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="pt-2 text-right">
            <button 
              type="submit" 
              className="px-6 py-2.5 bg-primary hover:bg-accent text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm inline-flex items-center gap-2"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Save Subcategory</span>
            </button>
          </div>
        </form>
      </div>

      {/* Filter Tabs by Core Category */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setSelectedFilter('All')}
          className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all ${
            selectedFilter === 'All'
              ? 'bg-primary text-white shadow-xs'
              : 'bg-white border border-border text-muted-foreground hover:text-primary'
          }`}
        >
          All ({categories.length})
        </button>
        {CORE_CATEGORIES.map(cc => {
          const count = categories.filter((c: any) => c.coreCategory === cc).length;
          return (
            <button
              key={cc}
              onClick={() => setSelectedFilter(cc)}
              className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all ${
                selectedFilter === cc
                  ? 'bg-accent text-white shadow-xs'
                  : 'bg-white border border-border text-muted-foreground hover:text-primary'
              }`}
            >
              {cc} ({count})
            </button>
          );
        })}
      </div>

      {/* Category Table */}
      <div className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#0B153B] text-white text-[10px] font-bold uppercase tracking-wider">
              <th className="py-4 px-6">Image</th>
              <th className="py-4 px-6">Subcategory Name</th>
              <th className="py-4 px-6">Core Sector</th>
              <th className="py-4 px-6">Slug</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredCategories.map((cat: any) => (
              <tr key={cat._id} className="hover:bg-muted/20 transition-colors">
                
                {/* Image */}
                <td className="py-3 px-6 w-20">
                  <div className="w-12 h-12 relative rounded-lg bg-[#FAF8F5] border border-border overflow-hidden flex items-center justify-center">
                    {cat.image ? (
                      <Image 
                        src={cat.image} 
                        alt={cat.name} 
                        fill 
                        className="object-contain p-1"
                        onError={(e: any) => { e.target.style.display = 'none'; }}
                      />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-muted-foreground/40" />
                    )}
                  </div>
                </td>

                {/* Name */}
                <td className="py-3 px-6">
                  {editingId === cat._id ? (
                    <input 
                      type="text"
                      className="px-3 py-1.5 border border-accent bg-blue-50/50 outline-none text-xs font-bold rounded-md w-full max-w-xs"
                      value={editData.name || ''}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    />
                  ) : (
                    <div>
                      <div className="text-xs font-bold text-primary">{cat.name}</div>
                      {cat.description && (
                        <div className="text-[10px] text-muted-foreground line-clamp-1 mt-0.5">{cat.description}</div>
                      )}
                    </div>
                  )}
                </td>

                {/* Core Sector */}
                <td className="py-3 px-6">
                  {editingId === cat._id ? (
                    <select
                      className="px-2 py-1 border border-accent text-xs font-bold rounded-md"
                      value={editData.coreCategory || 'Industrial Automation'}
                      onChange={(e) => setEditData({ ...editData, coreCategory: e.target.value })}
                    >
                      {CORE_CATEGORIES.map(cc => (
                        <option key={cc} value={cc}>{cc}</option>
                      ))}
                    </select>
                  ) : (
                    <span className={`inline-block px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-full ${
                      cat.coreCategory === 'Marine Automation'
                        ? 'bg-teal-50 text-teal-800 border border-teal-200'
                        : cat.coreCategory === 'Electrical & Switchgear'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : cat.coreCategory === 'Instrumentation & Sensors'
                        ? 'bg-purple-50 text-purple-800 border border-purple-200'
                        : 'bg-blue-50 text-blue-800 border border-blue-200'
                    }`}>
                      {cat.coreCategory || 'Industrial Automation'}
                    </span>
                  )}
                </td>

                {/* Slug */}
                <td className="py-3 px-6">
                  <span className="font-mono text-[10px] text-muted-foreground bg-muted/30 px-2 py-0.5 rounded-sm">
                    {cat.slug || cat._id}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-3 px-6 text-right">
                  <div className="flex justify-end items-center gap-1">
                    {editingId === cat._id ? (
                      <>
                        <button 
                          onClick={() => handleUpdateCategory(cat._id)} 
                          className="px-2.5 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-[10px] font-bold uppercase"
                        >
                          Save
                        </button>
                        <button 
                          onClick={() => setEditingId(null)} 
                          className="px-2.5 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded text-[10px] font-bold uppercase"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          onClick={() => handleStartEdit(cat)} 
                          className="text-primary hover:text-accent p-1.5 rounded hover:bg-muted/40 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(cat._id)} 
                          className="text-red-500 hover:text-red-700 p-1.5 rounded hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                </td>

              </tr>
            ))}
            {filteredCategories.length === 0 && (
              <tr>
                <td colSpan={5} className="py-12 text-center text-xs font-bold text-muted-foreground uppercase opacity-60">
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
