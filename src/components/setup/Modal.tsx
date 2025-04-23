import { useState } from "react";
import { createPortal } from "react-dom";

import styles from "./setup.module.css";

export default function Modal({ children }) {
	const [showModal, setShowModal] = useState(false);
	return (
		<>
			<button onClick={() => setShowModal(true)}>
				Show modal using a portal
			</button>
			{showModal &&
				createPortal(
					<div className={styles["modal-backdrop"]}>
						<div className={styles["modal"]}>
							{children}
							<button onClick={() => setShowModal(false)}>
								Close
							</button>
						</div>
					</div>,
					document.body
				)}
		</>
	);
}
