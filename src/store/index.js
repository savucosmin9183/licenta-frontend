import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    projects: [],
    activeProject: {},
    links: [],
    fetched: false,
    initial_page: true,
  },
  mutations: {
    setProjects(state, [payload]) {
      state.projects = payload;
    },
    addProject(state, [payload]) {
      state.projects.push(payload);
    },
    deleteProject(state, [id]) {
      state.projects = state.projects.filter((project) => project._id != id);
    },
    setLinks(state, [payload]) {
      state.links = payload;
    },
    addLink(state, [payload]) {
      state.links.push(payload);
    },
    deleteLink(state, [id]) {
      state.links = state.links.filter((link) => link._id != id);
    },
    setField(state, [fieldName, payload]) {
      state[fieldName] = payload;
    },
    setActiveProject(state, [payload]) {
      state.activeProject = payload;
    },
  },
  actions: {
    saveProjects({ commit }) {
      fetch("http://localhost:3000/projects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          commit("setProjects", [data]);
        });
    },
    addProject({ commit }, name) {
      fetch("http://localhost:3000/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify({
          name: name,
          avgPerf: 0,
          avgAccess: 0,
          avgSeo: 0,
          avgBestP: 0,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          let project = {
            id: data._id,
            name: data.name,
            avgPerf: 0,
            avgAccess: 0,
            avgSeo: 0,
            avgBestP: 0,
          };

          commit("addProject", [project]);
        });
    },
    deleteProject({ commit }, id) {
      fetch(`http://localhost:3000/projects/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      })
        .then((response) => response.json())
        .then(() => {
          commit("deleteProject", [id]);
        });
    },

    saveLinks({ commit }) {
      fetch("http://localhost:3000/links", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          commit("setLinks", [data]);
        });
    },
    addLink({ commit }, link) {
      console.log(link);
      fetch("http://localhost:3000/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify({
          name: link.name,
          projectId: link.projectId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          let link = {
            id: data._id,
            name: data.name,
            projectId: data.projectId,
          };

          commit("addLink", [link]);
        });
    },
    deleteLink({ commit }, id) {
      fetch(`http://localhost:3000/links/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      })
        .then((response) => response.json())
        .then(() => {
          commit("deleteLink", [id]);
        });
    },
    setFetched({ commit }, value) {
      commit("setField", ["fetched", value]);
    },
    setInitialPage({ commit }, value) {
      commit("setField", ["initial_page", value]);
    },
    setActiveProject({ commit }, project) {
      commit("setActiveProject", [project]);
    },
  },
});
