import React, { useEffect, useState } from 'react'
import productsData from '../../data/products.json'
import ProductsCard from './ProductsCard'
import ShopFiltering from './ShopFiltering'


const filters = {
    categories: ['all', 'accessories', 'dress', 'jewellery', 'cosmetics'],
    colors: ['all', 'black', 'red', 'gold', 'blue', 'silver', 'beige', 'green'],
    priceRange: [
        { label: 'under $50', min: 0, max: 50 },
        { label: '$50 - $100', min: 50, max: 100 },
        { label: '$100 - $200', min: 100, max: 200 },
        { label: '$200 and above', min: 200, max: Infinity },
    ]
}

const ShopPage = () => {

    const [products, setProducts] = useState(productsData)
    const [filterState, setFilterState] = useState({
        category: 'all',
        color: 'all',
        priceRange: ''
    })

    const applyFilters = () => {

        let filterProducts = productsData;

        // filter by category 
        if (filterState.category && filterState.category !== 'all') {
            filterProducts = filterProducts.filter(product => product.category === filterState.category)
        }

        //filter by color
        if (filterState.color && filterState.color !== 'all') {
            filterProducts = filterProducts.filter(product => product.color === filterState.color)
        }


        //filter by priceRange
        if (filterState.priceRange) {
            const [minPrice, maxPrice] = filterState.priceRange.split('-').map(Number);
            filterProducts = filterProducts.filter(product => product.price >= minPrice && product.price <= maxPrice)
        }

        setProducts(filterProducts)

    }

useEffect(()=>{
    applyFilters()
},[filterState])


//Clear the filters

const clearFilters =()=>{
    setFilterState({
        category: 'all',
        color: 'all',
        priceRange: ''
    })
}

    return (
        <>
            <section className='section__container bg-primary-light'>
                <h2 className='section__header capitalize'>Shopping Page</h2>
                <p className='section__subheader'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, porro sunt in blanditiis illum fuga.</p>
            </section>

            <section className='section__container'>
                <div className='flex flex-col md:flex-row md:gap-12 gap-8'>
                    {/* left side */}
                    <ShopFiltering filters={filters} filterState={filterState} setFilterState={setFilterState} clearFilters={clearFilters}/>


                    {/* right side */}
                    <div>
                        <h3 className='text-xl font-medium mb-4'>Products Available:{products.length}</h3>
                        <ProductsCard products={products} />
                    </div>
                </div>
            </section>
        </>
    )
}

export default ShopPage