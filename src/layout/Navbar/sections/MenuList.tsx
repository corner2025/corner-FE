import MenuItem from "./MenuItems";

type MenuListProps = {
  items: { path: string; key: string }[];
  onClick?: () => void;
  className?: string;
};

const MenuList = ({
  items,
  onClick = () => {},
  className = "",
}: MenuListProps) => (
  <ul className={`flex gap-8 text-lg items-center ${className}`}>
    {items.map((item) => (
      <MenuItem
        key={item.path}
        path={item.path}
        label={item.key}
        onClick={onClick}
      />
    ))}
  </ul>
);

export default MenuList;
