import styles from "../page.module.css";
import Image from "next/image";

type ProjectCard = {
	title: string;
	imageUrl: string;
};

const ProjectCard: React.FC<ProjectCard> = ({ title, imageUrl }) => {
	return (
		<div className={styles.project}>
			<Image
				className={styles.project_img}
				src={imageUrl}
				alt={title}
				width={24}
				height={24}
				layout="responsive"
			/>
			<h3 className={`${styles.text_regular} ${styles.project_title}`}>
				{title}
			</h3>
		</div>
	);
};

export default ProjectCard;
