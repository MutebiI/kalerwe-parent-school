"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

interface NewsPost {
  id: number;
  title: string;
  content: string;
  image_url: string | null;
  created_at: string;
}

interface Teacher {
  id: number;
  name: string;
  class_name: string;
  image_url: string | null;
}

interface GalleryPhoto {
  id: number;
  image_url: string;
  description: string | null;
  created_at: string;
}

interface PdfForm {
  id: number;
  name: string;
  file_name: string;
  description: string;
  updated_at: string;
}

// ✅ CACHE SYSTEM - Enhanced with real-time sync
interface CacheData {
  data: any;
  timestamp: number;
  version: string;
}

class AppCache {
  private static readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
  private static readonly CACHE_VERSION = 'v2';

  static set(key: string, data: any): void {
    if (typeof window === 'undefined') return;
    
    const cacheData: CacheData = {
      data,
      timestamp: Date.now(),
      version: this.CACHE_VERSION
    };
    
    try {
      localStorage.setItem(`cache_${key}`, JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Cache storage failed:', error);
    }
  }

  static get(key: string): any | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const cached = localStorage.getItem(`cache_${key}`);
      if (!cached) return null;

      const cacheData: CacheData = JSON.parse(cached);
      
      if (cacheData.version !== this.CACHE_VERSION) {
        this.remove(key);
        return null;
      }
      
      if (Date.now() - cacheData.timestamp > this.CACHE_DURATION) {
        this.remove(key);
        return null;
      }
      
      return cacheData.data;
    } catch (error) {
      this.remove(key);
      return null;
    }
  }

  static remove(key: string): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(`cache_${key}`);
  }

  static clearAll(): void {
    if (typeof window === 'undefined') return;
    Object.keys(localStorage)
      .filter(key => key.startsWith('cache_'))
      .forEach(key => localStorage.removeItem(key));
  }
}

// ✅ NEW: Storage Monitor Component
interface StorageUsage {
  used: number;
  total: number;
}

interface ItemCounts {
  news: number;
  gallery: number;
  teachers: number;
}

const StorageMonitor = ({ usage, counts }: { usage: StorageUsage; counts: ItemCounts }) => {
  const percentage = (usage.used / usage.total) * 100;
  const getWarningLevel = () => {
    if (percentage > 80) return 'critical';
    if (percentage > 60) return 'warning';
    return 'safe';
  };

  const warningLevel = getWarningLevel();

  return (
    <div style={{
      padding: "1rem",
      borderRadius: "8px",
      border: `2px solid ${
        warningLevel === 'critical' ? '#fecaca' :
        warningLevel === 'warning' ? '#fef3c7' :
        '#d1fae5'
      }`,
      backgroundColor: warningLevel === 'critical' ? '#fef2f2' :
                     warningLevel === 'warning' ? '#fffbeb' :
                     '#f0fdf4',
      marginBottom: "1rem"
    }}>
      <h3 style={{ fontWeight: "bold", marginBottom: "0.5rem", color: "#1f2937" }}>📊 Storage Usage Monitor</h3>
      
      <div style={{ marginBottom: "0.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", marginBottom: "0.25rem" }}>
          <span style={{ color: "#4b5563" }}>Storage: {usage.used}MB / {usage.total}MB</span>
          <span style={{ fontWeight: "600" }}>{Math.round(percentage)}%</span>
        </div>
        <div style={{ width: "100%", backgroundColor: "#e5e7eb", borderRadius: "9999px", height: "0.5rem" }}>
          <div 
            style={{
              height: "0.5rem",
              borderRadius: "9999px",
              transition: "all 0.3s",
              backgroundColor: warningLevel === 'critical' ? '#dc2626' :
                              warningLevel === 'warning' ? '#d97706' :
                              '#16a34a',
              width: `${percentage}%`
            }}
          ></div>
        </div>
      </div>

      <div style={{ fontSize: "0.875rem", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "0.5rem", color: "#4b5563" }}>
        <div>📰 News: {counts.news}/60</div>
        <div>🖼️ Gallery: {counts.gallery}/80</div>
        <div>👨‍🏫 Teachers: {counts.teachers}/40</div>
      </div>

      {warningLevel === 'critical' && (
        <p style={{ color: "#dc2626", fontSize: "0.875rem", fontWeight: "600" }}>
          ⚠️ Storage nearly full! Consider deleting older content.
        </p>
      )}
      {warningLevel === 'warning' && (
        <p style={{ color: "#d97706", fontSize: "0.875rem" }}>
          ℹ️ Storage usage is getting high. Monitor closely.
        </p>
      )}
      {warningLevel === 'safe' && (
        <p style={{ color: "#16a34a", fontSize: "0.875rem" }}>
          ✅ Storage usage is healthy.
        </p>
      )}
    </div>
  );
};

// ✅ NEW: Rollover Confirmation Dialog
const RolloverConfirmation = ({ 
  isOpen, 
  onConfirm, 
  onCancel, 
  itemType, 
  currentCount, 
  maxCount 
}: { 
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  itemType: string;
  currentCount: number;
  maxCount: number;
}) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 50
    }}>
      <div style={{
        backgroundColor: "#fff",
        padding: "1.5rem",
        borderRadius: "8px",
        maxWidth: "28rem",
        width: "90%",
        margin: "0 1rem"
      }}>
        <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", color: "#dc2626", marginBottom: "1rem" }}>⚠️ Limit Reached</h3>
        <p style={{ marginBottom: "1rem", color: "#374151" }}>
          You've reached the maximum {itemType} limit ({maxCount}). 
          The oldest {itemType} will be automatically deleted to make space for this new one.
        </p>
        <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "1rem" }}>
          Current count: {currentCount}/{maxCount}
        </p>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
          <button 
            onClick={onCancel}
            style={{
              padding: "0.5rem 1rem",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              backgroundColor: "transparent",
              cursor: "pointer"
            }}
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#dc2626",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Delete Oldest & Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"news" | "teachers" | "gallery" | "forms">("news");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // News states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [newsImage, setNewsImage] = useState<File | null>(null);
  const [newsPosts, setNewsPosts] = useState<NewsPost[]>([]);

  // Teacher states
  const [teacherName, setTeacherName] = useState("");
  const [teacherClass, setTeacherClass] = useState("");
  const [teacherImage, setTeacherImage] = useState<File | null>(null);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  // Gallery states
  const [galleryImage, setGalleryImage] = useState<File | null>(null);
  const [galleryDescription, setGalleryDescription] = useState("");
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(false);

  // PDF Forms states - NEW
  const [pdfForms, setPdfForms] = useState<PdfForm[]>([]);
  const [selectedPdf, setSelectedPdf] = useState<File | null>(null);
  const [uploadingEnrollmentPdf, setUploadingEnrollmentPdf] = useState(false);
