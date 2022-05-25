import Axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

type Items = {
  category_id: number;
  category_name: string;
  id: number;
  name: string;
  point_ratio: number;
  price: number;
  regist_date: string;
  reserve_only_flag: boolean;
  update_date: string;
};

export const ItemList = () => {
  const [items, setItems] = useState<Array<Items>>([]);

  // 商品データを取得する
  useEffect(() => {
    Axios.get("http://localhost:8080/react_crud/item_list").then((res) => {
      setItems(res.data);
    });
  }, []);

//   詳細画面へ遷移させる
// usehistoryを使うよ
  const onClickShowDetail = (id: number) => {
    alert(id);
  };

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

  const Sbutton = styled.button`
    padding: 4px 8px;
  `;

  return (
    <>
      <Sh>商品一覧</Sh>
      <SContainer>
        {items.map((item) => (
          <Srow>
            <Slabel>カテゴリー名</Slabel>
            <Sval>{item.category_name}</Sval>
            <Slabel>商品名</Slabel>
            <Sval>{item.name}</Sval>
            <Slabel>金額</Slabel>
            <Sval>{item.price}円</Sval>
            <Sbutton onClick={() => onClickShowDetail(item.id)}>
              詳細画面へ
            </Sbutton>
          </Srow>
        ))}
      </SContainer>
    </>
  );
};
