import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { searchProducts } from '../redux/reducers/productsSlice';

function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
        navigate('/products');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch();
    };

    const onSearch = () => {
        
        dispatch(searchProducts(searchQuery));
    };

    return (
        <form onSubmit={handleSubmit}>
            <InputGroup>
                <FormControl
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleInputChange}
                />
                <Button variant="outline-warning" type="submit">
                    Search
                </Button>
            </InputGroup>
        </form>
    );
}

export default SearchBar;
