<template>
  <v-dialog persistent v-model="dialog" width="500">
    <!-- <template v-slot:activator="{ on, attrs }">
      <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
        Click Me
      </v-btn>
    </template> -->

    <v-card>
      <v-card-title class="headline"> 👋 Hello World </v-card-title>
      <v-divider></v-divider>
      <v-card-text
        class="pt-2"
        :class="
          $vuetify.theme.dark
            ? 'grey--text text--lighten-3'
            : 'grey--text text--darken-3'
        "
      >
        <p class="mb-0">Hi! I need your help 🥺.</p>
        <p>
          I'm trying to build a database of world <strong>countries</strong>,
          <strong>states</strong>, and <strong>cities</strong>. But a lot of the
          data is either <em>missing</em>, <em>incorrect</em>, or <em>old</em>,
          and I can't possibly get it all by myself.
        </p>
        <p>
          So, if you notice any missing states, or cities (maybe even your
          own!?) please add them kk? I'd be really grateful if you could help.
          Thanks 🙂
        </p>
        <v-expand-transition>
          <v-alert v-show="message" color="info" dark>{{ message }}</v-alert>
        </v-expand-transition>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="acceptedToHelp">
          Sure, I'll help
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: true,
      message: "",
    };
  },
  methods: {
    acceptedToHelp() {
      this.message = "🙏 Thanks! Awesome 😎";
      setTimeout(() => {
        this.dialog = false;
        this.message = "";
      }, 1000);
    },
  },
};
</script>

<style>
</style>