import { Skeleton } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { backendApiUrl } from "../utils/BackendUrl";
import CartModal from "./CartModal";
import styles from "./Header.module.css";

interface HeaderProps {
  logo: string;
  shopId: string;
  shopTag: string;
}

interface Category {
  name: string;
  tag: string;
  imagePath: string;
}

export const Header: React.FC<HeaderProps> = ({ logo, shopId, shopTag }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true); // Состояние загрузки

  useEffect(() => {
    axios
      .get(`${backendApiUrl}admin/getCategories/${shopId}`)
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [shopId]);

  const handleClickCategory = (categoryTag: string) => {
    navigate(`/${shopTag}/category/${categoryTag}`);
  };

  const handleNavigateMain = () => {
    navigate("/");
  };

  const handleShowModal = () => {
    if (window.innerWidth > 1000) {
      setShowModal(true);
    }
  };
  const handleMobileCart = () => {
    if (window.innerWidth < 1000) {
      navigate(`/${shopTag}/cart`);
    }
  };
  const handleHideModal = () => {
    if (window.innerWidth > 1000) {
      setShowModal(false);
    }
  };

  return (
    <div>
      <header className={styles.header}>
        <h1 onClick={handleNavigateMain} className={styles.logo}>
          {logo}
        </h1>
      </header>
      <div className={styles.afterHeader}>
        <div className={styles.categoryRow}>
          {loading || !categories.length ? (
            <Skeleton
              variant="rounded"
              sx={{
                bgcolor: "grey.900",
                width: "100%",
                height: 30,
              }}
              animation="pulse"
            />
          ) : (
            categories.map((category, index) => (
              <p
                key={index}
                onClick={() => {
                  handleClickCategory(category.tag);
                }}
              >
                {category.name}
              </p>
            ))
          )}
        </div>
        <div className="flex space-x-2 cursor-pointer relative">
          <button
            className={styles.cartBtn}
            onMouseEnter={handleShowModal}
            onClick={handleMobileCart}
          >
            <svg
              className={styles.cartIcon}
              xmlns="http://www.w3.org/2000/svg"
              shape-rendering="geometricPrecision"
              text-rendering="geometricPrecision"
              image-rendering="optimizeQuality"
              fill-rule="evenodd"
              clip-rule="evenodd"
              viewBox="0 0 512 392.8"
            >
              <path
                fill="#fff"
                d="M50.18 115.5h39.3L185.65 7.77c8.55-9.58 23.36-10.42 32.93-1.88v.01c9.58 8.55 10.41 23.37 1.87 32.94l-68.42 76.66h209.68l-68.43-76.66c-8.55-9.57-7.71-24.39 1.86-32.94h.01c9.57-8.55 24.39-7.71 32.94 1.87l96.17 107.73h37.57l.51.01h35.28c7.91 0 14.38 6.47 14.38 14.37v40.54c0 7.9-6.47 14.37-14.38 14.37h-30.53l-15.71 198.04c-.43 5.45-4.52 9.97-9.98 9.97H70.6c-5.46 0-9.54-4.5-9.97-9.97L44.91 184.79H14.38C6.47 184.79 0 178.32 0 170.42v-40.54c0-7.91 6.47-14.37 14.38-14.37h35.29l.51-.01zm273.43 77.06h45.44v131.38h-45.44V192.56zm-88.41 0h45.43v131.38H235.2V192.56zm-88.41 0h45.43v131.38h-45.43V192.56z"
              />
            </svg>
          </button>
          {showModal && (
            <CartModal
              shopId={shopId}
              setClose={handleHideModal}
              shopTag={shopTag}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
