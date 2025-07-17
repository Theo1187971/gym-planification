<template>
  <v-container class="py-8">
    <v-btn color="orange-darken-2" text @click="addSession()">Add Session</v-btn>

    <SessionList :sessions="SessionRef?.SessionList || []" @delete-session="onDeleteSession" />

    <v-dialog v-model="dialogAddSession" max-width="600">
      <v-card>
        <!-- Barre du haut avec bouton X -->
        <v-card-title class="d-flex justify-space-between align-center">
          <span></span>
          <v-btn icon variant="text" @click="cancelAddSession()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <!-- Composant Session -->
        <v-card-text>
          <Session ref="SessionRef"/>
        </v-card-text>

        <!-- Boutons d'action -->
        <v-card-actions class="d-flex justify-center" style="gap: 16px; padding-bottom: 24px;">
          <v-btn color="grey"
                 style="height: 48px; min-width: 120px; font-size: 16px;" text @click="cancelAddSession()">Cancel
          </v-btn>
          <v-btn color="red"
                 style="height: 48px; min-width: 120px; font-size: 16px;" text @click="createSession()">Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>

</template>
<script setup>
import {ref} from 'vue'
import Session from './Session.vue';
import SessionList from "@/components/SessionList.vue";

const SessionRef = ref(null);

const dialogAddSession = ref(false);

function addSession() {
  dialogAddSession.value = true;
}

function cancelAddSession() {
  dialogAddSession.value = false;
  SessionRef.value = ref(null);
}

function createSession() {
  if (SessionRef.value.SessionList !== null) {
    console.log(SessionRef.value.SessionList);
  }
  dialogAddSession.value = false;
}

function onDeleteSession(index) {
  SessionRef.value?.SessionList.splice(index, 1)
}


</script>

