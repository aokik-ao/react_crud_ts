import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";

type ItemType = {
  id?: number;
  category_id?: number;
  category_name?: string;
  name?: string;
  price?: number;
  point_ratio?: number;
  reserve_only_flag?: string;
  regist_date?: string;
  update_date?: string;
};

type CategoryType = {
  id: number;
  name: string;
};

let fetchCategories: Array<CategoryType> = [];

let fetchItem: ItemType = {
  id: undefined,
  category_id: undefined,
  category_name: undefined,
  name: undefined,
  price: undefined,
  point_ratio: undefined,
  reserve_only_flag: undefined,
  regist_date: undefined,
  update_date: undefined,
};

export const ItemDetail = () => {
  const [item, setItem] = useState(fetchItem);
  const [categories, setCategories] = useState(fetchCategories);

  const { search } = useLocation();

  useEffect(() => {
    // URLに含まれているidを取得する
    const query = new URLSearchParams(search);
    const targetId = Number(query.get("id"));

    // カテゴリーを取得する
    Axios.get("http://localhost:8080/react_crud_ts/item_categories").then(
      (res) => {
        setCategories(res.data);
      }
    );

    // アイテムを取得する
    Axios.get(
      `http://localhost:8080/react_crud_ts/item_detail/${targetId}`
    ).then((res) => {
      setItem(res.data);
    });
  }, []);

  // CSSを定義
  const Scontainer = styled.div`
    /* display: flex;
    flex-direction: column; */
    margin-left: 16px;
  `;

  const Sh = styled.h1`
    margin-left: 0;
  `;

  const Sinputs = styled.div`
    flex-direction: column;
    display: flex;
  `;

  const Sbox = styled.div`
    margin-bottom: 16px;
  `;

  const Slabel = styled.div`
    width: 160px;
    margin-right: 8px;
  `;

  const SbuttonBox = styled.div`
    display: flex;
  `;

  const Sprimarybutton = styled.button`
    padding: 4px 8px;
    border-radius: 10px;
    background-color: lightblue;
    margin-right: 16px;
  `;

  const Ssecondarybutton = styled.button`
    padding: 4px 8px;
    border-radius: 10px;
    background-color: lightcoral;
  `;

  return (
    <Scontainer className="item-detail">
      {/* TODO アクション先も確定させる */}
      <form action="">
        <Sh>明細画面</Sh>
        <Sinputs className="detail-values">
          <Sbox className="input-box">
            <Slabel className="label">商品カテゴリー</Slabel>
            <select name="category">
              {categories.map((category) => (
                <option value={category.id}>{category.name}</option>
              ))}
            </select>
          </Sbox>
          <Sbox className="input-box">
            <Slabel className="label">商品名</Slabel>
            <input type="text" name="name" defaultValue={item.name} />
          </Sbox>
          <Sbox className="input-box">
            <Slabel className="label">金額</Slabel>
            <input type="text" name="price" defaultValue={item.price} />円
          </Sbox>
          <Sbox className="input-box">
            <Slabel className="label">ポイント還元率</Slabel>
            <div className="radio-box">
              {/* TODO checkedを動的にする */}
              <input
                type="radio"
                defaultChecked={item.point_ratio === 10 ? true : false}
                name="point_ratio"
                value="5"
              />
              {/* style直書きの時は波かっこは2つつけないといけない */}
              <label style={{ marginRight: "16px" }}>5%</label>
              <input
                type="radio"
                name="point_ratio"
                defaultChecked={item.point_ratio === 5 ? true : false}
                value="10"
              />
              <label>10%</label>
            </div>
          </Sbox>
          <Sbox className="input-box">
            <Slabel className="label">予約専用商品</Slabel>
            {/* TODO checkedを動的にする */}
            <input
              type="checkbox"
              defaultChecked={item.reserve_only_flag === "t" ? true : false}
              name="reserve_only_flag"
              value=""
            />
          </Sbox>
        </Sinputs>
        <input type="hidden" name="id" id="update-id" value={item.id} />
        <input
          type="hidden"
          name="update_date"
          id="update-date"
          value={item.update_date}
        />
        <SbuttonBox>
          <Sprimarybutton>更新する</Sprimarybutton>
          <Ssecondarybutton>削除する</Ssecondarybutton>
        </SbuttonBox>
      </form>
    </Scontainer>
  );
};
