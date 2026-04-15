import Icon from '@/components/ui/icon';
import { Manga, getReadingProgress, getBookmarks } from '@/data/manga';

interface MangaCardProps {
  manga: Manga;
  onNavigate: (page: string, params?: Record<string, string>) => void;
  size?: 'sm' | 'md' | 'lg';
  badge?: 'hot' | 'new' | 'top' | 'end';
  rank?: number;
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

const BADGE_MAP = {
  hot: { label: 'ХОТС', bg: 'bg-orange-500' },
  new: { label: 'НОВОЕ', bg: 'bg-green-600' },
  top: { label: 'ТОП', bg: 'bg-yellow-600' },
  end: { label: 'КОНЕЦ', bg: 'bg-blue-600' },
};

export default function MangaCard({ manga, onNavigate, size = 'md', badge, rank }: MangaCardProps) {
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
      <div className="relative overflow-hidden rounded-md bg-secondary aspect-[2/3]">
        <img
          src={manga.cover}
          alt={manga.titleRu}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Top-left: HOT/NEW/TOP badge OR rank */}
        <div className="absolute top-0 left-0 flex flex-col gap-0.5">
          {badge && (
            <span className={`${BADGE_MAP[badge].bg} text-white text-[9px] font-oswald font-bold px-1.5 py-0.5 rounded-br`}>
              {BADGE_MAP[badge].label}
            </span>
          )}
          {rank && (
            <span className="bg-black/80 text-white text-[9px] font-oswald font-bold px-1.5 py-0.5 rounded-br">
              #{rank}
            </span>
          )}
        </div>

        {/* Top-right: Type badge */}
        <div className="absolute top-0 right-0">
          <span className="bg-primary text-white text-[9px] font-oswald font-bold px-1.5 py-0.5 rounded-bl">
            {TYPE_MAP[manga.type]}
          </span>
        </div>

        {/* Bottom info bar */}
        <div className="absolute bottom-0 left-0 right-0 px-1.5 pb-1.5 pt-4">
          {/* Rating row */}
          <div className="flex items-center justify-between mb-0.5">
            <div className="flex items-center gap-0.5">
              <Icon name="Star" size={9} className="text-yellow-400 fill-yellow-400" />
              <span className="text-[9px] font-oswald font-bold text-white">{manga.rating}</span>
            </div>
            <div className="flex items-center gap-0.5 text-white/70">
              <Icon name="Eye" size={9} />
              <span className="text-[9px] font-golos">{(manga.views / 1000).toFixed(0)}K</span>
            </div>
          </div>

          {/* Chapters count */}
          {!isSmall && (
            <div className="flex items-center gap-0.5 text-white/70">
              <Icon name="FileText" size={9} />
              <span className="text-[9px] font-golos">{manga.chapters.length} гл.</span>
            </div>
          )}
        </div>

        {/* Bookmark indicator */}
        {isBookmarked && (
          <div className="absolute top-5 right-0 bg-primary px-1 py-0.5">
            <Icon name="Bookmark" size={10} className="text-white fill-white" />
          </div>
        )}

        {/* Progress badge */}
        {lastChapter && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary">
            <div
              className="h-full bg-primary"
              style={{ width: `${Math.min((lastChapter / manga.chapters.length) * 100, 100)}%` }}
            />
          </div>
        )}
      </div>

      {/* Title */}
      <div className="mt-1.5">
        <h3 className={`font-oswald font-semibold leading-tight line-clamp-2 text-foreground group-hover:text-primary transition-colors ${
          isSmall ? 'text-[11px]' : isLarge ? 'text-sm' : 'text-xs'
        }`}>
          {manga.titleRu}
        </h3>
        {!isSmall && (
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className={`text-[10px] font-golos ${STATUS_MAP[manga.status].color}`}>
              {STATUS_MAP[manga.status].label}
            </span>
          </div>
        )}
        {isLarge && (
          <div className="flex flex-wrap gap-1 mt-1">
            {manga.genres.slice(0, 2).map(g => (
              <span key={g} className="text-[9px] bg-secondary text-muted-foreground px-1.5 py-0.5 rounded">
                {g}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
