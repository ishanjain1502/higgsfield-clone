import type { HfAspect } from "@/lib/higgsfield-home-constants";
import { cn } from "@/lib/utils";

/**
 * CSS-columns masonry. Items are expected in column-major order (the constants are
 * generated that way), so the browser's column fill reproduces the reference layout.
 */
export function Masonry<T extends { image: string; aspect: HfAspect }>({
  items,
  columns,
  renderItem,
}: {
  items: readonly T[];
  columns: 4 | 5;
  renderItem: (item: T) => React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "columns-2 gap-3 sm:columns-3",
        columns === 4 ? "lg:columns-4" : "lg:columns-5",
      )}
    >
      {items.map((item) => (
        <div key={item.image} className="mb-3 break-inside-avoid">
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
}
