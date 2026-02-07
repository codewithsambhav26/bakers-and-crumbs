import React from 'react';

const Categories = () => {
    const categoryItems = [
        {id: 1, title: "Cakes", des: "(24 items)", image: "/images/home/category/cake.png"},
        {id: 2, title: "Donuts", des: "(15 items)", image: "/images/home/category/donut.png"},
        {id: 3, title: "Cookies & Brownies", des: "(10 items)", image: "/images/home/category/brownie.png"},
        {id: 4, title: "Beverages", des: "(20 items)", image: "/images/home/category/beverage.png"},
    ];

    return (
        <div className='section-container py-16'>
            <div className='text-center'>
                <p className='subtitle'>Customer Favorites</p>
                <h2 className='title'>Popular Categories</h2>
            </div>
            {/* Categories */}
            <div className='flex flex-col sm:flex-row flex-wrap gap-8 justify-around items-center mt-12'>
                {categoryItems.map((item, i) => (
                    <div key={i} className='shadow-lg rounded-md bg-white py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 duration-300 transition-all'>
                        <div className='flex w-full mx-auto items-center justify-center'>
                            <img src={item.image} alt="" className='bg-[#e2a8b6] p-5 rounded-full w-28 h-28' />
                        </div>
                        <div>
                            <h5>{item.title}</h5>
                            <p>{item.des}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
