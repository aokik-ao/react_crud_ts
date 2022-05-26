import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import styled from "styled-components";

type ItemType = {
  id?: string;
  category_id?: string;
  category_name?: string;
  name?: string;
  price?: string;
  point_ratio?: string;
  reserve_only_flag?: string;
  regist_date?: string;
  update_date?: string;
};

type CategoryType = {
  id: string;
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
  const [id, setId] = useState<number>();
  const [categories, setCategories] = useState(fetchCategories);

  const { search } = useLocation();
  const history = useHistory();

  useEffect(() => {
    // URLに含まれているidを取得する
    const query = new URLSearchParams(search);
    const targetId = Number(query.get("id"));
    setId(targetId);

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
      console.log(res.data);
      setItem(res.data);
    });
  }, []);

  // CSSを定義
  const Scontainer = styled.div`
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

  const onClickUpdate = () => {
    window.confirm("更新をしますか？");
    // 更新を送信する
    // 各値をstateに持たせておいて、objectを作成し、postする流れになる想定
    // useStateは各入力項目ごとに作成する必要あり。
    // https://www.sukerou.com/2019/05/axios.html
  };

  const onClickDelete = () => {
    window.confirm("削除をします。よろしいですか？");
    // 削除を送信する
    Axios.delete(`http://localhost:8080/react_crud_ts/item_detail`, {
      data: { id: id },
    })
      .then((res) => {
        alert("削除に成功しました。");
        history.push("/react_crud_ts/ItemList");
      })
      .catch((res) => {
        alert("削除に失敗しました。");
        history.push("/react_crud_ts/ItemList");
      });
  };

  return (
    <>
      {" "}
      <Scontainer>
        <Sh>明細画面</Sh>
        <Sinputs>
          <Sbox>
            <Slabel>商品カテゴリー</Slabel>
            <select name="category" defaultValue={item.category_id}>
              {categories.map((category) => (
                <option value={category.id}>{category.name}</option>
              ))}
            </select>
          </Sbox>
          <Sbox>
            <Slabel>商品名</Slabel>
            <input type="text" name="name" defaultValue={item.name} />
          </Sbox>
          <Sbox>
            <Slabel>金額</Slabel>
            <input type="text" name="price" defaultValue={item.price} />円
          </Sbox>
          <Sbox>
            <Slabel>ポイント還元率</Slabel>
            <div>
              <input
                type="radio"
                defaultChecked={item.point_ratio === "10" ? true : false}
                name="point_ratio"
                value="5"
              />
              <label style={{ marginRight: "16px" }}>5%</label>
              <input
                type="radio"
                name="point_ratio"
                defaultChecked={item.point_ratio === "5" ? true : false}
                value="10"
              />
              <label>10%</label>
            </div>
          </Sbox>
          <Sbox>
            <Slabel>予約専用商品</Slabel>
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
          <Sprimarybutton onClick={onClickUpdate}>更新する</Sprimarybutton>
          <Ssecondarybutton onClick={onClickDelete}>削除する</Ssecondarybutton>
        </SbuttonBox>
      </Scontainer>
    </>
  );
};
