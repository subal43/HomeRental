import React, { useEffect, useState, ChangeEvent } from 'react';
import { useAuth } from '../Contexs/btnContex';
import { Pencil, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Property data type
interface Property {
  id: string;
  owner: string;
  contact: string;
  description: string;
  price: string;
  location: string;
  category: string;
  pgGender?: string;
  photos: string[];
}

const Admin: React.FC = () => {
  // Get auth state and user (assumes user has a name)
  const { isAuthenticated, user } = useAuth(); // assumes `user` is like { name: "john doe" }

  const [properties, setProperties] = useState<Property[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Property>>({});

  // Fetch saved or demo property data
  useEffect(() => {
    const savedProperties = JSON.parse(localStorage.getItem('submittedProperties') || '[]') as Property[];

    if (savedProperties.length === 0) {
      const demoProperties: Property[] = [
        {
          id: '1',
          owner: 'John Doe',
          contact: '9876543210',
          description: 'Spacious 2 BHK flat with balcony and parking.',
          price: '18000',
          location: 'Mumbai, Andheri West',
          category: 'family',
          photos: ['https://via.placeholder.com/150', 'https://via.placeholder.com/160']
        },
        {
          id: '2',
          owner: 'Priya Sharma',
          contact: '9123456789',
          description: 'Single room available for PG in Bangalore.',
          price: '6500',
          location: 'Bangalore, Koramangala',
          category: 'pg',
          pgGender: 'female',
          photos: ['https://via.placeholder.com/150']
        },
        {
          id: '3',
          owner: 'Karan Mehta',
          contact: '9988776655',
          description: '1 RK flat suitable for individual or couple.',
          price: '12000',
          location: 'Delhi, Saket',
          category: 'individual',
          photos: []
        }
      ];
      localStorage.setItem('submittedProperties', JSON.stringify(demoProperties));
      setProperties(demoProperties);
    } else {
      setProperties(savedProperties);
    }
  }, []);

  // Edit handling
  const handleEdit = (id: string) => {
    const property = properties.find((p) => p.id === id);
    if (property) {
      setEditingId(id);
      setEditForm(property);
    }
  };

  const handleEditChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = () => {
    const updatedProperties = properties.map((p) =>
      p.id === editingId ? { ...p, ...editForm } as Property : p
    );
    setProperties(updatedProperties);
    localStorage.setItem('submittedProperties', JSON.stringify(updatedProperties));
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    const updatedProperties = properties.filter((p) => p.id !== id);
    setProperties(updatedProperties);
    localStorage.setItem('submittedProperties', JSON.stringify(updatedProperties));
  };

  if (!isAuthenticated) {
    return (
      <div className="text-center text-red-600 mt-10 font-semibold">
        Access Denied. Please log in to view this page.
      </div>
    );
  }

  // Get the first letter of user's name and make it uppercase
  const userInitial = user?.name?.charAt(0).toUpperCase() || 'U';

  return (
    <div className='relative bg-gray-100 min-h-screen w-[46rem] sm:w-[57rem] md:w-[70rem] lg:w-full'>
      <div className="max-w-6xl mx-auto px-4 py-8 ">
        
        {/* Top bar with user initial */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center w-full">
            Admin Panel - Property Listings
          </h1>
          <div className="absolute right-6 top-6">
            <div className="h-10 w-10 rounded-full bg-green-700 text-white flex items-center justify-center text-lg font-medium">
              {userInitial}
            </div>
          </div>
        </div>

        {properties.length === 0 ? (
          <p className="text-center text-gray-600">No property listings available.</p>
        ) : (
          <div className="grid gap-6">
            {properties.map((property) => (
              <div key={property.id} className="bg-white p-6 rounded-lg shadow-md">
                <AnimatePresence>
                  {editingId === property.id ? (
                    <motion.div
                      key="edit-form"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="space-y-4"
                    >
                      <input name="owner" value={editForm.owner || ''} onChange={handleEditChange} className="w-full border p-2 rounded" />
                      <input name="contact" value={editForm.contact || ''} onChange={handleEditChange} className="w-full border p-2 rounded" />
                      <input name="description" value={editForm.description || ''} onChange={handleEditChange} className="w-full border p-2 rounded" />
                      <input name="price" value={editForm.price || ''} onChange={handleEditChange} className="w-full border p-2 rounded" />
                      <input name="location" value={editForm.location || ''} onChange={handleEditChange} className="w-full border p-2 rounded" />
                      <select name="category" value={editForm.category || ''} onChange={handleEditChange} className="w-full border p-2 rounded">
                        <option value="">Select Category</option>
                        <option value="individual">Individual</option>
                        <option value="family">Family</option>
                        <option value="pg">PG</option>
                        <option value="others">Others</option>
                      </select>
                      <div className="flex gap-3">
                        <button onClick={handleEditSubmit} className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
                        <button onClick={() => setEditingId(null)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="property-display" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <p><span className="font-semibold">Owner:</span> {property.owner}</p>
                      <p><span className="font-semibold">Contact:</span> {property.contact}</p>
                      <p><span className="font-semibold">Description:</span> {property.description}</p>
                      <p><span className="font-semibold">Price:</span> ₹{property.price}</p>
                      <p><span className="font-semibold">Location:</span> {property.location}</p>
                      <p><span className="font-semibold">Category:</span> {property.category}</p>
                      {property.photos?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {property.photos.map((photo, i) => (
                            <img key={i} src={photo} alt={`Uploaded ${i}`} className="h-24 w-24 object-cover rounded border" />
                          ))}
                        </div>
                      )}
                      <div className="mt-4 flex gap-3">
                        <button onClick={() => handleEdit(property.id)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded">
                          <Pencil size={18} /> Edit
                        </button>
                        <button onClick={() => handleDelete(property.id)} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded">
                          <Trash2 size={18} /> Delete
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
