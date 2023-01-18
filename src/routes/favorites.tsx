import { Empty } from "antd";
import { useContext } from "react";
import styled from "styled-components";
import CocktailCard from "../components/CocktailCard";
import { AppContext } from "../contexts/appContext";

const FavoritesPage = (): JSX.Element => {
  // get data from ctx
  const { favoritesData } = useContext(AppContext);

  // loading screen until data fetches
  if (!favoritesData.length) {
    return (
      <Container>
        <Empty />
      </Container>
    );
  }

  return (
    <Container>
      <div className="card-group">
        {[...favoritesData].map((cocktail) => (
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

  .card-group {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  .ant-result-extra {
    margin-top: 12px;
  }

  .ant-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-items: center;
    flex: 1;
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

export default FavoritesPage;
