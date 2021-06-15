<template>
  <v-navigation-drawer
    v-model="showAddCityDrawer"
    style="z-index: 6"
    :style="{ width: $vuetify.breakpoint.smAndDown ? '100vw' : '256px' }"
    right
    app
  >
    <v-toolbar height="72px">
      <v-btn icon @click="toggleAddCityDrawer(false)" text>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Add A City</v-toolbar-title>
    </v-toolbar>

    <v-divider></v-divider>

    <v-container v-if="selectedCountry && selectedState">
      <v-text-field
        label="Country"
        readonly
        v-model="selectedCountry.name"
      ></v-text-field>

      <v-text-field
        label="Country Code"
        readonly
        v-model="selectedCountry.countryCode"
      ></v-text-field>

      <v-text-field
        label="State Name"
        type="text"
        autocomplete="off"
        v-model="selectedState.name"
        placeholder="e.g. Texas"
      ></v-text-field>

      <v-text-field
        label="State Code"
        type="text"
        autocomplete="off"
        :rules="[rules.max]"
        v-model="selectedState.stateCode"
        placeholder="e.g. TX (Texas)"
      ></v-text-field>

      <v-text-field
        label="City Name"
        autofocus
        placeholder="e.g. Dallas"
        autocomplete="off"
        type="text"
        v-model="cityData.name"
      ></v-text-field>
      <v-alert color="info" dark class="caption py-2"
        >⚠ click map or drag marker to set coordinates</v-alert
      >
      <v-text-field readonly :value="lat" label="latitude"></v-text-field>

      <v-text-field readonly :value="long" label="longitude"></v-text-field>
      <v-expand-transition>
        <v-alert v-show="message" dark class="my-2 py-1" color="success">
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
          >
            {{ message }}
            <v-btn text @click="message = ''">ok</v-btn>
          </div>
        </v-alert>
      </v-expand-transition>
      <v-btn
        x-large
        color="primary"
        :disabled="!formValid"
        block
        @click="checkCityData"
        ><v-icon>mdi-plus-thick</v-icon> Add this City</v-btn
      >
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ADD_CITY_QUERY from "@/graphql/addCityRequest.gql";
export default {
  data() {
    return {
      message: "",

      drawer: false,
      cityData: {
        countryCode: this.selectedCountry
          ? this.selectedCountry.countryCode
          : null,
        countryName: this.selectedCountry ? this.selectedCountry.name : null,

        name: "",
        latitude: this.lat,
        longitude: this.long,
        addedToData: false,
      },
      rules: {
        required: (value) =>
          !!value ||
          "Required. Usually the first Letter and next consonant of the city name",
        max: (v) =>
          v?.length <= 2 ||
          "Max 2 characters - Usually the first Letter and next consonant of the city name",
      },
    };
  },
  computed: {
    ...mapGetters([
      "selectedCountry",
      "selectedState",
      "showAddCityDrawer",
      "lat",
      "long",
    ]),
    formValid() {
      if (this.cityData.name) {
        return true;
      }
      return false;
    },
  },
  methods: {
    ...mapActions(["showToast", "toggleAddCityDrawer"]),
    sendCityRequest() {
      this.cityData.latitude = this.lat;
      this.cityData.longitude = this.long;
      this.$apollo.mutate({
        mutation: ADD_CITY_QUERY,
        variables: {
          cityData: this.cityData,
        },
        update: (
          store,
          // {
          //   data: {
          //     deleteHobby: { id },
          //   },
          // }
          { data }
        ) => {
          console.log({ data });
          this.message = "🙏 Thank you 💜";

          this.cityData.name = "";
          // console.log({ id });
          // const data = store.readQuery({
          //   query: HOBBIES_QUERY,
          //   variables: {
          //     searchText: "",
          //   },
          // });
          // data.hobbies = data.hobbies.filter((x) => x.id != id);

          // store.writeQuery({
          //   query: HOBBIES_QUERY,
          //   variables: {
          //     searchText: "",
          //   },
          //   data,
          // });
          setTimeout(() => {
            this.toggleAddCityDrawer(false);
            this.message = "";
          }, 1000);
          this.showToast({
            show: true,
            message: "City Request Sent",
            sclass: "success",
            timeout: 3000,
          }).then((timeout) => {
            setTimeout(() => {
              this.showToast({ show: false });
            }, timeout);
          });
        },
      });
    },
    cityRequestAdded(e) {
      console.log({ e });
    },
    checkCityData() {
      this.cityData.countryName = this.selectedCountry.name;
      this.cityData.countryCode = this.selectedCountry.countryCode;
      this.cityData.stateName = this.selectedState.name;
      this.cityData.stateCode = this.selectedState.stateCode;
      this.cityData.longitude = this.long;
      this.cityData.latitude = this.lat;
      console.log({ cityData: this.cityData });
      this.sendCityRequest();
    },
  },
};
</script>

<style>
</style>