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
    Axios.get(`http://localhost:8080/react_crud_ts/item_detail/${itemId}`).then(
      (res) => {
        setItem(res.data);
      }
    );
  }, []);

  //   CSSを定義
  const Sh = styled.h1`
    margin-left: 16px;
  `;

  const SContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 16px;
  `;

  const Srow = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  `;

  const Slabel = styled.span`
    font-weight: bold;
  `;

  const Sval = styled.span`
    margin-left: 8px;
    margin-right: 24px;
  `;

  const Sprimarybutton = styled.button`
    padding: 4px 8px;
    border-radius: 10px;
    background-color: lightblue;
  `;

  const Ssecondarybutton = styled.button`
    padding: 4px 8px;
    border-radius: 10px;
    width: 150px;
    background-color: lightcoral;
  `;

  return (
    <>
    <p>詳細画面</p>
    </>
  );
};
