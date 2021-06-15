<template>
  <div class="city-search-form">
    <v-container>
      <v-row>
        <v-col cols="12">
          <ApolloQuery :query="require('@/graphql/countries.gql')">
            <!-- :variables="{ name }" -->
            <template slot-scope="{ result: { loading, error, data } }">
              <!-- Loading -->
              <div v-if="loading" class="loading apollo">Loading...</div>

              <!-- Error -->
              <div v-else-if="error" class="error apollo">
                <v-progress-linear
                  :active="loading"
                  :indeterminate="loading"
                  absolute
                  bottom
                  color="primary"
                ></v-progress-linear>
              </div>

              <!-- Result -->
              <div v-else-if="data" class="result apollo">
                <v-autocomplete
                  clearable
                  hide-details
                  prepend-inner-icon="mdi-flag"
                  type="text"
                  autocomplete="off"
                  v-model="selectedCountry"
                  label="Country"
                  @change="foundCity($event, 'country')"
                  :items="data.countries"
                  return-object
                  item-text="name"
                  placeholder="Select A Country..."
                >
                  <template v-slot:selection="{ item }">
                    <p class="my-0">
                      <span left class="mr-2" v-html="item.emoji">{{
                        item.emoji
                      }}</span>
                      <span
                        v-text="item.name"
                        :style="{
                          fontSize: $vuetify.breakpoint.mdAndUp
                            ? '1.2rem'
                            : '0.9rem',
                        }"
                      ></span>
                    </p>
                  </template>
                  <template v-slot:item="{ item }">
                    <v-list-item-avatar
                      color="indigo"
                      class="headline font-weight-light white--text"
                    >
                      {{ item.emoji }}
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.name"></v-list-item-title>
                      <v-list-item-subtitle
                        v-text="item.countryCode"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </v-autocomplete>
              </div>
            </template>
          </ApolloQuery>
          <ApolloQuery
            :query="require('@/graphql/states.gql')"
            :variables="{ countryCode }"
          >
            <template slot-scope="{ result: { loading, error, data } }">
              <!-- Loading -->
              <div v-if="loading" class="loading apollo"></div>

              <!-- Error -->
              <div v-else-if="error" class="error apollo">
                <!-- <v-progress-linear
                  active
                  indeterminate
                  absolute
                  bottom
                  color="warning"
                ></v-progress-linear> -->
              </div>

              <!-- Result -->
              <div v-else-if="data" class="result apollo">
                <v-scroll-y-transition>
                  <v-autocomplete
                    clearable
                    hide-details
                    v-show="countryCode"
                    prepend-inner-icon="mdi-flag"
                    type="text"
                    autocomplete="off"
                    v-model="selectedState"
                    label="State"
                    @change="foundCity($event, 'state')"
                    :items="data.statesByCountry"
                    return-object
                    item-text="name"
                    placeholder="Select A State..."
                  >
                    <template v-slot:selection="{ item }">
                      <p class="my-0">
                        <span left class="mr-2" v-html="item.stateCode">{{
                          item.stateCode
                        }}</span>
                        <span
                          v-text="item.name"
                          :style="{
                            fontSize: $vuetify.breakpoint.mdAndUp
                              ? '1.2rem'
                              : '0.9rem',
                          }"
                        ></span>
                      </p>
                    </template>
                    <template v-slot:item="{ item }">
                      <v-list-item-avatar
                        color="indigo"
                        class="headline font-weight-light white--text"
                      >
                        {{ item.stateCode }}
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title
                          v-text="item.name"
                        ></v-list-item-title>
                        <v-list-item-subtitle
                          v-text="item.countryCode"
                        ></v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                  </v-autocomplete>
                </v-scroll-y-transition>
                <v-btn
                  v-if="!selectedState"
                  block
                  text
                  class="mt-2 text-capitalize"
                  @click="toggleAddStateDrawer(true)"
                  ><v-icon left>mdi-map-marker-alert-outline</v-icon> State
                  <span v-if="$vuetify.breakpoint.mdAndUp" class="mx-1"
                    >Data</span
                  >
                  Missing? (Add
                  {{ $vuetify.breakpoint.mdAndUp ? "a State)" : "it)" }}</v-btn
                >
                <!-- <AddStateModal
                  v-if="!selectedState"
                  :selectedCountry="selectedCountry"
                /> -->
              </div>
            </template>
          </ApolloQuery>
          <ApolloQuery
            :query="require('@/graphql/cities.gql')"
            :variables="{ countryCode, stateCode }"
          >
            <template slot-scope="{ result: { loading, error, data } }">
              <!-- Loading -->
              <div v-if="loading" class="loading apollo">Loading...</div>

              <!-- Error -->
              <div v-else-if="error" class="error apollo">
                <v-progress-linear
                  active
                  indeterminate
                  absolute
                  bottom
                  color="primary"
                ></v-progress-linear>
              </div>

              <!-- Result -->
              <div v-else-if="data" class="result apollo">
                <v-scroll-y-transition group leave-absolute>
                  <v-autocomplete
                    :key="1"
                    clearable
                    hide-details
                    v-show="stateCode && countryCode"
                    prepend-inner-icon="mdi-city"
                    type="text"
                    autocomplete="off"
                    v-model="selectedCity"
                    label="City"
                    :items="data.citiesByState"
                    @change="foundCity($event, 'city')"
                    return-object
                    item-text="name"
                    placeholder="Select A City..."
                  >
                    <template v-slot:append-outer>
                      <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            @click="useUserLocation"
                            color="primary"
                            icon
                            dark
                            v-bind="attrs"
                            v-on="on"
                          >
                            <v-icon>mdi-map-marker</v-icon>
                          </v-btn>
                        </template>
                        <span>Use My Current Location</span>
                      </v-tooltip>
                    </template>
                    <template v-slot:selection="{ item }">
                      <p class="my-0">
                        <span left class="mr-2" v-html="item.stateCode">{{
                          item.stateCode
                        }}</span>
                        <span
                          v-text="item.name"
                          :style="{
                            fontSize: $vuetify.breakpoint.mdAndUp
                              ? '1.2rem'
                              : '0.9rem',
                          }"
                        ></span>
                      </p>
                    </template>
                    <template v-slot:item="{ item }">
                      <v-list-item-avatar class="headline font-weight-light">
                        <v-icon>mdi-city</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title
                          v-text="item.name"
                        ></v-list-item-title>
                        <v-list-item-subtitle
                          v-text="item.countryCode"
                        ></v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                  </v-autocomplete>
                  <v-btn
                    block
                    :key="2"
                    v-if="!selectedCity"
                    class="mt-2 text-capitalize subtitle"
                    text
                    @click="toggleAddCityDrawer(true)"
                    ><v-icon left>mdi-map-marker-alert-outline</v-icon> City
                    <span v-if="$vuetify.breakpoint.mdAndUp" class="mx-1"
                      >Data</span
                    >
                    Missing? (Add
                    {{ $vuetify.breakpoint.mdAndUp ? "a City)" : "it)" }}</v-btn
                  >
                  <v-btn block :key="3" v-if="selectedCity" class="mt-2"
                    ><v-icon left>mdi-map-marker-check</v-icon> Found My City
                    😊</v-btn
                  >
                </v-scroll-y-transition>
              </div>

              <!-- No result -->
              <div v-else class="no-result apollo text-center mt-2">
                Loading
              </div>
            </template>
          </ApolloQuery>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// import AddStateModal from "../modals/AddStateModal.vue";
import { mapActions } from "vuex";
export default {
  components: {
    // AddStateModal,
  },
  data() {
    return {
      selectedCountry: "",
      selectedState: "",
      selectedCity: "",
    };
  },
  computed: {
    countryCode() {
      if (this.selectedCountry) {
        return this.selectedCountry.countryCode;
      }
      return null;
    },
    stateCode() {
      if (this.selectedState) {
        return this.selectedState.stateCode;
      }
      return null;
    },
  },
  methods: {
    ...mapActions([
      "toggleAddStateDrawer",
      "toggleAddCityDrawer",
      "setSelectedCountry",
      "setSelectedState",
      "showToast",
    ]),
    foundCity(e, type) {
      console.log({ e, type });
      if (type === "country") {
        this.setSelectedCountry({ selectedCountry: e });
        if (!e) {
          this.toggleAddStateDrawer(false);
          this.toggleAddCityDrawer(false);
          this.selectedState = null;
          this.selectedCity = null;
          this.setSelectedState({ selectedState: e });
        }
      }
      if (type === "state") {
        this.setSelectedState({ selectedState: e });
        this.selectedCity = null;
        this.toggleAddStateDrawer(false);
        this.toggleAddCityDrawer(false);
      }

      if (type === "city") {
        this.toggleAddCityDrawer(false);
      }
      this.$emit("foundCity", { city: e, type });
    },
    useUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            this.$emit("foundCity", {
              city: { latitude, longitude },
              type: "city",
            });

            console.log(position);
          },
          (error) => {
            this.showToast({
              show: true,
              sclass: "error",
              message: "Error getting Your location",
              timeout: 2000,
            });
            console.log(error);
          }
        );
      } else {
        this.showToast({
          show: true,
          sclass: "error",
          message: "Your Geolocation is disabled",
          timeout: 2000,
        });
      }
    },
  },
};
</script>

<style>
</style>