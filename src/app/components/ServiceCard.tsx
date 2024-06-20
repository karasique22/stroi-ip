import styles from "../page.module.css";
import Image from "next/image";

type ServiceCardProps = {
	title: string;
	imageUrl: string;
};

const ServiceCard: React.FC<ServiceCardProps> = ({ title, imageUrl }) => {
	return (
		<div className={styles.service}>
			<Image
				className={styles.service_img}
				src={imageUrl}
				alt={title}
				width={24}
				height={24}
			/>
			<h2 className={`${styles.text_black} ${styles.service_title}`}>
				{title}
			</h2>
		</div>
	);
};

export default ServiceCard;
