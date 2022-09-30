<template>
  <div
    class="modal fade"
    id="menuItemModal"
    tabindex="-1"
    aria-labelledby="menuItemModalLabel"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="menuItemModalLabel">
            {{ editData ? "Edit" : "Create" }} menu position
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form class="row g-3 text-start">
            <div class="col-12">
              <label for="title" class="form-label">Title</label>
              <input
                v-model="form.title"
                type="text"
                class="form-control"
                id="title"
              />
            </div>
            <div class="col-12">
              <label for="price" class="form-label">Price</label>
              <input
                v-model="form.price"
                type="text"
                class="form-control"
                id="price"
              />
            </div>
            <div class="col-12">
              <label for="weight" class="form-label">Weight</label>
              <input
                v-model="form.weight"
                type="text"
                class="form-control"
                id="weight"
              />
            </div>
            <div class="col-12">
              <label for="protein" class="form-label">Protein</label>
              <input
                v-model="form.protein"
                type="text"
                class="form-control"
                id="protein"
              />
            </div>
            <div class="col-12">
              <label for="fats" class="form-label">Fats</label>
              <input
                v-model="form.fats"
                type="text"
                class="form-control"
                id="fats"
              />
            </div>
            <div class="col-12">
              <label for="carbs" class="form-label">Carbs</label>
              <input
                v-model="form.carbs"
                type="text"
                class="form-control"
                id="carbs"
              />
            </div>
            <div class="col-12">
              <label for="category" class="form-label">Carbs</label>
              <select
                v-model="form.categoryId"
                class="form-select"
                aria-label="Default select example"
                id="category"
              >
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.title }}
                </option>
              </select>
            </div>
            <div class="col-12">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="form.spicy"
                  id="spicy"
                />
                <label class="form-check-label" for="spicy">Spicy</label>
              </div>
            </div>
            <div class="col-12">
              <label for="description" class="form-label">Description</label>
              <textarea
                v-model="form.description"
                class="form-control"
                id="description"
              ></textarea>
            </div>
            <div class="col-12">
              <label for="file" class="form-label">Изображение</label>
              <input
                @change="fileHandeler"
                class="form-control"
                type="file"
                id="file"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            v-if="editData"
            type="button"
            class="btn btn-primary"
            @click="editMenuItemHandler"
          >
            Edit
          </button>
          <button
            v-else
            type="button"
            class="btn btn-primary"
            @click="createMenuItemHandler"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const defaultForm = {
  title: "",
  price: undefined,
  weight: undefined,
  protein: undefined,
  fats: undefined,
  carbs: undefined,
  description: "",
  categoryId: 1,
  spicy: false,
};

export default {
  name: "MenuItemModal",
  data: () => ({
    form: {
      title: "",
      price: undefined,
      weight: undefined,
      protein: undefined,
      fats: undefined,
      carbs: undefined,
      description: "",
      categoryId: 1,
      spicy: false,
    },
    file: null,
  }),
  watch: {
    "form.price"(value) {
      this.form.price = isNaN(value) ? undefined : +value;
    },
    "form.weight"(value) {
      this.form.weight = isNaN(value) ? undefined : +value;
    },
    "form.protein"(value) {
      this.form.protein = isNaN(value) ? undefined : +value;
    },
    "form.fats"(value) {
      this.form.fats = isNaN(value) ? undefined : +value;
    },
    "form.carbs"(value) {
      this.form.carbs = isNaN(value) ? undefined : +value;
    },
    "form.categoryId"(value) {
      this.form.categoryId = isNaN(value) ? undefined : +value;
    },
    editData(value) {
      if (!value) {
        this.form = defaultForm;
      } else {
        for (let key in defaultForm) {
          this.form[key] = key in value ? value[key] : defaultForm[key];
        }
      }
    },
  },
  methods: {
    createMenuItemHandler() {
      this.$store.commit("createMenuItem", {
        form: this.form,
        file: this.file,
      });
    },
    editMenuItemHandler() {
      this.$store.commit("editMenuItem", {
        id: this.editData.id,
        form: this.form,
        file: this.file,
      });
    },
    fileHandeler(event) {
      this.file = event.target.files[0];
    },
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    },
    editData() {
      return this.$store.state.editData;
    },
  },
  mounted() {},
};
</script>
