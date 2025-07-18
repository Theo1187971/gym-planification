    <template>
        <Workout v-for="workout in workouts" :workout="workout"></Workout>
        <SessionCreation></SessionCreation>

        
    <v-container class="py-8">
        <v-btn color="orange-darken-2" text @click="addExercise()">Add Exercise</v-btn>

        <v-dialog v-model="dialogAddExercise" max-width="600">
            <v-card>
                <v-card-title class="d-flex justify-space-between align-center">
                    <span></span>
                    <v-btn icon @click="cancelAddExercise()" variant="text">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>

                <v-card-text>
                    <AddExercise ref="exerciseRef" />
                </v-card-text>

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
import { ref, onMounted } from 'vue'
import AddExercise from '@/components/AddExercise.vue';
import getSessionToken from '@/utils/auth.js';
import Workout from '@/components/Workout.vue';
import SessionCreation from '@/components/SessionCreation.vue';
import { useRouter } from 'vue-router';

const router = useRouter();


const workouts = ref(null);

onMounted(() => {
    const token = localStorage.getItem("session_token")
    fetch(`http://localhost:3000/api/user-workouts`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`)
      }
      return response.json();
    })
    .then(data => {
      console.log(data)
      workouts.value = data
    })
    .catch(error => {
      console.error('Fetching error:', error)
    });
});


const exerciseRef = ref(null);

const dialogAddExercise = ref(false);



function addExercise() {
    dialogAddExercise.value = true;
}

function cancelAddExercise() {
    dialogAddExercise.value = false;
    exerciseRef.value = ref(null);
}

async function createExercise() {
    const exerciseList = exerciseRef.value.exerciseList;
    const userToken = getSessionToken();
    if(userToken !== null) { 
        if (exerciseList && exerciseList.length > 0) {
            const payload = {
                sessionId: userToken,
                exercises: exerciseList.map(ex => ({
                    name: ex.name,
                    description: ex.description,
                    bodyParts: ex.bodyParts,
                    categoryName: ex.category || null
                }))
            };
            console.log(payload);

            try {
                const response = await fetch('http://localhost:3000/api/createExercises', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                console.log('Exercises created successfully :', result);
            } catch (error) {
                console.error('Exercises creation error :', error);
            }
        }
    } else {
        router.push('/login');
    }
    
    dialogAddExercise.value = false;
}

</script>

