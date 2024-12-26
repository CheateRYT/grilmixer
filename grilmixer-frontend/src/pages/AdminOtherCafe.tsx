import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { backendApiUrl } from "../utils/BackendUrl";
import AdminMain from "./AdminMain";

const AdminOtherCafe: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<"banquet" | "pominki">(
    "banquet"
  );
  const [newProductData, setNewProductData] = useState({
    name: "",
    weight: "",
    price: "",
    category: "",
  });
  const [productNameToDelete, setProductNameToDelete] = useState("");

  const handleMenuChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMenu(e.target.value as "banquet" | "pominki");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDeleteInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductNameToDelete(e.target.value);
  };

  const handleCreateProduct = async () => {
    try {
      const token = Cookies.get("admin-token");
      const endpoint =
        selectedMenu === "banquet"
          ? "createBanquetProduct"
          : "createPominkiProduct";
      await axios.post(
        `${backendApiUrl}otherCafe/${endpoint}`,
        newProductData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Очистить данные после успешного создания
      setNewProductData({
        name: "",
        weight: "",
        price: "",
        category: "",
      });
      alert("Продукт успешно создан!");
    } catch (error) {
      console.error("Ошибка при создании продукта:", error);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      const token = Cookies.get("admin-token");
      const endpoint =
        selectedMenu === "banquet"
          ? "deleteBanquetProduct"
          : "deletePominkiProduct";
      await axios.delete(`${backendApiUrl}otherCafe/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          name: productNameToDelete,
        },
      });
      // Очистить данные после успешного удаления
      setProductNameToDelete("");
      alert("Продукт успешно удален!");
    } catch (error) {
      console.error("Ошибка при удалении продукта:", error);
    }
  };

  return (
    <div className="bg-slate-700">
      <AdminMain />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Создание товара</h1>
        <label className="block mb-2">
          Выберите меню:
          <select
            value={selectedMenu}
            onChange={handleMenuChange}
            className="block w-full border border-gray-300 rounded p-2"
          >
            <option value="banquet">Банкет</option>
            <option value="pominki">Поминки</option>
          </select>
        </label>
        <div className="mb-4">
          <input
            type="text"
            name="name"
            value={newProductData.name}
            onChange={handleInputChange}
            placeholder="Название товара"
            className="block w-full border border-gray-300 rounded p-2 mb-2"
          />
          <input
            type="text"
            name="weight"
            value={newProductData.weight}
            onChange={handleInputChange}
            placeholder="Вес"
            className="block w-full border border-gray-300 rounded p-2 mb-2"
          />
          <input
            type="text"
            name="price"
            value={newProductData.price}
            onChange={handleInputChange}
            placeholder="Цена"
            className="block w-full border border-gray-300 rounded p-2 mb-2"
          />
          <input
            type="text"
            name="category"
            value={newProductData.category}
            onChange={handleInputChange}
            placeholder="Категория"
            className="block w-full border border-gray-300 rounded p-2 mb-2"
          />
          <button
            onClick={handleCreateProduct}
            className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
          >
            Создать
          </button>
        </div>

        <h2 className="text-xl font-bold mb-4">Удаление товара</h2>
        <input
          type="text"
          value={productNameToDelete}
          onChange={handleDeleteInputChange}
          placeholder="Имя товара для удаления"
          className="block w-full border border-gray-300 rounded p-2 mb-2"
        />
        <button
          onClick={handleDeleteProduct}
          className="bg-red-500 text-white rounded p-2 hover:bg-red-600"
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

export default AdminOtherCafe;
