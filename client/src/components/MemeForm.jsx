import { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '../App';

const MemeForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    image_url: '',
    tags: ''
  });
  const showToast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    const tags = formData.tags.split(',').map(tag => tag.trim());
    onSubmit({ ...formData, tags });
    setFormData({ title: '', image_url: '', tags: '' });
    // Funny toast
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
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/30 shadow-lg shadow-cyan-500/20"
    >
      <h2 className="text-2xl font-orbitron text-cyan-400 mb-6 tracking-wider">
        DEPLOY MEME BOMB
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
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
            IMAGE URL
          </label>
          <input
            type="url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            className="w-full bg-gray-800/50 border border-cyan-500/30 rounded px-4 py-2 text-cyan-100
                     focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400
                     transition-all duration-300"
            placeholder="https://..."
          />
        </div>

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
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-orbitron
                   py-3 rounded-lg shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40
                   transition-all duration-300 tracking-wider"
        >
          UPLOAD MEME
        </motion.button>
      </form>
    </motion.div>
  );
};

export default MemeForm;