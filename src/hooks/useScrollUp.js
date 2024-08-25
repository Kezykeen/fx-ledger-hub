import { useEffect, useState } from "react";

const useScrollUpCheck = (scrollThreshold = 30) => {
  const [scrolledUp, setScrolledUp] = useState(false);
  const [lastScrollPos, setLastScrollPos] = useState(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const scrolledDistance = lastScrollPos - currentScrollPos;

      // Trigger only if scrolled up more than the threshold
      if (scrolledDistance > scrollThreshold) {
        setScrolledUp(true);
      } else {
        setScrolledUp(false);
      }

      // Update the last scroll position
      setLastScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollPos, scrollThreshold]);
  console.log({ scrolledUp });

  return scrolledUp;
};

export default useScrollUpCheck;
