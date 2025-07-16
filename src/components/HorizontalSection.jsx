const HorizontalSection = ({ title, items = [], renderItem, children }) => (
  <section>
    <div className="flex items-center justify-between mb-2">
      <h2 className="text-xl font-semibold">{title}</h2>
      {children}
    </div>
    <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
      {items.map((item) => (
        <div key={item.id} className="snap-start shrink-0">
          {renderItem(item)}
        </div>
      ))}
    </div>
  </section>
);

export default HorizontalSection;
