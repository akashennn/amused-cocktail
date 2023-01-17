import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const layout = (): JSX.Element => {
  return (
    <CustomLayout>
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
  height: 100vh;
  overflow: auto;

  .body {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  .content {
    background: rgb(255, 255, 255);
  }

  /* styles for tablets */
  @media (min-width: 768px) {
  }

  /* styles for desktops */
  @media (min-width: 1024px) {
    justify-content: center;
    align-items: center;

    .body {
      width: 1024px;
      height: auto;
    }
  }
`;

export default layout;
