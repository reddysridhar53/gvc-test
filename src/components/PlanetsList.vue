<template>
  <div class="main-container-inner">
    <h1>Planets in Galaxy</h1>
    <div class="list-container">
      <div class="planets-list-container">
        <div class="search-query">
          <input name="query" 
            v-model="searchQuery" 
            @input="searchPlanets(this)" 
            placeholder="search by planet name" 
            class='search-input'>
            <div class="next-prev">
              <div class="page-no">
                {{page}}/{{totalCount}}
              </div>
              <button class="prev-btn btn"  :class="page > 1 ? 'active': 'in-active'" @click="getPrevPage()">Prev</button>
              <button class="next-btn btn"  :class="page < totalCount - 1 ? 'active': 'in-active'" @click="getNextPage()">Next</button>
            </div>
        </div>
        <div class="planets-list-loader" v-if="loadingPlanets">
          loading...
        </div>
        <div v-if="!loadingPlanets && planetsList.length" class="planets-list-container-inner">
          <table class="planets-table">
            <thead>
              <th v-for="key in columns" :key="key"
                @click="sortBy(key, sortOrder)"
                :class="{ active: sortKey == key }">
                {{ key | capitalize }}
                <span v-if="key === 'name' || key === 'population'" class="arrow" :class="sortKey === key ? sortOrder : 'asc'">
                </span>
              </th>
            </thead>
            <tbody>
              <tr class="planet-row" v-for="(planet, index) in planetsList" :key="planet.name" @click="goToPlanet(index)">
                <td v-for="key in columns" :key="key">
                  {{ key === 'no' ? ( (page - 1) * 10 + index) : planet[key] }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  export default {
      computed: mapState({
          loadingPlanets: state => state.loadingPlanets,
          planetsList: state => state.searchQuery ? state.filteredPlanetsList : state.planetsList,
          columns: state => state.planetsColumns,
          sortOrder: state => state.sortOrder,
          page: state => state.page,
          totalCount: state => Math.floor(state.totalCount / 10),
      }),
      created () {
        this.$store.dispatch('getPlanets', 1);
      },
      methods: {
        sortBy (key) {
          if(key === 'name' || key === 'population') {
            this.sortKey = key;
            this.$store.dispatch('sortPlanets', key);
          }
        },
        searchPlanets (event) {
          this.$store.dispatch('searchPlanets', this.searchQuery);
        },
        getNextPage () {
          const page = this.page ? this.page + 1 : 1;
          this.$store.dispatch('getPlanets', page);
        },
        getPrevPage () {
          const page = this.page >= 2 ? this.page - 1 : 1;
          this.$store.dispatch('getPlanets', page);
        },
        goToPlanet (index) {
          index = index + 2;
          const pageNo = this.page ? ((this.page - 1) * 10) + (index) : index;
          this.$router.push(`planets/${pageNo}`)
        }
      },
      filters: {
        capitalize: function (str) {
          return str.charAt(0).toUpperCase() + str.slice(1)
        }
      }
  }
</script>
<style scoped>
  .main-container-inner {
    background: #fff;
    box-shadow: 0 6px 26px 0 rgba(0,0,0,.09);
    max-width: 960px;
    padding: 40px;
    border-radius: 10px;
    margin: 0px auto 0;
  }
  .search-query {
    display: flex;
  }
  .search-input {
      padding: 10px;
      width: 50%;
      font-size: 1em;
      height: 40px;
      margin-bottom: 20px;
  }
  .page-no {
    margin-right: 20px;
    display: inline-block;
    font-weight: 600;
    color: #4c4c4c;
  }
  .next-prev {
    width: 50%;
    text-align: right;
  }
  .next-btn,
  .prev-btn {
    width: 100px;
    height: 40px;
    text-align: center;
    font-size: 15px;
    padding: 10px 0;
    color: #4c4c4c;
    opacity: 1;
    border-radius: 4px;
    cursor: pointer;
    transition: 500ms all;
  }
  .btn.in-active {
    pointer-events: none;
    cursor: default;
    opacity: 0.6;
  }
  .next-btn:hover,
  .prev-btn:hover {
    font-weight: 600;
  } 
  .planets-list-loader {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 300px;
    color: #4c4c4c;
  }
  .planets-table {
    width: 100%;
    border: 2px solid #42b983;
    border-radius: 3px;
    background-color: #fff;
  }
  th {
    background-color: #42b983;
    color: rgba(255,255,255,0.66);
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  td {
    background-color: #f9f9f9;
  }
  tr.planet-row {
    cursor: pointer;
  }
  tr.planet-row:hover td {
    background: rgba(255,255,255,0.66);
  }

  th, td {
    min-width: 120px;
    padding: 10px 20px;
    text-align: center;
  }

  th.active {
    color: #fff;
  }

  th.active .arrow {
    opacity: 1;
  }

  .arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
    opacity: 0.66;
  }

  .arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #fff;
  }

  .arrow.dsc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #fff;
  }
</style>