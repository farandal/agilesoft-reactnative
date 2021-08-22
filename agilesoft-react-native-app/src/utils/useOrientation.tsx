import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

const useOrientation = () => {
  const [orientation, setOrientation] = useState("PORTRAIT");

  useEffect(() => {
    Dimensions.addEventListener('change', ({window:{width,height}})=>{
      if (width<height) {
        setOrientation("PORTRAIT")
      } else {
        setOrientation("LANDSCAPE")

      }
    })

  }, []);

  return orientation;
}

export default useOrientation;
