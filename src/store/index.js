import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    categories: [],
    menuItems: [],
    menuFilter: {
      categoryId: 0,
    },
    showSpinner: false,
    editData: null,
  },
  getters: {
    getMenuItems(state) {
      return state.menuItems.filter((item) =>
        state.menuFilter.categoryId
          ? item.categoryId === state.menuFilter.categoryId
          : true
      );
    },
  },
  mutations: {
    setCategories(state, data) {
      state.categories = data;
    },
    setMenuItems(state, data) {
      state.menuItems = data;
    },
    setMenuFilter(state, data) {
      state.menuFilter = data;
    },
    async createMenuItem(state, data) {
      const formBaseUrl = "http://localhost:3000/menu";
      const filesBaseUrl = "http://localhost:3000/menu/image/";

      console.log("createMenuItem mutation");

      const menuItem = await axios.post(formBaseUrl, data.form).then((res) => {
        return res.data;
      });

      state.showSpinner = true;

      if (data?.file) {
        const formData = new FormData();
        formData.append("file", data.file);

        await axios.post(filesBaseUrl + menuItem.id, formData).then((res) => {
          console.log(res.data);
          menuItem.imageUrl = res.data.url;
        });
      }
      console.log("new menu item", menuItem);
      state.showSpinner = false;
      state.menuItems.push(menuItem);
    },
    async editMenuItem(state, data) {
      const formBaseUrl = "http://localhost:3000/menu/";
      const filesBaseUrl = "http://localhost:3000/menu/image/";

      console.log("editMenuItem mutation");

      const menuItem = await axios
        .patch(formBaseUrl + data.id, data.form)
        .then((res) => {
          return res.data;
        });

      state.showSpinner = true;

      if (data?.file) {
        const formData = new FormData();
        formData.append("file", data.file);

        await axios.post(filesBaseUrl + menuItem.id, formData).then((res) => {
          console.log(res.data);
          menuItem.imageUrl = res.data.url;
        });
      }
      console.log("edited menu item", menuItem);
      state.showSpinner = false;
      const index = state.menuItems.findIndex(
        (item) => item.id === menuItem.id
      );
      state.menuItems[index] = menuItem;
    },
    setEditData(state, data = null) {
      state.editData = data;
    },
  },
  actions: {
    fetchCategories({ commit }) {
      const baseUrl = "http://localhost:3000/category";

      axios
        .get(baseUrl)
        .then((res) => commit("setCategories", res.data))
        .catch((e) => console.log(e));
    },
    fetchMenuItems({ commit }) {
      const baseUrl = "http://localhost:3000/menu";

      axios
        .get(baseUrl)
        .then((res) => commit("setMenuItems", res.data))
        .catch((e) => console.log(e));
    },
  },
  modules: {},
});
