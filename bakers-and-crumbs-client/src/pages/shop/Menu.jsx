
import React, { useEffect, useState } from 'react';
import Cards from "../../components/Cards";
import { FaFilter } from 'react-icons/fa';

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL; // Using the environment variable

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/menu`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setMenu(data);
          setFilteredItems(data);
        } else {
          console.error('Fetched data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filterItems = (category) => {
    const filtered = category === "all" ? menu : menu.filter((item) => item.category === category);
    setFilteredItems(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    let sortedItems = [...filteredItems];

    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="section-container bg-gradient-to-r from-[#FAFAFA] to-[#FCFCFC] overflow-hidden">
        <div className="py-48 flex flex-col justify-center items-center gap-8">
          <div className="space-y-7 px-4 text-center">
            <h2 className="md:text-5xl text-4xl font-bold ms:leading-snug leading-snug text-black">
              Baked with <span className="text-pink"> Love</span>, Served with a <span className="text-pink">Smile</span>
            </h2>
            <p className="text-xl text-[#4A4A4A]">
              Where Every Loaf Tells a Tale of Artistry and Passionate Baking
            </p>
            <button className="bg-pink px-8 py-3 font-semibold text-white rounded-full">
              Order Now
            </button>
          </div>
        </div>
      </div>

      <div className="section-container">
        <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
          <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
            <button onClick={showAll} className={selectedCategory === "all" ? "active" : ""}>All</button>
            <button onClick={() => filterItems("cupcake")} className={selectedCategory === "cupcake" ? "active" : ""}>Cupcakes</button>
            <button onClick={() => filterItems("donut")} className={selectedCategory === "donut" ? "active" : ""}>Donuts</button>
            <button onClick={() => filterItems("beverage")} className={selectedCategory === "beverage" ? "active" : ""}>Beverages</button>
            <button onClick={() => filterItems("cake")} className={selectedCategory === "cake" ? "active" : ""}>Cakes</button>
            <button onClick={() => filterItems("brownie")} className={selectedCategory === "brownie" ? "active" : ""}>Brownies</button>
          </div>

          <div className="flex justify-end mb-4 rounded-sm">
            <div className="bg-pink p-2">
              <FaFilter className="h-4 w-4 text-white" />
            </div>

            <select name="sort" id="sort" onChange={(e) => handleSortChange(e.target.value)} value={sortOption} className="bg-white text-black px-2 py-1 rounded-sm">
              <option value="default">Default</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 p-4">
          {currentItems.map((item) => (
            <Cards key={item._id} item={item} />
          ))}
        </div>
      </div>

      <div className="flex justify-center my-8">
        {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${currentPage === index + 1 ? "bg-pink text-white" : "bg-gray-200"}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menu;
