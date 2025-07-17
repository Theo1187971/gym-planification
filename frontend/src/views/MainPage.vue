    <template>

    <v-container class="py-8">
        <v-btn color="orange-darken-2" text @click="addExercise()">Add Exercise</v-btn>

        <v-dialog v-model="dialogAddExercise" max-width="600">
            <v-card>
                <!-- Barre du haut avec bouton X -->
                <v-card-title class="d-flex justify-space-between align-center">
                    <span></span>
                    <v-btn icon @click="cancelAddExercise()" variant="text">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>

                <!-- Composant Exercise -->
                <v-card-text>
                    <AddExercise ref="exerciseRef" />
                </v-card-text>

                <!-- Boutons d'action -->
                <v-card-actions class="d-flex justify-center" style="gap: 16px; padding-bottom: 24px;">
                    <v-btn color="grey" 
                        style="height: 48px; min-width: 120px; font-size: 16px;" text @click="cancelAddExercise()">Cancel</v-btn>
                    <v-btn color="red" 
                        style="height: 48px; min-width: 120px; font-size: 16px;" text @click="createExercise()">Confirm</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>

</template>
<script setup>
import { ref } from 'vue'
import AddExercise from '../components/AddExercise.vue';
import Workout from '@/components/Workout.vue';


const exerciseRef = ref(null);

const dialogAddExercise = ref(false);

function addExercise() {
    dialogAddExercise.value = true;
}

function cancelAddExercise() {
    dialogAddExercise.value = false;
    exerciseRef.value = ref(null);
}

function createExercise() {
    if(exerciseRef.value.exerciseList !== null) {
        console.log(exerciseRef.value.exerciseList);
    }
    dialogAddExercise.value = false;
}

</script>

