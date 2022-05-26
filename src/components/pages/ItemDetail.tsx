import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

type Item = {
  id: number;
  category_id: number;
  category_name: string;
  name: string;
  price: number;
  point_ratio: number;
  reserve_only_flag: boolean;
  regist_date: string;
  update_date: string;
};

type Category = {
  id: number;
  name: string;
};

export const ItemDetail = () => {
  const [item, setItem] = useState<Item>();
  const [itemId, setItemId] = useState<number>();
  const [category, setCategory] = useState<Array<Category>>();

  useEffect(() => {
    // カテゴリーを取得する
    Axios.get("http://localhost:8080/react_crud_ts/item_categories").then(
      (res) => {
        console.log(res.data);
        setCategory(res.data);
      }
    );

    // 商品データを取得する
    // Axios.get(`http://localhost:8080/react_crud_ts/item_detail/${itemId}`).then(
    //   (res) => {
    //     setItem(res.data);
    //   }
    // );
  }, []);

  //   CSSを定義

  return (
    <>
    <p>詳細画面</p>
    </>
  );
};
