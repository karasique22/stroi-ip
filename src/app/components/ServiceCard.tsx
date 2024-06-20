import styles from "../page.module.css";

type ServiceCardProps = {
	title: string;
	imageUrl: string;
};

const ServiceCard: React.FC<ServiceCardProps> = ({ title, imageUrl }) => {
	return (
		<div className={styles.service}>
			<img className={styles.service_img} src={imageUrl} alt={title} />
			<h2 className={`${styles.text_black} ${styles.service_title}`}>
				{title}
			</h2>
		</div>
	);
};

export default ServiceCard;
