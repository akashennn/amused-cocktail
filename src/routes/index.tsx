import { HeartOutlined, HeartTwoTone } from "@ant-design/icons";
import { Card, Tag } from "antd";
import Meta from "antd/es/card/Meta";
import { useContext } from "react";
import styled from "styled-components";
import CategoryTag from "../components/CategoryTag";
import Loader from "../components/Loader";
import { AppContext } from "../contexts/appContext";

const IndexPage = (): JSX.Element => {
  // get data from ctx
  const { cocktailsData } = useContext(AppContext);

  // loading screen until data fetches
  if (!cocktailsData.length) {
    return <Loader />;
  }

  return (
    <Container>
      <div className="card-group">
        {cocktailsData.map((cocktail) => (
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
              // <HeartOutlined key="" />
              <HeartTwoTone twoToneColor="#eb2f96" />
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
