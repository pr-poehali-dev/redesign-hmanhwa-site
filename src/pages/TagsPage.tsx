import MangaCard from '@/components/MangaCard';
import Icon from '@/components/ui/icon';
import { MOCK_MANGA, ALL_TAGS, ALL_GENRES } from '@/data/manga';

interface TagsPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  params?: Record<string, string>;
}

export default function TagsPage({ onNavigate, params }: TagsPageProps) {
  const activeTag = params?.tag || '';

  const taggedManga = activeTag
    ? MOCK_MANGA.filter(m => m.tags.includes(activeTag) || m.genres.includes(activeTag))
    : [];

  const allTags = [...ALL_GENRES, ...ALL_TAGS];
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = MOCK_MANGA.filter(m => m.tags.includes(tag) || m.genres.includes(tag)).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-6 bg-primary rounded-full" />
        <h1 className="font-oswald text-3xl font-bold uppercase tracking-wide">
          {activeTag ? `#${activeTag}` : 'Теги'}
        </h1>
        {activeTag && (
          <button
            onClick={() => onNavigate('tags')}
            className="ml-2 flex items-center gap-1 text-muted-foreground hover:text-foreground text-sm font-golos transition-colors"
          >
            <Icon name="X" size={14} />
            Сбросить
          </button>
        )}
      </div>

      {activeTag ? (
        <>
          <p className="font-golos text-muted-foreground mb-6">
            {taggedManga.length} тайтлов с тегом <span className="text-primary font-medium">#{activeTag}</span>
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {taggedManga.map((manga, i) => (
              <div key={manga.id} className={`animate-fade-in stagger-${Math.min(i + 1, 6)}`}>
                <MangaCard manga={manga} onNavigate={onNavigate} size="sm" />
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Genres */}
          <section className="mb-10">
            <h2 className="font-oswald text-lg font-bold uppercase tracking-wide mb-4 text-muted-foreground">Жанры</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {ALL_GENRES.map((genre, i) => (
                <button
                  key={genre}
                  onClick={() => onNavigate('tags', { tag: genre })}
                  className={`group p-3 bg-card border border-border rounded-lg hover:border-primary/50 hover:bg-secondary transition-all text-left animate-fade-in stagger-${Math.min(i + 1, 6)}`}
                >
                  <div className="font-oswald font-semibold text-sm group-hover:text-primary transition-colors">{genre}</div>
                  <div className="font-golos text-xs text-muted-foreground mt-1">{tagCounts[genre] || 0} тайтлов</div>
                </button>
              ))}
            </div>
          </section>

          {/* Tags */}
          <section>
            <h2 className="font-oswald text-lg font-bold uppercase tracking-wide mb-4 text-muted-foreground">Теги</h2>
            <div className="flex flex-wrap gap-2">
              {ALL_TAGS.map(tag => (
                <button
                  key={tag}
                  onClick={() => onNavigate('tags', { tag })}
                  className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-full hover:border-primary/50 hover:text-primary transition-all font-golos text-sm"
                >
                  <span className="text-primary text-xs">#</span>
                  {tag}
                  <span className="text-muted-foreground text-xs">({tagCounts[tag] || 0})</span>
                </button>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
