import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../component/loading/Loading";
import Pagination from "../../component/pagination/Pagination";
import LinkNav from "../../component/link-nav/LinkNav";
import FavoriteItem from "../../component/favorite-item/FavoriteItem";

export default function Favorite() {
  const [favorite, setFavorite] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getThemes = async () => {
      setLoading(true);
      const url = `${process.env.REACT_APP_URL}/favorite?username=nice`;
      const response = await axios.get(url);
      if (response.status === 200) {
        const data = response.data;
        setFavorite(data);
      }

      setLoading(false);
    };
    getThemes();
    return () => {};
  }, []);

  return (
    <div className="h-full flex flex-col relative">
      {/* <h1 className="mt-2 text-[20px] font-semibold">Dashboard</h1> */}
      <div className="w-full flex flex-col flex-1 bg-white rounded-xl p-4 pt-0 overflow-y-auto">
        <div className="flex justify-between bg-white items-center sticky w-full left-0 top-0 py-4 z-20 border-b border-black">
          <div className="flex">
            <LinkNav linksArr={["Favorite"]}></LinkNav>
          </div>
          <div className="flex"></div>
        </div>
        {!loading ? (
          <div className="flex flex-1 flex-col">
            <div className="lg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid gap-4 mt-4 relative z-10">
              {favorite.map((el, key) => (
                <FavoriteItem key={key} favorite={el}></FavoriteItem>
              ))}
            </div>
            <div className="flex justify-center mt-auto pt-4">
              <Pagination></Pagination>
            </div>
          </div>
        ) : (
          <Loading></Loading>
        )}
      </div>
    </div>
  );
}
