/**
 * Utility functions for handling image compression, file-to-data-URL conversion,
 * and camera / gallery inputs for construction site photos.
 */

export interface ProcessedImage {
  dataUrl: string;
  fileName: string;
  sizeBytes: number;
}

/**
 * Resizes and compresses an image File to a lightweight, crisp Data URL (JPEG/WebP)
 * to avoid exceeding Firestore 1MB document quotas and localStorage limits.
 */
export async function compressAndReadFile(
  file: File,
  maxWidth = 1280,
  maxHeight = 1280,
  quality = 0.82
): Promise<ProcessedImage> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            maxHeight = Math.round(maxHeight);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          // Fallback to original data URL
          const resultStr = readerEvent.target?.result as string;
          resolve({
            dataUrl: resultStr,
            fileName: file.name,
            sizeBytes: resultStr.length,
          });
          return;
        }

        // Draw image smoothly
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to lightweight JPEG
        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve({
          dataUrl,
          fileName: file.name,
          sizeBytes: dataUrl.length,
        });
      };

      img.onerror = (err) => {
        reject(new Error("이미지 파일을 로드할 수 없습니다."));
      };

      img.src = readerEvent.target?.result as string;
    };

    reader.onerror = (err) => {
      reject(new Error("파일을 읽는 중 오류가 발생했습니다."));
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Batch process multiple files into lightweight data URLs
 */
export async function processMultipleImageFiles(
  files: FileList | File[],
  maxWidth = 1280,
  maxHeight = 1280,
  quality = 0.82
): Promise<ProcessedImage[]> {
  const fileArray = Array.from(files);
  const results: ProcessedImage[] = [];

  for (const file of fileArray) {
    if (!file.type.startsWith("image/")) continue;
    try {
      const processed = await compressAndReadFile(file, maxWidth, maxHeight, quality);
      results.push(processed);
    } catch (e) {
      console.warn("Failed to compress file:", file.name, e);
    }
  }

  return results;
}
