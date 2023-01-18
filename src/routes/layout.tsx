import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

type TProps = {
  pathname: string;
};

const layout = ({ pathname }: TProps): JSX.Element => {
  return (
    <CustomLayout>
      <Header className="header">
        <Link
          to="/"
          className={`${
            pathname === "/" ? "navigation-link-active" : ""
          } navigation-link`}
        >
          Cocktails
        </Link>

        <Link
          to="/favorites"
          className={`${
            pathname === "/favorites" ? "navigation-link-active" : ""
          } navigation-link`}
        >
          Favorites
        </Link>
      </Header>

      <Content className="body">
        <div className="content">
          <Outlet />
        </div>
      </Content>
    </CustomLayout>
  );
};

// style overrides
const CustomLayout = styled(Layout)`
  /* styles for mobile devices */
  height: calc(100vh - 48px);
  overflow: auto;

  .body {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  .content {
    display: flex;
    flex: 1;
    background: rgb(255, 255, 255);
  }

  .header {
    position: fixed;
    bottom: 0;
    z-index: 1;
    width: 100%;
    color: white !important;
    padding: 0;
    height: 48px;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: white;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.5);
  }

  .navigation-link {
    display: flex;
    flex: 1;
    justify-content: center;
    color: black;
    font-weight: bold;
  }

  .navigation-link-active {
    color: #1677ff;
  }

  /* styles for tablets */
  @media (min-width: 768px) {
  }

  /* styles for desktops */
  @media (min-width: 1024px) {
    justify-content: center;
    align-items: center;
    height: calc(100vh);

    .body {
      width: 1024px;
      height: auto;
      margin-top: 60px;
    }

    .header {
      top: 0;
      padding: 12px;
      justify-content: flex-start;
      align-items: center;
    }
  }
`;

export default layout;
