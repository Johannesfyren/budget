import { ReactNode } from "react";
import styles from "./home.module.css";

interface ContentContainer {
	children: ReactNode;
	size: string;
}
export default function ContentContainer({ children, size }: ContentContainer) {
	return (
		<div
			style={{ gridColumn: "span " + size }}
			className={styles["chart-wrapper"]}
		>
			{children}
		</div>
	);
}
