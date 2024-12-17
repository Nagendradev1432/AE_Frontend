import axios from "axios";
import toast from "react-hot-toast";

export const baseUrl = "https://ae-back-end.vercel.app/api/v1/AE/";

export const getAllProducts = () => {
  return axios.get(`${baseUrl}product`, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
};

export const getProduct = (id) => {
  return axios.get(`${baseUrl}product/${id}`, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
};
export const getAllProductsSearch = (search, value) => {
  return axios.get(`${baseUrl}product?${search}=${value}`, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
};
export const getAllProductsSearchByCategroy = (search, value1, value2) => {
  return axios.get(
    `${baseUrl}product?${search}=${value1}&${search}=${value2}`,
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    }
  );
};
export const getAllSubCategorys = (search, value) => {
  return axios.get(`${baseUrl}subCategory/?${search}=${value}`, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
};

export const addToCart = (id, size, amount) => {
  return axios.post(
    `${baseUrl}cart/${id}`,
    {
      size,
      amount: amount * 1,
    },
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    }
  );
};
export const updateCart = (data) => {
  return axios.post(
    `${baseUrl}cart/${data.id}`,
    {
      size: data.size,
      amount: data.amount,
    },
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    }
  );
};
export const getCart = () => {
  return axios.get(`${baseUrl}cart`, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
};
export const deleteFromCart = (id) => {
  return axios.delete(`${baseUrl}cart/${id}`, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
};

export const addToWhishList = (id) => {
  return axios
    .post(
      `${baseUrl}wishList/${id}`,
      {},
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    )
    .then((res) => toast.success("add to wishList successfully"))
    .catch((err) => toast.error("err happened"));
};
export const deleteFromWishList = (id) => {
  return axios
    .delete(`${baseUrl}wishList/${id}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then((res) => toast.success("Removed from wishList successfully"))
    .catch((err) => toast.error("err happened"));
};
export const clearWishList = () => {
  return axios
    .delete(`${baseUrl}wishList/`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then((res) => toast.success("clear wishList successfully"))
    .catch((err) => toast.error("err happened"));
};

export const getWishList = () => {
  return axios.get(`${baseUrl}wishList`, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
};

export const getUser = () => {
  return axios.get(`${baseUrl}user`, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
};
export const makeOrder = (data) => {
  return axios.post(`${baseUrl}order`, data, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
};
export const getOrders = () => {
  return axios.get(`${baseUrl}order`, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
};

export const checkCoupon = (data) => {
  return axios.post(
    `${baseUrl}coupon/check`,
    { code: data },
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    }
  );
};
