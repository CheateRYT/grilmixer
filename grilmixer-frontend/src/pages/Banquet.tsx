import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import HomeYandexMap from "../components/HomeYandexMap";
import styles from "./Banquet.module.css";
import { backendApiUrl } from "../utils/BackendUrl";

interface Dish {
  name: string;
  weight: string;
  price: string;
}

interface Dishes {
  [category: string]: Dish[];
}

const Banquet = () => {
  const navigate = useNavigate();
  const [dishes, setDishes] = useState<Dishes>({}); // Состояние для хранения блюд
  const [loading, setLoading] = useState(true); // Состояние загрузки

  const handleClickTitle = () => {
    navigate("/");
  };

  // Настройки слайдера
  const CustomPrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={`${className} custom-prev-arrow`} onClick={onClick}>
        &#10094;
      </div>
    );
  };

  const CustomNextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={`${className} custom-next-arrow`} onClick={onClick}>
        &#10095;
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  // Функция для получения блюд
  const fetchDishes = async () => {
    try {
      const response = await fetch(
        `${backendApiUrl}admin/getOtherCafeProducts/banquet`
      );
      if (!response.ok) {
        throw new Error("Ошибка при получении данных");
      }
      const data = await response.json();
      setDishes(data); // Устанавливаем полученные данные в состояние
    } catch (error) {
      console.error("Ошибка:", error);
    } finally {
      setLoading(false); // Завершаем загрузку
    }
  };

  useEffect(() => {
    fetchDishes(); // Получаем блюда при монтировании компонента
  }, []);

  if (loading) {
    return <div>Загрузка...</div>; // Показываем загрузку, пока данные не загружены
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title} onClick={handleClickTitle}>
          Банкетное меню
        </h1>
      </header>
      {/* Слайдер для изображений */}
      <section className={styles.gallery}>
        <Slider {...settings}>
          <div>
            <img
              src="/banquet/table1.jpg"
              alt="Стол"
              className={`${styles.sliderImage} w-full h-auto`}
            />
          </div>
          <div>
            <img
              src="/banquet/room1.jpg"
              alt="Зона"
              className={`${styles.sliderImage} w-full h-auto`}
            />
          </div>
          <div>
            <img
              src="/banquet/food1.jpg"
              alt="Блюда"
              className={`${styles.sliderImage} w-full h-auto`}
            />
          </div>
          <div>
            <img
              src="/banquet/table2.jpg"
              alt="Стол 2"
              className={`${styles.sliderImage} w-full h-auto`}
            />
          </div>
          <div>
            <img
              src="/banquet/food2.jpg"
              alt="Блюда 2"
              className={`${styles.sliderImage} w-full h-auto`}
            />
          </div>
        </Slider>
      </section>
      <section className={styles.menu}>
        <h2 className={styles.menuTitle}>Меню</h2>
        {Object.entries(dishes).map(([category, items]) => (
          <div key={category} className={styles.category}>
            <h3 className={styles.categoryTitle}>{category}</h3>
            <div className={styles.cardContainer}>
              {items.map((dish, index) => (
                <div key={index} className={styles.card}>
                  <h4>{dish.name}</h4>
                  <p>Вес: {dish.weight}</p>
                  <p>Цена: {dish.price}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
        <h3 className={styles.moreFood}>Больше блюд узнавайте по телефону.</h3>
      </section>
      <section className={styles.contact}>
        <h2>Контактная информация</h2>
        <p>
          Телефон: <a href="tel:+79298207474">8 (929) 820-74-74</a>
        </p>
        <p>Адрес: Транспортная ул., 46</p>
        <p>Время работы: с 10:00 до 00:00</p>
      </section>
      <section className={styles.map}>
        <HomeYandexMap link="https://yandex.ru/map-widget/v1/org/farsh/190773496899/?ll=38.884448%2C47.223400&z=17" />
      </section>
    </div>
  );
};

export default Banquet;
