import { v4 as uuidv4 } from "uuid";

export const mapMainMenuItems = (menuItems) => {
  return menuItems.map((menuItem) => ({
    id: uuidv4(),
    destination: menuItem.menuItem.destination?.uri,
    label: menuItem.menuItem.label,
    subMenuItems: (menuItem.items || []).map((subMenuItem) => ({
      id: uuidv4(),
      destination: subMenuItem.destination?.uri,
      label: subMenuItem.label,
    })),
  }));
};
