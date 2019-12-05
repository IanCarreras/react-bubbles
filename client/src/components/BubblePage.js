import React, { useState, useEffect } from "react";
import api from '../utils/api'

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [error, setError] = useState()
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    api()
      .get('/colors')
      .then(res => {
        setColorList(res.data)
      })
      .catch(err => {
        setError(err.response.data.message)
      })
  }, [])

  return (
    <>
      {error && <div className='error'>{error}</div>}
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;