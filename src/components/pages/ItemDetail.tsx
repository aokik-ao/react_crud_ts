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
  // 入力項目系
  const [inputCategoryId, setInputCategoryId] = useState<string | undefined>();
  const [inputName, setinputName] = useState<string | undefined>();
  const [inputPrice, setInputPrice] = useState<string | undefined>();
  const [inputPointRatio, setInputPointRatio] = useState<string | undefined>();
  const [inputReserveOnlyFlag, setReserveOnlyFlag] = useState<
    string | undefined
  >();
  const [inputId, setInputId] = useState<string | undefined>();
  const [inputUpdateDate, setUpdateDate] = useState<string | undefined>();

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
      setInputCategoryId(res.data.category_id);
      setinputName(res.data.name);
      setInputPrice(res.data.price);
      setInputPointRatio(res.data.point_radio);
      setReserveOnlyFlag(res.data.reserve_only_flag);
      setInputId(res.data.id);
      setUpdateDate(res.data.update_date);
    });
  }, []);

  // 各入力値を更新する
  const onChangeCategoryId = (e: any) => {
    const val = e.target.value;
    console.log(val);
    setInputCategoryId(val);
  };
  const onChangeName = (e: any) => {
    const val = e.target.value;
    console.log(val);
    setinputName(val);
  };
  const onChangePrice = (e: any) => {
    const val = e.target.value;
    console.log(val);
    setInputPrice(val);
  };
  const onChangePointRatio = (e: any) => {
    const val = e.target.value;
    console.log(val);
    setInputPointRatio(val);
  };
  const onChangeReserveOnlyFlag = (e: any) => {
    const val = e.target.value;
    console.log(val);
    setReserveOnlyFlag(val);
  };

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

  const onClickPageback = () => history.push("/react_crud_ts/ItemList");

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

  const Ssecondarybutton = styled(Sprimarybutton)`
    background-color: lightcoral;
  `;

  const SpagebackButton = styled(Sprimarybutton)`
    background-color: lightgreen;
  `;

  return (
    <>
      {" "}
      <Scontainer>
        <Sh>明細画面</Sh>
        <Sinputs>
          <Sbox>
            <Slabel>商品カテゴリー</Slabel>
            <select
              name="category"
              defaultValue={inputCategoryId}
              onChange={onChangeCategoryId}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </Sbox>
          <Sbox>
            <Slabel>商品名</Slabel>
            <input
              type="text"
              name="name"
              defaultValue={inputName}
              onChange={onChangeName}
            />
          </Sbox>
          <Sbox>
            <Slabel>金額</Slabel>
            <input
              type="text"
              name="price"
              defaultValue={inputPrice}
              onChange={onChangePrice}
            />
            円
          </Sbox>
          <Sbox>
            <Slabel>ポイント還元率</Slabel>
            <div>
              <input
                type="radio"
                defaultChecked={inputPointRatio === "10" ? true : false}
                name="point_ratio"
                value="5"
                onChange={onChangePointRatio}
              />
              <label style={{ marginRight: "16px" }}>5%</label>
              <input
                type="radio"
                name="point_ratio"
                defaultChecked={inputPointRatio === "5" ? true : false}
                value="10"
              />
              <label>10%</label>
            </div>
          </Sbox>
          <Sbox>
            <Slabel>予約専用商品</Slabel>
            <input
              type="checkbox"
              defaultChecked={inputReserveOnlyFlag === "t" ? true : false}
              name="reserve_only_flag"
              onChange={onChangeReserveOnlyFlag}
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
          <SpagebackButton onClick={onClickPageback}>戻る</SpagebackButton>
        </SbuttonBox>
      </Scontainer>
    </>
  );
};
