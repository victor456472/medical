<script lang="ts">
    import { defineComponent, computed, ref } from 'vue';
    import { required, minValue, maxLength, numeric, minLength, sameAs } from  '@vuelidate/validators'
    import type { MedicalOrder } from '@/types/medical-orders';
    import { useVuelidate } from '@vuelidate/core';
    import type { account } from '@/types/common/accounts';
    import { useFirebaseAuth } from '@/composables/useFirebaseAuth';
    export default defineComponent({
        name: 'signupModal',
        props: {
            isOpen: {type: Boolean, required: true}
        },
        emits: ['hide'],
        setup(props, { emit }){
            const { registEmailPswd } = useFirebaseAuth();
            const account = ref<account>({
                email: '',
                password: '',
                passwordConfirmed: ''
            })
            const rules = computed(()=>({
                email: {required},
                password: {required, minLength: minLength(6)},
                passwordConfirmed: {
                    sameAsPassword: sameAs(account.value.password)
                }
            }))
            const v$ = useVuelidate(rules, account)
            const isModalOpen = computed(()=>props.isOpen);
            const handleSubmit = async()=>{
                const isFormValid = await v$.value.$validate()
                if(!isFormValid) {
                    return
                }
                registEmailPswd(account.value.email, account.value.password)
                account.value.email=""
                account.value.password=""
                account.value.passwordConfirmed=""
                emit('hide')
            }
            return {
                isModalOpen,
                emit,
                handleSubmit,
                v$
            }
        }
    })
</script>

<template>
    <div v-show="isModalOpen" class="custom-modal-overlay">
        <div class="custom-modal">
            <!-- <form> -->
                <div class="columns is-multiline px-5 py-5">
                    <div class="column is-11">
                        <label class="is-size-4 ml-5 has-text-primary">signup</label>
                    </div>
                    <div class="column is-1">
                        <div class="close" @click="()=>emit('hide')">
                            <i class="fa fa-times"></i>
                        </div>
                    </div>
                    <div class="column is-12">
                        <div class="field">
                            <label class="has-text-grey has-text-weight-light">correo</label>
                            <div class="control">
                                <input v-model="v$.email.$model" class="input" type="text" />
                            </div>
                            <p v-if="v$.email.$error" class="has-text-danger">Campo obligatorio</p>
                        </div>
                    </div>
                    <div class="column is-12">
                        <div class="field">
                            <label class="has-text-grey has-text-weight-light">contraseña</label>
                            <div class="control">
                                <input v-model="v$.password.$model" class="input" type="password" />
                            </div>
                            <p v-if="v$.password.minLength.$invalid" class="has-text-danger">la contraseña debe tener al menos 6 caracteres</p>
                            <p v-if="v$.password.required.$invalid" class="has-text-danger">Campo obligatorio</p>
                        </div>
                    </div>
                    <div class="column is-12">
                        <div class="field">
                            <label class="has-text-grey has-text-weight-light">confirmar contraseña</label>
                            <div class="control">
                                <input v-model = "v$.passwordConfirmed.$model" class="input" type="password" />
                            </div>
                            <p v-if="v$.passwordConfirmed.sameAsPassword.$invalid" class="has-text-danger">Las contraseñas no son iguales</p>
                        </div>
                    </div>
                    <div class="column is-12 mt-2">
                        <button class="button is-primary is-fullwidth" @click="handleSubmit">Guardar</button>
                    </div>
                </div>
            <!-- </form> -->
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
    height: auto;/* 450px */
    width: auto;/* 500px */
    margin-top: 8%;
    margin-bottom: 8%;
    margin-left: 25%;
    margin-right: 25%;
    padding: 0 0;
    border-radius: 10px;
    }
    .close {
    cursor: pointer;
    color: rgb(85, 92, 90);
    }
</style>