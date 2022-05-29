import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import styled from "styled-components";
import { CategoriesInput } from "../atoms/CategoriesInput";
import { PointRatioInput } from "../atoms/PointRatioInput";
import { ReserveOnlyFlagInput } from "../atoms/ReserveOnlyFlagInput";
import { TextInput } from "../atoms/TextInput";

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

type propsType = {
  newFlag: boolean;
};

export const ItemDetail = (props: propsType) => {
  // 新規登録 or 更新のフラグ
  const { newFlag } = props;
  // 各値
  const [item, setItem] = useState(fetchItem);
  const [id, setId] = useState<number>();
  const [categories, setCategories] = useState(fetchCategories);
  // 入力項目系
  const [inputCategoryId, setInputCategoryId] = useState<string | undefined>();
  const [inputName, setinputName] = useState<string | undefined>();
  const [inputPrice, setInputPrice] = useState<string | undefined>();
  const [inputPointRatio, setInputPointRatio] = useState<string | undefined>();
  const [inputReserveOnlyFlag, setReserveOnlyFlag] = useState<
    boolean | undefined
  >();
  const [inputId, setInputId] = useState<string | undefined>();
  const [inputUpdateDate, setUpdateDate] = useState<string | undefined>();

  // 必要なhook
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

    // アイテムを取得する(更新時のみ)
    if (!newFlag) {
      Axios.get(
        `http://localhost:8080/react_crud_ts/item_detail/${targetId}`
      ).then((res) => {
        setItem(res.data);
        setInputCategoryId(res.data.category_id);
        setinputName(res.data.name);
        setInputPrice(res.data.price);
        setInputPointRatio(res.data.point_ratio);
        setReserveOnlyFlag(res.data.reserve_only_flag === "t" ? true : false);
        setInputId(res.data.id);
        setUpdateDate(res.data.update_date);
      });
    }
  }, []);

  // 各入力値を更新する
  const onChangeCategoryId = (e: any) => {
    const val = e.target.value;
    setInputCategoryId(val);
  };
  const onBlurName = (e: any) => {
    const val = e.target.value;
    setinputName(val);
  };
  const onBlurPrice = (e: any) => {
    const val = e.target.value;
    setInputPrice(val);
  };
  const onChangePointRatio = (e: any) => {
    const val = e.target.value;
    setInputPointRatio(val);
  };
  const onClickReserveOnlyFlag = (e: any) => {
    const val = e.target.checked;
    setReserveOnlyFlag(val);
  };

  const onClickUpdate = () => {
    if (window.confirm("更新をします。よろしいですか？")) {
      // 更新としてputメソッドを送信する
      const postData = {
        id: inputId,
        category_id: inputCategoryId ?? "",
        name: inputName,
        price: inputPrice,
        point_ratio: inputPointRatio,
        reserve_only_flag: inputReserveOnlyFlag,
        update_date: inputUpdateDate,
      };
      Axios.put("http://localhost:8080/react_crud_ts/item_detail", postData)
        .then((res) => {
          alert("更新に成功しました。");

          // 更新日時を取得しなおす
          Axios.get(
            `http://localhost:8080/react_crud_ts/item_detail/${id}`
          ).then((res) => {
            setUpdateDate(res.data.update_date);
          });
        })

        .catch((error) => {
          const resData = error.response.data;
          const messageList = resData.error_messages.split(",");
          let message = "更新に失敗しました。\n";
          message += messageList.join("\n");
          alert(message);
        });
    }
  };

  const onClickDelete = () => {
    if (window.confirm("削除をします。よろしいですか？")) {
      // 削除としてdeleteメソッドを送信する
      Axios.delete("http://localhost:8080/react_crud_ts/item_detail", {
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
    }
  };

  const onClickPost = () => {
    if (window.confirm("新規登録をします。よろしいですか？")) {
      // 新規登録としてpostメソッドを送信する
      const postData = {
        category_id: inputCategoryId ?? "",
        name: inputName ?? "",
        price: inputPrice ?? "",
        point_ratio: inputPointRatio ?? "",
        reserve_only_flag: inputReserveOnlyFlag ?? "",
      };
      Axios.post("http://localhost:8080/react_crud_ts/item_detail", postData)
        .then((res) => {
          alert("登録に成功しました。");
          history.push("/react_crud_ts/ItemList");
        })
        .catch((error) => {
          const resData = error.response.data;
          const messageList = resData.error_messages.split(",");
          let message = "登録に失敗しました。\n";
          message += messageList.join("\n");
          alert(message);
        });
    }
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
          <CategoriesInput
            label="商品カテゴリー"
            name="category"
            defaultValue={inputCategoryId}
            onChange={onChangeCategoryId}
            categories={categories}
          />

          <TextInput
            label="商品名"
            name="name"
            defaultValue={inputName}
            onBlur={onBlurName}
            unit=""
          />

          <TextInput
            label="金額"
            name="price"
            defaultValue={inputPrice}
            onBlur={onBlurPrice}
            unit="円"
          />

          <PointRatioInput
            label="ポイント還元率"
            name="point_ratio"
            defaultChecked={inputPointRatio}
            onChange={onChangePointRatio}
          />

          <ReserveOnlyFlagInput
            label="予約専用商品"
            name="reserve_only_flag"
            defaultChecked={inputReserveOnlyFlag}
            onClick={onClickReserveOnlyFlag}
          />
        </Sinputs>
        <input type="hidden" name="id" id="update-id" value={item.id} />
        <input
          type="hidden"
          name="update_date"
          id="update-date"
          value={item.update_date}
        />
        <SbuttonBox>
          {newFlag ? (
            <>
              <Sprimarybutton onClick={onClickPost}>登録する</Sprimarybutton>
            </>
          ) : (
            <>
              <Sprimarybutton onClick={onClickUpdate}>更新する</Sprimarybutton>
              <Ssecondarybutton onClick={onClickDelete}>
                削除する
              </Ssecondarybutton>
            </>
          )}
          <SpagebackButton onClick={onClickPageback}>戻る</SpagebackButton>
        </SbuttonBox>
      </Scontainer>
    </>
  );
};
