import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import HousingDataService from '../../services/housing.service';

const AddHousing = () => {
  const currentUser = AuthService.getCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/login';

  useEffect(() => {
    if (!currentUser) {
      navigate(from, { replace: true });
    }
  }, [currentUser]);

  const initialHousingState = {
    id: null,
    title: '',
    price: 0,
    numBedroom: 0,
    numBathroom: 0,
    squarefoot: 0,
    address: '',
    images: '',
    sold: false,
  };

  const [house, setHouse] = useState(initialHousingState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setHouse({ ...house, [name]: value });
  };

  const saveHouse = () => {
    var data = {
      title: house.title,
      price: house.price,
      numBedroom: house.numBedroom,
      numBathroom: house.numBathroom,
      squarefoot: house.squarefoot,
      address: house.address,
      images: house.images,
      sold: house.sold,
    };

    HousingDataService.create(data)
      .then((res) => {
        setHouse({
          id: res.data.id,
          title: res.data.title,
          price: res.data.price,
          numBedroom: res.data.numBedroom,
          numBathroom: res.data.numBathroom,
          squarefoot: res.data.squarefoot,
          address: res.data.address,
          images: res.data.images,
          sold: res.data.sold,
        });

        setSubmitted(true);
      })
      .catch((err) => console.error(err));
  };

  const newHousing = () => {
    setHouse(initialHousingState);
    setSubmitted(false);
  };

  return (
    <div className='submit-form'>
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className='btn btn-success' onClick={newHousing}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className='form-group'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              className='form-control'
              id='title'
              required
              value={house.title}
              onChange={handleInputChange}
              name='title'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='price'>Price</label>
            <input
              type='number'
              className='form-control'
              id='price'
              required
              value={house.price}
              onChange={handleInputChange}
              name='price'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='bedroom'>Bedroom</label>
            <input
              type='number'
              className='form-control'
              id='bedroom'
              required
              value={house.numBedroom}
              onChange={handleInputChange}
              name='numBedroom'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='bathroom'>Bathroom</label>
            <input
              type='number'
              className='form-control'
              id='bathroom'
              required
              value={house.numBathroom}
              onChange={handleInputChange}
              name='numBathroom'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='squarefoot'>Square Foot</label>
            <input
              type='number'
              className='form-control'
              id='squarefoot'
              required
              value={house.squarefoot}
              onChange={handleInputChange}
              name='squarefoot'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='address'>Address</label>
            <input
              type='text'
              className='form-control'
              id='address'
              required
              value={house.address}
              onChange={handleInputChange}
              name='address'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='sold'>Sold?</label>
            <input
              type='text'
              className='form-control'
              id='sold'
              required
              value={house.sold}
              onChange={handleInputChange}
              name='sold'
            />
          </div>
          <button onClick={saveHouse} className='btn btn-success'>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};
export default AddHousing;
