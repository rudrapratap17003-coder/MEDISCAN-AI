import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UploadCloud,
  FileImage,
  X,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  FileCheck,
  Eye,
} from 'lucide-react';
import { Button } from '../common';

/**
 * Reusable Image Upload Component with drag-and-drop, format/size validation,
 * local preview, and file replacement/removal.
 */
const ImageUpload = ({
  category,
  selectedFile,
  previewUrl,
  onImageSelected,
  onImageRemoved,
  className = '',
  disabled = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [imageMeta, setImageMeta] = useState(null);
  const fileInputRef = useRef(null);

  const maxSizeBytes = category?.maxSizeBytes || 10 * 1024 * 1024;
  const maxSizeLabel = category?.maxSizeLabel || '10 MB';
  const acceptedTypes = category?.acceptedFormats || [
    'image/jpeg',
    'image/png',
    'image/jpg',
  ];

  // Validate file
  const validateFile = useCallback(
    (file) => {
      setValidationError('');

      if (!file) {
        return false;
      }

      // Check MIME type
      const isAcceptedType =
        acceptedTypes.includes(file.type) ||
        /\.(jpe?g|png)$/i.test(file.name);

      if (!isAcceptedType) {
        setValidationError(
          `Unsupported file format (${file.type || 'unknown'}). Please upload a JPG, JPEG, or PNG image.`
        );
        return false;
      }

      // Check size
      if (file.size > maxSizeBytes) {
        const fileMb = (file.size / (1024 * 1024)).toFixed(2);
        setValidationError(
          `File size exceeds limit (${fileMb} MB). Maximum allowed size is ${maxSizeLabel}.`
        );
        return false;
      }

      return true;
    },
    [acceptedTypes, maxSizeBytes, maxSizeLabel]
  );

  // Handle incoming file
  const processFile = useCallback(
    (file) => {
      if (disabled) return;
      if (!validateFile(file)) return;

      const url = URL.createObjectURL(file);

      // Preload image to get natural dimensions
      const img = new Image();
      img.onload = () => {
        setImageMeta({
          width: img.naturalWidth,
          height: img.naturalHeight,
          sizeFormatted: formatBytes(file.size),
          name: file.name,
          type: file.type || 'image/jpeg',
        });
      };
      img.src = url;

      onImageSelected(file, url);
    },
    [disabled, validateFile, onImageSelected]
  );

  // Drag event handlers
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
    // reset input so the same file can be re-selected if replaced
    e.target.value = '';
  };

  const handleBrowseClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setValidationError('');
    setImageMeta(null);
    onImageRemoved();
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png,image/jpeg,image/png"
        className="hidden"
        onChange={handleFileInputChange}
        disabled={disabled}
      />

      {/* Upload Dropzone (when no file selected) */}
      {!previewUrl ? (
        <div
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleBrowseClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleBrowseClick();
            }
          }}
          className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 outline-none focus:ring-2 focus:ring-primary/20 ${
            isDragging
              ? 'border-primary bg-primary-50/70 scale-[1.01]'
              : 'border-border hover:border-primary/50 bg-surface hover:bg-slate-50/50'
          } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          <div className="flex flex-col items-center justify-center max-w-md mx-auto pointer-events-none">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-200 ${
                isDragging
                  ? 'bg-primary text-white scale-110 shadow-medium'
                  : 'bg-primary-50 text-primary'
              }`}
            >
              <UploadCloud size={32} />
            </div>

            <h4 className="text-base font-semibold text-text-primary mb-1">
              Drag and drop your medical image here
            </h4>
            <p className="text-xs sm:text-sm text-text-secondary mb-5">
              Supports standard high-resolution JPG, JPEG, and PNG files up to {maxSizeLabel}
            </p>

            <Button
              type="button"
              variant="outline"
              size="sm"
              icon={FileImage}
              onClick={(e) => {
                e.stopPropagation();
                handleBrowseClick();
              }}
              disabled={disabled}
            >
              Browse Local Files
            </Button>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[11px] text-text-secondary/70">
              <span className="inline-flex items-center gap-1">
                <FileCheck size={12} className="text-success" /> Validated Formats: JPG, PNG
              </span>
              <span>&middot;</span>
              <span>Client-side only preview</span>
              <span>&middot;</span>
              <span>Max: {maxSizeLabel}</span>
            </div>
          </div>
        </div>
      ) : (
        /* Image Preview & Details State */
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="bg-surface rounded-2xl border border-border p-5 shadow-soft"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Thumbnail Preview with Overlay */}
            <div className="md:col-span-5 relative group rounded-xl overflow-hidden bg-slate-950 aspect-[4/3] flex items-center justify-center border border-border shadow-inner">
              <img
                src={previewUrl}
                alt="Selected medical specimen"
                className="max-h-full max-w-full object-contain"
              />

              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] text-white font-medium flex items-center gap-1">
                <Eye size={10} /> Local Preview
              </div>

              {/* Quick action buttons on preview */}
              <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleRemove}
                  className="p-1.5 rounded-lg bg-black/60 hover:bg-danger text-white transition-colors"
                  title="Remove image"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Image Metadata & Controls */}
            <div className="md:col-span-7 flex flex-col justify-between h-full space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-success" />
                  <span className="text-xs font-semibold text-success uppercase tracking-wider">
                    Image Loaded & Validated
                  </span>
                </div>

                <h4 className="text-base font-bold text-text-primary break-all mb-1">
                  {selectedFile?.name || 'medical-image.png'}
                </h4>
                <p className="text-xs text-text-secondary">
                  Ready for AI preprocessing and screening verification.
                </p>
              </div>

              {/* Metadata Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-3 rounded-xl bg-background border border-border text-xs">
                <div>
                  <span className="text-[10px] text-text-secondary block font-medium">File Size</span>
                  <span className="font-semibold text-text-primary">
                    {formatBytes(selectedFile?.size || 0)}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-text-secondary block font-medium">Dimensions</span>
                  <span className="font-semibold text-text-primary">
                    {imageMeta?.width ? `${imageMeta.width} × ${imageMeta.height} px` : 'Reading...'}
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-text-secondary block font-medium">Encoding</span>
                  <span className="font-semibold text-text-primary uppercase">
                    {selectedFile?.type ? selectedFile.type.replace('image/', '') : 'PNG'}
                  </span>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  icon={RefreshCw}
                  onClick={handleBrowseClick}
                  disabled={disabled}
                >
                  Replace Image
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  icon={X}
                  onClick={handleRemove}
                  className="text-text-secondary hover:text-danger hover:bg-red-50"
                  disabled={disabled}
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Validation Error Banner */}
      <AnimatePresence>
        {validationError && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-danger text-xs"
          >
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-semibold">Upload Notice:</span> {validationError}
            </div>
            <button
              onClick={() => setValidationError('')}
              className="text-danger hover:opacity-75 transition-opacity"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageUpload;
