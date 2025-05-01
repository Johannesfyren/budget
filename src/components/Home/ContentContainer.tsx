import { ReactNode } from "react";

interface ContentContainer {
	children: ReactNode;
	size: string;
}
export default function ContentContainer({ children, size }: ContentContainer) {
	return <div style={{ gridColumn: "span " + size }}>{children}</div>;
}
