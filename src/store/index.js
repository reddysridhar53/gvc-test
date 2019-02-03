import Vue from 'vue'
import Vuex from 'vuex'
import * as planets from '../api/planets';

Vue.use(Vuex)

const state = {
    planetsList: [],
    planetById: {},
    loadingPlanets: false,
    loadingPlanetById: false,
    sortOrder: 'asc',
    searchQuery: '',
    filteredPlanetsList: [],
    planetsColumns: ['no', 'name', 'population', 'terrain'],
    page: 1,
    loadingPeopleOnPlanet: false,
    residentsList: {},
    totalCount: 0,
}

const getters = {};

const actions = {
    getPlanets ({ commit, state }, page) {
        commit('getPlanets', page);
        planets.getPlanets(page)
        .then( res => {
            const planets = parseJson(res);
            commit('setTotalPlanets', planets.count);
            commit('setPlanets', planets.results);
        }, err => {
            commit('setPlantes', err);
        })
    },
    getPlanetById({ commit, state}, planetId) {
        commit('getPlanetById');
        planets.getPlanetById(planetId)
        .then( res => {
            const planetDetails = parseJson(res);
            commit('setPlanetById', planetDetails);
            return planets.getPlanetResidents(planetDetails.residents)
        })
        .then( res => {
            commit('setResidentsList', res);
        })
        .catch( err => {
            console.log('Error: ', err);
        })
    },
    sortPlanets({ commit, state}, key) {
        const planetsList = state.planetsList;
        const sortBy = state.sortOrder === 'asc' ? 1 : -1;

        planetsList.sort( (a, b) => {
            a = a[key]
            b = b[key]
            if(key === 'population') {
                a = parseInt(a, 10);
                b = parseInt(b, 10);
            }
            return (a === b ? 0 : a > b ? 1 : -1) * sortBy;
        })
        commit('setPlanets', planetsList);
    },
    searchPlanets({ commit, state}, searchQuery) {
        const planetsList = state.planetsList;
        const searchKey = 'name';

        const filteredPlanetsList = planetsList.filter( (planet) => {
            const planetName = planet[searchKey];
            return String(planetName).toLowerCase().indexOf(searchQuery) > -1;
        })
        commit('setSearchQuery', searchQuery);
        commit('setFilteredPlanets', filteredPlanetsList);
    },

}

const mutations = {
    getPlanets (state, page) {
        state.loadingPlanets = true;
        state.page = page;
    },
    setPlanets (state, planets) {
        const planetsList = planets;
        state.loadingPlanets = false;
        state.sortOrder = state.sortOrder === 'asc' ? 'dsc' : 'asc';
        state.planetsList = planetsList;
    },
    setFilteredPlanets (state, planets) {
        state.filteredPlanetsList = planets;
    },
    setSearchQuery (state, query) {
        state.searchQuery = query;
    },
    getPlanetById (state) {
        state.loadingPeopleOnPlanet = true;
        state.loadingPlanetById = true;
    },
    setPlanetById (state, planet) {
        state.loadingPlanetById = false;
        state.planetById = planet;
    },
    setPage (state, page) {
        state.page = page;
    },
    setResidentsList (state, response) {
        state.loadingPeopleOnPlanet = false;
        state.residentsList = response.map(res => parseJson(res));
    },
    setTotalPlanets (state, count) {
        state.totalCount = count;
    }
}

const parseJson = (data) => {
    if(data && JSON.parse(data)) {
        return JSON.parse(data);
    }
    return new Error('Something is wrong with the JSON Format: ');
}

export default new Vuex.Store({
  namespaced: true,
  state,
  getters,
  actions,
  mutations
});
