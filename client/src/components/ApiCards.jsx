import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import axios from 'axios';

const ApiCards = () => {

    const [data, setData] = useState(null);
    const [dataApi, setDataApi] = useState(null);
	const [filteredData, setFilteredData] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState('All');
	const [visibleItems, setVisibleItems] = useState(18); 
	const [loading, setLoading] = useState(true);
	const [loadMore, setLoadMore] = useState(false);

	const itemsPerPage = 18;

	
	useEffect(() => {
		const fetchData = async () => {
			try {
				
				const responseApi = await axios.get("/api/apiData");
				setDataApi(responseApi)
				const response = await fetch('https://api.publicapis.org/entries');
				const jsonData = await response.json();
				setData(jsonData.entries);
				setFilteredData(jsonData.entries);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching data:', error);
				setLoading(false);
			}
		};
		fetchData();
	}, [visibleItems]);

	const categories = ['All', ...new Set(data?.map(item => item?.Category))];

	useEffect(() => {
		if (selectedCategory === 'All') {
		  setFilteredData(data?.slice(0, visibleItems));
		  setLoadMore(true)
		} else {
			setFilteredData(data?.filter(item => item?.Category === selectedCategory)?.slice(0, visibleItems));
			setLoadMore(false)
		}
	}, [data, selectedCategory, visibleItems]);

	const handleCategoryChange = (event) => {
		setSelectedCategory(event.target.value);
	};

	const loadMoreItems = () => {
		setVisibleItems(prevVisibleItems => prevVisibleItems + itemsPerPage);
	};
	

  return (
    <div>
		<div className="flex  justify-center my-4 gap-2">
			<div className="flex items-center">Filter Api Categories: </div>
			<select className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800" value={selectedCategory} onChange={handleCategoryChange}>
				{categories?.map((category, index) => (
					<option key={index} value={category}>{category}</option>
				))}
			</select>
		</div>

		{loading && (
			<div className="flex flex-col top-1/2 items-center justify-center">
				Loading...
				<FaSpinner className="animate-spin text-blue-500" size={32} />
			</div>
      	)}

      	<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{filteredData?.map((item, index) => (
				<Link key={index} to={item?.Link} className="block" target="_blank" rel="noopener noreferrer">
					<div className="bg-white shadow-md rounded-lg p-6 h-full">
						<h2 className="text-xl font-semibold mb-2">{item?.API}</h2>
						<p className="text-sm text-gray-700 mb-2">Category: {item?.Category}</p>
						<p className="text-gray-700">{item?.Description}</p>
					</div>
				</Link>
			
			))}
      	</div>

		{!loading && visibleItems < data?.length && loadMore && (
			<div className="flex justify-center my-4">
				<button className="px-4 py-2 rounded-lg bg-blue-500 text-white" onClick={loadMoreItems}>Load More...</button>
			</div>
      	)}

    </div>
  )
}

export default ApiCards