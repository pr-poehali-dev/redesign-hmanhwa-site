import { useState, useEffect, useCallback } from 'react';
import Icon from '@/components/ui/icon';
import { MOCK_MANGA, saveReadingProgress } from '@/data/manga';

interface ReaderPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  params?: Record<string, string>;
}

export default function ReaderPage({ onNavigate, params }: ReaderPageProps) {
  const manga = MOCK_MANGA.find(m => m.id === params?.id) || MOCK_MANGA[0];
  const chapterNum = parseInt(params?.chapter || '1', 10);
  const chapter = manga.chapters.find(c => c.number === chapterNum) || manga.chapters[0];
  const [showUI, setShowUI] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const chapterIndex = manga.chapters.findIndex(c => c.number === chapterNum);
  const prevChapter = manga.chapters[chapterIndex + 1];
  const nextChapter = manga.chapters[chapterIndex - 1];

  useEffect(() => {
    if (chapter) {
      saveReadingProgress(manga.id, chapter.number);
    }
  }, [manga.id, chapter]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const handleMouseMove = () => {
      setShowUI(true);
      clearTimeout(timer);
      timer = setTimeout(() => setShowUI(false), 3000);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => { window.removeEventListener('mousemove', handleMouseMove); clearTimeout(timer); };
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      setCurrentPage(p => Math.min(p + 1, (chapter?.pages.length || 1) - 1));
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      setCurrentPage(p => Math.max(p - 1, 0));
    }
  }, [chapter]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!chapter) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground font-golos">Глава не найдена</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative">
      {/* Top bar */}
      <div className={`fixed top-0 left-0 right-0 z-50 bg-background/95 border-b border-border backdrop-blur-sm transition-all duration-300 ${showUI ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}>
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={() => onNavigate('manga', { id: manga.id })}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name="ArrowLeft" size={16} />
            <span className="font-golos text-sm">{manga.titleRu}</span>
          </button>
          <div className="text-center">
            <div className="font-oswald font-semibold text-sm">{chapter.title}</div>
            <div className="font-golos text-xs text-muted-foreground">
              {currentPage + 1} / {chapter.pages.length}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-muted-foreground hover:text-foreground p-1.5 transition-colors">
              <Icon name="Settings" size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Pages — vertical scroll mode */}
      <div className="pt-14 flex flex-col items-center max-w-3xl mx-auto">
        {chapter.pages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Страница ${i + 1}`}
            className="w-full block"
            loading={i < 3 ? 'eager' : 'lazy'}
            onClick={() => setCurrentPage(i)}
          />
        ))}
      </div>

      {/* Bottom bar */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 bg-background/95 border-t border-border backdrop-blur-sm transition-all duration-300 ${showUI ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}>
        <div className="flex items-center justify-between px-4 h-14 gap-4">
          <button
            onClick={() => prevChapter && onNavigate('reader', { id: manga.id, chapter: String(prevChapter.number) })}
            disabled={!prevChapter}
            className="flex items-center gap-1.5 text-sm font-golos text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
          >
            <Icon name="ChevronLeft" size={16} />
            Пред.
          </button>

          {/* Progress bar */}
          <div className="flex-1 h-1 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${((currentPage + 1) / chapter.pages.length) * 100}%` }}
            />
          </div>

          <button
            onClick={() => nextChapter && onNavigate('reader', { id: manga.id, chapter: String(nextChapter.number) })}
            disabled={!nextChapter}
            className="flex items-center gap-1.5 text-sm font-golos text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
          >
            След.
            <Icon name="ChevronRight" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
