import styles from "./navbar.module.css";
export default function NavItem({ itemName, imgSrc }) {
	return (
		<div className={styles["nav-item-wrapper"]}>
			<img src={imgSrc} alt="" />
			<h2>{itemName}</h2>
		</div>
	);
}
