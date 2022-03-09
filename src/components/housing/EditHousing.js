import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import HousingDataService from '../../services/housing.service';

const Housing = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

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

  const [currentHousing, setCurrentHousing] = useState(initialHousingState);
  const [message, setMessage] = useState('');

  const getHousing = (id) => {
    HousingDataService.get(id)
      .then((res) => {
        setCurrentHousing(res.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getHousing(params.id);
  }, [params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentHousing({ ...currentHousing, [name]: value });
  };

  const updateSold = (status) => {
    var data = {
      id: currentHousing.id,
      title: currentHousing.title,
      price: currentHousing.price,
      numBedroom: currentHousing.numBedroom,
      numBathroom: currentHousing.numBathroom,
      squarefoot: currentHousing.squarefoot,
      address: currentHousing.address,
      images: currentHousing.images,
      sold: status,
    };

    HousingDataService.update(currentHousing.id, data)
      .then((res) => {
        setCurrentHousing({ ...currentHousing, sold: status });
      })
      .catch((err) => console.error(err));
  };

  const updateHousing = () => {
    HousingDataService.update(currentHousing.id, currentHousing)
      .then((res) => {
        setMessage('The Housing was updated successfully!');
      })
      .catch((err) => console.error(err));
  };

  const deleteHousing = () => {
    const from = location.state?.from?.pathname || '/';
    HousingDataService.remove(currentHousing.id)
      .then((res) => {
        navigate(from, { replace: true });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      {currentHousing ? (
        <div className='edit-form'>
          <h4>Housing Editor</h4>
          <form>
            <div className='form-group'>
              <label htmlFor='title'>Title</label>
              <input
                type='text'
                className='form-control'
                id='title'
                name='title'
                value={currentHousing.title}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='price'>Price</label>
              <input
                type='number'
                className='form-control'
                id='price'
                name='price'
                value={currentHousing.price}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='bedroom'>Bedroom</label>
              <input
                type='number'
                className='form-control'
                id='bedroom'
                name='numBedroom'
                value={currentHousing.numBedroom}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='bathroom'>Bathroom</label>
              <input
                type='number'
                className='form-control'
                id='bathroom'
                name='numBathroom'
                value={currentHousing.numBathroom}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='squarefoot'>Square Foot</label>
              <input
                type='number'
                className='form-control'
                id='squarefoot'
                name='squarefoot'
                value={currentHousing.squarefoot}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='address'>Address</label>
              <input
                type='text'
                className='form-control'
                id='address'
                name='address'
                value={currentHousing.address}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label>
                <strong>Sold?:</strong>
              </label>
              {currentHousing.sold ? 'Yes' : 'No'}
            </div>
          </form>
          {currentHousing.sold ? (
            <button className='badge bg-primary mr-2' onClick={() => updateSold(false)}>
              Not Sold
            </button>
          ) : (
            <button className='badge bg-primary mr-2' onClick={() => updateSold(true)}>
              Sold
            </button>
          )}
          <button className='badge bg-danger mr-2' onClick={deleteHousing}>
            Delete
          </button>
          <button type='submit' className='badge bg-success' onClick={updateHousing}>
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Housing...</p>
        </div>
      )}
    </div>
  );
};
export default Housing;
