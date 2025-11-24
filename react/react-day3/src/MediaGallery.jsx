import { useState, useEffect } from "react";
import "./MediaGallery.css";
import Filter from "./Filter";
import CardsSection from "./CardsSection";

export default function MediaGallery() {
  const [mediaList, setMediaList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    fetch("/data/entertainment.json")
      .then((res) => res.json())
      .then((data) => {
        setMediaList(data);
        setFilteredList(data);
      })
      .catch((err) => console.error("Error loading JSON:", err));
  }, []);

  useEffect(() => {
    if (filterType === "all") {
      setFilteredList(mediaList);
    } else {
      setFilteredList(mediaList.filter((item) => item.type === filterType));
    }
  }, [filterType, mediaList]);

  return (
    <div className="media-container">
      <h2>Media Library</h2>

      <Filter filterType={filterType} setFilterType={setFilterType} />

      <CardsSection filteredList={filteredList} />
    </div>
  );
}
