import { useState, useEffect } from 'react';
import HousingDataService from '../../services/housing.service';
import AuthService from '../../services/auth.service.js';
import { Link } from 'react-router-dom';

const HouseList = () => {
  const [housing, setHousing] = useState([]);
  const [currentHouse, setCurrentHouse] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState('');

  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    retrieveAllHousing();
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveAllHousing = () => {
    HousingDataService.getAll()
      .then((res) => {
        setHousing(res.data);
        refreshList();
      })
      .catch((err) => console.error(err));
  };

  const retrieveSoldHousing = () => {
    HousingDataService.getSold()
      .then((res) => {
        setHousing(res.data);
        refreshList();
      })
      .catch((err) => console.error(err));
  };

  const retrieveNotSoldHousing = () => {
    HousingDataService.getNotSold()
      .then((res) => {
        setHousing(res.data);
        refreshList();
      })
      .catch((err) => console.error(err));
  };

  const refreshList = () => {
    setCurrentHouse(null);
    setCurrentIndex(-1);
  };

  const setActiveHouse = (house, index) => {
    setCurrentHouse(house);
    setCurrentIndex(index);
  };

  const findByTitle = () => {
    HousingDataService.findByTitle(searchTitle)
      .then((res) => {
        setHousing(res.data);
      })
      .catch((err) => console.err(err));
  };

  return (
    <div className='list row'>
      <div className='col-md-8'>
        <div className='input-group mb-3'>
          <input
            type='text'
            className='form-control'
            placeholder='Search by title'
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className='input-group-append'>
            <button className='btn btn-outline-secondary' type='button' onClick={findByTitle}>
              Search
            </button>
          </div>
        </div>
      </div>
      <div className='col-md-6'>
        <h4>Housing List</h4>
        <ul className='list-group'>
          {housing &&
            housing.map((house, index) => (
              <li
                className={'list-group-item ' + (index === currentIndex ? 'active' : '')}
                onClick={() => setActiveHouse(house, index)}
                key={index}
              >
                {house.title}
              </li>
            ))}
        </ul>
        <div className='btn-group mt-3' role='group' aria-label='Basic example'>
          <button type='button' className='btn btn-primary' onClick={() => retrieveAllHousing()}>
            Full List
          </button>
          <button type='button' className='btn btn-primary' onClick={() => retrieveSoldHousing()}>
            Sold List
          </button>
          <button type='button' className='btn btn-primary' onClick={() => retrieveNotSoldHousing()}>
            Not Sold List
          </button>
        </div>
      </div>
      <div className='col-md-6'>
        {currentHouse ? (
          <div>
            <h4>Housing</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{' '}
              {currentHouse.title}
            </div>
            <div>
              <label>
                <strong>Price:</strong>
              </label>{' '}
              ${currentHouse.price}.00
            </div>
            <div>
              <label>
                <strong>Number of Bedroom:</strong>
              </label>{' '}
              {currentHouse.numBedroom}
            </div>
            <div>
              <label>
                <strong>Number of Bathroom:</strong>
              </label>{' '}
              {currentHouse.numBathroom}
            </div>
            <div>
              <label>
                <strong>Square Foot:</strong>
              </label>{' '}
              {currentHouse.squarefoot}
            </div>
            <div>
              <label>
                <strong>Address:</strong>
              </label>{' '}
              {currentHouse.address}
            </div>
            <div>
              <label>
                <strong>Sold?:</strong>
              </label>{' '}
              {currentHouse.sold ? 'Yes' : 'No'}
            </div>
            {currentUser && (
              <Link to={'/housing/' + currentHouse.id} className='badge bg-danger'>
                Edit
              </Link>
            )}
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Housing...</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default HouseList;
