"use client";

import styles from "./page.module.css";
import ServiceCard from "./components/ServiceCard";
import ProjectCard from "./components/ProjectCard";
import { services } from "./data/services";
import { projects } from "./data/projects";
import { useState, useEffect, MouseEventHandler } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
	const [isMobile, setIsMobile] = useState(false);
	const [visibleServicesCount, setVisibleServicesCount] = useState(3);
	const [servicesExtended, setServicesExtended] = useState(false)
	const [phoneNumber, setPhoneNumber] = useState("");

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.matchMedia("(max-width: 768px)").matches);
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const showAllServices = () => {
		setVisibleServicesCount(services.length);
	};

	const hideServices = () => {
		setVisibleServicesCount(3);
	};

	const toggleServices = () => {
		setServicesExtended(!servicesExtended);
		setVisibleServicesCount(servicesExtended ? 3 : services.length);
	};

	const formatRussianPhoneNumber = (input: string): string => {
		if (input === "" || input === "+7") {
			return "";
		}

		let digits = input.replace(/\D/g, "");

		if (digits.startsWith("7") || digits.startsWith("8")) {
			digits = digits.slice(1);
		}

		digits = digits.slice(0, 10);

		let formatted = "+7 (";

		if (digits.length > 0) {
			formatted += digits.slice(0, 3);
		}
		if (digits.length > 3) {
			formatted += `) ${digits.slice(3, 6)}`;
		}
		if (digits.length > 6) {
			formatted += `-${digits.slice(6, 8)}`;
		}
		if (digits.length > 8) {
			formatted += `-${digits.slice(8)}`;
		}

		if (input === "+7 (") {
			return "+7 (";
		} else if (input === "+7 ") {
			return "+7 ";
		} else if (input === "+7") {
			return "";
		}

		return formatted;
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const input = event.target.value;
		const formattedInput = formatRussianPhoneNumber(input);
		setPhoneNumber(
			formattedInput.slice(
				0,
				Math.max(input.length, formattedInput.length)
			)
		);
	};

	const scrollToSection =
		(
			sectionId: string
		): MouseEventHandler<HTMLDivElement | HTMLButtonElement> =>
			event => {
				event.preventDefault();
				const section = document.getElementById(sectionId);
				if (section) {
					window.scrollTo({
						top: section.offsetTop + 1,
						behavior: "smooth",
					});
				}
			};

	const openMobileMenu = () => {
		const menu = document.querySelector("#mobile_menu") as HTMLElement;

		if (menu) {
			menu.classList.add(styles.active);
		}
	};

	const closeMobileMenu = () => {
		const menu = document.querySelector("#mobile_menu") as HTMLElement;

		if (menu) {
			menu.classList.remove(styles.active);
		}
	};

	return (
		<main className={styles.main}>
			<header className={styles.header}>
				<Image
					className={styles.header_logo}
					src="./svg/logo.svg"
					alt="logo"
					width={100}
					height={100}
				/>
				<div className={styles.desktop_menu}>
					<div onClick={scrollToSection("services")}>Услуги</div>
					<div onClick={scrollToSection("projects")}>Проекты</div>
					<div onClick={scrollToSection("about")}>О нас</div>
					<div onClick={scrollToSection("footer")}>Контакты</div>
				</div>
				<div
					className={styles.mobile_menu_burger}
					onClick={openMobileMenu}
				>
					<Image
						src="./svg/burger-menu.svg"
						alt="Меню"
						width={24}
						height={24}
						layout="responsive"
					/>
				</div>
				<div className={styles.mobile_menu} id="mobile_menu">
					<div onClick={scrollToSection("services")}>Услуги</div>
					<div onClick={scrollToSection("projects")}>Проекты</div>
					<div onClick={scrollToSection("about")}>О нас</div>
					<div onClick={scrollToSection("footer")}>Контакты</div>
					<div
						className={styles.text_black}
						style={{ marginTop: "20px" }}
						onClick={closeMobileMenu}
					>
						Закрыть
					</div>
				</div>
			</header>

			<section className={styles.header_banner}>
				<div className={styles.header_banner_background}>
					<div className={styles.header_banner_overlay}></div>
					<Image
						src="./img/banners/header-banner.png"
						alt="Фон"
						width={80}
						height={80}
					/>
				</div>
				<div className={styles.header_banner_content}>
					<div className={styles.header_banner_text}>
						<h1
							className={
								styles.text_black +
								" " +
								styles.header_banner_text_desktop
							}
						>
							Металлоконструкции, фундаменты и кровли
						</h1>
						<h1
							className={
								styles.text_black +
								" " +
								styles.header_banner_text_mobile
							}
						>
							Фундаменты, кровли и металлоконструкции
						</h1>
						<h1 className={styles.text_light}>
							точно в срок или быстрее.
						</h1>
					</div>
					<div className={styles.header_banner_main}>
						<div
							className={
								styles.header_banner_items +
								" " +
								styles.text_light
							}
						>
							<div className={styles.header_banner_item}>
								<Image
									src="./svg/estimates.svg"
									alt="estimates"
									width={24}
									height={24}
									className={styles.header_banner_item_img}
								/>
								<p>Смета фиксируется в договоре</p>
							</div>
							<div className={styles.header_banner_item}>
								<Image
									src="./svg/contract.svg"
									alt="contract"
									width={24}
									height={24}
									className={styles.header_banner_item_img}
								/>
								<p>Гарантия в соответствии с законом</p>
							</div>
						</div>
						<button
							className={
								styles.header_banner_button +
								" " +
								styles.primary_button
							}
							onClick={scrollToSection("target")}
						>
							Узнать стоимость и сроки
						</button>
					</div>
				</div>
			</section>

			<section className={styles.section} id="services">
				<div className={styles.section_title_block}>
					<div>
						<h2 className={styles.text_black}>
							Возьмем на себя все,
						</h2>
						<h2 className={styles.text_light}>
							что связано со строительством
						</h2>
					</div>
					<h3 className={styles.text_regular}>
						Оказываем услуги по строительству с 1996 года
					</h3>
				</div>

				{/* TODO: fix hide animation */}
				<motion.div layout className={styles.services_grid}>
					{services
						.slice(
							0,
							isMobile ? visibleServicesCount : services.length
						)
						.map((service, index) => (
							<ServiceCard
								key={index}
								title={service.title}
								imageUrl={service.imageUrl}
							/>
						))}
					{isMobile && (
						<button onClick={toggleServices} className={styles.primary_button}>
							{servicesExtended ? "Скрыть" : "Показать все"}
						</button>
					)}
				</motion.div>
			</section>
			<section className={styles.section} id="projects">
				<div className={styles.section_title_block}>
					<div>
						<h2 className={styles.text_black}>
							Посмотрите реализованные проекты
						</h2>
					</div>
					<h3 className={styles.text_regular}>
						96% сдаем раньше срока, указанного в смете
					</h3>
				</div>

				<div className={styles.projects}>
					{projects
						.map((project, index) => (
							<ProjectCard
								key={index}
								title={project.title}
								imageUrl={project.imageUrl}
							/>
						))}
				</div>
			</section>

			<section
				className={`${styles.section} ${styles.target}`}
				id="target"
			>
				<motion.div className={styles.section_title_block}>
					<div>
						<h2 className={styles.text_black}>
							Бесплатно подготовим для вас
						</h2>
						<h2 className={styles.text_light}>
							полную смету на работу и материалы
						</h2>
					</div>
					<h3
						className={`${styles.text_regular} ${styles.target_text}`}
					>
						Руководитель лично свяжется с вами, уточнит детали и
						рассчитает смету
					</h3>
				</motion.div>
				<form className={styles.target_form}>
					<div className={styles.target_inputs}>
						<input
							type="text"
							placeholder="Ваше имя"
							className={styles.target_input}
							maxLength={32}
							required
						/>
						<input
							type="tel"
							placeholder="Ваш телефон"
							className={styles.target_input}
							value={phoneNumber}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div className={styles.target_submit}>
						<button className={styles.primary_button} type="submit">
							Узнать стоимость и сроки
						</button>
						<div className={styles.target_checkbox}>
							<input type="checkbox" required />
							<div className={styles.target_checkbox_text}>
								<a>Нажимая на кнопку, вы соглашаетесь с </a>
								<a href=""><u>политикой конфиденциальности</u></a>
							</div>
						</div>
					</div>
				</form>
			</section>

			<section className={`${styles.section} ${styles.about}`} id="about">
				<Image
					src={"./img/banners/about-us-banner.png"}
					className={styles.about_section_img}
					alt="О нас"
					layout="fill"
				/>
				<div className={styles.section_title_block}>
					<h2 className={styles.text_black}>
						Больше, чем просто строители
					</h2>
					<h3 className={styles.text_regular}>
						Наша компания - это не просто строители. Мы - команда
						профессионалов, объединенных общими ценностями и
						стремлением к совершенству. С 1995 года мы создаем
						качественные и надежные здания, соответствующие всем
						современным стандартам и требованиям. Мы гордимся нашими
						достижениями и продолжаем развиваться, предлагая
						инновационные решения в области строительства. Мы
						предлагаем полный цикл услуг - от проектирования до
						сдачи объекта "под ключ". Наш опыт позволяет нам успешно
						реализовывать проекты любой сложности и масштаба.
						Основной принцип нашей работы - индивидуальный подход к
						каждому клиенту и строгое соблюдение сроков.
					</h3>
				</div>
				<div className={styles.about_numbers}>
					<div className={styles.about_number}>
						<div
							className={`${styles.text_black} ${styles.about_number_num}`}
						>
							28
						</div>
						<h3
							className={`${styles.text_regular} ${styles.about_number_text}`}
						>
							лет на рынке строительства
						</h3>
					</div>
					<div className={styles.about_number}>
						<div
							className={`${styles.text_black} ${styles.about_number_num}`}
						>
							95%
						</div>
						<h3
							className={`${styles.text_regular} ${styles.about_number_text}`}
						>
							довольных клиентов
						</h3>
					</div>
					<div className={styles.about_number}>
						<div
							className={`${styles.text_black} ${styles.about_number_num}`}
						>
							28
						</div>
						<h3
							className={`${styles.text_regular} ${styles.about_number_text}`}
						>
							лет на рынке строительства
						</h3>
					</div>
					<div className={styles.about_number}>
						<div
							className={`${styles.text_black} ${styles.about_number_num}`}
						>
							28
						</div>
						<h3
							className={`${styles.text_regular} ${styles.about_number_text}`}
						>
							лет на рынке строительства
						</h3>
					</div>
					<div className={styles.about_number}>
						<div
							className={`${styles.text_black} ${styles.about_number_num}`}
						>
							28
						</div>
						<h3
							className={`${styles.text_regular} ${styles.about_number_text}`}
						>
							лет на рынке строительства
						</h3>
					</div>
				</div>
			</section>

			<section
				className={`${styles.section} ${styles.footer}`}
				id="footer"
			>
				<div className={styles.section_title_block}>
					<div>
						<h2 className={styles.text_black}>
							Ничего не скрываем и держим в курсе
						</h2>
						<h2 className={styles.text_light}>
							каждого этапа работы
						</h2>
					</div>
				</div>
				<div className={styles.footer_grid}>

					<div className={`${styles.footer_card_1} ${styles.footer_card}`}>
						<Image
							src="./img/services/1.png"
							alt=""
							width={24}
							height={24}
							className={styles.footer_card_img}
						/>
						<h2 className={styles.text_black}>Звоните</h2>
						<h2 className={styles.text_black}>
							+7 (902) 805-54-25
						</h2>
						<h3 className={styles.text_regular}>
							Ответим на все вопросы и проведем консультацию
						</h3>
					</div>
					
					{!isMobile && 
						<div className={styles.footer_button}>
							<h3 className={styles.text_regular}>
								Или оставьте заявку на сайте
							</h3>
							<button
								className={styles.primary_button}
								onClick={scrollToSection("target")}
							>
								Оставить заявку
							</button>
						</div>
					}

					<div className={`${styles.footer_card_2} ${styles.footer_card}`}>
						<Image
							src="./img/services/2.png"
							alt=""
							width={24}
							height={24}
							className={styles.footer_card_img}
						/>
						<h2 className={styles.text_black}>
							Составляем подробную смету
						</h2>
					</div>

					<div className={`${styles.footer_card_3} ${styles.footer_card}`}>
						<Image
							src="./img/services/3.png"
							alt=""
							width={24}
							height={24}
							className={styles.footer_card_img}
						/>
						<h2 className={styles.text_black}>
							Составляем договор
						</h2>
					</div>

					{isMobile &&
						<div className={styles.footer_button}>
							<h3 className={styles.text_regular}>
								Или оставьте заявку на сайте
							</h3>
							<button
								className={styles.primary_button}
								onClick={scrollToSection("target")}
							>
								Оставить заявку
							</button>
						</div>
					}

				</div>
				<div className={styles.footer_contacts}>
					<div className={styles.footer_contacts_mail}>
						<h2 className={styles.text_black}>Пишите нам</h2>
						<a
							href="mailto:s.dudin72@mail.ru"
							className={`${styles.text_light} ${styles.footer_contacts_mail_link}`}
						>
							<u>s.dudin72@mail.ru</u>
						</a>
					</div>
					<div className={styles.footer_contacts_socials}>
						<h2 className={styles.text_black}>
							Мы всегда на связи
						</h2>
						<div className={styles.footer_contacts_socials_icons}>
							<a href="">
								<Image
									src="./svg/whatsApp.svg"
									alt=""
									width={24}
									height={24}
									layout="responsive"
								/>
							</a>
							<a href="">
								<Image
									src="./svg/telegram.svg"
									alt=""
									width={24}
									height={24}
									layout="responsive"
								/>
							</a>
							<a href="">
								<Image
									src="./svg/viber.svg"
									alt=""
									width={24}
									height={24}
									layout="responsive"
								/>
							</a>
						</div>
					</div>
				</div>
			</section>

			<section className={`${styles.section} ${styles.footer_final}`}>
				<Image
					className={styles.header_logo}
					src="./svg/logo.svg"
					alt="logo"
					width={100}
					height={100}
				/>
				<div className={styles.final_footer_link_stack}>
					<a href=""> <u>Политика конфиденциальности</u></a>
					<a href=""> <u>Пользовательское соглашение</u></a>
				</div>
				<div className={styles.final_footer_link_stack}>
					<a href="tel:++79028055425">+7(902)805-54-25</a>
					<a href="mailto:s.dudin72@mail.ru">s.dudin72@mail.ru</a>
				</div>
			</section>
		</main>
	);
}
