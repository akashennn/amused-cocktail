import { FireOutlined, FireTwoTone } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import Search from "antd/es/input/Search";
import { useContext, useState } from "react";
import styled from "styled-components";
import CocktailCard from "../components/CocktailCard";
import Loader from "../components/Loader";
import { AppContext } from "../contexts/appContext";

const IndexPage = (): JSX.Element => {
  // get data from ctx
  const { cocktailsData, getFiveRandomCocktails } = useContext(AppContext);

  // search cocktails using strDrink
  const [searchText, setSearchText] = useState<string>("");

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
      <div className="actions-container">
        <Search
          allowClear
          size="large"
          className="search-input"
          placeholder="Enter cocktail name.."
          enterButton="Search"
          onChange={onInputChange}
          onSearch={onInputSearch}
        />

        <Tooltip placement="top" title="Refresh">
          <Button
            type="dashed"
            shape="circle"
            className="refresh-button"
            icon={
              <FireTwoTone
                twoToneColor="#f39c12"
                className="refresh-button-icon"
              />
            }
            onClick={getFiveRandomCocktails}
          />
        </Tooltip>
      </div>

      <div className="card-group">
        {[...cocktailsData]
          // handle search, strDrink is converted to lowercase to match with search texts
          .filter((cocktail) =>
            cocktail.strDrink.toLocaleLowerCase().includes(searchText)
          )
          .map((cocktail) => (
            <CocktailCard cocktail={cocktail} key={cocktail.idDrink} />
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

  .actions-container {
    display: flex;
    flex: 1;
    margin-bottom: 12px;
    justify-content: center;
    align-items: center;

    .search-input {
      display: flex;
      flex: 1;
      margin-right: 12px;
    }

    .refresh-button:hover {
      color: #f39c12;
      border-color: #f39c12;
    }

    .refresh-button-icon {
      font-size: 20px;
    }
  }

  .card-group {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  /* styles for tablets */
  @media (min-width: 768px) {
    .card-group {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      grid-gap: 12px;
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