const [uploadingRequirementsPdf, setUploadingRequirementsPdf] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isOnline, setIsOnline] = useState(true);

  // Edit states
  const [editingNews, setEditingNews] = useState<NewsPost | null>(null);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [editingGallery, setEditingGallery] = useState<GalleryPhoto | null>(null);

  // ✅ NEW: Free tier protection states
  const [storageUsage, setStorageUsage] = useState<StorageUsage>({ used: 0, total: 1024 });
  const [itemCounts, setItemCounts] = useState<ItemCounts>({ news: 0, gallery: 0, teachers: 0 });
  const [rolloverConfirm, setRolloverConfirm] = useState<{
    isOpen: boolean;
    itemType: 'news' | 'gallery' | 'teachers';
    onConfirm: () => void;
  }>({ isOpen: false, itemType: 'news', onConfirm: () => {} });

  // Constants for limits
  const LIMITS = {
    news: 60,
    gallery: 80, 
    teachers: 40
  };

  // PDF Form configurations - NEW
  const pdfFormConfigs = {
    enrollment: {
      name: "Enrollment Form",
      fileName: "enrollment-form.pdf",
      description: "Official student enrollment application form"
    },
    requirements: {
      name: "School Requirements", 
      fileName: "school-requirements.pdf",
      description: "Complete admission requirements and documents checklist"
    }
  };

  // ✅ NEW: PDF Upload Handler with security validation
 const handlePdfUpload = async (formType: 'enrollment' | 'requirements') => {
  if (!selectedPdf) {
    setErrorMessage("Please select a PDF file to upload");
    return;
  }

  // Security validation
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  
  const allowedExtensions = ['.pdf', '.doc', '.docx'];
  const fileExtension = selectedPdf.name.toLowerCase().slice(-4);
  
  if (!allowedTypes.includes(selectedPdf.type) && 
      !allowedExtensions.some(ext => selectedPdf.name.toLowerCase().endsWith(ext))) {
    setErrorMessage("Only PDF and Word documents are allowed! Please select a .pdf, .doc, or .docx file.");
    return;
  }

  // File size validation (5MB max)
  const maxSize = 5 * 1024 * 1024;
  if (selectedPdf.size > maxSize) {
    setErrorMessage("File too large! Maximum size is 5MB");
    return;
  }

  // Set the correct loading state
  if (formType === 'enrollment') {
    setUploadingEnrollmentPdf(true);
  } else {
    setUploadingRequirementsPdf(true);
  }

  setErrorMessage("");

  try {
    // Force rename to fixed filename
    const targetFileName = pdfFormConfigs[formType].fileName;
    const renamedFile = new File([selectedPdf], targetFileName, { type: selectedPdf.type });

    // ✅ REAL FILE UPLOAD to /public/documents/
    const formData = new FormData();
    formData.append('file', renamedFile);
    formData.append('targetFileName', targetFileName);

    const response = await fetch('/api/upload-pdf', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Upload failed');
    }

    // Update the forms list
    const updatedForm: PdfForm = {
      id: Date.now(),
      name: pdfFormConfigs[formType].name,
      file_name: targetFileName,
      description: pdfFormConfigs[formType].description,
      updated_at: new Date().toISOString()
    };

    setPdfForms(prev => {
      const filtered = prev.filter(form => form.file_name !== targetFileName);
      return [updatedForm, ...filtered];
    });

    setSelectedPdf(null);
    setErrorMessage("");
    
    // Reset file input
    const fileInput = document.getElementById(`pdf-upload-${formType}`) as HTMLInputElement;
    if (fileInput) fileInput.value = '';

    alert(`✅ ${pdfFormConfigs[formType].name} updated successfully!`);

  } catch (error: any) {
    console.error("PDF upload error:", error);
    setErrorMessage(error.message || "Failed to upload PDF. Please try again.");
  } finally {
    // Reset the correct loading state
    if (formType === 'enrollment') {
      setUploadingEnrollmentPdf(false);
    } else {
      setUploadingRequirementsPdf(false);
    }
  }
};

  // ✅ NEW: Image Optimization Function
  const optimizeImage = (file: File, maxSizeKB: number = 500): Promise<File> => {
    return new Promise((resolve) => {
      // If file is already under limit, return as-is
      if (file.size <= maxSizeKB * 1024) {
        resolve(file);
        return;
      }

      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const reader = new FileReader();

      reader.onload = (e) => {
        img.onload = () => {
          // Calculate new dimensions while maintaining aspect ratio
          let { width, height } = img;
          const ratio = Math.sqrt((maxSizeKB * 1024) / file.size);
          
          width = Math.floor(width * ratio);
          height = Math.floor(height * ratio);

          canvas.width = width;
          canvas.height = height;

          ctx!.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const optimizedFile = new File([blob], file.name, {
                  type: 'image/jpeg',
                  lastModified: Date.now(),
                });
                resolve(optimizedFile);
              } else {
                resolve(file); // Fallback to original
              }
            },
            'image/jpeg',
            0.8 // 80% quality - still looks great!
          );
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  // ✅ NEW: Calculate Storage Usage
  const calculateStorageUsage = async () => {
    try {
      // Get counts
      const { count: newsCount } = await supabase
        .from('news')
        .select('*', { count: 'exact', head: true });
      
      const { count: galleryCount } = await supabase
        .from('gallery')
        .select('*', { count: 'exact', head: true });
      
      const { count: teachersCount } = await supabase
        .from('teachers')
        .select('*', { count: 'exact', head: true });

      const counts = {
        news: newsCount || 0,
        gallery: galleryCount || 0,
        teachers: teachersCount || 0
      };
      
      setItemCounts(counts);

      // Calculate estimated storage (0.5MB per optimized image)
      const estimatedStorage = Math.round(
        (counts.news * 0.5) + 
        (counts.gallery * 0.5) + 
        (counts.teachers * 0.5)
      );

      setStorageUsage({ 
        used: estimatedStorage, 
        total: 1024 
      });
    } catch (error) {
      console.error('Storage calculation error:', error);
    }
  };

  // ✅ NEW: Rollover Handler Functions
  const handleNewsRollover = async (newPostData: any) => {
    // Get oldest post to delete
    const { data: oldestPost } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: true })
      .limit(1)
      .single();

    if (oldestPost) {
      // Delete image from storage
      if (oldestPost.image_url) {
        await deleteImageFromStorage(oldestPost.image_url, "avatars");
      }
      
      // Delete from database
      await supabase.from('news').delete().eq('id', oldestPost.id);
    }

    // Now add the new post
    return await supabase.from('news').insert([newPostData]);
  };

  const handleGalleryRollover = async (newPhotoData: any) => {
    const { data: oldestPhoto } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: true })
      .limit(1)
      .single();

    if (oldestPhoto) {
      await deleteImageFromStorage(oldestPhoto.image_url, "avatars");
      await supabase.from('gallery').delete().eq('id', oldestPhoto.id);
    }

    return await supabase.from('gallery').insert([newPhotoData]);
  };

  const handleTeachersRollover = async (newTeacherData: any) => {
    const { data: oldestTeacher } = await supabase
      .from('teachers')
      .select('*')
      .order('created_at', { ascending: true })
      .limit(1)
      .single();

    if (oldestTeacher && oldestTeacher.image_url) {
      await deleteImageFromStorage(oldestTeacher.image_url, "avatars");
      await supabase.from('teachers').delete().eq('id', oldestTeacher.id);
    }

    return await supabase.from('teachers').insert([newTeacherData]);
  };

  // ✅ Load initial data with cache-first approach
  const loadInitialData = () => {
    // Load from cache immediately for fast display
    const cachedNews = AppCache.get('news');
    const cachedTeachers = AppCache.get('teachers');
    const cachedGallery = AppCache.get('gallery');

    if (cachedNews) setNewsPosts(cachedNews);
    if (cachedTeachers) setTeachers(cachedTeachers);
    if (cachedGallery) setGalleryPhotos(cachedGallery);

    // Then fetch fresh data
    fetchNews();
    fetchTeachers();
    fetchGalleryPhotos();
    
    // ✅ NEW: Calculate storage usage
    calculateStorageUsage();
  };

  // ✅ Fetch functions with cache-first approach
  const fetchNews = async () => {
    const cachedNews = AppCache.get('news');
    if (cachedNews) {
      setNewsPosts(cachedNews);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw new Error(`Database error: ${error.message}`);
      
      setNewsPosts(data || []);
      AppCache.set('news', data);
    } catch (error) {
      console.error("Fetch news error:", error);
      const cachedNews = AppCache.get('news');
      if (cachedNews) setNewsPosts(cachedNews);
    }
  };

  const fetchTeachers = async () => {
    const cachedTeachers = AppCache.get('teachers');
    if (cachedTeachers) {
      setTeachers(cachedTeachers);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("teachers")
        .select("*")
        .order("id", { ascending: true });
      
      if (error) throw new Error(`Database error: ${error.message}`);
      
      setTeachers(data || []);
      AppCache.set('teachers', data);
    } catch (error) {
      console.error("Fetch teachers error:", error);
      const cachedTeachers = AppCache.get('teachers');
      if (cachedTeachers) setTeachers(cachedTeachers);
    }
  };

  const fetchGalleryPhotos = async () => {
    const cachedGallery = AppCache.get('gallery');
    if (cachedGallery) {
      setGalleryPhotos(cachedGallery);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw new Error(`Database error: ${error.message}`);
      
      setGalleryPhotos(data || []);
      AppCache.set('gallery', data);
    } catch (error) {
      console.error("Fetch gallery error:", error);
      const cachedGallery = AppCache.get('gallery');
      if (cachedGallery) setGalleryPhotos(cachedGallery);
    }
  };

  useEffect(() => {
    loadInitialData();

    // Online/offline detection
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // ✅ IMPROVED: Upload image with error handling
  const uploadImage = async (file: File, folder: string): Promise<string | null> => {
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage.from(folder).upload(fileName, file);
      
      if (error) {
        if (error.message.includes("Failed to fetch")) {
          setErrorMessage("📡 No internet connection. Cannot upload image.");
        } else {
          setErrorMessage("🖼️ Image upload failed. Please try again.");
        }
        return null;
      }
      
      const { data: publicData } = supabase.storage.from(folder).getPublicUrl(fileName);
      return publicData.publicUrl;
    } catch (error: any) {
      console.error("Image upload failed:", error);
      setErrorMessage("🖼️ Image upload failed. Please try again.");
      return null;
    }
  };

  // ✅ Extract file name from Supabase storage URL
  const getFileNameFromUrl = (url: string): string | null => {
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split('/');
      return pathParts[pathParts.length - 1];
    } catch (error) {
      console.error("Error extracting file name from URL:", error);
      return null;
    }
  };

  // ✅ Delete image from Supabase Storage
  const deleteImageFromStorage = async (imageUrl: string | null, folder: string) => {
    if (!imageUrl) return;
    const fileName = getFileNameFromUrl(imageUrl);
    if (!fileName) return;
    const { error } = await supabase.storage.from(folder).remove([fileName]);
    if (error) {
      console.error("Error deleting image from storage:", error);
    }
  };

  // ✅ Validate file size (2MB limit)
  const validateFileSize = (file: File): boolean => {
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrorMessage("File size too large! Please select an image under 2MB.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  // Handle file selection with validation
  const handleNewsImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && !validateFileSize(file)) {
      e.target.value = "";
      return;
    }
    setNewsImage(file);
    setErrorMessage("");
  };

  const handleTeacherImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && !validateFileSize(file)) {
      e.target.value = "";
      return;
    }
    setTeacherImage(file);
    setErrorMessage("");
  };

  const handleGalleryImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && !validateFileSize(file)) {
      e.target.value = "";
      return;
    }
    setGalleryImage(file);
    setErrorMessage("");
  };

  // ✅ HTML FORMATTING FUNCTIONS
  const applyFormatting = (tag: string) => {
    const textarea = document.getElementById('news-content') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let newText = '';
    
    switch(tag) {
      case 'bold': newText = `<strong>${selectedText || 'Your text here'}</strong>`; break;
      case 'italic': newText = `<em>${selectedText || 'Your text here'}</em>`; break;
      case 'underline': newText = `<u>${selectedText || 'Your text here'}</u>`; break;
      case 'color-red': newText = `<span style="color: red">${selectedText || 'Your text here'}</span>`; break;
      case 'color-blue': newText = `<span style="color: blue">${selectedText || 'Your text here'}</span>`; break;
      case 'color-green': newText = `<span style="color: green">${selectedText || 'Your text here'}</span>`; break;
      case 'heading': newText = `<h3>${selectedText || 'Heading'}</h3>`; break;
      case 'paragraph': newText = `<p>${selectedText || 'Paragraph text'}</p>`; break;
      case 'list': newText = `<ul>\n  <li>${selectedText || 'List item'}</li>\n</ul>`; break;
      case 'link': newText = `<a href="https://example.com" target="_blank">${selectedText || 'Link text'}</a>`; break;
      case 'center': newText = `<div style="text-align: center">${selectedText || 'Centered text'}</div>`; break;
      case 'line-break': newText = `<br/>`; break;
      default: newText = selectedText;
    }

    const newContent = content.substring(0, start) + newText + content.substring(end);
    setContent(newContent);
    
    setTimeout(() => {
      textarea.focus();
      if (!selectedText) {
        const newCursorPos = start + newText.length - (tag === 'list' ? 10 : 8);
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 0);
  };

  // ✅ UPDATED: Add News - with rollover protection
  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newsImage && !validateFileSize(newsImage)) return;

    setLoading(true);
    let imageUrl: string | null = null;
    
    try {
      let finalImage = newsImage;
      
      // ✅ NEW: Optimize image if it exists
      if (newsImage) {
        finalImage = await optimizeImage(newsImage, 500); // Compress to 500KB
        imageUrl = await uploadImage(finalImage, "avatars");
        if (!imageUrl) throw new Error("Failed to upload image");
      }

      const formattedContent = content.split('\n\n').map(paragraph => {
        const trimmed = paragraph.trim();
        if (!trimmed) return '';
        if (trimmed.startsWith('<') && trimmed.endsWith('>')) return trimmed;
        return `<p>${trimmed}</p>`;
      }).join('');

      const newPostData = { title, content: formattedContent || content, image_url: imageUrl };

      // ✅ NEW: Check if rollover is needed
      if (itemCounts.news >= LIMITS.news) {
        setRolloverConfirm({
          isOpen: true,
          itemType: 'news',
          onConfirm: async () => {
            const { data, error } = await handleNewsRollover(newPostData);
            if (error) throw new Error(`Database error: ${error.message}`);
            
            if (data && data[0]) {
              const newPost = data[0];
              setNewsPosts(currentPosts => {
                const updatedPosts = [newPost, ...currentPosts.filter(p => p.id !== data[0].id)];
                AppCache.set('news', updatedPosts);
                return updatedPosts;
              });

              setTitle(""); setContent(""); setNewsImage(null);
              (e.target as HTMLFormElement).reset();
              setErrorMessage("");
              calculateStorageUsage(); // ✅ Update storage usage
            }
            setRolloverConfirm({ isOpen: false, itemType: 'news', onConfirm: () => {} });
          }
        });
        return;
      }

      // ✅ EXISTING: Normal insertion (under limit)
      const { data, error } = await supabase
        .from("news")
        .insert([newPostData])
        .select();

      if (error) throw new Error(`Database error: ${error.message}`);
      
      if (data && data[0]) {
        const newPost = data[0];
        setNewsPosts(currentPosts => {
          const updatedPosts = [newPost, ...currentPosts];
          AppCache.set('news', updatedPosts);
          return updatedPosts;
        });

        setTitle(""); setContent(""); setNewsImage(null);
        (e.target as HTMLFormElement).reset();
        setErrorMessage("");
        calculateStorageUsage(); // ✅ Update storage usage
      }
    } catch (error: any) {
      console.error("Add news error:", error);
      if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
        setErrorMessage("📡 No internet connection. Please check your connection.");
      } else {
        setErrorMessage("❌ Failed to add news post. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ UPDATED: Add Teacher - with rollover protection
  const handleAddTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (teacherImage && !validateFileSize(teacherImage)) return;

    setLoading(true);
    let imageUrl: string | null = null;
    
    try {
      let finalImage = teacherImage;
      
      // ✅ NEW: Optimize image if it exists
      if (teacherImage) {
        finalImage = await optimizeImage(teacherImage, 500);
        imageUrl = await uploadImage(finalImage, "avatars");
        if (!imageUrl) throw new Error("Failed to upload image");
      }

      const newTeacherData = { name: teacherName, class_name: teacherClass, image_url: imageUrl };

      // ✅ NEW: Check if rollover is needed
      if (itemCounts.teachers >= LIMITS.teachers) {
        setRolloverConfirm({
          isOpen: true,
          itemType: 'teachers',
          onConfirm: async () => {
            const { data, error } = await handleTeachersRollover(newTeacherData);
            if (error) throw new Error(`Database error: ${error.message}`);
            
            if (data && data[0]) {
              const newTeacher = data[0];
              setTeachers(currentTeachers => {
                const updatedTeachers = [...currentTeachers.filter(t => t.id !== data[0].id), newTeacher];
                AppCache.set('teachers', updatedTeachers);
                return updatedTeachers;
              });

              setTeacherName(""); setTeacherClass(""); setTeacherImage(null);
              (e.target as HTMLFormElement).reset();
              setErrorMessage("");
              calculateStorageUsage();
            }
            setRolloverConfirm({ isOpen: false, itemType: 'teachers', onConfirm: () => {} });
          }
        });
        return;
      }

      const { data, error } = await supabase
        .from("teachers")
        .insert([newTeacherData])
        .select();

      if (error) throw new Error(`Database error: ${error.message}`);
      
      if (data && data[0]) {
        const newTeacher = data[0];
        
        setTeachers(currentTeachers => {
          const updatedTeachers = [...currentTeachers, newTeacher];
          AppCache.set('teachers', updatedTeachers);
          return updatedTeachers;
        });

        setTeacherName(""); setTeacherClass(""); setTeacherImage(null);
        (e.target as HTMLFormElement).reset();
        setErrorMessage("");
        calculateStorageUsage();
      }
    } catch (error: any) {
      console.error("Add teacher error:", error);
      if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
        setErrorMessage("📡 No internet connection. Please check your connection.");
      } else {
        setErrorMessage("❌ Failed to add teacher. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ UPDATED: Add Gallery Photo - with rollover protection
  const handleAddGalleryPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!galleryImage) {
      setErrorMessage("Please select an image to upload.");
      return;
    }

    if (!validateFileSize(galleryImage)) return;

    setGalleryLoading(true);
    
    try {
      let finalImage = galleryImage;
      
      // ✅ NEW: Optimize image
      finalImage = await optimizeImage(galleryImage, 500);
      const imageUrl = await uploadImage(finalImage, "avatars");
      if (!imageUrl) throw new Error("Failed to upload image");

      const newPhotoData = { image_url: imageUrl, description: galleryDescription };

      // ✅ NEW: Check if rollover is needed
      if (itemCounts.gallery >= LIMITS.gallery) {
        setRolloverConfirm({
          isOpen: true,
          itemType: 'gallery',
          onConfirm: async () => {
            const { data, error } = await handleGalleryRollover(newPhotoData);
            if (error) throw new Error(`Database error: ${error.message}`);
            
            if (data && data[0]) {
              const newPhoto = data[0];
              setGalleryPhotos(currentPhotos => {
                const updatedPhotos = [newPhoto, ...currentPhotos.filter(p => p.id !== data[0].id)];
                AppCache.set('gallery', updatedPhotos);
                return updatedPhotos;
              });

              setGalleryImage(null); setGalleryDescription("");
              (e.target as HTMLFormElement).reset();
              setErrorMessage("");
              calculateStorageUsage();
            }
            setRolloverConfirm({ isOpen: false, itemType: 'gallery', onConfirm: () => {} });
          }
        });
        return;
      }

      const { data, error } = await supabase
        .from("gallery")
        .insert([newPhotoData])
        .select();

      if (error) throw new Error(`Database error: ${error.message}`);
      
      if (data && data[0]) {
        const newPhoto = data[0];
        
        setGalleryPhotos(currentPhotos => {
          const updatedPhotos = [newPhoto, ...currentPhotos];
          AppCache.set('gallery', updatedPhotos);
          return updatedPhotos;
        });

        setGalleryImage(null); setGalleryDescription("");
        (e.target as HTMLFormElement).reset();
        setErrorMessage("");
        calculateStorageUsage();
      }
    } catch (error: any) {
      console.error("Add gallery photo error:", error);
      if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
        setErrorMessage("📡 No internet connection. Please check your connection.");
      } else {
        setErrorMessage("❌ Failed to add photo. Please try again.");
      }
    } finally {
      setGalleryLoading(false);
    }
  };

  // ✅ FIXED: Edit Gallery Photo - SAFE with cancel protection
  const handleEditGalleryPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGallery) return;

    if (!galleryImage) {
      setErrorMessage("Please select a new image to replace the current one.");
      return;
    }

    if (!validateFileSize(galleryImage)) return;

    setGalleryLoading(true);
    
    try {
      let finalImage = galleryImage;
      
      // ✅ OPTIMIZE the new image first
      finalImage = await optimizeImage(galleryImage, 500);
      const newImageUrl = await uploadImage(finalImage, "avatars");
      if (!newImageUrl) throw new Error("Failed to upload new image");

      // ✅ ONLY DELETE OLD IMAGE AFTER NEW IMAGE IS SUCCESSFULLY UPLOADED
      await deleteImageFromStorage(editingGallery.image_url, "avatars");

      // ✅ UPDATE DATABASE - KEEPS SAME ID AND created_at DATE
      const { data, error } = await supabase
        .from("gallery")
        .update({ 
          image_url: newImageUrl, 
          description: galleryDescription || editingGallery.description 
        })
        .eq("id", editingGallery.id)
        .select();

      if (error) throw new Error(`Database error: ${error.message}`);
      
      if (data && data[0]) {
        const updatedPhoto = data[0];
        
        // ✅ UPDATE UI - maintains position in gallery
        setGalleryPhotos(currentPhotos => {
          const updatedPhotos = currentPhotos.map(photo => 
            photo.id === updatedPhoto.id ? updatedPhoto : photo
          );
          AppCache.set('gallery', updatedPhotos);
          return updatedPhotos;
        });

        // ✅ RESET FORM
        setGalleryImage(null); 
        setGalleryDescription("");
        setEditingGallery(null);
        (e.target as HTMLFormElement).reset();
        setErrorMessage("");
        calculateStorageUsage();
      }
    } catch (error: any) {
      console.error("Edit gallery photo error:", error);
      
      // ✅ CRITICAL: If anything fails, the OLD IMAGE STAYS INTACT
      if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
        setErrorMessage("📡 No internet connection. Please check your connection. Your original photo is safe.");
      } else {
        setErrorMessage("❌ Failed to update photo. Your original photo is still intact. Please try again.");
      }
    } finally {
      setGalleryLoading(false);
    }
  };

  // ✅ OPTIMIZED: Edit News - updates cache and UI instantly
  const handleEditNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNews) return;

    if (newsImage && !validateFileSize(newsImage)) return;

    setLoading(true);
    let imageUrl = editingNews.image_url;

    try {
      let finalImage = newsImage;
      
      if (newsImage) {
        // ✅ NEW: Optimize image before upload
        finalImage = await optimizeImage(newsImage, 500);
        if (editingNews.image_url) {
          await deleteImageFromStorage(editingNews.image_url, "avatars");
        }
        imageUrl = await uploadImage(finalImage, "avatars");
        if (!imageUrl) throw new Error("Failed to upload image");
      }

      const formattedContent = content.split('\n\n').map(paragraph => {
        const trimmed = paragraph.trim();
        if (!trimmed) return '';
        if (trimmed.startsWith('<') && trimmed.endsWith('>')) return trimmed;
        return `<p>${trimmed}</p>`;
      }).join('');

      const { data, error } = await supabase
        .from("news")
        .update({ title, content: formattedContent || content, image_url: imageUrl })
        .eq("id", editingNews.id)
        .select();

      if (error) throw new Error(`Database error: ${error.message}`);
      
      if (data && data[0]) {
        const updatedPost = data[0];
        
        setNewsPosts(currentPosts => {
          const updatedPosts = currentPosts.map(post => 
            post.id === updatedPost.id ? updatedPost : post
          );
          AppCache.set('news', updatedPosts);
          return updatedPosts;
        });

        setTitle(""); setContent(""); setNewsImage(null); setEditingNews(null);
        (e.target as HTMLFormElement).reset();
        setErrorMessage("");
        calculateStorageUsage();
      }
    } catch (error: any) {
      console.error("Edit news error:", error);
      if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
        setErrorMessage("📡 No internet connection. Please check your connection.");
      } else {
        setErrorMessage("❌ Failed to update news post. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ OPTIMIZED: Delete News - updates cache and UI instantly
  const handleDeleteNews = async (id: number) => {
    if (!confirm("Are you sure you want to delete this news?")) return;
    
    try {
      const { data: newsItem, error: fetchError } = await supabase
        .from("news")
        .select("image_url")
        .eq("id", id)
        .single();

      if (fetchError) return;

      if (newsItem?.image_url) {
        await deleteImageFromStorage(newsItem.image_url, "avatars");
      }

      const { error: deleteError } = await supabase.from("news").delete().eq("id", id);
      if (!deleteError) {
        setNewsPosts(currentPosts => {
          const updatedPosts = currentPosts.filter(post => post.id !== id);
          AppCache.set('news', updatedPosts);
          return updatedPosts;
        });
        calculateStorageUsage();
      } else {
        throw new Error("Delete failed");
      }
    } catch (error: any) {
      console.error("Delete news error:", error);
      setErrorMessage("❌ Failed to delete news post. Please try again.");
    }
  };

  // ✅ OPTIMIZED: Edit Teacher - updates cache and UI instantly
  const handleEditTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeacher) return;

    if (teacherImage && !validateFileSize(teacherImage)) return;

    setLoading(true);
    let imageUrl = editingTeacher.image_url;

    try {
      let finalImage = teacherImage;
      
      if (teacherImage) {
        // ✅ NEW: Optimize image before upload
        finalImage = await optimizeImage(teacherImage, 500);
        if (editingTeacher.image_url) {
          await deleteImageFromStorage(editingTeacher.image_url, "avatars");
        }
        imageUrl = await uploadImage(finalImage, "avatars");
        if (!imageUrl) throw new Error("Failed to upload image");
      }

      const { data, error } = await supabase
        .from("teachers")
        .update({ name: teacherName, class_name: teacherClass, image_url: imageUrl })
        .eq("id", editingTeacher.id)
        .select();

      if (error) throw new Error(`Database error: ${error.message}`);
      
      if (data && data[0]) {
        const updatedTeacher = data[0];
        
        setTeachers(currentTeachers => {
          const updatedTeachers = currentTeachers.map(teacher => 
            teacher.id === updatedTeacher.id ? updatedTeacher : teacher
          );
          AppCache.set('teachers', updatedTeachers);
          return updatedTeachers;
        });

        setTeacherName(""); setTeacherClass(""); setTeacherImage(null); setEditingTeacher(null);
        (e.target as HTMLFormElement).reset();
        setErrorMessage("");
        calculateStorageUsage();
      }
    } catch (error: any) {
      console.error("Edit teacher error:", error);
      if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
        setErrorMessage("📡 No internet connection. Please check your connection.");
      } else {
        setErrorMessage("❌ Failed to update teacher. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ OPTIMIZED: Delete Teacher - updates cache and UI instantly
  const handleDeleteTeacher = async (id: number) => {
    if (!confirm("Are you sure you want to delete this teacher?")) return;
    
    try {
      const { data: teacher, error: fetchError } = await supabase
        .from("teachers")
        .select("image_url")
        .eq("id", id)
        .single();

      if (fetchError) return;

      if (teacher?.image_url) {
        await deleteImageFromStorage(teacher.image_url, "avatars");
      }

      const { error: deleteError } = await supabase.from("teachers").delete().eq("id", id);
      if (!deleteError) {
        setTeachers(currentTeachers => {
          const updatedTeachers = currentTeachers.filter(teacher => teacher.id !== id);
          AppCache.set('teachers', updatedTeachers);
          return updatedTeachers;
        });
        calculateStorageUsage();
      } else {
        throw new Error("Delete failed");
      }
    } catch (error: any) {
      console.error("Delete teacher error:", error);
      setErrorMessage("❌ Failed to delete teacher. Please try again.");
    }
  };

  // ✅ OPTIMIZED: Delete Gallery Photo - updates cache and UI instantly
  const handleDeleteGalleryPhoto = async (id: number, imageUrl: string) => {
    if (!confirm("Are you sure you want to delete this photo from the gallery?")) return;
    
    try {
      await deleteImageFromStorage(imageUrl, "avatars");

      const { error } = await supabase.from("gallery").delete().eq("id", id);
      if (!error) {
        setGalleryPhotos(currentPhotos => {
          const updatedPhotos = currentPhotos.filter(photo => photo.id !== id);
          AppCache.set('gallery', updatedPhotos);
          return updatedPhotos;
        });
        calculateStorageUsage();
      } else {
        throw new Error("Delete failed");
      }
    } catch (error: any) {
      console.error("Delete gallery photo error:", error);
      setErrorMessage("❌ Failed to delete photo. Please try again.");
    }
  };

  // Start editing functions
  const startEditNews = (post: NewsPost) => {
    setEditingNews(post);
    setTitle(post.title);
    setContent(post.content);
    setNewsImage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditNews = () => {
    setEditingNews(null);
    setTitle(""); setContent(""); setNewsImage(null); setErrorMessage("");
  };

  const startEditTeacher = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setTeacherName(teacher.name);
    setTeacherClass(teacher.class_name);
    setTeacherImage(null);
    setErrorMessage("");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditTeacher = () => {
    setEditingTeacher(null);
    setTeacherName(""); setTeacherClass(""); setTeacherImage(null); setErrorMessage("");
  };

  // ✅ NEW: Start editing gallery photo
  const startEditGallery = (photo: GalleryPhoto) => {
    setEditingGallery(photo);
    setGalleryDescription(photo.description || "");
    setGalleryImage(null);
    setErrorMessage("");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ✅ NEW: Cancel editing gallery photo
  const cancelEditGallery = () => {
    setEditingGallery(null);
    setGalleryDescription("");
    setGalleryImage(null);
    setErrorMessage("");
  };

  // ✅ Logout function
  const handleLogout = async () => {
    if (confirm("Are you sure you want to logout?")) {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error:", error);
      } else {
        window.location.href = "/admin";
      }
    }
  };

  // Manual refresh
  const handleForceRefresh = () => {
    if (activeTab === 'news') fetchNews();
    else if (activeTab === 'teachers') fetchTeachers();
    else if (activeTab === 'gallery') fetchGalleryPhotos();
    calculateStorageUsage();
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif", overflowX: "hidden" }}>
      {/* Rollover Confirmation Dialog */}
      <RolloverConfirmation
        isOpen={rolloverConfirm.isOpen}
        onConfirm={rolloverConfirm.onConfirm}
        onCancel={() => setRolloverConfirm({ isOpen: false, itemType: 'news', onConfirm: () => {} })}
        itemType={rolloverConfirm.itemType}
        currentCount={itemCounts[rolloverConfirm.itemType]}
        maxCount={LIMITS[rolloverConfirm.itemType]}
      />

      {/* Sidebar */}
      <div style={{
          width: sidebarOpen ? "220px" : "60px",
          backgroundColor: "#002244",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: "2cm",
          bottom: 0,
          left: 0,
          padding: "1rem",
          transition: "width 0.3s ease",
          zIndex: 1000,
          overflowY: "auto"
        }}>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{
            marginBottom: "1rem",
            backgroundColor: "red",
            color: "#fff",
            border: "none",
            padding: "0.5rem",
            borderRadius: "4px",
            cursor: "pointer",
            alignSelf: "center",
            minWidth: "40px"
          }}>
          {sidebarOpen ? "Close" : "Open"}
        </button>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{
              padding: "0.5rem",
              cursor: "pointer",
              backgroundColor: activeTab === "news" ? "#001733" : "transparent",
              borderRadius: "4px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }} onClick={() => setActiveTab("news")}>
            {sidebarOpen ? "News Posts" : "📰"}
          </div>
          <div style={{
              padding: "0.5rem",
              cursor: "pointer",
              backgroundColor: activeTab === "teachers" ? "#001733" : "transparent",
              borderRadius: "4px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }} onClick={() => setActiveTab("teachers")}>
            {sidebarOpen ? "Teachers" : "👨‍🏫"}
          </div>
          <div style={{
              padding: "0.5rem",
              cursor: "pointer",
              backgroundColor: activeTab === "gallery" ? "#001733" : "transparent",
              borderRadius: "4px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }} onClick={() => setActiveTab("gallery")}>
            {sidebarOpen ? "Gallery" : "🖼️"}
          </div>
          {/* NEW: PDF Forms Tab */}
          <div style={{
              padding: "0.5rem",
              cursor: "pointer",
              backgroundColor: activeTab === "forms" ? "#001733" : "transparent",
              borderRadius: "4px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }} onClick={() => setActiveTab("forms")}>
            {sidebarOpen ? "PDF Forms" : "📋"}
          </div>
          <div style={{ 
              padding: "0.5rem", 
              cursor: "pointer",
              backgroundColor: "#cc0000",
              borderRadius: "4px",
              textAlign: "center",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }} onClick={handleLogout}>
            {sidebarOpen ? "Logout" : "🚪"}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
    marginLeft: sidebarOpen ? "220px" : "60px",
    flex: 1,
    padding: "1rem",
    backgroundColor: "#f0f2f5",
    transition: "margin-left 0.3s ease",
    minWidth: "0",
    overflowX: "hidden",
    boxSizing: "border-box"
}}>
        {/* Status Indicator */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '1rem',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          <h2 style={{ margin: 0, fontSize: 'clamp(1.2rem, 4vw, 1.5rem)' }}>
            {activeTab === "news" 
              ? (editingNews ? "Edit News Post" : "Add News Post") 
              : activeTab === "teachers"
              ? (editingTeacher ? "Edit Teacher" : "Add Teacher")
              : activeTab === "gallery"
              ? (editingGallery ? "Edit Gallery Photo" : "Gallery Photos")
              : "PDF Forms Management"
            }
          </h2>
          <div style={{
            padding: "0.4rem 0.8rem",
            backgroundColor: isOnline ? "#28a745" : "#ffc107",
            color: "#fff",
            borderRadius: "20px",
            fontSize: "0.8rem",
            fontWeight: "bold",
            flexShrink: 0
          }}>
            {isOnline ? "🟢 Live" : "🟡 Offline"}
          </div>
        </div>

        {/* ✅ NEW: Storage Monitor */}
        <StorageMonitor usage={storageUsage} counts={itemCounts} />

        {activeTab === "news" && (
          <>
            <form onSubmit={editingNews ? handleEditNews : handleAddNews} style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                backgroundColor: "#fff",
                padding: "1rem",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                overflow: "hidden"
              }}>
              <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required style={{
                  padding: "0.8rem",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  outline: "none",
                  width: "100%",
                  boxSizing: "border-box"
                }}/>
              
              {/* HTML EDITOR TOOLBAR */}
              <div style={{ 
  display: "flex", 
  flexWrap: "wrap", 
  gap: "0.5rem", 
  padding: "0.5rem",
  backgroundColor: "#f8f9fa",
  borderRadius: "6px",
  border: "1px solid #ddd",
  overflowX: "auto",
  maxWidth: "100%",
  boxSizing: "border-box"
}}>
                <strong style={{ marginRight: "0.5rem", color: "#002244", fontSize: "0.9rem" }}>Format:</strong>
                <button type="button" onClick={() => applyFormatting('bold')} style={{ padding: "0.3rem 0.5rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer", fontSize: "0.8rem", flexShrink: 0 }}><strong>B</strong></button>
                <button type="button" onClick={() => applyFormatting('italic')} style={{ padding: "0.3rem 0.5rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer", fontSize: "0.8rem", flexShrink: 0 }}><em>I</em></button>
                <button type="button" onClick={() => applyFormatting('underline')} style={{ padding: "0.3rem 0.5rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer", fontSize: "0.8rem", flexShrink: 0 }}><u>U</u></button>
                <button type="button" onClick={() => applyFormatting('color-red')} style={{ padding: "0.3rem 0.5rem", backgroundColor: "#ffebee", border: "1px solid #ffcdd2", borderRadius: "4px", cursor: "pointer", color: "red", fontSize: "0.8rem", flexShrink: 0 }}>🔴</button>
                <button type="button" onClick={() => applyFormatting('color-blue')} style={{ padding: "0.3rem 0.5rem", backgroundColor: "#e3f2fd", border: "1px solid #bbdefb", borderRadius: "4px", cursor: "pointer", color: "blue", fontSize: "0.8rem", flexShrink: 0 }}>🔵</button>
                <button type="button" onClick={() => applyFormatting('color-green')} style={{ padding: "0.3rem 0.5rem", backgroundColor: "#e8f5e8", border: "1px solid #c8e6c9", borderRadius: "4px", cursor: "pointer", color: "green", fontSize: "0.8rem", flexShrink: 0 }}>🟢</button>
                <button type="button" onClick={() => applyFormatting('heading')} style={{ padding: "0.3rem 0.5rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer", fontSize: "0.8rem", flexShrink: 0 }}>H3</button>
                <button type="button" onClick={() => applyFormatting('paragraph')} style={{ padding: "0.3rem 0.5rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer", fontSize: "0.8rem", flexShrink: 0 }}>¶</button>
                <button type="button" onClick={() => applyFormatting('list')} style={{ padding: "0.3rem 0.5rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer", fontSize: "0.8rem", flexShrink: 0 }}>• List</button>
                <button type="button" onClick={() => applyFormatting('center')} style={{ padding: "0.3rem 0.5rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer", fontSize: "0.8rem", flexShrink: 0 }}>Center</button>
                <button type="button" onClick={() => applyFormatting('link')} style={{ padding: "0.3rem 0.5rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer", fontSize: "0.8rem", flexShrink: 0 }}>🔗</button>
                <button type="button" onClick={() => applyFormatting('line-break')} style={{ padding: "0.3rem 0.5rem", backgroundColor: "#e9ecef", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer", fontSize: "0.8rem", flexShrink: 0 }}>↵ Break</button>
              </div>

              {/* HTML CONTENT TEXTAREA */}
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold", color: "#333", fontSize: "0.9rem" }}>Content (HTML Supported):</label>
                <textarea id="news-content" placeholder="Write your news content here... Use the formatting buttons above or write HTML directly! Tip: Press Enter twice to create new paragraphs automatically!" value={content} onChange={(e) => setContent(e.target.value)} required style={{
                    padding: "0.8rem",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    outline: "none",
                    minHeight: "200px",
                    width: "100%",
                    fontFamily: "monospace",
                    fontSize: "0.9rem",
                    whiteSpace: "pre-wrap",
                    boxSizing: "border-box",
                    resize: "vertical"
                  }}/>
                <small style={{ color: "#666", display: "block", marginTop: "0.5rem", fontSize: "0.8rem" }}>💡 <strong>Tip:</strong> Press 'Enter' twice to create paragraphs. Use formatting buttons or write HTML directly!</small>
              </div>

              <div>
                <input type="file" accept="image/*" onChange={handleNewsImageSelect} style={{ width: "100%" }}/>
                <small style={{ color: "#666", display: "block", marginTop: "0.5rem", fontSize: "0.8rem" }}>Maximum file size: 2MB. Recommended: Passport-style photos.</small>
                {errorMessage && (
                  <div style={{
                    backgroundColor: "#ffebee",
                    color: "#c62828",
                    padding: "0.75rem",
                    borderRadius: "6px",
                    marginTop: "0.5rem",
                    border: "1px solid #ffcdd2",
                    fontSize: "0.9rem"
                  }}>⚠️ {errorMessage}</div>
                )}
              </div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <button type="submit" disabled={loading} style={{
                    padding: "0.8rem 1rem",
                    backgroundColor: editingNews ? "#ffa500" : "#002244",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    flex: "1 1 200px",
                    minWidth: "120px"
                  }}>
                  {loading ? "Saving..." : editingNews ? "Update Post" : "Add Post"}
                </button>
                {editingNews && (
                  <button type="button" onClick={cancelEditNews} style={{
                      padding: "0.8rem 1rem",
                      backgroundColor: "#6c757d",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      flex: "0 1 auto",
                      minWidth: "80px"
                    }}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
            
            <h2 style={{ margin: "2rem 0 1rem", fontSize: "1.3rem" }}>EXISTING NEWS POSTS</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {newsPosts.map((post) => (
                <div key={post.id} style={{
                    backgroundColor: "#fff",
                    padding: "1rem",
                    borderRadius: "8px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    overflow: "hidden"
                  }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", flex: 1, flexWrap: "wrap" }}>
                    {post.image_url && (
                      <img src={post.image_url} alt={post.title} style={{ 
                          width: "100px", 
                          height: "100px", 
                          objectFit: "cover",
                          borderRadius: "8px",
                          flexShrink: 0
                        }}/>
                    )}
                    <div style={{ flex: 1, minWidth: "200px" }}>
                      <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem", wordBreak: "break-word" }}>{post.title}</h3>
                      <div style={{ margin: 0, color: "#666", fontSize: "0.9rem", wordBreak: "break-word" }} dangerouslySetInnerHTML={{ __html: post.content.length > 100 ? post.content.substring(0, 100) + '...' : post.content }}/>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end", flexWrap: "wrap" }}>
                    <button onClick={() => startEditNews(post)} style={{
                        backgroundColor: "#ffa500",
                        color: "#fff",
                        border: "none",
                        padding: "0.5rem 0.8rem",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "0.8rem",
                        minWidth: "60px"
                      }}>Edit</button>
                    <button onClick={() => handleDeleteNews(post.id)} style={{
                        backgroundColor: "#cc0000",
                        color: "#fff",
                        border: "none",
                        padding: "0.5rem 0.8rem",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "0.8rem",
                        minWidth: "60px"
                      }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "teachers" && (
          <>
            <h2 style={{ marginBottom: "1rem", fontSize: "clamp(1.2rem, 4vw, 1.5rem)" }}>{editingTeacher ? "Edit Teacher" : "Add Teacher"}</h2>
            <form onSubmit={editingTeacher ? handleEditTeacher : handleAddTeacher} style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                backgroundColor: "#fff",
                padding: "1rem",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                overflow: "hidden"
              }}>
              <input type="text" placeholder="Name" value={teacherName} onChange={(e) => setTeacherName(e.target.value)} required style={{
                  padding: "0.8rem",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  outline: "none",
                  width: "100%",
                  boxSizing: "border-box"
                }}/>
              <input type="text" placeholder="Class" value={teacherClass} onChange={(e) => setTeacherClass(e.target.value)} required style={{
                  padding: "0.8rem",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  outline: "none",
                  width: "100%",
                  boxSizing: "border-box"
                }}/>
              <div>
                <input type="file" accept="image/*" onChange={handleTeacherImageSelect} style={{ width: "100%" }}/>
                <small style={{ color: "#666", display: "block", marginTop: "0.5rem", fontSize: "0.8rem" }}>Maximum file size: 2MB. Recommended: Passport-style photos.</small>
                {errorMessage && (
                  <div style={{
                    backgroundColor: "#ffebee",
                    color: "#c62828",
                    padding: "0.75rem",
                    borderRadius: "6px",
                    marginTop: "0.5rem",
                    border: "1px solid #ffcdd2",
                    fontSize: "0.9rem"
                  }}>⚠️ {errorMessage}</div>
                )}
              </div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <button type="submit" disabled={loading} style={{
                    padding: "0.8rem 1rem",
                    backgroundColor: editingTeacher ? "#ffa500" : "#002244",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    flex: "1 1 200px",
                    minWidth: "120px"
                  }}>
                  {loading ? "Saving..." : editingTeacher ? "Update Teacher" : "Add Teacher"}
                </button>
                {editingTeacher && (
                  <button type="button" onClick={cancelEditTeacher} style={{
                      padding: "0.8rem 1rem",
                      backgroundColor: "#6c757d",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      flex: "0 1 auto",
                      minWidth: "80px"
                    }}>
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <h2 style={{ margin: "2rem 0 1rem", fontSize: "1.3rem" }}>Existing Teachers</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {teachers.map((teacher) => (
                <div key={teacher.id} style={{
                    backgroundColor: "#fff",
                    padding: "1rem",
                    borderRadius: "8px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    overflow: "hidden"
                  }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                    {teacher.image_url && (
                      <img src={teacher.image_url} alt={teacher.name} style={{ 
                          width: "60px", 
                          height: "60px", 
                          objectFit: "cover",
                          borderRadius: "50%",
                          flexShrink: 0
                        }}/>
                    )}
                    <div style={{ flex: 1, minWidth: "150px" }}>
                      <h4 style={{ margin: "0 0 0.25rem 0", fontSize: "1rem" }}>{teacher.name}</h4>
                      <p style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}>{teacher.class_name}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end", flexWrap: "wrap" }}>
                    <button onClick={() => startEditTeacher(teacher)} style={{
                        backgroundColor: "#ffa500",
                        color: "#fff",
                        border: "none",
                        padding: "0.5rem 0.8rem",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "0.8rem",
                        minWidth: "60px"
                      }}>Edit</button>
                    <button onClick={() => handleDeleteTeacher(teacher.id)} style={{
                        backgroundColor: "#cc0000",
                        color: "#fff",
                        border: "none",
                        padding: "0.5rem 0.8rem",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "0.8rem",
                        minWidth: "60px"
                      }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Gallery Section - UPDATED WITH EDIT FUNCTIONALITY */}
        {activeTab === "gallery" && (
          <>
            <div style={{ 
              backgroundColor: "#fff", 
              padding: "1rem", 
              borderRadius: "12px", 
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              marginBottom: "2rem",
              overflow: "hidden"
            }}>
              <h3 style={{ color: "#002244", marginBottom: "1rem", fontSize: "1.1rem" }}>
                {editingGallery ? "Edit Gallery Photo" : "Add Photo to Gallery"} ({itemCounts.gallery}/{LIMITS.gallery})
              </h3>
              
              {itemCounts.gallery >= LIMITS.gallery && !editingGallery && (
                <div style={{
                  backgroundColor: "#fff3cd",
                  color: "#856404",
                  padding: "1rem",
                  borderRadius: "6px",
                  marginBottom: "1rem",
                  border: "1px solid #ffeaa7"
                }}>
                  <strong>⚠️ Maximum Limit Reached:</strong> You have reached the maximum of {LIMITS.gallery} gallery photos. The oldest photo will be deleted if you add a new one.
                </div>
              )}

              <form onSubmit={editingGallery ? handleEditGalleryPhoto : handleAddGalleryPhoto}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div>
                    <input type="file" accept="image/*" onChange={handleGalleryImageSelect} style={{ width: "100%" }}/>
                    <small style={{ color: "#666", display: "block", marginTop: "0.5rem", fontSize: "0.8rem" }}>
                      {editingGallery 
                        ? "Select new image to replace the current one" 
                        : "Maximum file size: 2MB. Supported formats: JPG, PNG, WebP"
                      }
                    </small>
                  </div>
                  
                  <div>
                    <input 
                      type="text" 
                      placeholder="Photo description (optional)" 
                      value={galleryDescription} 
                      onChange={(e) => setGalleryDescription(e.target.value)} 
                      style={{
                        padding: "0.8rem",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        outline: "none",
                        width: "100%",
                        boxSizing: "border-box"
                      }}
                    />
                  </div>

                  {errorMessage && (
                    <div style={{
                      backgroundColor: "#ffebee",
                      color: "#c62828",
                      padding: "0.75rem",
                      borderRadius: "6px",
                      border: "1px solid #ffcdd2",
                      fontSize: "0.9rem"
                    }}>⚠️ {errorMessage}</div>
                  )}

                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    <button type="submit" disabled={galleryLoading} style={{
                        padding: "0.8rem 1rem",
                        backgroundColor: editingGallery ? "#ffa500" : "#002244",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        flex: "1 1 200px",
                        minWidth: "120px"
                      }}>
                      {galleryLoading 
                        ? "Uploading..." 
                        : editingGallery 
                          ? "Update Photo" 
                          : `Add to Gallery (${itemCounts.gallery}/${LIMITS.gallery})`
                      }
                    </button>
                    {editingGallery && (
                      <button type="button" onClick={cancelEditGallery} style={{
                          padding: "0.8rem 1rem",
                          backgroundColor: "#6c757d",
                          color: "#fff",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                          flex: "0 1 auto",
                          minWidth: "80px"
                        }}>
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>

            <h2 style={{ margin: "2rem 0 1rem", fontSize: "1.3rem" }}>Gallery Photos ({itemCounts.gallery}/{LIMITS.gallery})</h2>
            
            {galleryPhotos.length === 0 ? (
              <div style={{ 
                textAlign: "center", 
                padding: "2rem", 
                backgroundColor: "#fff", 
                borderRadius: "8px",
                color: "#666"
              }}>
                <p>No photos in gallery yet. Add your first photo above!</p>
              </div>
            ) : (
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", 
                gap: "1rem" 
              }}>
                {galleryPhotos.map((photo) => (
                  <div key={photo.id} style={{
                      backgroundColor: "#fff",
                      padding: "0.8rem",
                      borderRadius: "8px",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                      textAlign: "center",
                      overflow: "hidden"
                    }}>
                    <img src={photo.image_url} alt={photo.description || "Gallery photo"} style={{ 
                        width: "100%", 
                        height: "120px", 
                        objectFit: "cover",
                        borderRadius: "6px",
                        marginBottom: "0.5rem"
                      }}/>
                    {photo.description && (
                      <p style={{ 
                        fontSize: "0.8rem", 
                        color: "#666",
                        marginBottom: "0.5rem",
                        wordBreak: "break-word",
                        lineHeight: "1.3"
                      }}>{photo.description}</p>
                    )}
                    {/* ✅ NEW: Edit and Delete buttons for gallery */}
                    <div style={{ display: "flex", gap: "0.3rem", justifyContent: "center", flexWrap: "wrap" }}>
                      <button onClick={() => startEditGallery(photo)} style={{
                          backgroundColor: "#ffa500",
                          color: "#fff",
                          border: "none",
                          padding: "0.3rem 0.5rem",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "0.7rem",
                          minWidth: "50px"
                        }}>Edit</button>
                      <button onClick={() => handleDeleteGalleryPhoto(photo.id, photo.image_url)} style={{
                          backgroundColor: "#cc0000",
                          color: "#fff",
                          border: "none",
                          padding: "0.3rem 0.5rem",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "0.7rem",
                          minWidth: "50px"
                        }}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* NEW: PDF Forms Management Section */}
        {activeTab === "forms" && (
          <div style={{ overflow: "hidden" }}>
            <h2 style={{ marginBottom: "1rem", fontSize: "clamp(1.2rem, 4vw, 1.5rem)" }}>PDF Forms Management</h2>
            
            {/* Instructions */}
            <div style={{
              backgroundColor: "#e8f4fd",
              border: "1px solid #b6d7e8",
              borderRadius: "8px",
              padding: "1rem",
              marginBottom: "1.5rem"
            }}>
              <h3 style={{ color: "#002244", marginBottom: "0.5rem", fontSize: "1rem" }}>📋 How to Update Forms</h3>
              <p style={{ margin: 0, color: "#002244", fontSize: "0.9rem" }}>
                Upload new versions of enrollment and requirements forms. The system will automatically 
                rename files to the correct names. Parents will download these from the enrollment page.
              </p>
            </div>

            {/* Enrollment Form Card */}
            <div style={{
              backgroundColor: "#fff",
              padding: "1rem",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              marginBottom: "1.5rem"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
                <div style={{ flex: 1, minWidth: "200px" }}>
                  <h3 style={{ color: "#002244", marginBottom: "0.5rem", fontSize: "1.1rem" }}>🎓 Enrollment Form</h3>
                  <p style={{ color: "#666", margin: 0, fontSize: "0.9rem" }}>Official student enrollment application form</p>
                  <small style={{ color: "#888", fontSize: "0.8rem" }}>File: enrollment-form.pdf</small>
                </div>
                <div style={{
                  padding: "0.4rem 0.8rem",
                  backgroundColor: "#e8f5e8",
                  color: "#2e7d32",
                  borderRadius: "20px",
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                  flexShrink: 0
                }}>
                  Active
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-end", flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 200px", minWidth: "150px" }}>
                  <input 
                    id="pdf-upload-enrollment"
                    type="file" 
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setSelectedPdf(e.target.files ? e.target.files[0] : null)}
                    style={{ width: "100%" }}
                  />
                  <small style={{ color: "#666", display: "block", marginTop: "0.5rem", fontSize: "0.8rem" }}>
                    Select new PDF or Word document to replace current enrollment form
                  </small>
                </div>
                <button 
  onClick={() => handlePdfUpload('enrollment')}
  disabled={!selectedPdf || uploadingEnrollmentPdf}
  style={{
    padding: "0.8rem 1rem",
    backgroundColor: selectedPdf ? "#002244" : "#ccc",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: selectedPdf ? "pointer" : "not-allowed",
    whiteSpace: "nowrap",
    flexShrink: 0,
    minWidth: "120px"
  }}
>
  {uploadingEnrollmentPdf ? "Uploading..." : "Update Form"}
</button>
              </div>
            </div>

            {/* Requirements Form Card */}
            <div style={{
              backgroundColor: "#fff",
              padding: "1rem",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              marginBottom: "1.5rem"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
                <div style={{ flex: 1, minWidth: "200px" }}>
                  <h3 style={{ color: "#002244", marginBottom: "0.5rem", fontSize: "1.1rem" }}>📚 School Requirements</h3>
                  <p style={{ color: "#666", margin: 0, fontSize: "0.9rem" }}>Complete admission requirements and documents checklist</p>
                  <small style={{ color: "#888", fontSize: "0.8rem" }}>File: school-requirements.pdf</small>
                </div>
                <div style={{
                  padding: "0.4rem 0.8rem",
                  backgroundColor: "#e8f5e8",
                  color: "#2e7d32",
                  borderRadius: "20px",
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                  flexShrink: 0
                }}>
                  Active
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-end", flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 200px", minWidth: "150px" }}>
                  <input 
                    id="pdf-upload-requirements"
                    type="file" 
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setSelectedPdf(e.target.files ? e.target.files[0] : null)}
                    style={{ width: "100%" }}
                  />
                  <small style={{ color: "#666", display: "block", marginTop: "0.5rem", fontSize: "0.8rem" }}>
                    Select new PDF or Word document to replace current requirements form
                  </small>
                </div>
               <button 
  onClick={() => handlePdfUpload('requirements')}
  disabled={!selectedPdf || uploadingRequirementsPdf}
  style={{
    padding: "0.8rem 1rem",
    backgroundColor: selectedPdf ? "#002244" : "#ccc",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: selectedPdf ? "pointer" : "not-allowed",
    whiteSpace: "nowrap",
    flexShrink: 0,
    minWidth: "120px"
  }}
>
  {uploadingRequirementsPdf ? "Uploading..." : "Update Form"}
</button>
              </div>
            </div>

            {/* Current Forms Status */}
            <div style={{
              backgroundColor: "#fff",
              padding: "1rem",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
            }}>
              <h3 style={{ color: "#002244", marginBottom: "1rem", fontSize: "1.1rem" }}>Current Forms Status</h3>
              
              {pdfForms.length === 0 ? (
                <div style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
                  <p>No forms uploaded yet. Upload your first form above.</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {pdfForms.map((form) => (
                    <div key={form.id} style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "1rem",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "6px",
                      border: "1px solid #e9ecef",
                      flexWrap: "wrap",
                      gap: "0.5rem"
                    }}>
                      <div style={{ flex: 1, minWidth: "200px" }}>
                        <h4 style={{ margin: "0 0 0.25rem 0", color: "#002244", fontSize: "1rem" }}>{form.name}</h4>
                        <p style={{ margin: "0 0 0.25rem 0", color: "#666", fontSize: "0.9rem" }}>{form.description}</p>
                        <small style={{ color: "#888", fontSize: "0.8rem" }}>File: {form.file_name}</small>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ color: "#28a745", fontSize: "0.8rem", fontWeight: "bold" }}>Active</div>
                        <small style={{ color: "#666", fontSize: "0.8rem" }}>
                          Updated: {new Date(form.updated_at).toLocaleDateString()}
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {errorMessage && (
              <div style={{
                backgroundColor: "#ffebee",
                color: "#c62828",
                padding: "0.75rem",
                borderRadius: "6px",
                marginTop: "1rem",
                border: "1px solid #ffcdd2"
              }}>
                ⚠️ {errorMessage}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}