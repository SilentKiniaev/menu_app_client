<template>
  <div>
    <categories-tabs></categories-tabs>
    <menu-item-modal></menu-item-modal>
    <nav class="nav nav-pills nav-fill">
      <button
        type="button"
        class="btn btn-dark"
        data-bs-toggle="modal"
        data-bs-target="#menuItemModal"
        @click="clearEditData"
      >
        Create
      </button>
    </nav>

    <div class="container mt-4">
      <div class="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-4">
        <div class="col" v-for="item of menuItems" :key="item.id">
          <menu-item :data="item"></menu-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuItem from "@/components/MenuItem.vue";
import CategoriesTabs from "@/components/CategoriesTabs.vue";
import MenuItemModal from "@/modals/MenuItemModal.vue";

export default {
  name: "MenuView",
  data: () => ({}),
  components: {
    MenuItem,
    CategoriesTabs,
    MenuItemModal,
  },
  methods: {
    clearEditData() {
      this.$store.commit("setEditData");
    },
  },
  computed: {
    menuItems() {
      return this.$store.getters.getMenuItems;
    },
  },
  mounted() {
    this.$store.dispatch("fetchMenuItems");
  },
};
</script>
