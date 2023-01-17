import { Tag } from "antd";

type TProps = {
  name: string;
};

const CategoryTag = ({ name }: TProps): JSX.Element => {
  switch (name) {
    case "Ordinary Drink":
      return <Tag color="#a52a2a">Ordinary Drink</Tag>;
    case "Cocktail":
      return <Tag color="#2ecc71">Cocktail</Tag>;
    case "Shake":
      return <Tag color="#3498db">Shake</Tag>;
    case "Other / Unknown":
      return <Tag color="#9b59b6">Other / Unknown</Tag>;
    case "Cocoa":
      return <Tag color="#34495e">Cocoa</Tag>;
    case "Shot":
      return <Tag color="#f1c40f">Shot</Tag>;
    case "Coffee / Tea":
      return <Tag color="#e67e22">Coffee / Tea</Tag>;
    case "Homemade Liqueur":
      return <Tag color="#e74c3c">Homemade Liqueur</Tag>;
    case "Punch / Party Drink":
      return <Tag color="#bdc3c7">Punch / Party Drink</Tag>;
    case "Beer":
      return <Tag color="#34495e">Beer</Tag>;
    default:
      return <Tag color="default">Soft Drink</Tag>;
  }
};

export default CategoryTag;
