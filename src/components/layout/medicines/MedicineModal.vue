<script lang="ts">
    import { defineComponent, computed, ref } from 'vue';
    import { useVuelidate } from '@vuelidate/core'
    import { required, minValue } from  '@vuelidate/validators'
    import type { Medicine } from '@/types/medicines';
    export default defineComponent({
        name: 'MedicineModal',
        props: {
            isOpen: {type: Boolean, required: true}
        },
        emits: ['hide'],
        setup(props, { emit }){
            let isLoading = ref(false); 
            const isModalOpen = computed(()=>props.isOpen);
            const medicine = ref<Medicine>({
                name: '',
                description: '',
                provider: '',
                doctorSignature: '',
                qty: 0,
            })
            const rules = computed(()=>({
                name: { required },
                description:{ required },
                provider: { required },
                doctorSignature: { required },
                qty: { required , minValue: minValue(1)},
            }))

            const v$ = useVuelidate(rules, medicine)

            const handleSubmit = async() => {
                const isFormValid = await v$.value.$validate()
                console.log(isFormValid)
                if (!isFormValid) {
                    return
                }
                isLoading.value = true
                //guardar en base de datos
                isLoading.value = false
            }

            return {
                v$,
                emit,
                isModalOpen,
                handleSubmit,
                isLoading
            }
        }
    })
</script>

<template>
    <div v-show="isModalOpen" class="custom-modal-overlay">
      <div class="custom-modal">
        <div class="columns is-multiline px-5">
          <div class="column is-12">
            <div class="field">
              <label class="has-text-grey has-text-weight-light">Nombre</label>
              <div class="control">
                <input v-model="v$.name.$model" class="input" type="text" />
              </div>
              <p v-if="v$.name.$error" class="has-text-danger">Campo obligatorio</p>
            </div>
          </div>
          <div class="column is-12">
            <div class="field">
              <label class="has-text-grey has-text-weight-light">Descripción</label>
              <div class="control">
                <textarea v-model="v$.description.$model" class="textarea" />
              </div>
              <p v-if="v$.description.$error" class="has-text-danger">Campo obligatorio</p>
            </div>
          </div>
          <div class="column is-6">
            <div class="field">
              <label class="has-text-grey has-text-weight-light">Cantidad</label>
              <div class="control">
                <input v-model="v$.qty.$model" class="input" type="text" />
              </div>
              <p v-if="v$.qty.minValue.$invalid" class="has-text-danger">la cantidad minima es 1</p>
              <p v-if="v$.qty.required.$invalid" class="has-text-danger">Campo obligatorio</p>
            </div>
          </div>
          <div class="column is-6">
            <div class="field">
              <label class="has-text-grey has-text-weight-light">Proveedor</label>
              <div class="control">
                <input v-model="v$.provider.$model" class="input" type="text" />
              </div>
              <p v-if="v$.provider.$error" class="has-text-danger">Campo obligatorio</p>
            </div>
          </div>
          <div class="column is-12">
            <div class="field">
              <label class="has-text-grey has-text-weight-light">Firma del encargado</label>
              <div class="control">
                <input v-model="v$.doctorSignature.$model" class="input" type="text" />
              </div>
              <p v-if="v$.doctorSignature.$error" class="has-text-danger">Campo obligatorio</p>
            </div>
          </div>
          <div class="column is-12 mt-6">
            <button class="button is-primary is-fullwidth" @click="handleSubmit" :class="{'is-loading' : isLoading}">Guardar</button>
          </div>
        </div>
      </div>
      <div class="close" @click="()=>emit('hide')">
        <i class="fa fa-times"></i>
      </div>
    </div>
</template>

<style scoped>
    .custom-modal-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    background-color: #000000da;
    z-index: 9999;
    }

    .custom-modal {
    background-color: white;
    height: 600px;
    width: 700px;
    margin-top: 10%;
    padding: 40px 0;
    border-radius: 10px;
    }
    .close {
    margin: 10.5% 0 0 -25px;
    cursor: pointer;
    }
</style>