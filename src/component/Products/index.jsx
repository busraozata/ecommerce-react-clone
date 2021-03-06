import React, { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton';
import { NavLink } from 'react-router-dom';
const axios = require('axios').default;

const Products = () => {
    const [data, setData] = useState([])
    const [filter, setFilter] = useState(data)
    const [loading, setLoading] = useState(false)
    let componentMounted = true;

    useEffect(() => {

        const getProducts = async () => {
            setLoading(true);
            /*  const response = await fetch("https://fakestoreapi.com/products"); */
            const response = await axios.get('https://fakestoreapi.com/products');
            /* if (componentMounted) {
                setData(await response.clone().json());
                setFilter(await response.json());
                setLoading(false);
                console.log(filter);
            }
            return () => {
                componentMounted = false;
            } */
            if (componentMounted) {
                setData(await response.data);
                setFilter(await response.data);
                setLoading(false);
                console.log(response.data);
            }
            return () => {
                componentMounted = false;
            }
        }

        getProducts();
    }, [])

    const Loading = () => {
        return (
            <>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
            </>
        )
    }

    const filterProduct = (cat) => {
        const updatedList = data.filter((x) => x.category === cat);
        setFilter(updatedList)
    }

    const ShowProdusts = () => {
        return (
            <>
                <div className="buttons mb-5">
                    <button className="btn btn-outline-dark me-2" onClick={() => setFilter(data)}>All</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("men's clothing")}>Men's Clothing</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("women's clothing")}>Women's Clothing</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("jewelery")}>Jewelery</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("electronics")}>Electronic</button>
                </div>
                {
                    filter.map((product) => {
                        const uniqueID = product.id;
                        return (
                            <div className="col-xl-3 col-md-6 mb-4" key={uniqueID}>
                                <div className="card h-100 text-center p-4 " >
                                    <img src={product.image} className="card-img-top" alt={product.title} height='250px' style={{ objectFit: 'contain' }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.title.substring(0, 12)}...</h5>
                                        <p className="card-text lead fw-bold">{product.price}</p>
                                        <NavLink to={`/product/${uniqueID}`} className="btn btn-outline-dark">Buy Now</NavLink>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </>
        )

    }

    return (
        <div>
            <div className="container my-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5">
                        <h1 className='display-6 fw-bolder text-center'>Latest Products</h1>
                    </div>
                </div>
                <div className="row justify-content-center">
                    {loading ? <Loading /> : <ShowProdusts />}
                </div>
            </div>
        </div>
    )
}

export default Products