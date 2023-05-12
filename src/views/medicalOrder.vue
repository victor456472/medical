<script setup lang="ts">
import { createDatePicker } from 'v-calendar';
import { computed, ref } from 'vue';
import Welcome from '@/components/layout/common/Welcome.vue';
import CustomTable from '@/components/layout/shared/CustomTable.vue';
import MedicalOrderModal from '@/components/layout/medical-orders/MedicalOrderModal.vue';
import { useFirestore } from '@/composables/useFirestore';
import type { BaseColumn } from '@/types/common';
import type { MedicalOrder } from '@/types/medical-orders';

const { getCollection, addDocument } = useFirestore()

const columns = ref<BaseColumn[]>([
  {
    label: "Name",
    field: "name",
  },
  {
    label: "Comentario",
    field: "comments",
  },
  {
    label: "Asignado",
    field: "doctorSignature",
  },
  {
    label: "EPS",
    field: "eps",
  }
])

const rows = ref<MedicalOrder[]>([])

const test = ref(false)

let isModalOpen = ref(false)

const range = ref({
  start: null,
  end: null,
})

const getRecords = async () => {
  const response = await getCollection("Medical-Orders");
  rows.value = response
  console.log(response);
}

const handleSubmit = async(document: string) => {
  await addDocument('Medical-Orders', JSON.parse(document) as MedicalOrder)
  getRecords()
}

getRecords()


/* //variables o estados
const name = ref('victor')
const lastName = ref('vargas')

// propiedades computadas
const getFullName = computed(()=>name.value+' '+lastName.value)

//metodos
const edit = () => {
}

//ciclo de vida */

</script>

<template>
  <div class="columns is-multiline">
    <!-- Welcome message (This will be a component) -->
    <div class="column is-12 mt-5 mb-6">
      <!-- <div class="notification title is-size-5 is-primary">Bienvenid@ {{getFullName}}</div> -->
      <Welcome message="Bienvenid@, Victor A. Vargas"/>
    </div>

    <!-- Buttons -->
    <div class="column is-5">
      <!-- <pre>{{ range }}</pre> -->
      <VDatePicker v-model="range" is-range :masks="{ input: 'DD/MM/YYYY' }">
        <template #default="{ inputValue, inputEvents }">
          <div class="field has-addons">
            <div class="control">
              <input class="input" :value="inputValue.start" v-on="inputEvents.start" />
            </div>
            <div class="control">
              <button class="button is-primary">
                <span class="icon"> <i class="fa fa-arrow-right"></i> </span>
              </button>
            </div>
            <div class="control">
              <input class="input" :value="inputValue.end" v-on="inputEvents.end" />
            </div>
            <div class="control">
              <button class="button is-primary">
                <span class="icon mr-2"> <i class="fa fa-search"></i> </span> Consultar
              </button>
            </div>
          </div>
        </template>
      </VDatePicker>
    </div>
    <div class="column is-7 has-text-right">
      <button class="button is-primary" @click="isModalOpen = true">
        <span class="icon mr-1"> <i class="fa fa-plus"></i> </span> Agregar
      </button>
    </div>

    <!-- Table (This will be a component) -->
    <!-- TODO: add a button to download the pdf -->
    <div class="column is-12">
      <CustomTable :rows="rows" :cols="columns"/>
    </div>

    <!-- Modal (This will be a component) -->
    <MedicalOrderModal :is-open="isModalOpen" @hide="isModalOpen = false" @save="handleSubmit"/>

  </div>
</template>
