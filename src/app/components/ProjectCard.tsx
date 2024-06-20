import styles from "../page.module.css";

type ProjectCard = {
	title: string;
	imageUrl: string;
};

const ProjectCard: React.FC<ProjectCard> = ({ title, imageUrl }) => {
	return (
		<div className={styles.project}>
			<img className={styles.project_img} src={imageUrl} alt={title} />
			<h3 className={`${styles.text_regular} ${styles.project_title}`}>
				{title}
			</h3>
		</div>
	);
};

export default ProjectCard;
