export default function Shop() {
  const flowers = [
    {
      id: 1,
      name: "Rose Bouquet",
      price: "$25",
      img: "https://tse1.mm.bing.net/th/id/OIP.IFX39vmfRY2af9NRA3U4SgHaIJ?pid=ImgDet&w=179&h=197&c=7&dpr=2&o=7&rm=3",
    },
    {
      id: 2,
      name: "Tulip Basket",
      price: "$30",
      img: "https://i.pinimg.com/originals/4f/7c/31/4f7c319aba934c0878d8663236b2fa82.jpg",
    },
    {
      id: 3,
      name: "Sunflower Joy",
      price: "$20",
      img: "https://tse3.mm.bing.net/th/id/OIP.JaQMv0IZGKnd61FqpXqOawHaHa?pid=ImgDet&w=179&h=179&c=7&dpr=2&o=7&rm=3",
    },
  ];

  return (
    <section className="section container">
      <h2>Our Flower Collection</h2>
      <div className="shop-grid">
        {flowers.map((flower) => (
          <div key={flower.id} className="shop-card">
            <img src={flower.img} alt={flower.name} />
            <h3>{flower.name}</h3>
            <p className="price">{flower.price}</p>
            <button className="btn btn-primary">Add to Cart</button>
          </div>
        ))}
      </div>
    </section>
  );
}
