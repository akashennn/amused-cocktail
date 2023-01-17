import { HeartOutlined, HeartTwoTone } from "@ant-design/icons";
import { Button, Card } from "antd";
import Meta from "antd/es/card/Meta";
import Search from "antd/es/input/Search";
import { useContext, useState } from "react";
import styled from "styled-components";
import CategoryTag from "../components/CategoryTag";
import Loader from "../components/Loader";
import { AppContext } from "../contexts/appContext";
import { Cocktail } from "../types/api";

const IndexPage = (): JSX.Element => {
  // get data from ctx
  const { cocktailsData, favoriteIds, addFavorite, removeFavorite } =
    useContext(AppContext);

  // search cocktails using strDrink
  const [searchText, setSearchText] = useState<string>("");

  const onAddFavorites = async (cocktail: Cocktail) => {
    addFavorite(cocktail);
  };

  const onRemoveFavorites = async (idDrink: string) => {
    removeFavorite(idDrink);
  };

  const onInputSearch = (text: string) => {
    // inputs have been converted to lowercase to use with includes()
    setSearchText(text.toLocaleLowerCase());
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // inputs have been converted to lowercase to use with includes()
    setSearchText(event.target.value.toLocaleLowerCase());
  };

  // loading screen until data fetches
  if (!cocktailsData.length) {
    return <Loader />;
  }

  return (
    <Container>
      <Search
        allowClear
        size="large"
        className="search-input"
        placeholder="Enter cocktail name.."
        enterButton="Search"
        onChange={onInputChange}
        onSearch={onInputSearch}
      />

      <div className="card-group">
        {[...cocktailsData]
          // handle search, strDrink is converted to lowercase to match with search texts
          .filter((cocktail) =>
            cocktail.strDrink.toLocaleLowerCase().includes(searchText)
          )
          .map((cocktail) => (
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
          ))}
      </div>
    </Container>
  );
};

const Container = styled.div`
  /* styles for mobile devices */
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 12px;

  .search-input {
    margin-bottom: 12px;
  }

  .card-group {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  .card:not(:last-child) {
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

  /* styles for tablets */
  @media (min-width: 768px) {
    .card-group {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      grid-gap: 12px;
    }

    .card {
      margin-bottom: 0 !important;
    }
  }

  /* styles for desktops */
  @media (min-width: 1024px) {
    .card-group {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      grid-gap: 12px;
    }
  }
`;

export default IndexPage;
