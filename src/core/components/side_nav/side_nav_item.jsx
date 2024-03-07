import { ListItemButton, ListItemIcon } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ColorConfigs from "../../utils/color_configs";

const SideNavItem = ({ item }) => {
	const { appState } = useSelector((state) => state.appState);

	return item.sidebarProps && item.path ? (
		<ListItemButton
			component={Link}
			to={item.path}
			sx={{
				"&: hover": {
					backgroundColor: ColorConfigs.sidenav.hoverBg,
				},
				backgroundColor:
					appState === item.state ? ColorConfigs.sidenav.activeBg : "unset",
				paddingY: "12px",
				paddingX: "24px",
			}}>
			<ListItemIcon
				sx={{
					color: ColorConfigs.sidenav.color,
				}}>
				{item.sidebarProps.icon && item.sidebarProps.icon}
			</ListItemIcon>
			{item.sidebarProps.displayText}
		</ListItemButton>
	) : null;
};

export default SideNavItem;
