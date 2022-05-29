import React from "react";
import styled from "styled-components";
import { Sbox, Slabel } from "./commonInputStyle";

type CategoryType = {
  id: string;
  name: string;
};

type PropsType = {
  label: string;
  name: string;
  defaultValue?: string;
  onChange: (e: any) => void;
  categories: Array<CategoryType>;
};

export const CategoriesInput = (props: PropsType) => {
  const { label, name, defaultValue, onChange, categories } = props;
  return (
    <Sbox>
      <Slabel>{label}</Slabel>
      <select name={name} defaultValue={defaultValue} onChange={onChange}>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </Sbox>
  );
};
