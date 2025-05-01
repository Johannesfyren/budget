import styles from "./home.module.css";
import ContentContainer from "./ContentContainer";

export default function Home() {
	return (
		<div
			style={{ display: "flex", flexDirection: "column", width: "100%" }}
		>
			<h1>Home</h1>
			<div className={styles["container"]}>
				<ContentContainer size="2">
					<p>content</p>
				</ContentContainer>
				<ContentContainer size="2">
					<p>content</p>
				</ContentContainer>
				<ContentContainer size="1">
					<p>content</p>
				</ContentContainer>
			</div>
		</div>
	);
}
