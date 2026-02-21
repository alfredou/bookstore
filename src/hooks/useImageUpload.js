import { useState, useEffect, useCallback } from "react";

/**
 * useImageUpload Hook
 * 
 * Note: DataTransfer is NOT obsolete; it is the standard API for Drag and Drop.
 * It is how you access the files property on a 'drop' event.
 * 
 * However, we've modernized the visualization logic to use URL.createObjectURL
 * for better performance and added cleanup to prevent memory leaks.
 */
function useImageUpload() {
  const [images, setImages] = useState([]); // Base64 for backend compatibility
  const [previews, setPreviews] = useState([]); // Blob URLs for fast UI rendering
  const [active, setActive] = useState(false);

  // Cleanup Blob URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      previews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const processFiles = useCallback((fileList) => {
    const validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    const acceptedFiles = Array.from(fileList).filter(file =>
      validExtensions.includes(file.type)
    );

    if (acceptedFiles.length === 0 && fileList.length > 0) {
      window.alert("No valid images selected (JPEG, JPG, PNG, GIF only)");
      return;
    }

    // Create Previews (Fast)
    const newPreviews = acceptedFiles.map(file => URL.createObjectURL(file));
    setPreviews(newPreviews);

    // Create Base64 for Backend (Cloudinary)
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages([e.target.result]); // Keeping it as an array for backward compatibility
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    setActive(false);

    // DataTransfer.files is the standard way to get files from a drop event
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setActive(false);
  };

  const clearFiles = useCallback(() => {
    setFiles([]);
    setImages([]);
    setPreviews([]);
  }, []);

  return {
    handleDragLeave,
    handleDragOver,
    handleDrop,
    showFiles: processFiles,
    clearFiles,
    active,
    image: images, // Maintaining 'image' name for compatibility with Upload.jsx
    previews       // New property for performance-oriented UIs
  };
}

export default useImageUpload;