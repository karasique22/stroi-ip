import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({ weight: ["300", "400", "900"], subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Строительная компания",
	description: "Строительная компания",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru">
			<head>
				<link rel="icon" href="/svg/logo.svg" sizes="any" />
			</head>
			<body className={roboto.className}>{children}</body>
		</html>
	);
}
