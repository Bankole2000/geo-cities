<template>
  <div class="add-state-modal" style="z-index: 3">
    <ApolloMutation
      :mutation="require('@/graphql/addStateRequest.gql')"
      :variables="{
        stateData: stateData,
      }"
      class="form"
      @done="stateRequestAdded"
    >
      <template slot-scope="{ mutate }">
        <form v-on:submit.prevent="formValid && mutate()">
          <v-dialog scrollable v-model="dialog" fullscreen width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn block text class="mt-2" v-bind="attrs" v-on="on"
                ><v-icon left>mdi-map-marker-off-outline</v-icon> My State Isn't
                On the list</v-btn
              >
            </template>

            <v-card>
              <v-card-title class="headline">
                Can't find Your State / Province?
              </v-card-title>
              <v-divider></v-divider>

              <v-card-text class="pt-0">
                <v-row>
                  <v-col cols="12">
                    <v-row>
                      <v-col cols="8">
                        <v-text-field
                          label="Country"
                          readonly
                          hide-details
                          v-model="selectedCountry.name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          label="Country Code"
                          readonly
                          hide-details
                          v-model="selectedCountry.countryCode"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="8" class="py-0">
                        <v-text-field
                          label="State"
                          type="text"
                          hide-details
                          v-model="stateData.name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4" class="py-0">
                        <v-text-field
                          label="State Code"
                          type="text"
                          hide-details
                          v-model="stateData.stateCode"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <div style="height: 40vh; width: 100%">
                          <l-map
                            @click="moveMarker"
                            @ready="mapReady()"
                            :zoom="1"
                            :center="[stateData.latitude, stateData.longitude]"
                          >
                            <!-- url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" -->
                            <l-tile-layer
                              :url="
                                !$vuetify.theme.dark
                                  ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                                  : 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
                              "
                            ></l-tile-layer>
                            <l-marker
                              @dragend="moved"
                              draggable
                              :lat-lng="[
                                stateData.latitude,
                                stateData.longitude,
                              ]"
                            >
                              <l-tooltip>My City is here!</l-tooltip>
                            </l-marker>
                          </l-map>
                        </div>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6" class="py-0">
                        <v-text-field
                          label="latitude"
                          v-model="stateData.latitude"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" class="py-0">
                        <v-text-field
                          label="longitude"
                          v-model="stateData.longitude"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog = false">
                  I accept
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </form>
      </template>
    </ApolloMutation>
  </div>
</template>

<script>
export default {
  props: ["selectedCountry"],
  data() {
    return {
      dialog: false,
      stateData: {
        countryCode: this.selectedCountry.countryCode,
        countryName: this.selectedCountry.name,
        stateCode: "",
        name: "",
        latitude: 0,
        longitude: 0,
        addedToData: false,
      },
    };
  },
  methods: {
    stateRequestAdded(e) {
      console.log({ e });
    },
    moved(e) {
      console.log(e);
      const { lat, lng } = e.target._latlng;
      this.stateData.latitude = lat;
      this.stateData.longitude = lng;
    },
    moveMarker(e) {
      console.log({ e });
      const {
        latlng: { lat, lng },
      } = e;
      this.stateData.latitude = lat;
      this.stateData.longitude = lng;
    },
    mapReady(e) {
      console.log({ e });
      this.stateData.latitude = this.selectedCountry.latitude;
      this.stateData.longitude = this.selectedCountry.longitude;
    },
  },
};
</script>

<style>
</style>