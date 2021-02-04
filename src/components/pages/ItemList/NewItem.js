import React, {useState } from "react";


const NewItem = ({token}) => {
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState('');
  const [itemType, setItemType] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  
  function CreateNewItem() {
    const data = JSON.stringify({
      item: item,
      itemType: itemType,
      description: description,
      date: date,
      amount: amount,
      location: location,
      price: price,
      image: image,
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }, 
      body: data,
    }

    setLoading(true);

    fetch(`${process.env.REACT_APP_BACKEND_URL}/inventory`, requestOptions)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          const err = new Error();
          err.status = response.status;
          throw err;
        }
        return response.json();
      })
      .then((response) => {
        console.log(response);
        //item successfyully created
      })
      .catch((err) => {
        console.log(err);
        console.log(err.status);
        alert('Something went wrong, try again later');
      })
      .finally(() => setLoading(false))
  }

  return (
    <div>
      <div className="signUp">
        <form>
          <label>Item name:
          <input value={item} onChange={(e) => {setItem(e.target.value)}}/>
          </label>
          <label>type:
          <input value={itemType} onChange={(e) => {setItemType(e.target.value)}}/>
          </label>
          <label>description:
          <input value={description} onChange={(e) => {setDescription(e.target.value)}}/>
          </label>
          <label>date:
          <input value={date} onChange={(e) => {setDate(e.target.value)}}/>
          </label>
          <label>amount:
          <input value={amount} onChange={(e) => {setAmount(e.target.value)}}/>
          </label>
          <label>location:
          <input value={location} onChange={(e) => {setLocation(e.target.value)}}/>
          </label>
          <label>price:
          <input value={price} onChange={(e) => {setPrice(e.target.value)}}/>
          </label>
          <label>image:
          <input value={image} onChange={(e) => {setImage(e.target.value)}}/>
          </label>
          <button disabled={loading} type="button" onClick={CreateNewItem}>make new</button>
        </form>
      </div>
    </div>
  );
}

export default NewItem;
