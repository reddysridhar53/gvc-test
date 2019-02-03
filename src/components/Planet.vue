<template>
  <div class="planet-details">
    <div class="planet-details-loader" v-if="loadingPlanetById">
      loading...
    </div>
    <div class="planet-details-inner" v-if="!loadingPlanetById">
      <button class="btn" @click="goToPlanets()">Go Back</button>
      <h1>{{planet.name}} -  Details</h1>
      <div class="planet-info">
        <div class="planet-info-row">
          <div class="planet-info-col left">Name:</div>
          <div class="planet-info-col right">{{planet.name}}</div>
        </div>
        <div class="planet-info-row">
          <div class="planet-info-col left">Created On:</div>
          <div class="planet-info-col right">{{(new Date(planet.created)).toDateString()}}</div>
        </div>
        <div class="planet-info-row">
          <div class="planet-info-col left">Gravity:</div>
          <div class="planet-info-col right">{{planet.gravity}}</div>
        </div>
        <div class="planet-info-row">
          <div class="planet-info-col left">Population:</div>
          <div class="planet-info-col right">{{planet.population}}</div>
        </div>
        <div class="planet-info-row">
          <div class="planet-info-col left">Rotation Period:</div>
          <div class="planet-info-col right">{{planet.rotation_period}}</div>
        </div>
      </div>
      <div v-if="!loadingPeopleOnPlanet && residentsList.length" class="planet-residents">
        <ul class="residents-list">
          <h3>Residents:</h3>
          <li class="residents-list-item" v-for="(resident, index) in residentsList" :key="index">
            {{resident.name}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
    computed: mapState({
        loadingPlanetById: state => state.loadingPlanetById,
        planet: state => state.planetById,
        residentsList: state => state.residentsList,
        loadingPeopleOnPlanet: state => state.loadingPeopleOnPlanet,
    }),
    created () {
      const planetId = this.$route.params.planetId;
      this.$store.dispatch('getPlanetById', planetId);
    },   
    methods: {
      goToPlanets () {
        this.$router.push('/planets');
      }
    }   
}
</script>

<style scoped>
  .planet-details {
    background: #fff;
    box-shadow: 0 6px 26px 0 rgba(0,0,0,.09);
    max-width: 960px;
    padding: 40px;
    border-radius: 10px;
    margin: 0px auto 0;
  }
  .planet-details-loader {
    display: flex;
    min-height: 300px;
    align-items: center;
    justify-content: center;
  }
  .btn {
    width: 100px;
    height: 30px;
    text-transform: uppercase;
    text-align: center;
    padding: 5px;
    font-size: 12px;
    color: #4c4c4c;
    cursor: pointer;
    border-radius: 4px;
  }
  .residents-list {
    display: flex;
    padding: 0;
    flex-wrap: wrap;
  }
  .residents-list h3{
    color: #4c4c4c;
    opacity: 0.9;
  }
  .residents-list-item {
    min-width: 120px;
    padding: 10px;
    margin: 10px;
    color: #4c4c4c;
    font-weight: 600;
    list-style-type: none;
    text-align: center;
    text-transform: capitalize;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.09);
  }
  .planet-info {

  }
  .planet-info-row {
    display: flex;
    min-width: 120px;
    align-items: center;
    margin: 20px 20px;
    margin-left: 0;
  }
  .planet-info-row .planet-info-col {
    color: #4c4c4c;
    opacity: 0.6;
    font-weight: 600;
    font-size: 16px;
  }
  .planet-info-row .planet-info-col:first-child {
    color: #4c4c4c;
    opacity: 0.9;
    margin-right: 10px;
    min-width: 150px;
  }
</style>
