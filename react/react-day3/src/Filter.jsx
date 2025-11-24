export default function Filter({ filterType, setFilterType }) {
  return (
    <div className="filter-section">
      <label htmlFor="typeSelect">Filter by Type:</label>
      <select
        id="typeSelect"
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
      >
        <option value="all">All</option>
        <option value="movie">Movies</option>
        <option value="tvshow">TV Shows</option>
      </select>
    </div>
  );
}
