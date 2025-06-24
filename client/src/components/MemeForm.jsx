import { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '../App';

const MemeForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    image_url: '',
    address_link: '',
    tags: ''
  });
  const [imageError, setImageError] = useState(false);
  const showToast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    const tags = formData.tags.split(',').map(tag => tag.trim());
    const finalImageUrl = formData.image_url || formData.address_link;

    onSubmit({ ...formData, image_url: finalImageUrl, tags });
    setFormData({ title: '', image_url: '', address_link: '', tags: '' });
    setImageError(false);

    const messages = [
      'Meme deployed! The internet trembles.',
      'Upload complete. May the memes be ever in your favor!',
      'You just dropped a meme bomb.',
      'A wild meme appears!',
      'Meme successfully launched into the digital stratosphere!',
      'Upload complete! The meme matrix has been updated.',
      'You just created digital art that will confuse future archaeologists.',
      'Meme deployed! The timeline is now 420% more dank.',
      'Upload successful! You just made the internet a better place.',
      'Meme launched! The cyberpunk gods are pleased.',
      'You just added fuel to the meme economy!',
      'Upload complete! This meme is now part of digital history.',
      'Meme deployed! The algorithm is having a moment.',
      'You just blessed the internet with quality content!',
      'Upload successful! The meme gods have been summoned.'
    ];
    showToast(messages[Math.floor(Math.random() * messages.length)], 'upload');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if ((name === 'image_url' || name === 'address_link') && imageError) {
      setImageError(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageError(false);
  };

  const previewUrl = formData.image_url || formData.address_link;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/30 shadow-lg shadow-cyan-500/20"
    >
      <h2 className="text-2xl font-orbitron text-cyan-400 mb-6 tracking-wider">
        DEPLOY MEME BOMB
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-cyan-300 font-share-tech-mono mb-2">
            TITLE
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full bg-gray-800/50 border border-cyan-500/30 rounded px-4 py-2 text-cyan-100
                     focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400
                     transition-all duration-300"
            placeholder="Enter meme title..."
          />
        </div>

        <div>
          <label className="block text-cyan-300 font-share-tech-mono mb-2">
            IMAGE ADDRESS LINK
          </label>
          <input
            type="url"
            name="address_link"
            value={formData.address_link}
            onChange={handleChange}
            className="w-full bg-gray-800/50 border border-cyan-500/30 rounded px-4 py-2 text-cyan-100
                     focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400
                     transition-all duration-300"
            placeholder="https://meme-platform.com/meme/123"
          />
        </div>

        {previewUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4"
          >
            <label className="block text-cyan-300 font-share-tech-mono mb-2">
              LIVE PREVIEW
            </label>
            <div className="bg-gray-800/30 border border-cyan-500/20 rounded-lg p-4">
              {!imageError ? (
                <img
                  src={previewUrl}
                  alt="Meme preview"
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                  className="max-w-full max-h-64 mx-auto rounded-lg shadow-lg"
                />
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <div className="text-4xl mb-2">🖼️</div>
                  <p>Image failed to load</p>
                  <p className="text-sm">Check your URL and try again</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        <div>
          <label className="block text-cyan-300 font-share-tech-mono mb-2">
            TAGS (comma-separated)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            required
            className="w-full bg-gray-800/50 border border-cyan-500/30 rounded px-4 py-2 text-cyan-100
                     focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400
                     transition-all duration-300"
            placeholder="crypto, tech, moon..."
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={!formData.title || !formData.tags || (!formData.image_url && !formData.address_link)}
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-orbitron
                   py-3 rounded-lg shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40
                   transition-all duration-300 tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
        >
          UPLOAD MEME
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MemeForm;
