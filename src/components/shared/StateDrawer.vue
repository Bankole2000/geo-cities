<template>
  <v-navigation-drawer
    :value="showAddStateDrawer && selectedCountry"
    style="z-index: 6"
    :style="{ width: $vuetify.breakpoint.smAndDown ? '100vw' : '' }"
    right
    app
    temporary
  >
    <v-toolbar height="64px">
      <v-btn icon @click="toggleAddStateDrawer(false)" text>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Add A State</v-toolbar-title>
    </v-toolbar>

    <v-divider></v-divider>

    <v-container v-if="selectedCountry">
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
        autofocus
        placeholder="e.g. Texas"
        autocomplete="off"
        type="text"
        v-model="stateData.name"
      ></v-text-field>

      <v-text-field
        label="State Code"
        type="text"
        autocomplete="off"
        :rules="[rules.max]"
        v-model="stateData.stateCode"
        placeholder="e.g. TX (Texas)"
      ></v-text-field>

      <v-text-field
        readonly
        :value="lat"
        hint="click/tap the map or drag the marker to set coordinates"
        label="latitude"
      ></v-text-field>

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
      <v-btn :disabled="!formValid" block @click="checkStateData"
        ><v-icon>mdi-plus-thick</v-icon> Add this State</v-btn
      >
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ADD_STATE_QUERY from "@/graphql/addStateRequest.gql";
export default {
  data() {
    return {
      message: "",

      drawer: false,
      stateData: {
        countryCode: this.selectedCountry
          ? this.selectedCountry.countryCode
          : null,
        countryName: this.selectedCountry ? this.selectedCountry.name : null,
        stateCode: "",
        name: "",
        latitude: this.lat,
        longitude: this.long,
        addedToData: false,
      },
      rules: {
        required: (value) =>
          !!value ||
          "Required. Usually the first Letter and next consonant of the state name",
        max: (v) =>
          v?.length <= 2 ||
          "Max 2 characters - Usually the first Letter and next consonant of the state name",
      },
    };
  },
  computed: {
    ...mapGetters(["selectedCountry", "showAddStateDrawer", "lat", "long"]),
    formValid() {
      if (
        this.stateData.name &&
        this.stateData.stateCode &&
        this.stateData.stateCode.length <= 2
      ) {
        return true;
      }
      return false;
    },
  },
  methods: {
    ...mapActions(["showToast", "toggleAddStateDrawer"]),
    sendStateRequest() {
      this.stateData.latitude = this.lat;
      this.stateData.longitude = this.long;
      this.$apollo.mutate({
        mutation: ADD_STATE_QUERY,
        variables: {
          stateData: this.stateData,
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
          this.stateData.stateCode = "";
          this.stateData.name = "";
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
            this.toggleAddStateDrawer(false);
            this.message = "";
          }, 1000);
          this.showToast({
            show: true,
            message: "State Request Sent",
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
    stateRequestAdded(e) {
      console.log({ e });
    },
    checkStateData() {
      this.stateData.countryName = this.selectedCountry.name;
      this.stateData.countryCode = this.selectedCountry.countryCode;
      this.stateData.longitude = this.long;
      this.stateData.latitude = this.lat;
      console.log({ stateData: this.stateData });
      this.sendStateRequest();
    },
  },
};
</script>

<style>
</style>