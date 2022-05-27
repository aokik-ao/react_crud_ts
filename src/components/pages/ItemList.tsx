import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Axios from "axios";

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

export const ItemList = () => {
  const [items, setItems] = useState<Array<Item>>([]);

  // 商品データを取得する
  useEffect(() => {
    Axios.get("http://localhost:8080/react_crud_ts/item_list").then((res) => {
      setItems(res.data);
    });
  }, []);

  const history = useHistory();

  const onClickNewItem = () => {
    history.push("/react_crud_ts/ItemList/New");
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
            <Sprimarybutton
              // 詳細画面へ遷移させる
              onClick={() => {
                console.log(item.id);
                history.push(`ItemList/detail/?id=${item.id}`);
              }}
            >
              詳細画面へ
            </Sprimarybutton>
          </Srow>
        ))}
        <Ssecondarybutton onClick={onClickNewItem}>
          新規登録をする
        </Ssecondarybutton>
      </SContainer>
    </>
  );
};
