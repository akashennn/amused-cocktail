import { HeartTwoTone, HeartOutlined } from "@ant-design/icons";
import { Card, Button } from "antd";
import Meta from "antd/es/card/Meta";
import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../contexts/appContext";
import { Cocktail } from "../types/api";
import CategoryTag from "./CategoryTag";

type TProps = {
  cocktail: Cocktail;
};

const CocktailCard = ({ cocktail }: TProps): JSX.Element => {
  // get data from ctx
  const { favoriteIds, addFavorite, removeFavorite } = useContext(AppContext);

  const onAddFavorites = async (cocktail: Cocktail) => {
    addFavorite(cocktail);
  };

  const onRemoveFavorites = async (idDrink: string) => {
    removeFavorite(idDrink);
  };

  return (
    <Container>
      <Card
        hoverable
        className="card"
        key={cocktail.idDrink}
        title={cocktail.strDrink}
        cover={
          <img
            className="card-cover"
            alt="card cover"
            src={cocktail.strDrinkThumb}
          />
        }
        extra={
          <>
            {favoriteIds.includes(cocktail.idDrink) ? (
              <Button
                type="ghost"
                shape="circle"
                icon={<HeartTwoTone twoToneColor="#eb2f96" />}
                //   disabled
                onClick={() => onRemoveFavorites(cocktail.idDrink)}
              />
            ) : (
              <Button
                type="ghost"
                shape="circle"
                icon={<HeartOutlined />}
                onClick={() => onAddFavorites(cocktail)}
              />
            )}
          </>
        }
      >
        <Meta
          description={
            <>
              <p className="instructions">{cocktail.strInstructions}</p>

              <CategoryTag name={cocktail.strCategory} />
            </>
          }
        />
      </Card>
    </Container>
  );
};

const Container = styled.div`
  :not(:last-child) {
    margin-bottom: 12px;
  }

  .ant-card-head {
    padding: 12px;
  }

  .ant-card-cover {
    display: flex;
    flex: 1;
    justify-content: center;
  }

  .card-cover {
    object-fit: cover;
    height: 100%;
    width: 100%;
    border-radius: 0 !important;
  }

  .ant-card,
  .ant-card-body {
    border-radius: 0 !important;
  }

  .ant-card-body {
    padding: 12px;
  }

  .ant-card-meta {
    margin: 0;
  }

  .instructions {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 12px;
  }

  button:disabled,
  button[disabled] {
    cursor: not-allowed;
  }

  /* styles for tablets */
  @media (min-width: 768px) {
    margin-bottom: 0 !important;
  }
`;

export default CocktailCard;
