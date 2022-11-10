import { useState, useEffect } from "react";

const useOffSetTop = (top: number) => {
  const [offsetTop, setOffSetTop] = useState(false);
  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > top) {
        setOffSetTop(true);
      } else {
        setOffSetTop(false);
      }
    };
    return () => {
      window.onscroll = null;
    };
  }, [top]);

  return offsetTop;
};

export default useOffSetTop;
