import React, { useState } from 'react';
import { X, Download, Copy, Check, FileCode, Terminal } from 'lucide-react';
import JSZip from 'jszip';
import { ANDROID_PROJECT_FILES } from '../androidCode/sourceCodeRegistry';

interface AndroidExportModalProps {
  onClose: () => void;
}

export const AndroidExportModal: React.FC<AndroidExportModalProps> = ({ onClose }) => {
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isZipping, setIsZipping] = useState(false);

  const activeFile = ANDROID_PROJECT_FILES[selectedFileIndex];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    try {
      setIsZipping(true);
      const zip = new JSZip();

      // Add all Android files into the zip
      ANDROID_PROJECT_FILES.forEach((f) => {
        zip.file(f.path, f.content);
      });

      // Generate the zip blob
      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);

      // Trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'VelviaTV-AndroidStudio-Project.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to generate zip', err);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-md select-none animate-fadeIn">
      <div className="relative w-full max-w-5xl h-[85vh] bg-zinc-950 border border-zinc-800 js-radius shadow-2xl flex flex-col overflow-hidden">
        {/* Header (Monochrome) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 js-radius bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">Velvia TV — Native Android TV Project</h3>
                <span className="px-2 py-0.5 js-radius bg-zinc-800 text-zinc-300 text-[10px] font-bold border border-zinc-700">
                  Ready for Android Studio
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Kotlin • Jetpack Compose for TV (Material3) • AndroidX Media3 ExoPlayer • Sony Bravia Leanback
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadZip}
              disabled={isZipping}
              className="flex items-center gap-2 px-5 py-2.5 js-radius bg-white hover:bg-zinc-200 text-black text-xs font-bold shadow-lg cursor-pointer transition-all active:scale-95 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isZipping ? 'Generating ZIP...' : 'Download Project ZIP'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 js-radius bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white cursor-pointer transition-colors border border-zinc-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body: Left File Tree, Right Code Preview */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          {/* File Explorer Navigation */}
          <div className="md:col-span-4 bg-zinc-950 border-r border-zinc-800 p-4 overflow-y-auto">
            <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-3 px-2 flex items-center justify-between">
              <span>Project Files</span>
              <span className="font-mono text-white">{ANDROID_PROJECT_FILES.length} files</span>
            </div>

            <div className="space-y-1">
              {ANDROID_PROJECT_FILES.map((file, idx) => {
                const isSelected = selectedFileIndex === idx;

                return (
                  <button
                    key={file.path}
                    onClick={() => setSelectedFileIndex(idx)}
                    className={`w-full flex items-start gap-2.5 px-3 py-2.5 js-radius text-left text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-zinc-800 text-white font-semibold border border-zinc-700'
                        : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                    }`}
                  >
                    <FileCode className={`w-4 h-4 shrink-0 mt-0.5 ${isSelected ? 'text-white' : 'text-zinc-600'}`} />
                    <div className="min-w-0 flex-1">
                      <div className="font-mono text-white truncate text-[11px]">{file.path}</div>
                      <div className="text-[10px] text-zinc-500 truncate">{file.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick ADB deploy helper */}
            <div className="mt-6 p-3 js-radius bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-400">
              <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-zinc-300" />
                <span>Deploy to Sony Bravia</span>
              </div>
              <code className="block bg-black p-2 js-radius text-[10px] font-mono text-white my-1 border border-zinc-800">
                adb connect &lt;TV_IP&gt;:5555
              </code>
              <span>Run directly on your Sony Bravia Google TV over WiFi.</span>
            </div>
          </div>

          {/* Code Viewer */}
          <div className="md:col-span-8 flex flex-col bg-black overflow-hidden">
            {/* Viewer Toolbar */}
            <div className="flex items-center justify-between px-6 py-2.5 bg-zinc-900 border-b border-zinc-800">
              <span className="font-mono text-xs text-white font-semibold truncate">
                {activeFile.path}
              </span>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3 py-1 js-radius bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 font-medium cursor-pointer transition-colors border border-zinc-700"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy File'}</span>
              </button>
            </div>

            {/* Code Pre container */}
            <div className="flex-1 p-6 overflow-auto font-mono text-xs text-zinc-300 leading-relaxed bg-black">
              <pre className="whitespace-pre">{activeFile.content}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
