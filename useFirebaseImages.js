// src/hooks/useFirebaseImages.js
import { useEffect, useState } from 'react';
import { storage } from './firebaseConfig';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

const useFirebaseImages = (folderPath) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      const imagesRef = ref(storage, folderPath);
      try {
        const result = await listAll(imagesRef);
        console.log('List all result:', result); 
        const urlPromises = result.items.map((imageRef) => getDownloadURL(imageRef));
        const urls = await Promise.all(urlPromises);
        setImageUrls(urls);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching images: ', err);
        setError(err);
        setLoading(false);
      }
    };

    fetchImages();
  }, [folderPath]);

  return { imageUrls, loading, error };
};

export default useFirebaseImages;
