<template>
  <div class="main_page">
    <p class="title">{{ activeProject.name }}</p>
    <b-icon icon="plus" class="add-icon" @click="show_addLink_modal"></b-icon>
    <b-table striped hover :items="links" :fields="fields">
      <template v-slot:cell(name)="data">
        <a
          :href="
            `${activeProject.name}/${data.value
              .replace(/[^a-z1-9]+/i, '-')
              .toLowerCase()}`
          "
          >{{ data.value }}</a
        >
      </template>
      <!-- <template v-slot:cell(actions)="data">
        <Link :data="data" />
      </template> -->
    </b-table>
    <b-modal
      size="md"
      centered
      ref="addLinkModal"
      hide-footer
      title="Add a link"
    >
      <div class="modal_input">
        <b-col sm="2">
          <label for="input-small">Link</label>
        </b-col>
        <b-col sm="10">
          <b-form-input
            id="input-small"
            @keyup.enter="addLink"
            v-model="link_name"
            size="sm"
            placeholder="Enter link name"
          ></b-form-input>
        </b-col>
      </div>
      <b-button variant="outline-danger" @click="addLink">Add</b-button>
    </b-modal>
  </div>
</template>

<script>
import { BIcon } from "bootstrap-vue";
import { mapState } from "vuex";
// import Link from "./Link.vue";

export default {
  components: {
    BIcon,
    // Link,
  },
  data() {
    return {
      link_name: "",
      fields: [
        {
          key: "name",
          label: "Link",
          sortable: true,
        },
        {
          key: "perf",
          label: "Performance",
          sortable: true,
        },
        {
          key: "access",
          label: "Accessibillity",
          sortable: true,
        },
        {
          key: "seo",
          label: "SEO",
          sortable: true,
        },
        {
          key: "bestP",
          label: "Best Practices",
          sortable: true,
        },
        {
          key: "actions",
          label: "",
        },
      ],
    };
  },
  methods: {
    show_addLink_modal() {
      this.link_name = "";
      this.$refs["addLinkModal"].show();
    },

    addLink() {
      let link = {
        name: this.link_name,
        projectId: this.activeProject._id,
      };

      this.$store.dispatch("addLink", link);

      this.$refs["addLinkModal"].hide();
    },
  },
  mounted() {
    this.$store.dispatch("setInitialPage", false);

    fetch(`http://localhost:3000/links/${this.project_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.items = data.links;

        this.items.forEach((item) => {
          item.access == null
            ? (item.access = "n/a")
            : (item.access = item.access * 100);
          item.performance == null
            ? (item.performance = "n/a")
            : (item.performance = item.performance * 100);
          item.seo == null ? (item.seo = "n/a") : (item.seo = item.seo * 100);
          item.bestpractices == null
            ? (item.bestpractices = "n/a")
            : (item.bestpractices = item.bestpractices * 100);
        });
      });
  },
  computed: mapState(["activeProject", "links"]),
};
</script>

<style>
.trash {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.trash:hover {
  transform: scale(1.4);
}

.loader {
  border: 5px solid #daddd8;
  border-top: 5px solid black;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.actions_wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}
</style>
