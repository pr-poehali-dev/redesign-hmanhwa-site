import Icon from '@/components/ui/icon';
import { Manga, getReadingProgress, getBookmarks } from '@/data/manga';

interface MangaCardProps {
  manga: Manga;
  onNavigate: (page: string, params?: Record<string, string>) => void;
  size?: 'sm' | 'md' | 'lg';
}

const STATUS_MAP = {
  ongoing: { label: 'Выходит', color: 'text-green-400' },
  completed: { label: 'Завершён', color: 'text-blue-400' },
  hiatus: { label: 'Пауза', color: 'text-accent' },
};

const TYPE_MAP = {
  manga: 'Манга',
  manhwa: 'Манхва',
  manhua: 'Маньхуа',
};

export default function MangaCard({ manga, onNavigate, size = 'md' }: MangaCardProps) {
  const progress = getReadingProgress();
  const bookmarks = getBookmarks();
  const lastChapter = progress[manga.id];
  const isBookmarked = bookmarks.includes(manga.id);

  const isSmall = size === 'sm';
  const isLarge = size === 'lg';

  return (
    <div
      className="group cursor-pointer manga-card-hover"
      onClick={() => onNavigate('manga', { id: manga.id })}
    >
      {/* Cover */}
      <div className={`relative overflow-hidden rounded-md bg-secondary ${
        isSmall ? 'aspect-[2/3]' : isLarge ? 'aspect-[2/3]' : 'aspect-[2/3]'
      }`}>
        <img
          src={manga.cover}
          alt={manga.titleRu}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Top badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          <span className="bg-primary text-white text-[10px] font-oswald font-bold px-1.5 py-0.5 rounded">
            {TYPE_MAP[manga.type]}
          </span>
        </div>

        {/* Rating */}
        <div className="absolute top-2 right-2 flex items-center gap-0.5 bg-black/70 rounded px-1.5 py-0.5">
          <Icon name="Star" size={10} className="text-accent fill-accent" />
          <span className="text-[10px] font-oswald font-bold text-white">{manga.rating}</span>
        </div>

        {/* Bookmark indicator */}
        {isBookmarked && (
          <div className="absolute bottom-2 right-2">
            <Icon name="Bookmark" size={14} className="text-primary fill-primary" />
          </div>
        )}

        {/* Progress */}
        {lastChapter && (
          <div className="absolute bottom-2 left-2 bg-black/70 rounded px-1.5 py-0.5">
            <span className="text-[10px] font-golos text-white">Гл. {lastChapter}</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className={`mt-2 ${isSmall ? 'space-y-0.5' : 'space-y-1'}`}>
        <h3 className={`font-oswald font-semibold leading-tight line-clamp-2 text-foreground group-hover:text-primary transition-colors ${
          isSmall ? 'text-xs' : isLarge ? 'text-base' : 'text-sm'
        }`}>
          {manga.titleRu}
        </h3>
        {!isSmall && (
          <div className="flex items-center gap-2">
            <span className={`text-xs font-golos ${STATUS_MAP[manga.status].color}`}>
              {STATUS_MAP[manga.status].label}
            </span>
            <span className="text-muted-foreground text-xs">
              {manga.chapters.length} гл.
            </span>
          </div>
        )}
        {isLarge && (
          <div className="flex flex-wrap gap-1 mt-1">
            {manga.genres.slice(0, 2).map(g => (
              <span key={g} className="text-[10px] bg-secondary text-muted-foreground px-1.5 py-0.5 rounded">
                {g}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
