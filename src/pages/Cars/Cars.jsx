import { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { message, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { apiRequest } from "../../utils/api";
import { useModal } from "../../zustand/ModalStore";
import { useIdStore } from "../../zustand/IdStore";
import { CarModal } from "../../utils/CarModal";
import { toast } from "react-toastify";

function Cars(props) {
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { openCreateCarModal, openEditCarModal } = useModal();
  const { setCarId } = useIdStore();

  const fetchCars = async () => {
    setLoading(true);
    try {
      const fetchedCars = await apiRequest("cars");
      setCars(fetchedCars.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await apiRequest(`cars/${id}`, "Delete");
      toast.success("Car deleted successfully!");
      fetchCars();
    } catch (error) {
      toast.error("Failed to delete car");
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = debounce((query) => {
    if (query.length > 0) {
      const filteredData = cars.filter((f) =>
        f.brand.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchedData(filteredData);
    } else {
      setSearchedData([]);
    }
  }, 300);

  const handleSearchInput = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const columns = [
    {
      title: "brand",
      width: '15%',
      dataIndex: "brand",
      ellipsis: true,
      render: (text) => <p className="page__text">{text.title}</p>
    },
    {
      title: "model",
      width: '15%',
      dataIndex: "model",
      ellipsis: true,
      render: (text) => <p className="page__text">{text.name}</p>
    },
    {
      title: "color",
      width: '20%',
      dataIndex: "color",
      ellipsis: true,
      render: (text) => <p className="page__text">{text}</p>
    },
    {
      title: "city",
      width: '20%',
      dataIndex: "city",
      ellipsis: true,
      render: (text) => <p className="page__text">{text.name}</p>
    },
    {
      title: "action",
      width: '15%',
      dataIndex: "",
      render: (_, item) => (
        <div className="page__actions">
          <div
            className={`${"page__icon"} ${"edit"}`}
            onClick={() => {
              openEditCarModal();
              setCarId(item.id);
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M18 10L21 7L17 3L14 6M18 10L8 20H4V16L14 6M18 10L14 6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></g></svg>
          </div>
          <div
            className={`${"page__icon"} ${"delete"}`}
            onClick={() => handleDelete(item.id)}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
          </div>
        </div>
      ),
    },
    {
      title: (
        <button
          className="page__add_button"
          onClick={openCreateCarModal}
        >
          Add cars
        </button>
      ),
      dataIndex: "key",
    },
  ];

  return (
    <>
      <div className="page__search_container">
        <input
          type="search"
          placeholder="Search"
          className="page__search_input"
          onChange={handleSearchInput}
        />
      </div>
      <div className="page__table">
        <Table
          loading={loading}
          columns={columns}
          dataSource={searchQuery.length > 0 ? searchedData : cars}
          rowKey={"id"}
          scroll={{ x: 800 }}
        />
      </div>
      <CarModal getApi={fetchCars} data={cars} />
    </>
  );
}

export default Cars;
