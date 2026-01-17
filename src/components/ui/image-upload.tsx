"use client";

import { useState, useCallback, useRef } from "react";
import { Upload, X, Image as ImageIcon, RotateCw, ZoomIn, ZoomOut, Crop, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  className?: string;
  maxSizeInMB?: number;
  acceptedTypes?: string[];
  showOptimization?: boolean;
  onImageLoad?: (image: HTMLImageElement) => void;
}

export function ImageUpload({ 
  value, 
  onChange, 
  className, 
  maxSizeInMB = 5,
  acceptedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"],
  showOptimization = false,
  onImageLoad
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string>("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(async (file: File) => {
    if (!file) return;

    // Validate file type
    if (!acceptedTypes.includes(file.type)) {
      setError(`Invalid file type. Only ${acceptedTypes.map(type => type.split('/')[1]).join(', ')} are allowed.`);
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = maxSizeInMB * 1024 * 1024;
    if (file.size > maxSize) {
      setError(`File size too large. Maximum size is ${maxSizeInMB}MB.`);
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        onChange(data.url);
        setError("");
        
        // Load image to get dimensions
        const img = new Image();
        img.onload = () => {
          setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
          setImageLoaded(true);
          onImageLoad?.(img);
        };
        img.src = data.url;
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsUploading(false);
    }
  }, [onChange, acceptedTypes, maxSizeInMB, onImageLoad]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const removeImage = () => {
    onChange("");
    setError("");
    setImageLoaded(false);
    setZoom(1);
    setRotation(0);
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
  };

  const resetAdjustments = () => {
    setZoom(1);
    setRotation(0);
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
  };

  const downloadImage = () => {
    if (!value) return;
    
    const link = document.createElement('a');
    link.href = value;
    link.download = `image-${Date.now()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const imageStyle = {
    transform: `scale(${zoom}) rotate(${rotation}deg)`,
    filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
  };

  return (
    <div className={cn("w-full", className)}>
      {value ? (
        <div className="space-y-4">
          <div className="relative group overflow-hidden rounded-lg border">
            <img
              src={value}
              alt="Uploaded image"
              className="w-full h-64 object-cover transition-transform"
              style={imageStyle}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={removeImage}
                >
                  <X className="h-4 w-4 mr-2" />
                  Remove
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={downloadImage}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </div>

          {showOptimization && imageLoaded && (
            <div className="space-y-4 p-4 border rounded-lg bg-slate-50">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Image Adjustments</h4>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={resetAdjustments}
                >
                  Reset
                </Button>
              </div>

              <div className="grid gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Zoom</label>
                    <span className="text-sm text-muted-foreground">{Math.round(zoom * 100)}%</span>
                  </div>
                  <Slider
                    value={[zoom]}
                    onValueChange={([value]) => setZoom(value)}
                    min={0.5}
                    max={2}
                    step={0.1}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Rotation</label>
                    <span className="text-sm text-muted-foreground">{rotation}°</span>
                  </div>
                  <Slider
                    value={[rotation]}
                    onValueChange={([value]) => setRotation(value)}
                    min={-180}
                    max={180}
                    step={15}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Brightness</label>
                    <span className="text-sm text-muted-foreground">{brightness}%</span>
                  </div>
                  <Slider
                    value={[brightness]}
                    onValueChange={([value]) => setBrightness(value)}
                    min={0}
                    max={200}
                    step={5}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Contrast</label>
                    <span className="text-sm text-muted-foreground">{contrast}%</span>
                  </div>
                  <Slider
                    value={[contrast]}
                    onValueChange={([value]) => setContrast(value)}
                    min={0}
                    max={200}
                    step={5}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Saturation</label>
                    <span className="text-sm text-muted-foreground">{saturation}%</span>
                  </div>
                  <Slider
                    value={[saturation]}
                    onValueChange={([value]) => setSaturation(value)}
                    min={0}
                    max={200}
                    step={5}
                  />
                </div>

                {imageDimensions.width > 0 && (
                  <div className="text-xs text-muted-foreground text-center pt-2 border-t">
                    Original dimensions: {imageDimensions.width} × {imageDimensions.height}px
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
            "hover:border-primary hover:bg-primary/5",
            error ? "border-red-300 bg-red-50" : "border-gray-300"
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            id="image-upload"
            type="file"
            accept={acceptedTypes.join(',')}
            onChange={handleFileInput}
            className="hidden"
            disabled={isUploading}
          />
          {isUploading ? (
            <div className="flex flex-col items-center space-y-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-sm text-gray-600">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <Upload className="h-8 w-8 text-gray-400" />
              <p className="text-sm text-gray-600">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500">
                {acceptedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')} up to {maxSizeInMB}MB
              </p>
            </div>
          )}
        </div>
      )}
      {error && !value && (
        <p className="text-sm text-red-500 mt-2">{error}</p>
      )}
    </div>
  );
}