<template>
  <div class="main_page">
    <p class="title">Projects</p>
    <b-icon
      icon="plus"
      class="add-icon"
      @click="show_addProject_modal"
    ></b-icon>
    <b-table striped hover :items="projects" :fields="fields">
      <template v-slot:cell(name)="data">
        <p @click="navigateToProject(data)" class="project_link">
          {{ data.value }}
        </p>
        <b-icon
          icon="trash-fill"
          class="trash"
          @click="deleteProject(data.item._id)"
        ></b-icon>
      </template>
    </b-table>
    <b-modal
      size="md"
      centered
      ref="addModal"
      hide-footer
      title="Add a project"
    >
      <div class="modal_input">
        <b-col sm="2">
          <label for="input-small">Name</label>
        </b-col>
        <b-col sm="10">
          <b-form-input
            id="input-small"
            @keyup.enter="addProject"
            v-model="project_name"
            size="sm"
            placeholder="Enter project name"
          ></b-form-input>
        </b-col>
      </div>
      <b-button variant="outline-danger" @click="addProject">Add</b-button>
    </b-modal>
  </div>
</template>

<script>
import { BIcon } from "bootstrap-vue";
import { mapState } from "vuex";

export default {
  components: {
    BIcon,
  },
  data() {
    return {
      project_name: "",
      fields: [
        {
          key: "name",
          label: "Name",
          sortable: true,
        },
        {
          key: "avgPerf",
          label: "Avg. Performance",
          sortable: true,
        },
        {
          key: "avgAccess",
          label: "Avg. Accessibillity",
          sortable: true,
        },
        {
          key: "avgSeo",
          label: "Avg. SEO",
          sortable: true,
        },
        {
          key: "avgBestP",
          label: "Avg. Best Practices",
          sortable: true,
        },
      ],
    };
  },
  methods: {
    show_addProject_modal() {
      this.project_name = "";
      this.$refs["addModal"].show();
    },
    addProject() {
      this.$store.dispatch("addProject", this.project_name);
      this.$refs["addModal"].hide();
    },
    deleteProject(id) {
      this.$store.dispatch("deleteProject", id);
    },
    navigateToProject(data) {
      this.$store.dispatch("setActiveProject", data.item);
      this.$router.push({ path: data.value });
    },
  },
  mounted() {
    this.$store.dispatch("setInitialPage", true);
    this.$store.dispatch("saveProjects");
  },
  computed: mapState(["fetched", "projects"]),
};
</script>

<style>
.title {
  margin-top: 50px;
  margin-bottom: 30px;
  margin-left: 20px;
  font-size: 35px;
  font-weight: 700;
  color: black;
}

.main_page {
  width: 88%;
  margin-left: 2%;
}

.add-icon {
  width: 80px;
  height: 80px;
  cursor: pointer;
  float: right;
  margin-right: 20px;
  transition: ease-out;
}

.add-icon:hover {
  transform: scale(1.3);
}

.addmodal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.modal_input {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.modal-body {
  text-align: center;
}

.col-sm-2 {
  margin-top: 5px;
}

.trash {
  float: right;
  cursor: pointer;
}

.project_link {
  cursor: pointer;
  color: blue;
  display: inline;
}
</style>
